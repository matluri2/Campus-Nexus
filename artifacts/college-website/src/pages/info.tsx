import { useEffect, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { X, ChevronLeft, ChevronRight, Phone, Mail, MapPin, ExternalLink, ShieldAlert, Building2, Bus, Droplets, Mic2, Trophy, Utensils, Zap, Wind, ShieldCheck, Cpu, BookOpen, FlaskConical, Lightbulb, Users, ArrowRight, FileSearch, Briefcase } from "lucide-react";
import { Container, PageHeader, Reveal, SectionTitle, ToBePublished, PersonCard } from "@/components/layout";
import { LEADERSHIP, HODS, ALUMNI } from "@/data/people";
import { PHOTOS, GALLERY_CATS, type GalleryCat } from "@/data/gallery";
import {
  asset, NEWS, OFFICERS, BODIES, COMMITTEES, INSTITUTIONS, PHONE, PHONE_TEL, MAP, ADDRESS, ADDRESS_ENG, PHARM_PHONES, SOCIETY, EMAIL_ENG, EMAIL_PHARM,
  WOMEN_HELPLINE, WOMEN_HELPLINE_TEL, ANTI_RAGGING_HELPLINE,
} from "@/data/site";

const Row = ({ label, children, testid }: { label: string; children: ReactNode; testid?: string }) => (
  <div className="grid sm:grid-cols-[260px_1fr] gap-1 sm:gap-6 px-5 py-4" data-testid={testid}><dt className="text-[13px] font-semibold text-muted-foreground">{label}</dt><dd className="text-[15px]">{children}</dd></div>
);

/* ---------------- About ---------------- */
export function About() {
  const T = [["2003", "Atluri Mastan Reddy Educational Society registered (Reg. No. 450/2003)."], ["2004", "A.M. Reddy Memorial College of Pharmacy established."], ["2008", "College of Engineering and Technology established under Chairman Sri A. Srinivasa Reddy."], ["2009", "B.Tech Civil Engineering commenced."], ["2013", "Diploma in Civil Engineering commenced under the Polytechnic."]];
  return (
    <>
      <PageHeader img="img/amr/eng-about-college.jpg" eyebrow="About Us" title="About the Institutions" sub="A.M. Reddy Educational Institutions, Petlurivaripalem, approximately 3 km from Narasaraopet, Palnadu District, Andhra Pradesh." crumbs={[["About Us"]]} />
      <Container className="mt-16 grid lg:grid-cols-[1.3fr_1fr] gap-12">
        <div>
          <SectionTitle id="overview" eyebrow="Overview" title="Who we are" />
          <div className="prose-inst space-y-4">
            <p>A.M. Reddy Educational Institutions are sponsored by the {SOCIETY}. The group comprises A.M. Reddy Memorial College of Pharmacy (2004), A.M. Reddy Memorial College of Engineering and Technology (2008), an autonomous institution, and the Polytechnic offering diploma programmes in engineering.</p>
            <p>The 10.94-acre campus is set amid farmland near Narasaraopet and provides separate hostels for men and women, a fleet of college buses, an auditorium, sports grounds and dedicated computing infrastructure.</p>
          </div>
        </div>
        <img src={asset("img/amr/eng-gallery-gallery1.jpg")} alt="Academic blocks and lawns of the campus" className="rounded-xl shadow-lg w-full aspect-[4/3] object-cover" />
      </Container>

      <Container className="mt-16">
        <SectionTitle id="leadership" eyebrow="Leadership" title="Management and principals" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{LEADERSHIP.map((p, i) => <PersonCard key={p.role + p.institution} person={p} testid={`card-about-leader-${i}`} />)}</div>
      </Container>

      <Container className="mt-20 grid md:grid-cols-2 gap-6">
        <div className="rounded-lg bg-[hsl(var(--teal))] text-white p-8">
          <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[hsl(14_70%_78%)]">Vision</div>
          <p className="font-display text-xl md:text-2xl mt-4 leading-snug">To cultivate engineers into global leaders equipped with unwavering psychological resilience, profound emotional intelligence, and unwavering ethical integrity.</p>
        </div>
        <div className="rounded-lg border bg-card p-8">
          <div className="eyebrow">Mission</div>
          <ol className="mt-4 divide-y">{["Innovative and immersive educational experiences.", "Advance research and development through modern laboratories.", "Nurture entrepreneurial spirit, creativity and innovation.", "Environmental sustainability and social responsibility through ethical and emotional education."].map((m, i) => <li key={m} className="flex gap-3 py-3 text-[15px]"><span className="font-mono text-[13px] text-[hsl(var(--accent))]">M{i + 1}</span>{m}</li>)}</ol>
        </div>
      </Container>

      <Container className="mt-20">
        <SectionTitle id="society" eyebrow="Sponsoring Body" title="Atluri Mastan Reddy Educational Society" />
        <dl className="border rounded-lg bg-card divide-y">
          <Row label="Name of the society">Atluri Mastan Reddy Educational Society</Row>
          <Row label="Registration number">450/2003</Row>
          <Row label="Chairperson, Secretary and Correspondent">Smt. Dr. Atluri Santhi</Row>
          <Row label="Registered address">{ADDRESS}</Row>
          <Row label="Memorandum of Association / Bye-laws"><ToBePublished /></Row>
        </dl>
      </Container>

      <Container className="mt-20">
        <SectionTitle id="approvals" eyebrow="Statutory Status" title="Approvals, recognition and accreditation" sub="Accreditation grades, validity periods and NIRF participation details will be published with supporting documents." />
        <div className="border rounded-lg bg-card overflow-x-auto">
          <table className="w-full text-[14px]">
            <thead className="bg-secondary/70 text-left text-[12px] uppercase tracking-wider text-muted-foreground"><tr><th className="px-5 py-3">Institution</th><th className="px-5 py-3">Approvals / Recognition</th><th className="px-5 py-3">Documents</th></tr></thead>
            <tbody className="divide-y">
              {INSTITUTIONS.map((i) => <tr key={i.key}><td className="px-5 py-4 font-medium">{i.name}</td><td className="px-5 py-4">{i.approvals.join(", ")}</td><td className="px-5 py-4"><ToBePublished /></td></tr>)}
              <tr><td className="px-5 py-4 font-medium">NIRF ranking</td><td className="px-5 py-4 text-muted-foreground">Not stated</td><td className="px-5 py-4"><ToBePublished /></td></tr>
            </tbody>
          </table>
        </div>
      </Container>

      <Container className="mt-20">
        <SectionTitle id="affiliations" eyebrow="Affiliation" title="Affiliating universities" />
        <dl className="border rounded-lg bg-card divide-y">
          <Row label="College of Engineering and Technology">Jawaharlal Nehru Technological University Kakinada (JNTUK), permanent affiliation; Autonomous status</Row>
          <Row label="College of Pharmacy">Acharya Nagarjuna University, permanent affiliation</Row>
          <Row label="Polytechnic">Diploma programmes offered under the College of Engineering and Technology</Row>
        </dl>
      </Container>

      <Container className="mt-20">
        <SectionTitle id="history" eyebrow="History" title="Milestones" />
        <ol className="relative border-l-2 border-[hsl(var(--primary)/0.2)] ml-2 space-y-8">
          {T.map(([y, t]) => (
            <Reveal key={y}><li className="pl-8 relative"><span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-[hsl(var(--accent))]" /><div className="font-display text-2xl text-[hsl(var(--primary))]" data-testid={`text-year-${y}`}>{y}</div><p className="text-[15px] text-foreground/80 mt-1">{t}</p></li></Reveal>
          ))}
        </ol>
      </Container>
    </>
  );
}

/* ---------------- Administration ---------------- */
export function Administration() {
  return (
    <>
      <PageHeader img="img/amr/eng-gallery-gallery2.jpg" eyebrow="Governance" title="Administration" sub="Leadership, academic heads, statutory officers and governing bodies of A.M. Reddy Educational Institutions." crumbs={[["About Us", "/about"], ["Administration"]]} />
      <Container className="mt-14">
        <SectionTitle id="leadership" eyebrow="Leadership" title="Management and heads of institutions" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {LEADERSHIP.map((p, i) => <PersonCard key={p.role + p.institution} person={p} testid={`card-leader-${i}`} />)}
        </div>
        <div className="mt-4 card-soft p-4 text-[14px] flex flex-wrap gap-x-6 gap-y-1"><span><b>Principal, Polytechnic (Diploma):</b> Dr. K. Krishna Reddy, M.Tech., Ph.D.</span><span className="text-muted-foreground">Office: <a href={PHONE_TEL} className="text-[hsl(var(--primary))] hover:underline">{PHONE}</a></span></div>
      </Container>
      <Container className="mt-14">
        <SectionTitle id="hods" eyebrow="Academic Leadership" title="Dean and Heads of Department" sub="A.M. Reddy Memorial College of Engineering and Technology." />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {HODS.map((p, i) => <PersonCard key={p.name} person={p} testid={`card-hod-${i}`} />)}
        </div>
        <div className="mt-4 card-soft px-5 py-4 flex flex-wrap justify-between items-center gap-3"><span className="font-semibold">Heads of Department, College of Pharmacy</span><ToBePublished /></div>
      </Container>
      <Container className="mt-14">
        <SectionTitle id="officers" eyebrow="Statutory Officers" title="Officers of the institutions" />
        <div className="card-soft divide-y">
          <div className="flex flex-wrap justify-between items-center gap-3 px-5 py-3.5" data-testid="row-officer-coe"><span className="font-semibold">Controller of Examinations (Engineering)</span><span className="text-[14px]">Dr. K. Sreekar Chand</span></div>
          {OFFICERS.map((o, i) => <div key={o} className="flex flex-wrap justify-between items-center gap-3 px-5 py-3.5" data-testid={`row-officer-${i}`}><span className="font-semibold">{o}</span><ToBePublished /></div>)}
        </div>
      </Container>
      <Container className="mt-14">
        <SectionTitle id="bodies" eyebrow="Governing Bodies" title="Composition of statutory bodies" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BODIES.map((b) => <div key={b.id} id={b.id} className="scroll-mt-36 card-soft p-5"><Users className="w-5 h-5 text-[hsl(var(--accent))]" /><div className="font-display text-[16px] mt-3">{b.name}</div><div className="text-[13px] text-muted-foreground mt-1 mb-3">Composition and minutes of meetings</div><ToBePublished /></div>)}
        </div>
      </Container>
    </>
  );
}

