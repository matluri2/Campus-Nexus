import type React from "react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Phone, Mail, Search, ChevronDown, Menu, X, MapPin, ExternalLink, ChevronRight, FileText, ArrowUpRight, Megaphone } from "lucide-react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import {
  asset, INST_NAME, PHONE, PHONE_TEL, EMAIL_ENG, EMAIL_PHARM, MAP, NAV_MENUS, SEARCH_INDEX, UGC_GUIDELINE, UGC_REF,
  LAST_UPDATED, ADDRESS_ENG, SOCIETY, NEWS, PHARM_PHONES,
} from "@/data/site";
import type { Person } from "@/data/people";
import { ACCREDITATION_LOGOS } from "@/data/gallery";
import { IMG } from "@/data/images";

const EASE = [0.22, 1, 0.36, 1] as const;
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function scrollToHash(hash: string) {
  const el = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
  if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 130; window.scrollTo({ top: y, behavior: "smooth" }); }
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
  { img: IMG.campusAerial, kicker: "Since 2004", title: "A single campus of 10.94 acres near Narasaraopet", href: "/about" },
  { img: IMG.campusLawns, kicker: "Three institutions", title: "Pharmacy, Engineering and Technology, and Polytechnic", href: "/engineering" },
  { img: IMG.labPresentation, kicker: "Academics", title: "Laboratories, research cell and an incubation centre", href: "/research" },
  { img: IMG.libraryEngineering, kicker: "Admissions 2026", title: "Submit an admission enquiry online", href: "/admissions#enquire" },
  { img: IMG.sports1, kicker: "Campus life", title: "Hostels, sports, transport and student support", href: "/student-life" },
  { img: IMG.scienceDay, kicker: "Transparency", title: "UGC Public Self-Disclosure, sections (a) to (j)", href: "/disclosure" },
];

function Brand({ light }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 min-w-0 xl:shrink-0" data-testid="link-logo">
      <img src={asset("brand/amr-logo.png")} alt="A.M. Reddy Educational Institutions crest" className="w-10 h-10 md:w-11 md:h-11 shrink-0 rounded-full bg-white p-0.5 ring-1 ring-black/5" />
      <span className="leading-tight min-w-0 xl:whitespace-nowrap">
        <span className={`block font-display text-[14px] sm:text-[16px] xl:text-[15px] 2xl:text-[16px] ${light ? "text-white" : "text-[hsl(var(--primary))]"}`}>{INST_NAME}</span>
        <span className={`hidden sm:block text-[11px] tracking-[0.04em] mt-0.5 ${light ? "text-white/60" : "text-muted-foreground"}`}>Narasaraopet, Palnadu Dt., Andhra Pradesh</span>
      </span>
    </Link>
  );
}

