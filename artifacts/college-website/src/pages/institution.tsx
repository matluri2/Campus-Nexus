import type React from "react";
import { Link } from "wouter";
import { CheckCircle2, Mail, ArrowRight } from "lucide-react";
import { Container, PageHeader, Reveal, SectionTitle, ToBePublished, Initials, SectionNav, PersonCard, PersonPhoto } from "@/components/layout";
import { hodsOf, principalOf } from "@/data/people";
import { asset, INSTITUTIONS, type Institution } from "@/data/site";
import { IMG } from "@/data/images";

const ENG_MISSION = ["Provide innovative and immersive educational experiences.", "Advance research and development through modern laboratories.", "Nurture entrepreneurial spirit, creativity and innovation.", "Promote environmental sustainability and social responsibility through ethical and emotional education."];

const WING: Record<Institution["key"], { accent: string; hero: string; img2: string; label: string }> = {
  pharmacy: { accent: "200 72% 31%", hero: IMG.pharmacyEvent, img2: IMG.libraryPharmacy, label: "Pharmaceutical sciences" },
  engineering: { accent: "162 48% 24%", hero: IMG.campusAerial, img2: IMG.labPresentation, label: "Engineering and technology" },
  polytechnic: { accent: "222 38% 34%", hero: IMG.labSurvey, img2: IMG.labSession, label: "Diploma in engineering" },
};

const FACILITIES: Record<Institution["key"], string[]> = {
  pharmacy: ["Dedicated pharmacy library", "Laboratories for pharmaceutics, pharmacology and pharmaceutical analysis", "Academic MoUs with institutions abroad", "Separate hostels for boys and girls", "Fleet of college buses", "Placement training and pool campus drives"],
  engineering: ["Six CSE laboratories with 368 air-conditioned systems", "Incubation centre (Department of CSE)", "Central library", "Separate hostels for boys and girls", "Fleet of college buses", "Auditorium and outdoor sports grounds"],
  polytechnic: ["Workshops and laboratories of the College of Engineering and Technology", "Central library", "Pathway to lateral entry into B.Tech", "Separate hostels for boys and girls", "Fleet of college buses", "Outdoor sports grounds"],
};