/* ---------------- Research ---------------- */
export function Research() {
  return (
    <>
      <PageHeader img="img/amr/eng-gallery-gallery4.jpg" pos="center 35%" eyebrow="Research and Innovation" title="Research and Development" sub="Laboratories, incubation support and academic collaborations across pharmacy and engineering." crumbs={[["Academics"], ["Research"]]} />
      <Container className="mt-16 grid lg:grid-cols-2 gap-12">
        <div>
          <SectionTitle id="rnd" eyebrow="R&D Cell" title="Research and Development Cell" />
          <p className="text-[15px] leading-relaxed text-foreground/85">Advancing research and development through modern laboratories is part of the stated mission of the College of Engineering and Technology. Details of the R&D cell, funded projects and publications will be published.</p>
          <div className="mt-5 border rounded-lg bg-card px-5 py-4 flex justify-between items-center"><span className="font-medium">Funded projects and publications</span><ToBePublished /></div>
        </div>
        <div>
          <SectionTitle id="incubation" eyebrow="Entrepreneurship" title="Incubation Centre" />
          <p className="text-[15px] leading-relaxed text-foreground/85">The Department of Computer Science and Engineering hosts an incubation centre that supports student ideas, prototypes and entrepreneurial initiatives, in line with the institutional mission to nurture creativity and innovation. Student-led events such as AMR Hackathon-2025 and the 24-hour Code Crusade are part of this ecosystem.</p>
        </div>
      </Container>
      <Container className="mt-16">
        <SectionTitle id="facilities" eyebrow="Central Facilities" title="Laboratories and library" />
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-6">
          <img src={asset("img/amr/eng-campus-library-2.jpg")} alt="Central library reading hall" className="rounded-lg w-full aspect-[16/10] object-cover" />
          <ul className="border rounded-lg bg-card divide-y">
            {[[Cpu, "Computing", "Six CSE laboratories with 368 air-conditioned systems"], [FlaskConical, "Pharmacy laboratories", "Laboratories for pharmaceutics, pharmacology and pharmaceutical analysis"], [BookOpen, "Library", "Central library; holdings and e-resources to be published"], [Lightbulb, "Incubation centre", "Hosted by the Department of CSE"]].map(([I, t, d]) => {
              const Icon = I as typeof Cpu;
              return <li key={t as string} className="flex gap-4 p-5"><Icon className="w-5 h-5 text-[hsl(var(--primary))] shrink-0 mt-0.5" /><div><div className="font-semibold">{t as string}</div><div className="text-[14px] text-muted-foreground">{d as string}</div></div></li>;
            })}
          </ul>
        </div>
      </Container>
      <Container className="mt-16">
        <SectionTitle id="collaborations" eyebrow="Collaborations" title="Academic collaborations" />
        <dl className="border rounded-lg bg-card divide-y">
          <Row label="College of Pharmacy">Memoranda of Understanding with institutions abroad</Row>
          <Row label="List of MoUs with partners and dates"><ToBePublished /></Row>
        </dl>
      </Container>
    </>
  );
}

