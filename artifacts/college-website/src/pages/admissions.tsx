import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Check, Phone } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Container, PageHeader, Reveal, SectionTitle, ToBePublished } from "@/components/layout";
import { PHONE, PHONE_TEL, INSTITUTIONS } from "@/data/site";

const COURSES: Record<string, { college: string; branches: string[] }> = {
  "B.Tech": { college: "Engineering", branches: ["Civil Engineering", "Electrical and Electronics Engineering", "Electronics and Communication Engineering", "Computer Science and Engineering", "CSE (Cyber Security)", "CSE (AI and ML)", "CSE (Data Science)", "Robotics and Artificial Intelligence", "Agricultural Engineering"] },
  "M.Tech": { college: "Engineering", branches: ["Structural Design", "Transportation Engineering"] },
  "Diploma": { college: "Polytechnic", branches: ["Civil Engineering", "Electrical Engineering", "Mechanical Engineering", "Electronics and Communication Engineering", "Computer Science and Engineering", "Cloud Computing and Big Data"] },
  "B.Pharm": { college: "Pharmacy", branches: ["B.Pharm"] },
  "Pharm.D": { college: "Pharmacy", branches: ["Pharm.D"] },
  "M.Pharm": { college: "Pharmacy", branches: ["Pharmaceutics", "Pharmacology", "Pharmaceutical Analysis", "Regulatory Affairs"] },
};

const marks = z.string().trim().min(1, "Required").refine((v) => !isNaN(Number(v)) && Number(v) >= 0 && Number(v) <= 1000, "Enter marks, percentage or GPA");
const schema = z.object({
  course: z.string().min(1, "Choose a course"),
  branch: z.string().min(1, "Choose a branch"),
  studentName: z.string().trim().min(2, "Enter the student's name"),
  fatherName: z.string().trim().min(2, "Enter father's name"),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  tenthMarks: marks,
  interMarks: z.string().trim().optional(),
  address: z.string().trim().min(3, "Enter address"),
  village: z.string().trim().min(2, "Enter village"),
  mandal: z.string().trim().min(2, "Enter mandal"),
  district: z.string().trim().min(2, "Enter district"),
});
type Values = z.infer<typeof schema>;
const defaults: Values = { course: "", branch: "", studentName: "", fatherName: "", phone: "", tenthMarks: "", interMarks: "", address: "", village: "", mandal: "", district: "Palnadu" };

const STEPS: { title: string; fields: (keyof Values)[] }[] = [
  { title: "Programme", fields: ["course", "branch"] },
  { title: "Applicant", fields: ["studentName", "fatherName", "phone"] },
  { title: "Academic record", fields: ["tenthMarks", "interMarks"] },
  { title: "Address", fields: ["village", "mandal", "district", "address"] },
];

const PROCESS = [["Enquiry", "Submit the enquiry form or contact the admissions office by phone."], ["Counselling", "The admissions team discusses eligibility, programme choice and fees with the applicant and family."], ["Campus visit", "Applicants are welcome to visit the campus at Petlurivaripalem."], ["Admission", "Seats are allotted through state counselling (convener quota) or as per regulations for management quota, followed by document verification."]];

