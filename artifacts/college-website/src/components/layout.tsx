import type React from "react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Phone, Mail, Search, X, MapPin, ExternalLink, FileText, ArrowUpRight, ChevronDown, Menu, ArrowRight } from "lucide-react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import {
  asset, INST_NAME, PHONE, PHONE_TEL, EMAIL_ENG, EMAIL_PHARM, MAP, SEARCH_INDEX, UGC_GUIDELINE, UGC_REF,
  LAST_UPDATED, ADDRESS_ENG, SOCIETY, PHARM_PHONES, ANTI_RAGGING_HELPLINE,
} from "@/data/site";
import type { Person } from "@/data/people";
import { ACCREDITATION_LOGOS } from "@/data/gallery";
import { IMG } from "@/data/images";

const EASE = [0.22, 1, 0.36, 1] as const;
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function scrollToHash(hash: string) {
  const el = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
  if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 120; window.scrollTo({ top: y, behavior: "smooth" }); }
}

/* ---------- Navigation model ---------- */
type NavItem = { label: string; href: string; desc?: string };
type NavGroup = { label: string; href: string; items: NavItem[]; feature?: { img: string; title: string; href: string } };
export const MENU: NavGroup[] = [
  { label: "About", href: "/about", feature: { img: IMG.campusLawns, title: "Two decades on one campus at Petlurivaripalem", href: "/about#history" }, items: [
    { label: "Overview", href: "/about", desc: "Who we are, vision and mission" },
    { label: "Administration", href: "/administration", desc: "Leadership, officers and governing bodies" },
    { label: "Sponsoring Society", href: "/about#society", desc: "Atluri Mastan Reddy Educational Society" },
    { label: "Approvals and Accreditation", href: "/about#approvals", desc: "AICTE, PCI, NAAC, NBA, UGC" },
    { label: "History", href: "/about#history", desc: "Milestones since 2003" },
  ] },
  { label: "Institutions", href: "/engineering", feature: { img: IMG.labPresentation, title: "Three institutions, one 10.94-acre campus", href: "/engineering" }, items: [
    { label: "College of Pharmacy", href: "/pharmacy", desc: "Est. 2004. Acharya Nagarjuna University" },
    { label: "College of Engineering and Technology", href: "/engineering", desc: "Est. 2008. Autonomous, JNTUK" },
    { label: "Polytechnic", href: "/polytechnic", desc: "Est. 2013. Diploma in Engineering" },
  ] },
  { label: "Academics", href: "/admissions#programmes", items: [
    { label: "Programmes", href: "/admissions#programmes", desc: "B.Tech, M.Tech, B.Pharm, Pharm.D, M.Pharm, Diploma" },
    { label: "Research and Development", href: "/research", desc: "R&D cell and central facilities" },
    { label: "Incubation Centre", href: "/research#incubation", desc: "Ideathons, hackathons, start-ups" },
    { label: "Library", href: "/research#facilities" },
    { label: "IQAC", href: "/committees#iqac", desc: "Internal Quality Assurance Cell" },
  ] },
  { label: "Admissions", href: "/admissions", items: [
    { label: "Admissions 2026", href: "/admissions" },
    { label: "Admission Process", href: "/admissions#process" },
    { label: "Eligibility and Fee", href: "/admissions#fee" },
    { label: "Admission Enquiry", href: "/admissions#enquire", desc: "Request a call from the admissions office" },
  ] },
  { label: "Campus Life", href: "/student-life", feature: { img: IMG.sports1, title: "Sports, NSS, festivals and hostels", href: "/student-life" }, items: [
    { label: "Facilities and Hostels", href: "/student-life", desc: "Hostels, transport, health, sports" },
    { label: "Training and Placements", href: "/student-life#placements" },
    { label: "Alumni", href: "/student-life#alumni" },
    { label: "Committees and Cells", href: "/committees", desc: "Anti-ragging, ICC, SGRC and more" },
    { label: "Picture Gallery", href: "/gallery" },
  ] },
  { label: "Information", href: "/notices", items: [
    { label: "Notices and Circulars", href: "/notices#notices" },
    { label: "News and Events", href: "/notices#news" },
    { label: "Right to Information", href: "/notices#rti" },
    { label: "Careers", href: "/notices#careers" },
    { label: "UGC Public Self-Disclosure", href: "/disclosure", desc: "Mandatory disclosures, sections (a) to (j)" },
  ] },
];