/* ---------------- Student Life ---------------- */
export function StudentLife() {
  const F = [[Wind, "Well-ventilated classrooms"], [Building2, "Separate hostels for boys and girls"], [Bus, "Fleet of college buses"], [Droplets, "Mineral water plant"], [Mic2, "Auditorium"], [Trophy, "Outdoor sports grounds"], [Utensils, "Canteen"], [ShieldCheck, "Campus security"], [Zap, "Uninterrupted power backup"], [Briefcase, "Placement training"]] as const;
  return (
    <>
      <PageHeader img="img/amr/pharm-student-life-sports-sports01.jpg" eyebrow="Campus" title="Student Life" sub="Residential facilities, sports, student welfare and placement support on the Petlurivaripalem campus." crumbs={[["Student Life"]]} />
      <Container className="mt-16">
        <SectionTitle id="facilities" eyebrow="Facilities" title="Campus facilities" />
        <ul className="grid grid-cols-2 md:grid-cols-5 gap-px bg-border border rounded-lg overflow-hidden">
          {F.map(([I, t], i) => <li key={t} className="bg-card p-5" data-testid={`card-facility-${i}`}><I className="w-5 h-5 text-[hsl(var(--primary))]" strokeWidth={1.7} /><div className="text-[14px] font-medium mt-3">{t}</div></li>)}
        </ul>
      </Container>
      <Container className="mt-16 grid lg:grid-cols-2 gap-10">
        <div id="hostels" className="scroll-mt-36"><SectionTitle eyebrow="Residence" title="Hostels" /><p className="text-[15px] leading-relaxed text-foreground/85">Separate hostels are provided for boys and girls, with round-the-clock security. Hostel fee and capacity details will be published.</p><div className="mt-4"><ToBePublished /></div></div>
        <div id="health" className="scroll-mt-36"><SectionTitle eyebrow="Wellbeing" title="Health facilities" /><p className="text-[15px] leading-relaxed text-foreground/85">Health camps are organised on campus, including a dental camp held on 22 December 2025. Details of first-aid and tie-up hospitals will be published.</p><div className="mt-4"><ToBePublished /></div></div>
        <div id="sports" className="scroll-mt-36"><SectionTitle eyebrow="Sports" title="Sports and games" /><div className="grid grid-cols-3 gap-2 mb-4">{["sports02", "sports05", "sports08"].map((f) => <img key={f} src={asset(`img/amr/pharm-student-life-sports-${f}.jpg`)} alt="Students at the sports meet" loading="lazy" className="rounded-lg aspect-[4/3] w-full object-cover" />)}</div><p className="text-[15px] leading-relaxed text-foreground/85">Outdoor grounds are available for games and athletics. Cultural celebrations such as Sankranthi Sambaralu 2026 bring the campus community together.</p></div>
        <div id="nss" className="scroll-mt-36"><SectionTitle eyebrow="Outreach" title="NSS / NCC" /><div className="grid grid-cols-3 gap-2 mb-4">{["eng-campus-nss-aidsday-2025-09", "eng-campus-nss-mountainday-2025-01", "eng-latest-events-nss-road-safety-2025"].map((f) => <img key={f} src={asset(`img/amr/${f}.jpg`)} alt="NSS volunteers at an awareness programme" loading="lazy" className="rounded-lg aspect-[4/3] w-full object-cover" />)}</div><p className="text-[15px] leading-relaxed text-foreground/85">NSS volunteers of the College of Engineering conduct awareness programmes such as World AIDS Day, International Mountain Day and road safety drives. Details of NSS / NCC units and enrolment will be published.</p><div className="mt-4"><ToBePublished /></div></div>
      </Container>
      <Container className="mt-16">
        <SectionTitle id="placements" eyebrow="Training and Placement Cell" title="Placements" sub="The placement cell provides campus placement training and coordinates recruitment drives." />
        <div className="border rounded-lg bg-card overflow-x-auto">
          <table className="w-full text-[14px]">
            <thead className="bg-secondary/70 text-left text-[12px] uppercase tracking-wider text-muted-foreground"><tr><th className="px-5 py-3">Recruiter</th><th className="px-5 py-3">Details</th><th className="px-5 py-3">Date</th></tr></thead>
            <tbody className="divide-y">
              {[["Thinksysq, Bangalore", "23 AMR students selected", "Jan 2025"], ["Carro Health", "Pharmacy students placed in pool drive", "15 Apr 2025"], ["Divis", "Pool campus drive for pharmacy students", "Mar 2025"]].map(([r, d, t]) => <tr key={r} data-testid={`text-recruiter-${r.split(",")[0]}`}><td className="px-5 py-4 font-medium">{r}</td><td className="px-5 py-4">{d}</td><td className="px-5 py-4 font-mono text-[13px]">{t}</td></tr>)}
            </tbody>
          </table>
        </div>
      </Container>
      <Container className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
        {["img/amr/eng-placements-thinksysq-01.jpg", "img/amr/pharm-student-life-placements-heterolabs-01.jpg", "img/amr/eng-placements-placement-activity-02.jpg", "img/amr/pharm-student-life-placements-placement01.jpg"].map((src, i) => <img key={src} src={asset(src)} alt="Campus placement drive" loading="lazy" className="rounded-lg aspect-[4/3] w-full object-cover" data-testid={`img-placement-${i}`} />)}
      </Container>
      <Container className="mt-16">
        <SectionTitle id="alumni" eyebrow="Alumni" title="Alumni of the College of Pharmacy" sub="Graduates who attended the alumni meet of A.M. Reddy Memorial College of Pharmacy. Alumni association registration and office-bearers will be published." />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">{ALUMNI.map((p, i) => <PersonCard key={p.name} person={p} testid={`card-alumni-${i}`} />)}</div>
      </Container>
      <Container className="mt-16">
        <SectionTitle eyebrow="Student Support" title="Committees and welfare cells" />
        <div className="flex flex-wrap gap-2">{COMMITTEES.map((c) => <Link key={c.id} href={`/committees#${c.id}`} className="text-[14px] px-3 py-2 rounded-lg border bg-card hover:bg-secondary" data-testid={`link-sl-${c.id}`}>{c.name}</Link>)}</div>
      </Container>
    </>
  );
}

