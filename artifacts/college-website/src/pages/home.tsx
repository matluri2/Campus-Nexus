import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Bus, Building2, Cpu, Trees, BookOpen } from "lucide-react";
import { asset, NEWS, WINGS, EASE, Reveal, Eyebrow, SectionHead, CTA, Chip, PrimaryBtn } from "@/components/site";

const WORDS = [
  { w: "formulated", c: "var(--pharm)" },
  { w: "engineered", c: "var(--eng)" },
  { w: "hand-built", c: "var(--poly)" },
];

const HIGHLIGHTS = [
  { icon: ShieldCheck, t: "Recognised", d: "NAAC, NBA, UGC, ISO 9001:2015 and MSME recognitions for the engineering college.", span: "md:col-span-2" },
  { icon: Cpu, t: "368 AC systems", d: "Six computer labs for CSE plus an incubation centre.", span: "" },
  { icon: Trees, t: "10.94 acres", d: "Green campus amid lush fields, 3 km from town.", span: "md:row-span-2" },
  { icon: Building2, t: "Separate hostels", d: "Dedicated hostels for boys and girls with round-the-clock security.", span: "" },
  { icon: Bus, t: "Bus fleet", d: "College buses connecting Narasaraopet and surrounding villages.", span: "" },
  { icon: BookOpen, t: "Outcome based", d: "Pharmacy curriculum built on Outcome Based Education.", span: "md:col-span-3" },
];

