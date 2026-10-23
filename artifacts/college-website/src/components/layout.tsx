import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Phone, Mail, Search, ChevronDown, Menu, X, MapPin, ExternalLink, ChevronRight, FileText } from "lucide-react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import {
  asset, INST_NAME, PHONE, PHONE_TEL, EMAIL_ENG, EMAIL_PHARM, MAP, NAV_MENUS, SEARCH_INDEX, UGC_GUIDELINE, UGC_REF,
  LAST_UPDATED, ADDRESS, SOCIETY,
} from "@/data/site";

const EASE = [0.22, 1, 0.36, 1] as const;
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function scrollToHash(hash: string) {
  const el = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
  if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 140; window.scrollTo({ top: y, behavior: "smooth" }); }
}

/* ---------- Utility bar ---------- */
const SIZES = [87.5, 100, 112.5];
function TextSize() {
  const [i, setI] = useState(() => Number(localStorage.getItem("amr-text") ?? 1));
  useEffect(() => { document.documentElement.style.fontSize = `${SIZES[i]}%`; localStorage.setItem("amr-text", String(i)); }, [i]);
  const b = (n: number, label: string, aria: string) => (
    <button onClick={() => setI(n)} aria-label={aria} aria-pressed={i === n} className={`px-1.5 h-6 rounded-sm ${i === n ? "bg-white/20 text-white" : "text-white/75 hover:text-white"}`} data-testid={`button-text-${slug(aria)}`}>{label}</button>
  );
  return <div className="flex items-center gap-0.5 text-[12px] font-semibold" role="group" aria-label="Text size">{b(0, "A-", "Decrease text size")}{b(1, "A", "Default text size")}{b(2, "A+", "Increase text size")}</div>;
}

function UtilityBar({ onSearch }: { onSearch: () => void }) {
  return (
    <div className="bg-[hsl(var(--teal-deep))] text-white/85 text-[12.5px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-9 flex items-center justify-between gap-4">
        <div className="hidden md:flex items-center gap-5">
          <a href={PHONE_TEL} className="inline-flex items-center gap-1.5 hover:text-white" data-testid="link-util-phone"><Phone className="w-3.5 h-3.5" />{PHONE}</a>
          <a href={`mailto:${EMAIL_ENG}`} className="inline-flex items-center gap-1.5 hover:text-white" data-testid="link-util-email"><Mail className="w-3.5 h-3.5" />{EMAIL_ENG}</a>
        </div>
        <nav aria-label="Utility" className="flex items-center gap-4 ml-auto">
          <Link href="/disclosure" className="font-semibold text-white hover:underline underline-offset-4" data-testid="link-util-disclosure">UGC Disclosure</Link>
          <Link href="/committees#anti-ragging" className="hidden sm:inline hover:text-white" data-testid="link-util-antiragging">Anti-Ragging</Link>
          <Link href="/committees#grievance" className="hidden sm:inline hover:text-white" data-testid="link-util-grievance">Grievance</Link>
          <span className="hidden sm:block w-px h-4 bg-white/20" />
          <TextSize />
          <button onClick={onSearch} className="inline-flex items-center gap-1.5 hover:text-white" aria-label="Search the website" data-testid="button-util-search"><Search className="w-3.5 h-3.5" /><span className="hidden lg:inline">Search</span></button>
        </nav>
      </div>
    </div>
  );
}

