import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { PageHero, SectionHead, Reveal, CTA, Chip, PrimaryBtn, asset, EASE } from "@/components/site";

type Prog = { name: string; dur?: string; intake?: string; note?: string };

function ProgramList({ items, color }: { items: Prog[]; color: string }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="border-t border-[hsl(var(--ink)/0.15)]">
      {items.map((p, i) => {
        const has = !!(p.note || p.dur || p.intake);
        const isOpen = open === i;
        return (
          <Reveal key={p.name} delay={(i % 4) * 0.04}>
            <div className="border-b border-[hsl(var(--ink)/0.15)]" data-testid={`card-program-${i}`}>
              <button onClick={() => setOpen(isOpen ? null : i)} className="group w-full grid grid-cols-[40px_1fr_auto] md:grid-cols-[70px_1fr_auto_auto] gap-4 items-center py-5 md:py-6 text-left" aria-expanded={isOpen} data-testid={`button-program-${i}`}>
                <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-xl md:text-3xl leading-tight transition-transform duration-500 group-hover:translate-x-2">{p.name}</span>
                <span className="hidden md:flex gap-2">
                  {p.dur && <Chip>{p.dur}</Chip>}
                  {p.intake && <span className="rounded-full px-3 py-1 text-xs font-semibold text-[hsl(var(--ink))]" style={{ background: `hsl(${color} / 0.25)` }}>Intake {p.intake}</span>}
                </span>
                <motion.span animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? `hsl(${color})` : "hsl(0 0% 0% / 0)" }} className="w-10 h-10 rounded-full border border-[hsl(var(--ink)/0.2)] grid place-items-center"><Plus className="w-4 h-4" /></motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden">
                    <div className="pb-6 pl-[56px] md:pl-[86px] flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
                      <span className="md:hidden flex gap-2">{p.dur && <Chip>{p.dur}</Chip>}{p.intake && <Chip>Intake {p.intake}</Chip>}</span>
                      {p.note ? <span>{p.note}</span> : !has ? <span>Ask the admissions office for current intake and eligibility details.</span> : null}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

function Badges({ items }: { items: string[] }) {
  return <div className="flex flex-wrap gap-2">{items.map((x) => <Chip key={x}>{x}</Chip>)}</div>;
}

function Enq() {
  return <PrimaryBtn href="/admissions#enquire" testid="link-hero-enquire">Enquire for admission</PrimaryBtn>;
}

export function Pharmacy() {
  const c = "var(--pharm)";
  return (
    <>
      <PageHero color={c} logo="brand/pharmacy-logo.png" img="img/pharmacy.jpg" eyebrow="College of Pharmacy / Est. 2004" title="A.M. Reddy Memorial College of Pharmacy" sub="Permanently affiliated to Acharya Nagarjuna University and approved by the Pharmacy Council of India, New Delhi."><Enq /></PageHero>
      <section className="max-w-7xl mx-auto px-6 mt-10"><Badges items={["PCI approved", "NAAC", "UGC 2(f) and 12(B)", "ISO 9001:2015"]} /></section>
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <SectionHead color={c} eyebrow="Programs" title="From first pharmacology class to clinical practice." />
        <ProgramList color={c} items={[
          { name: "B.Pharm", dur: "4 years", intake: "100" },
          { name: "Pharm.D", dur: "6 years", intake: "30" },
          { name: "M.Pharm, Pharmaceutics", dur: "2 years", intake: "15" },
          { name: "M.Pharm, Pharmacology", dur: "2 years", intake: "15" },
          { name: "M.Pharm, Pharmaceutical Analysis", dur: "2 years", intake: "15" },
          { name: "M.Pharm, Regulatory Affairs", dur: "2 years", intake: "15" },
        ]} />
      </section>
      <section className="max-w-7xl mx-auto px-6 mt-28 grid md:grid-cols-2 gap-10 items-center">
        <Reveal><img src={asset("img/pharmacy.jpg")} alt="Pharmacy laboratory" className="rounded-[2rem] w-full aspect-[4/5] object-cover" /></Reveal>
        <div>
          <SectionHead color={c} eyebrow="The college" title="Outcome based, globally connected." />
          <ul className="space-y-0 border-t border-[hsl(var(--ink)/0.15)]">
            {["Private self-financed college", "Outcome Based Education focus", "MoUs with institutions abroad", "Placements: Carro Health pool drive, 15 April 2025", "Divis pool campus drive, March 2025", "Email: info@amreddypharmacy.co.in"].map((f, i) => (
              <Reveal key={f} delay={i * 0.04}><li className="flex gap-4 py-4 border-b border-[hsl(var(--ink)/0.15)]"><span className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: `hsl(${c})` }} />{f}</li></Reveal>
            ))}
          </ul>
        </div>
      </section>
      <CTA />
    </>
  );
}

export function Engineering() {
  const c = "var(--eng)";
  const M = ["Innovative and immersive educational experiences", "Advance R&D through modern laboratories", "Nurture entrepreneurial spirit, creativity and innovation", "Environmental sustainability and social responsibility through ethical and emotional education"];
  return (
    <>
      <PageHero color={c} img="img/engineering.jpg" eyebrow="Est. 2008 / Autonomous" title="A.M. Reddy Memorial College of Engineering and Technology" sub="Approved by AICTE, New Delhi, and permanently affiliated to JNTUK Kakinada. Principal: Dr. Ch. Mallikharjun, M.Tech., Ph.D."><Enq /></PageHero>
      <section className="max-w-7xl mx-auto px-6 mt-10"><Badges items={["NAAC", "NBA", "UGC", "ISO 9001:2015", "MSME"]} /></section>
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <SectionHead color={c} eyebrow="B.Tech" title="Nine undergraduate branches." sub="Supported by the Department of Basic Sciences and Humanities." />
        <ProgramList color={c} items={[
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
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <SectionHead color={c} eyebrow="M.Tech" title="Postgraduate in Civil Engineering." />
        <ProgramList color={c} items={[{ name: "M.Tech, Structural Design", dur: "2 years" }, { name: "M.Tech, Transportation Engineering", dur: "2 years" }]} />
      </section>
      <section className="mt-28 px-3 sm:px-5">
        <div className="max-w-7xl mx-auto rounded-[2.5rem] text-white p-8 md:p-16 gridlines-dark" style={{ background: `hsl(${c})` }}>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">Vision</div>
          <Reveal><p className="font-display text-3xl md:text-5xl mt-5 leading-[1.05] max-w-5xl">"To cultivate engineers into global leaders equipped with unwavering psychological resilience, profound emotional intelligence, and unwavering ethical integrity."</p></Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-12">
            {M.map((m, i) => (
              <Reveal key={m} delay={i * 0.06}><div className="h-full rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-5"><div className="font-mono text-xs text-white/70">M{i + 1}</div><p className="mt-3">{m}</p></div></Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

export function Polytechnic() {
  const c = "var(--poly)";
  return (
    <>
      <PageHero color={c} img="img/workshop.jpg" eyebrow="Diploma in Engineering" title="Skills you can hold in your hands." sub="Diploma programs offered under A.M. Reddy Memorial College of Engineering and Technology. Diploma Principal: Dr. K. Krishna Reddy, M.Tech., Ph.D."><Enq /></PageHero>
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <SectionHead color={c} eyebrow="Branches" title="Six diploma branches." sub="A practical route into industry, or a strong foundation for further engineering study." />
        <ProgramList color={c} items={[
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