const STATUTORY: { label: string; href: string }[] = [
  { label: "UGC Public Self-Disclosure", href: "/disclosure" },
  { label: "Anti-Ragging", href: "/committees#anti-ragging" },
  { label: "Grievance Redressal", href: "/committees#sgrc" },
  { label: "ICC", href: "/committees#icc" },
  { label: "RTI", href: "/notices#rti" },
];

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
      <CommandInput placeholder="Search programmes, committees, disclosures, notices..." data-testid="input-search" />
      <CommandList className="max-h-[60vh]">
        <CommandEmpty>No matching results. Try "admission", "hostel" or "RTI".</CommandEmpty>
        {groups.map((g) => (
          <CommandGroup key={g} heading={g}>
            {SEARCH_INDEX.filter((s) => s.group === g).map((s, i) => (
              <CommandItem key={`${g}-${i}`} value={`${s.label} ${s.keywords ?? ""} ${g}`} onSelect={() => go(s.href)} data-testid={`search-result-${slug(g)}-${i}`}>
                <FileText className="w-4 h-4 mr-2 text-muted-foreground" />
                <span className="flex-1">{s.label}</span>
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
    <Link href="/" className="flex items-center gap-3 min-w-0 shrink-0" data-testid="link-logo" aria-label={`${INST_NAME}, home`}>
      <img src={asset("brand/amr-logo.png")} alt="" className="w-10 h-10 shrink-0 rounded-full bg-white p-0.5" />
      <span className="leading-[1.15] min-w-0">
        <span className={`block font-display text-[17px] ${light ? "text-white" : "text-[hsl(var(--pine))]"}`}>A.M. Reddy</span>
        <span className={`block text-[10.5px] font-semibold uppercase tracking-[0.16em] ${light ? "text-white/60" : "text-muted-foreground"}`}>Educational Institutions</span>
      </span>
    </Link>
  );
}

/* ---------- Desktop dropdown nav ---------- */
const OWNS: Record<string, string[]> = {
  About: ["/about", "/administration"],
  Institutions: ["/pharmacy", "/engineering", "/polytechnic"],
  Academics: ["/research"],
  Admissions: ["/admissions"],
  "Campus Life": ["/student-life", "/campus-life", "/committees", "/gallery"],
  Information: ["/notices", "/disclosure"],
};
function DesktopNav({ light }: { light?: boolean }) {
  const [open, setOpen] = useState<string | null>(null);
  const [loc] = useLocation();
  const t = useRef<number | undefined>(undefined);
  useEffect(() => setOpen(null), [loc]);
  const enter = (l: string) => { window.clearTimeout(t.current); setOpen(l); };
  const leave = () => { t.current = window.setTimeout(() => setOpen(null), 140); };
  return (
    <nav aria-label="Main" className="hidden xl:flex items-center h-full">
      <ul className="flex items-center h-full">
        {MENU.map((m) => {
          const active = (OWNS[m.label] ?? []).includes(loc);
          const isOpen = open === m.label;
          return (
            <li key={m.label} className="h-full flex items-center" onMouseEnter={() => enter(m.label)} onMouseLeave={leave}>
              <button onClick={() => setOpen(isOpen ? null : m.label)} aria-expanded={isOpen} className={`relative h-full px-3.5 inline-flex items-center gap-1 text-[14px] font-semibold whitespace-nowrap transition-colors ${light ? (active || isOpen ? "text-white" : "text-white/85 hover:text-white") : active || isOpen ? "text-[hsl(var(--pine))]" : "text-foreground/75 hover:text-[hsl(var(--pine))]"}`} data-testid={`button-nav-${slug(m.label)}`}>
                {m.label}<ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                <span aria-hidden className={`absolute left-3.5 right-3.5 bottom-0 h-[2px] bg-[hsl(var(--lagoon))] origin-left transition-transform duration-300 ${active || isOpen ? "scale-x-100" : "scale-x-0"}`} />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2, ease: EASE }} className="absolute left-0 right-0 top-full bg-[hsl(var(--card))] border-t border-b shadow-[0_30px_50px_-30px_hsl(var(--ink)/0.35)]">
                    <div className="max-w-[1280px] mx-auto px-8 py-8 grid grid-cols-[220px_1fr_300px] gap-10">
                      <div>
                        <p className="eyebrow">{m.label}</p>
                        <Link href={m.href} className="mt-3 block font-display text-[22px] leading-tight text-[hsl(var(--pine))] hover:text-[hsl(var(--lagoon))]" data-testid={`link-nav-${slug(m.label)}`}>{m.label} <ArrowRight className="inline w-4 h-4" /></Link>
                      </div>
                      <ul className="grid grid-cols-2 gap-x-8 gap-y-1 content-start">
                        {m.items.map((it) => (
                          <li key={it.href + it.label}><Link href={it.href} className="group block py-2.5 border-b border-border/70" data-testid={`link-menu-${slug(it.label)}`}>
                            <span className="block text-[14.5px] font-semibold text-foreground group-hover:text-[hsl(var(--lagoon))]">{it.label}</span>
                            {it.desc && <span className="block text-[12.5px] text-muted-foreground mt-0.5">{it.desc}</span>}
                          </Link></li>
                        ))}
                      </ul>
                      {m.feature ? (
                        <Link href={m.feature.href} className="group block" data-testid={`link-menu-feature-${slug(m.label)}`}>
                          <span className="block aspect-[16/10] overflow-hidden bg-[hsl(var(--sand))]"><img src={asset(m.feature.img)} alt="" className="img-zoom w-full h-full object-cover" /></span>
                          <span className="block mt-3 text-[14px] font-semibold text-[hsl(var(--pine))] group-hover:text-[hsl(var(--lagoon))]">{m.feature.title}</span>
                        </Link>
                      ) : (
                        <div className="bg-[hsl(var(--pine))] text-white p-6">
                          <p className="font-display text-[19px] leading-snug">Admissions 2026 are open.</p>
                          <p className="text-[13px] text-white/70 mt-2">Speak to the admissions office on <a href={PHONE_TEL} className="underline">{PHONE}</a>.</p>
                          <Link href="/admissions#enquire" className="mt-4 inline-flex items-center gap-2 text-[13.5px] font-bold text-[hsl(var(--brass))]" data-testid={`link-menu-enquire-${slug(m.label)}`}>Admission enquiry <ArrowRight className="w-4 h-4" /></Link>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
        <li className="h-full flex items-center"><Link href="/contact" className={`h-full px-3.5 inline-flex items-center text-[14px] font-semibold ${light ? "text-white/85 hover:text-white" : loc === "/contact" ? "text-[hsl(var(--pine))]" : "text-foreground/75 hover:text-[hsl(var(--pine))]"}`} data-testid="link-nav-contact">Contact</Link></li>
      </ul>
    </nav>
  );
}

/* ---------- Mobile menu ---------- */
function MobileMenu({ open, setOpen, onSearch }: { open: boolean; setOpen: (b: boolean) => void; onSearch: () => void }) {
  const reduce = useReducedMotion();
  const [exp, setExp] = useState<string | null>(null);
  return (
    <AnimatePresence>
      {open && (
        <motion.div role="dialog" aria-modal="true" aria-label="Menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[70] bg-[hsl(var(--ink)/0.4)]" onClick={() => setOpen(false)}>
          <motion.div initial={reduce ? false : { x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.35, ease: EASE }} className="absolute right-0 top-0 bottom-0 w-full max-w-[440px] bg-[hsl(var(--paper))] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between h-[68px] px-5 border-b">
              <Brand />
              <button onClick={() => setOpen(false)} className="w-10 h-10 grid place-items-center" aria-label="Close menu" data-testid="button-mobile-close"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5">
              <button onClick={() => { setOpen(false); onSearch(); }} className="w-full h-11 px-4 flex items-center gap-2 border bg-card text-[14px] text-muted-foreground" data-testid="button-index-search"><Search className="w-4 h-4" />Search the website</button>
              <nav aria-label="Mobile" className="mt-4">
                <Link href="/" className="block py-3.5 border-b font-display text-[18px] text-[hsl(var(--pine))]" data-testid="link-mobile-home">Home</Link>
                {MENU.map((m) => (
                  <div key={m.label} className="border-b">
                    <button onClick={() => setExp(exp === m.label ? null : m.label)} aria-expanded={exp === m.label} className="w-full flex items-center justify-between py-3.5 font-display text-[18px] text-[hsl(var(--pine))]" data-testid={`button-mobile-${slug(m.label)}`}>{m.label}<ChevronDown className={`w-4 h-4 transition-transform ${exp === m.label ? "rotate-180" : ""}`} /></button>
                    {exp === m.label && (
                      <ul className="pb-3 pl-3 border-l-2 border-[hsl(var(--lagoon))] ml-1 mb-3">
                        {m.items.map((it) => <li key={it.href + it.label}><Link href={it.href} className="block py-2 text-[14.5px] font-medium text-foreground/85" data-testid={`link-mobile-${slug(it.label)}`}>{it.label}</Link></li>)}
                      </ul>
                    )}
                  </div>
                ))}
                <Link href="/contact" className="block py-3.5 border-b font-display text-[18px] text-[hsl(var(--pine))]" data-testid="link-mobile-contact">Contact</Link>
              </nav>
              <Link href="/admissions#enquire" className="mt-6 flex items-center justify-between h-12 px-5 bg-[hsl(var(--pine))] text-white font-semibold" data-testid="link-mobile-enquire">Admission enquiry <ArrowRight className="w-4 h-4" /></Link>
              <div className="mt-6">
                <p className="eyebrow">Statutory information</p>
                <ul className="mt-2">{STATUTORY.map((s) => <li key={s.href}><Link href={s.href} className="block py-2 text-[14px] font-medium" data-testid={`link-index-${slug(s.label)}`}>{s.label}</Link></li>)}</ul>
                <a href={`tel:${ANTI_RAGGING_HELPLINE}`} className="mt-2 block text-[13px] text-muted-foreground" data-testid="link-mobile-helpline">Anti-Ragging Helpline <b className="text-foreground">{ANTI_RAGGING_HELPLINE}</b></a>
                <a href={PHONE_TEL} className="mt-1 block text-[13px] text-muted-foreground" data-testid="link-mobile-call">Office <b className="text-foreground">{PHONE}</b></a>
              </div>
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
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loc] = useLocation();
  useEffect(() => setMenu(false), [loc]);
  useEffect(() => { document.body.style.overflow = menu ? "hidden" : ""; }, [menu]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearch((s) => !s); }
      if (e.key === "Escape") setMenu(false);
    };
    const s = () => setScrolled(window.scrollY > 60);
    window.addEventListener("keydown", k); window.addEventListener("scroll", s, { passive: true });
    return () => { window.removeEventListener("keydown", k); window.removeEventListener("scroll", s); };
  }, []);
  const home = loc === "/";
  const clear = home && !scrolled && !menu;
  return (
    <>
      <div className={home ? "fixed inset-x-0 top-0 z-50" : "contents"}>
      <div className={`text-white/80 text-[12px] transition-colors duration-500 ${clear ? "bg-[hsl(var(--ink)/0.25)] backdrop-blur-sm" : "bg-[hsl(var(--teal-deep))]"}`}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-9 flex items-center justify-between gap-4">
          <ul className="flex items-center gap-4 sm:gap-5 overflow-x-auto no-scrollbar whitespace-nowrap">
            {STATUTORY.slice(0, 3).map((s, i) => <li key={s.href}><Link href={s.href} className="hover:text-white font-medium" data-testid={`link-util-${slug(s.label)}`}>{i === 0 ? <><span className="sm:hidden">UGC Disclosure</span><span className="hidden sm:inline">{s.label}</span></> : s.label}</Link></li>)}
            {STATUTORY.slice(3).map((s) => <li key={s.href} className="hidden md:block"><Link href={s.href} className="hover:text-white font-medium" data-testid={`link-util-${slug(s.label)}`}>{s.label}</Link></li>)}
          </ul>
          <div className="hidden lg:flex items-center gap-5 shrink-0">
            <a href={`tel:${ANTI_RAGGING_HELPLINE}`} className="hover:text-white" data-testid="link-util-helpline">Anti-Ragging Helpline {ANTI_RAGGING_HELPLINE}</a>
            <a href={PHONE_TEL} className="inline-flex items-center gap-1.5 hover:text-white" data-testid="link-util-phone"><Phone className="w-3 h-3" />{PHONE}</a>
          </div>
        </div>
      </div>
      <header className={`${home ? "" : "sticky top-0"} z-50 transition-[background-color,box-shadow,border-color] duration-500 border-b ${clear ? "bg-transparent border-white/15" : "bg-[hsl(var(--paper)/0.94)] backdrop-blur-md"} ${scrolled ? "shadow-[0_10px_30px_-20px_hsl(var(--ink)/0.45)]" : ""}`}>
        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-8 h-[68px] flex items-center justify-between gap-4">
          <Brand light={clear} />
          <DesktopNav light={clear} />
          <div className="flex items-center gap-1 shrink-0">
            <button onClick={() => setSearch(true)} className={`h-10 w-10 grid place-items-center ${clear ? "text-white" : "text-foreground/70 hover:text-[hsl(var(--pine))]"}`} aria-label="Search the website" data-testid="button-header-search"><Search className="w-[18px] h-[18px]" /></button>
            <Link href="/admissions#enquire" className="hidden sm:inline-flex h-10 px-5 items-center bg-[hsl(var(--pine))] text-white text-[13.5px] font-semibold hover:bg-[hsl(var(--lagoon))] transition-colors whitespace-nowrap" data-testid="link-header-enquire">Apply 2026</Link>
            <button onClick={() => setMenu(true)} className={`xl:hidden h-10 w-10 grid place-items-center ${clear ? "text-white" : ""}`} aria-label="Open menu" aria-expanded={menu} data-testid="button-mobile-menu"><Menu className="w-5 h-5" /></button>
          </div>
        </div>
      </header>
      </div>
      <MobileMenu open={menu} setOpen={setMenu} onSearch={() => setSearch(true)} />
      <SearchDialog open={search} setOpen={setSearch} />
    </>
  );
}

/* ---------- Footer ---------- */
function FootCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[hsl(var(--brass))] mb-4 font-sans">{title}</h2>
      <ul className="space-y-2 text-[14px]">
        {links.map(([l, h]) => <li key={l}><Link href={h} className="link-u text-white/75 hover:text-white" data-testid={`link-footer-${slug(l)}`}>{l}</Link></li>)}
      </ul>
    </div>
  );
}

export function AccreditationStrip() {
  return (
    <section className="border-t bg-[hsl(var(--card))]" aria-label="Approvals and accreditation">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-8 flex flex-col md:flex-row items-center gap-6 md:gap-12">
        <p className="eyebrow shrink-0">Recognised and accredited</p>
        <ul className="flex flex-wrap items-center justify-center md:justify-start gap-x-10 gap-y-4 flex-1">
          {ACCREDITATION_LOGOS.map((l) => <li key={l.alt}><img src={asset(l.src)} alt={l.alt} title={l.alt} className="h-11 w-auto object-contain" loading="lazy" data-testid={`img-accreditation-${slug(l.alt)}`} /></li>)}
        </ul>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[hsl(var(--teal-deep))] text-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 pt-14 pb-10 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Brand light />
          <p className="mt-5 text-[13.5px] text-white/60 leading-relaxed max-w-xs">Sponsored by the {SOCIETY}.</p>
          <address className="not-italic mt-5 space-y-2 text-[13.5px] text-white/75">
            <a href={MAP} target="_blank" rel="noreferrer" className="flex gap-2.5 hover:text-white" data-testid="link-footer-map"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[hsl(var(--brass))]" />{ADDRESS_ENG}<ExternalLink className="w-3 h-3 mt-1 shrink-0" /></a>
            <a href={PHONE_TEL} className="flex gap-2.5 hover:text-white" data-testid="link-footer-phone"><Phone className="w-4 h-4 mt-0.5 text-[hsl(var(--brass))]" />{PHONE} (Engineering)</a>
            <a href={`tel:+91${PHARM_PHONES[0]}`} className="flex gap-2.5 hover:text-white" data-testid="link-footer-phone-pharm"><Phone className="w-4 h-4 mt-0.5 text-[hsl(var(--brass))]" />{PHARM_PHONES[0]} (Pharmacy)</a>
            <a href={`mailto:${EMAIL_ENG}`} className="flex gap-2.5 hover:text-white break-all" data-testid="link-footer-email-eng"><Mail className="w-4 h-4 mt-0.5 shrink-0 text-[hsl(var(--brass))]" />{EMAIL_ENG}</a>
            <a href={`mailto:${EMAIL_PHARM}`} className="flex gap-2.5 hover:text-white break-all" data-testid="link-footer-email-pharm"><Mail className="w-4 h-4 mt-0.5 shrink-0 text-[hsl(var(--brass))]" />{EMAIL_PHARM}</a>
          </address>
        </div>
        <FootCol title="Institutions" links={[["College of Pharmacy", "/pharmacy"], ["College of Engineering", "/engineering"], ["Polytechnic", "/polytechnic"], ["About Us", "/about"], ["Administration", "/administration"], ["Research", "/research"]]} />
        <FootCol title="Students" links={[["Admissions", "/admissions"], ["Admission Enquiry", "/admissions#enquire"], ["Campus Life", "/student-life"], ["Placements", "/student-life#placements"], ["Alumni", "/student-life#alumni"], ["Picture Gallery", "/gallery"], ["Notices", "/notices"], ["Contact Us", "/contact"]]} />
        <FootCol title="Statutory" links={[["UGC Public Self-Disclosure", "/disclosure"], ["Anti-Ragging Cell", "/committees#anti-ragging"], ["Internal Complaints Committee", "/committees#icc"], ["Grievance Redressal (SGRC)", "/committees#sgrc"], ["General Grievance Cell", "/committees#grievance"], ["Right to Information", "/notices#rti"]]} />
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-5 flex flex-col md:flex-row gap-2 justify-between text-[12px] text-white/50">
          <span>© {INST_NAME}, Narasaraopet. Published in accordance with the {UGC_GUIDELINE} ({UGC_REF}).</span>
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
    <div className="min-h-[100dvh] flex flex-col overflow-x-clip">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2" data-testid="link-skip">Skip to main content</a>
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none pb-20">
        <motion.div key={loc} initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease: EASE }}>{children}</motion.div>
      </main>
      <AccreditationStrip />
      <Footer />
    </div>
  );
}

/* ---------- Shared building blocks ---------- */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div initial={reduce ? false : { y: 18 }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ duration: 0.7, delay, ease: EASE }} className={className}>{children}</motion.div>;
}

export function PageHeader({ title, sub, crumbs, img = IMG.campusAerial, eyebrow, children, accent, pos = "center 30%" }: { title: string; sub?: string; crumbs: [string, string?][]; img?: string; eyebrow?: string; children?: ReactNode; accent?: string; pos?: string }) {
  const reduce = useReducedMotion();
  const anim = (d: number) => (reduce ? {} : { initial: { y: 10 }, animate: { y: 0 }, transition: { duration: 0.6, delay: d, ease: EASE } });
  return (
    <section style={accent ? ({ ["--wing" as string]: accent } as React.CSSProperties) : undefined}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 pt-8 md:pt-12 pb-8 md:pb-10">
        <nav aria-label="Breadcrumb" className="text-[12.5px] text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-[hsl(var(--lagoon))]" data-testid="link-crumb-home">Home</Link></li>
            {crumbs.map(([l, h]) => <li key={l} className="flex items-center gap-2"><span aria-hidden className="opacity-40">/</span>{h ? <Link href={h} className="hover:text-[hsl(var(--lagoon))]">{l}</Link> : <span aria-current="page" className="text-foreground">{l}</span>}</li>)}
          </ol>
        </nav>
        <div className="mt-8 grid lg:grid-cols-[1.3fr_1fr] gap-6 lg:gap-16 items-end">
          <div>
            {eyebrow && <motion.div {...anim(0)} className="eyebrow" style={accent ? { color: "hsl(var(--wing))" } : undefined}>{eyebrow}</motion.div>}
            <motion.h1 {...anim(0.05)} className="font-display text-[29px] sm:text-[36px] md:text-[42px] leading-[1.12] mt-3 text-[hsl(var(--pine))]">{title}</motion.h1>
          </div>
          {sub && <motion.p {...anim(0.1)} className="text-muted-foreground text-[15.5px] leading-relaxed lg:pb-1.5">{sub}</motion.p>}
        </div>
        {children && <motion.div {...anim(0.15)} className="mt-6">{children}</motion.div>}
      </div>
      <div className="max-w-[1280px] mx-auto sm:px-8">
        <motion.div initial={reduce ? false : { scale: 1.02 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease: EASE }} className="relative h-[220px] sm:h-[280px] lg:h-[320px] overflow-hidden bg-[hsl(var(--sand))]">
          <img src={asset(img)} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: pos }} />
          <span aria-hidden className="absolute left-0 bottom-0 h-1 w-1/4" style={{ background: "hsl(var(--wing, var(--lagoon)))" }} />
        </motion.div>
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, sub, id, light, center }: { eyebrow?: string; title: string; sub?: string; id?: string; light?: boolean; center?: boolean }) {
  return (
    <div id={id} className={`mb-8 scroll-mt-32 ${center ? "text-center mx-auto max-w-2xl" : ""}`}>
      {eyebrow && <div className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{eyebrow}</div>}
      <h2 className={`font-display text-[24px] md:text-[30px] leading-[1.2] mt-3 ${center ? "" : "max-w-3xl"} ${light ? "text-white" : "text-[hsl(var(--pine))]"}`}>{title}</h2>
      {sub && <p className={`mt-3 leading-relaxed text-[15px] ${center ? "" : "max-w-2xl"} ${light ? "text-white/75" : "text-muted-foreground"}`}>{sub}</p>}
    </div>
  );
}

