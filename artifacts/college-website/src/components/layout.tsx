import type React from "react";
import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Phone, Mail, Search, X, MapPin, ExternalLink, FileText, ArrowUpRight, ShieldAlert, LayoutGrid, LifeBuoy, ArrowRight } from "lucide-react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import {
  asset, INST_NAME, PHONE, PHONE_TEL, EMAIL_ENG, EMAIL_PHARM, MAP, NAV_MENUS, SEARCH_INDEX, UGC_GUIDELINE, UGC_REF,
  LAST_UPDATED, ADDRESS_ENG, SOCIETY, PHARM_PHONES, ANTI_RAGGING_HELPLINE, WOMEN_HELPLINE, WOMEN_HELPLINE_TEL,
} from "@/data/site";
import type { Person } from "@/data/people";
import { ACCREDITATION_LOGOS } from "@/data/gallery";
import { IMG } from "@/data/images";

const EASE = [0.22, 1, 0.36, 1] as const;
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function scrollToHash(hash: string) {
  const el = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
  if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 110; window.scrollTo({ top: y, behavior: "smooth" }); }
}

/* ---------- Text size ---------- */
const SIZES = [87.5, 100, 112.5];
function TextSize() {
  const [i, setI] = useState(() => Number(localStorage.getItem("amr-text") ?? 1));
  useEffect(() => { document.documentElement.style.fontSize = `${SIZES[i]}%`; localStorage.setItem("amr-text", String(i)); }, [i]);
  const b = (n: number, label: string, aria: string) => (
    <button onClick={() => setI(n)} aria-label={aria} aria-pressed={i === n} className={`px-2.5 h-8 rounded-md font-mono ${i === n ? "bg-[hsl(var(--primary))] text-white" : "text-foreground/70 hover:bg-secondary"}`} data-testid={`button-text-${slug(aria)}`}>{label}</button>
  );
  return <div className="inline-flex items-center gap-1 p-1 rounded-lg border bg-card text-[12px] font-semibold" role="group" aria-label="Text size">{b(0, "A-", "Decrease text size")}{b(1, "A", "Default text size")}{b(2, "A+", "Increase text size")}</div>;
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

/* ---------- Brand ---------- */
function Brand({ light }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 min-w-0 shrink-0 rounded-lg" data-testid="link-logo" aria-label={`${INST_NAME}, home`}>
      <img src={asset("brand/amr-logo.png")} alt="" className="w-9 h-9 shrink-0 rounded-full bg-white p-0.5 ring-1 ring-black/5" />
      <span className="leading-[1.1] min-w-0">
        <span className={`block font-display text-[16px] ${light ? "text-white" : "text-[hsl(var(--ink))]"}`}>A.M. Reddy</span>
        <span className={`block font-mono text-[9.5px] uppercase tracking-[0.12em] mt-0.5 ${light ? "text-white/60" : "text-muted-foreground"}`}>Educational Institutions</span>
      </span>
    </Link>
  );
}

/* ---------- Primary nav ---------- */
const PRIMARY: [string, string][] = [
  ["About", "/about"], ["Pharmacy", "/pharmacy"], ["Engineering", "/engineering"], ["Polytechnic", "/polytechnic"],
  ["Admissions", "/admissions"], ["Student Life", "/student-life"], ["Notices", "/notices"],
];

const STATUTORY: { label: string; href: string; note?: string }[] = [
  { label: "UGC Public Self-Disclosure", href: "/disclosure", note: "Sections (a) to (j)" },
  { label: "Anti-Ragging Cell", href: "/committees#anti-ragging", note: `Helpline ${ANTI_RAGGING_HELPLINE}` },
  { label: "Grievance Redressal (SGRC)", href: "/committees#sgrc" },
  { label: "General Grievance Cell", href: "/committees#grievance" },
  { label: "Internal Complaints Committee", href: "/committees#icc" },
  { label: "Right to Information", href: "/notices#rti" },
];

