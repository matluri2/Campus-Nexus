import { Link } from "wouter";
import { Phone, Mail, MapPin, Shield, Building2, Bus, Droplets, Mic2, Trophy, Utensils, Zap, Wind, Briefcase, ArrowUpRight } from "lucide-react";
import { PageHero, SectionHead, Reveal, CTA, asset, NEWS, PHONE, PHONE_TEL, MAP, WHATSAPP } from "@/components/site";

export function CampusLife() {
  const F = [
    [Wind, "Well ventilated classrooms"], [Briefcase, "Campus placement training"], [Building2, "Separate hostels for boys and girls"], [Bus, "Fleet of college buses"],
    [Droplets, "Mineral water plant"], [Mic2, "Spacious auditorium"], [Trophy, "Outdoor grounds"], [Utensils, "Canteen"], [Shield, "Campus security"], [Zap, "Uninterrupted power backup"],
  ] as const;
  return (
    <>
      <PageHero img="img/life.jpg" eyebrow="Campus life" title="Life between the fields and the labs." sub="Hackathons, festivals, health camps and late-night code marathons on a green campus near Narasaraopet." />
      <section className="max-w-7xl mx-auto px-6 pt-20">
        <SectionHead eyebrow="Facilities" title="Everything a day on campus needs." />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {F.map(([I, t], i) => (
            <Reveal key={t} delay={(i % 5) * 0.04} className="rounded-2xl border bg-card p-5">
              <I className="w-6 h-6 text-primary" /><div className="mt-4 font-semibold text-sm">{t}</div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 pt-20 grid md:grid-cols-2 gap-5">
        <Reveal><img src={asset("img/life.jpg")} alt="Students celebrating on campus" className="rounded-[2rem] w-full aspect-[4/3] object-cover" /></Reveal>
        <Reveal delay={0.1}><img src={asset("img/campus.jpg")} alt="Campus grounds" className="rounded-[2rem] w-full aspect-[4/3] object-cover" /></Reveal>
      </section>
      <section className="max-w-7xl mx-auto px-6 pt-20">
        <SectionHead eyebrow="Recent moments" title="Events and activities" />
        <div className="divide-y border-y">
          {NEWS.map((n, i) => (
            <Reveal key={n.title} className="py-5 grid sm:grid-cols-[180px_1fr_auto] gap-2 sm:gap-6 items-baseline">
              <span className="text-sm font-semibold text-primary" data-testid={`text-event-date-${i}`}>{n.date}</span>
              <span className="font-display text-xl">{n.title}</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">{n.tag}</span>
            </Reveal>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}

export function About() {
  return (
    <>
      <PageHero img="img/campus.jpg" eyebrow="About the group" title="A society built to educate Palnadu." sub="The Atluri Mastan Reddy Educational Society (Reg. No 450/2003) sponsors A.M. Reddy Educational Institutions at Petlurivaripalem, about 3 km from Narasaraopet." />
      <section className="max-w-7xl mx-auto px-6 pt-20">
        <SectionHead eyebrow="Our journey" title="Two decades on one campus." />
        <div className="grid md:grid-cols-4 gap-4">
          {[["2003", "Atluri Mastan Reddy Educational Society registered (Reg. No 450/2003)."], ["2004", "A.M. Reddy Memorial College of Pharmacy established."], ["2008", "College of Engineering and Technology established, Chairman Sri A. Srinivasa Reddy."], ["2013", "Diploma in Civil Engineering begins under the polytechnic wing."]].map(([y, t], i) => (
            <Reveal key={y} delay={i * 0.06} className="rounded-3xl border bg-card p-6">
              <div className="font-display text-4xl text-primary">{y}</div><p className="text-sm text-muted-foreground mt-3">{t}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 pt-20 grid md:grid-cols-2 gap-5">
        <Reveal className="rounded-[2rem] bg-primary text-primary-foreground p-8 md:p-10">
          <div className="text-accent text-xs font-bold uppercase tracking-[0.22em]">Vision</div>
          <p className="font-display text-2xl mt-4 leading-snug">To cultivate engineers into global leaders equipped with unwavering psychological resilience, profound emotional intelligence, and unwavering ethical integrity.</p>
        </Reveal>
        <Reveal delay={0.08} className="rounded-[2rem] bg-secondary p-8 md:p-10">
          <div className="text-primary text-xs font-bold uppercase tracking-[0.22em]">Mission</div>
          <ol className="mt-4 space-y-3">
            {["Innovative and immersive educational experiences.", "Advance research and development through modern laboratories.", "Nurture entrepreneurial spirit, creativity and innovation.", "Environmental sustainability and social responsibility through ethical and emotional education."].map((m, i) => (
              <li key={m} className="flex gap-3"><span className="font-bold text-primary">M{i + 1}</span><span>{m}</span></li>
            ))}
          </ol>
        </Reveal>
      </section>
      <section className="max-w-7xl mx-auto px-6 pt-20">
        <SectionHead eyebrow="Leadership" title="Guiding the institutions" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[["AS", "Smt. Dr. Atluri Santhi", "Chairperson, Secretary and Correspondent"], ["SR", "Sri A. Srinivasa Reddy", "Founding Chairman, College of Engineering (2008)"], ["CM", "Dr. Ch. Mallikharjun", "Principal, College of Engineering"], ["KK", "Dr. K. Krishna Reddy", "Principal, Polytechnic"]].map(([ini, n, r]) => (
            <Reveal key={n} className="rounded-3xl border bg-card p-6">
              <div className="w-14 h-14 rounded-2xl bg-primary text-accent font-display text-xl flex items-center justify-center">{ini}</div>
              <div className="font-display text-xl mt-5">{n}</div><div className="text-sm text-muted-foreground mt-1">{r}</div>
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
      <PageHero img="img/campus.jpg" eyebrow="Contact" title="Come see the campus." sub="Petlurivaripalem, Narasaraopet, Palnadu Dt., Andhra Pradesh. About 3 km from Narasaraopet town." />
      <section className="max-w-7xl mx-auto px-6 pt-20 grid lg:grid-cols-[1fr_1.1fr] gap-6">
        <div className="grid sm:grid-cols-2 gap-4">
          {C.map(({ I, l, v, h }, i) => (
            <Reveal key={l} delay={i * 0.05}>
              <a href={h} className="block h-full rounded-3xl border bg-card p-6 hover:border-primary/50" data-testid={`link-contact-${i}`}>
                <I className="w-5 h-5 text-primary" /><div className="text-xs uppercase tracking-widest text-muted-foreground mt-4">{l}</div>
                <div className="font-semibold mt-1 break-all">{v}</div>
              </a>
            </Reveal>
          ))}
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="sm:col-span-2 rounded-3xl bg-[hsl(145_55%_36%)] text-white p-6 font-semibold flex justify-between items-center" data-testid="link-contact-whatsapp">Message us on WhatsApp <ArrowUpRight className="w-5 h-5" /></a>
        </div>
        <Reveal delay={0.1}>
          <a href={MAP} target="_blank" rel="noreferrer" className="group relative block h-full min-h-[340px] rounded-[2rem] overflow-hidden bg-primary text-primary-foreground" data-testid="link-contact-map">
            <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 400 300" preserveAspectRatio="none">
              {Array.from({ length: 12 }).map((_, i) => <path key={i} d={`M0 ${25 * i} Q 200 ${25 * i + 40} 400 ${25 * i - 10}`} stroke="currentColor" fill="none" strokeWidth="0.8" />)}
              <path d="M40 260 L 220 150 L 380 40" stroke="hsl(40 92% 52%)" strokeWidth="3" fill="none" strokeDasharray="6 6" />
            </svg>
            <div className="relative h-full p-8 flex flex-col justify-between">
              <div className="text-xs uppercase tracking-widest text-accent font-bold">Narasaraopet to campus, about 3 km</div>
              <div>
                <MapPin className="w-10 h-10 text-accent" />
                <div className="font-display text-3xl mt-3">Petlurivaripalem, Narasaraopet</div>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground font-bold px-5 py-2.5 text-sm">Open in Google Maps <ArrowUpRight className="w-4 h-4" /></div>
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
    <section className="max-w-3xl mx-auto px-6 py-32 text-center">
      <div className="font-display text-[8rem] leading-none text-primary">404</div>
      <h1 className="font-display text-3xl mt-4">This page has wandered off campus.</h1>
      <p className="text-muted-foreground mt-3">The link may be old or mistyped. These will get you back on track.</p>
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        <Link href="/" className="rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold" data-testid="link-404-home">Back to home</Link>
        <Link href="/admissions" className="rounded-full bg-accent text-accent-foreground px-6 py-3 font-semibold" data-testid="link-404-admissions">Admissions</Link>
        <Link href="/contact" className="rounded-full border px-6 py-3 font-semibold" data-testid="link-404-contact">Contact</Link>
      </div>
    </section>
  );
}