/* ---------------- Committees ---------------- */
export function Committees() {
  return (
    <>
      <PageHeader img="img/amr/pharm-gallery-ibro5.jpg" eyebrow="Statutory Committees" title="Committees and Cells" sub="Statutory and welfare committees constituted as per UGC, AICTE and Government of India regulations." crumbs={[["Student Life", "/student-life"], ["Committees"]]} />
      <Container className="mt-12">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-lg border-2 border-[hsl(var(--accent))] bg-card p-6 flex gap-4">
            <ShieldAlert className="w-7 h-7 text-[hsl(var(--accent))] shrink-0" />
            <div><div className="font-display text-lg">National Anti-Ragging Helpline</div><a href="tel:18001805522" className="block font-display text-2xl text-[hsl(var(--primary))] mt-1" data-testid="link-antiragging-helpline">{ANTI_RAGGING_HELPLINE}</a><div className="text-[13px] text-muted-foreground mt-1">Toll free, 24x7. <a href="https://www.antiragging.in" target="_blank" rel="noreferrer" className="underline" data-testid="link-antiragging-site">www.antiragging.in</a></div></div>
          </div>
          <div className="rounded-lg border bg-card p-6 flex gap-4">
            <Phone className="w-7 h-7 text-[hsl(var(--primary))] shrink-0" />
            <div><div className="font-display text-lg">Women Helpline (Institutional)</div><a href={WOMEN_HELPLINE_TEL} className="block font-display text-2xl text-[hsl(var(--primary))] mt-1" data-testid="link-women-helpline">{WOMEN_HELPLINE}</a><div className="text-[13px] text-muted-foreground mt-1">For students and staff of the institutions</div></div>
          </div>
        </div>
        <div className="mt-12 space-y-4">
          {COMMITTEES.map((c, i) => (
            <Reveal key={c.id}>
              <section id={c.id} className="scroll-mt-36 border rounded-lg bg-card p-6 md:p-8 grid md:grid-cols-[1fr_260px] gap-6" data-testid={`card-committee-${c.id}`}>
                <div>
                  <div className="text-[12px] font-mono text-muted-foreground">{String(i + 1).padStart(2, "0")}</div>
                  <h2 className="font-display text-xl md:text-2xl text-[hsl(var(--primary))] mt-1">{c.name}</h2>
                  <p className="text-[15px] leading-relaxed text-foreground/85 mt-3">{c.purpose}</p>
                  {c.extra && <ul className="mt-4 space-y-1.5 text-[14px]">{c.extra.map((e) => <li key={e} className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))] mt-2 shrink-0" />{e}</li>)}</ul>}
                </div>
                <div className="md:border-l md:pl-6 space-y-3 text-[14px]">
                  <div><div className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">Members</div><div className="mt-1.5"><ToBePublished /></div></div>
                  <div><div className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">Contact</div><a href={PHONE_TEL} className="block mt-1 text-[hsl(var(--primary))] hover:underline">{PHONE}</a></div>
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}

/* ---------------- Notices ---------------- */
export function Notices() {
  const notices = NEWS.filter((n) => ["Examinations", "IQAC"].includes(n.tag));
  const news = NEWS.filter((n) => !["Examinations", "IQAC"].includes(n.tag));
  return (
    <>
      <PageHeader img="img/amr/eng-gallery-gallery2.jpg" eyebrow="Information Corner" title="Notices, News and Information" sub="Circulars, announcements, events, Right to Information and career opportunities." crumbs={[["Information Corner"]]} />
      <Container className="mt-16 grid lg:grid-cols-[1fr_340px] gap-12">
        <div>
          <SectionTitle id="notices" eyebrow="Circulars" title="Notices and announcements" />
          <ul className="border rounded-lg bg-card divide-y">{notices.map((n, i) => <li key={n.title} className="flex gap-4 px-5 py-4" data-testid={`row-notice-${i}`}><span className="w-20 shrink-0 text-[12px] font-mono text-muted-foreground pt-0.5">{n.date}</span><span><span className="font-medium">{n.title}</span><span className="block text-[11px] uppercase tracking-wider text-[hsl(var(--accent))] mt-1">{n.tag}</span></span></li>)}</ul>
          <div className="mt-14" />
          <SectionTitle id="news" eyebrow="Campus" title="News, events and achievements" />
          <ul className="border rounded-lg bg-card divide-y ">{news.map((n, i) => <li key={n.title} className="grid sm:grid-cols-[120px_1fr_auto] gap-x-4 gap-y-1 px-5 py-4" data-testid={`text-event-${i}`}><span className="text-[12px] font-mono text-muted-foreground">{n.date}</span><span className="font-medium">{n.title}</span><span className="text-[11px] uppercase tracking-wider text-[hsl(var(--accent))]">{n.tag}</span></li>)}</ul>
          <div className="mt-6 border rounded-lg bg-card px-5 py-4 flex justify-between items-center"><span className="font-medium">Newsletters</span><ToBePublished /></div>
        </div>
        <aside className="space-y-6">
          <div id="rti" className="scroll-mt-36 border rounded-lg bg-card p-6">
            <FileSearch className="w-6 h-6 text-[hsl(var(--primary))]" />
            <h2 className="font-display text-xl mt-3">Right to Information</h2>
            <p className="text-[14px] text-muted-foreground mt-2">Information under the RTI Act, 2005.</p>
            <dl className="mt-4 space-y-3 text-[14px]">
              <div><dt className="font-semibold">Central Public Information Officer</dt><dd className="mt-1"><ToBePublished /></dd></div>
              <div><dt className="font-semibold">First Appellate Authority</dt><dd className="mt-1"><ToBePublished /></dd></div>
            </dl>
          </div>
          <div id="careers" className="scroll-mt-36 border rounded-lg bg-card p-6">
            <Briefcase className="w-6 h-6 text-[hsl(var(--primary))]" />
            <h2 className="font-display text-xl mt-3">Careers</h2>
            <p className="text-[14px] text-muted-foreground mt-2">There are no open positions listed at present. Prospective applicants may write to the principal of the respective institution.</p>
            <a href={`mailto:${EMAIL_ENG}`} className="mt-3 block text-[13px] text-[hsl(var(--primary))] break-all hover:underline" data-testid="link-careers-email">{EMAIL_ENG}</a>
          </div>
          <div className="border rounded-lg bg-card p-6"><h2 className="font-semibold">Reservation roster</h2><div className="mt-2"><ToBePublished /></div></div>
        </aside>
      </Container>
    </>
  );
}

/* ---------------- Gallery ---------------- */
export function Gallery() {
  const [cat, setCat] = useState<GalleryCat | "All">("All");
  const [open, setOpen] = useState<number | null>(null);
  const list = cat === "All" ? PHOTOS : PHOTOS.filter((p) => p.cat === cat);
  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((n) => (n === null ? n : (n + 1) % list.length));
      if (e.key === "ArrowLeft") setOpen((n) => (n === null ? n : (n - 1 + list.length) % list.length));
    };
    window.addEventListener("keydown", k); document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open, list.length]);
  const cur = open !== null ? list[open] : null;
  return (
    <>
      <PageHeader img="img/amr/eng-campus-non-technical-events-sankranthi-sambaralu-2026-pongal3.jpg" eyebrow="Information Corner" title="Picture Gallery" sub={`${PHOTOS.length} photographs of the campus, library, laboratories, festivals, sports, placements and NSS.`} crumbs={[["Gallery"]]} />
      <Container className="mt-10">
        <div role="tablist" aria-label="Gallery categories" className="flex flex-wrap gap-2 mb-6">
          {(["All", ...GALLERY_CATS] as const).map((c) => {
            const n = c === "All" ? PHOTOS.length : PHOTOS.filter((p) => p.cat === c).length;
            return <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`h-9 px-4 rounded-full text-[14px] font-semibold border transition-colors ${cat === c ? "bg-[hsl(var(--primary))] text-white border-transparent" : "bg-card hover:bg-secondary"}`} data-testid={`button-gallery-${c.replace(/\W+/g, "-").toLowerCase()}`}>{c} <span className="opacity-60 font-normal">({n})</span></button>;
          })}
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {list.map((p, i) => (
            <li key={p.src}>
              <button onClick={() => setOpen(i)} className="group relative block w-full aspect-[4/3] overflow-hidden rounded-lg bg-secondary" aria-label={`Open photo: ${p.cap}`} data-testid={`img-gallery-${i}`}>
                <img src={asset(p.src)} alt={p.cap} loading="lazy" className="img-zoom absolute inset-0 w-full h-full object-cover" />
                <span className="absolute inset-x-0 bottom-0 p-2.5 pt-8 text-left text-[12.5px] text-white bg-gradient-to-t from-[hsl(var(--ink)/0.8)] to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">{p.cap}</span>
              </button>
            </li>
          ))}
        </ul>
      </Container>
      {cur && open !== null && (
        <div className="fixed inset-0 z-[80] bg-[hsl(var(--ink)/0.94)] flex flex-col" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={() => setOpen(null)}>
          <div className="flex items-center justify-between text-white px-4 h-14 shrink-0">
            <span className="text-[13px] text-white/70">{open + 1} / {list.length} · {cur.cat}</span>
            <button onClick={() => setOpen(null)} className="w-10 h-10 grid place-items-center rounded-md hover:bg-white/10" aria-label="Close" data-testid="button-lightbox-close"><X className="w-5 h-5" /></button>
          </div>
          <div className="flex-1 min-h-0 flex items-center justify-center gap-2 px-2" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen((open - 1 + list.length) % list.length)} className="shrink-0 w-11 h-11 rounded-full bg-white/10 text-white grid place-items-center hover:bg-white/20" aria-label="Previous photo" data-testid="button-lightbox-prev"><ChevronLeft className="w-5 h-5" /></button>
            <figure className="min-w-0 max-h-full flex flex-col items-center">
              <img src={asset(cur.src)} alt={cur.cap} className="max-h-[calc(100dvh-140px)] max-w-full object-contain rounded-md" />
              <figcaption className="text-white/85 text-[14px] mt-3 text-center">{cur.cap}</figcaption>
            </figure>
            <button onClick={() => setOpen((open + 1) % list.length)} className="shrink-0 w-11 h-11 rounded-full bg-white/10 text-white grid place-items-center hover:bg-white/20" aria-label="Next photo" data-testid="button-lightbox-next"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------------- Contact ---------------- */
export function Contact() {
  const DIR = [["Main office", PHONE, PHONE_TEL], ["Women helpline", WOMEN_HELPLINE, WOMEN_HELPLINE_TEL], ["Principal, College of Engineering", EMAIL_ENG, `mailto:${EMAIL_ENG}`], ["College of Pharmacy", EMAIL_PHARM, `mailto:${EMAIL_PHARM}`], ...PHARM_PHONES.map((n, i) => [`College of Pharmacy (phone ${i + 1})`, n, `tel:+91${n}`]), ["National Anti-Ragging Helpline", ANTI_RAGGING_HELPLINE, "tel:18001805522"]];
  return (
    <>
      <PageHeader img="img/amr/eng-about-college.jpg" eyebrow="Contact" title="Contact Us" sub="Approximately 3 km from Narasaraopet town." crumbs={[["Contact Us"]]} />
      <Container className="mt-16 grid lg:grid-cols-2 gap-10">
        <div id="contact" className="scroll-mt-36">
          <SectionTitle eyebrow="Address" title="A.M. Reddy Educational Institutions" />
          <address className="not-italic space-y-4 text-[15px]">
            <p className="flex gap-3"><MapPin className="w-5 h-5 text-[hsl(var(--primary))] shrink-0 mt-0.5" />{ADDRESS_ENG}<br />{ADDRESS}</p>
            <a href={PHONE_TEL} className="flex gap-3 hover:underline" data-testid="link-contact-0"><Phone className="w-5 h-5 text-[hsl(var(--primary))]" />{PHONE}</a>
            <a href={`mailto:${EMAIL_ENG}`} className="flex gap-3 hover:underline break-all" data-testid="link-contact-2"><Mail className="w-5 h-5 text-[hsl(var(--primary))] shrink-0" />{EMAIL_ENG}</a>
            <a href={`mailto:${EMAIL_PHARM}`} className="flex gap-3 hover:underline" data-testid="link-contact-3"><Mail className="w-5 h-5 text-[hsl(var(--primary))]" />{EMAIL_PHARM}</a>
          </address>
        </div>
        <a id="map" href={MAP} target="_blank" rel="noreferrer" className="scroll-mt-36 group relative block rounded-lg overflow-hidden min-h-[300px] bg-[hsl(var(--teal))] text-white" data-testid="link-contact-map">
          <img src={asset("img/amr/eng-about-college.jpg")} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div className="relative h-full p-8 flex flex-col justify-end min-h-[300px]">
            <MapPin className="w-8 h-8" /><div className="font-display text-2xl mt-3">Petlurivaripalem, Narasaraopet</div>
            <span className="mt-4 inline-flex items-center gap-2 self-start h-11 px-5 rounded-lg bg-white text-[hsl(var(--primary))] font-semibold text-[14px]">Open in Google Maps <ExternalLink className="w-4 h-4" /></span>
          </div>
        </a>
      </Container>
      <Container className="mt-16">
        <SectionTitle id="directory" eyebrow="Directory" title="Telephone and email directory" />
        <div className="border rounded-lg bg-card overflow-x-auto">
          <table className="w-full text-[14px]">
            <thead className="bg-secondary/70 text-left text-[12px] uppercase tracking-wider text-muted-foreground"><tr><th className="px-5 py-3">Office</th><th className="px-5 py-3">Contact</th></tr></thead>
            <tbody className="divide-y">
              {DIR.map(([o, v, h], i) => <tr key={o}><td className="px-5 py-3.5 font-medium">{o}</td><td className="px-5 py-3.5"><a href={h} className="text-[hsl(var(--primary))] hover:underline break-all" data-testid={`link-directory-${i}`}>{v}</a></td></tr>)}
              {["Admissions office", "Controller of Examinations", "Hostel wardens", "Placement cell"].map((o) => <tr key={o}><td className="px-5 py-3.5 font-medium">{o}</td><td className="px-5 py-3.5"><ToBePublished /></td></tr>)}
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
}

/* ---------------- 404 ---------------- */
export function NotFoundPage() {
  return (
    <Container className="py-24 md:py-32 text-center">
      <div className="font-mono text-[13px] text-[hsl(var(--accent))]">Error 404</div>
      <h1 className="font-display text-3xl md:text-4xl text-[hsl(var(--primary))] mt-3">Page not found</h1>
      <p className="text-muted-foreground mt-4 max-w-md mx-auto">The page you requested may have been moved or the address may be incorrect. Use the search or the links below.</p>
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        <Link href="/" className="h-11 px-6 inline-flex items-center rounded-lg bg-primary text-primary-foreground font-semibold" data-testid="link-404-home">Return to home</Link>
        <Link href="/disclosure" className="h-11 px-6 inline-flex items-center rounded-lg border font-semibold" data-testid="link-404-disclosure">UGC Disclosure</Link>
        <Link href="/contact" className="h-11 px-6 inline-flex items-center gap-1 rounded-lg border font-semibold" data-testid="link-404-contact">Contact <ArrowRight className="w-4 h-4" /></Link>
      </div>
    </Container>
  );
}
