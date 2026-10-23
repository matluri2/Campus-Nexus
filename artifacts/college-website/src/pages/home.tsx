import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, ShieldAlert, FileCheck2, GraduationCap, Megaphone } from "lucide-react";
import { Container, Reveal, SectionTitle, Initials } from "@/components/layout";
import { asset, INSTITUTIONS, NEWS, LEADERS, UGC_GUIDELINE, ANTI_RAGGING_HELPLINE } from "@/data/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const SLIDES = [
  { img: "img/hero.jpg", cap: "Campus, Petlurivaripalem" },
  { img: "img/hero-2.jpg", cap: "Academic blocks at golden hour" },
  { img: "img/pharma-lab.jpg", cap: "College of Pharmacy laboratories" },
  { img: "img/cse-lab.jpg", cap: "Computing laboratories, College of Engineering" },
];

function Hero() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 7000);
    return () => clearInterval(t);
  }, [reduce]);
  const lines = ["Professional education", "in pharmacy, engineering", "and technology."];
  return (
    <section ref={ref} className="relative -mt-[77px] min-h-[100dvh] md:min-h-[760px] md:h-[calc(100dvh-36px)] bg-[hsl(var(--ink))] text-white overflow-hidden" aria-label="Introduction">
      <motion.div style={{ y }} className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.8, ease: "easeInOut" }} className="absolute inset-0 overflow-hidden">
            <img src={asset(SLIDES[i].img)} alt={i === 0 ? "A.M. Reddy Educational Institutions campus at Petlurivaripalem" : ""} className={`absolute inset-0 w-full h-full object-cover ${reduce ? "" : "kenburns"}`} />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--ink)/0.92)] via-[hsl(var(--ink)/0.55)] to-[hsl(var(--ink)/0.1)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink)/0.85)] via-transparent to-[hsl(var(--ink)/0.5)]" />

      <motion.div style={{ opacity: fade }} className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 pt-[140px] pb-10 flex flex-col min-h-[100dvh] md:min-h-0">
        <div className="my-auto max-w-4xl">
          <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex items-center gap-3 text-[11.5px] font-semibold uppercase tracking-[0.22em] text-[hsl(var(--brass))]">
            <span className="w-10 h-px bg-[hsl(var(--brass))]" />Narasaraopet, Palnadu District / Since 2004
          </motion.div>
          <h1 className="font-display text-[40px] sm:text-[56px] md:text-[76px] xl:text-[88px] leading-[0.98] mt-6 tracking-[-0.03em]" data-testid="text-hero-title">
            {lines.map((l, k) => (
              <span key={l} className="block">
                <motion.span className={`block ${k === 2 ? "italic text-white/80" : ""}`} initial={reduce ? false : { y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.2 + k * 0.12, ease: EASE }}>{l}</motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.75, ease: EASE }} className="mt-8 text-[17px] md:text-[19px] text-white/75 leading-relaxed max-w-2xl">
            The College of Pharmacy, the autonomous College of Engineering and Technology, and the Polytechnic, on a single campus at Petlurivaripalem.
          </motion.p>
          <motion.div initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9, ease: EASE }} className="mt-10 flex flex-wrap gap-3">
            <Link href="/admissions" className="group inline-flex items-center gap-2 h-13 py-3.5 px-7 rounded-sm bg-[hsl(var(--brass))] text-[hsl(var(--ink))] font-semibold hover:brightness-105" data-testid="link-hero-admissions">Admissions 2026 <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></Link>
            <Link href="/about" className="inline-flex items-center py-3.5 px-7 rounded-sm border border-white/35 font-semibold hover:bg-white/10 backdrop-blur-sm" data-testid="link-hero-about">About the Institutions</Link>
          </motion.div>
        </div>

        <div className="mt-10 flex flex-col-reverse md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-end gap-8">
            <div className="hidden md:flex flex-col items-center gap-3 text-[10.5px] uppercase tracking-[0.2em] text-white/60">
              <span className="relative block w-px h-14 bg-white/20 overflow-hidden"><span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-white" /></span>Scroll
            </div>
            <div>
              <div className="flex gap-2" role="tablist" aria-label="Campus images">
                {SLIDES.map((s, k) => (
                  <button key={s.img} role="tab" aria-selected={k === i} aria-label={`Show image ${k + 1}: ${s.cap}`} onClick={() => setI(k)} className="h-6 flex items-center" data-testid={`button-hero-slide-${k}`}>
                    <span className={`block h-[2px] transition-all duration-500 ${k === i ? "w-12 bg-white" : "w-6 bg-white/35 hover:bg-white/60"}`} />
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[12px] text-white/60 font-mono" aria-live="polite">{String(i + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")} &nbsp; {SLIDES[i].cap}</p>
            </div>
          </div>
          <Link href="/admissions#enquire" className="group block md:w-[360px] rounded-sm bg-white/[0.08] backdrop-blur-md border border-white/20 p-5 hover:bg-white/[0.13] transition-colors" data-testid="link-hero-callout">
            <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--brass))]"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--brass))]" />Admissions 2026</span>
            <span className="mt-2 flex items-end justify-between gap-4">
              <span className="font-display text-[22px] leading-snug">Enquiries are open for B.Tech, Pharmacy and Diploma programmes</span>
              <span className="shrink-0 w-10 h-10 rounded-full bg-white text-[hsl(var(--ink))] grid place-items-center transition-transform group-hover:rotate-45"><ArrowUpRight className="w-4 h-4" /></span>
            </span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