/* ---------- Search ---------- */
function SearchDialog({ open, setOpen }: { open: boolean; setOpen: (b: boolean) => void }) {
  const [, nav] = useLocation();
  const groups = Array.from(new Set(SEARCH_INDEX.map((s) => s.group)));
  const go = (href: string) => {
    setOpen(false);
    const [path, hash] = href.split("#");
    nav(path || "/");
    if (hash) setTimeout(() => scrollToHash(`#${hash}`), 250);
  };
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search pages, programmes, committees, disclosures, notices..." data-testid="input-search" />
      <CommandList className="max-h-[60vh]">
        <CommandEmpty>No matching results. Try "admission", "hostel" or "RTI".</CommandEmpty>
        {groups.map((g) => (
          <CommandGroup key={g} heading={g}>
            {SEARCH_INDEX.filter((s) => s.group === g).map((s, i) => (
              <CommandItem key={`${g}-${i}`} value={`${s.label} ${s.keywords ?? ""} ${g}`} onSelect={() => go(s.href)} data-testid={`search-result-${slug(g)}-${i}`}>
                <FileText className="w-4 h-4 mr-2 text-muted-foreground" />
                <span className="flex-1">{s.label}</span>
                <span className="text-[11px] text-muted-foreground font-mono">{s.href.split("#")[0] || "/"}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}

/* ---------- Main header ---------- */
function Brand({ light }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 min-w-0 xl:shrink-0" data-testid="link-logo">
      <img src={asset("brand/amr-logo.png")} alt="A.M. Reddy Educational Institutions crest" className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white p-0.5 ring-1 ring-[hsl(var(--border))]" />
      <span className="leading-tight min-w-0 xl:whitespace-nowrap">
        <span className={`block font-display text-[15px] sm:text-[17px] md:text-[19px] xl:text-[17px] 2xl:text-[19px] ${light ? "text-white" : "text-[hsl(var(--primary))]"}`}>{INST_NAME}</span>
        <span className={`hidden sm:block text-[11px] tracking-wide ${light ? "text-white/60" : "text-muted-foreground"}`}>Petlurivaripalem, Narasaraopet, Andhra Pradesh</span>
      </span>
    </Link>
  );
}

function MainNav() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [loc] = useLocation();
  useEffect(() => setOpen(null), [loc]);
  useEffect(() => {
    const out = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    document.addEventListener("mousedown", out); document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", out); document.removeEventListener("keydown", esc); };
  }, []);
  return (
    <nav ref={ref} aria-label="Main" className="hidden xl:flex items-center gap-0 text-[14px] font-medium whitespace-nowrap" onMouseLeave={() => setOpen(null)}>
      {NAV_MENUS.map((m, i) => (
        <div key={m.label} className="relative" onMouseEnter={() => setOpen(i)}>
          <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} aria-haspopup="true"
            className={`inline-flex items-center gap-1 px-2 2xl:px-3 h-10 rounded-sm whitespace-nowrap transition-colors ${open === i ? "text-[hsl(var(--primary))] bg-secondary" : "hover:text-[hsl(var(--primary))]"}`} data-testid={`button-nav-${slug(m.label)}`}>
            {m.label}<ChevronDown className={`w-3.5 h-3.5 transition-transform ${open === i ? "rotate-180" : ""}`} />
          </button>
          {open === i && (
            <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}
              className={`absolute top-full pt-2 z-50 ${i > 3 ? "right-0" : "left-0"}`}>
              <ul className="w-80 bg-popover border shadow-[0_18px_40px_-20px_hsl(var(--teal)/0.35)] rounded-md p-2 border-t-2 border-t-[hsl(var(--accent))]">
                {m.items.map((it) => (
                  <li key={it.href}>
                    <Link href={it.href} className="block rounded-sm px-3 py-2.5 hover:bg-secondary focus-visible:bg-secondary" data-testid={`link-menu-${slug(it.label)}`}>
                      <span className="block text-[14px] font-medium text-foreground">{it.label}</span>
                      {it.desc && <span className="block text-[12px] text-muted-foreground mt-0.5">{it.desc}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      ))}
      <Link href="/contact" className="px-3 h-10 inline-flex items-center hover:text-[hsl(var(--primary))]" data-testid="link-nav-contact">Contact</Link>
    </nav>
  );
}

function MobileNav({ open, setOpen }: { open: boolean; setOpen: (b: boolean) => void }) {
  const [exp, setExp] = useState<number | null>(null);
  if (!open) return null;
  return (
    <div className="xl:hidden fixed inset-0 z-[60] bg-background overflow-y-auto" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="flex items-center justify-between px-4 h-16 border-b">
        <span className="font-display text-lg text-[hsl(var(--primary))]">Menu</span>
        <button onClick={() => setOpen(false)} className="w-10 h-10 grid place-items-center rounded-sm border" aria-label="Close menu" data-testid="button-mobile-close"><X className="w-5 h-5" /></button>
      </div>
      <nav className="px-4 py-2">
        <Link href="/" className="block py-3.5 border-b font-medium" data-testid="link-mobile-home">Home</Link>
        {NAV_MENUS.map((m, i) => (
          <div key={m.label} className="border-b">
            <button onClick={() => setExp(exp === i ? null : i)} aria-expanded={exp === i} className="w-full flex justify-between items-center py-3.5 font-medium" data-testid={`button-mobile-${slug(m.label)}`}>
              {m.label}<ChevronDown className={`w-4 h-4 transition-transform ${exp === i ? "rotate-180" : ""}`} />
            </button>
            {exp === i && <ul className="pb-3 pl-3 space-y-1">{m.items.map((it) => <li key={it.href}><Link href={it.href} className="block py-2 text-[15px] text-muted-foreground" data-testid={`link-mobile-${slug(it.label)}`}>{it.label}</Link></li>)}</ul>}
          </div>
        ))}
        <Link href="/contact" className="block py-3.5 border-b font-medium" data-testid="link-mobile-contact">Contact</Link>
      </nav>
      <div className="p-4 grid grid-cols-2 gap-2">
        <a href={PHONE_TEL} className="rounded-md border p-3 text-sm" data-testid="link-mobile-call"><Phone className="w-4 h-4 mb-2 text-[hsl(var(--primary))]" />{PHONE}</a>
        <Link href="/admissions#enquire" className="rounded-md bg-primary text-primary-foreground p-3 text-sm font-semibold" data-testid="link-mobile-enquire">Admission Enquiry</Link>
      </div>
    </div>
  );
}

function Header() {
  const [search, setSearch] = useState(false);
  const [mob, setMob] = useState(false);
  const [loc] = useLocation();
  useEffect(() => setMob(false), [loc]);
  useEffect(() => { document.body.style.overflow = mob ? "hidden" : ""; }, [mob]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearch((s) => !s); } };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, []);
  return (
    <>
      <UtilityBar onSearch={() => setSearch(true)} />
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-4">
          <Brand />
          <MainNav />
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => setSearch(true)} className="xl:hidden w-10 h-10 grid place-items-center rounded-sm hover:bg-secondary" aria-label="Search the website" data-testid="button-header-search"><Search className="w-[18px] h-[18px]" /></button>
            <Link href="/admissions#enquire" className="hidden sm:inline-flex whitespace-nowrap h-10 items-center px-4 rounded-sm bg-primary text-primary-foreground text-sm font-semibold hover:bg-[hsl(var(--teal-deep))]" data-testid="link-header-enquire">Apply / Enquire</Link>
            <button onClick={() => setMob(true)} className="xl:hidden shrink-0 w-10 h-10 grid place-items-center rounded-sm border" aria-label="Open menu" aria-expanded={mob} data-testid="button-mobile-menu"><Menu className="w-5 h-5" /></button>
          </div>
        </div>
      </header>
      <MobileNav open={mob} setOpen={setMob} />
      <SearchDialog open={search} setOpen={setSearch} />
    </>
  );
}

/* ---------- Footer ---------- */
function FootCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/55 mb-4">{title}</h2>
      <ul className="space-y-2.5 text-[14px]">
        {links.map(([l, h]) => <li key={l}><Link href={h} className="text-white/85 hover:text-white hover:underline underline-offset-4" data-testid={`link-footer-${slug(l)}`}>{l}</Link></li>)}
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-24 bg-[hsl(var(--teal-deep))] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Brand light />
          <p className="mt-5 text-sm text-white/65 leading-relaxed max-w-sm">Sponsored by the {SOCIETY}.</p>
          <address className="not-italic mt-5 space-y-2.5 text-sm text-white/85">
            <a href={MAP} target="_blank" rel="noreferrer" className="flex gap-2 hover:text-white" data-testid="link-footer-map"><MapPin className="w-4 h-4 mt-0.5 shrink-0" />{ADDRESS} <ExternalLink className="w-3 h-3 mt-1 shrink-0" /></a>
            <a href={PHONE_TEL} className="flex gap-2 hover:text-white" data-testid="link-footer-phone"><Phone className="w-4 h-4 mt-0.5" />{PHONE}</a>
            <a href={`mailto:${EMAIL_ENG}`} className="flex gap-2 hover:text-white break-all" data-testid="link-footer-email-eng"><Mail className="w-4 h-4 mt-0.5 shrink-0" />{EMAIL_ENG}</a>
            <a href={`mailto:${EMAIL_PHARM}`} className="flex gap-2 hover:text-white" data-testid="link-footer-email-pharm"><Mail className="w-4 h-4 mt-0.5" />{EMAIL_PHARM}</a>
          </address>
        </div>
        <FootCol title="Institutions" links={[["College of Pharmacy", "/pharmacy"], ["College of Engineering", "/engineering"], ["Polytechnic", "/polytechnic"], ["About Us", "/about"], ["Administration", "/administration"], ["Research", "/research"]]} />
        <FootCol title="Students" links={[["Admissions", "/admissions"], ["Admission Enquiry", "/admissions#enquire"], ["Student Life", "/student-life"], ["Placements", "/student-life#placements"], ["Picture Gallery", "/gallery"], ["Contact Us", "/contact"]]} />
        <FootCol title="Mandatory Disclosures" links={[["UGC Public Self-Disclosure", "/disclosure"], ["Anti-Ragging Cell", "/committees#anti-ragging"], ["Internal Complaints Committee", "/committees#icc"], ["Grievance Redressal (SGRC)", "/committees#sgrc"], ["Right to Information", "/notices#rti"], ["Notices and Circulars", "/notices#notices"]]} />
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col md:flex-row gap-2 justify-between text-[12px] text-white/60">
          <span>Information published in accordance with the {UGC_GUIDELINE} ({UGC_REF}).</span>
          <span data-testid="text-last-updated">Last updated: {LAST_UPDATED}</span>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-6 text-[12px] text-white/45">© {INST_NAME}, Narasaraopet. All information on this website is openly accessible without registration.</div>
      </div>
    </footer>
  );
}

/* ---------- Layout ---------- */
export function Layout({ children }: { children: ReactNode }) {
  const [loc] = useLocation();
  useEffect(() => {
    if (window.location.hash) setTimeout(() => scrollToHash(window.location.hash), 120);
    else window.scrollTo(0, 0);
  }, [loc]);
  useEffect(() => {
    const click = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.("a");
      if (a && a.hash && a.origin === window.location.origin) setTimeout(() => scrollToHash(a.hash), 120);
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-sm" data-testid="link-skip">Skip to main content</a>
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <motion.div key={loc} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35, ease: EASE }}>{children}</motion.div>
      </main>
      <Footer />
    </div>
  );
}

/* ---------- Shared building blocks ---------- */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6, delay, ease: EASE }} className={className}>{children}</motion.div>;
}

