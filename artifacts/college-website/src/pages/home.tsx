import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play, Phone } from "lucide-react";
import { Container, Reveal, SectionTitle, PersonPhoto, ToBePublished } from "@/components/layout";
import { asset, INSTITUTIONS, NEWS, PHONE, PHONE_TEL } from "@/data/site";
import { LEADERSHIP, ALUMNI } from "@/data/people";
import { EVENT_PHOTOS, RECRUITER_LOGOS } from "@/data/gallery";
import { IMG } from "@/data/images";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------- Hero: photograph + what's happening ---------- */
function EventStory() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = EVENT_PHOTOS.length;
  useEffect(() => {
    if (reduce || paused) return;
    const t = setTimeout(() => setI((x) => (x + 1) % n), 7000);
    return () => clearTimeout(t);
  }, [i, reduce, paused, n]);
  const e = EVENT_PHOTOS[i];
  const go = (d: number) => setI((x) => (x + d + n) % n);
  return (
    <section aria-label="Recent events" aria-roledescription="carousel">
      <div className="flex items-center justify-between">
        <h2 className="eyebrow">Recent events</h2>
        <div className="flex items-center gap-0.5 text-foreground/70">
          <span className="text-[12px] mr-2 tabular-nums" aria-live="polite">{i + 1} / {n}</span>
          <button onClick={() => go(-1)} aria-label="Previous event" className="w-8 h-8 grid place-items-center hover:text-[hsl(var(--pine))]" data-testid="button-hero-prev"><ChevronLeft className="w-4 h-4" /></button>
          {!reduce && <button onClick={() => setPaused(!paused)} aria-label={paused ? "Play events" : "Pause events"} className="w-8 h-8 grid place-items-center hover:text-[hsl(var(--pine))]" data-testid="button-hero-pause">{paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}</button>}
          <button onClick={() => go(1)} aria-label="Next event" className="w-8 h-8 grid place-items-center hover:text-[hsl(var(--pine))]" data-testid="button-hero-next"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
      <Link href="/notices#news" className="group mt-3 grid grid-cols-[132px_1fr] sm:grid-cols-[160px_1fr] gap-4 items-start" data-testid="link-event-feature">
        <span className="relative block aspect-[4/3] overflow-hidden bg-[hsl(var(--sand))]">
          <AnimatePresence initial={false}>
            <motion.img key={e.src} src={asset(e.src)} alt={e.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0 w-full h-full object-cover" />
          </AnimatePresence>
          {!reduce && !paused && <span key={i} aria-hidden className="progress-bar absolute bottom-0 left-0 h-[2px] w-full bg-[hsl(var(--lagoon))]" />}
        </span>
        <span className="min-w-0" data-testid="text-event-title">
          <span className="block text-[12px] font-semibold text-[hsl(var(--lagoon))]">{e.tag} / {e.date}</span>
          <span className="block font-display text-[17px] leading-snug mt-1 text-[hsl(var(--pine))] group-hover:underline decoration-1 underline-offset-4">{e.title}</span>
        </span>
      </Link>
    </section>
  );
}