const PROGRAM_STRIP = ["B.Pharm", "Pharm.D", "M.Pharm", "CSE", "AI and ML", "Data Science", "Cyber Security", "Robotics and AI", "ECE", "EEE", "Civil", "Agricultural", "M.Tech", "Diploma", "Cloud Computing and Big Data"];

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % WORDS.length), 2400); return () => clearInterval(t); }, []);
  const [hover, setHover] = useState(1);
  return (
    <section className="relative pt-28 md:pt-36 overflow-hidden">
      <div className="absolute inset-0 gridlines [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-wrap items-center gap-2">
          <Eyebrow>Petlurivaripalem, Narasaraopet</Eyebrow>
          <span className="hidden sm:inline font-mono text-[11px] text-muted-foreground">/ Pharmacy since 2004 / Engineering since 2008 / Autonomous</span>
        </motion.div>
        <h1 className="font-display mt-6 text-[3.1rem] leading-[0.9] sm:text-7xl md:text-[7.4rem] lg:text-[8.6rem] tracking-[-0.06em]">
          <span className="block overflow-hidden"><motion.span className="block" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: EASE }}>Futures,</motion.span></span>
          <span className="block overflow-hidden h-[1.12em] relative">
            <AnimatePresence mode="popLayout">
              <motion.span key={WORDS[i].w} className="block italic font-medium" style={{ color: `hsl(${WORDS[i].c})` }}
                initial={{ y: "100%", rotateX: -50, opacity: 0 }} animate={{ y: 0, rotateX: 0, opacity: 1 }} exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 0.8, ease: EASE }}>
                {WORDS[i].w}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="block overflow-hidden"><motion.span className="block" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.12, ease: EASE }}>in Palnadu.</motion.span></span>
        </h1>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8, ease: EASE }} className="mt-10 grid md:grid-cols-[1fr_auto] gap-8 items-end">
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">A.M. Reddy Educational Institutions: three academic wings for pharmacists, engineers and technicians, on one green campus near Narasaraopet.</p>
          <div className="flex flex-wrap gap-3">
            <PrimaryBtn href="/admissions#enquire" testid="link-hero-enquire">Admission enquiry</PrimaryBtn>
            <a href="#wings" className="inline-flex items-center rounded-full border border-[hsl(var(--ink)/0.2)] px-6 py-4 font-semibold hover:bg-[hsl(var(--ink)/0.05)]" data-testid="link-hero-programs">Explore the wings</a>
          </div>
        </motion.div>

        <div className="mt-14 flex flex-col md:flex-row gap-3 md:h-[480px]">
          {WINGS.map((w, idx) => (
            <motion.div key={w.key} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + idx * 0.1, duration: 1, ease: EASE }}
              onMouseEnter={() => setHover(idx)} className={`relative transition-[flex-grow] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${hover === idx ? "md:grow-[2.4]" : "md:grow"} md:basis-0 h-[260px] md:h-auto`}>
              <Link href={w.href} className="group absolute inset-0 rounded-[2rem] overflow-hidden text-white" data-testid={`card-hero-wing-${w.key}`}>
                <img src={asset(w.img)} alt={w.full} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 30%, hsl(${w.color} / 0.95))` }} />
                <div className="absolute top-5 left-5 font-mono text-[11px] uppercase tracking-[0.2em] bg-black/25 backdrop-blur px-3 py-1.5 rounded-full">0{idx + 1} / {w.year === "Diploma" ? "Diploma" : `Est. ${w.year}`}</div>
                <span className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white text-[hsl(var(--ink))] grid place-items-center transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight className="w-5 h-5" /></span>
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <div className="font-display text-4xl md:text-5xl leading-none">{w.short}</div>
                  <div className={`text-sm text-white/85 mt-3 max-w-sm transition-opacity duration-500 ${hover === idx ? "md:opacity-100" : "md:opacity-0"}`}>{w.note}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const S = [["3", "Academic wings"], ["7 + 2", "UG and PG engineering programs"], ["5", "Polytechnic courses"], ["10.94", "Acres of campus"]];
  return (
    <section className="max-w-7xl mx-auto px-6 mt-20 grid grid-cols-2 md:grid-cols-4 border-t border-[hsl(var(--ink)/0.12)]">
      {S.map(([n, l], i) => (
        <Reveal key={l} delay={i * 0.08} className={`pt-6 pb-2 pr-4 ${i ? "md:border-l md:pl-6" : ""} border-[hsl(var(--ink)/0.12)]`}>
          <div className="font-display text-5xl md:text-7xl" data-testid={`text-stat-${i}`}>{n}</div>
          <div className="text-sm text-muted-foreground mt-2">{l}</div>
        </Reveal>
      ))}
    </section>
  );
}

function Strip() {
  const items = [...PROGRAM_STRIP, ...PROGRAM_STRIP];
  return (
    <div className="mt-24 -rotate-2 bg-[hsl(var(--ink))] text-[hsl(60_25%_96%)] py-5 overflow-hidden" aria-hidden>
      <div className="marquee flex w-max gap-10 whitespace-nowrap font-display text-3xl md:text-5xl">
        {items.map((p, i) => <span key={i} className="flex items-center gap-10">{p}<span className="w-3 h-3 rounded-full" style={{ background: `hsl(${WINGS[i % 3].color})` }} /></span>)}
      </div>
    </div>
  );
}

function WingExplorer() {
  const [a, setA] = useState(0);
  const w = WINGS[a];
  return (
    <section id="wings" className="scroll-mt-24 mt-28 px-3 sm:px-5">
      <div className="max-w-7xl mx-auto rounded-[2.5rem] bg-[hsl(var(--ink))] text-[hsl(60_25%_96%)] gridlines-dark p-6 md:p-14 overflow-hidden">
        <SectionHead light eyebrow="Choose your path" title={<>Three wings.<br /><span className="text-white/40">One campus.</span></>} color={w.color} />
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-14">
          <div role="tablist" className="flex flex-col">
            {WINGS.map((x, i) => (
              <button key={x.key} role="tab" aria-selected={a === i} onClick={() => setA(i)} onMouseEnter={() => setA(i)} className="group relative text-left border-t border-white/10 py-6 flex items-start gap-5" data-testid={`tab-wing-${x.key}`}>
                {a === i && <motion.span layoutId="wing-bar" className="absolute -top-px left-0 h-[2px] w-full" style={{ background: `hsl(${x.color})` }} />}
                <span className="font-mono text-xs text-white/40 mt-2">0{i + 1}</span>
                <span className="flex-1">
                  <span className={`block font-display text-3xl md:text-5xl transition-colors ${a === i ? "" : "text-white/35 group-hover:text-white/70"}`}>{x.verb}<span style={{ color: `hsl(${x.color})` }}>.</span></span>
                  <span className="block text-sm text-white/50 mt-1">{x.name}</span>
                </span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={w.key} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.5, ease: EASE }} className="flex flex-col">
              <div className="relative rounded-[1.75rem] overflow-hidden aspect-[16/11]">
                <motion.img initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease: EASE }} src={asset(w.img)} alt={w.full} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 mix-blend-multiply" style={{ background: `hsl(${w.color} / 0.35)` }} />
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">{w.progs.map((p) => <span key={p} className="rounded-full bg-black/40 backdrop-blur px-3 py-1 text-xs font-medium">{p}</span>)}</div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row justify-between gap-5 sm:items-end">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: `hsl(${w.color})` }}>{w.year === "Diploma" ? "Diploma programs" : `Established ${w.year}`}</div>
                  <div className="font-display text-2xl mt-2 max-w-md leading-tight">{w.full}</div>
                  <p className="text-sm text-white/55 mt-2 max-w-md">{w.note}</p>
                </div>
                <Link href={w.href} className="shrink-0 inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold text-[hsl(var(--ink))]" style={{ background: `hsl(${w.color})` }} data-testid={`link-explore-${w.key}`}>Enter {w.short} <ArrowUpRight className="w-4 h-4" /></Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Bento() {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-28">
      <SectionHead eyebrow="Why AMR" title={<>Built for the families<br />who trust us.</>} sub="A residential-ready campus close to home, with the facilities a serious education needs." />
      <div className="grid md:grid-cols-4 md:auto-rows-[200px] gap-3">
        {HIGHLIGHTS.map((h, i) => {
          const big = i === 2;
          return (
            <Reveal key={h.t} delay={i * 0.05} className={`${h.span} ${big ? "min-h-[300px]" : ""}`}>
              <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative h-full rounded-[1.75rem] p-7 flex flex-col justify-between overflow-hidden ${big ? "text-white" : i === 0 ? "bg-[hsl(var(--lime))]" : "bg-card border"}`} data-testid={`card-highlight-${i}`}>
                {big && <><img src={asset("img/campus.jpg")} alt="" className="absolute inset-0 w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--pharm)/0.95)] to-transparent" /></>}
                <h.icon className="relative w-6 h-6" strokeWidth={1.6} />
                <div className="relative">
                  <div className={`font-display ${big || i === 0 ? "text-4xl md:text-5xl" : "text-2xl"}`}>{h.t}</div>
                  <p className={`text-sm mt-2 max-w-md ${big ? "text-white/85" : i === 0 ? "opacity-75" : "text-muted-foreground"}`}>{h.d}</p>
                </div>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function News() {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-28">
      <div className="flex flex-col md:flex-row md:items-end justify-between">
        <SectionHead eyebrow="News and events" title="On campus, lately." />
        <Link href="/campus-life" className="mb-12 font-semibold inline-flex items-center gap-1 underline underline-offset-4 decoration-[hsl(var(--lime))] decoration-2" data-testid="link-news-all">All campus moments <ArrowUpRight className="w-4 h-4" /></Link>
      </div>
      <div className="border-t border-[hsl(var(--ink)/0.15)]">
        {NEWS.slice(0, 6).map((n, i) => (
          <Reveal key={n.title} delay={i * 0.04}>
            <article className="group relative grid grid-cols-[1fr_auto] md:grid-cols-[160px_1fr_140px] gap-x-6 gap-y-1 items-baseline py-6 border-b border-[hsl(var(--ink)/0.15)] overflow-hidden" data-testid={`card-news-${i}`}>
              <span className="absolute inset-0 bg-[hsl(var(--lime))] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] -z-0" aria-hidden />
              <span className="relative font-mono text-xs text-muted-foreground group-hover:text-[hsl(var(--ink))] order-2 md:order-1 col-span-2 md:col-span-1 md:pl-2">{n.date}</span>
              <h3 className="relative font-display text-2xl md:text-3xl leading-tight order-1 md:order-2 transition-transform duration-500 group-hover:translate-x-2">{n.title}</h3>
              <span className="relative justify-self-end order-1 md:order-3 md:pr-2"><Chip>{n.tag}</Chip></span>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Recruiters() {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-28 grid md:grid-cols-[1fr_2fr] gap-10 items-center">
      <SectionHead eyebrow="Recruiters" title="Where our students have been placed." />
      <div className="grid sm:grid-cols-3 gap-3">
        {["Carro Health", "Divis", "Thinksysq"].map((r, i) => (
          <Reveal key={r} delay={i * 0.08}>
            <div className="aspect-[4/3] rounded-[1.75rem] border bg-card grid place-items-center font-display text-3xl hover:bg-[hsl(var(--ink))] hover:text-[hsl(var(--lime))] transition-colors duration-500" data-testid={`text-recruiter-${r}`}>{r}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Leadership() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const L = [["AS", "Smt. Dr. Atluri Santhi", "Chairperson, Secretary and Correspondent", "var(--lime)"], ["CM", "Dr. Ch. Mallikharjun", "Principal, College of Engineering. M.Tech., Ph.D.", "var(--eng)"], ["KK", "Dr. K. Krishna Reddy", "Principal, Polytechnic. M.Tech., Ph.D.", "var(--poly)"]];
  return (
    <section ref={ref} className="mt-28 overflow-hidden">
      <motion.div style={{ x }} className="font-display text-[18vw] leading-none whitespace-nowrap text-[hsl(var(--ink)/0.07)] select-none" aria-hidden>Leadership Leadership</motion.div>
      <div className="max-w-7xl mx-auto px-6 -mt-[6vw] grid md:grid-cols-3 gap-3">
        {L.map(([ini, n, r, c], i) => (
          <Reveal key={n} delay={i * 0.08}>
            <div className="rounded-[1.75rem] bg-card border p-7 h-full" data-testid={`card-leader-${i}`}>
              <div className="w-16 h-16 rounded-full grid place-items-center font-display text-xl text-[hsl(var(--ink))]" style={{ background: `hsl(${c})` }}>{ini}</div>
              <div className="font-display text-2xl mt-8">{n}</div>
              <div className="text-sm text-muted-foreground mt-1">{r}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Strip />
      <WingExplorer />
      <Bento />
      <News />
      <Recruiters />
      <Leadership />
      <CTA />
    </>
  );
}
