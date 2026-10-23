import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ShieldAlert, FileCheck2, GraduationCap, Megaphone, Bell } from "lucide-react";
import { Container, Reveal, SectionTitle, Initials } from "@/components/layout";
import { asset, INSTITUTIONS, NEWS, LEADERS, UGC_GUIDELINE, ANTI_RAGGING_HELPLINE } from "@/data/site";

function Hero() {
  return (
    <section className="relative bg-[hsl(var(--teal-deep))] text-white overflow-hidden">
      <img src={asset("img/hero.jpg")} alt="A.M. Reddy Educational Institutions campus at Petlurivaripalem" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--teal-deep)/0.95)] via-[hsl(var(--teal-deep)/0.8)] to-[hsl(var(--teal-deep)/0.15)]" />
      <Container className="relative py-20 md:py-28 lg:py-32">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="max-w-2xl">
          <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[hsl(14_70%_78%)]">Narasaraopet, Palnadu District / Since 2004</div>
          <h1 className="font-display text-4xl md:text-[3.4rem] leading-[1.08] mt-4" data-testid="text-hero-title">Professional education in pharmacy, engineering and technology.</h1>
          <p className="mt-6 text-lg text-white/80 leading-relaxed">A.M. Reddy Educational Institutions comprise the College of Pharmacy, the autonomous College of Engineering and Technology, and the Polytechnic, on a single campus at Petlurivaripalem.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/admissions" className="inline-flex items-center gap-2 h-12 px-6 rounded-sm bg-[hsl(var(--accent))] text-white font-semibold hover:brightness-110" data-testid="link-hero-admissions">Admissions 2026 <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/about" className="inline-flex items-center h-12 px-6 rounded-sm border border-white/40 font-semibold hover:bg-white/10" data-testid="link-hero-about">About the Institutions</Link>
          </div>
        </motion.div>
      </Container>
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
    <Container className="relative -mt-10 z-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 bg-card border rounded-md shadow-[0_24px_50px_-30px_hsl(var(--teal)/0.45)] divide-x divide-y lg:divide-y-0">
        {QUICK.map((q) => (
          <Link key={q.t} href={q.h} className="group flex items-start gap-3 p-5 md:p-6 hover:bg-secondary transition-colors" data-testid={`link-quick-${q.h.replace(/\W+/g, "-")}`}>
            <q.icon className="w-6 h-6 text-[hsl(var(--accent))] shrink-0" strokeWidth={1.6} />
            <span><span className="block font-semibold text-[15px] group-hover:text-[hsl(var(--primary))]">{q.t}</span><span className="block text-[13px] text-muted-foreground mt-0.5">{q.d}</span></span>
          </Link>
        ))}
      </div>
    </Container>
  );
}

