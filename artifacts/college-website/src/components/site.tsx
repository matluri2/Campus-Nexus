import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, MapPin, MessageCircle, FileText, ChevronDown, ArrowUpRight, Megaphone } from "lucide-react";

export const asset = (p: string) => import.meta.env.BASE_URL + p;
export const PHONE = "08647-247190";
export const PHONE_TEL = "tel:+918647247190";
export const WHATSAPP = "https://wa.me/919550254554";
export const MAP = "https://www.google.com/maps/search/?api=1&query=A.M.+Reddy+Memorial+College+of+Engineering+Petlurivaripalem+Narasaraopet";

export const NEWS = [
  { date: "23-24 Dec 2025", title: "AMR Hackathon-2025", tag: "Engineering" },
  { date: "23 Dec 2025", title: "24-hour Code Crusade coding marathon", tag: "Engineering" },
  { date: "22 Dec 2025", title: "Dental camp organised on campus", tag: "Campus" },
  { date: "2-11 Jan 2026", title: "Skill-based workshop: Machine Learning in Health Care", tag: "Workshop" },
  { date: "9 Jan 2026", title: "Sankranthi Sambaralu 2026", tag: "Celebration" },
  { date: "Notice", title: "I B.Tech examination timetable released", tag: "Exams" },
  { date: "Report", title: "IQAC Audit Report 2024-25 published", tag: "IQAC" },
  { date: "Jan 2025", title: "23 AMR students selected for Thinksysq, Bangalore", tag: "Placements" },
  { date: "15 Apr 2025", title: "Pharmacy students placed with Carro Health in pool drive", tag: "Pharmacy" },
  { date: "Mar 2025", title: "Divis pool campus drive for pharmacy students", tag: "Pharmacy" },
  { date: "2025", title: "National Science Day and B.Pharm Freshers Day 2025", tag: "Pharmacy" },
];