export function PageHeader({ title, sub, crumbs, img, eyebrow, children }: { title: string; sub?: string; crumbs: [string, string?][]; img?: string; eyebrow?: string; children?: ReactNode }) {
  return (
    <section className="relative bg-[hsl(var(--teal))] text-white overflow-hidden">
      {img && <><img src={asset(img)} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" /><div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--teal-deep))] via-[hsl(var(--teal-deep)/0.85)] to-[hsl(var(--teal)/0.5)]" /></>}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <nav aria-label="Breadcrumb" className="text-[13px] text-white/70">
          <ol className="flex flex-wrap items-center gap-1">
            <li><Link href="/" className="hover:text-white" data-testid="link-crumb-home">Home</Link></li>
            {crumbs.map(([l, h]) => <li key={l} className="flex items-center gap-1"><ChevronRight className="w-3.5 h-3.5" />{h ? <Link href={h} className="hover:text-white">{l}</Link> : <span aria-current="page" className="text-white">{l}</span>}</li>)}
          </ol>
        </nav>
        {eyebrow && <div className="mt-6 text-[12px] font-semibold uppercase tracking-[0.16em] text-[hsl(14_70%_75%)]">{eyebrow}</div>}
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className={`font-display text-3xl md:text-5xl leading-tight max-w-4xl ${eyebrow ? "mt-2" : "mt-6"}`}>{title}</motion.h1>
        {sub && <p className="mt-4 text-white/80 max-w-3xl text-[16px] md:text-lg leading-relaxed">{sub}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, sub, id }: { eyebrow?: string; title: string; sub?: string; id?: string }) {
  return (
    <div id={id} className="mb-8 scroll-mt-36">
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="font-display text-2xl md:text-[2rem] leading-tight text-[hsl(var(--primary))] mt-2">{title}</h2>
      <div className="rule-accent mt-4" />
      {sub && <p className="mt-4 text-muted-foreground max-w-3xl leading-relaxed">{sub}</p>}
    </div>
  );
}

export function ToBePublished({ testid }: { testid?: string }) {
  return <span className="inline-flex items-center rounded-sm border border-dashed border-[hsl(var(--muted-foreground)/0.5)] px-2 py-0.5 text-[12px] font-medium text-muted-foreground bg-muted" data-testid={testid}>To be published</span>;
}

export function Initials({ name, size = "md" }: { name: string; size?: "md" | "lg" }) {
  const ini = name.replace(/^(Smt\.|Sri|Dr\.)\s*/g, "").replace(/^(Dr\.)\s*/, "").split(/\s+/).filter((w) => /^[A-Z]/.test(w)).map((w) => w[0]).slice(-2).join("");
  return <span aria-hidden className={`${size === "lg" ? "w-16 h-16 text-xl" : "w-12 h-12 text-base"} shrink-0 rounded-full grid place-items-center bg-secondary text-[hsl(var(--primary))] font-display ring-1 ring-[hsl(var(--primary)/0.15)]`}>{ini}</span>;
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-7xl mx-auto px-4 sm:px-6 ${className}`}>{children}</div>;
}
