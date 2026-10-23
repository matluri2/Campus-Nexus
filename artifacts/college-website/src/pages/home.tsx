import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ShieldCheck, Bus, Building2, Cpu, Trees, BookOpen, CalendarDays } from "lucide-react";
import { asset, NEWS, Reveal, Eyebrow, SectionHead, CTA, Pill } from "@/components/site";

const WINGS = [
  { href: "/pharmacy", img: "img/pharmacy.jpg", year: "2004", name: "College of Pharmacy", full: "A.M. Reddy Memorial College of Pharmacy", progs: ["B.Pharm", "Pharm.D", "M.Pharm"], note: "PCI approved. Affiliated to Acharya Nagarjuna University." },
  { href: "/engineering", img: "img/engineering.jpg", year: "2008", name: "College of Engineering", full: "A.M. Reddy Memorial College of Engineering and Technology", progs: ["9 B.Tech branches", "M.Tech"], note: "Autonomous. AICTE approved. Permanently affiliated to JNTUK." },
  { href: "/polytechnic", img: "img/workshop.jpg", year: "Diploma", name: "Polytechnic", full: "Diploma in Engineering", progs: ["Civil", "EEE", "Mech", "ECE", "CSE", "Cloud"], note: "Hands-on technician training, offered under the engineering college." },
];

const HIGHLIGHTS = [
  { icon: ShieldCheck, t: "Recognised", d: "NAAC, NBA, UGC, ISO 9001:2015 and MSME recognitions for the engineering college." },
  { icon: Cpu, t: "368 AC systems", d: "Six computer labs for CSE plus an incubation centre." },
  { icon: Building2, t: "Separate hostels", d: "Dedicated hostels for boys and girls with round-the-clock security." },
  { icon: Bus, t: "Bus fleet", d: "College buses connecting Narasaraopet and surrounding villages." },
  { icon: Trees, t: "10.94 acres", d: "Green campus amid lush fields, 3 km from town." },
  { icon: BookOpen, t: "Outcome based", d: "Pharmacy curriculum built on Outcome Based Education." },
];

const RECRUITERS = ["Carro Health", "Divis", "Thinksysq"];

