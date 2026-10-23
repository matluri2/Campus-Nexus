import type React from "react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Phone, Mail, Search, ChevronDown, Menu, X, MapPin, ExternalLink, ChevronRight, FileText, ArrowUpRight } from "lucide-react";
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
    <div className="bg-[hsl(var(--ink))] text-white/80 text-[12.5px] relative z-[51]">
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
const FEATURE: { img: string; kicker: string; title: string; href: string }[] = [
  { img: "img/hero-2.jpg", kicker: "Since 2004", title: "A single campus of 10.94 acres near Narasaraopet", href: "/about" },
  { img: "img/cse-lab.jpg", kicker: "Three institutions", title: "Pharmacy, Engineering and Technology, and Polytechnic", href: "/engineering" },
  { img: "img/pharma-lab.jpg", kicker: "Academics", title: "Laboratories, research cell and an incubation centre", href: "/research" },
  { img: "img/library-2.jpg", kicker: "Admissions 2026", title: "Submit an admission enquiry online", href: "/admissions#enquire" },
  { img: "img/sports.jpg", kicker: "Campus life", title: "Hostels, sports, transport and student support", href: "/student-life" },
  { img: "img/campus.jpg", kicker: "Transparency", title: "UGC Public Self-Disclosure, sections (a) to (j)", href: "/disclosure" },
];

function Brand({ light }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 min-w-0 xl:shrink-0" data-testid="link-logo">
      <img src={asset("brand/amr-logo.png")} alt="A.M. Reddy Educational Institutions crest" className="w-11 h-11 md:w-12 md:h-12 shrink-0 rounded-full bg-white p-0.5 ring-1 ring-black/5" />
      <span className="leading-tight min-w-0 xl:whitespace-nowrap">
        <span className={`block font-display text-[15px] sm:text-[17px] md:text-[20px] xl:text-[18px] 2xl:text-[20px] transition-colors ${light ? "text-white" : "text-[hsl(var(--primary))]"}`}>{INST_NAME}</span>
        <span className={`hidden sm:block text-[10.5px] uppercase tracking-[0.16em] mt-0.5 transition-colors ${light ? "text-white/60" : "text-muted-foreground"}`}>Narasaraopet / Andhra Pradesh</span>
      </span>
    </Link>
  );
}

