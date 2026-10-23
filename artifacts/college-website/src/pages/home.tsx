import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play, Quote, Phone } from "lucide-react";
import { Container, Reveal, SectionTitle, PersonPhoto, ToBePublished } from "@/components/layout";
import { asset, INSTITUTIONS, NEWS, PHONE, PHONE_TEL, ANTI_RAGGING_HELPLINE } from "@/data/site";
import { LEADERSHIP, ALUMNI } from "@/data/people";
import { EVENT_PHOTOS, RECRUITER_LOGOS } from "@/data/gallery";
import { IMG } from "@/data/images";

const EASE = [0.22, 1, 0.36, 1] as const;
const W = "max-w-[1360px] mx-auto px-3";

function useStagger() {
  const reduce = useReducedMotion();
  return (d: number) => (reduce ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: d, ease: EASE } });
}

/* ---------- First screen: intro + live campus board ---------- */
function Intro() {
  const a = useStagger();
  return (
    <div className="rounded-2xl border bg-card p-5 sm:p-7 flex flex-col">
      <motion.div {...a(0)} className="eyebrow">Narasaraopet, Palnadu / Since 2004</motion.div>
      <motion.h1 {...a(0.06)} className="font-display text-[27px] sm:text-[33px] xl:text-[36px] leading-[1.1] mt-3 text-[hsl(var(--ink))]" data-testid="text-hero-title">
        Professional education in pharmacy, engineering and technology<span className="text-[hsl(var(--saffron))]">.</span>
      </motion.h1>
      <motion.p {...a(0.12)} className="mt-3 text-[14.5px] text-muted-foreground leading-relaxed">The College of Pharmacy, the autonomous College of Engineering and Technology, and the Polytechnic, on one 10.94-acre campus at Petlurivaripalem.</motion.p>
      <motion.div {...a(0.18)} className="mt-5 flex flex-wrap gap-2">
        <Link href="/admissions#enquire" className="group inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[hsl(var(--saffron))] text-white font-bold text-[14px] hover:bg-[hsl(var(--accent))] transition-colors" data-testid="link-hero-admissions">Apply for 2026 <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" /></Link>
        <Link href="/about" className="inline-flex items-center h-11 px-5 rounded-full border font-semibold text-[14px] hover:bg-secondary" data-testid="link-hero-about">Explore the campus</Link>
      </motion.div>
      <ul className="hidden lg:block mt-auto pt-6 divide-y border-t">
        {INSTITUTIONS.map((ins, k) => (
          <motion.li key={ins.key} {...a(0.24 + k * 0.06)}>
            <Link href={ins.href} className="group grid grid-cols-[52px_1fr_auto] items-center gap-3 py-3" data-testid={`link-hero-${ins.key}`}>
              <span className="font-mono text-[12px] text-muted-foreground">{ins.est}</span>
              <span className="min-w-0"><span className="block font-display text-[15px] leading-snug group-hover:text-[hsl(var(--accent))] transition-colors">{ins.short}</span><span className="block text-[12px] text-muted-foreground truncate">{ins.affiliation}</span></span>
              <span className="w-8 h-8 rounded-full border grid place-items-center group-hover:bg-[hsl(var(--ink))] group-hover:text-white group-hover:border-transparent transition-colors"><ArrowUpRight className="w-4 h-4" /></span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function EventFeature() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = EVENT_PHOTOS.length;
  useEffect(() => {
    if (reduce || paused) return;
    const t = setTimeout(() => setI((x) => (x + 1) % n), 6000);
    return () => clearTimeout(t);
  }, [i, reduce, paused, n]);
  const e = EVENT_PHOTOS[i];
  const go = (d: number) => setI((x) => (x + d + n) % n);
  return (
    <section aria-label="Events" aria-roledescription="carousel" className="flex flex-col min-w-0">
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <h2 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Events / <span className="text-foreground">{String(i + 1).padStart(2, "0")}</span> of {String(n).padStart(2, "0")}</h2>
        <div className="flex items-center gap-1">
          <button onClick={() => go(-1)} aria-label="Previous event" className="w-8 h-8 rounded-full border grid place-items-center hover:bg-secondary" data-testid="button-hero-prev"><ChevronLeft className="w-4 h-4" /></button>
          {!reduce && <button onClick={() => setPaused(!paused)} aria-label={paused ? "Play events" : "Pause events"} className="w-8 h-8 rounded-full border grid place-items-center hover:bg-secondary" data-testid="button-hero-pause">{paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}</button>}
          <button onClick={() => go(1)} aria-label="Next event" className="w-8 h-8 rounded-full border grid place-items-center hover:bg-secondary" data-testid="button-hero-next"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
      <Link href="/notices#news" className="group relative block rounded-xl overflow-hidden bg-[hsl(var(--ink))] aspect-[4/3] lg:aspect-[5/4]" data-testid="link-event-feature">
        <AnimatePresence initial={false}>
          <motion.img key={e.src} src={asset(e.src)} alt={e.title} initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: EASE }} className="absolute inset-0 w-full h-full object-cover" />
        </AnimatePresence>
        <span className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink)/0.88)] via-[hsl(var(--ink)/0.15)] to-transparent" />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full bg-[hsl(var(--paper))] text-[11.5px] font-bold text-[hsl(var(--ink))]">{e.tag}</span>
        <AnimatePresence mode="wait">
          <motion.span key={e.title} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="absolute inset-x-0 bottom-0 p-4 text-white" data-testid="text-event-title">
            <span className="block font-mono text-[11.5px] text-[hsl(var(--brass))]">{e.date}</span>
            <span className="block font-display text-[17px] sm:text-[19px] leading-snug mt-1">{e.title}</span>
          </motion.span>
        </AnimatePresence>
        {!reduce && !paused && <span key={i} aria-hidden className="progress-bar absolute bottom-0 left-0 h-[3px] w-full bg-[hsl(var(--saffron))]" />}
      </Link>
      <div className="mt-2.5 flex gap-1.5 overflow-x-auto no-scrollbar" role="tablist" aria-label="Choose event">
        {EVENT_PHOTOS.map((p, k) => (
          <button key={p.src + k} role="tab" aria-selected={k === i} aria-label={p.title} onClick={() => setI(k)} className={`shrink-0 w-14 h-10 rounded-md overflow-hidden ring-2 transition-all ${k === i ? "ring-[hsl(var(--saffron))]" : "ring-transparent opacity-60 hover:opacity-100"}`} data-testid={`button-hero-slide-${k}`}>
            <img src={asset(p.src)} alt="" className="w-full h-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </section>
  );
}

const FILTERS = ["All", "Notices", "Events", "Placements"] as const;
function Announcements() {
  const [f, setF] = useState<(typeof FILTERS)[number]>("All");
  const list = NEWS.filter((x) => f === "All" || (f === "Notices" ? ["Examinations", "IQAC", "Workshop", "Health"].includes(x.tag) : f === "Placements" ? x.tag === "Placements" : !["Examinations", "IQAC", "Placements"].includes(x.tag)));
  return (
    <section aria-label="Announcements" className="flex flex-col min-w-0">
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <h2 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Announcements</h2>
        <Link href="/notices" className="text-[12px] font-bold text-[hsl(var(--accent))] inline-flex items-center gap-1 hover:underline" data-testid="link-news-all">All notices <ArrowRight className="w-3 h-3" /></Link>
      </div>
      <div className="flex gap-1 mb-2 overflow-x-auto no-scrollbar" role="tablist" aria-label="Filter announcements">
        {FILTERS.map((x) => <button key={x} role="tab" aria-selected={f === x} onClick={() => setF(x)} className={`shrink-0 h-7 px-3 rounded-full text-[12px] font-semibold transition-colors ${f === x ? "bg-[hsl(var(--ink))] text-white" : "bg-secondary text-foreground/75 hover:text-foreground"}`} data-testid={`button-filter-${x.toLowerCase()}`}>{x}</button>)}
      </div>
      <ul className="rounded-xl border bg-background/60 divide-y overflow-y-auto max-h-[360px] lg:max-h-[392px]">
        {f === "All" && (
          <li><Link href="/admissions#enquire" className="group flex gap-3 p-3 bg-[hsl(var(--saffron)/0.08)]" data-testid="row-home-notice-admissions">
            <span className="w-[62px] shrink-0 font-mono text-[11px] font-semibold text-[hsl(var(--accent))] pt-0.5">Open</span>
            <span className="min-w-0"><span className="block text-[13.5px] font-semibold leading-snug group-hover:underline">Admissions 2026: enquiries open for B.Tech, B.Pharm, Pharm.D, M.Pharm, M.Tech and Diploma</span><span className="text-[11.5px] text-muted-foreground">Admissions</span></span>
          </Link></li>
        )}
        <AnimatePresence initial={false}>
          {list.map((x, k) => (
            <motion.li key={x.title} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <Link href={["Examinations", "IQAC"].includes(x.tag) ? "/notices#notices" : "/notices#news"} className="group flex gap-3 p-3 hover:bg-secondary/60 transition-colors" data-testid={`row-home-notice-${k}`}>
                <span className="w-[62px] shrink-0 font-mono text-[11px] text-muted-foreground pt-0.5 leading-tight">{x.date}</span>
                <span className="min-w-0"><span className="block text-[13.5px] font-semibold leading-snug group-hover:text-[hsl(var(--accent))]">{x.title}</span><span className="text-[11.5px] text-muted-foreground">{x.tag}</span></span>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </section>
  );
}

function FirstScreen() {
  const reduce = useReducedMotion();
  return (
    <section className={`${W} pt-4 sm:pt-5`}>
      <div className="grid gap-3 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.75fr)]">
        <Intro />
        <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: EASE }} className="rounded-2xl border bg-card p-4 sm:p-5 flex flex-col">
          <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b">
            <p className="inline-flex items-center gap-2.5 font-display text-[16px] text-[hsl(var(--ink))]"><span className="live-dot" aria-hidden />On campus now</p>
            <p className="font-mono text-[11px] text-muted-foreground hidden sm:block">Announcements and events</p>
          </div>
          <div className="grid gap-5 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] flex-1">
            <EventFeature />
            <Announcements />
          </div>
        </motion.div>
      </div>
      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          ["Admission enquiry", "Programmes and eligibility", "/admissions#enquire"],
          ["UGC Self-Disclosure", "Mandatory public information", "/disclosure"],
          ["Anti-Ragging", `Helpline ${ANTI_RAGGING_HELPLINE}`, "/committees#anti-ragging"],
          ["Grievance redressal", "SGRC and Ombudsperson", "/committees#sgrc"],
        ].map(([t, d, h], k) => (
          <Link key={h} href={h} className="group rounded-2xl border bg-card px-4 py-3.5 flex items-center justify-between gap-3 hover:border-[hsl(var(--primary)/0.4)] transition-colors" data-testid={`link-quick-${k}`}>
            <span className="min-w-0"><span className="block font-display text-[14.5px] text-[hsl(var(--ink))]">{t}</span><span className="block text-[12px] text-muted-foreground truncate">{d}</span></span>
            <ArrowUpRight className="w-4 h-4 shrink-0 text-[hsl(var(--accent))] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ---------- Timeline of the campus ---------- */
const TIMELINE = [
  { y: "2004", t: "College of Pharmacy established" },
  { y: "2008", t: "College of Engineering and Technology established" },
  { y: "2009", t: "Civil Engineering started" },
  { y: "2013", t: "Diploma programmes (Polytechnic) begin" },
  { y: "2022-23", t: "Diploma in Computer Engineering" },
];
function Timeline() {
  return (
    <section className={`${W} mt-14 md:mt-20`} aria-label="Key figures">
      <Container className="!px-1 sm:!px-3">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-end">
          <Reveal>
            <SectionTitle eyebrow="One campus, three institutions" title="Built up, step by step, over two decades" />
            <dl className="grid grid-cols-3 gap-3 -mt-2">
              {[["10.94", "acres of campus"], ["9", "B.Tech branches"], ["6", "pharmacy programmes"]].map(([n, l], k) => (
                <div key={l}><dt className="sr-only">{l}</dt><dd className="num-display text-[28px] text-[hsl(var(--primary))]" data-testid={`text-stat-${k}`}>{n}</dd><dd className="text-[12px] text-muted-foreground mt-1 leading-snug">{l}</dd></div>
              ))}
            </dl>
          </Reveal>
          <ol className="relative grid sm:grid-cols-5 gap-4 sm:gap-3">
            <span aria-hidden className="hidden sm:block absolute left-0 right-0 top-[7px] h-px bg-[hsl(var(--primary)/0.25)]" />
            {TIMELINE.map((x, k) => (
              <Reveal key={x.y} delay={k * 0.07} className="relative flex sm:block gap-4">
                <span aria-hidden className={`relative z-10 mt-1 sm:mt-0 block w-[15px] h-[15px] shrink-0 rounded-full border-[3px] border-[hsl(var(--paper))] ${k === 0 ? "bg-[hsl(var(--saffron))]" : "bg-[hsl(var(--primary))]"}`} />
                <span className="block sm:mt-4">
                  <span className="block num-display text-[22px] text-[hsl(var(--ink))]">{x.y}</span>
                  <span className="block text-[13px] text-muted-foreground mt-1 leading-snug">{x.t}</span>
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Programmes ---------- */
function Programmes() {
  const [tab, setTab] = useState(1);
  const ins = INSTITUTIONS[tab];
  const items = ins.groups.flatMap((g) => g.items.map((p) => ({ ...p, group: g.title })));
  return (
    <section className={`${W} mt-16 md:mt-24`}>
      <div className="rounded-2xl bg-[hsl(var(--teal-deep))] text-white p-5 sm:p-8 md:p-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-7">
          <div className="[&>div]:mb-0"><SectionTitle light eyebrow="Academics" title="Explore our institutions and programmes" /></div>
          <div role="tablist" aria-label="Institution" className="flex flex-wrap gap-1 p-1 rounded-full bg-white/10 self-start lg:self-auto">
            {INSTITUTIONS.map((x, k) => (
              <button key={x.key} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`px-4 h-9 rounded-full text-[13px] font-semibold transition-colors ${tab === k ? "bg-[hsl(var(--paper))] text-[hsl(var(--ink))]" : "text-white/80 hover:text-white"}`} data-testid={`tab-programmes-${x.key}`}>{x.short}</button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={ins.key} role="tabpanel" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3, ease: EASE }} className="grid lg:grid-cols-[340px_1fr] gap-4">
            <Link href={ins.href} className="group rounded-xl overflow-hidden bg-[hsl(var(--paper))] text-foreground flex flex-col" data-testid={`card-institution-${ins.key}`}>
              <div className="relative aspect-[16/10] overflow-hidden"><img src={asset(ins.img)} alt={ins.name} className="img-zoom w-full h-full object-cover" /><span className="absolute top-3 left-3 font-mono text-[11.5px] font-semibold px-2.5 py-1 rounded-full bg-[hsl(var(--saffron))] text-white">Est. {ins.est}</span></div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-display text-[17px] text-[hsl(var(--ink))] leading-snug">{ins.name}</h3>
                <p className="text-[13.5px] text-muted-foreground mt-1.5">{ins.affiliation}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">{ins.approvals.slice(0, 4).map((a) => <span key={a} className="text-[11px] px-2 py-0.5 rounded-full border text-[hsl(var(--primary))] font-semibold">{a}</span>)}</div>
                <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-[hsl(var(--accent))]">Visit the college <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
              </div>
            </Link>
            <ul className="grid sm:grid-cols-2 xl:grid-cols-3 gap-2.5 content-start">
              {items.map((p, k) => (
                <li key={p.name}>
                  <Link href={`${ins.href}#programmes`} className="group flex flex-col h-full rounded-xl border border-white/15 p-4 hover:bg-white/[0.07] hover:border-white/30 transition-colors" data-testid={`card-programme-${ins.key}-${k}`}>
                    <span className="font-mono text-[10.5px] uppercase tracking-wider text-[hsl(var(--brass))]">{p.group}</span>
                    <span className="font-display text-[15px] leading-snug mt-1.5">{p.name}</span>
                    <span className="mt-auto pt-3 text-[12px] text-white/60">{p.dur ?? "As per regulations"} / {p.intake ? <>Intake <b className="text-white">{p.intake}</b></> : "Intake to be published"}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ---------- Welcome + why ---------- */
const WHY = [
  { t: "Autonomous status", d: "The College of Engineering and Technology is an autonomous institution." },
  { t: "Permanent affiliation", d: "Engineering to JNTUK, Kakinada; Pharmacy to Acharya Nagarjuna University." },
  { t: "AICTE and PCI approved", d: "Approved by AICTE and PCI, New Delhi, with NAAC, NBA and UGC recognition listed." },
  { t: "Incubation centre", d: "AMR Incubation Foundation hosts ideathons, hackathons and student start-up ideas." },
  { t: "Computing infrastructure", d: "Six CSE laboratories with 368 air-conditioned systems." },
  { t: "Libraries", d: "Central library for engineering and a dedicated pharmacy library." },
  { t: "Separate hostels", d: "Separate hostels for boys and girls with round-the-clock security." },
  { t: "College transport", d: "A fleet of college buses connecting the campus with surrounding towns." },
];
function Welcome() {
  return (
    <section className="mt-16 md:mt-24">
      <Container className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14">
        <Reveal>
          <SectionTitle eyebrow="Welcome to A.M. Reddy" title="An institution rooted in Palnadu, preparing professionals for the nation" />
          <div className="prose-inst space-y-4">
            <p>Sponsored by the Atluri Mastan Reddy Educational Society (Reg. No. 450/2003), A.M. Reddy Educational Institutions began with the College of Pharmacy in 2004 and established the College of Engineering and Technology in 2008. Diploma programmes followed in 2013.</p>
            <p>The campus, set across 10.94 acres approximately 3 km from Narasaraopet, offers separate hostels for men and women, a college bus network, modern laboratories and an incubation centre.</p>
          </div>
          <div className="mt-6 rounded-2xl overflow-hidden aspect-[16/9] cut-corner"><img src={asset(IMG.campusLawns)} alt="Academic blocks and lawns of the A.M. Reddy campus" className="w-full h-full object-cover" loading="lazy" /></div>
          <Link href="/about" className="mt-5 inline-flex items-center gap-2 h-10 px-5 rounded-full bg-[hsl(var(--ink))] text-white font-semibold text-[13.5px] hover:bg-[hsl(var(--primary))]" data-testid="link-welcome-about">About the institutions <ArrowRight className="w-4 h-4" /></Link>
        </Reveal>
        <div>
          <p className="eyebrow">Why choose A.M. Reddy</p>
          <ol className="mt-4 border-t">
            {WHY.map((w, k) => (
              <Reveal key={w.t} delay={k * 0.04}>
                <li className="group grid grid-cols-[40px_1fr] sm:grid-cols-[40px_200px_1fr] gap-x-4 gap-y-1 py-3.5 border-b list-none" data-testid={`card-why-${k}`}>
                  <span className="font-mono text-[12px] text-[hsl(var(--accent))] pt-0.5">{String(k + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-[15px] text-[hsl(var(--ink))] transition-transform group-hover:translate-x-1">{w.t}</h3>
                  <p className="col-start-2 sm:col-start-3 text-[13.5px] text-muted-foreground leading-relaxed">{w.d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Leadership ---------- */
function Leadership() {
  return (
    <section className="mt-16 md:mt-24">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7">
          <div className="[&>div]:mb-0"><SectionTitle eyebrow="Leadership" title="Messages from our leadership" /></div>
          <Link href="/administration" className="inline-flex items-center gap-2 text-[13.5px] font-bold text-[hsl(var(--accent))] hover:underline" data-testid="link-home-administration">Administration and HoDs <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {LEADERSHIP.map((p, k) => (
            <Reveal key={p.role + p.institution} delay={k * 0.06}>
              <article className="card-soft card-hover h-full overflow-hidden flex flex-col" data-testid={`card-leader-${k}`}>
                <div className="aspect-[5/4] bg-[hsl(var(--sand))] overflow-hidden"><PersonPhoto person={p} className="w-full h-full" /></div>
                <div className="p-4 flex-1 flex flex-col">
                  {p.message && <p className="text-[13.5px] leading-relaxed text-foreground/80 mb-4"><Quote className="w-4 h-4 text-[hsl(var(--saffron))] mb-1.5" />{p.message}</p>}
                  <div className="mt-auto pt-3 border-t">
                    <h3 className="font-display text-[15px] text-[hsl(var(--ink))]">{p.name === "To be published" ? <ToBePublished /> : p.name}</h3>
                    <p className="text-[12.5px] text-foreground/80 mt-1">{p.role}{p.qualification ? `, ${p.qualification}` : ""}</p>
                    <p className="text-[11.5px] text-muted-foreground mt-0.5">{p.institution}</p>
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

/* ---------- Placements ---------- */
function Placements() {
  const logos = [...RECRUITER_LOGOS, ...RECRUITER_LOGOS];
  const drives = [
    { img: IMG.placementThinksysq, r: "Thinksysq, Bangalore", d: "23 AMR students selected", t: "Jan 2025" },
    { img: IMG.placementCarro, r: "Carro Health", d: "Pharmacy students placed in pool drive", t: "15 Apr 2025" },
    { img: IMG.placementDivis, r: "Divis", d: "Pool campus drive for pharmacy students", t: "8 Mar 2025" },
  ];
  return (
    <section className="mt-16 md:mt-24">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7">
          <div className="[&>div]:mb-0"><SectionTitle eyebrow="Training and Placement" title="Recent campus recruitment" sub="The placement cell runs training and campus drives across pharmacy and engineering." /></div>
          <Link href="/student-life#placements" className="inline-flex items-center gap-2 text-[13.5px] font-bold text-[hsl(var(--accent))] hover:underline" data-testid="link-home-placements">Placement cell <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-3">
          {drives.map((x, k) => (
            <Reveal key={x.r} className={k === 0 ? "md:row-span-2" : ""}>
              <article className="group relative h-full min-h-[220px] rounded-2xl overflow-hidden bg-[hsl(var(--ink))] text-white" data-testid={`text-recruiter-${x.r.split(",")[0]}`}>
                <img src={asset(x.img)} alt={`${x.r} placement drive`} loading="lazy" className="img-zoom absolute inset-0 w-full h-full object-cover opacity-80" />
                <span className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink)/0.9)] to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="font-mono text-[11.5px] text-[hsl(var(--brass))]">{x.t}</span>
                  <h3 className={`font-display mt-1 ${k === 0 ? "text-[22px]" : "text-[17px]"}`}>{x.r}</h3>
                  <p className="text-[13.5px] text-white/80">{x.d}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border bg-card py-4 flex items-center gap-4 overflow-hidden">
          <p className="hidden sm:block shrink-0 pl-5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Our recruiters</p>
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <ul className="marquee flex w-max items-center gap-12 px-6">
              {logos.map((l, k) => <li key={k} aria-hidden={k >= RECRUITER_LOGOS.length || undefined}><img src={asset(l)} alt={k < RECRUITER_LOGOS.length ? `Recruiter logo ${k + 1}` : ""} className="h-10 w-auto max-w-[130px] object-contain" loading="lazy" /></li>)}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Alumni ---------- */
function Alumni() {
  return (
    <section className="mt-16 md:mt-24">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7">
          <div className="[&>div]:mb-0"><SectionTitle eyebrow="Alumni" title="Where our pharmacy graduates work" sub="Alumni of A.M. Reddy Memorial College of Pharmacy, from the alumni meet." /></div>
          <Link href="/student-life#alumni" className="inline-flex items-center gap-2 text-[13.5px] font-bold text-[hsl(var(--accent))] hover:underline" data-testid="link-home-alumni">All {ALUMNI.length} alumni <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ALUMNI.slice(0, 6).map((p, k) => (
            <Reveal key={p.name} delay={(k % 3) * 0.05}>
              <li className="card-soft card-hover flex items-center gap-4 p-3 list-none" data-testid={`card-alumni-${k}`}>
                <PersonPhoto person={p} className="w-16 h-16 rounded-xl shrink-0 !text-[18px]" />
                <div className="min-w-0"><h3 className="font-display text-[14.5px] text-[hsl(var(--ink))]">{p.name}</h3><p className="text-[12.5px] text-muted-foreground mt-0.5 leading-snug">{p.role}</p></div>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ---------- Campus life ---------- */
function CampusLife() {
  const tiles = [
    { img: IMG.campusAerial, t: "Campus", h: "/gallery", c: "col-span-2 row-span-2" },
    { img: IMG.libraryEngineering, t: "Library", h: "/gallery", c: "" },
    { img: IMG.sports3, t: "Sports", h: "/student-life#sports", c: "" },
    { img: IMG.sankranthi, t: "Festivals", h: "/gallery", c: "" },
    { img: IMG.nssMountainDay, t: "NSS", h: "/student-life#nss", c: "" },
  ];
  return (
    <section className="mt-16 md:mt-24">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7">
          <div className="[&>div]:mb-0"><SectionTitle eyebrow="Campus Life" title="Life on the Petlurivaripalem campus" /></div>
          <Link href="/gallery" className="inline-flex items-center gap-2 text-[13.5px] font-bold text-[hsl(var(--accent))] hover:underline" data-testid="link-home-gallery">Picture gallery <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] md:auto-rows-[180px] gap-3">
          {tiles.map((x, k) => (
            <Link key={x.t} href={x.h} className={`group relative overflow-hidden rounded-2xl ${x.c}`} data-testid={`link-campus-${k}`}>
              <img src={asset(x.img)} alt={x.t} loading="lazy" className="img-zoom absolute inset-0 w-full h-full object-cover" />
              <span className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink)/0.7)] via-transparent to-transparent" />
              <span className="absolute left-3 bottom-3 inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-[hsl(var(--paper))] text-[hsl(var(--ink))] font-semibold text-[13px]">{x.t}<ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CTA() {
  return (
    <section className={`${W} mt-16 md:mt-24`}>
      <div className="rounded-2xl bg-[hsl(var(--saffron))] text-white p-6 sm:p-10 grid lg:grid-cols-[1fr_auto] gap-6 items-center">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-white/80">Admissions 2026</p>
          <h2 className="font-display text-[24px] md:text-[32px] leading-tight mt-2">Begin your application with an enquiry</h2>
          <p className="mt-2 text-white/85 max-w-xl text-[14.5px]">Our admissions office will guide you through eligibility, counselling and fees for every programme.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admissions#enquire" className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[hsl(var(--ink))] text-white font-bold text-[14px] hover:bg-[hsl(var(--teal-deep))]" data-testid="link-cta-enquire">Admission enquiry <ArrowRight className="w-4 h-4" /></Link>
          <a href={PHONE_TEL} className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-white/50 font-semibold text-[14px] hover:bg-white/10" data-testid="link-cta-call"><Phone className="w-4 h-4" />{PHONE}</a>
          <Link href="/admissions#process" className="inline-flex items-center h-11 px-5 rounded-full border border-white/50 font-semibold text-[14px] hover:bg-white/10" data-testid="link-cta-process">Admission process</Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (<><FirstScreen /><Timeline /><Programmes /><Welcome /><Leadership /><Placements /><Alumni /><CampusLife /><CTA /></>);
}