export default function Admissions() {
  const { toast } = useToast();
  const [done, setDone] = useState<Values | null>(null);
  const [step, setStep] = useState(0);
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: defaults });
  const course = form.watch("course");
  const branch = form.watch("branch");

  const next = async () => { if (await form.trigger(STEPS[step].fields)) setStep((s) => s + 1); };
  const back = () => setStep((s) => Math.max(0, s - 1));
  const onSubmit = (v: Values) => {
    setDone(v);
    toast({ title: "Enquiry recorded", description: `Thank you, ${v.studentName}. The admissions office will contact you on ${v.phone}.` });
    form.reset(defaults); setStep(0);
  };

  const field = (name: keyof Values, label: string, ph = "", type = "text", req = true) => (
    <FormField control={form.control} name={name} render={({ field: f }) => (
      <FormItem>
        <FormLabel className="text-[13px] font-semibold">{label}{req && <span className="text-[hsl(var(--accent))]"> *</span>}</FormLabel>
        <FormControl><Input type={type} placeholder={ph} {...f} value={f.value ?? ""} className="h-11 rounded-sm bg-background" data-testid={`input-${name}`} /></FormControl>
        <FormMessage />
      </FormItem>
    )} />
  );

  return (
    <>
      <PageHeader img="img/campus.jpg" eyebrow="Admissions 2026" title="Admissions" sub="Undergraduate, postgraduate and diploma programmes in pharmacy, engineering and technology." crumbs={[["Admissions"]]} />

      <Container className="mt-16">
        <SectionTitle id="process" eyebrow="Procedure" title="Admission process" />
        <ol className="grid md:grid-cols-4 border rounded-sm bg-card divide-y md:divide-y-0 md:divide-x">
          {PROCESS.map(([t, d], i) => (
            <li key={t} className="p-6" data-testid={`card-step-${i}`}>
              <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground grid place-items-center text-[13px] font-semibold">{i + 1}</span>
              <div className="font-semibold mt-4">{t}</div>
              <p className="text-[14px] text-muted-foreground mt-1.5 leading-relaxed">{d}</p>
            </li>
          ))}
        </ol>
      </Container>

      <Container className="mt-20">
        <SectionTitle id="programmes" eyebrow="Programmes" title="Programmes offered" />
        <div className="grid lg:grid-cols-3 gap-px bg-border border rounded-sm overflow-hidden">
          {INSTITUTIONS.map((ins) => (
            <div key={ins.key} className="bg-card p-6" data-testid={`card-college-${ins.key}`}>
              <div className="font-display text-xl text-[hsl(var(--primary))]">{ins.short}</div>
              <div className="text-[12px] text-muted-foreground mt-1">{ins.affiliation}</div>
              {ins.groups.map((g) => (
                <div key={g.title} className="mt-5 pt-4 border-t">
                  <div className="text-[12px] font-semibold uppercase tracking-wider text-[hsl(var(--accent))]">{g.title}</div>
                  <ul className="mt-2 space-y-1 text-[14px]">{g.items.map((p) => <li key={p.name}>{p.name}{p.intake && <span className="text-muted-foreground"> ({p.intake})</span>}</li>)}</ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Container>

      <Container className="mt-20">
        <SectionTitle id="fee" eyebrow="Eligibility and Fee" title="Eligibility, fee structure and refund policy" sub="Eligibility follows the norms of APSCHE, the affiliating university and the respective regulatory council (AICTE / PCI). Fees are as fixed by the Andhra Pradesh Higher Education Regulatory and Monitoring Commission." />
        <div className="border rounded-sm bg-card divide-y">
          {[["Prospectus with fee structure", "prospectus"], ["Fee refund policy", "refund"], ["Programme-wise eligibility criteria", "eligibility"]].map(([l, k]) => (
            <div key={k} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"><span className="font-medium">{l}</span><ToBePublished testid={`status-${k}`} /></div>
          ))}
        </div>
      </Container>

      <Container className="mt-20">
        <div id="enquire" className="scroll-mt-36 grid lg:grid-cols-[320px_1fr] border rounded-sm overflow-hidden bg-card">
          <div className="bg-[hsl(var(--teal))] text-white p-7 flex flex-col">
            <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[hsl(14_70%_78%)]">Admission Enquiry</div>
            <h2 className="font-display text-2xl mt-2">Request a call from the admissions office</h2>
            <ol className="mt-8 space-y-3">
              {STEPS.map((s, i) => (
                <li key={s.title} className={`flex items-center gap-3 text-[14px] ${i === step && !done ? "text-white" : "text-white/55"}`}>
                  <span className={`w-7 h-7 rounded-full grid place-items-center text-[12px] border ${i < step || done ? "bg-white text-[hsl(var(--primary))] border-white" : i === step ? "border-white" : "border-white/40"}`}>{i < step || done ? <Check className="w-3.5 h-3.5" /> : i + 1}</span>{s.title}
                </li>
              ))}
            </ol>
            <div className="mt-auto pt-10 text-[14px] text-white/75">Prefer to speak directly?<a href={PHONE_TEL} className="flex items-center gap-2 mt-1 font-semibold text-white" data-testid="link-form-call"><Phone className="w-4 h-4" />{PHONE}</a></div>
          </div>
          <div className="p-6 md:p-10 min-h-[480px] flex flex-col">
            {done ? (
              <div className="m-auto text-center max-w-lg" role="status" data-testid="status-enquiry-success">
                <span className="w-14 h-14 rounded-full bg-primary text-primary-foreground grid place-items-center mx-auto"><Check className="w-7 h-7" /></span>
                <h3 className="font-display text-2xl mt-5">Thank you, {done.studentName}.</h3>
                <p className="text-muted-foreground mt-3">Your enquiry for {done.course} ({done.branch}) has been noted on this page. Please contact the admissions office at <a href={PHONE_TEL} className="text-foreground font-semibold underline">{PHONE}</a> to complete your enquiry.</p>
                <p className="text-[12px] text-muted-foreground mt-3">This form does not reserve a seat. Admission is subject to counselling and verification of documents.</p>
                <button onClick={() => setDone(null)} className="mt-6 h-11 px-6 rounded-sm bg-primary text-primary-foreground font-semibold" data-testid="button-new-enquiry">Submit another enquiry</button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1" noValidate>
                  <div className="flex items-center justify-between text-[13px] text-muted-foreground">
                    <span>Step {step + 1} of 4: <span className="text-foreground font-semibold">{STEPS[step].title}</span></span>
                    <div className="h-1 w-32 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary transition-transform duration-500 origin-left" style={{ transform: `scaleX(${(step + 1) / 4})` }} /></div>
                  </div>
                  <Reveal key={step} className="flex-1 mt-8 space-y-5">
                    {step === 0 && (
                      <>
                        <FormField control={form.control} name="course" render={({ field: f }) => (
                          <FormItem>
                            <FormLabel className="text-[13px] font-semibold">Course<span className="text-[hsl(var(--accent))]"> *</span></FormLabel>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" role="radiogroup">
                              {Object.entries(COURSES).map(([k, v]) => (
                                <button type="button" role="radio" aria-checked={f.value === k} key={k} onClick={() => { f.onChange(k); form.setValue("branch", v.branches.length === 1 ? v.branches[0] : ""); form.clearErrors("course"); }}
                                  className={`text-left rounded-sm border p-3.5 transition-colors ${f.value === k ? "border-primary bg-secondary ring-1 ring-primary" : "hover:border-[hsl(var(--primary)/0.4)]"}`} data-testid={`option-course-${k}`}>
                                  <span className="block font-semibold">{k}</span><span className="block text-[12px] text-muted-foreground">{v.college}</span>
                                </button>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="branch" render={({ field: f }) => (
                          <FormItem>
                            <FormLabel className="text-[13px] font-semibold">Branch / Specialisation<span className="text-[hsl(var(--accent))]"> *</span></FormLabel>
                            {course ? (
                              <div className="flex flex-wrap gap-2" data-testid="select-branch" role="radiogroup">
                                {COURSES[course].branches.map((b) => (
                                  <button type="button" role="radio" aria-checked={f.value === b} key={b} onClick={() => { f.onChange(b); form.clearErrors("branch"); }} className={`rounded-sm px-3 py-2 text-[13px] border transition-colors ${f.value === b ? "bg-primary text-primary-foreground border-primary" : "hover:bg-secondary"}`} data-testid={`option-branch-${b.replace(/\W+/g, "-").toLowerCase()}`}>{b}</button>
                                ))}
                              </div>
                            ) : <p className="text-[14px] text-muted-foreground">Select a course first.</p>}
                            <FormMessage />
                          </FormItem>
                        )} />
                      </>
                    )}
                    {step === 1 && <div className="grid sm:grid-cols-2 gap-5">{field("studentName", "Student name", "Full name as per certificates")}{field("fatherName", "Father's name")}{field("phone", "Mobile number", "10-digit mobile number", "tel")}</div>}
                    {step === 2 && <div className="grid sm:grid-cols-2 gap-5">{field("tenthMarks", "SSC / 10th marks or GPA", "e.g. 9.2 or 512")}{field("interMarks", "Intermediate marks (if applicable)", "Optional", "text", false)}</div>}
                    {step === 3 && (
                      <>
                        <div className="grid sm:grid-cols-3 gap-5">{field("village", "Village / Town")}{field("mandal", "Mandal")}{field("district", "District")}</div>
                        <FormField control={form.control} name="address" render={({ field: f }) => (
                          <FormItem><FormLabel className="text-[13px] font-semibold">Address<span className="text-[hsl(var(--accent))]"> *</span></FormLabel><FormControl><Textarea rows={3} {...f} className="rounded-sm bg-background" data-testid="input-address" /></FormControl><FormMessage /></FormItem>
                        )} />
                        <div className="rounded-sm bg-secondary px-4 py-3 text-[14px]"><span className="text-muted-foreground">Enquiring for: </span><span className="font-semibold">{course} / {branch}</span></div>
                      </>
                    )}
                  </Reveal>
                  <div className="mt-8 pt-5 border-t flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-[12px] text-muted-foreground max-w-xs">Details are used only for admission follow-up. Submission does not confirm admission.</p>
                    <div className="flex gap-2">
                      {step > 0 && <button type="button" onClick={back} className="h-11 px-4 rounded-sm border inline-flex items-center gap-1.5 font-medium" data-testid="button-prev-step"><ArrowLeft className="w-4 h-4" />Back</button>}
                      {step < 3 ? (
                        <button type="button" onClick={next} className="h-11 px-6 rounded-sm bg-primary text-primary-foreground font-semibold inline-flex items-center gap-1.5" data-testid="button-next-step">Continue <ArrowRight className="w-4 h-4" /></button>
                      ) : (
                        <button type="submit" className="h-11 px-6 rounded-sm bg-[hsl(var(--accent))] text-white font-semibold inline-flex items-center gap-1.5" data-testid="button-submit-enquiry">Submit enquiry <Check className="w-4 h-4" /></button>
                      )}
                    </div>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