function Announcements() {
  return (
    <section aria-label="Announcements" className="mt-7">
      <div className="flex items-center justify-between">
        <h2 className="eyebrow">Announcements</h2>
        <Link href="/notices" className="text-[12.5px] font-semibold text-[hsl(var(--lagoon))] inline-flex items-center gap-1 hover:underline" data-testid="link-news-all">All notices <ArrowRight className="w-3.5 h-3.5" /></Link>
      </div>
      <ul className="mt-2">
        <li><Link href="/admissions#enquire" className="group grid grid-cols-[86px_1fr] gap-3 py-3 border-b" data-testid="row-home-notice-admissions">
          <span className="text-[12px] font-bold text-[hsl(var(--lagoon))] pt-0.5">Open now</span>
          <span className="text-[14px] font-semibold leading-snug group-hover:text-[hsl(var(--lagoon))]">Admissions 2026: enquiries open for B.Tech, B.Pharm, Pharm.D, M.Pharm, M.Tech and Diploma</span>
        </Link></li>
        {NEWS.slice(0, 5).map((x, k) => (
          <li key={x.title}><Link href={["Examinations", "IQAC"].includes(x.tag) ? "/notices#notices" : "/notices#news"} className="group grid grid-cols-[86px_1fr] gap-3 py-3 border-b" data-testid={`row-home-notice-${k}`}>
            <span className="text-[12px] text-muted-foreground pt-0.5 tabular-nums">{x.date}</span>
            <span className="min-w-0"><span className="block text-[14px] font-medium leading-snug group-hover:text-[hsl(var(--lagoon))]">{x.title}</span><span className="text-[11.5px] text-muted-foreground">{x.tag}</span></span>
          </Link></li>
        ))}
      </ul>
    </section>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const a = (d: number) => (reduce ? {} : { initial: { y: 14 }, animate: { y: 0 }, transition: { duration: 0.8, delay: d, ease: EASE } });
  return (
    <section className="max-w-[1280px] mx-auto sm:px-8 sm:pt-8">
      <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-0 lg:gap-10">
        <div className="relative min-h-[460px] sm:min-h-[540px] lg:min-h-[600px] overflow-hidden bg-[hsl(var(--ink))]">
          <motion.img src={asset(IMG.campusAerial)} alt="Aerial view of the A.M. Reddy campus at Petlurivaripalem" initial={reduce ? false : { scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease: EASE }} className="absolute inset-0 w-full h-full object-cover" />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink)/0.95)] via-[hsl(var(--ink)/0.55)] to-[hsl(var(--ink)/0.35)] sm:from-[hsl(var(--ink)/0.9)] sm:via-[hsl(var(--ink)/0.25)] sm:to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 text-white">
            <motion.p {...a(0.1)} className="eyebrow eyebrow-light whitespace-nowrap"><span className="sm:hidden">Narasaraopet / Since 2004</span><span className="hidden sm:inline">Narasaraopet, Andhra Pradesh / Since 2004</span></motion.p>
            <motion.h1 {...a(0.18)} className="font-display text-[30px] sm:text-[38px] lg:text-[44px] leading-[1.1] mt-4 max-w-[640px]" data-testid="text-hero-title">Pharmacy, engineering and technology, taught on one campus in Palnadu.</motion.h1>
            <motion.p {...a(0.26)} className="mt-4 text-[15px] text-white/80 max-w-[520px] leading-relaxed">The College of Pharmacy, the autonomous College of Engineering and Technology, and the Polytechnic, on 10.94 acres at Petlurivaripalem.</motion.p>
            <motion.div {...a(0.34)} className="mt-6 flex flex-wrap gap-3">
              <Link href="/admissions#enquire" className="group inline-flex items-center gap-2 h-11 px-5 bg-[hsl(var(--paper))] text-[hsl(var(--pine))] font-semibold text-[14px] hover:bg-white" data-testid="link-hero-admissions">Apply for 2026 <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" /></Link>
              <Link href="/about" className="inline-flex items-center h-11 px-5 border border-white/40 text-white font-semibold text-[14px] hover:bg-white/10" data-testid="link-hero-about">About the institutions</Link>
            </motion.div>
          </div>
        </div>
        <motion.aside {...a(0.2)} className="px-4 sm:px-0 pt-8 lg:pt-0 flex flex-col" aria-label="What is happening on campus">
          <p className="font-display text-[22px] text-[hsl(var(--pine))] leading-tight">On campus this season</p>
          <div className="rule mt-4 mb-5" />
          <EventStory />
          <Announcements />
        </motion.aside>
      </div>
    </section>
  );
}

