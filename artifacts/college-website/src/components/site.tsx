import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { Phone, Mail, MapPin, ArrowUpRight, ArrowRight, Plus } from "lucide-react";

export const asset = (p: string) => import.meta.env.BASE_URL + p;
export const PHONE = "08647-247190";
export const PHONE_TEL = "tel:+918647247190";
export const MAP = "https://www.google.com/maps/search/?api=1&query=A.M.+Reddy+Memorial+College+of+Engineering+Petlurivaripalem+Narasaraopet";
export const EASE = [0.22, 1, 0.36, 1] as const;

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

export const WINGS = [
  { key: "pharmacy", href: "/pharmacy", color: "var(--pharm)", img: "img/pharmacy.jpg", year: "2004", short: "Pharmacy", name: "College of Pharmacy", full: "A.M. Reddy Memorial College of Pharmacy", verb: "Discover", progs: ["B.Pharm", "Pharm.D", "M.Pharm"], note: "PCI approved. Permanently affiliated to Acharya Nagarjuna University." },
  { key: "engineering", href: "/engineering", color: "var(--eng)", img: "img/engineering.jpg", year: "2008", short: "Engineering", name: "College of Engineering", full: "A.M. Reddy Memorial College of Engineering and Technology", verb: "Build", progs: ["9 B.Tech branches", "M.Tech"], note: "Autonomous. AICTE approved. Permanently affiliated to JNTUK." },
  { key: "polytechnic", href: "/polytechnic", color: "var(--poly)", img: "img/workshop.jpg", year: "Diploma", short: "Polytechnic", name: "Polytechnic", full: "Diploma in Engineering", verb: "Make", progs: ["Civil", "EEE", "Mech", "ECE", "CSE", "Cloud"], note: "Hands-on technician training, offered under the engineering college." },
];