function MainNav({ light }: { light: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const [loc] = useLocation();
  useEffect(() => setOpen(null), [loc]);
  useEffect(() => {
    const out = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    document.addEventListener("mousedown", out); document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", out); document.removeEventListener("keydown", esc); };
  }, []);
  const m = open !== null ? NAV_MENUS[open] : null;
  const f = open !== null ? FEATURE[open] : null;
  return (
    <nav ref={ref} aria-label="Main" className="hidden xl:flex items-center gap-0 text-[14px] font-medium whitespace-nowrap" onMouseLeave={() => setOpen(null)}>
      {NAV_MENUS.map((mm, i) => (
        <div key={mm.label} onMouseEnter={() => setOpen(i)}>
          <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} aria-haspopup="true"
            className={`relative inline-flex items-center gap-1 px-2 2xl:px-3 h-[76px] whitespace-nowrap transition-colors ${light ? "text-white/90 hover:text-white" : open === i ? "text-[hsl(var(--primary))]" : "hover:text-[hsl(var(--primary))]"}`} data-testid={`button-nav-${slug(mm.label)}`}>
            {mm.label}<ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform ${open === i ? "rotate-180" : ""}`} />
            <span className={`absolute left-2 right-2 2xl:left-3 2xl:right-3 bottom-[22px] h-px origin-left transition-transform duration-300 ${light ? "bg-white" : "bg-[hsl(var(--accent))]"} ${open === i ? "scale-x-100" : "scale-x-0"}`} />
          </button>
        </div>
      ))}
      <Link href="/contact" className={`px-3 h-[76px] inline-flex items-center transition-colors ${light ? "text-white/90 hover:text-white" : "hover:text-[hsl(var(--primary))]"}`} data-testid="link-nav-contact">Contact</Link>
      <AnimatePresence>
        {m && f && (
          <motion.div key="mega" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.22, ease: EASE }}
            className="absolute left-0 right-0 top-full z-50 bg-popover text-foreground border-t border-b shadow-[0_40px_60px_-40px_hsl(var(--ink)/0.45)] whitespace-normal">
            <div className="max-w-7xl mx-auto px-6 py-9 grid grid-cols-[220px_1fr_340px] gap-10">
              <div>
                <div className="eyebrow">{m.label}</div>
                <p className="font-display text-[28px] leading-[1.1] mt-4 text-[hsl(var(--primary))]">{m.label}</p>
              </div>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-1 content-start">
                {m.items.map((it) => (
                  <li key={it.href}>
                    <Link href={it.href} className="group flex items-start justify-between gap-3 py-3 border-b border-border/70" data-testid={`link-menu-${slug(it.label)}`}>
                      <span>
                        <span className="link-u text-[15px] font-medium text-foreground group-hover:text-[hsl(var(--primary))]">{it.label}</span>
                        {it.desc && <span className="block text-[12.5px] text-muted-foreground mt-1">{it.desc}</span>}
                      </span>
                      <ArrowUpRight className="w-4 h-4 mt-1 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={f.href} className="group relative block h-52 rounded-sm overflow-hidden bg-[hsl(var(--teal-deep))]" data-testid={`link-menu-feature-${open}`}>
                <img src={asset(f.img)} alt="" className="img-zoom absolute inset-0 w-full h-full object-cover opacity-85" />
                <span className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink)/0.9)] via-[hsl(var(--ink)/0.2)] to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="block text-[10.5px] uppercase tracking-[0.18em] text-[hsl(var(--brass))]">{f.kicker}</span>
                  <span className="block font-display text-[19px] leading-snug mt-1.5">{f.title}</span>
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function MobileNav({ open, setOpen }: { open: boolean; setOpen: (b: boolean) => void }) {
  const [exp, setExp] = useState<number | null>(null);
  if (!open) return null;
  return (
    <div className="xl:hidden fixed inset-0 z-[60] bg-background overflow-y-auto" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="flex items-center justify-between px-4 h-16 border-b bg-[hsl(var(--teal-deep))] text-white">
        <span className="font-display text-xl">Menu</span>
        <button onClick={() => setOpen(false)} className="w-10 h-10 grid place-items-center rounded-sm border border-white/25" aria-label="Close menu" data-testid="button-mobile-close"><X className="w-5 h-5" /></button>
      </div>
      <nav className="px-4 py-2">
        <Link href="/" className="block py-4 border-b font-display text-[22px]" data-testid="link-mobile-home">Home</Link>
        {NAV_MENUS.map((m, i) => (
          <div key={m.label} className="border-b">
            <button onClick={() => setExp(exp === i ? null : i)} aria-expanded={exp === i} className="w-full flex justify-between items-center py-4 font-display text-[22px] text-left" data-testid={`button-mobile-${slug(m.label)}`}>
              {m.label}<ChevronDown className={`w-4 h-4 transition-transform ${exp === i ? "rotate-180" : ""}`} />
            </button>
            {exp === i && <ul className="pb-4 pl-1 space-y-0.5">{m.items.map((it) => <li key={it.href}><Link href={it.href} className="flex items-center gap-2 py-2 text-[15px] text-muted-foreground" data-testid={`link-mobile-${slug(it.label)}`}><span className="w-3 h-px bg-[hsl(var(--accent))]" />{it.label}</Link></li>)}</ul>}
          </div>
        ))}
        <Link href="/contact" className="block py-4 border-b font-display text-[22px]" data-testid="link-mobile-contact">Contact</Link>
      </nav>
      <div className="p-4 grid grid-cols-2 gap-2">
        <a href={PHONE_TEL} className="rounded-sm border p-4 text-sm" data-testid="link-mobile-call"><Phone className="w-4 h-4 mb-2 text-[hsl(var(--primary))]" />{PHONE}</a>
        <Link href="/admissions#enquire" className="rounded-sm bg-primary text-primary-foreground p-4 text-sm font-semibold" data-testid="link-mobile-enquire"><ArrowUpRight className="w-4 h-4 mb-2" />Admission Enquiry</Link>
      </div>
    </div>
  );
}

function Header() {
  const [search, setSearch] = useState(false);
  const [mob, setMob] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hover, setHover] = useState(false);
  const [loc] = useLocation();
  useEffect(() => setMob(false), [loc]);
  useEffect(() => { document.body.style.overflow = mob ? "hidden" : ""; }, [mob]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearch((s) => !s); } };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, []);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 60);
    on(); window.addEventListener("scroll", on, { passive: true }); return () => window.removeEventListener("scroll", on);
  }, []);
  const overlay = loc === "/";
  const light = overlay && !scrolled && !hover;
  return (
    <>
      <UtilityBar onSearch={() => setSearch(true)} />
      <header onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocusCapture={() => setHover(true)} onBlurCapture={() => setHover(false)}
        className={`sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${light ? "bg-transparent border-b border-white/15" : "bg-background/95 backdrop-blur-md border-b shadow-[0_10px_30px_-25px_hsl(var(--ink)/0.5)]"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[76px] flex items-center justify-between gap-3">
          <Brand light={light} />
          <MainNav light={light} />
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => setSearch(true)} className={`xl:hidden w-10 h-10 grid place-items-center rounded-sm ${light ? "text-white hover:bg-white/10" : "hover:bg-secondary"}`} aria-label="Search the website" data-testid="button-header-search"><Search className="w-[18px] h-[18px]" /></button>
            <Link href="/admissions#enquire" className={`hidden sm:inline-flex whitespace-nowrap h-10 items-center gap-1.5 px-4 rounded-sm text-sm font-semibold transition-colors ${light ? "bg-white text-[hsl(var(--teal-deep))] hover:bg-[hsl(var(--sand))]" : "bg-primary text-primary-foreground hover:bg-[hsl(var(--teal-deep))]"}`} data-testid="link-header-enquire">Apply / Enquire</Link>
            <button onClick={() => setMob(true)} className={`xl:hidden shrink-0 w-10 h-10 grid place-items-center rounded-sm border ${light ? "border-white/40 text-white" : ""}`} aria-label="Open menu" aria-expanded={mob} data-testid="button-mobile-menu"><Menu className="w-5 h-5" /></button>
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
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[hsl(var(--brass))] mb-5">{title}</h2>
      <ul className="space-y-3 text-[14px]">
        {links.map(([l, h]) => <li key={l}><Link href={h} className="link-u text-white/80 hover:text-white" data-testid={`link-footer-${slug(l)}`}>{l}</Link></li>)}
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[hsl(var(--ink))] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-12">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-end pb-14 border-b border-white/10">
          <p className="font-display text-[34px] sm:text-[46px] md:text-[56px] leading-[1.02] tracking-tight">Pharmacy. Engineering.<br /><span className="italic text-white/55">Technology.</span></p>
          <div className="lg:justify-self-end flex flex-wrap gap-3">
            <Link href="/admissions#enquire" className="inline-flex items-center gap-2 h-12 px-6 rounded-sm bg-[hsl(var(--brass))] text-[hsl(var(--ink))] font-semibold hover:brightness-105" data-testid="link-footer-enquire">Admission enquiry <ArrowUpRight className="w-4 h-4" /></Link>
            <Link href="/disclosure" className="inline-flex items-center gap-2 h-12 px-6 rounded-sm border border-white/25 font-semibold hover:bg-white/5" data-testid="link-footer-disclosure">UGC Disclosure</Link>
          </div>
        </div>
        <div className="pt-14 grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Brand light />
            <p className="mt-6 text-sm text-white/60 leading-relaxed max-w-sm">Sponsored by the {SOCIETY}.</p>
            <address className="not-italic mt-6 space-y-3 text-sm text-white/80">
              <a href={MAP} target="_blank" rel="noreferrer" className="flex gap-2.5 hover:text-white" data-testid="link-footer-map"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[hsl(var(--brass))]" />{ADDRESS} <ExternalLink className="w-3 h-3 mt-1 shrink-0" /></a>
              <a href={PHONE_TEL} className="flex gap-2.5 hover:text-white" data-testid="link-footer-phone"><Phone className="w-4 h-4 mt-0.5 text-[hsl(var(--brass))]" />{PHONE}</a>
              <a href={`mailto:${EMAIL_ENG}`} className="flex gap-2.5 hover:text-white break-all" data-testid="link-footer-email-eng"><Mail className="w-4 h-4 mt-0.5 shrink-0 text-[hsl(var(--brass))]" />{EMAIL_ENG}</a>
              <a href={`mailto:${EMAIL_PHARM}`} className="flex gap-2.5 hover:text-white break-all" data-testid="link-footer-email-pharm"><Mail className="w-4 h-4 mt-0.5 shrink-0 text-[hsl(var(--brass))]" />{EMAIL_PHARM}</a>
            </address>
          </div>
          <FootCol title="Institutions" links={[["College of Pharmacy", "/pharmacy"], ["College of Engineering", "/engineering"], ["Polytechnic", "/polytechnic"], ["About Us", "/about"], ["Administration", "/administration"], ["Research", "/research"]]} />
          <FootCol title="Students" links={[["Admissions", "/admissions"], ["Admission Enquiry", "/admissions#enquire"], ["Student Life", "/student-life"], ["Placements", "/student-life#placements"], ["Picture Gallery", "/gallery"], ["Contact Us", "/contact"]]} />
          <FootCol title="Mandatory Disclosures" links={[["UGC Public Self-Disclosure", "/disclosure"], ["Anti-Ragging Cell", "/committees#anti-ragging"], ["Internal Complaints Committee", "/committees#icc"], ["Grievance Redressal (SGRC)", "/committees#sgrc"], ["Right to Information", "/notices#rti"], ["Notices and Circulars", "/notices#notices"]]} />
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row gap-2 justify-between text-[12px] text-white/55">
          <span>Information published in accordance with the {UGC_GUIDELINE} ({UGC_REF}).</span>
          <span data-testid="text-last-updated" className="shrink-0">Last updated: {LAST_UPDATED}</span>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8 text-[12px] text-white/40">© {INST_NAME}, Narasaraopet. All information on this website is openly accessible without registration.</div>
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
      <main id="main" tabIndex={-1} className={`flex-1 outline-none ${loc === "/" ? "" : "pb-28"}`}>
        <motion.div key={loc} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35, ease: EASE }}>{children}</motion.div>
      </main>
      <Footer />
    </div>
  );
}

/* ---------- Shared building blocks ---------- */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.8, delay, ease: EASE }} className={className}>{children}</motion.div>;
}