export default function Home() {
  return (
    <>
      <section className="relative min-h-[88dvh] flex items-end overflow-hidden bg-[hsl(350_50%_10%)] text-white">
        <motion.img initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: "easeOut" }} src={asset("img/campus.jpg")} alt="A.M. Reddy campus at Petlurivaripalem" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(350_55%_9%)] via-[hsl(350_55%_10%/0.55)] to-[hsl(350_55%_10%/0.15)]" />
        <div className="relative max-w-7xl mx-auto w-full px-6 pb-14 md:pb-20 pt-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="flex flex-wrap gap-2 mb-6"><Pill>Pharmacy since 2004</Pill><Pill>Engineering since 2008</Pill><Pill>Autonomous</Pill></div>
            <h1 className="font-display text-[2.7rem] leading-[1] sm:text-6xl md:text-[5.5rem] max-w-5xl">
              Where Palnadu's <em className="text-accent not-italic italic">pharmacists, engineers</em> and technicians begin.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl">Three academic wings. One green campus at Petlurivaripalem, Narasaraopet.</p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link href="/admissions#enquire" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-foreground font-bold px-8 py-4" data-testid="link-hero-enquire">Admission enquiry <ArrowRight className="w-4 h-4" /></Link>
              <a href="#wings" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 px-8 py-4 font-semibold hover:bg-white/10" data-testid="link-hero-programs">Explore programs</a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[["3", "Academic wings"], ["7 + 2", "UG and PG engineering programs"], ["5", "Polytechnic courses"], ["10.94", "Acres of campus"]].map(([n, l]) => (
            <div key={l}><div className="font-display text-4xl text-accent">{n}</div><div className="text-sm opacity-80 mt-1">{l}</div></div>
          ))}
        </div>
      </section>

      <section id="wings" className="max-w-7xl mx-auto px-6 pt-24 scroll-mt-28">
        <SectionHead eyebrow="Our institutions" title={<>Choose your path.<br />Three wings, one family.</>} />
        <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          {WINGS.map((w, i) => (
            <Reveal key={w.href} delay={i * 0.08} className={i === 0 ? "lg:row-span-2" : ""}>
              <Link href={w.href} className="group relative block h-full min-h-[320px] lg:min-h-0 rounded-[1.75rem] overflow-hidden text-white" data-testid={`card-wing-${w.href.slice(1)}`}>
                <img src={asset(w.img)} alt={w.full} className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(350_55%_9%/0.95)] via-[hsl(350_55%_9%/0.4)] to-transparent" />
                <div className={`relative h-full flex flex-col justify-end p-7 ${i === 0 ? "lg:min-h-[620px]" : "lg:min-h-[300px]"}`}>
                  <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">Est. {w.year}</span>
                  <h3 className="font-display text-3xl md:text-4xl mt-2">{w.name}</h3>
                  <p className="text-white/75 text-sm mt-2 max-w-md">{w.note}</p>
                  <div className="flex flex-wrap gap-2 mt-4">{w.progs.map(p => <Pill key={p}>{p}</Pill>)}</div>
                  <span className="absolute top-6 right-6 w-11 h-11 rounded-full bg-accent text-accent-foreground flex items-center justify-center group-hover:rotate-45 transition-transform"><ArrowUpRight className="w-5 h-5" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pt-28 grid md:grid-cols-[1fr_1.4fr] gap-12">
        <div>
          <SectionHead eyebrow="Why AMR" title="Built for the families who trust us." sub="A residential-ready campus close to home, with the facilities a serious education needs." />
        </div>
        <div className="grid sm:grid-cols-2 gap-px bg-border rounded-3xl overflow-hidden border">
          {HIGHLIGHTS.map((h, i) => (
            <Reveal key={h.t} delay={i * 0.05} className="bg-card p-7">
              <h.icon className="w-6 h-6 text-primary" />
              <div className="font-display text-xl mt-4">{h.t}</div>
              <p className="text-sm text-muted-foreground mt-1.5">{h.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <SectionHead eyebrow="News and events" title="Happening on campus" />
          <Link href="/campus-life" className="mb-10 font-semibold text-primary inline-flex items-center gap-1" data-testid="link-news-all">Campus life <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {NEWS.slice(0, 6).map((n, i) => (
            <Reveal key={n.title} delay={i * 0.05}>
              <article className={`h-full rounded-3xl p-6 border ${i === 0 ? "bg-accent/15 border-accent/40" : "bg-card"}`} data-testid={`card-news-${i}`}>
                <div className="flex justify-between text-xs"><span className="font-bold uppercase tracking-widest text-primary">{n.tag}</span><span className="flex items-center gap-1 text-muted-foreground"><CalendarDays className="w-3.5 h-3.5" />{n.date}</span></div>
                <h3 className="font-display text-xl mt-5 leading-snug">{n.title}</h3>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pt-28">
        <Reveal className="rounded-[2rem] bg-secondary p-8 md:p-12 grid md:grid-cols-[1fr_2fr] gap-8 items-center">
          <div><Eyebrow>Recruiters</Eyebrow><h3 className="font-display text-3xl mt-3">Where our students have been placed</h3></div>
          <div className="grid sm:grid-cols-3 gap-4">
            {RECRUITERS.map(r => <div key={r} className="rounded-2xl bg-card border py-8 text-center font-display text-2xl text-primary" data-testid={`text-recruiter-${r}`}>{r}</div>)}
          </div>
        </Reveal>
      </section>

      <section className="max-w-7xl mx-auto px-6 pt-28">
        <SectionHead eyebrow="Leadership" title="The people who lead AMR" />
        <div className="grid sm:grid-cols-3 gap-5">
          {[["AS", "Smt. Dr. Atluri Santhi", "Chairperson, Secretary and Correspondent"], ["CM", "Dr. Ch. Mallikharjun", "Principal, College of Engineering. M.Tech., Ph.D."], ["KK", "Dr. K. Krishna Reddy", "Principal, Polytechnic. M.Tech., Ph.D."]].map(([ini, n, r], i) => (
            <Reveal key={n} delay={i * 0.07} className="rounded-3xl border bg-card p-7 flex gap-5 items-center">
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-primary text-accent font-display text-2xl flex items-center justify-center">{ini}</div>
              <div><div className="font-display text-xl">{n}</div><div className="text-sm text-muted-foreground mt-1">{r}</div></div>
            </Reveal>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
