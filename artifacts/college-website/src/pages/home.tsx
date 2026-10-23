import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence, useReducedMotion, useInView } from "framer-motion";
import {
  ArrowRight, ChevronLeft, ChevronRight, ShieldAlert, FileCheck2, GraduationCap, Megaphone, Award, Landmark, BadgeCheck,
  Lightbulb, BedDouble, Bus, Library, Cpu, Quote, Calendar, Briefcase, Phone,
} from "lucide-react";
import { Container, Reveal, SectionTitle, PersonPhoto, ToBePublished } from "@/components/layout";
import { asset, INSTITUTIONS, NEWS, PHONE, PHONE_TEL } from "@/data/site";
import { LEADERSHIP, ALUMNI } from "@/data/people";
import { EVENT_PHOTOS, RECRUITER_LOGOS } from "@/data/gallery";

const EASE = [0.22, 1, 0.36, 1] as const;

const SLIDES = [
  { img: "img/amr/eng-about-college.jpg", pos: "center 60%", kicker: "Narasaraopet, Palnadu District / Since 2004", title: "Professional education in pharmacy, engineering and technology", sub: "The College of Pharmacy, the autonomous College of Engineering and Technology, and the Polytechnic, on one 10.94-acre campus at Petlurivaripalem." },
  { img: "img/amr/eng-gallery-gallery4.jpg", pos: "center 35%", kicker: "Learning by doing", title: "Laboratories, projects and an incubation centre", sub: "Six CSE laboratories with 368 air-conditioned systems, pharmacy laboratories and the AMR Incubation Foundation." },
  { img: "img/amr/pharm-student-life-sports-sports01.jpg", pos: "center 40%", kicker: "Campus life", title: "Sports, festivals, NSS and a residential campus", sub: "Separate hostels for men and women, a college bus network, sports grounds and year-round student activities." },
  { img: "img/amr/eng-placements-thinksysq-01.jpg", pos: "center 30%", kicker: "Training and placement", title: "Campus drives for engineering and pharmacy", sub: "23 students selected for Thinksysq, Bangalore (Jan 2025); pool drives with Divis and Carro Health for pharmacy students." },
];