function PrimaryNav() {
  const [loc] = useLocation();
  return (
    <nav aria-label="Main" className="hidden xl:flex items-center gap-0.5 text-[13.5px] font-semibold whitespace-nowrap">
      {PRIMARY.map(([l, h]) => {
        const active = loc === h || (h === "/student-life" && loc === "/campus-life");
        return (
          <Link key={h} href={h} aria-current={active ? "page" : undefined} className={`relative px-2.5 h-9 inline-flex items-center rounded-full transition-colors ${active ? "text-[hsl(var(--primary))] bg-[hsl(var(--secondary))]" : "text-foreground/75 hover:text-[hsl(var(--ink))] hover:bg-[hsl(var(--secondary)/0.6)]"}`} data-testid={`link-nav-${slug(l)}`}>
            {active && <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--saffron))] mr-1.5" />}{l}
          </Link>
        );
      })}
    </nav>
  );
}

/* ---------- Index overlay (sitemap, used as mobile menu too) ---------- */
function IndexPanel({ open, setOpen, onSearch }: { open: boolean; setOpen: (b: boolean) => void; onSearch: () => void }) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence>
      {open && (
        <motion.div key="index" role="dialog" aria-modal="true" aria-label="Site index" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] bg-[hsl(var(--ink)/0.45)] backdrop-blur-sm overflow-y-auto" onClick={() => setOpen(false)}>
          <motion.div initial={reduce ? false : { y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}
            className="m-2 sm:m-3 rounded-2xl bg-[hsl(var(--paper))] border shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between gap-3 px-4 sm:px-6 h-16 border-b">
              <Brand />
              <div className="flex items-center gap-2">
                <button onClick={() => { setOpen(false); onSearch(); }} className="h-10 px-3 inline-flex items-center gap-2 rounded-full border bg-card text-[13px] font-semibold" data-testid="button-index-search"><Search className="w-4 h-4" />Search</button>
                <button onClick={() => setOpen(false)} className="w-10 h-10 grid place-items-center rounded-full bg-[hsl(var(--ink))] text-white" aria-label="Close index" data-testid="button-mobile-close"><X className="w-5 h-5" /></button>
              </div>
            </div>
            <div className="grid gap-8 p-4 sm:p-6 lg:grid-cols-[1.1fr_2fr]">
              <div className="space-y-4">
                <div className="rounded-xl bg-[hsl(var(--teal-deep))] text-white p-5">
                  <div className="eyebrow eyebrow-light">Mandatory disclosures</div>
                  <ul className="mt-3 divide-y divide-white/10">
                    {STATUTORY.map((s) => (
                      <li key={s.href}><Link href={s.href} className="group flex items-center justify-between gap-3 py-2.5 text-[14px] font-semibold" data-testid={`link-index-${slug(s.label)}`}>
                        <span>{s.label}{s.note && <span className="block text-[12px] font-normal text-white/60 font-mono">{s.note}</span>}</span>
                        <ArrowUpRight className="w-4 h-4 text-[hsl(var(--brass))] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link></li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-[13px]">
                  <TextSize />
                  <a href={PHONE_TEL} className="inline-flex items-center gap-1.5 font-semibold" data-testid="link-mobile-call"><Phone className="w-4 h-4 text-[hsl(var(--accent))]" />{PHONE}</a>
                </div>
              </div>
              <nav aria-label="Site index" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-2">00 / Start</p>
                  <ul className="space-y-0.5">
                    <li><Link href="/" className="block py-1.5 font-display text-[16px] hover:text-[hsl(var(--accent))]" data-testid="link-mobile-home">Home</Link></li>
                    <li><Link href="/contact" className="block py-1.5 font-display text-[16px] hover:text-[hsl(var(--accent))]" data-testid="link-mobile-contact">Contact</Link></li>
                    <li><Link href="/admissions#enquire" className="block py-1.5 font-display text-[16px] text-[hsl(var(--accent))]" data-testid="link-mobile-enquire">Admission Enquiry</Link></li>
                  </ul>
                </div>
                {NAV_MENUS.map((m, i) => (
                  <div key={m.label}>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-2">{String(i + 1).padStart(2, "0")} / {m.label}</p>
                    <ul className="space-y-0.5">
                      {m.items.map((it) => (
                        <li key={it.href}><Link href={it.href} className="block py-1.5 text-[14.5px] font-semibold text-foreground/85 hover:text-[hsl(var(--accent))]" data-testid={`link-menu-${slug(it.label)}`}>{it.label}</Link></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Header ---------- */
function Header() {
  const [search, setSearch] = useState(false);
  const [idx, setIdx] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loc] = useLocation();
  useEffect(() => setIdx(false), [loc]);
  useEffect(() => { document.body.style.overflow = idx ? "hidden" : ""; }, [idx]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearch((s) => !s); }
      if (e.key === "Escape") setIdx(false);
    };
    const s = () => setScrolled(window.scrollY > 8);
    window.addEventListener("keydown", k); window.addEventListener("scroll", s, { passive: true });
    return () => { window.removeEventListener("keydown", k); window.removeEventListener("scroll", s); };
  }, []);
  return (
    <>
      <header className="sticky top-0 z-50 px-2 sm:px-3 pt-2 sm:pt-3">
        <div className={`max-w-[1360px] mx-auto h-14 sm:h-[60px] pl-3 pr-2 sm:pl-4 flex items-center justify-between gap-2 rounded-2xl border transition-all duration-300 ${scrolled ? "bg-card/90 backdrop-blur-xl shadow-[0_12px_30px_-18px_hsl(var(--ink)/0.35)]" : "bg-card/70 backdrop-blur-md"}`}>
          <Brand />
          <PrimaryNav />
          <div className="flex items-center gap-1.5 shrink-0">
            <button onClick={() => setSearch(true)} className="h-9 w-9 2xl:w-auto 2xl:px-3 inline-flex items-center justify-center gap-2 rounded-full hover:bg-secondary text-[13px] text-foreground/70" aria-label="Search the website" data-testid="button-header-search">
              <Search className="w-4 h-4" /><kbd className="hidden 2xl:inline font-mono text-[10.5px] px-1.5 py-0.5 rounded border bg-background">Ctrl K</kbd>
            </button>
            <Link href="/disclosure" className="hidden sm:inline-flex h-9 px-3 items-center gap-1.5 rounded-full border border-[hsl(var(--primary)/0.3)] text-[13px] font-semibold text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white transition-colors whitespace-nowrap" data-testid="link-util-disclosure"><FileText className="w-3.5 h-3.5" />Disclosure</Link>
            <Link href="/admissions#enquire" className="hidden md:inline-flex h-9 px-4 items-center rounded-full bg-[hsl(var(--saffron))] text-white text-[13px] font-bold hover:bg-[hsl(var(--accent))] transition-colors whitespace-nowrap" data-testid="link-header-enquire">Apply</Link>
            <button onClick={() => setIdx(true)} className="h-9 px-3 inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--ink))] text-white text-[13px] font-semibold" aria-label="Open site index" aria-expanded={idx} data-testid="button-mobile-menu"><LayoutGrid className="w-4 h-4" /><span className="hidden sm:inline">Index</span></button>
          </div>
        </div>
      </header>
      <IndexPanel open={idx} setOpen={setIdx} onSearch={() => setSearch(true)} />
      <SearchDialog open={search} setOpen={setSearch} />
    </>
  );
}

/* ---------- Student safety dock (every page) ---------- */
function SafetyDock() {
  const [open, setOpen] = useState(false);
  const [loc] = useLocation();
  useEffect(() => setOpen(false), [loc]);
  return (
    <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40 flex flex-col items-end gap-2">
      <AnimatePresence>
        {open && (
          <motion.div id="safety-panel" initial={{ opacity: 0, y: 8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.22, ease: EASE }}
            className="w-[min(320px,calc(100vw-24px))] rounded-2xl border bg-card shadow-[0_24px_50px_-20px_hsl(var(--ink)/0.45)] p-4">
            <p className="font-display text-[15px] text-[hsl(var(--ink))]">Student safety and grievances</p>
            <a href={`tel:${ANTI_RAGGING_HELPLINE}`} className="mt-3 flex items-center gap-3 rounded-xl bg-[hsl(var(--saffron)/0.1)] p-3" data-testid="link-dock-helpline">
              <ShieldAlert className="w-5 h-5 text-[hsl(var(--accent))]" />
              <span className="text-[12.5px] leading-tight">National Anti-Ragging Helpline<span className="block font-mono font-semibold text-[14px] text-[hsl(var(--accent))]">{ANTI_RAGGING_HELPLINE}</span></span>
            </a>
            <a href={WOMEN_HELPLINE_TEL} className="mt-2 block text-[12.5px] text-muted-foreground" data-testid="link-dock-women">Women helpline: <span className="font-mono font-semibold text-foreground">{WOMEN_HELPLINE}</span></a>
            <ul className="mt-3 divide-y text-[13.5px] font-semibold">
              {STATUTORY.slice(0, 5).map((s) => <li key={s.href}><Link href={s.href} className="flex items-center justify-between py-2 hover:text-[hsl(var(--accent))]" data-testid={`link-dock-${slug(s.label)}`}>{s.label}<ArrowRight className="w-3.5 h-3.5" /></Link></li>)}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="safety-panel" className="h-11 pl-3 pr-4 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--teal-deep))] text-white text-[13px] font-semibold shadow-[0_12px_28px_-10px_hsl(var(--ink)/0.6)] hover:bg-[hsl(var(--primary))]" data-testid="button-safety-dock">
        {open ? <X className="w-4 h-4" /> : <LifeBuoy className="w-4 h-4 text-[hsl(var(--brass))]" />}<span className="hidden sm:inline">Anti-ragging and grievance</span><span className="sm:hidden">Help</span>
      </button>
    </div>
  );
}

/* ---------- Footer ---------- */
function FootCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h2 className="font-mono text-[11px] uppercase tracking-wider text-white/50 mb-3">{title}</h2>
      <ul className="space-y-1.5 text-[14px]">
        {links.map(([l, h]) => <li key={l}><Link href={h} className="link-u text-white/80 hover:text-white" data-testid={`link-footer-${slug(l)}`}>{l}</Link></li>)}
      </ul>
    </div>
  );
}

export function AccreditationStrip() {
  return (
    <section className="max-w-[1360px] mx-auto px-3 w-full" aria-label="Approvals and accreditation">
      <div className="rounded-2xl border bg-card px-5 py-5 flex flex-col md:flex-row items-center gap-5 md:gap-10">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground shrink-0">Approved, accredited, certified</p>
        <ul className="flex flex-wrap items-center justify-center md:justify-start gap-x-10 gap-y-4 flex-1">
          {ACCREDITATION_LOGOS.map((l) => <li key={l.alt}><img src={asset(l.src)} alt={l.alt} title={l.alt} className="h-11 md:h-12 w-auto object-contain" loading="lazy" data-testid={`img-accreditation-${slug(l.alt)}`} /></li>)}
        </ul>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-3 px-2 sm:px-3 pb-3">
      <div className="max-w-[1360px] mx-auto rounded-2xl bg-[hsl(var(--ink))] text-white overflow-hidden">
        <div className="grid lg:grid-cols-[1.3fr_1fr] border-b border-white/10">
          <div className="p-6 md:p-10">
            <div className="eyebrow eyebrow-light">Admissions 2026</div>
            <p className="font-display text-[24px] md:text-[30px] leading-tight mt-2 max-w-lg">Admissions 2026 are open.</p>
            <p className="text-white/65 text-[14px] mt-2">B.Tech, B.Pharm, Pharm.D, M.Pharm, M.Tech and Diploma programmes.</p>
            <div className="flex flex-wrap gap-2.5 mt-5">
              <Link href="/admissions#enquire" className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[hsl(var(--saffron))] text-white font-bold text-[14px] hover:bg-[hsl(var(--accent))]" data-testid="link-footer-enquire">Admission enquiry <ArrowUpRight className="w-4 h-4" /></Link>
              <Link href="/disclosure" className="inline-flex items-center h-11 px-5 rounded-full border border-white/25 font-semibold text-[14px] hover:bg-white/10" data-testid="link-footer-disclosure">UGC Disclosure</Link>
            </div>
          </div>
          <address className="not-italic p-6 md:p-10 lg:border-l border-white/10 space-y-2.5 text-[14px] text-white/75">
            <a href={MAP} target="_blank" rel="noreferrer" className="flex gap-2.5 hover:text-white" data-testid="link-footer-map"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[hsl(var(--brass))]" />{ADDRESS_ENG} <ExternalLink className="w-3 h-3 mt-1 shrink-0" /></a>
            <a href={PHONE_TEL} className="flex gap-2.5 hover:text-white" data-testid="link-footer-phone"><Phone className="w-4 h-4 mt-0.5 text-[hsl(var(--brass))]" /><span className="font-mono">{PHONE}</span> (Engineering)</a>
            <a href={`tel:+91${PHARM_PHONES[0]}`} className="flex gap-2.5 hover:text-white" data-testid="link-footer-phone-pharm"><Phone className="w-4 h-4 mt-0.5 text-[hsl(var(--brass))]" /><span className="font-mono">{PHARM_PHONES[0]}</span> (Pharmacy)</a>
            <a href={`mailto:${EMAIL_ENG}`} className="flex gap-2.5 hover:text-white break-all" data-testid="link-footer-email-eng"><Mail className="w-4 h-4 mt-0.5 shrink-0 text-[hsl(var(--brass))]" />{EMAIL_ENG}</a>
            <a href={`mailto:${EMAIL_PHARM}`} className="flex gap-2.5 hover:text-white break-all" data-testid="link-footer-email-pharm"><Mail className="w-4 h-4 mt-0.5 shrink-0 text-[hsl(var(--brass))]" />{EMAIL_PHARM}</a>
          </address>
        </div>
        <div className="p-6 md:p-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Brand light />
            <p className="mt-4 text-[13.5px] text-white/55 leading-relaxed max-w-xs">Sponsored by the {SOCIETY}.</p>
          </div>
          <FootCol title="Institutions" links={[["College of Pharmacy", "/pharmacy"], ["College of Engineering", "/engineering"], ["Polytechnic", "/polytechnic"], ["About Us", "/about"], ["Administration", "/administration"], ["Research", "/research"]]} />
          <FootCol title="Students" links={[["Admissions", "/admissions"], ["Admission Enquiry", "/admissions#enquire"], ["Student Life", "/student-life"], ["Placements", "/student-life#placements"], ["Alumni", "/student-life#alumni"], ["Picture Gallery", "/gallery"], ["Contact Us", "/contact"]]} />
          <FootCol title="Mandatory Disclosures" links={[["UGC Public Self-Disclosure", "/disclosure"], ["Anti-Ragging Cell", "/committees#anti-ragging"], ["Internal Complaints Committee", "/committees#icc"], ["Grievance Redressal (SGRC)", "/committees#sgrc"], ["Right to Information", "/notices#rti"], ["Notices and Circulars", "/notices#notices"]]} />
        </div>
        <div className="border-t border-white/10 px-6 md:px-10 py-4 flex flex-col md:flex-row gap-2 justify-between text-[12px] text-white/50">
          <span>© {INST_NAME}, Narasaraopet. Information published in accordance with the {UGC_GUIDELINE} ({UGC_REF}).</span>
          <span data-testid="text-last-updated" className="shrink-0 font-mono">Last updated: {LAST_UPDATED}</span>
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
    <div className="min-h-[100dvh] flex flex-col overflow-x-clip">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md" data-testid="link-skip">Skip to main content</a>
      <Header />
      <main id="main" tabIndex={-1} className={`flex-1 outline-none ${loc === "/" ? "pb-10" : "pb-20"}`}>
        <motion.div key={loc} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease: EASE }}>{children}</motion.div>
      </main>
      <AccreditationStrip />
      <Footer />
      <SafetyDock />
    </div>
  );
}

/* ---------- Shared building blocks ---------- */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55, delay, ease: EASE }} className={className}>{children}</motion.div>;
}

export function PageHeader({ title, sub, crumbs, img = IMG.campusAerial, eyebrow, children, accent, pos = "center" }: { title: string; sub?: string; crumbs: [string, string?][]; img?: string; eyebrow?: string; children?: ReactNode; accent?: string; pos?: string }) {
  const reduce = useReducedMotion();
  const anim = (d: number) => (reduce ? {} : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, delay: d, ease: EASE } });
  return (
    <section className="max-w-[1360px] mx-auto px-3 pt-4 sm:pt-6" style={accent ? ({ ["--wing" as string]: accent } as React.CSSProperties) : undefined}>
      <div className="rounded-2xl border bg-card overflow-hidden grid lg:grid-cols-[1fr_400px]">
        <div className="relative p-5 sm:p-8 md:p-10 flex flex-col">
          <span aria-hidden className="absolute left-0 top-8 bottom-8 w-1 rounded-r bg-[hsl(var(--wing,var(--saffron)))]" />
          <nav aria-label="Breadcrumb" className="font-mono text-[11.5px] text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-[hsl(var(--accent))]" data-testid="link-crumb-home">home</Link></li>
              {crumbs.map(([l, h]) => <li key={l} className="flex items-center gap-1.5"><span aria-hidden className="opacity-50">/</span>{h ? <Link href={h} className="hover:text-[hsl(var(--accent))]">{l.toLowerCase()}</Link> : <span aria-current="page" className="text-foreground">{l.toLowerCase()}</span>}</li>)}
            </ol>
          </nav>
          <div className="mt-8 md:mt-12">
            {eyebrow && <motion.div {...anim(0)} className="eyebrow">{eyebrow}</motion.div>}
            <motion.h1 {...anim(0.06)} className="font-display text-[27px] sm:text-[34px] md:text-[38px] leading-[1.12] max-w-3xl mt-2.5 text-[hsl(var(--ink))]">{title}</motion.h1>
            {sub && <motion.p {...anim(0.12)} className="mt-3 text-muted-foreground max-w-2xl text-[15px] md:text-[16px] leading-relaxed">{sub}</motion.p>}
            {children && <motion.div {...anim(0.18)} className="mt-5">{children}</motion.div>}
          </div>
        </div>
        <div className="relative min-h-[180px] lg:min-h-[300px] bg-[hsl(var(--sand))]">
          <img src={asset(img)} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: pos }} />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink)/0.35)] to-transparent" />
        </div>
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, sub, id, light, center }: { eyebrow?: string; title: string; sub?: string; id?: string; light?: boolean; center?: boolean }) {
  return (
    <div id={id} className={`mb-7 scroll-mt-28 ${center ? "text-center mx-auto max-w-2xl" : ""}`}>
      {eyebrow && <div className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{eyebrow}</div>}
      <h2 className={`font-display text-[23px] md:text-[29px] leading-[1.18] mt-2 ${center ? "" : "max-w-3xl"} ${light ? "text-white" : "text-[hsl(var(--ink))]"}`}>{title}</h2>
      {sub && <p className={`mt-2.5 leading-relaxed text-[15px] ${center ? "" : "max-w-2xl"} ${light ? "text-white/75" : "text-muted-foreground"}`}>{sub}</p>}
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
    <nav aria-label={label} className="sticky top-[68px] sm:top-[76px] z-30 max-w-[1360px] mx-auto px-3 mt-3">
      <div className="rounded-full border bg-card/90 backdrop-blur-md px-2 flex items-center gap-3 overflow-x-auto no-scrollbar">
        <span className="hidden md:block shrink-0 pl-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
        <ul className="flex items-center gap-1 whitespace-nowrap py-1.5">
          {items.map(([id, l]) => (
            <li key={id}><a href={`#${id}`} className={`inline-flex h-8 items-center px-3 rounded-full text-[13px] font-semibold transition-colors ${active === id ? "bg-[hsl(var(--ink))] text-white" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`} data-testid={`link-section-${id}`}>{l}</a></li>
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
      <div className="p-4 border-t flex-1">
        <h3 className="font-display text-[15px] leading-snug text-[hsl(var(--primary))]">{unnamed ? <span className="flex flex-col gap-1 items-start"><span>{person.role}</span><ToBePublished /></span> : person.name}</h3>
        {!unnamed && <p className="text-[13.5px] text-foreground/80 mt-1 leading-snug">{person.role}{person.qualification ? `, ${person.qualification}` : ""}</p>}
        <p className="text-[12px] text-muted-foreground mt-1.5">{person.institution}</p>
        {person.email && <a href={`mailto:${person.email}`} className="mt-2 block text-[12.5px] text-[hsl(var(--primary))] hover:underline break-all" data-testid={`${testid}-email`}>{person.email}</a>}
      </div>
    </article>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-[1300px] mx-auto px-4 sm:px-6 ${className}`}>{children}</div>;
}
