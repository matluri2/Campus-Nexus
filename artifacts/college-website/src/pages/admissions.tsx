import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SectionHead, Reveal, SplitHead, Eyebrow, PHONE, PHONE_TEL, EASE } from "@/components/site";

const COURSES: Record<string, { college: string; color: string; branches: string[] }> = {
  "B.Tech": { college: "Engineering", color: "var(--eng)", branches: ["Civil Engineering", "Electrical and Electronics Engineering", "Electronics and Communication Engineering", "Computer Science and Engineering", "CSE (Cyber Security)", "CSE (AI and ML)", "CSE (Data Science)", "Robotics and Artificial Intelligence", "Agricultural Engineering"] },
  "M.Tech": { college: "Engineering", color: "var(--eng)", branches: ["Structural Design", "Transportation Engineering"] },
  "Diploma": { college: "Polytechnic", color: "var(--poly)", branches: ["Civil Engineering", "Electrical Engineering", "Mechanical Engineering", "Electronics and Communication Engineering", "Computer Science and Engineering", "Cloud Computing and Big Data"] },
  "B.Pharm": { college: "Pharmacy", color: "var(--pharm)", branches: ["B.Pharm"] },
  "Pharm.D": { college: "Pharmacy", color: "var(--pharm)", branches: ["Pharm.D"] },
  "M.Pharm": { college: "Pharmacy", color: "var(--pharm)", branches: ["Pharmaceutics", "Pharmacology", "Pharmaceutical Analysis", "Regulatory Affairs"] },
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

const FORM_STEPS: { title: string; fields: (keyof Values)[] }[] = [
  { title: "Program", fields: ["course", "branch"] },
  { title: "Student", fields: ["studentName", "fatherName", "phone"] },
  { title: "Marks", fields: ["tenthMarks", "interMarks"] },
  { title: "Address", fields: ["village", "mandal", "district", "address"] },
];

const PROCESS = [["Enquire", "Submit the form below or call the office."], ["Counselling", "Our admissions team calls you to discuss eligibility, branch and fees."], ["Visit", "Tour the campus at Petlurivaripalem with your family."], ["Enrol", "Complete documents and confirm your seat."]];
const PC = ["var(--lime)", "var(--pharm)", "var(--eng)", "var(--poly)"];

export default function Admissions() {
  const { toast } = useToast();
  const [done, setDone] = useState<Values | null>(null);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: defaults });
  const course = form.watch("course");
  const branch = form.watch("branch");

  useEffect(() => {
    if (window.location.hash === "#enquire") setTimeout(() => document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" }), 400);
  }, []);

  const next = async () => {
    const ok = await form.trigger(FORM_STEPS[step].fields);
    if (ok) { setDir(1); setStep((s) => s + 1); }
  };
  const back = () => { setDir(-1); setStep((s) => Math.max(0, s - 1)); };

  const onSubmit = (v: Values) => {
    setDone(v);
    toast({ title: "Enquiry received", description: `Thank you, ${v.studentName}. The admissions office will follow up on ${v.phone}.` });
    form.reset(defaults);
    setStep(0);
  };

  const field = (name: keyof Values, label: string, ph = "", type = "text") => (
    <FormField control={form.control} name={name} render={({ field: f }) => (
      <FormItem>
        <FormLabel className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</FormLabel>
        <FormControl><Input type={type} placeholder={ph} {...f} value={f.value ?? ""} className="h-14 rounded-2xl bg-background border-[hsl(var(--ink)/0.15)] text-lg px-5 focus-visible:ring-[hsl(var(--lime))] focus-visible:ring-offset-0 focus-visible:ring-4" data-testid={`input-${name}`} /></FormControl>
        <FormMessage />
      </FormItem>
    )} />
  );

  return (
    <>
      <section className="relative pt-28 md:pt-36 overflow-hidden">
        <div className="absolute inset-0 gridlines [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-6">
          <Eyebrow>Admissions</Eyebrow>
          <h1 className="font-display text-[2.8rem] leading-[0.92] sm:text-7xl md:text-[7rem] mt-6 tracking-[-0.06em]"><SplitHead text="Start here." /><br /><span className="text-muted-foreground/60"><SplitHead text="We'll guide the rest." delay={0.2} /></span></h1>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl">Pharmacy, engineering and diploma programs on one campus. Tell us what you are interested in and we will call you back.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PROCESS.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08}>
              <div className="relative h-full rounded-[1.75rem] bg-card border p-6 overflow-hidden" data-testid={`card-step-${i}`}>
                <div className="absolute -right-3 -top-6 font-display text-[7rem] leading-none text-[hsl(var(--ink)/0.05)]">{i + 1}</div>
                <span className="block w-3 h-3 rounded-full" style={{ background: `hsl(${PC[i]})` }} />
                <div className="font-display text-3xl mt-10">{t}</div><p className="text-sm text-muted-foreground mt-2">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="enquire" className="mt-24 px-3 sm:px-5 scroll-mt-24">
        <div className="max-w-7xl mx-auto rounded-[2.5rem] bg-[hsl(var(--ink))] p-3 md:p-4 grid lg:grid-cols-[0.8fr_1.2fr] gap-3">
          <div className="text-white p-6 md:p-10 flex flex-col">
            <Eyebrow light>Admission enquiry</Eyebrow>
            <h2 className="font-display text-4xl md:text-6xl mt-4 leading-[0.95]">Two minutes.<br /><span className="text-[hsl(var(--lime))]">Four steps.</span></h2>
            <p className="text-white/55 mt-4 max-w-sm">The admissions office will call you back. Nothing here confirms admission.</p>
            <ol className="mt-10 space-y-1 hidden lg:block">
              {FORM_STEPS.map((s, i) => (
                <li key={s.title} className={`flex items-center gap-4 py-2 transition-opacity ${i === step && !done ? "opacity-100" : "opacity-40"}`}>
                  <span className={`w-8 h-8 rounded-full grid place-items-center text-xs font-mono border ${i < step || done ? "bg-[hsl(var(--lime))] text-[hsl(var(--ink))] border-transparent" : "border-white/30"}`}>{i < step || done ? <Check className="w-4 h-4" /> : i + 1}</span>
                  <span className="font-display text-xl">{s.title}</span>
                </li>
              ))}
            </ol>
            <div className="mt-auto pt-10 text-sm text-white/55">Prefer to talk? <a href={PHONE_TEL} className="text-[hsl(var(--lime))] font-semibold" data-testid="link-form-call">{PHONE}</a></div>
          </div>

          <div className="rounded-[2rem] bg-background p-6 md:p-10 min-h-[540px] flex flex-col">
            {done ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="m-auto text-center py-6" data-testid="status-enquiry-success">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }} className="w-24 h-24 rounded-full bg-[hsl(var(--lime))] mx-auto grid place-items-center"><Check className="w-12 h-12" strokeWidth={2.5} /></motion.div>
                <h2 className="font-display text-4xl md:text-5xl mt-8">Thank you, {done.studentName}.</h2>
                <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Your enquiry for {done.course} ({done.branch}) is noted. The admissions office will follow up on {done.phone}. For anything urgent, call <a href={PHONE_TEL} className="text-foreground font-semibold underline decoration-[hsl(var(--lime))] decoration-2 underline-offset-4">{PHONE}</a>.</p>
                <p className="text-xs text-muted-foreground mt-4">This form does not reserve a seat; final admission follows counselling and document verification.</p>
                <button onClick={() => setDone(null)} className="mt-8 rounded-full bg-[hsl(var(--ink))] text-white px-7 py-4 font-semibold" data-testid="button-new-enquiry">Submit another enquiry</button>
              </motion.div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1" noValidate>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted-foreground">Step {step + 1} of 4 / {FORM_STEPS[step].title}</span>
                    <div className="flex gap-1.5">{FORM_STEPS.map((_, i) => <span key={i} className="h-1.5 w-8 rounded-full bg-[hsl(var(--ink)/0.1)] overflow-hidden"><motion.span className="block h-full bg-[hsl(var(--ink))]" animate={{ width: i <= step ? "100%" : "0%" }} transition={{ duration: 0.5, ease: EASE }} /></span>)}</div>
                  </div>
                  <div className="relative flex-1 mt-8">
                    <AnimatePresence mode="wait" custom={dir}>
                      <motion.div key={step} custom={dir} initial={{ opacity: 0, x: dir * 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -40 }} transition={{ duration: 0.4, ease: EASE }} className="space-y-6">
                        {step === 0 && (
                          <>
                            <FormField control={form.control} name="course" render={({ field: f }) => (
                              <FormItem>
                                <FormLabel className="font-display text-2xl text-foreground">Which course interests you?</FormLabel>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                                  {Object.entries(COURSES).map(([k, v]) => (
                                    <button type="button" key={k} onClick={() => { f.onChange(k); form.setValue("branch", v.branches.length === 1 ? v.branches[0] : ""); form.clearErrors("course"); }}
                                      className={`relative text-left rounded-2xl border p-4 transition-all ${f.value === k ? "border-transparent text-[hsl(var(--ink))] scale-[1.02]" : "border-[hsl(var(--ink)/0.15)] hover:border-[hsl(var(--ink)/0.4)]"}`}
                                      style={f.value === k ? { background: `hsl(${v.color} / 0.3)`, boxShadow: `inset 0 0 0 2px hsl(${v.color})` } : undefined} data-testid={`option-course-${k}`}>
                                      <span className="block font-display text-xl">{k}</span>
                                      <span className="block text-xs text-muted-foreground mt-0.5">{v.college}</span>
                                    </button>
                                  ))}
                                </div>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="branch" render={({ field: f }) => (
                              <FormItem>
                                <FormLabel className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Branch</FormLabel>
                                {course ? (
                                  <div className="flex flex-wrap gap-2 mt-2" data-testid="select-branch">
                                    {COURSES[course].branches.map((b) => (
                                      <button type="button" key={b} onClick={() => { f.onChange(b); form.clearErrors("branch"); }} className={`rounded-full px-4 py-2 text-sm border transition-colors ${f.value === b ? "bg-[hsl(var(--ink))] text-white border-transparent" : "border-[hsl(var(--ink)/0.15)] hover:bg-[hsl(var(--ink)/0.05)]"}`} data-testid={`option-branch-${b.replace(/\W+/g, "-").toLowerCase()}`}>{b}</button>
                                    ))}
                                  </div>
                                ) : <p className="text-sm text-muted-foreground mt-2">Choose a course first.</p>}
                                <FormMessage />
                              </FormItem>
                            )} />
                          </>
                        )}
                        {step === 1 && (<><div className="font-display text-2xl">Who is applying?</div>{field("studentName", "Student name", "Full name")}{field("fatherName", "Father's name")}{field("phone", "Mobile number", "10-digit mobile", "tel")}</>)}
                        {step === 2 && (<><div className="font-display text-2xl">Recent marks</div>{field("tenthMarks", "10th marks / GPA", "e.g. 9.2 or 512")}{field("interMarks", "Inter marks (if applicable)", "Optional")}</>)}
                        {step === 3 && (
                          <>
                            <div className="font-display text-2xl">Where should we reach you?</div>
                            <div className="grid sm:grid-cols-3 gap-4">{field("village", "Village / Town")}{field("mandal", "Mandal")}{field("district", "District")}</div>
                            <FormField control={form.control} name="address" render={({ field: f }) => (
                              <FormItem><FormLabel className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Address</FormLabel><FormControl><Textarea rows={3} {...f} className="rounded-2xl bg-background border-[hsl(var(--ink)/0.15)] text-lg px-5 py-4" data-testid="input-address" /></FormControl><FormMessage /></FormItem>
                            )} />
                            <div className="rounded-2xl bg-[hsl(var(--ink)/0.04)] p-4 text-sm"><span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground block mb-1">Enquiring for</span>{course} / {branch}</div>
                          </>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className="mt-8 pt-6 border-t border-[hsl(var(--ink)/0.1)] flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground max-w-xs">Your details go to the admissions office only for follow-up. Submitting does not confirm admission.</p>
                    <div className="flex gap-2">
                      {step > 0 && <button type="button" onClick={back} className="w-14 h-14 rounded-full border border-[hsl(var(--ink)/0.2)] grid place-items-center" aria-label="Previous step" data-testid="button-prev-step"><ArrowLeft className="w-5 h-5" /></button>}
                      {step < 3 ? (
                        <button type="button" onClick={next} className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full bg-[hsl(var(--ink))] text-white font-semibold px-8 h-14" data-testid="button-next-step">Continue <ArrowRight className="w-4 h-4" /></button>
                      ) : (
                        <button type="submit" className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full bg-[hsl(var(--lime))] text-[hsl(var(--ink))] font-semibold px-8 h-14" data-testid="button-submit-enquiry">Submit enquiry <Check className="w-4 h-4" /></button>
                      )}
                    </div>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-28">
        <SectionHead eyebrow="Programs offered" title="Find your program." />
        <div className="grid md:grid-cols-3 gap-3">
          {(["Pharmacy", "Engineering", "Polytechnic"] as const).map((c, ci) => (
            <Reveal key={c} delay={ci * 0.08}>
              <div className="h-full rounded-[1.75rem] bg-card border p-7" data-testid={`card-college-${c.toLowerCase()}`}>
                <div className="flex items-center gap-3"><span className="w-3 h-3 rounded-full" style={{ background: `hsl(${["var(--pharm)", "var(--eng)", "var(--poly)"][ci]})` }} /><span className="font-display text-3xl">{c}</span></div>
                {Object.entries(COURSES).filter(([, v]) => v.college === c).map(([k, v]) => (
                  <div key={k} className="mt-5 pt-5 border-t border-[hsl(var(--ink)/0.1)]"><div className="font-mono text-xs uppercase tracking-[0.15em]">{k}</div><div className="text-sm text-muted-foreground mt-1.5">{v.branches.join(", ")}</div></div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