export function SectionNav({ items, label = "On this page" }: { items: [string, string][]; label?: string }) {
  const [active, setActive] = useState(items[0]?.[0]);
  useEffect(() => {
    const els = items.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((es) => { es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); }, { rootMargin: "-40% 0px -55% 0px" });
    els.forEach((e) => io.observe(e)); return () => io.disconnect();
  }, [items]);
  return (
    <nav aria-label={label} className="sticky top-[68px] z-30 bg-[hsl(var(--paper)/0.95)] backdrop-blur-md border-b">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 flex items-center gap-6 overflow-x-auto no-scrollbar">
        <span className="hidden md:block shrink-0 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
        <ul className="flex items-center gap-6 whitespace-nowrap">
          {items.map(([id, l]) => (
            <li key={id}><a href={`#${id}`} className={`relative inline-flex h-12 items-center text-[13.5px] font-semibold transition-colors ${active === id ? "text-[hsl(var(--pine))]" : "text-muted-foreground hover:text-foreground"}`} data-testid={`link-section-${id}`}>{l}<span aria-hidden className={`absolute left-0 right-0 bottom-0 h-[2px] bg-[hsl(var(--lagoon))] transition-transform origin-left ${active === id ? "scale-x-100" : "scale-x-0"}`} /></a></li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export function ToBePublished({ testid }: { testid?: string }) {
  return <span className="inline-flex items-center gap-1.5 border-b border-dashed border-[hsl(var(--lagoon)/0.6)] pb-px text-[12.5px] font-semibold text-[hsl(var(--lagoon))] whitespace-nowrap" data-testid={testid}><span aria-hidden className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />To be published</span>;
}

export function initialsOf(name: string) {
  return name.replace(/^(Smt\.|Sri|Dr\.|Mr\.|Mrs\.|Ms\.)\s*/g, "").replace(/^(Dr\.)\s*/, "").split(/\s+/).filter((w) => /^[A-Z]/.test(w)).map((w) => w[0]).slice(-2).join("") || "AMR";
}

export function Initials({ name, size = "md" }: { name: string; size?: "md" | "lg" }) {
  return <span aria-hidden className={`${size === "lg" ? "w-16 h-16 text-xl" : "w-12 h-12 text-base"} shrink-0 rounded-full grid place-items-center bg-[hsl(var(--sand))] text-[hsl(var(--pine))] font-display`}>{initialsOf(name)}</span>;
}

export function PersonPhoto({ person, className = "" }: { person: Person; className?: string }) {
  const [err, setErr] = useState(false);
  const label = person.name === "To be published" ? person.role : person.name;
  if (person.photo && !err) return <img src={asset(person.photo)} alt={`Photograph of ${label}`} loading="lazy" onError={() => setErr(true)} className={`object-cover object-top ${className}`} />;
  return <span role="img" aria-label={`${label} (photograph to be published)`} className={`grid place-items-center bg-[hsl(var(--sand))] text-[hsl(var(--pine))] font-display text-[28px] ${className}`}>{initialsOf(label)}</span>;
}

export function PersonCard({ person, testid, variant = "portrait" }: { person: Person; testid?: string; variant?: "portrait" | "row" }) {
  const unnamed = person.name === "To be published";
  if (variant === "row") {
    return (
      <div className="flex gap-4 py-4 border-b items-center" data-testid={testid}>
        <PersonPhoto person={person} className="w-16 h-16 rounded-full shrink-0" />
        <div className="min-w-0">
          <div className="font-display text-[16px] text-[hsl(var(--pine))] leading-snug">{unnamed ? <ToBePublished /> : person.name}</div>
          <div className="text-[13.5px] text-foreground/75 mt-0.5">{person.role}{person.qualification ? `, ${person.qualification}` : ""}</div>
        </div>
      </div>
    );
  }
  return (
    <article className="group h-full flex flex-col" data-testid={testid}>
      <div className="aspect-[4/5] bg-[hsl(var(--sand))] overflow-hidden"><PersonPhoto person={person} className="img-zoom w-full h-full" /></div>
      <div className="pt-4 flex-1">
        <h3 className="font-display text-[16px] leading-snug text-[hsl(var(--pine))]">{unnamed ? <span className="flex flex-col gap-1.5 items-start"><span>{person.role}</span><ToBePublished /></span> : person.name}</h3>
        {!unnamed && <p className="text-[13.5px] text-foreground/75 mt-1 leading-snug">{person.role}{person.qualification ? `, ${person.qualification}` : ""}</p>}
        <p className="text-[12px] text-muted-foreground mt-1.5">{person.institution}</p>
        {person.email && <a href={`mailto:${person.email}`} className="mt-2 block text-[12.5px] text-[hsl(var(--lagoon))] hover:underline break-all" data-testid={`${testid}-email`}>{person.email}</a>}
      </div>
    </article>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-[1280px] mx-auto px-4 sm:px-8 ${className}`}>{children}</div>;
}