const NAV = [
  { label: "Home", href: "/" },
  { label: "Academics", children: [
    { label: "College of Pharmacy", href: "/pharmacy", desc: "B.Pharm, Pharm.D, M.Pharm. Since 2004." },
    { label: "College of Engineering", href: "/engineering", desc: "Autonomous. B.Tech and M.Tech. Since 2008." },
    { label: "Polytechnic", href: "/polytechnic", desc: "Diploma in Engineering, six branches." },
  ]},
  { label: "Admissions", href: "/admissions" },
  { label: "Campus Life", href: "/campus-life" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function Ticker() {
  const items = [...NEWS, ...NEWS];
  return (
    <div className="bg-[hsl(350_45%_14%)] text-[hsl(40_60%_92%)] text-[13px] flex items-stretch overflow-hidden">
      <div className="shrink-0 bg-accent text-accent-foreground font-bold px-3 sm:px-4 flex items-center gap-2 z-10 uppercase tracking-wider text-[11px]">
        <Megaphone className="w-3.5 h-3.5" /> Latest
      </div>
      <div className="overflow-hidden flex-1 py-2">
        <div className="marquee flex gap-10 whitespace-nowrap w-max" data-testid="ticker-news">
          {items.map((n, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="text-accent font-semibold">{n.date}</span>
              <span className="opacity-90">{n.title}</span>
              <span className="w-1 h-1 rounded-full bg-accent/60 ml-8" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loc] = useLocation();
  useEffect(() => { setOpen(false); setMega(false); window.scrollTo(0, 0); }, [loc]);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f);
  }, []);
  const active = (h?: string) => h && (h === "/" ? loc === "/" : loc.startsWith(h));
  return (
    <header className={`sticky top-0 z-40 transition-shadow ${scrolled ? "shadow-[0_8px_30px_-12px_hsl(348_72%_20%/0.35)]" : ""}`}>
      <div className="hidden md:flex bg-primary text-primary-foreground/90 text-xs">
        <div className="max-w-7xl mx-auto w-full px-6 py-1.5 flex justify-between">
          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Petlurivaripalem, Narasaraopet, Palnadu Dt., A.P.</span>
          <span className="flex gap-5">
            <a href={PHONE_TEL} className="hover:text-accent" data-testid="link-top-phone">{PHONE}</a>
            <a href="tel:+919550254554" className="hover:text-accent" data-testid="link-top-women-helpline">Women helpline +91 95502 54554</a>
          </span>
        </div>
      </div>
      <div className="bg-background/95 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 min-w-0" data-testid="link-logo">
            <img src={asset("brand/amr-logo.png")} alt="A.M. Reddy crest" className="w-11 h-11 rounded-full ring-2 ring-accent/60 bg-white" />
            <span className="leading-tight min-w-0">
              <span className="font-display font-bold text-primary text-lg block truncate">A.M. Reddy</span>
              <span className="text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground block truncate">Educational Institutions</span>
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-1 text-[14.5px] font-semibold">
            {NAV.map((n) => n.children ? (
              <div key={n.label} className="relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
                <button onClick={() => setMega(!mega)} className={`px-3 py-2 rounded-full flex items-center gap-1 hover:bg-secondary ${n.children.some(c => active(c.href)) ? "text-primary" : ""}`} data-testid="button-nav-academics">
                  {n.label} <ChevronDown className={`w-4 h-4 transition-transform ${mega ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mega && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.18 }} className="absolute left-1/2 -translate-x-1/2 top-full pt-3">
                      <div className="w-[560px] bg-card border rounded-2xl p-3 shadow-[0_30px_60px_-20px_hsl(348_72%_20%/0.35)] grid grid-cols-[1fr_180px] gap-3">
                        <div className="flex flex-col">
                          {n.children.map((c) => (
                            <Link key={c.href} href={c.href} className="group p-3 rounded-xl hover:bg-secondary flex justify-between items-start" data-testid={`link-mega-${c.href.slice(1)}`}>
                              <span><span className="block font-bold text-foreground">{c.label}</span><span className="block text-xs font-medium text-muted-foreground mt-0.5">{c.desc}</span></span>
                              <ArrowUpRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          ))}
                        </div>
                        <Link href="/admissions" className="rounded-xl bg-primary text-primary-foreground p-4 flex flex-col justify-between" data-testid="link-mega-admissions">
                          <span className="text-[11px] uppercase tracking-widest text-accent">Admissions open</span>
                          <span className="font-display text-xl leading-tight">Begin your enquiry</span>
                          <ArrowUpRight className="w-5 h-5 text-accent" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link key={n.href} href={n.href!} className={`px-3 py-2 rounded-full hover:bg-secondary ${active(n.href) ? "text-primary bg-secondary" : ""}`} data-testid={`link-nav-${n.label.toLowerCase().replace(" ", "-")}`}>{n.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/admissions#enquire" className="hidden sm:inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground font-bold px-5 py-2.5 text-sm hover:brightness-105 transition" data-testid="link-header-enquire">Enquire now</Link>
            <button className="lg:hidden p-2.5 rounded-full bg-secondary" onClick={() => setOpen(!open)} aria-label="Menu" data-testid="button-mobile-menu">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="lg:hidden absolute inset-x-0 top-full bg-background border-b shadow-xl max-h-[80dvh] overflow-y-auto">
            <div className="p-4 flex flex-col gap-1">
              {NAV.flatMap((n) => n.children ? n.children.map(c => ({ label: c.label, href: c.href, desc: c.desc })) : [{ label: n.label, href: n.href!, desc: "" }]).map((n) => (
                <Link key={n.href} href={n.href} className={`px-4 py-3.5 rounded-xl font-semibold ${active(n.href) ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`} data-testid={`link-mobile-${n.href.slice(1) || "home"}`}>
                  {n.label}{n.desc && <span className={`block text-xs font-normal ${active(n.href) ? "opacity-80" : "text-muted-foreground"}`}>{n.desc}</span>}
                </Link>
              ))}
              <Link href="/admissions#enquire" className="mt-2 text-center rounded-xl bg-accent text-accent-foreground font-bold py-3.5" data-testid="link-mobile-enquire">Admission enquiry</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function FloatingActions() {
  const btn = "w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform";
  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-2.5">
      <a href={PHONE_TEL} className={`${btn} bg-primary text-primary-foreground`} aria-label="Call" data-testid="button-float-call"><Phone className="w-5 h-5" /></a>
      <a href={WHATSAPP} target="_blank" rel="noreferrer" className={`${btn} bg-[hsl(145_55%_36%)] text-white`} aria-label="WhatsApp" data-testid="button-float-whatsapp"><MessageCircle className="w-5 h-5" /></a>
      <Link href="/admissions#enquire" className={`${btn} bg-accent text-accent-foreground`} aria-label="Enquire" data-testid="button-float-enquire"><FileText className="w-5 h-5" /></Link>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[hsl(350_45%_11%)] text-[hsl(40_40%_88%)] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src={asset("brand/amr-logo.png")} alt="" className="w-14 h-14 rounded-full bg-white" />
            <div className="font-display text-2xl text-white">A.M. Reddy<br /><span className="text-sm font-sans tracking-widest uppercase text-accent">Educational Institutions</span></div>
          </div>
          <p className="mt-5 text-sm opacity-75 max-w-sm">Sponsored by the Atluri Mastan Reddy Educational Society (Reg. No 450/2003). One campus amid the fields of Petlurivaripalem, about 3 km from Narasaraopet.</p>
        </div>
        <div>
          <h4 className="text-accent text-xs uppercase tracking-widest font-bold mb-4">Institutions</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/pharmacy" className="hover:text-accent" data-testid="link-footer-pharmacy">College of Pharmacy</Link></li>
            <li><Link href="/engineering" className="hover:text-accent" data-testid="link-footer-engineering">College of Engineering</Link></li>
            <li><Link href="/polytechnic" className="hover:text-accent" data-testid="link-footer-polytechnic">Polytechnic</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-accent text-xs uppercase tracking-widest font-bold mb-4">Explore</h4>
          <ul className="space-y-2.5 text-sm">
            {[["Admissions","/admissions"],["Campus Life","/campus-life"],["About","/about"],["Contact","/contact"]].map(([l,h]) => <li key={h}><Link href={h} className="hover:text-accent" data-testid={`link-footer-${h.slice(1)}`}>{l}</Link></li>)}
          </ul>
        </div>
        <div className="space-y-3 text-sm">
          <h4 className="text-accent text-xs uppercase tracking-widest font-bold mb-4">Reach us</h4>
          <a href={PHONE_TEL} className="flex gap-2 hover:text-accent"><Phone className="w-4 h-4 mt-0.5" />{PHONE}</a>
          <a href="mailto:principal.amreddyengineering@gmail.com" className="flex gap-2 hover:text-accent break-all"><Mail className="w-4 h-4 mt-0.5 shrink-0" />principal.amreddyengineering@gmail.com</a>
          <a href="mailto:info@amreddypharmacy.co.in" className="flex gap-2 hover:text-accent"><Mail className="w-4 h-4 mt-0.5" />info@amreddypharmacy.co.in</a>
          <a href={MAP} target="_blank" rel="noreferrer" className="flex gap-2 hover:text-accent"><MapPin className="w-4 h-4 mt-0.5 shrink-0" />Petlurivaripalem, Narasaraopet, Palnadu Dt., A.P.</a>
        </div>
      </div>
      <div className="border-t border-white/10 text-xs opacity-60 text-center py-5 px-6">A.M. Reddy Educational Institutions, Narasaraopet</div>
    </footer>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="grain min-h-[100dvh] flex flex-col">
      <Ticker />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return <div className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] ${light ? "text-accent" : "text-primary"}`}><span className="w-6 h-px bg-current" />{children}</div>;
}

export function PageHero({ eyebrow, title, sub, img, logo, children }: { eyebrow: string; title: ReactNode; sub: string; img: string; logo?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-[hsl(350_45%_12%)] text-white">
      <motion.img initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.6 }} src={asset(img)} alt="" className="absolute inset-0 w-full h-full object-cover opacity-45" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(350_50%_10%)] via-[hsl(350_50%_12%/0.75)] to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
          {logo && <img src={asset(logo)} alt="" className="w-16 h-16 rounded-xl bg-white p-1 mb-6" />}
          <Eyebrow light>{eyebrow}</Eyebrow>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl mt-4 leading-[1.05]">{title}</h1>
          <p className="mt-5 text-lg text-white/80 max-w-2xl">{sub}</p>
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub?: string }) {
  return (
    <Reveal className="max-w-3xl mb-10">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display text-3xl md:text-5xl mt-3 leading-[1.08] text-foreground">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground text-lg">{sub}</p>}
    </Reveal>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 backdrop-blur px-3 py-1 text-xs font-semibold">{children}</span>;
}

export function CTA() {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-primary text-primary-foreground p-10 md:p-16 grid md:grid-cols-[1.5fr_1fr] gap-8 items-center">
          <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full border-[40px] border-accent/20" />
          <div className="relative">
            <Eyebrow light>Admissions</Eyebrow>
            <h2 className="font-display text-3xl md:text-5xl mt-3 leading-tight">Your seat in Palnadu's own campus is a conversation away.</h2>
            <p className="mt-4 opacity-80">Share a few details and the admissions office will call you back with fees, eligibility and branch guidance.</p>
          </div>
          <div className="relative flex flex-col sm:flex-row md:flex-col gap-3">
            <Link href="/admissions#enquire" className="rounded-full bg-accent text-accent-foreground font-bold px-7 py-4 text-center" data-testid="link-cta-enquire">Submit an enquiry</Link>
            <a href={PHONE_TEL} className="rounded-full border border-white/30 px-7 py-4 text-center font-semibold hover:bg-white/10" data-testid="link-cta-call">Call {PHONE}</a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