function InstitutionPage({ ins }: { ins: Institution }) {
  const w = WING[ins.key];
  const pr = principalOf(ins.key);
  const hods = hodsOf(ins.key);
  const nav: [string, string][] = [["overview", "Overview"], ["programmes", "Programmes"], ["facilities", "Facilities"], ...(hods.length ? [["people", "Heads of Department"] as [string, string]] : []), ...(ins.key === "engineering" ? [["vision", "Vision and Mission"] as [string, string]] : ins.key === "pharmacy" ? [["highlights", "Highlights"] as [string, string]] : [["training", "Training"] as [string, string]])];
  const total = ins.groups.reduce((n, g) => n + g.items.length, 0);
  return (
    <div style={{ ["--wing" as string]: w.accent } as React.CSSProperties}>
      <PageHeader accent={w.accent} img={w.hero} eyebrow={`${ins.short} / Est. ${ins.est}`} title={ins.name} sub={ins.affiliation + "."} crumbs={[["Institutions"], [ins.short]]}>
        <div className="flex flex-wrap gap-2">{ins.approvals.map((a) => <span key={a} className="text-[12px] px-2.5 py-1 rounded-lg bg-card border text-[hsl(var(--primary))] font-semibold">{a}</span>)}</div>
      </PageHeader>
      <SectionNav items={nav} />
      <Container className="mt-14 grid lg:grid-cols-[1fr_320px] gap-10">
        <div className="min-w-0">
          <div id="overview" className="scroll-mt-36 grid md:grid-cols-[1.1fr_1fr] gap-10 items-center">
            <div>
              <SectionTitle eyebrow={w.label} title="About the institution" />
              <p className="prose-inst"><span className="block leading-relaxed text-foreground/85 text-[16px]">{ins.summary}</span></p>
              <dl className="mt-8 grid grid-cols-2 border-t">
                <div className="pt-5"><dt className="text-[12px] text-muted-foreground">Established</dt><dd className="num-display text-[36px] mt-2" style={{ color: "hsl(var(--wing))" }}>{ins.est}</dd></div>
                <div className="pt-5 border-l pl-5"><dt className="text-[12px] text-muted-foreground">Programmes listed</dt><dd className="num-display text-[36px] mt-2 text-[hsl(var(--primary))]">{total}</dd></div>
              </dl>
            </div>
            <div className="group relative aspect-[4/3] overflow-hidden rounded-lg">
              <img src={asset(w.img2)} alt={ins.name} className="img-zoom absolute inset-0 w-full h-full object-cover" />
              <span className="absolute left-0 bottom-0 w-1/3 h-[3px]" style={{ background: "hsl(var(--wing))" }} />
            </div>
          </div>

          <div id="programmes" className="scroll-mt-36 mt-16">
            <SectionTitle eyebrow="Academics" title="Programmes and sanctioned intake" sub="Intake figures are shown where verified. Contact the admissions office for current seat availability." />
            {ins.groups.map((g) => (
              <Reveal key={g.title} className="mb-8">
                <h3 className="flex items-center gap-3 font-display text-[18px] text-[hsl(var(--primary))] mb-3"><span className="w-6 h-[2px]" style={{ background: "hsl(var(--wing))" }} />{g.title}</h3>
                <div className="border rounded-lg overflow-x-auto bg-card">
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

          <div id="facilities" className="scroll-mt-36 mt-16">
            <SectionTitle eyebrow="Facilities" title="Facilities and infrastructure" />
            <ul className="grid sm:grid-cols-2 gap-x-10">
              {FACILITIES[ins.key].map((f) => <li key={f} className="flex gap-3 py-3.5 border-b text-[15px]"><CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "hsl(var(--wing))" }} />{f}</li>)}
            </ul>
          </div>

          {hods.length > 0 && (
            <div id="people" className="mt-16 scroll-mt-36">
              <SectionTitle eyebrow="Academic Leadership" title="Dean and Heads of Department" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{hods.map((p, i) => <PersonCard key={p.name} person={p} testid={`card-hod-${ins.key}-${i}`} />)}</div>
            </div>
          )}
          {ins.key === "pharmacy" && (
            <div className="mt-16"><SectionTitle eyebrow="Faculty" title="Heads of Department" /><div className="card-soft px-5 py-4 flex justify-between items-center"><span className="font-semibold">Heads of Department, College of Pharmacy</span><ToBePublished /></div></div>
          )}
          {ins.key === "engineering" && (
            <div id="vision" className="mt-20 scroll-mt-36">
              <SectionTitle eyebrow="Vision and Mission" title="Institutional vision" />
              <blockquote className="border-l-2 border-[hsl(var(--wing))] pl-8 font-display italic text-[18px] md:text-[22px] leading-snug text-[hsl(var(--primary))]">To cultivate engineers into global leaders equipped with unwavering psychological resilience, profound emotional intelligence, and unwavering ethical integrity.</blockquote>
              <ol className="mt-8 grid sm:grid-cols-2 gap-px bg-border border rounded-lg overflow-hidden">
                {ENG_MISSION.map((m, i) => <li key={m} className="bg-card p-5 flex gap-3"><span className="font-mono text-[13px] text-[hsl(var(--accent))]">M{i + 1}</span><span className="text-[14px]">{m}</span></li>)}
              </ol>
            </div>
          )}
          {ins.key === "pharmacy" && (
            <div id="highlights" className="mt-20 scroll-mt-36">
              <SectionTitle eyebrow="Highlights" title="Academic profile" />
              <ul className="space-y-3">
                {["Private self-financed college", "Outcome Based Education framework", "Academic MoUs with institutions abroad", "Campus placements: Carro Health pool drive (15 April 2025); Divis pool campus drive (March 2025)"].map((f) => <li key={f} className="flex gap-3 text-[15px]"><CheckCircle2 className="w-5 h-5 text-[hsl(var(--primary))] shrink-0 mt-0.5" />{f}</li>)}
              </ul>
            </div>
          )}
          {ins.key === "polytechnic" && (
            <div id="training" className="mt-20 scroll-mt-36 grid md:grid-cols-2 gap-8 items-center">
              <img src={asset(IMG.labSurvey)} alt="Students in a laboratory" className="rounded-lg w-full aspect-[4/3] object-cover" />
              <p className="text-[15px] leading-relaxed text-foreground/85">Diploma students train in the workshops and laboratories of the College of Engineering and Technology, gaining hands-on competence for technician roles in industry and a pathway to lateral entry into B.Tech.</p>
            </div>
          )}
        </div>

        <aside className="space-y-5 lg:sticky lg:top-[150px] self-start">
          <div className="border rounded-lg bg-card p-6 border-t-[3px]" style={{ borderTopColor: "hsl(var(--wing))" }}>
            <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Head of Institution</div>
            {pr ? (
              <div className="mt-4">
                <PersonPhoto person={pr} className="w-full aspect-[4/3] rounded-lg" />
                <div className="mt-3 font-semibold" data-testid={`text-principal-${ins.key}`}>{pr.name === "To be published" ? <ToBePublished /> : pr.name}</div>
                <div className="text-[13px] text-muted-foreground">Principal{pr.qualification ? `, ${pr.qualification}` : ""}</div>
                {pr.message && <p className="mt-3 text-[13.5px] italic text-foreground/80 border-l-2 border-[hsl(var(--saffron))] pl-3">{pr.message}</p>}
              </div>
            ) : (
              <div className="flex items-center gap-3 mt-4"><Initials name={ins.principal.split(",")[0]} /><div><div className="font-semibold" data-testid={`text-principal-${ins.key}`}>{ins.principal.split(",")[0]}</div><div className="text-[13px] text-muted-foreground">Principal{ins.principal.includes(",") ? `, ${ins.principal.split(",").slice(1).join(",").trim()}` : ""}</div></div></div>
            )}
            {ins.email && <a href={`mailto:${ins.email}`} className="mt-4 flex items-center gap-2 text-[13px] text-[hsl(var(--primary))] break-all hover:underline" data-testid={`link-email-${ins.key}`}><Mail className="w-4 h-4 shrink-0" />{ins.email}</a>}
          </div>
          <div className="border rounded-lg bg-card p-5">
            <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Approvals and Affiliation</div>
            <ul className="mt-3 space-y-2 text-[14px]">{ins.approvals.map((a) => <li key={a} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))] mt-0.5 shrink-0" />{a}</li>)}</ul>
            <Link href="/about#approvals" className="mt-4 inline-block text-[13px] font-semibold text-[hsl(var(--accent))] hover:underline" data-testid={`link-approvals-${ins.key}`}>Approval details</Link>
          </div>
          <Link href="/admissions#enquire" className="flex items-center justify-between rounded-lg bg-primary text-primary-foreground p-5 font-semibold hover:bg-[hsl(var(--teal-deep))]" data-testid="link-hero-enquire">Admission enquiry <ArrowRight className="w-4 h-4" /></Link>
        </aside>
      </Container>
    </div>
  );
}

export const Pharmacy = () => <InstitutionPage ins={INSTITUTIONS[0]} />;
export const Engineering = () => <InstitutionPage ins={INSTITUTIONS[1]} />;
export const Polytechnic = () => <InstitutionPage ins={INSTITUTIONS[2]} />;