export function PageHeader({ title, sub, crumbs, img = "img/campus.jpg", eyebrow, children, accent }: { title: string; sub?: string; crumbs: [string, string?][]; img?: string; eyebrow?: string; children?: ReactNode; accent?: string }) {
  const reduce = useReducedMotion();
  return (
    <section className="relative bg-[hsl(var(--ink))] text-white overflow-hidden" style={accent ? ({ ["--wing" as string]: accent } as React.CSSProperties) : undefined}>
      <div className="absolute inset-0 overflow-hidden"><img src={asset(img)} alt="" className={`absolute inset-0 w-full h-full object-cover opacity-60 ${reduce ? "" : "kenburns"}`} /></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--ink)/0.96)] via-[hsl(var(--teal-deep)/0.82)] to-[hsl(var(--teal-deep)/0.35)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[hsl(var(--ink)/0.6)] to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-14 md:pt-16 md:pb-20 min-h-[360px] md:min-h-[440px] flex flex-col">
        <nav aria-label="Breadcrumb" className="text-[12.5px] text-white/65">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link href="/" className="link-u hover:text-white" data-testid="link-crumb-home">Home</Link></li>
            {crumbs.map(([l, h]) => <li key={l} className="flex items-center gap-1.5"><ChevronRight className="w-3.5 h-3.5 opacity-60" />{h ? <Link href={h} className="link-u hover:text-white">{l}</Link> : <span aria-current="page" className="text-white">{l}</span>}</li>)}
          </ol>
        </nav>
        <div className="mt-auto pt-14">
          {eyebrow && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="flex items-center gap-3 text-[11.5px] font-semibold uppercase tracking-[0.2em] text-[hsl(var(--brass))]"><span className="w-8 h-px" style={{ background: "hsl(var(--wing, var(--brass)))" }} />{eyebrow}</motion.div>}
          <div>
            <motion.h1 initial={reduce ? false : { y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, ease: EASE }} className="font-display text-[34px] sm:text-5xl md:text-[64px] leading-[1.04] max-w-5xl mt-4 pb-1">{title}</motion.h1>
          </div>
          {sub && <motion.p initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: EASE }} className="mt-5 text-white/75 max-w-3xl text-[16px] md:text-[19px] leading-relaxed">{sub}</motion.p>}
          {children && <div className="mt-7">{children}</div>}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-[3px] w-full" style={{ background: "linear-gradient(90deg, hsl(var(--wing, var(--brass))) 0 18%, transparent 18%)" }} />
    </section>
  );
}

