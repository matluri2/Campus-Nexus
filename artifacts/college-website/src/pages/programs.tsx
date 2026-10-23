import { Link } from "wouter";
import { Check, ArrowRight } from "lucide-react";
import { PageHero, SectionHead, Reveal, CTA, Pill, asset } from "@/components/site";

type Prog = { name: string; dur?: string; intake?: string; note?: string };

function ProgramGrid({ items }: { items: Prog[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((p, i) => (
        <Reveal key={p.name} delay={(i % 3) * 0.05}>
          <div className="group h-full rounded-3xl border bg-card p-6 hover:border-primary/50 transition-colors" data-testid={`card-program-${i}`}>
            <div className="text-xs font-bold text-primary tracking-widest">{String(i + 1).padStart(2, "0")}</div>
            <h3 className="font-display text-xl mt-3 leading-snug">{p.name}</h3>
            <div className="flex flex-wrap gap-2 mt-4 text-xs">
              {p.dur && <span className="rounded-full bg-secondary px-3 py-1 font-semibold">{p.dur}</span>}
              {p.intake && <span className="rounded-full bg-accent/20 px-3 py-1 font-semibold">Intake {p.intake}</span>}
            </div>
            {p.note && <p className="text-sm text-muted-foreground mt-3">{p.note}</p>}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function Facts({ items }: { items: string[] }) {
  return (
    <ul className="grid sm:grid-cols-2 gap-3">
      {items.map(f => <li key={f} className="flex gap-3 rounded-2xl bg-secondary p-4 text-sm"><Check className="w-5 h-5 text-primary shrink-0" />{f}</li>)}
    </ul>
  );
}

function EnquireBtn() {
  return <Link href="/admissions#enquire" className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground font-bold px-7 py-3.5" data-testid="link-hero-enquire">Enquire for admission <ArrowRight className="w-4 h-4" /></Link>;
}

export function Pharmacy() {
  return (
    <>
      <PageHero logo="brand/pharmacy-logo.png" img="img/pharmacy.jpg" eyebrow="Established 2004" title="A.M. Reddy Memorial College of Pharmacy" sub="Permanently affiliated to Acharya Nagarjuna University and approved by the Pharmacy Council of India, New Delhi.">
        <div className="flex flex-wrap gap-2 mt-6">{["PCI approved", "NAAC", "UGC 2(f) and 12(B)", "ISO 9001:2015"].map(x => <Pill key={x}>{x}</Pill>)}</div>
        <EnquireBtn />
      </PageHero>
      <section className="max-w-7xl mx-auto px-6 pt-20">
        <SectionHead eyebrow="Programs" title="From first pharmacology class to clinical practice." />
        <ProgramGrid items={[
          { name: "B.Pharm", dur: "4 years", intake: "100" },
          { name: "Pharm.D", dur: "6 years", intake: "30" },
          { name: "M.Pharm, Pharmaceutics", dur: "2 years", intake: "15" },
          { name: "M.Pharm, Pharmacology", dur: "2 years", intake: "15" },
          { name: "M.Pharm, Pharmaceutical Analysis", dur: "2 years", intake: "15" },
          { name: "M.Pharm, Regulatory Affairs", dur: "2 years", intake: "15" },
        ]} />
      </section>
      <section className="max-w-7xl mx-auto px-6 pt-20 grid md:grid-cols-2 gap-10 items-center">
        <Reveal><img src={asset("img/pharmacy.jpg")} alt="Pharmacy laboratory" className="rounded-[2rem] w-full aspect-[4/3] object-cover" /></Reveal>
        <div>
          <SectionHead eyebrow="The college" title="Outcome based, globally connected." />
          <Facts items={["Private self-financed college", "Outcome Based Education focus", "MoUs with institutions abroad", "Placements: Carro Health pool drive, 15 April 2025", "Divis pool campus drive, March 2025", "Email: info@amreddypharmacy.co.in"]} />
        </div>
      </section>
      <CTA />
    </>
  );
}

export function Engineering() {
  return (
    <>
      <PageHero img="img/engineering.jpg" eyebrow="Established 2008 / Autonomous" title="A.M. Reddy Memorial College of Engineering and Technology" sub="Approved by AICTE, New Delhi, and permanently affiliated to JNTUK Kakinada. Principal: Dr. Ch. Mallikharjun, M.Tech., Ph.D.">
        <div className="flex flex-wrap gap-2 mt-6">{["NAAC", "NBA", "UGC", "ISO 9001:2015", "MSME"].map(x => <Pill key={x}>{x}</Pill>)}</div>
        <EnquireBtn />
      </PageHero>
      <section className="max-w-7xl mx-auto px-6 pt-20">
        <SectionHead eyebrow="B.Tech" title="Nine undergraduate branches." sub="Supported by the Department of Basic Sciences and Humanities." />
        <ProgramGrid items={[
          { name: "Computer Science and Engineering", intake: "180", note: "Est. 2008. 6 labs, 368 AC systems, incubation centre." },
          { name: "CSE (Artificial Intelligence and Machine Learning)" },
          { name: "CSE (Data Science)" },
          { name: "CSE (Cyber Security)" },
          { name: "Robotics and Artificial Intelligence" },
          { name: "Electronics and Communication Engineering" },
          { name: "Electrical and Electronics Engineering", intake: "60", note: "Est. 2008." },
          { name: "Civil Engineering", intake: "60", note: "Started 2009." },
          { name: "Agricultural Engineering" },
        ]} />
      </section>
      <section className="max-w-7xl mx-auto px-6 pt-20">
        <SectionHead eyebrow="M.Tech" title="Postgraduate in Civil Engineering." />
        <ProgramGrid items={[{ name: "M.Tech, Structural Design", dur: "2 years" }, { name: "M.Tech, Transportation Engineering", dur: "2 years" }]} />
      </section>
      <section className="max-w-7xl mx-auto px-6 pt-20">
        <Reveal className="rounded-[2rem] bg-primary text-primary-foreground p-8 md:p-14">
          <div className="text-accent text-xs font-bold uppercase tracking-[0.22em]">Vision</div>
          <p className="font-display text-2xl md:text-4xl mt-4 leading-snug">"To cultivate engineers into global leaders equipped with unwavering psychological resilience, profound emotional intelligence, and unwavering ethical integrity."</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {["Innovative and immersive educational experiences", "Advance R&D through modern laboratories", "Nurture entrepreneurial spirit, creativity and innovation", "Environmental sustainability and social responsibility through ethical and emotional education"].map((m, i) => (
              <div key={m} className="rounded-2xl bg-white/10 p-5"><div className="text-accent font-bold">M{i + 1}</div><p className="text-sm mt-2 opacity-90">{m}</p></div>
            ))}
          </div>
        </Reveal>
      </section>
      <CTA />
    </>
  );
}

export function Polytechnic() {
  return (
    <>
      <PageHero img="img/workshop.jpg" eyebrow="Diploma in Engineering" title="Polytechnic: skills you can hold in your hands." sub="Diploma programs offered under A.M. Reddy Memorial College of Engineering and Technology. Diploma Principal: Dr. K. Krishna Reddy, M.Tech., Ph.D.">
        <EnquireBtn />
      </PageHero>
      <section className="max-w-7xl mx-auto px-6 pt-20">
        <SectionHead eyebrow="Branches" title="Six diploma branches." sub="A practical route into industry, or a strong foundation for further engineering study." />
        <ProgramGrid items={[
          { name: "Civil Engineering (DCE)", intake: "60", note: "Started 2013." },
          { name: "Electrical Engineering" },
          { name: "Mechanical Engineering" },
          { name: "Electronics and Communication Engineering" },
          { name: "Computer Science and Engineering", note: "Diploma in Computer Engineering since 2022-23." },
          { name: "Cloud Computing and Big Data" },
        ]} />
      </section>
      <CTA />
    </>
  );
}
