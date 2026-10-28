import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Pause, Play, Phone } from "lucide-react";
import { Container, Reveal, PersonPhoto } from "@/components/layout";
import { asset, INSTITUTIONS, NEWS, PHONE, PHONE_TEL, SOCIETY } from "@/data/site";
import { PEOPLE } from "@/data/people";
import { EVENT_PHOTOS, RECRUITER_LOGOS } from "@/data/gallery";
import { IMG, HERO_SLIDES } from "@/data/images";

const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION = 6500;

/* ---------- Parallax image ---------- */
function Parallax({ src, alt, className = "", amount = 60, imgClass = "" }: { src: string; alt: string; className?: string; amount?: number; imgClass?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-amount, amount]);
  return (
    <div ref={ref} className={`${/\b(absolute|fixed|sticky)\b/.test(className) ? "" : "relative "}overflow-hidden bg-[hsl(var(--sand))] ${className}`}>
      <motion.img src={asset(src)} alt={alt} style={{ y }} className={`absolute inset-x-0 -top-[12%] h-[124%] w-full object-cover ${imgClass}`} />
    </div>
  );
}

/* ---------- 1. Full-screen hero slideshow ---------- */
function HeroSlideshow() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = HERO_SLIDES.length;
  useEffect(() => {
    if (reduce || paused) return;
    const t = setTimeout(() => setI((x) => (x + 1) % n), DURATION);
    return () => clearTimeout(t);
  }, [i, paused, reduce, n]);
  const s = HERO_SLIDES[i];
  return (
    <section aria-label="Campus slideshow" aria-roledescription="carousel" className="relative h-[100svh] min-h-[560px] max-h-[980px] w-full overflow-hidden bg-[hsl(var(--ink))]">
      <AnimatePresence initial={false}>
        <motion.div key={i} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2, ease: "easeInOut" }}>
          {s.video && !reduce ? (
            <video src={asset(s.video)} poster={asset(s.img)} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <motion.img src={asset(s.img)} alt="" initial={reduce ? false : { scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: DURATION / 1000 + 1.5, ease: "linear" }} className="absolute inset-0 w-full h-full object-cover" />
          )}
        </motion.div>
      </AnimatePresence>
      <span aria-hidden className="absolute inset-x-0 top-0 h-60 bg-gradient-to-b from-[hsl(var(--ink)/0.85)] via-[hsl(var(--ink)/0.4)] to-transparent" />
      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink)/0.88)] via-[hsl(var(--ink)/0.25)] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 pb-24 sm:pb-28">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 grid lg:grid-cols-[1fr_auto] gap-8 items-end">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.7, ease: EASE }} className="text-white max-w-[620px]" aria-live="polite">
              <p className="eyebrow eyebrow-light whitespace-nowrap">A.M. Reddy / Narasaraopet</p>
              <h1 className="font-display text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.08] mt-3" data-testid="text-hero-title">{s.caption}</h1>
              <p className="mt-3 text-[15px] text-white/80">{s.sub}</p>
              <Link href={s.cta.href} className="group mt-6 inline-flex items-center gap-3 h-12 pl-5 pr-2 bg-white/95 text-[hsl(var(--pine))] text-[14px] font-semibold hover:bg-white" data-testid="link-hero-cta">
                {s.cta.label}<span className="w-8 h-8 grid place-items-center bg-[hsl(var(--pine))] text-white transition-transform group-hover:translate-x-0.5"><ArrowRight className="w-4 h-4" /></span>
              </Link>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center gap-3">
            <div role="tablist" aria-label="Choose slide" className="flex gap-1.5">
              {HERO_SLIDES.map((x, k) => (
                <button key={k} role="tab" aria-selected={k === i} aria-label={`Slide ${k + 1}: ${x.caption}`} onClick={() => setI(k)} className="relative h-8 w-10 sm:w-14 flex items-center" data-testid={`button-hero-slide-${k}`}>
                  <span className="block w-full h-[2px] bg-white/30 overflow-hidden">
                    {k === i && <span key={`${i}-${paused}`} className={`block h-full bg-white ${paused || reduce ? "" : "progress-bar"}`} style={{ animationDuration: `${DURATION}ms` }} />}
                    {k < i && <span className="block h-full bg-white/70" />}
                  </span>
                </button>
              ))}
            </div>
            {!reduce && <button onClick={() => setPaused(!paused)} aria-label={paused ? "Play slideshow" : "Pause slideshow"} className="w-9 h-9 grid place-items-center border border-white/40 text-white hover:bg-white/10" data-testid="button-hero-pause">{paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}</button>}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 2. Announcements and events, layered over the hero edge ---------- */