/* ---------- Announcement ticker ---------- */
function Ticker() {
  const items = [{ title: "Admissions 2026: enquiries open for B.Tech, B.Pharm, Pharm.D, M.Pharm, M.Tech and Diploma", tag: "Admissions", href: "/admissions#enquire" }, ...NEWS.map((n) => ({ title: n.title, tag: n.date, href: "/notices#news" }))];
  const row = (k: string) => (
    <ul className="flex shrink-0 items-center" aria-hidden={k === "b" || undefined}>
      {items.map((n, i) => (
        <li key={`${k}${i}`} className="flex items-center">
          <Link href={n.href} tabIndex={k === "b" ? -1 : undefined} className="px-5 hover:underline underline-offset-4 whitespace-nowrap" data-testid={`link-ticker-${k}-${i}`}><span className="text-[hsl(var(--brass))] font-semibold mr-2">{n.tag}</span>{n.title}</Link>
          <span className="w-1 h-1 rounded-full bg-white/40" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="bg-[hsl(var(--teal-deep))] text-white text-[13px] border-t border-white/10" aria-label="Announcements">
      <div className="max-w-7xl mx-auto flex items-center h-9">
        <span className="shrink-0 h-full inline-flex items-center gap-1.5 px-4 bg-[hsl(var(--saffron))] text-[hsl(var(--ink))] font-display text-[12px] uppercase tracking-wide"><Megaphone className="w-3.5 h-3.5" />Latest</span>
        <div className="relative flex-1 overflow-hidden">
          <div className="ticker flex w-max">{row("a")}{row("b")}</div>
        </div>
      </div>
    </div>
  );
}

function MainNav() {
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
    <nav ref={ref} aria-label="Main" className="hidden xl:flex items-center text-[14px] font-semibold whitespace-nowrap" onMouseLeave={() => setOpen(null)}>
      {NAV_MENUS.map((mm, i) => (
        <div key={mm.label} onMouseEnter={() => setOpen(i)}>
          <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} aria-haspopup="true"
            className={`relative inline-flex items-center gap-1 px-2 2xl:px-3 h-[72px] transition-colors ${open === i ? "text-[hsl(var(--primary))]" : "text-foreground/85 hover:text-[hsl(var(--primary))]"}`} data-testid={`button-nav-${slug(mm.label)}`}>
            {mm.label}<ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform ${open === i ? "rotate-180" : ""}`} />
            <span className={`absolute left-2 right-2 2xl:left-3 2xl:right-3 bottom-0 h-[3px] rounded-t bg-[hsl(var(--saffron))] origin-left transition-transform duration-300 ${open === i ? "scale-x-100" : "scale-x-0"}`} />
          </button>
        </div>
      ))}
      <Link href="/contact" className="px-2 2xl:px-3 h-[72px] inline-flex items-center text-foreground/85 hover:text-[hsl(var(--primary))]" data-testid="link-nav-contact">Contact</Link>
      <AnimatePresence>
        {m && f && (
          <motion.div key="mega" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2, ease: EASE }}
            className="absolute left-0 right-0 top-full z-50 bg-popover text-foreground border-t border-b shadow-[0_30px_50px_-30px_hsl(var(--ink)/0.4)] whitespace-normal font-normal">
            <div className="max-w-7xl mx-auto px-6 py-7 grid grid-cols-[200px_1fr_320px] gap-8">
              <div>
                <div className="eyebrow">{m.label}</div>
                <p className="text-[13.5px] text-muted-foreground mt-3 leading-relaxed">Explore {m.label.toLowerCase()} at A.M. Reddy Educational Institutions.</p>
              </div>
              <ul className="grid grid-cols-2 gap-x-6 content-start">
                {m.items.map((it) => (
                  <li key={it.href}>
                    <Link href={it.href} className="group flex items-start justify-between gap-3 py-2.5 px-3 rounded-md hover:bg-secondary" data-testid={`link-menu-${slug(it.label)}`}>
                      <span>
                        <span className="text-[14px] font-semibold text-foreground group-hover:text-[hsl(var(--primary))]">{it.label}</span>
                        {it.desc && <span className="block text-[12.5px] text-muted-foreground mt-0.5">{it.desc}</span>}
                      </span>
                      <ChevronRight className="w-4 h-4 mt-0.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={f.href} className="group relative block h-44 rounded-lg overflow-hidden bg-[hsl(var(--teal-deep))]" data-testid={`link-menu-feature-${open}`}>
                <img src={asset(f.img)} alt="" className="img-zoom absolute inset-0 w-full h-full object-cover" />
                <span className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink)/0.9)] via-[hsl(var(--ink)/0.25)] to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[hsl(var(--brass))]">{f.kicker}</span>
                  <span className="block font-display text-[15px] leading-snug mt-1">{f.title}</span>
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
      <div className="flex items-center justify-between px-4 h-16 bg-[hsl(var(--primary))] text-white">
        <span className="font-display text-[17px]">Menu</span>
        <button onClick={() => setOpen(false)} className="w-10 h-10 grid place-items-center rounded-md border border-white/25" aria-label="Close menu" data-testid="button-mobile-close"><X className="w-5 h-5" /></button>
      </div>
      <nav className="px-4 py-2">
        <Link href="/" className="block py-3.5 border-b font-display text-[16px]" data-testid="link-mobile-home">Home</Link>
        {NAV_MENUS.map((m, i) => (
          <div key={m.label} className="border-b">
            <button onClick={() => setExp(exp === i ? null : i)} aria-expanded={exp === i} className="w-full flex justify-between items-center py-3.5 font-display text-[16px] text-left" data-testid={`button-mobile-${slug(m.label)}`}>
              {m.label}<ChevronDown className={`w-4 h-4 transition-transform ${exp === i ? "rotate-180" : ""}`} />
            </button>
            {exp === i && <ul className="pb-3 pl-1">{m.items.map((it) => <li key={it.href}><Link href={it.href} className="flex items-center gap-2 py-2 text-[15px] text-muted-foreground" data-testid={`link-mobile-${slug(it.label)}`}><ChevronRight className="w-3.5 h-3.5 text-[hsl(var(--accent))]" />{it.label}</Link></li>)}</ul>}
          </div>
        ))}
        <Link href="/contact" className="block py-3.5 border-b font-display text-[16px]" data-testid="link-mobile-contact">Contact</Link>
      </nav>
      <div className="p-4 grid grid-cols-2 gap-2">
        <a href={PHONE_TEL} className="rounded-lg border p-4 text-sm" data-testid="link-mobile-call"><Phone className="w-4 h-4 mb-2 text-[hsl(var(--primary))]" />{PHONE}</a>
        <Link href="/admissions#enquire" className="rounded-lg bg-primary text-primary-foreground p-4 text-sm font-semibold" data-testid="link-mobile-enquire"><ArrowUpRight className="w-4 h-4 mb-2" />Admission Enquiry</Link>
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
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b shadow-[0_8px_24px_-20px_hsl(var(--ink)/0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-3">
          <Brand />
          <MainNav />
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => setSearch(true)} className="xl:hidden w-10 h-10 grid place-items-center rounded-md hover:bg-secondary" aria-label="Search the website" data-testid="button-header-search"><Search className="w-[18px] h-[18px]" /></button>
            <Link href="/admissions#enquire" className="hidden sm:inline-flex whitespace-nowrap h-10 items-center px-4 rounded-md text-[14px] font-bold bg-[hsl(var(--saffron))] text-[hsl(var(--ink))] hover:brightness-105" data-testid="link-header-enquire">Apply Now</Link>
            <button onClick={() => setMob(true)} className="xl:hidden shrink-0 w-10 h-10 grid place-items-center rounded-md border" aria-label="Open menu" aria-expanded={mob} data-testid="button-mobile-menu"><Menu className="w-5 h-5" /></button>
          </div>
        </div>
      </header>
      <Ticker />
      <MobileNav open={mob} setOpen={setMob} />
      <SearchDialog open={search} setOpen={setSearch} />
    </>
  );
}

/* ---------- Footer ---------- */
function FootCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h2 className="font-display text-[14px] text-white mb-4 pb-2 border-b border-white/10 relative after:absolute after:left-0 after:-bottom-px after:w-8 after:h-[2px] after:bg-[hsl(var(--saffron))]">{title}</h2>
      <ul className="space-y-2 text-[14px]">
        {links.map(([l, h]) => <li key={l}><Link href={h} className="inline-flex items-center gap-1.5 text-white/70 hover:text-white" data-testid={`link-footer-${slug(l)}`}><ChevronRight className="w-3 h-3 text-[hsl(var(--brass))]" />{l}</Link></li>)}
      </ul>
    </div>
  );
}

export function AccreditationStrip() {
  return (
    <section className="bg-white border-y" aria-label="Approvals and accreditation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row items-center gap-5 md:gap-10">
        <p className="font-display text-[13px] uppercase tracking-wider text-muted-foreground shrink-0">Approved, accredited and certified</p>
        <ul className="flex flex-wrap items-center justify-center md:justify-start gap-x-10 gap-y-4 flex-1">
          {ACCREDITATION_LOGOS.map((l) => <li key={l.alt}><img src={asset(l.src)} alt={l.alt} title={l.alt} className="h-12 md:h-14 w-auto object-contain" loading="lazy" data-testid={`img-accreditation-${slug(l.alt)}`} /></li>)}
        </ul>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[hsl(var(--ink))] text-white">
      <div className="bg-[hsl(var(--primary))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-7 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div><p className="font-display text-[20px] md:text-[22px]">Admissions 2026 are open</p><p className="text-white/70 text-[14px]">B.Tech, B.Pharm, Pharm.D, M.Pharm, M.Tech and Diploma programmes.</p></div>
          <div className="flex flex-wrap gap-2.5">
            <Link href="/admissions#enquire" className="inline-flex items-center gap-2 h-11 px-5 rounded-md bg-[hsl(var(--saffron))] text-[hsl(var(--ink))] font-bold text-[14px] hover:brightness-105" data-testid="link-footer-enquire">Admission enquiry <ArrowUpRight className="w-4 h-4" /></Link>
            <Link href="/disclosure" className="inline-flex items-center h-11 px-5 rounded-md border border-white/30 font-semibold text-[14px] hover:bg-white/10" data-testid="link-footer-disclosure">UGC Disclosure</Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-10 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Brand light />
          <p className="mt-4 text-[14px] text-white/60 leading-relaxed max-w-sm">Sponsored by the {SOCIETY}.</p>
          <address className="not-italic mt-5 space-y-2.5 text-[14px] text-white/75">
            <a href={MAP} target="_blank" rel="noreferrer" className="flex gap-2.5 hover:text-white" data-testid="link-footer-map"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[hsl(var(--brass))]" />{ADDRESS_ENG} <ExternalLink className="w-3 h-3 mt-1 shrink-0" /></a>
            <a href={PHONE_TEL} className="flex gap-2.5 hover:text-white" data-testid="link-footer-phone"><Phone className="w-4 h-4 mt-0.5 text-[hsl(var(--brass))]" />{PHONE} (Engineering)</a>
            <a href={`tel:+91${PHARM_PHONES[0]}`} className="flex gap-2.5 hover:text-white" data-testid="link-footer-phone-pharm"><Phone className="w-4 h-4 mt-0.5 text-[hsl(var(--brass))]" />{PHARM_PHONES[0]} (Pharmacy)</a>
            <a href={`mailto:${EMAIL_ENG}`} className="flex gap-2.5 hover:text-white break-all" data-testid="link-footer-email-eng"><Mail className="w-4 h-4 mt-0.5 shrink-0 text-[hsl(var(--brass))]" />{EMAIL_ENG}</a>
            <a href={`mailto:${EMAIL_PHARM}`} className="flex gap-2.5 hover:text-white break-all" data-testid="link-footer-email-pharm"><Mail className="w-4 h-4 mt-0.5 shrink-0 text-[hsl(var(--brass))]" />{EMAIL_PHARM}</a>
          </address>
        </div>
        <FootCol title="Institutions" links={[["College of Pharmacy", "/pharmacy"], ["College of Engineering", "/engineering"], ["Polytechnic", "/polytechnic"], ["About Us", "/about"], ["Administration", "/administration"], ["Research", "/research"]]} />
        <FootCol title="Students" links={[["Admissions", "/admissions"], ["Admission Enquiry", "/admissions#enquire"], ["Student Life", "/student-life"], ["Placements", "/student-life#placements"], ["Alumni", "/student-life#alumni"], ["Picture Gallery", "/gallery"], ["Contact Us", "/contact"]]} />
        <FootCol title="Mandatory Disclosures" links={[["UGC Public Self-Disclosure", "/disclosure"], ["Anti-Ragging Cell", "/committees#anti-ragging"], ["Internal Complaints Committee", "/committees#icc"], ["Grievance Redressal (SGRC)", "/committees#sgrc"], ["Right to Information", "/notices#rti"], ["Notices and Circulars", "/notices#notices"]]} />
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col md:flex-row gap-2 justify-between text-[12.5px] text-white/55">
          <span>© {INST_NAME}, Narasaraopet. Information published in accordance with the {UGC_GUIDELINE} ({UGC_REF}).</span>
          <span data-testid="text-last-updated" className="shrink-0">Last updated: {LAST_UPDATED}</span>
        </div>
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
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md" data-testid="link-skip">Skip to main content</a>
      <Header />
      <main id="main" tabIndex={-1} className={`flex-1 outline-none ${loc === "/" ? "" : "pb-20"}`}>
        <motion.div key={loc} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease: EASE }}>{children}</motion.div>
      </main>
      <AccreditationStrip />
      <Footer />
    </div>
  );
}

/* ---------- Shared building blocks ---------- */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div initial={reduce ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6, delay, ease: EASE }} className={className}>{children}</motion.div>;
}

export function PageHeader({ title, sub, crumbs, img = IMG.campusAerial, eyebrow, children, accent, pos = "center" }: { title: string; sub?: string; crumbs: [string, string?][]; img?: string; eyebrow?: string; children?: ReactNode; accent?: string; pos?: string }) {
  const reduce = useReducedMotion();
  return (
    <section className="relative bg-[hsl(var(--ink))] text-white overflow-hidden" style={accent ? ({ ["--wing" as string]: accent } as React.CSSProperties) : undefined}>
      <img src={asset(img)} alt="" className="absolute inset-0 w-full h-full object-cover opacity-55" style={{ objectPosition: pos }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--ink)/0.95)] via-[hsl(var(--teal-deep)/0.8)] to-[hsl(var(--teal-deep)/0.35)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 min-h-[260px] md:min-h-[300px] flex flex-col justify-end">
        <nav aria-label="Breadcrumb" className="text-[13px] text-white/70 mb-auto pb-8">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link href="/" className="hover:text-white hover:underline" data-testid="link-crumb-home">Home</Link></li>
            {crumbs.map(([l, h]) => <li key={l} className="flex items-center gap-1.5"><ChevronRight className="w-3.5 h-3.5 opacity-60" />{h ? <Link href={h} className="hover:text-white hover:underline">{l}</Link> : <span aria-current="page" className="text-white">{l}</span>}</li>)}
          </ol>
        </nav>
        {eyebrow && <div className="eyebrow eyebrow-light">{eyebrow}</div>}
        <motion.h1 initial={reduce ? false : { y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: EASE }} className="font-display text-[28px] sm:text-[36px] md:text-[42px] leading-[1.15] max-w-4xl mt-3">{title}</motion.h1>
        {sub && <p className="mt-3 text-white/80 max-w-3xl text-[15px] md:text-[17px] leading-relaxed">{sub}</p>}
        {children && <div className="mt-5">{children}</div>}
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(var(--wing, var(--saffron))) 0 120px, transparent 120px)" }} />
    </section>
  );
}

export function SectionTitle({ eyebrow, title, sub, id, light, center }: { eyebrow?: string; title: string; sub?: string; id?: string; light?: boolean; center?: boolean }) {
  return (
    <div id={id} className={`mb-8 scroll-mt-36 ${center ? "text-center mx-auto max-w-2xl" : ""}`}>
      {eyebrow && <div className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{eyebrow}</div>}
      <h2 className={`font-display text-[24px] md:text-[32px] leading-[1.2] mt-2 ${center ? "" : "max-w-3xl"} ${light ? "text-white" : "text-[hsl(var(--primary))]"}`}>{title}</h2>
      {sub && <p className={`mt-3 leading-relaxed text-[15px] md:text-[16px] ${center ? "" : "max-w-2xl"} ${light ? "text-white/75" : "text-muted-foreground"}`}>{sub}</p>}
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
    <nav aria-label={label} className="sticky top-[72px] z-30 bg-background/95 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-6 overflow-x-auto no-scrollbar">
        <span className="hidden md:block shrink-0 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
        <ul className="flex items-center gap-1 whitespace-nowrap">
          {items.map(([id, l]) => (
            <li key={id}><a href={`#${id}`} className={`relative inline-flex h-12 items-center px-3 text-[14px] font-semibold transition-colors ${active === id ? "text-[hsl(var(--primary))]" : "text-muted-foreground hover:text-foreground"}`} data-testid={`link-section-${id}`}>
              {l}<span className={`absolute left-3 right-3 bottom-0 h-[3px] rounded-t bg-[hsl(var(--wing,var(--saffron)))] origin-left transition-transform duration-300 ${active === id ? "scale-x-100" : "scale-x-0"}`} />
            </a></li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export function ToBePublished({ testid }: { testid?: string }) {
  return <span className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-[hsl(var(--accent)/0.5)] px-2.5 py-0.5 text-[12px] font-semibold text-[hsl(var(--accent))] bg-[hsl(var(--saffron)/0.08)] whitespace-nowrap" data-testid={testid}>To be published</span>;
}

export function initialsOf(name: string) {
  return name.replace(/^(Smt\.|Sri|Dr\.|Mr\.|Mrs\.|Ms\.)\s*/g, "").replace(/^(Dr\.)\s*/, "").split(/\s+/).filter((w) => /^[A-Z]/.test(w)).map((w) => w[0]).slice(-2).join("") || "AMR";
}

export function Initials({ name, size = "md" }: { name: string; size?: "md" | "lg" }) {
  return <span aria-hidden className={`${size === "lg" ? "w-16 h-16 text-xl" : "w-12 h-12 text-base"} shrink-0 rounded-full grid place-items-center bg-[hsl(var(--sand))] text-[hsl(var(--primary))] font-display ring-1 ring-[hsl(var(--primary)/0.15)]`}>{initialsOf(name)}</span>;
}

/* Person photo with automatic initials fallback */
export function PersonPhoto({ person, className = "" }: { person: Person; className?: string }) {
  const [err, setErr] = useState(false);
  const label = person.name === "To be published" ? person.role : person.name;
  if (person.photo && !err) return <img src={asset(person.photo)} alt={`Photograph of ${label}`} loading="lazy" onError={() => setErr(true)} className={`object-cover object-top ${className}`} />;
  return <span role="img" aria-label={`${label} (photograph to be published)`} className={`grid place-items-center bg-gradient-to-br from-[hsl(var(--sand))] to-[hsl(var(--secondary))] text-[hsl(var(--primary))] font-display text-[28px] ${className}`}>{initialsOf(label)}</span>;
}

export function PersonCard({ person, testid, variant = "portrait" }: { person: Person; testid?: string; variant?: "portrait" | "row" }) {
  const unnamed = person.name === "To be published";
  if (variant === "row") {
    return (
      <div className="card-soft flex gap-4 p-4 items-center" data-testid={testid}>
        <PersonPhoto person={person} className="w-16 h-16 rounded-full shrink-0" />
        <div className="min-w-0">
          <div className="font-display text-[15px] text-[hsl(var(--primary))] leading-snug">{unnamed ? <ToBePublished /> : person.name}</div>
          <div className="text-[13.5px] text-foreground/80 mt-0.5">{person.role}{person.qualification ? `, ${person.qualification}` : ""}</div>
        </div>
      </div>
    );
  }
  return (
    <article className="card-soft card-hover overflow-hidden h-full flex flex-col" data-testid={testid}>
      <div className="aspect-[4/5] bg-[hsl(var(--sand))] overflow-hidden"><PersonPhoto person={person} className="w-full h-full" /></div>
      <div className="p-4 border-t-[3px] border-[hsl(var(--saffron))] flex-1">
        <h3 className="font-display text-[15px] leading-snug text-[hsl(var(--primary))]">{unnamed ? <span className="flex flex-col gap-1 items-start"><span>{person.role}</span><ToBePublished /></span> : person.name}</h3>
        {!unnamed && <p className="text-[13.5px] text-foreground/80 mt-1 leading-snug">{person.role}{person.qualification ? `, ${person.qualification}` : ""}</p>}
        <p className="text-[12px] text-muted-foreground mt-1.5">{person.institution}</p>
        {person.email && <a href={`mailto:${person.email}`} className="mt-2 block text-[12.5px] text-[hsl(var(--primary))] hover:underline break-all" data-testid={`${testid}-email`}>{person.email}</a>}
      </div>
    </article>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-7xl mx-auto px-4 sm:px-6 ${className}`}>{children}</div>;
}
