import { Link } from "wouter";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Shield, Building2, Bus, Droplets, Mic2, Trophy, Utensils, Zap, Wind, Briefcase, ArrowUpRight } from "lucide-react";
import { PageHero, SectionHead, Reveal, CTA, Chip, PrimaryBtn, SplitHead, asset, NEWS, PHONE, PHONE_TEL, MAP } from "@/components/site";

export function CampusLife() {
  const F = [
    [Wind, "Well ventilated classrooms"], [Briefcase, "Campus placement training"], [Building2, "Separate hostels for boys and girls"], [Bus, "Fleet of college buses"],
    [Droplets, "Mineral water plant"], [Mic2, "Spacious auditorium"], [Trophy, "Outdoor grounds"], [Utensils, "Canteen"], [Shield, "Campus security"], [Zap, "Uninterrupted power backup"],
  ] as const;
  return (
    <>
      <PageHero color="var(--poly)" img="img/life.jpg" eyebrow="Campus life" title="Life between the fields and the labs." sub="Hackathons, festivals, health camps and late-night code marathons on a green campus near Narasaraopet." />
      <section className="max-w-7xl mx-auto px-6 mt-28">
        <SectionHead color="var(--poly)" eyebrow="Facilities" title="Everything a day on campus needs." />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {F.map(([I, t], i) => (
            <Reveal key={t} delay={(i % 5) * 0.05}>
              <motion.div whileHover={{ y: -6, rotate: i % 2 ? 1 : -1 }} className={`h-full aspect-square rounded-[1.5rem] p-5 flex flex-col justify-between ${i === 0 ? "bg-[hsl(var(--lime))]" : i === 6 ? "bg-[hsl(var(--ink))] text-white" : "bg-card border"}`} data-testid={`card-facility-${i}`}>
                <I className="w-6 h-6" strokeWidth={1.6} /><div className="font-display text-lg leading-tight">{t}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 mt-24 grid md:grid-cols-[1.4fr_1fr] gap-3">
        <Reveal><img src={asset("img/life.jpg")} alt="Students celebrating on campus" className="rounded-[2rem] w-full h-full aspect-[4/3] object-cover" /></Reveal>
        <Reveal delay={0.1}><img src={asset("img/campus.jpg")} alt="Campus grounds" className="rounded-[2rem] w-full h-full aspect-[4/3] md:aspect-auto object-cover" /></Reveal>
      </section>
      <section className="max-w-7xl mx-auto px-6 mt-28">
        <SectionHead color="var(--poly)" eyebrow="Recent moments" title="Events and activities." />
        <div className="relative pl-8 md:pl-0">
          <div className="absolute left-2 md:left-1/2 top-0 bottom-0 w-px bg-[hsl(var(--ink)/0.15)]" />
          {NEWS.map((n, i) => (
            <Reveal key={n.title} className={`relative md:w-1/2 pb-8 ${i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12 md:text-right"}`}>
              <span className={`absolute top-2 w-3 h-3 rounded-full bg-[hsl(var(--poly))] ring-4 ring-background -left-[30px] ${i % 2 ? "md:-left-1.5" : "md:left-auto md:-right-1.5"}`} />
              <div className="font-mono text-xs text-muted-foreground" data-testid={`text-event-date-${i}`}>{n.date}</div>
              <div className="font-display text-2xl mt-1 leading-tight">{n.title}</div>
              <div className="mt-2"><Chip>{n.tag}</Chip></div>
            </Reveal>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}

export function About() {
  const T = [["2003", "Atluri Mastan Reddy Educational Society registered (Reg. No 450/2003)."], ["2004", "A.M. Reddy Memorial College of Pharmacy established."], ["2008", "College of Engineering and Technology established, Chairman Sri A. Srinivasa Reddy."], ["2013", "Diploma in Civil Engineering begins under the polytechnic wing."]];
  const C = ["var(--lime)", "var(--pharm)", "var(--eng)", "var(--poly)"];
  return (
    <>
      <PageHero img="img/campus.jpg" eyebrow="About the group" title="A society built to educate Palnadu." sub="The Atluri Mastan Reddy Educational Society (Reg. No 450/2003) sponsors A.M. Reddy Educational Institutions at Petlurivaripalem, about 3 km from Narasaraopet." />
      <section className="max-w-7xl mx-auto px-6 mt-28">
        <SectionHead eyebrow="Our journey" title="Two decades on one campus." />
        <div className="grid md:grid-cols-4 border-t border-[hsl(var(--ink)/0.15)]">
          {T.map(([y, t], i) => (
            <Reveal key={y} delay={i * 0.08} className={`pt-6 pb-8 md:pr-6 ${i ? "md:pl-6 md:border-l border-[hsl(var(--ink)/0.15)]" : ""}`}>
              <div className="flex items-center gap-3"><span className="w-3 h-3 rounded-full" style={{ background: `hsl(${C[i]})` }} /><span className="font-mono text-xs text-muted-foreground">0{i + 1}</span></div>
              <div className="font-display text-6xl md:text-7xl mt-4" data-testid={`text-year-${y}`}>{y}</div>
              <p className="text-muted-foreground mt-3">{t}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 mt-24 grid md:grid-cols-2 gap-3">
        <Reveal className="rounded-[2rem] bg-[hsl(var(--ink))] text-white p-8 md:p-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--lime))]">Vision</div>
          <p className="font-display text-3xl md:text-4xl mt-5 leading-[1.08]">To cultivate engineers into global leaders equipped with unwavering psychological resilience, profound emotional intelligence, and unwavering ethical integrity.</p>
        </Reveal>
        <Reveal delay={0.08} className="rounded-[2rem] bg-card border p-8 md:p-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Mission</div>
          <ol className="mt-5">
            {["Innovative and immersive educational experiences.", "Advance research and development through modern laboratories.", "Nurture entrepreneurial spirit, creativity and innovation.", "Environmental sustainability and social responsibility through ethical and emotional education."].map((m, i) => (
              <li key={m} className="flex gap-4 py-3 border-b last:border-0 border-[hsl(var(--ink)/0.1)]"><span className="font-mono text-sm" style={{ color: `hsl(${C[i]})` }}>M{i + 1}</span><span>{m}</span></li>
            ))}
          </ol>
        </Reveal>
      </section>
      <section className="max-w-7xl mx-auto px-6 mt-28">
        <SectionHead eyebrow="Leadership" title="Guiding the institutions." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[["AS", "Smt. Dr. Atluri Santhi", "Chairperson, Secretary and Correspondent"], ["SR", "Sri A. Srinivasa Reddy", "Founding Chairman, College of Engineering (2008)"], ["CM", "Dr. Ch. Mallikharjun", "Principal, College of Engineering"], ["KK", "Dr. K. Krishna Reddy", "Principal, Polytechnic"]].map(([ini, n, r], i) => (
            <Reveal key={n} delay={i * 0.06}>
              <div className="group h-full rounded-[1.75rem] border bg-card p-6 hover:bg-[hsl(var(--ink))] hover:text-white transition-colors duration-500" data-testid={`card-leader-${i}`}>
                <div className="w-14 h-14 rounded-full grid place-items-center font-display text-lg text-[hsl(var(--ink))] transition-transform duration-500 group-hover:scale-110" style={{ background: `hsl(${C[i]})` }}>{ini}</div>
                <div className="font-display text-2xl mt-8">{n}</div><div className="text-sm opacity-60 mt-1">{r}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}

export function Contact() {
  const C = [
    { I: Phone, l: "Office phone", v: PHONE, h: PHONE_TEL },
    { I: Phone, l: "Women helpline", v: "+91 95502 54554", h: "tel:+919550254554" },
    { I: Mail, l: "Engineering principal", v: "principal.amreddyengineering@gmail.com", h: "mailto:principal.amreddyengineering@gmail.com" },
    { I: Mail, l: "College of Pharmacy", v: "info@amreddypharmacy.co.in", h: "mailto:info@amreddypharmacy.co.in" },
  ];
  return (
    <>
      <PageHero color="var(--eng)" img="img/campus.jpg" eyebrow="Contact" title="Come see the campus." sub="Petlurivaripalem, Narasaraopet, Palnadu Dt., Andhra Pradesh. About 3 km from Narasaraopet town." />
      <section className="max-w-7xl mx-auto px-6 mt-24 grid lg:grid-cols-[1fr_1.1fr] gap-3">
        <div className="border-t border-[hsl(var(--ink)/0.15)]">
          {C.map(({ I, l, v, h }, i) => (
            <Reveal key={l} delay={i * 0.05}>
              <a href={h} className="group flex items-center gap-5 py-6 border-b border-[hsl(var(--ink)/0.15)]" data-testid={`link-contact-${i}`}>
                <span className="w-12 h-12 shrink-0 rounded-full bg-card border grid place-items-center group-hover:bg-[hsl(var(--lime))] transition-colors"><I className="w-5 h-5" /></span>
                <span className="min-w-0 flex-1"><span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{l}</span><span className="block font-display text-xl md:text-2xl mt-1 break-all">{v}</span></span>
                <ArrowUpRight className="w-5 h-5 shrink-0 transition-transform group-hover:rotate-45" />
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <a href={MAP} target="_blank" rel="noreferrer" className="group relative block h-full min-h-[380px] rounded-[2rem] overflow-hidden bg-[hsl(var(--ink))] text-white gridlines-dark" data-testid="link-contact-map">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden>
              {Array.from({ length: 10 }).map((_, i) => <path key={i} d={`M0 ${30 * i + 10} Q 200 ${30 * i + 50} 400 ${30 * i}`} stroke="hsl(0 0% 100% / 0.08)" fill="none" />)}
              <motion.path d="M50 250 C 140 230, 160 140, 240 130 S 340 70, 350 50" stroke="hsl(74 92% 58%)" strokeWidth="3" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, ease: "easeInOut" }} />
              <circle cx="50" cy="250" r="5" fill="white" /><circle cx="350" cy="50" r="7" fill="hsl(74 92% 58%)" />
            </svg>
            <div className="relative h-full p-8 flex flex-col justify-between min-h-[380px]">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">Narasaraopet to campus, about 3 km</div>
              <div>
                <MapPin className="w-8 h-8 text-[hsl(var(--lime))]" />
                <div className="font-display text-4xl mt-3 leading-none">Petlurivaripalem,<br />Narasaraopet</div>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--lime))] text-[hsl(var(--ink))] font-semibold px-5 py-3 text-sm">Open in Google Maps <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" /></div>
              </div>
            </div>
          </a>
        </Reveal>
      </section>
      <CTA />
    </>
  );
}

export function NotFoundPage() {
  return (
    <section className="relative min-h-[80dvh] flex items-center pt-28 overflow-hidden">
      <div className="absolute inset-0 gridlines [mask-image:radial-gradient(ellipse,black_20%,transparent_70%)]" aria-hidden />
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.div initial={{ scale: 0.6, opacity: 0, rotate: -8 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 120, damping: 12 }} className="font-display text-[34vw] md:text-[16rem] leading-none tracking-[-0.08em]">4<span className="text-[hsl(var(--poly))]">0</span>4</motion.div>
        <h1 className="font-display text-3xl md:text-5xl mt-2"><SplitHead text="This page wandered off campus." delay={0.3} /></h1>
        <p className="text-muted-foreground mt-4">The link may be old or mistyped. These will get you back on track.</p>
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          <PrimaryBtn href="/" testid="link-404-home">Back to home</PrimaryBtn>
          <Link href="/admissions" className="rounded-full bg-[hsl(var(--lime))] px-6 py-4 font-semibold" data-testid="link-404-admissions">Admissions</Link>
          <Link href="/contact" className="rounded-full border border-[hsl(var(--ink)/0.2)] px-6 py-4 font-semibold" data-testid="link-404-contact">Contact</Link>
        </div>
      </div>
    </section>
  );
}