function NewsBand() {
  return (
    <section aria-label="Announcements and events" className="relative z-10 -mt-14 sm:-mt-16">
      <Container>
        <div className="bg-[hsl(var(--card))] shadow-[0_40px_80px_-40px_hsl(var(--ink)/0.45)] grid lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
          <div className="p-5 sm:p-8 min-w-0">
            <div className="flex items-center justify-between">
              <h2 className="eyebrow">Events on campus</h2>
              <Link href="/gallery" className="text-[12.5px] font-semibold text-[hsl(var(--lagoon))] inline-flex items-center gap-1 hover:underline" data-testid="link-events-gallery">Gallery <ArrowRight className="w-3.5 h-3.5" /></Link>
            </div>
            <ul className="mt-4 flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 pb-1">
              {EVENT_PHOTOS.map((e, k) => (
                <li key={e.src + k} className="snap-start shrink-0 w-[230px] sm:w-[250px]">
                  <Link href="/notices#news" className="group block" data-testid={`link-event-${k}`}>
                    <span className="block aspect-[4/3] overflow-hidden bg-[hsl(var(--sand))]"><img src={asset(e.src)} alt={e.title} loading="lazy" className="img-zoom w-full h-full object-cover" /></span>
                    <span className="block mt-3 text-[11.5px] font-semibold text-[hsl(var(--lagoon))]">{e.tag} / {e.date}</span>
                    <span className="block mt-1 text-[14.5px] font-semibold leading-snug group-hover:text-[hsl(var(--lagoon))]" data-testid={`text-event-title-${k}`}>{e.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-5 sm:p-8 bg-[hsl(var(--sand)/0.6)] lg:border-l min-w-0">
            <div className="flex items-center justify-between">
              <h2 className="eyebrow">Announcements</h2>
              <Link href="/notices" className="text-[12.5px] font-semibold text-[hsl(var(--lagoon))] inline-flex items-center gap-1 hover:underline" data-testid="link-news-all">All notices <ArrowRight className="w-3.5 h-3.5" /></Link>
            </div>
            <ul className="mt-2">
              <li><Link href="/admissions#enquire" className="group grid grid-cols-[78px_1fr] gap-3 py-3 border-b" data-testid="row-home-notice-admissions">
                <span className="text-[12px] font-bold text-[hsl(var(--lagoon))] pt-0.5">Open now</span>
                <span className="text-[14px] font-semibold leading-snug group-hover:text-[hsl(var(--lagoon))]">Admissions 2026: enquiries open</span>
              </Link></li>
              {NEWS.slice(0, 5).map((x, k) => (
                <li key={x.title}><Link href={["Examinations", "IQAC"].includes(x.tag) ? "/notices#notices" : "/notices#news"} className="group grid grid-cols-[78px_1fr] gap-3 py-3 border-b last:border-0" data-testid={`row-home-notice-${k}`}>
                  <span className="text-[12px] text-muted-foreground pt-0.5">{x.date}</span>
                  <span className="text-[14px] font-medium leading-snug group-hover:text-[hsl(var(--lagoon))]">{x.title}</span>
                </Link></li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- 3. Colleges as entry points ---------- */
const LINE: Record<string, string> = {
  pharmacy: "Pharmaceutical sciences, from B.Pharm to Pharm.D and M.Pharm.",
  engineering: "An autonomous college of engineering and technology.",
  polytechnic: "Diploma programmes built on workshop practice.",
};
function CollegeCard({ k, className }: { k: number; className: string }) {
  const ins = INSTITUTIONS[k];
  return (
    <Link href={ins.href} className={`group relative block overflow-hidden bg-[hsl(var(--ink))] ${className}`} data-testid={`card-institution-${ins.key}`}>
      <Parallax src={ins.img} alt={ins.name} amount={30} className="absolute inset-0" imgClass="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]" />
      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink)/0.9)] via-[hsl(var(--ink)/0.3)] to-transparent transition-opacity duration-500 group-hover:opacity-90" />
      <span aria-hidden className="absolute inset-0 bg-[hsl(var(--pine)/0.0)] transition-colors duration-500 group-hover:bg-[hsl(var(--pine)/0.35)]" />
      <span className="absolute inset-x-0 bottom-0 p-6 sm:p-7 text-white flex items-end justify-between gap-4">
        <span className="min-w-0">
          <span className="block font-display text-[21px] sm:text-[24px] leading-tight">{ins.short}</span>
          <span className="block text-[14px] text-white/80 mt-2 max-w-sm transition-transform duration-500 group-hover:-translate-y-0.5">{LINE[ins.key]}</span>
        </span>
        <span className="shrink-0 w-11 h-11 grid place-items-center border border-white/50 transition-all duration-500 group-hover:bg-white group-hover:text-[hsl(var(--pine))] group-hover:border-white"><ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover:rotate-45" /></span>
      </span>
    </Link>
  );
}
function Colleges() {
  return (
    <section className="mt-24 md:mt-32">
      <Container>
        <div className="grid md:grid-cols-[1fr_1fr] gap-6 items-end mb-10">
          <Reveal><p className="eyebrow">Our institutions</p><h2 className="font-display text-[28px] md:text-[36px] leading-[1.12] mt-3 text-[hsl(var(--pine))]">Choose your college.</h2></Reveal>
          <Reveal delay={0.05}><p className="text-[15px] text-muted-foreground max-w-md md:justify-self-end">Three institutions share one campus near Narasaraopet. Programmes, approvals and admissions details are on each college's page.</p></Reveal>
        </div>
        <div className="grid lg:grid-cols-12 gap-3">
          <CollegeCard k={1} className="lg:col-span-7 lg:row-span-2 h-[340px] sm:h-[420px] lg:h-[600px]" />
          <CollegeCard k={0} className="lg:col-span-5 h-[300px]" />
          <CollegeCard k={2} className="lg:col-span-5 h-[300px]" />
        </div>
      </Container>
    </section>
  );
}

/* ---------- 4. Pinned campus story ---------- */
const CHAPTERS = [
  { y: "2003", t: "A society with a purpose", d: `The ${SOCIETY} is registered to establish professional education in Palnadu.` },
  { y: "2004", t: "The College of Pharmacy opens", d: "A.M. Reddy Memorial College of Pharmacy admits its first students." },
  { y: "2008", t: "Engineering and technology", d: "The College of Engineering and Technology is established; Civil Engineering follows in 2009." },
  { y: "2013", t: "The Polytechnic", d: "Diploma programmes begin, opening a practical route into industry and further study." },
];
function Story() {
  const reduce = useReducedMotion();
  return (
    <section className="mt-24 md:mt-32 bg-[hsl(var(--pine))] text-white">
      <Container className="py-16 md:py-0">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
          <div className="lg:sticky lg:top-0 lg:h-[100svh] flex flex-col justify-center lg:py-20">
            <p className="eyebrow eyebrow-light">About A.M. Reddy</p>
            <h2 className="font-display text-[28px] md:text-[36px] leading-[1.15] mt-3">Built up, step by step, on 10.94 acres at Petlurivaripalem.</h2>
            <div className="relative mt-8">
              <Parallax src={IMG.campusLawns} alt="Academic blocks and lawns of the campus" amount={40} className="aspect-[4/3] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]" />
              <span aria-hidden className="hidden sm:block absolute -bottom-5 -right-5 w-2/5 h-2/5 border border-[hsl(var(--brass)/0.5)] -z-0 pointer-events-none" />
            </div>
          </div>
          <ol className="lg:py-[24vh] space-y-14 lg:space-y-[28vh]">
            {CHAPTERS.map((c) => (
              <motion.li key={c.y} initial={reduce ? false : { y: 24 }} whileInView={{ y: 0 }} viewport={{ amount: 0.6 }} transition={{ duration: 0.6, ease: EASE }} className="max-w-md">
                <span className="num-display text-[52px] md:text-[64px] text-[hsl(var(--brass))]">{c.y}</span>
                <h3 className="font-display text-[22px] mt-3">{c.t}</h3>
                <p className="text-[15px] text-white/75 mt-2 leading-relaxed">{c.d}</p>
              </motion.li>
            ))}
            <li><Link href="/about" className="inline-flex items-center gap-2 text-[14px] font-semibold" data-testid="link-welcome-about"><span className="link-u">About the institutions</span><ArrowRight className="w-4 h-4" /></Link></li>
          </ol>
        </div>
      </Container>
    </section>
  );
}

/* ---------- 5. Chairperson ---------- */
function Chairperson() {
  const chair = PEOPLE.find((p) => p.role.includes("Chairperson"));
  if (!chair) return null;
  return (
    <section className="mt-24 md:mt-32">
      <Container>
        <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-20 items-center">
          <Reveal className="relative">
            <span aria-hidden className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-3/4 h-3/4 bg-[hsl(var(--lagoon)/0.12)]" />
            <div className="relative aspect-[4/5] overflow-hidden shadow-[0_40px_70px_-35px_hsl(var(--ink)/0.5)]"><PersonPhoto person={chair} className="w-full h-full" /></div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="eyebrow">Leadership</p>
            <h2 className="font-display text-[28px] md:text-[36px] leading-[1.15] mt-3 text-[hsl(var(--pine))]" data-testid="text-chairperson-name">{chair.name}</h2>
            <p className="mt-2 text-[15px] font-semibold">{chair.role}</p>
            <p className="text-[14px] text-muted-foreground">{chair.institution}</p>
            <div className="rule my-7 max-w-md" />
            <p className="text-[15.5px] leading-relaxed text-foreground/80 max-w-lg">A.M. Reddy Educational Institutions are sponsored by the {SOCIETY}, bringing the College of Pharmacy, the College of Engineering and Technology and the Polytechnic together on one campus.</p>
            <Link href="/administration" className="mt-7 inline-flex items-center gap-2 text-[14px] font-semibold text-[hsl(var(--pine))]" data-testid="link-home-administration"><span className="link-u">Administration</span><ArrowRight className="w-4 h-4" /></Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ---------- 6. Campus life ---------- */
function CampusLife() {
  const tiles = [
    { img: IMG.sports3, t: "Sports", h: "/student-life#sports", c: "col-span-2 md:col-span-3 md:row-span-2" },
    { img: IMG.nssMountainDay, t: "NSS", h: "/student-life#nss", c: "md:col-span-2" },
    { img: IMG.libraryEngineering, t: "Libraries", h: "/research#facilities", c: "md:col-span-1" },
    { img: IMG.sankranthi, t: "Festivals", h: "/gallery", c: "md:col-span-1" },
    { img: IMG.labSession, t: "Laboratories", h: "/research#facilities", c: "md:col-span-2" },
  ];
  return (
    <section className="mt-24 md:mt-32">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <Reveal><p className="eyebrow">Campus life</p><h2 className="font-display text-[28px] md:text-[36px] leading-[1.12] mt-3 text-[hsl(var(--pine))]">More than classrooms.</h2></Reveal>
          <Link href="/student-life" className="inline-flex items-center gap-2 text-[14px] font-semibold text-[hsl(var(--pine))]" data-testid="link-home-campus"><span className="link-u">Student life and hostels</span><ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 auto-rows-[160px] md:auto-rows-[230px] gap-3">
          {tiles.map((x, k) => (
            <Link key={x.t} href={x.h} className={`group relative overflow-hidden ${x.c}`} data-testid={`link-campus-${k}`}>
              <Parallax src={x.img} alt={x.t} amount={20} className="absolute inset-0" imgClass="transition-transform duration-[1200ms] group-hover:scale-[1.06]" />
              <span className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink)/0.7)] via-transparent to-transparent" />
              <span className="absolute left-4 bottom-3 right-4 flex items-center justify-between text-white"><span className="font-display text-[18px]">{x.t}</span><ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" /></span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- 7. Placements band ---------- */
function Placements() {
  return (
    <section className="mt-24 md:mt-32">
      <div className="relative">
        <Parallax src={IMG.placementThinksysq} alt="Students selected in a campus placement drive" amount={70} className="h-[460px] md:h-[520px]" />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--ink)/0.88)] via-[hsl(var(--ink)/0.55)] to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <Container className="w-full">
            <Reveal className="max-w-lg text-white">
              <p className="eyebrow eyebrow-light">Training and placement</p>
              <p className="font-display text-[28px] md:text-[38px] leading-[1.15] mt-3">23 AMR students selected for Thinksysq, Bangalore.</p>
              <p className="mt-3 text-white/75 text-[15px]">Jan 2025. Pharmacy students were also placed through the Carro Health and Divis pool drives.</p>
              <Link href="/student-life#placements" className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold" data-testid="link-home-placements"><span className="link-u">The placement cell</span><ArrowRight className="w-4 h-4" /></Link>
            </Reveal>
          </Container>
        </div>
      </div>
      <Container>
        <ul className="relative -mt-10 z-10 bg-[hsl(var(--card))] shadow-[0_30px_60px_-35px_hsl(var(--ink)/0.45)] grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
          {RECRUITER_LOGOS.map((l, k) => <li key={l} className="h-20 grid place-items-center px-4 border-r border-b lg:border-b-0 border-border/60"><img src={asset(l)} alt={`Recruiter logo ${k + 1}`} className="max-h-9 w-auto max-w-full object-contain grayscale hover:grayscale-0 transition" loading="lazy" /></li>)}
        </ul>
      </Container>
    </section>
  );
}

function CTA() {
  return (
    <section className="mt-24 md:mt-32">
      <Container>
        <div className="grid md:grid-cols-[1.3fr_1fr] bg-[hsl(var(--lagoon))] text-white shadow-[0_40px_80px_-40px_hsl(var(--ink)/0.5)]">
          <div className="p-8 sm:p-12">
            <p className="eyebrow eyebrow-light">Admissions 2026</p>
            <h2 className="font-display text-[26px] md:text-[34px] leading-tight mt-3">Begin your application with an enquiry.</h2>
            <p className="mt-3 text-white/85 max-w-lg text-[15px]">Our admissions office will guide you through eligibility, counselling and fees for every programme.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/admissions#enquire" className="inline-flex items-center gap-2 h-11 px-5 bg-white text-[hsl(var(--pine))] font-semibold text-[14px]" data-testid="link-cta-enquire">Admission enquiry <ArrowRight className="w-4 h-4" /></Link>
              <a href={PHONE_TEL} className="inline-flex items-center gap-2 h-11 px-5 border border-white/50 font-semibold text-[14px] hover:bg-white/10" data-testid="link-cta-call"><Phone className="w-4 h-4" />{PHONE}</a>
            </div>
          </div>
          <Parallax src={IMG.awardCeremony} alt="" amount={30} className="min-h-[220px]" />
        </div>
      </Container>
    </section>
  );
}

export default function Home() {
  return (<><HeroSlideshow /><NewsBand /><Story /><Colleges /><Chairperson /><CampusLife /><Placements /><CTA /></>);
}