const NAV = [
  { label: "Pharmacy", href: "/pharmacy" },
  { label: "Engineering", href: "/engineering" },
  { label: "Polytechnic", href: "/polytechnic" },
  { label: "Campus Life", href: "/campus-life" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function Logo({ light }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0" data-testid="link-logo">
      <img src={asset("brand/amr-logo.png")} alt="A.M. Reddy crest" className="w-9 h-9 rounded-full bg-[hsl(60_25%_98%)] p-0.5" />
      <span className={`font-display text-[19px] leading-none ${light ? "text-[hsl(60_25%_96%)]" : ""}`}>AMR<span className="text-[hsl(var(--pharm))]">.</span></span>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loc] = useLocation();
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [loc]);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);
  const active = (h: string) => loc.startsWith(h);
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-5 pt-3">
        <motion.div initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: EASE }}
          className={`mx-auto max-w-7xl flex items-center justify-between gap-3 rounded-full pl-3 pr-2 h-14 transition-all duration-500 ${scrolled || open ? "bg-[hsl(60_25%_98%/0.78)] backdrop-blur-xl border border-[hsl(var(--ink)/0.08)] shadow-[0_12px_40px_-18px_hsl(var(--ink)/0.35)]" : "border border-transparent"}`}>
          <Logo />
          <nav className="hidden lg:flex items-center gap-0.5 text-[14px] font-medium">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="relative px-3.5 py-2 rounded-full" data-testid={`link-nav-${n.href.slice(1)}`}>
                {active(n.href) && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-[hsl(var(--ink))]" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                <span className={`relative ${active(n.href) ? "text-[hsl(60_25%_96%)]" : "hover:opacity-60 transition-opacity"}`}>{n.label}</span>
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1.5">
            <Link href="/admissions#enquire" className="group hidden sm:inline-flex items-center gap-2 rounded-full bg-[hsl(var(--lime))] text-[hsl(var(--ink))] font-semibold pl-4 pr-1.5 py-1.5 text-sm" data-testid="link-header-enquire">
              Admissions <span className="w-7 h-7 rounded-full bg-[hsl(var(--ink))] text-[hsl(var(--lime))] grid place-items-center transition-transform group-hover:rotate-45"><ArrowUpRight className="w-4 h-4" /></span>
            </Link>
            <button className="lg:hidden h-10 px-4 rounded-full bg-[hsl(var(--ink))] text-[hsl(60_25%_96%)] text-sm font-medium flex items-center gap-2" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} data-testid="button-mobile-menu">
              {open ? "Close" : "Menu"}
              <motion.span animate={{ rotate: open ? 45 : 0 }}><Plus className="w-4 h-4" /></motion.span>
            </button>
          </div>
        </motion.div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ clipPath: "circle(0% at 92% 4%)" }} animate={{ clipPath: "circle(150% at 92% 4%)" }} exit={{ clipPath: "circle(0% at 92% 4%)" }} transition={{ duration: 0.7, ease: EASE }}
            className="lg:hidden fixed inset-0 z-40 bg-[hsl(var(--ink))] text-[hsl(60_25%_96%)] gridlines-dark overflow-y-auto">
            <div className="min-h-full flex flex-col px-6 pt-24 pb-8">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4">Navigate</div>
              <nav className="flex flex-col">
                {[{ label: "Home", href: "/" }, ...NAV, { label: "Admissions", href: "/admissions" }].map((n, i) => (
                  <motion.div key={n.href} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: EASE }}>
                    <Link href={n.href} className="flex items-baseline justify-between border-b border-white/10 py-3" data-testid={`link-mobile-${n.href.slice(1) || "home"}`}>
                      <span className={`font-display text-[2.4rem] leading-none ${(n.href === "/" ? loc === "/" : active(n.href)) ? "text-[hsl(var(--lime))]" : ""}`}>{n.label}</span>
                      <span className="font-mono text-xs text-white/40">0{i + 1}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-auto pt-10 grid grid-cols-2 gap-2">
                <a href={PHONE_TEL} className="rounded-2xl border border-white/15 p-4 text-sm" data-testid="link-mobile-call"><Phone className="w-4 h-4 mb-3 text-[hsl(var(--lime))]" />{PHONE}</a>
                <Link href="/admissions#enquire" className="rounded-2xl bg-[hsl(var(--lime))] text-[hsl(var(--ink))] p-4 text-sm font-semibold" data-testid="link-mobile-enquire"><ArrowUpRight className="w-4 h-4 mb-3" />Admission enquiry</Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileDock() {
  const [show, setShow] = useState(false);
  const [loc] = useLocation();
  useEffect(() => {
    const f = () => setShow(window.scrollY > 400);
    f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="sm:hidden fixed bottom-3 inset-x-3 z-40 flex gap-1.5 rounded-full bg-[hsl(var(--ink))] p-1.5 shadow-[0_20px_50px_-15px_hsl(var(--ink)/0.6)]">
          <a href={PHONE_TEL} className="flex-1 flex items-center justify-center gap-2 rounded-full text-[hsl(60_25%_96%)] text-sm font-medium py-3" data-testid="button-dock-call"><Phone className="w-4 h-4" /> Call</a>
          {!loc.startsWith("/admissions") && (
            <Link href="/admissions#enquire" className="flex-[1.4] flex items-center justify-center gap-2 rounded-full bg-[hsl(var(--lime))] text-[hsl(var(--ink))] text-sm font-semibold py-3" data-testid="button-dock-enquire">Enquire now <ArrowRight className="w-4 h-4" /></Link>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Footer() {
  return (
    <footer className="relative mt-28 bg-[hsl(var(--ink))] text-[hsl(60_25%_92%)] overflow-hidden rounded-t-[2.5rem]">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          <div>
            <Logo light />
            <p className="mt-6 text-sm text-white/55 max-w-sm leading-relaxed">Sponsored by the Atluri Mastan Reddy Educational Society (Reg. No 450/2003). One campus amid the fields of Petlurivaripalem, about 3 km from Narasaraopet.</p>
          </div>
          <FootCol title="Institutions" links={[["College of Pharmacy", "/pharmacy"], ["College of Engineering", "/engineering"], ["Polytechnic", "/polytechnic"]]} />
          <FootCol title="Explore" links={[["Admissions", "/admissions"], ["Campus Life", "/campus-life"], ["About", "/about"], ["Contact", "/contact"]]} />
          <div className="space-y-3 text-sm">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 mb-5">Reach us</h4>
            <a href={PHONE_TEL} className="flex gap-2.5 hover:text-[hsl(var(--lime))]" data-testid="link-footer-phone"><Phone className="w-4 h-4 mt-0.5" />{PHONE}</a>
            <a href="mailto:principal.amreddyengineering@gmail.com" className="flex gap-2.5 hover:text-[hsl(var(--lime))] break-all" data-testid="link-footer-email-eng"><Mail className="w-4 h-4 mt-0.5 shrink-0" />principal.amreddyengineering@gmail.com</a>
            <a href="mailto:info@amreddypharmacy.co.in" className="flex gap-2.5 hover:text-[hsl(var(--lime))]" data-testid="link-footer-email-pharm"><Mail className="w-4 h-4 mt-0.5" />info@amreddypharmacy.co.in</a>
            <a href={MAP} target="_blank" rel="noreferrer" className="flex gap-2.5 hover:text-[hsl(var(--lime))]" data-testid="link-footer-map"><MapPin className="w-4 h-4 mt-0.5 shrink-0" />Petlurivaripalem, Narasaraopet, Palnadu Dt., A.P.</a>
          </div>
        </div>
        <div className="mt-20 select-none font-display leading-[0.78] text-[22vw] md:text-[17vw] tracking-[-0.07em] text-transparent [-webkit-text-stroke:1px_hsl(0_0%_100%/0.18)]" aria-hidden>A.M. Reddy</div>
        <div className="mt-6 flex flex-col sm:flex-row justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-white/40 pb-16 sm:pb-0">
          <span>A.M. Reddy Educational Institutions, Narasaraopet</span><span>Pharmacy / Engineering / Polytechnic</span>
        </div>
      </div>
    </footer>
  );
}

function FootCol({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 mb-5">{title}</h4>
      <ul className="space-y-3 text-[15px]">
        {links.map(([l, h]) => <li key={h}><Link href={h} className="group inline-flex items-center gap-1 hover:text-[hsl(var(--lime))]" data-testid={`link-footer-${h.slice(1)}`}>{l}<ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></Link></li>)}
      </ul>
    </div>
  );
}

function Progress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  return <motion.div style={{ scaleX: x }} className="fixed top-0 inset-x-0 h-[3px] origin-left z-[60] bg-[hsl(var(--lime))]" />;
}

export function Layout({ children }: { children: ReactNode }) {
  const [loc] = useLocation();
  return (
    <div className="grain min-h-[100dvh] flex flex-col">
      <Progress />
      <Header />
      <motion.main key={loc} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="flex-1">
        {children}
      </motion.main>
      <Footer />
      <MobileDock />
    </div>
  );
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, delay, ease: EASE }} className={className}>
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, light, color }: { children: ReactNode; light?: boolean; color?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] ${light ? "text-white/60" : "text-muted-foreground"}`}>
      <span className="w-2 h-2 rounded-full" style={{ background: `hsl(${color ?? "var(--lime)"})` }} />{children}
    </div>
  );
}

/** Splits a headline into words that rise one after another. */
export function SplitHead({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.2em] -mb-[0.2em]" aria-hidden>
          <motion.span className="inline-block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: delay + i * 0.06, ease: EASE }}>{w}&nbsp;</motion.span>
        </span>
      ))}
    </span>
  );
}

export function PageHero({ eyebrow, title, sub, img, logo, color = "var(--lime)", children }: { eyebrow: string; title: string; sub: string; img: string; logo?: string; color?: string; children?: ReactNode }) {
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 800], [0, 160]);
  return (
    <section className="relative pt-28 md:pt-36 px-3 sm:px-5">
      <div className="max-w-7xl mx-auto px-3 sm:px-1">
        <div className="flex items-center gap-3">
          {logo && <img src={asset(logo)} alt="" className="w-9 h-9 rounded-full bg-card p-0.5 border" />}
          <Eyebrow color={color}>{eyebrow}</Eyebrow>
        </div>
        <h1 className="font-display text-[2.6rem] leading-[0.95] sm:text-6xl md:text-[5.6rem] mt-6 max-w-6xl"><SplitHead text={title} /></h1>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease: EASE }} className="mt-8 grid md:grid-cols-[1fr_auto] gap-6 items-end">
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">{sub}</p>
          {children}
        </motion.div>
      </div>
      <motion.div initial={{ clipPath: "inset(30% 10% 0% 10% round 2.5rem)" }} animate={{ clipPath: "inset(0% 0% 0% 0% round 2.5rem)" }} transition={{ duration: 1.3, delay: 0.25, ease: EASE }}
        className="relative max-w-7xl mx-auto mt-12 h-[44vh] md:h-[62vh] overflow-hidden rounded-[2.5rem]">
        <motion.img style={{ y: imgY, scale: 1.15 }} src={asset(img)} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, transparent 40%, hsl(${color} / 0.55))` }} />
      </motion.div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, sub, color, light }: { eyebrow: string; title: ReactNode; sub?: string; color?: string; light?: boolean }) {
  return (
    <Reveal className="max-w-4xl mb-12">
      <Eyebrow color={color} light={light}>{eyebrow}</Eyebrow>
      <h2 className="font-display text-[2.2rem] md:text-6xl mt-4 leading-[0.98]">{title}</h2>
      {sub && <p className={`mt-5 text-lg max-w-2xl ${light ? "text-white/60" : "text-muted-foreground"}`}>{sub}</p>}
    </Reveal>
  );
}