function Hero() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 6500);
    return () => clearInterval(t);
  }, [reduce, paused]);
  const s = SLIDES[i];
  const go = (d: number) => setI((n) => (n + d + SLIDES.length) % SLIDES.length);
  return (
    <section className="relative h-[540px] md:h-[580px] bg-[hsl(var(--ink))] text-white overflow-hidden" aria-roledescription="carousel" aria-label="Highlights" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <AnimatePresence initial={false}>
        <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className="absolute inset-0 overflow-hidden">
          <img src={asset(s.img)} alt="" className={`absolute inset-0 w-full h-full object-cover ${reduce ? "" : "kenburns"}`} style={{ objectPosition: s.pos }} />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--ink)/0.9)] via-[hsl(var(--ink)/0.6)] to-[hsl(var(--ink)/0.15)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[hsl(var(--ink)/0.7)] to-transparent" />
      <Container className="relative h-full flex flex-col justify-center pb-16">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.5, ease: EASE }} className="max-w-2xl">
            <div className="eyebrow eyebrow-light">{s.kicker}</div>
            {i === 0
              ? <h1 className="font-display text-[32px] sm:text-[42px] lg:text-[50px] leading-[1.12] mt-3" data-testid="text-hero-title">{s.title}</h1>
              : <p className="font-display text-[32px] sm:text-[42px] lg:text-[50px] leading-[1.12] mt-3" data-testid="text-hero-title">{s.title}</p>}
            <p className="mt-4 text-[15px] md:text-[17px] text-white/80 leading-relaxed max-w-xl">{s.sub}</p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/admissions#enquire" className="group inline-flex items-center gap-2 h-12 px-6 rounded-md bg-[hsl(var(--saffron))] text-[hsl(var(--ink))] font-bold text-[15px] hover:brightness-105" data-testid="link-hero-admissions">Apply for Admissions 2026 <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></Link>
          <Link href="/about" className="inline-flex items-center h-12 px-6 rounded-md border border-white/40 font-semibold text-[15px] hover:bg-white/10" data-testid="link-hero-about">Explore the campus</Link>
        </div>
      </Container>
      <div className="absolute bottom-20 md:bottom-24 inset-x-0">
        <Container className="flex items-center gap-3">
          <button onClick={() => go(-1)} aria-label="Previous slide" className="w-9 h-9 rounded-full border border-white/40 grid place-items-center hover:bg-white/15" data-testid="button-hero-prev"><ChevronLeft className="w-4 h-4" /></button>
          <div className="flex gap-1.5" role="tablist" aria-label="Choose slide">
            {SLIDES.map((sl, k) => (
              <button key={sl.img} role="tab" aria-selected={k === i} aria-label={`Slide ${k + 1}: ${sl.title}`} onClick={() => setI(k)} className="h-6 flex items-center" data-testid={`button-hero-slide-${k}`}>
                <span className={`block h-1 rounded-full transition-all duration-500 ${k === i ? "w-8 bg-[hsl(var(--saffron))]" : "w-4 bg-white/45 hover:bg-white/70"}`} />
              </button>
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next slide" className="w-9 h-9 rounded-full border border-white/40 grid place-items-center hover:bg-white/15" data-testid="button-hero-next"><ChevronRight className="w-4 h-4" /></button>
        </Container>
      </div>
    </section>
  );
}

const QUICK = [
  { icon: GraduationCap, t: "Admission Enquiry", d: "Programmes and eligibility", h: "/admissions#enquire" },
  { icon: FileCheck2, t: "UGC Self-Disclosure", d: "Mandatory public information", h: "/disclosure" },
  { icon: ShieldAlert, t: "Anti-Ragging", d: "Helpline 1800-180-5522", h: "/committees#anti-ragging" },
  { icon: Megaphone, t: "Notices", d: "Examinations and announcements", h: "/notices" },
];

function QuickLinks() {
  return (
    <Container className="relative z-10 -mt-14">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {QUICK.map((q) => (
          <Link key={q.t} href={q.h} className="card-soft card-hover group flex items-center gap-3 p-4" data-testid={`link-quick-${q.h.replace(/\W+/g, "-")}`}>
            <span className="w-11 h-11 rounded-lg grid place-items-center bg-[hsl(var(--primary))] text-white shrink-0 group-hover:bg-[hsl(var(--saffron))] group-hover:text-[hsl(var(--ink))] transition-colors"><q.icon className="w-5 h-5" /></span>
            <span className="min-w-0"><span className="block font-display text-[14px] text-[hsl(var(--primary))]">{q.t}</span><span className="block text-[12.5px] text-muted-foreground truncate">{q.d}</span></span>
          </Link>
        ))}
      </div>
    </Container>
  );
}

function CountUp({ to, decimals = 0, plain }: { to: number; decimals?: number; plain?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [v, setV] = useState(plain || reduce ? to : 0);
  useEffect(() => {
    if (!inView || plain || reduce) return;
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => { const p = Math.min(1, (t - t0) / 1400); setV(to * (1 - Math.pow(1 - p, 3))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [inView, to, plain, reduce]);
  return <span ref={ref}>{v.toFixed(decimals)}</span>;
}

function Stats() {
  const stats: { n: number; d?: number; plain?: boolean; l: string }[] = [
    { n: 2004, plain: true, l: "College of Pharmacy established" },
    { n: 2008, plain: true, l: "College of Engineering established" },
    { n: 3, l: "Institutions on one campus" },
    { n: 9, l: "B.Tech branches" },
    { n: 6, l: "Pharmacy programmes (B.Pharm, Pharm.D, M.Pharm)" },
    { n: 10.94, d: 2, l: "Acres of campus" },
  ];
  return (
    <section className="py-14 md:py-16" aria-label="Key figures">
      <Container>
        <dl className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border rounded-xl overflow-hidden border">
          {stats.map((s, k) => (
            <div key={s.l} className="bg-card p-5 text-center">
              <dt className="sr-only">{s.l}</dt>
              <dd className="num-display text-[30px] md:text-[34px] text-[hsl(var(--primary))]" data-testid={`text-stat-${k}`}><CountUp to={s.n} decimals={s.d} plain={s.plain} /></dd>
              <dd className="text-[13px] text-muted-foreground mt-1.5 leading-snug">{s.l}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

function Welcome() {
  return (
    <section className="pb-16 md:pb-20">
      <Container className="grid lg:grid-cols-2 gap-10 items-center">
        <Reveal className="relative">
          <div className="rounded-xl overflow-hidden aspect-[16/10] shadow-lg"><img src={asset("img/amr/eng-gallery-gallery1.jpg")} alt="Academic blocks and lawns of the A.M. Reddy campus" className="w-full h-full object-cover" /></div>
          <div className="hidden sm:block absolute -bottom-6 -right-4 w-48 rounded-lg overflow-hidden border-4 border-background shadow-lg"><img src={asset("img/amr/eng-campus-library-3.jpg")} alt="Central library" className="w-full aspect-[4/3] object-cover" /></div>
        </Reveal>
        <Reveal delay={0.1}>
          <SectionTitle eyebrow="Welcome to A.M. Reddy" title="An institution rooted in Palnadu, preparing professionals for the nation" />
          <div className="prose-inst space-y-4">
            <p>Sponsored by the Atluri Mastan Reddy Educational Society (Reg. No. 450/2003), A.M. Reddy Educational Institutions began with the College of Pharmacy in 2004 and established the College of Engineering and Technology in 2008. Diploma programmes followed in 2013.</p>
            <p>The campus, set across 10.94 acres approximately 3 km from Narasaraopet, offers separate hostels for men and women, a college bus network, modern laboratories and an incubation centre.</p>
          </div>
          <Link href="/about" className="mt-6 inline-flex items-center gap-2 h-11 px-5 rounded-md bg-[hsl(var(--primary))] text-white font-semibold text-[14px] hover:bg-[hsl(var(--teal-deep))]" data-testid="link-welcome-about">About the institutions <ArrowRight className="w-4 h-4" /></Link>
        </Reveal>
      </Container>
    </section>
  );
}

const WHY = [
  { icon: Award, t: "Autonomous status", d: "The College of Engineering and Technology is an autonomous institution." },
  { icon: Landmark, t: "Permanent affiliation", d: "Engineering to JNTUK, Kakinada; Pharmacy to Acharya Nagarjuna University." },
  { icon: BadgeCheck, t: "AICTE and PCI approved", d: "Approved by AICTE and PCI, New Delhi, with NAAC, NBA and UGC recognition listed." },
  { icon: Lightbulb, t: "Incubation centre", d: "AMR Incubation Foundation hosts ideathons, hackathons and student start-up ideas." },
  { icon: Cpu, t: "Computing infrastructure", d: "Six CSE laboratories with 368 air-conditioned systems." },
  { icon: Library, t: "Libraries", d: "Central library for engineering and a dedicated pharmacy library." },
  { icon: BedDouble, t: "Separate hostels", d: "Separate hostels for boys and girls with round-the-clock security." },
  { icon: Bus, t: "College transport", d: "A fleet of college buses connecting the campus with surrounding towns." },
];

function WhyChoose() {
  return (
    <section className="bg-[hsl(var(--sand))] py-16 md:py-20">
      <Container>
        <SectionTitle center eyebrow="Why choose A.M. Reddy" title="Approved, affiliated and built for practical learning" />
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WHY.map((w, k) => (
            <Reveal key={w.t} delay={(k % 4) * 0.05}>
              <li className="card-soft card-hover h-full p-5 list-none" data-testid={`card-why-${k}`}>
                <span className="w-11 h-11 rounded-lg grid place-items-center bg-[hsl(var(--saffron)/0.15)] text-[hsl(var(--accent))]"><w.icon className="w-5 h-5" /></span>
                <h3 className="font-display text-[16px] text-[hsl(var(--primary))] mt-4">{w.t}</h3>
                <p className="text-[14px] text-muted-foreground mt-1.5 leading-relaxed">{w.d}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function Programmes() {
  const [tab, setTab] = useState(1);
  const ins = INSTITUTIONS[tab];
  const items = ins.groups.flatMap((g) => g.items.map((p) => ({ ...p, group: g.title })));
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8">
          <div className="[&>div]:mb-0"><SectionTitle eyebrow="Academics" title="Explore our institutions and programmes" /></div>
          <div role="tablist" aria-label="Institution" className="flex flex-wrap gap-1 p-1 bg-secondary rounded-lg">
            {INSTITUTIONS.map((x, k) => (
              <button key={x.key} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`px-4 h-10 rounded-md text-[14px] font-semibold transition-colors ${tab === k ? "bg-[hsl(var(--primary))] text-white shadow" : "text-[hsl(var(--primary))] hover:bg-white"}`} data-testid={`tab-programmes-${x.key}`}>{x.short}</button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={ins.key} role="tabpanel" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3, ease: EASE }} className="grid lg:grid-cols-[360px_1fr] gap-5">
            <Link href={ins.href} className="group card-soft overflow-hidden flex flex-col" data-testid={`card-institution-${ins.key}`}>
              <div className="relative aspect-[16/10] overflow-hidden"><img src={asset(ins.img)} alt={ins.name} className="img-zoom w-full h-full object-cover" /><span className="absolute top-3 left-3 text-[12px] font-bold px-2.5 py-1 rounded-md bg-[hsl(var(--saffron))] text-[hsl(var(--ink))]">Est. {ins.est}</span></div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-display text-[18px] text-[hsl(var(--primary))] leading-snug">{ins.name}</h3>
                <p className="text-[14px] text-muted-foreground mt-2">{ins.affiliation}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">{ins.approvals.slice(0, 4).map((a) => <span key={a} className="text-[11.5px] px-2 py-0.5 rounded bg-secondary text-[hsl(var(--primary))] font-semibold">{a}</span>)}</div>
                <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-[14px] font-bold text-[hsl(var(--accent))]">Visit the college <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
              </div>
            </Link>
            <ul className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3 content-start">
              {items.map((p, k) => (
                <li key={p.name}>
                  <Link href={`${ins.href}#programmes`} className="card-soft card-hover group flex flex-col h-full p-4 border-l-[3px] !border-l-[hsl(var(--primary))]" data-testid={`card-programme-${ins.key}-${k}`}>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[hsl(var(--accent))]">{p.group}</span>
                    <span className="font-display text-[15px] leading-snug mt-1.5 text-foreground group-hover:text-[hsl(var(--primary))]">{p.name}</span>
                    <span className="mt-auto pt-3 text-[12.5px] text-muted-foreground">{p.dur ?? "As per regulations"} · {p.intake ? <>Intake <b className="text-foreground">{p.intake}</b></> : "Intake to be published"}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}

function Leadership() {
  return (
    <section className="bg-[hsl(var(--primary))] text-white py-16 md:py-20 relative overflow-hidden">
      <Container className="relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="[&>div]:mb-0"><SectionTitle light eyebrow="Leadership" title="Messages from our leadership" /></div>
          <Link href="/administration" className="inline-flex items-center gap-2 text-[14px] font-semibold text-[hsl(var(--brass))] hover:underline" data-testid="link-home-administration">Administration and HoDs <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LEADERSHIP.map((p, k) => (
            <Reveal key={p.role + p.institution} delay={k * 0.05}>
              <article className="h-full rounded-xl bg-white text-foreground overflow-hidden flex flex-col shadow-lg" data-testid={`card-leader-${k}`}>
                <div className="aspect-[5/4] bg-[hsl(var(--sand))] overflow-hidden"><PersonPhoto person={p} className="w-full h-full" /></div>
                <div className="p-5 flex-1 flex flex-col">
                  {p.message && <p className="relative text-[14px] leading-relaxed text-foreground/80 italic mb-4"><Quote className="w-5 h-5 text-[hsl(var(--saffron))] mb-1" />{p.message}</p>}
                  <div className="mt-auto">
                    <h3 className="font-display text-[15px] text-[hsl(var(--primary))]">{p.name === "To be published" ? <ToBePublished /> : p.name}</h3>
                    <p className="text-[13px] text-foreground/80 mt-1">{p.role}{p.qualification ? `, ${p.qualification}` : ""}</p>
                    <p className="text-[12px] text-muted-foreground mt-0.5">{p.institution}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Placements() {
  const logos = [...RECRUITER_LOGOS, ...RECRUITER_LOGOS];
  const drives = [
    { img: "img/amr/eng-placements-thinksysq-01.jpg", r: "Thinksysq, Bangalore", d: "23 AMR students selected", t: "Jan 2025" },
    { img: "img/amr/pharm-student-life-placements-corro-health-corro-health-placement-01.jpg", r: "Carro Health", d: "Pharmacy students placed in pool drive", t: "15 Apr 2025" },
    { img: "img/amr/pharm-student-life-placements-divis-lab-08032025-placement1.jpg", r: "Divis", d: "Pool campus drive for pharmacy students", t: "8 Mar 2025" },
  ];
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="[&>div]:mb-0"><SectionTitle eyebrow="Training and Placement" title="Recent campus recruitment" sub="The placement cell runs training and campus drives across pharmacy and engineering." /></div>
          <Link href="/student-life#placements" className="inline-flex items-center gap-2 text-[14px] font-bold text-[hsl(var(--accent))] hover:underline" data-testid="link-home-placements">Placement cell <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {drives.map((x) => (
            <Reveal key={x.r}>
              <article className="card-soft card-hover overflow-hidden h-full" data-testid={`text-recruiter-${x.r.split(",")[0]}`}>
                <div className="aspect-[16/10] overflow-hidden"><img src={asset(x.img)} alt={`${x.r} placement drive`} loading="lazy" className="w-full h-full object-cover" /></div>
                <div className="p-4">
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground"><Calendar className="w-3.5 h-3.5" />{x.t}</span>
                  <h3 className="font-display text-[16px] text-[hsl(var(--primary))] mt-1">{x.r}</h3>
                  <p className="text-[14px] text-foreground/75">{x.d}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <p className="text-center font-display text-[13px] uppercase tracking-wider text-muted-foreground mb-4">Our recruiters</p>
          <div className="relative overflow-hidden rounded-xl border bg-white py-5 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <ul className="marquee flex w-max items-center gap-12 px-6">
              {logos.map((l, k) => <li key={k} aria-hidden={k >= RECRUITER_LOGOS.length || undefined}><img src={asset(l)} alt={k < RECRUITER_LOGOS.length ? `Recruiter logo ${k + 1}` : ""} className="h-12 w-auto max-w-[140px] object-contain" loading="lazy" /></li>)}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Alumni() {
  return (
    <section className="bg-[hsl(var(--sand))] py-16 md:py-20">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="[&>div]:mb-0"><SectionTitle eyebrow="Alumni" title="Where our pharmacy graduates work" sub="Alumni of A.M. Reddy Memorial College of Pharmacy, from the alumni meet." /></div>
          <Link href="/student-life#alumni" className="inline-flex items-center gap-2 text-[14px] font-bold text-[hsl(var(--accent))] hover:underline" data-testid="link-home-alumni">All {ALUMNI.length} alumni <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <ul className="flex gap-4 overflow-x-auto no-scrollbar snap-x pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {ALUMNI.slice(0, 10).map((p, k) => (
            <li key={p.name} className="snap-start shrink-0 w-[200px]">
              <article className="card-soft h-full overflow-hidden" data-testid={`card-alumni-${k}`}>
                <div className="aspect-square overflow-hidden bg-secondary"><PersonPhoto person={p} className="w-full h-full" /></div>
                <div className="p-3.5"><h3 className="font-display text-[14px] text-[hsl(var(--primary))]">{p.name}</h3><p className="text-[12.5px] text-muted-foreground mt-1 leading-snug">{p.role}</p></div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function News() {
  const notices = NEWS.filter((n) => ["Examinations", "IQAC", "Workshop", "Health"].includes(n.tag));
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="[&>div]:mb-0"><SectionTitle eyebrow="Information Corner" title="News and events" /></div>
          <Link href="/notices" className="inline-flex items-center gap-2 text-[14px] font-bold text-[hsl(var(--accent))] hover:underline" data-testid="link-news-all">View all <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid lg:grid-cols-[1fr_340px] gap-6">
          <ul className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {EVENT_PHOTOS.slice(0, 6).map((e, k) => (
              <li key={e.title}>
                <Link href="/notices#news" className="card-soft card-hover group block overflow-hidden h-full" data-testid={`card-news-${k}`}>
                  <div className="relative aspect-[16/10] overflow-hidden"><img src={asset(e.src)} alt={e.title} loading="lazy" className="img-zoom w-full h-full object-cover" /><span className="absolute top-3 left-3 text-[11px] font-bold uppercase px-2 py-0.5 rounded bg-[hsl(var(--primary))] text-white">{e.tag}</span></div>
                  <div className="p-4"><span className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground"><Calendar className="w-3.5 h-3.5" />{e.date}</span><h3 className="font-display text-[15px] leading-snug mt-1 group-hover:text-[hsl(var(--primary))]">{e.title}</h3></div>
                </Link>
              </li>
            ))}
          </ul>
          <aside className="card-soft p-5 self-start">
            <h3 className="font-display text-[16px] text-[hsl(var(--primary))] flex items-center gap-2"><Megaphone className="w-4 h-4 text-[hsl(var(--accent))]" />Notices and announcements</h3>
            <ul className="mt-3 divide-y">
              {notices.map((n, k) => (
                <li key={n.title} className="py-3" data-testid={`row-home-notice-${k}`}><span className="text-[12px] font-semibold text-[hsl(var(--accent))]">{n.date} · {n.tag}</span><Link href="/notices#notices" className="block text-[14px] font-semibold mt-0.5 hover:text-[hsl(var(--primary))] hover:underline">{n.title}</Link></li>
              ))}
            </ul>
            <Link href="/notices#notices" className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-bold text-[hsl(var(--primary))]" data-testid="link-home-notices">All notices <ArrowRight className="w-3.5 h-3.5" /></Link>
          </aside>
        </div>
      </Container>
    </section>
  );
}

function CampusLife() {
  const tiles = [
    { img: "img/amr/eng-about-college.jpg", t: "Campus", h: "/gallery", c: "col-span-2 row-span-2" },
    { img: "img/amr/eng-campus-library-1.jpg", t: "Library", h: "/gallery", c: "" },
    { img: "img/amr/pharm-student-life-sports-sports03.jpg", t: "Sports", h: "/student-life#sports", c: "" },
    { img: "img/amr/eng-campus-non-technical-events-sankranthi-sambaralu-2026-pongal3.jpg", t: "Festivals", h: "/gallery", c: "" },
    { img: "img/amr/eng-campus-nss-mountainday-2025-01.jpg", t: "NSS", h: "/student-life#nss", c: "" },
  ];
  return (
    <section className="bg-[hsl(var(--sand))] py-16 md:py-20">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="[&>div]:mb-0"><SectionTitle eyebrow="Campus Life" title="Life on the Petlurivaripalem campus" /></div>
          <Link href="/gallery" className="inline-flex items-center gap-2 text-[14px] font-bold text-[hsl(var(--accent))] hover:underline" data-testid="link-home-gallery">Picture gallery <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[190px] gap-3">
          {tiles.map((x, k) => (
            <Link key={x.t} href={x.h} className={`group relative overflow-hidden rounded-xl ${x.c}`} data-testid={`link-campus-${k}`}>
              <img src={asset(x.img)} alt={x.t} loading="lazy" className="img-zoom absolute inset-0 w-full h-full object-cover" />
              <span className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink)/0.75)] via-transparent to-transparent" />
              <span className="absolute left-4 bottom-3 text-white font-display text-[15px]">{x.t}</span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--teal-deep))] text-white">
      <img src={asset("img/amr/eng-gallery-gallery2.jpg")} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--teal-deep))] via-[hsl(var(--teal-deep)/0.9)] to-[hsl(var(--teal-deep)/0.6)]" />
      <Container className="relative py-14 md:py-16 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
        <div>
          <div className="eyebrow eyebrow-light">Admissions 2026</div>
          <h2 className="font-display text-[26px] md:text-[34px] leading-tight mt-2">Begin your application with an enquiry</h2>
          <p className="mt-2 text-white/75 max-w-xl text-[15px]">Our admissions office will guide you through eligibility, counselling and fees for every programme.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/admissions#enquire" className="inline-flex items-center gap-2 h-12 px-6 rounded-md bg-[hsl(var(--saffron))] text-[hsl(var(--ink))] font-bold hover:brightness-105" data-testid="link-cta-enquire"><Briefcase className="w-4 h-4" />Admission enquiry</Link>
          <a href={PHONE_TEL} className="inline-flex items-center gap-2 h-12 px-6 rounded-md border border-white/35 font-semibold hover:bg-white/10" data-testid="link-cta-call"><Phone className="w-4 h-4" />{PHONE}</a>
          <Link href="/admissions#process" className="inline-flex items-center h-12 px-6 rounded-md border border-white/35 font-semibold hover:bg-white/10" data-testid="link-cta-process">Admission process</Link>
        </div>
      </Container>
    </section>
  );
}

export default function Home() {
  return (<><Hero /><QuickLinks /><Stats /><Welcome /><WhyChoose /><Programmes /><Leadership /><Placements /><Alumni /><News /><CampusLife /><CTA /></>);
}
