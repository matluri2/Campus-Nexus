import { Link } from "wouter";
import { CheckCircle2, Mail, ArrowRight } from "lucide-react";
import { Container, PageHeader, Reveal, SectionTitle, ToBePublished, Initials } from "@/components/layout";
import { asset, INSTITUTIONS, type Institution } from "@/data/site";

const ENG_MISSION = ["Provide innovative and immersive educational experiences.", "Advance research and development through modern laboratories.", "Nurture entrepreneurial spirit, creativity and innovation.", "Promote environmental sustainability and social responsibility through ethical and emotional education."];

function InstitutionPage({ ins }: { ins: Institution }) {
  return (
    <>
      <PageHeader img={ins.img} eyebrow={`${ins.short} / Est. ${ins.est}`} title={ins.name} sub={ins.affiliation + "."} crumbs={[["Institutions"], [ins.short]]}>
        <div className="flex flex-wrap gap-2">{ins.approvals.map((a) => <span key={a} className="text-[12px] px-2.5 py-1 rounded-sm bg-white/10 border border-white/20">{a}</span>)}</div>
      </PageHeader>
      <Container className="mt-16 grid lg:grid-cols-[1fr_340px] gap-12">
        <div>
          <SectionTitle eyebrow="Overview" title="About the institution" />
          <p className="prose-inst"><span className="block leading-relaxed text-foreground/85">{ins.summary}</span></p>

          <div id="programmes" className="scroll-mt-36 mt-14">
            <SectionTitle eyebrow="Academics" title="Programmes and sanctioned intake" sub="Intake figures are shown where verified. Contact the admissions office for current seat availability." />
            {ins.groups.map((g) => (
              <Reveal key={g.title} className="mb-8">
                <h3 className="font-semibold text-[hsl(var(--primary))] mb-3">{g.title}</h3>
                <div className="border rounded-md overflow-x-auto bg-card">
                  <table className="w-full text-[14px]">
                    <thead className="bg-secondary/70 text-left text-[12px] uppercase tracking-wider text-muted-foreground">
                      <tr><th className="px-4 py-3 w-12">S.No.</th><th className="px-4 py-3">Programme</th><th className="px-4 py-3">Duration</th><th className="px-4 py-3">Intake</th></tr>
                    </thead>
                    <tbody className="divide-y">
                      {g.items.map((p, i) => (
                        <tr key={p.name} data-testid={`card-program-${ins.key}-${i}`}>
                          <td className="px-4 py-3.5 text-muted-foreground">{i + 1}</td>
                          <td className="px-4 py-3.5"><span className="font-medium">{p.name}</span>{p.note && <span className="block text-[13px] text-muted-foreground mt-0.5">{p.note}</span>}</td>
                          <td className="px-4 py-3.5 whitespace-nowrap">{p.dur ?? <span className="text-muted-foreground">As per regulations</span>}</td>
                          <td className="px-4 py-3.5">{p.intake ?? <ToBePublished />}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            ))}
          </div>

          {ins.key === "engineering" && (
            <div className="mt-14">
              <SectionTitle eyebrow="Vision and Mission" title="Institutional vision" />
              <blockquote className="border-l-2 border-[hsl(var(--accent))] pl-6 font-display text-xl md:text-2xl leading-snug text-[hsl(var(--primary))]">To cultivate engineers into global leaders equipped with unwavering psychological resilience, profound emotional intelligence, and unwavering ethical integrity.</blockquote>
              <ol className="mt-8 grid sm:grid-cols-2 gap-px bg-border border rounded-md overflow-hidden">
                {ENG_MISSION.map((m, i) => <li key={m} className="bg-card p-5 flex gap-3"><span className="font-mono text-[13px] text-[hsl(var(--accent))]">M{i + 1}</span><span className="text-[14px]">{m}</span></li>)}
              </ol>
            </div>
          )}
          {ins.key === "pharmacy" && (
            <div className="mt-14">
              <SectionTitle eyebrow="Highlights" title="Academic profile" />
              <ul className="space-y-3">
                {["Private self-financed college", "Outcome Based Education framework", "Academic MoUs with institutions abroad", "Campus placements: Carro Health pool drive (15 April 2025); Divis pool campus drive (March 2025)"].map((f) => <li key={f} className="flex gap-3 text-[15px]"><CheckCircle2 className="w-5 h-5 text-[hsl(var(--primary))] shrink-0 mt-0.5" />{f}</li>)}
              </ul>
            </div>
          )}
          {ins.key === "polytechnic" && (
            <div className="mt-14 grid md:grid-cols-2 gap-6 items-center">
              <img src={asset("img/workshop.jpg")} alt="Students in the engineering workshop" className="rounded-md w-full aspect-[4/3] object-cover" />
              <p className="text-[15px] leading-relaxed text-foreground/85">Diploma students train in the workshops and laboratories of the College of Engineering and Technology, gaining hands-on competence for technician roles in industry and a pathway to lateral entry into B.Tech.</p>
            </div>
          )}
        </div>

        <aside className="space-y-5 lg:sticky lg:top-28 self-start">
          <div className="border rounded-md bg-card p-5">
            <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Head of Institution</div>
            <div className="flex items-center gap-3 mt-4">
              {ins.principal === "To be published" ? <><Initials name="P" /><div><div className="font-semibold">Principal</div><ToBePublished /></div></> : <><Initials name={ins.principal.split(",")[0]} /><div><div className="font-semibold" data-testid={`text-principal-${ins.key}`}>{ins.principal.split(",")[0]}</div><div className="text-[13px] text-muted-foreground">Principal{ins.principal.includes(",") ? `, ${ins.principal.split(",").slice(1).join(",").trim()}` : ""}</div></div></>}
            </div>
            {ins.email && <a href={`mailto:${ins.email}`} className="mt-4 flex items-center gap-2 text-[13px] text-[hsl(var(--primary))] break-all hover:underline" data-testid={`link-email-${ins.key}`}><Mail className="w-4 h-4 shrink-0" />{ins.email}</a>}
          </div>
          <div className="border rounded-md bg-card p-5">
            <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Approvals and Affiliation</div>
            <ul className="mt-3 space-y-2 text-[14px]">{ins.approvals.map((a) => <li key={a} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))] mt-0.5 shrink-0" />{a}</li>)}</ul>
            <Link href="/about#approvals" className="mt-4 inline-block text-[13px] font-semibold text-[hsl(var(--accent))] hover:underline" data-testid={`link-approvals-${ins.key}`}>Approval details</Link>
          </div>
          <Link href="/admissions#enquire" className="flex items-center justify-between rounded-md bg-primary text-primary-foreground p-5 font-semibold hover:bg-[hsl(var(--teal-deep))]" data-testid="link-hero-enquire">Admission enquiry <ArrowRight className="w-4 h-4" /></Link>
        </aside>
      </Container>
    </>
  );
}

export const Pharmacy = () => <InstitutionPage ins={INSTITUTIONS[0]} />;
export const Engineering = () => <InstitutionPage ins={INSTITUTIONS[1]} />;
export const Polytechnic = () => <InstitutionPage ins={INSTITUTIONS[2]} />;