/* ---------- Three institutions ---------- */
function Institutions() {
  return (
    <section className="mt-20 md:mt-28">
      <Container>
        <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16">
          <div className="lg:sticky lg:top-28 self-start">
            <SectionTitle eyebrow="Our institutions" title="Three colleges, one campus, one standard." sub="Each institution keeps its own affiliation and approvals, and shares the libraries, laboratories, hostels and transport of the Petlurivaripalem campus." />
          </div>
          <ol>
            {INSTITUTIONS.map((ins, k) => {
              const n = ins.groups.reduce((s, g) => s + g.items.length, 0);
              return (
                <Reveal key={ins.key} delay={k * 0.05}>
                  <li className="list-none border-t last:border-b">
                    <Link href={ins.href} className="group grid sm:grid-cols-[200px_1fr] gap-5 sm:gap-8 py-7" data-testid={`card-institution-${ins.key}`}>
                      <span className="block aspect-[4/3] overflow-hidden bg-[hsl(var(--sand))]"><img src={asset(ins.img)} alt={ins.name} loading="lazy" className="img-zoom w-full h-full object-cover" /></span>
                      <span className="min-w-0">
                        <span className="block text-[12px] font-semibold text-[hsl(var(--lagoon))]">Established {ins.est}</span>
                        <span className="block font-display text-[22px] leading-snug mt-1.5 text-[hsl(var(--pine))]">{ins.name}</span>
                        <span className="block text-[14px] text-muted-foreground mt-2">{ins.affiliation}. {n} programmes.</span>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[hsl(var(--pine))]"><span className="link-u">Visit the college</span><ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                      </span>
                    </Link>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Story band ---------- */
const TIMELINE = [
  { y: "2004", t: "College of Pharmacy established" },
  { y: "2008", t: "College of Engineering and Technology established" },
  { y: "2009", t: "Civil Engineering started" },
  { y: "2013", t: "Diploma programmes (Polytechnic) begin" },
  { y: "2022-23", t: "Diploma in Computer Engineering" },
];
function Story() {
  return (
    <section className="mt-20 md:mt-28 bg-[hsl(var(--pine))] text-white">
      <Container className="py-16 md:py-24">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
          <Reveal>
            <p className="eyebrow eyebrow-light">Welcome to A.M. Reddy</p>
            <h2 className="font-display text-[26px] md:text-[34px] leading-[1.2] mt-4">An institution rooted in Palnadu, preparing professionals for the nation.</h2>
            <div className="mt-5 space-y-4 text-[15.5px] leading-[1.75] text-white/80 max-w-xl">
              <p>Sponsored by the Atluri Mastan Reddy Educational Society (Reg. No. 450/2003), A.M. Reddy Educational Institutions began with the College of Pharmacy in 2004 and established the College of Engineering and Technology in 2008. Diploma programmes followed in 2013.</p>
              <p>The campus, approximately 3 km from Narasaraopet, offers separate hostels for men and women, a college bus network, modern laboratories and an incubation centre.</p>
            </div>
            <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-white/15 pt-6 max-w-lg">
              {[["10.94", "acres of campus"], ["9", "B.Tech branches"], ["6", "pharmacy programmes"]].map(([n, l], k) => (
                <div key={l}><dt className="sr-only">{l}</dt><dd className="num-display text-[32px] text-white" data-testid={`text-stat-${k}`}>{n}</dd><dd className="text-[12.5px] text-white/60 mt-2">{l}</dd></div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="aspect-[4/3] overflow-hidden"><img src={asset(IMG.campusLawns)} alt="Academic blocks and lawns of the A.M. Reddy campus" loading="lazy" className="w-full h-full object-cover" /></div>
            <ol className="mt-8 space-y-0">
              {TIMELINE.map((x) => (
                <li key={x.y} className="grid grid-cols-[84px_1fr] gap-4 py-2.5 border-b border-white/10 text-[14px]"><span className="font-display text-[hsl(var(--brass))]">{x.y}</span><span className="text-white/80">{x.t}</span></li>
              ))}
            </ol>
            <Link href="/about" className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-white" data-testid="link-welcome-about"><span className="link-u">Our history and approvals</span><ArrowRight className="w-4 h-4" /></Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Programmes index ---------- */
function Programmes() {
  const [tab, setTab] = useState(1);
  const ins = INSTITUTIONS[tab];
  return (
    <section className="mt-20 md:mt-28">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="[&>div]:mb-0"><SectionTitle eyebrow="Academics" title="Programmes for 2026" /></div>
          <div role="tablist" aria-label="Institution" className="flex gap-6 border-b overflow-x-auto no-scrollbar">
            {INSTITUTIONS.map((x, k) => (
              <button key={x.key} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`relative h-11 whitespace-nowrap text-[14px] font-semibold transition-colors ${tab === k ? "text-[hsl(var(--pine))]" : "text-muted-foreground hover:text-foreground"}`} data-testid={`tab-programmes-${x.key}`}>
                {x.short}<span aria-hidden className={`absolute left-0 right-0 -bottom-px h-[2px] bg-[hsl(var(--lagoon))] transition-transform origin-left ${tab === k ? "scale-x-100" : "scale-x-0"}`} />
              </button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={ins.key} role="tabpanel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="mt-8 grid md:grid-cols-2 gap-x-12">
            {ins.groups.map((g) => (
              <div key={g.title} className="mb-8">
                <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground font-sans">{g.title}</h3>
                <ul className="mt-2">
                  {g.items.map((p, k) => (
                    <li key={p.name}><Link href={`${ins.href}#programmes`} className="group flex items-baseline justify-between gap-4 py-3 border-b" data-testid={`card-programme-${ins.key}-${k}`}>
                      <span className="text-[15px] font-medium group-hover:text-[hsl(var(--lagoon))]">{p.name}</span>
                      <span className="shrink-0 text-[12.5px] text-muted-foreground">{p.dur ?? ""}{p.dur && p.intake ? " / " : ""}{p.intake ? `Intake ${p.intake}` : ""}</span>
                    </Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        <Link href={ins.href} className="inline-flex items-center gap-2 text-[14px] font-semibold text-[hsl(var(--pine))]" data-testid="link-programmes-institution"><span className="link-u">More about the {ins.short}</span><ArrowRight className="w-4 h-4" /></Link>
      </Container>
    </section>
  );
}

/* ---------- Leadership ---------- */
function Leadership() {
  const [chair, ...rest] = LEADERSHIP;
  return (
    <section className="mt-20 md:mt-28 bg-[hsl(var(--sand))]">
      <Container className="py-16 md:py-24">
        <div className="grid lg:grid-cols-[320px_1fr] gap-10 lg:gap-16 items-center">
          <Reveal><div className="aspect-[4/5] overflow-hidden bg-[hsl(var(--card))]"><PersonPhoto person={chair} className="w-full h-full" /></div></Reveal>
          <Reveal delay={0.08}>
            <p className="eyebrow">From the President</p>
            {chair.message && <blockquote className="font-display text-[24px] md:text-[32px] leading-[1.3] text-[hsl(var(--pine))] mt-4">"{chair.message}"</blockquote>}
            <p className="mt-5 text-[15px] font-semibold" data-testid="card-leader-0">{chair.name}</p>
            <p className="text-[13.5px] text-muted-foreground">{chair.role}</p>
          </Reveal>
        </div>
        <div className="mt-14 grid sm:grid-cols-3 gap-8 border-t border-[hsl(var(--border))] pt-10">
          {rest.map((p, k) => (
            <div key={p.role + p.institution} className="flex gap-4" data-testid={`card-leader-${k + 1}`}>
              <PersonPhoto person={p} className="w-16 h-16 rounded-full shrink-0 !text-[18px]" />
              <div className="min-w-0">
                <h3 className="font-display text-[16px] text-[hsl(var(--pine))]">{p.name === "To be published" ? <ToBePublished /> : p.name}</h3>
                <p className="text-[13px] text-foreground/80 mt-1">{p.role}{p.qualification ? `, ${p.qualification}` : ""}</p>
                <p className="text-[12px] text-muted-foreground">{p.institution}</p>
                {p.message && <p className="mt-2 text-[13.5px] italic text-foreground/75">"{p.message}"</p>}
              </div>
            </div>
          ))}
        </div>
        <Link href="/administration" className="mt-10 inline-flex items-center gap-2 text-[14px] font-semibold text-[hsl(var(--pine))]" data-testid="link-home-administration"><span className="link-u">Administration and Heads of Department</span><ArrowRight className="w-4 h-4" /></Link>
      </Container>
    </section>
  );
}

/* ---------- Placements ---------- */
function Placements() {
  const drives = [
    { img: IMG.placementThinksysq, r: "Thinksysq, Bangalore", d: "23 AMR students selected", t: "Jan 2025" },
    { img: IMG.placementCarro, r: "Carro Health", d: "Pharmacy students placed in pool drive", t: "15 Apr 2025" },
    { img: IMG.placementDivis, r: "Divis", d: "Pool campus drive for pharmacy students", t: "8 Mar 2025" },
  ];
  return (
    <section className="mt-20 md:mt-28">
      <Container>
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-start">
          <Reveal>
            <div className="group relative aspect-[4/3] overflow-hidden bg-[hsl(var(--sand))]">
              <img src={asset(drives[0].img)} alt="Thinksysq placement drive" loading="lazy" className="img-zoom absolute inset-0 w-full h-full object-cover" />
            </div>
          </Reveal>
          <div>
            <SectionTitle eyebrow="Training and Placement" title="Recent campus recruitment" sub="The placement cell runs training and campus drives across pharmacy and engineering." />
            <ul>
              {drives.map((x) => (
                <li key={x.r} className="py-4 border-b first:border-t" data-testid={`text-recruiter-${x.r.split(",")[0]}`}>
                  <span className="block text-[12px] font-semibold text-[hsl(var(--lagoon))]">{x.t}</span>
                  <span className="block font-display text-[19px] text-[hsl(var(--pine))] mt-0.5">{x.r}</span>
                  <span className="block text-[14px] text-muted-foreground">{x.d}</span>
                </li>
              ))}
            </ul>
            <Link href="/student-life#placements" className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-[hsl(var(--pine))]" data-testid="link-home-placements"><span className="link-u">The placement cell</span><ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
        <div className="mt-14">
          <p className="eyebrow">Our recruiters</p>
          <ul className="mt-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-px bg-[hsl(var(--border))] border">
            {RECRUITER_LOGOS.map((l, k) => <li key={l} className="bg-[hsl(var(--card))] h-20 grid place-items-center px-4"><img src={asset(l)} alt={`Recruiter logo ${k + 1}`} className="max-h-10 w-auto max-w-full object-contain" loading="lazy" /></li>)}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Campus life ---------- */
function CampusLife() {
  const tiles = [
    { img: IMG.sports3, t: "Sports", h: "/student-life#sports", c: "col-span-2 row-span-2" },
    { img: IMG.libraryEngineering, t: "Libraries", h: "/research#facilities", c: "" },
    { img: IMG.sankranthi, t: "Festivals", h: "/gallery", c: "" },
    { img: IMG.nssMountainDay, t: "NSS", h: "/student-life#nss", c: "" },
    { img: IMG.labSession, t: "Laboratories", h: "/research#facilities", c: "" },
  ];
  return (
    <section className="mt-20 md:mt-28">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="[&>div]:mb-0"><SectionTitle eyebrow="Campus life" title="Life at Petlurivaripalem" sub="Separate hostels, college buses, sports grounds, NSS outreach and the festivals that bring the campus together." /></div>
          <Link href="/gallery" className="inline-flex items-center gap-2 text-[14px] font-semibold text-[hsl(var(--pine))]" data-testid="link-home-gallery"><span className="link-u">Picture gallery</span><ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[210px] gap-2">
          {tiles.map((x, k) => (
            <Link key={x.t} href={x.h} className={`group relative overflow-hidden bg-[hsl(var(--sand))] ${x.c}`} data-testid={`link-campus-${k}`}>
              <img src={asset(x.img)} alt={x.t} loading="lazy" className="img-zoom absolute inset-0 w-full h-full object-cover" />
              <span className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink)/0.65)] via-transparent to-transparent" />
              <span className="absolute left-4 bottom-3 text-white font-display text-[17px]">{x.t}</span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- Alumni ---------- */
function Alumni() {
  return (
    <section className="mt-20 md:mt-28">
      <Container>
        <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16">
          <div>
            <SectionTitle eyebrow="Alumni" title="Where our pharmacy graduates work" sub="Alumni of A.M. Reddy Memorial College of Pharmacy, from the alumni meet." />
            <Link href="/student-life#alumni" className="inline-flex items-center gap-2 text-[14px] font-semibold text-[hsl(var(--pine))]" data-testid="link-home-alumni"><span className="link-u">All {ALUMNI.length} alumni</span><ArrowRight className="w-4 h-4" /></Link>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-10">
            {ALUMNI.slice(0, 6).map((p, k) => (
              <li key={p.name} className="flex items-center gap-4 py-4 border-b" data-testid={`card-alumni-${k}`}>
                <PersonPhoto person={p} className="w-14 h-14 rounded-full shrink-0 !text-[16px]" />
                <div className="min-w-0"><h3 className="font-display text-[16px] text-[hsl(var(--pine))]">{p.name}</h3><p className="text-[13px] text-muted-foreground leading-snug">{p.role}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function CTA() {
  return (
    <section className="mt-20 md:mt-28">
      <Container>
        <div className="relative overflow-hidden bg-[hsl(var(--lagoon))] text-white">
          <div className="grid md:grid-cols-[1.3fr_1fr]">
            <div className="p-8 sm:p-12">
              <p className="eyebrow eyebrow-light">Admissions 2026</p>
              <h2 className="font-display text-[26px] md:text-[34px] leading-tight mt-3">Begin your application with an enquiry.</h2>
              <p className="mt-3 text-white/85 max-w-lg text-[15px]">Our admissions office will guide you through eligibility, counselling and fees for every programme.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/admissions#enquire" className="inline-flex items-center gap-2 h-11 px-5 bg-white text-[hsl(var(--pine))] font-semibold text-[14px] hover:bg-[hsl(var(--paper))]" data-testid="link-cta-enquire">Admission enquiry <ArrowRight className="w-4 h-4" /></Link>
                <a href={PHONE_TEL} className="inline-flex items-center gap-2 h-11 px-5 border border-white/50 font-semibold text-[14px] hover:bg-white/10" data-testid="link-cta-call"><Phone className="w-4 h-4" />{PHONE}</a>
                <Link href="/admissions#process" className="inline-flex items-center h-11 px-5 border border-white/50 font-semibold text-[14px] hover:bg-white/10" data-testid="link-cta-process">Admission process</Link>
              </div>
            </div>
            <div className="relative min-h-[220px]"><img src={asset(IMG.awardCeremony)} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" /></div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function Home() {
  return (<><Hero /><Institutions /><Story /><Programmes /><Leadership /><Placements /><CampusLife /><Alumni /><CTA /></>);
}