const QUICK = [
  { icon: GraduationCap, t: "Admission Enquiry", d: "Programmes and eligibility", h: "/admissions#enquire" },
  { icon: FileCheck2, t: "UGC Self-Disclosure", d: "Mandatory public information", h: "/disclosure" },
  { icon: ShieldAlert, t: "Anti-Ragging", d: `Helpline ${ANTI_RAGGING_HELPLINE}`, h: "/committees#anti-ragging" },
  { icon: Megaphone, t: "Notices and Circulars", d: "Examinations and announcements", h: "/notices" },
];

function QuickLinks() {
  return (
    <section className="bg-[hsl(var(--sand))] border-b" aria-label="Quick links">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[hsl(var(--border))]">
          {QUICK.map((q, k) => (
            <Link key={q.t} href={q.h} className={`group flex items-start gap-4 py-7 px-4 md:px-6 hover:bg-white/60 transition-colors ${k > 1 ? "border-t lg:border-t-0" : ""} ${k === 2 ? "!border-l-0 lg:!border-l" : ""}`} data-testid={`link-quick-${q.h.replace(/\W+/g, "-")}`}>
              <q.icon className="w-6 h-6 text-[hsl(var(--accent))] shrink-0 mt-0.5" strokeWidth={1.5} />
              <span className="min-w-0"><span className="link-u font-semibold text-[15px] text-[hsl(var(--primary))]">{q.t}</span><span className="block text-[13px] text-muted-foreground mt-1">{q.d}</span></span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Welcome() {
  const stats: [string, string][] = [["2004", "College of Pharmacy established"], ["2008", "College of Engineering established"], ["9", "B.Tech branches"], ["10.94", "Acres of campus"]];
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <div className="eyebrow">Welcome</div>
            <h2 className="font-display text-[34px] md:text-[54px] leading-[1.04] mt-5 text-[hsl(var(--primary))] tracking-[-0.025em]">An institution rooted in Palnadu, <span className="italic text-[hsl(var(--accent))]">preparing professionals</span> for the nation.</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:pt-14 prose-inst space-y-5">
            <p>Sponsored by the Atluri Mastan Reddy Educational Society (Reg. No. 450/2003), A.M. Reddy Educational Institutions began with the College of Pharmacy in 2004 and established the College of Engineering and Technology in 2008. Diploma programmes followed in 2013.</p>
            <p>The campus, set across 10.94 acres approximately 3 km from Narasaraopet, offers separate hostels for men and women, a college bus network, modern laboratories and an incubation centre.</p>
            <Link href="/about" className="inline-flex items-center gap-2 text-[14px] font-semibold text-[hsl(var(--primary))]" data-testid="link-welcome-about"><span className="link-u">Our history</span><ArrowRight className="w-4 h-4" /></Link>
          </Reveal>
        </div>
        <dl className="mt-20 grid grid-cols-2 md:grid-cols-4 border-t">
          {stats.map(([n, l], k) => (
            <Reveal key={l} delay={k * 0.08} className={`pt-8 pb-2 ${k ? "md:border-l md:pl-8" : ""} ${k % 2 ? "border-l pl-5" : ""}`}>
              <dt className="sr-only">{l}</dt>
              <dd className="num-display text-[64px] sm:text-[84px] lg:text-[112px] text-[hsl(var(--primary))]" data-testid={`text-stat-${k}`}>{n}</dd>
              <dd className="text-[13px] text-muted-foreground mt-4 flex items-center gap-2"><span className="w-4 h-px bg-[hsl(var(--accent))]" />{l}</dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}

function Institutions() {
  const [hot, setHot] = useState(1);
  return (
    <section className="bg-[hsl(var(--ink))] text-white py-24 md:py-32">
      <Container>
        <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-end mb-14">
          <SectionTitle light eyebrow="Constituent Institutions" title="Three institutions, one academic community" sub="Each institution is independently approved and affiliated, sharing campus facilities, student services and governance." />
        </div>
        <div className="flex flex-col lg:flex-row gap-3 lg:h-[600px]">
          {INSTITUTIONS.map((ins, k) => {
            const on = hot === k;
            return (
              <Link key={ins.key} href={ins.href} onMouseEnter={() => setHot(k)} onFocus={() => setHot(k)}
                className={`group relative overflow-hidden rounded-sm min-h-[420px] lg:min-h-0 transition-[flex-grow] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${on ? "lg:flex-[2.2]" : "lg:flex-[1]"}`} data-testid={`card-institution-${ins.key}`}>
                <img src={asset(ins.img)} alt={ins.name} className="img-zoom absolute inset-0 w-full h-full object-cover" />
                <span className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink)/0.95)] via-[hsl(var(--ink)/0.45)] to-[hsl(var(--ink)/0.1)]" />
                <span className="absolute top-6 left-6 right-6 flex justify-between items-start">
                  <span className="num-display text-[56px] text-white/90">0{k + 1}</span>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--brass))] mt-3">Est. {ins.est}</span>
                </span>
                <span className="absolute inset-x-0 bottom-0 p-6 md:p-8 block">
                  <span className="block text-[11px] uppercase tracking-[0.2em] text-white/60">{ins.short}</span>
                  <span className="block font-display text-[26px] md:text-[32px] leading-[1.08] mt-2 max-w-lg">{ins.name}</span>
                  <span className={`block overflow-hidden transition-all duration-700 ${on ? "lg:max-h-60 lg:opacity-100" : "lg:max-h-0 lg:opacity-0"}`}>
                    <span className="block text-[14px] text-white/70 mt-3 max-w-lg">{ins.affiliation}</span>
                    <span className="mt-4 flex flex-wrap gap-1.5">{ins.groups.flatMap((g) => g.items).slice(0, 5).map((p) => <span key={p.name} className="text-[11.5px] px-2 py-1 rounded-sm bg-white/10 border border-white/15">{p.name.replace("Computer Science and Engineering", "CSE")}</span>)}</span>
                  </span>
                  <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold"><span className="link-u">Explore</span><ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" /></span>
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function Programmes() {
  const [tab, setTab] = useState(0);
  const ins = INSTITUTIONS[tab];
  const items = ins.groups.flatMap((g) => g.items.map((p) => ({ ...p, group: g.title })));
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end">
          <SectionTitle eyebrow="Programmes" title="Explore programmes by institution" sub="Intake figures are shown where verified. Others are marked to be published." />
          <div role="tablist" aria-label="Institution" className="flex flex-wrap gap-1 p-1 bg-[hsl(var(--sand))] rounded-sm mb-10 self-end">
            {INSTITUTIONS.map((x, k) => (
              <button key={x.key} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`px-4 h-10 rounded-sm text-[13.5px] font-semibold transition-colors ${tab === k ? "bg-[hsl(var(--primary))] text-white" : "text-[hsl(var(--primary))] hover:bg-white"}`} data-testid={`tab-programmes-${x.key}`}>{x.short}</button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.ul key={ins.key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: EASE }}
            className="flex gap-4 overflow-x-auto no-scrollbar snap-x pb-2 -mx-4 px-4 sm:mx-0 sm:px-0" role="tabpanel">
            {items.map((p, k) => (
              <li key={p.name} className="snap-start shrink-0 w-[270px]">
                <Link href={`${ins.href}#programmes`} className="group flex flex-col h-full min-h-[230px] rounded-sm border bg-card p-6 hover:border-[hsl(var(--primary)/0.5)] hover:-translate-y-1 transition-all duration-300" data-testid={`card-programme-${ins.key}-${k}`}>
                  <span className="text-[10.5px] uppercase tracking-[0.18em] text-[hsl(var(--accent))]">{p.group}</span>
                  <span className="font-display text-[22px] leading-snug mt-3 text-[hsl(var(--primary))]">{p.name}</span>
                  <span className="mt-auto pt-6 flex items-end justify-between text-[12.5px] text-muted-foreground border-t border-dashed">
                    <span className="pt-3">{p.dur ?? "As per regulations"}<br />{p.intake ? <>Intake <span className="font-semibold text-foreground">{p.intake}</span></> : "Intake to be published"}</span>
                    <ArrowUpRight className="w-4 h-4 text-[hsl(var(--primary))] transition-transform group-hover:rotate-45" />
                  </span>
                </Link>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </Container>
    </section>
  );
}

function CampusLife() {
  const tiles = [
    { img: "img/library-2.jpg", t: "Library and reading rooms", h: "/research#facilities", c: "md:col-span-2 md:row-span-2" },
    { img: "img/sports.jpg", t: "Sports grounds", h: "/student-life#sports", c: "" },
    { img: "img/eng-workshop.jpg", t: "Engineering workshops", h: "/polytechnic", c: "" },
    { img: "img/life.jpg", t: "Student life", h: "/student-life", c: "md:col-span-2" },
  ];
  return (
    <section className="bg-[hsl(var(--sand))] py-24 md:py-32">
      <Container>
        <div className="grid lg:grid-cols-[1fr_auto] items-end gap-6">
          <SectionTitle eyebrow="Campus Life" title="Learning beyond the lecture hall" sub="Separate hostels for men and women, a college bus network, an auditorium, sports grounds and dedicated computing infrastructure." />
          <Link href="/gallery" className="mb-10 inline-flex items-center gap-2 text-[14px] font-semibold text-[hsl(var(--primary))]" data-testid="link-home-gallery"><span className="link-u">Picture gallery</span><ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 md:h-[560px]">
          {tiles.map((x, k) => (
            <Reveal key={x.t} delay={k * 0.06} className={`${x.c} min-h-[240px]`}>
              <Link href={x.h} className="group relative block w-full h-full min-h-[240px] overflow-hidden rounded-sm" data-testid={`link-campus-${k}`}>
                <img src={asset(x.img)} alt={x.t} className="img-zoom absolute inset-0 w-full h-full object-cover" />
                <span className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink)/0.8)] via-transparent to-transparent" />
                <span className="absolute left-5 bottom-5 right-5 flex items-end justify-between text-white">
                  <span className="font-display text-[22px] leading-tight">{x.t}</span>
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Journal() {
  const [lead, ...rest] = NEWS;
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="flex items-end justify-between gap-6 border-b pb-6 mb-10">
          <div><div className="eyebrow">Information Corner</div><h2 className="font-display text-[30px] md:text-[42px] leading-[1.08] mt-4 text-[hsl(var(--primary))]">News and notices</h2></div>
          <Link href="/notices" className="shrink-0 inline-flex items-center gap-2 text-[14px] font-semibold text-[hsl(var(--primary))]" data-testid="link-news-all"><span className="link-u">View all</span><ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-5">
            <Link href="/notices#news" className="group block" data-testid="card-news-0">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm"><img src={asset("img/cse-lab.jpg")} alt="" className="img-zoom absolute inset-0 w-full h-full object-cover" /></div>
              <div className="mt-6 flex items-center gap-3 text-[11.5px] uppercase tracking-[0.18em]"><span className="text-[hsl(var(--accent))] font-semibold">{lead.tag}</span><span className="text-muted-foreground font-mono normal-case tracking-normal">{lead.date}</span></div>
              <h3 className="font-display text-[30px] md:text-[36px] leading-[1.1] mt-3 text-[hsl(var(--primary))]"><span className="link-u">{lead.title}</span></h3>
            </Link>
          </Reveal>
          <ol className="lg:col-span-7 divide-y border-t lg:border-t-0">
            {rest.slice(0, 6).map((n, k) => (
              <li key={n.title} data-testid={`card-news-${k + 1}`}>
                <Link href="/notices#news" className="group grid grid-cols-[110px_1fr_auto] sm:grid-cols-[140px_1fr_auto] gap-5 py-5 items-baseline">
                  <span className="font-mono text-[12px] text-muted-foreground">{n.date}</span>
                  <span><span className="block text-[10.5px] uppercase tracking-[0.18em] text-[hsl(var(--accent))] font-semibold">{n.tag}</span><span className="block font-display text-[20px] leading-snug mt-1 group-hover:text-[hsl(var(--primary))]"><span className="link-u">{n.title}</span></span></span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-transform group-hover:rotate-45 group-hover:text-[hsl(var(--primary))]" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function Leadership() {
  return (
    <section className="bg-[hsl(var(--teal-deep))] text-white py-24 md:py-28">
      <Container>
        <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-end">
          <SectionTitle light eyebrow="Leadership" title="Institutional leadership" />
          <Link href="/administration" className="mb-10 inline-flex items-center gap-2 text-[14px] font-semibold" data-testid="link-home-administration"><span className="link-u">Administration and governing bodies</span><ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-white/15">
          {LEADERS.map((l, k) => (
            <Reveal key={l.name} delay={k * 0.06} className={`pt-8 pb-4 sm:pr-6 ${k ? "lg:border-l lg:pl-6 border-white/15" : ""}`}>
              <div data-testid={`card-leader-${k}`}>
                <Initials name={l.name} size="lg" />
                <div className="font-display text-[22px] mt-6 leading-tight">{l.name}</div>
                <div className="text-[13.5px] text-white/65 mt-2">{l.role}{l.quals ? `, ${l.quals}` : ""}</div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-[hsl(var(--brass))] mt-3">{l.inst}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Placements() {
  return (
    <section className="py-24 md:py-28">
      <Container className="grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-4">
          <SectionTitle eyebrow="Training and Placement" title="Recent campus recruitment" sub="The placement cell conducts training and campus drives across pharmacy and engineering." />
          <Link href="/student-life#placements" className="inline-flex items-center gap-2 text-[14px] font-semibold text-[hsl(var(--primary))]" data-testid="link-home-placements"><span className="link-u">Placement cell</span><ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="lg:col-span-8 grid sm:grid-cols-3 gap-3">
          {[["Thinksysq, Bangalore", "23 students selected", "Jan 2025", "23"], ["Carro Health", "Pharmacy pool drive", "15 Apr 2025", ""], ["Divis", "Pharmacy pool campus drive", "Mar 2025", ""]].map(([r, d, t, n]) => (
            <Reveal key={r}>
              <div className="h-full rounded-sm border bg-card p-7 flex flex-col min-h-[240px]" data-testid={`text-recruiter-${r.split(",")[0]}`}>
                <div className="font-mono text-[12px] text-muted-foreground">{t}</div>
                {n && <div className="num-display text-[72px] text-[hsl(var(--accent))] mt-4">{n}</div>}
                <div className="mt-auto pt-6">
                  <div className="font-display text-[24px] text-[hsl(var(--primary))] leading-tight">{r}</div>
                  <div className="text-[14px] text-muted-foreground mt-2">{d}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--ink))] text-white">
      <img src={asset("img/hero-2.jpg")} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--ink)/0.95)] via-[hsl(var(--teal-deep)/0.8)] to-transparent" />
      <Container className="relative py-28 md:py-36 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-7">
          <div className="eyebrow eyebrow-light">Admissions 2026</div>
          <h2 className="font-display text-[40px] md:text-[64px] leading-[1.02] mt-5 tracking-[-0.03em]">Begin your application <span className="italic text-white/70">with an enquiry.</span></h2>
          <p className="mt-6 text-white/70 max-w-xl text-[17px]">Our admissions office will guide you through eligibility, counselling and fees for every programme.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/admissions#enquire" className="inline-flex items-center gap-2 py-3.5 px-7 rounded-sm bg-[hsl(var(--brass))] text-[hsl(var(--ink))] font-semibold hover:brightness-105" data-testid="link-cta-enquire">Admission enquiry <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/admissions#process" className="inline-flex items-center py-3.5 px-7 rounded-sm border border-white/35 font-semibold hover:bg-white/10" data-testid="link-cta-process">Admission process</Link>
          </div>
        </div>
        <Link href="/disclosure" className="lg:col-span-5 group block rounded-sm border border-white/20 bg-white/[0.06] backdrop-blur-md p-7 hover:bg-white/[0.1] transition-colors" data-testid="link-home-disclosure">
          <FileCheck2 className="w-7 h-7 text-[hsl(var(--brass))]" strokeWidth={1.4} />
          <div className="font-display text-[26px] mt-4">Public Self-Disclosure</div>
          <p className="text-white/65 mt-2 text-[14px] leading-relaxed">Governance, academics, admissions, student support and statutory committees, organised as per the {UGC_GUIDELINE}.</p>
          <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold"><span className="link-u">View disclosure</span><ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" /></span>
        </Link>
      </Container>
    </section>
  );
}

export default function Home() {
  return (<><Hero /><QuickLinks /><Welcome /><Institutions /><Programmes /><CampusLife /><Journal /><Leadership /><Placements /><CTA /></>);
}