function Welcome() {
  return (
    <Container className="mt-20 grid lg:grid-cols-[1.35fr_1fr] gap-12">
      <Reveal>
        <SectionTitle eyebrow="Welcome" title="An institution rooted in Palnadu, preparing professionals for the nation" />
        <div className="prose-inst space-y-4 max-w-2xl">
          <p>Sponsored by the Atluri Mastan Reddy Educational Society (Reg. No. 450/2003), A.M. Reddy Educational Institutions began with the College of Pharmacy in 2004 and established the College of Engineering and Technology in 2008. Diploma programmes followed in 2013.</p>
          <p>The campus, set across 10.94 acres approximately 3 km from Narasaraopet, offers separate hostels for men and women, a college bus network, modern laboratories and an incubation centre.</p>
        </div>
        <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 border-y">
          {[["2004", "College of Pharmacy established"], ["2008", "College of Engineering established"], ["9", "B.Tech branches"], ["10.94", "Acres of campus"]].map(([n, l], i) => (
            <div key={l} className={`py-5 ${i ? "md:border-l md:pl-5" : ""} ${i % 2 ? "border-l pl-5 md:pl-5" : ""}`}>
              <dt className="sr-only">{l}</dt>
              <dd className="font-display text-3xl text-[hsl(var(--primary))]" data-testid={`text-stat-${i}`}>{n}</dd>
              <dd className="text-[13px] text-muted-foreground mt-1">{l}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="bg-card border rounded-md">
          <div className="flex items-center justify-between px-5 py-4 border-b bg-secondary/60">
            <h2 className="font-semibold flex items-center gap-2 text-[hsl(var(--primary))]"><Bell className="w-4 h-4" />Notices and Announcements</h2>
            <Link href="/notices" className="text-[13px] font-semibold text-[hsl(var(--accent))] hover:underline" data-testid="link-news-all">View all</Link>
          </div>
          <ul className="divide-y">
            {NEWS.slice(0, 6).map((n, i) => (
              <li key={n.title} data-testid={`card-news-${i}`}>
                <Link href="/notices#news" className="flex gap-4 px-5 py-3.5 hover:bg-secondary/50">
                  <span className="w-24 shrink-0 text-[12px] font-mono text-muted-foreground pt-0.5">{n.date}</span>
                  <span className="text-[14px] leading-snug">{n.title}<span className="block text-[11px] uppercase tracking-wider text-[hsl(var(--accent))] mt-1">{n.tag}</span></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Container>
  );
}

function Institutions() {
  return (
    <section className="mt-24 bg-secondary/60 border-y py-20">
      <Container>
        <SectionTitle eyebrow="Constituent Institutions" title="Three institutions, one academic community" sub="Each institution is independently approved and affiliated, sharing campus facilities, student services and governance." />
        <div className="space-y-5">
          {INSTITUTIONS.map((ins, i) => (
            <Reveal key={ins.key} delay={i * 0.06}>
              <Link href={ins.href} className="group grid md:grid-cols-[320px_1fr_auto] bg-card border rounded-md overflow-hidden hover:border-[hsl(var(--primary)/0.4)] transition-colors" data-testid={`card-institution-${ins.key}`}>
                <div className="relative h-48 md:h-auto overflow-hidden"><img src={asset(ins.img)} alt={ins.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" /></div>
                <div className="p-6 md:p-8">
                  <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[hsl(var(--accent))]">{ins.short} / Est. {ins.est}</div>
                  <h3 className="font-display text-xl md:text-2xl mt-2 text-[hsl(var(--primary))]">{ins.name}</h3>
                  <p className="text-[14px] text-muted-foreground mt-2 max-w-2xl">{ins.affiliation}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">{ins.groups.flatMap((g) => g.items).slice(0, 6).map((p) => <span key={p.name} className="text-[12px] px-2 py-1 rounded-sm bg-muted">{p.name.replace("Computer Science and Engineering", "CSE")}</span>)}</div>
                </div>
                <div className="hidden md:flex items-center pr-8"><span className="w-11 h-11 rounded-full border grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors"><ArrowRight className="w-4 h-4" /></span></div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Leadership() {
  return (
    <Container className="mt-24">
      <SectionTitle eyebrow="Leadership" title="Institutional leadership" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border rounded-md overflow-hidden">
        {LEADERS.map((l, i) => (
          <div key={l.name} className="bg-card p-6" data-testid={`card-leader-${i}`}>
            <Initials name={l.name} />
            <div className="font-display text-lg mt-4">{l.name}</div>
            <div className="text-[13px] text-muted-foreground mt-1">{l.role}{l.quals ? `, ${l.quals}` : ""}</div>
            <div className="text-[12px] text-[hsl(var(--accent))] mt-1">{l.inst}</div>
          </div>
        ))}
      </div>
      <Link href="/administration" className="inline-flex items-center gap-1 mt-5 text-[14px] font-semibold text-[hsl(var(--primary))] hover:underline" data-testid="link-home-administration">Administration and governing bodies <ArrowRight className="w-4 h-4" /></Link>
    </Container>
  );
}

function Placements() {
  return (
    <Container className="mt-24 grid lg:grid-cols-[1fr_1.4fr] gap-10 items-center">
      <div>
        <SectionTitle eyebrow="Training and Placement" title="Recent campus recruitment" sub="The placement cell conducts training and campus drives across pharmacy and engineering." />
        <Link href="/student-life#placements" className="inline-flex items-center gap-1 text-[14px] font-semibold text-[hsl(var(--primary))] hover:underline" data-testid="link-home-placements">Placement cell <ArrowRight className="w-4 h-4" /></Link>
      </div>
      <div className="grid sm:grid-cols-3 border rounded-md divide-y sm:divide-y-0 sm:divide-x bg-card">
        {[["Thinksysq, Bangalore", "23 students selected", "Jan 2025"], ["Carro Health", "Pharmacy pool drive", "15 Apr 2025"], ["Divis", "Pharmacy pool campus drive", "Mar 2025"]].map(([r, d, t]) => (
          <div key={r} className="p-6" data-testid={`text-recruiter-${r.split(",")[0]}`}>
            <div className="font-display text-xl text-[hsl(var(--primary))]">{r}</div>
            <div className="text-[14px] mt-2">{d}</div>
            <div className="text-[12px] font-mono text-muted-foreground mt-1">{t}</div>
          </div>
        ))}
      </div>
    </Container>
  );
}

function DisclosureBand() {
  return (
    <Container className="mt-24">
      <div className="rounded-md bg-[hsl(var(--teal))] text-white p-8 md:p-12 grid md:grid-cols-[1fr_auto] gap-6 items-center">
        <div>
          <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[hsl(14_70%_78%)]">Transparency</div>
          <h2 className="font-display text-2xl md:text-3xl mt-2">Public Self-Disclosure</h2>
          <p className="text-white/75 mt-3 max-w-2xl text-[15px]">Information on governance, academics, admissions, student support and statutory committees, organised as per the {UGC_GUIDELINE}.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/disclosure" className="inline-flex items-center gap-2 h-12 px-6 rounded-sm bg-white text-[hsl(var(--primary))] font-semibold" data-testid="link-home-disclosure">View disclosure <ArrowRight className="w-4 h-4" /></Link>
          <Link href="/admissions#enquire" className="inline-flex items-center h-12 px-6 rounded-sm border border-white/40 font-semibold hover:bg-white/10" data-testid="link-cta-enquire">Admission enquiry</Link>
        </div>
      </div>
    </Container>
  );
}

export default function Home() {
  return (<><Hero /><QuickLinks /><Welcome /><Institutions /><Leadership /><Placements /><DisclosureBand /></>);
}