export function Chip({ children, light }: { children: ReactNode; light?: boolean }) {
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${light ? "border-white/20 text-white/85 bg-white/5" : "border-[hsl(var(--ink)/0.15)] bg-card"}`}>{children}</span>;
}

export function PrimaryBtn({ href, children, testid }: { href: string; children: ReactNode; testid: string }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-3 rounded-full bg-[hsl(var(--ink))] text-[hsl(60_25%_96%)] font-semibold pl-6 pr-2 py-2 whitespace-nowrap" data-testid={testid}>
      {children}
      <span className="w-10 h-10 rounded-full bg-[hsl(var(--lime))] text-[hsl(var(--ink))] grid place-items-center transition-transform duration-500 group-hover:rotate-[360deg]"><ArrowUpRight className="w-5 h-5" /></span>
    </Link>
  );
}

export function CTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[hsl(var(--lime))] text-[hsl(var(--ink))] p-8 md:p-16">
          <div className="absolute -right-20 -bottom-28 w-[420px] h-[420px] spin-slow opacity-90" aria-hidden>
            <svg viewBox="0 0 200 200" className="w-full h-full"><defs><path id="c" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" /></defs><text className="font-mono" fontSize="11" letterSpacing="4" fill="currentColor"><textPath href="#c">ADMISSIONS OPEN / PHARMACY / ENGINEERING / POLYTECHNIC /</textPath></text></svg>
          </div>
          <div className="relative max-w-3xl">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em]">Next step</div>
            <h2 className="font-display text-[2.4rem] md:text-7xl mt-4 leading-[0.92]">Your seat is a conversation away.</h2>
            <p className="mt-6 text-lg max-w-xl opacity-75">Share a few details and the admissions office will call you back with fees, eligibility and branch guidance.</p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <PrimaryBtn href="/admissions#enquire" testid="link-cta-enquire">Start an enquiry</PrimaryBtn>
              <a href={PHONE_TEL} className="inline-flex items-center justify-center gap-2 rounded-full border border-[hsl(var(--ink)/0.3)] px-6 py-4 font-semibold hover:bg-[hsl(var(--ink)/0.06)]" data-testid="link-cta-call"><Phone className="w-4 h-4" /> {PHONE}</a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