export function SectionTitle({ eyebrow, title, sub, id, light }: { eyebrow?: string; title: string; sub?: string; id?: string; light?: boolean }) {
  return (
    <div id={id} className="mb-10 scroll-mt-36">
      {eyebrow && <div className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{eyebrow}</div>}
      <h2 className={`font-display text-[30px] md:text-[42px] leading-[1.08] mt-4 max-w-3xl ${light ? "text-white" : "text-[hsl(var(--primary))]"}`}>{title}</h2>
      {sub && <p className={`mt-5 max-w-2xl leading-relaxed text-[16px] ${light ? "text-white/70" : "text-muted-foreground"}`}>{sub}</p>}
    </div>
  );
}

/* Sticky in-page section navigation */
export function SectionNav({ items, label = "On this page" }: { items: [string, string][]; label?: string }) {
  const [active, setActive] = useState(items[0]?.[0]);
  useEffect(() => {
    const els = items.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((es) => { es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); }, { rootMargin: "-40% 0px -55% 0px" });
    els.forEach((e) => io.observe(e)); return () => io.disconnect();
  }, [items]);
  return (
    <nav aria-label={label} className="sticky top-[76px] z-30 bg-background/92 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-6 overflow-x-auto no-scrollbar">
        <span className="hidden md:block shrink-0 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
        <ul className="flex items-center gap-1 whitespace-nowrap">
          {items.map(([id, l]) => (
            <li key={id}><a href={`#${id}`} className={`relative inline-flex h-12 items-center px-3 text-[13.5px] font-medium transition-colors ${active === id ? "text-[hsl(var(--primary))]" : "text-muted-foreground hover:text-foreground"}`} data-testid={`link-section-${id}`}>
              {l}<span className={`absolute left-3 right-3 bottom-0 h-[2px] bg-[hsl(var(--wing,var(--accent)))] origin-left transition-transform duration-300 ${active === id ? "scale-x-100" : "scale-x-0"}`} />
            </a></li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export function ToBePublished({ testid }: { testid?: string }) {
  return <span className="inline-flex items-center gap-1.5 rounded-sm border border-dashed border-[hsl(var(--accent)/0.45)] px-2.5 py-1 text-[12px] font-medium text-[hsl(var(--accent))] bg-[hsl(var(--accent)/0.06)] whitespace-nowrap" data-testid={testid}>To be published</span>;
}

export function Initials({ name, size = "md" }: { name: string; size?: "md" | "lg" }) {
  const ini = name.replace(/^(Smt\.|Sri|Dr\.)\s*/g, "").replace(/^(Dr\.)\s*/, "").split(/\s+/).filter((w) => /^[A-Z]/.test(w)).map((w) => w[0]).slice(-2).join("");
  return <span aria-hidden className={`${size === "lg" ? "w-16 h-16 text-xl" : "w-12 h-12 text-base"} shrink-0 rounded-full grid place-items-center bg-[hsl(var(--sand))] text-[hsl(var(--primary))] font-display text-[1.25em] ring-1 ring-[hsl(var(--primary)/0.15)]`}>{ini}</span>;
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-7xl mx-auto px-4 sm:px-6 ${className}`}>{children}</div>;
}
