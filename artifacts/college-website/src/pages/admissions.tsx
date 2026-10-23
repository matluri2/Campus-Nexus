import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PageHero, SectionHead, Reveal, PHONE, PHONE_TEL } from "@/components/site";

const COURSES: Record<string, { college: string; branches: string[] }> = {
  "B.Tech": { college: "Engineering", branches: ["Civil Engineering", "Electrical and Electronics Engineering", "Electronics and Communication Engineering", "Computer Science and Engineering", "CSE (Cyber Security)", "CSE (AI and ML)", "CSE (Data Science)", "Robotics and Artificial Intelligence", "Agricultural Engineering"] },
  "M.Tech": { college: "Engineering", branches: ["Structural Design", "Transportation Engineering"] },
  "Diploma": { college: "Polytechnic", branches: ["Civil Engineering", "Electrical Engineering", "Mechanical Engineering", "Electronics and Communication Engineering", "Computer Science and Engineering", "Cloud Computing and Big Data"] },
  "B.Pharm": { college: "Pharmacy", branches: ["B.Pharm"] },
  "Pharm.D": { college: "Pharmacy", branches: ["Pharm.D"] },
  "M.Pharm": { college: "Pharmacy", branches: ["Pharmaceutics", "Pharmacology", "Pharmaceutical Analysis", "Regulatory Affairs"] },
};

const marks = z.string().trim().min(1, "Required").refine(v => !isNaN(Number(v)) && Number(v) >= 0 && Number(v) <= 1000, "Enter marks, percentage or GPA");
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

const STEPS = [["Enquire", "Submit the form below or call the office."], ["Counselling", "Our admissions team calls you to discuss eligibility, branch and fees."], ["Visit", "Tour the campus at Petlurivaripalem with your family."], ["Enrol", "Complete documents and confirm your seat."]];

export default function Admissions() {
  const { toast } = useToast();
  const [done, setDone] = useState<Values | null>(null);
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: defaults });
  const course = form.watch("course");

  useEffect(() => {
    if (window.location.hash === "#enquire") setTimeout(() => document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" }), 300);
  }, []);

  const onSubmit = (v: Values) => {
    setDone(v);
    toast({ title: "Enquiry received", description: `Thank you, ${v.studentName}. The admissions office will follow up on ${v.phone}.` });
    form.reset(defaults);
  };

  const field = (name: keyof Values, label: string, ph = "", type = "text") => (
    <FormField control={form.control} name={name} render={({ field: f }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl><Input type={type} placeholder={ph} {...f} value={f.value ?? ""} className="h-12 rounded-xl bg-background" data-testid={`input-${name}`} /></FormControl>
        <FormMessage />
      </FormItem>
    )} />
  );

  return (
    <>
      <PageHero img="img/engineering.jpg" eyebrow="Admissions" title="Start here. We'll guide you the rest of the way." sub="Pharmacy, engineering and diploma programs on one campus. Tell us what you are interested in and we will call you back." />
      <section className="max-w-7xl mx-auto px-6 pt-20">
        <SectionHead eyebrow="How to apply" title="Four simple steps." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.06} className="rounded-3xl border bg-card p-6">
              <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground font-bold flex items-center justify-center">{i + 1}</div>
              <div className="font-display text-2xl mt-5">{t}</div><p className="text-sm text-muted-foreground mt-2">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pt-20">
        <SectionHead eyebrow="Programs offered" title="Find your program." />
        <div className="grid md:grid-cols-3 gap-4">
          {(["Pharmacy", "Engineering", "Polytechnic"]).map(c => (
            <Reveal key={c} className="rounded-3xl bg-secondary p-6">
              <div className="font-display text-2xl text-primary">{c}</div>
              {Object.entries(COURSES).filter(([, v]) => v.college === c).map(([k, v]) => (
                <div key={k} className="mt-4"><div className="font-bold text-sm">{k}</div><div className="text-sm text-muted-foreground">{v.branches.join(", ")}</div></div>
              ))}
            </Reveal>
          ))}
        </div>
      </section>

      <section id="enquire" className="max-w-5xl mx-auto px-6 pt-20 scroll-mt-32">
        <div className="rounded-[2rem] border bg-card p-6 md:p-12 shadow-[0_40px_80px_-40px_hsl(348_72%_20%/0.35)]">
          {done ? (
            <div className="text-center py-10" data-testid="status-enquiry-success">
              <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
              <h2 className="font-display text-3xl md:text-4xl mt-6">Thank you, {done.studentName}.</h2>
              <p className="text-muted-foreground mt-3 max-w-lg mx-auto">Your enquiry for {done.course} ({done.branch}) is noted. The admissions office will follow up on {done.phone}. For anything urgent, call <a href={PHONE_TEL} className="text-primary font-semibold">{PHONE}</a>.</p>
              <p className="text-xs text-muted-foreground mt-4">This form does not reserve a seat; final admission follows counselling and document verification.</p>
              <button onClick={() => setDone(null)} className="mt-8 rounded-full bg-primary text-primary-foreground px-7 py-3 font-semibold" data-testid="button-new-enquiry">Submit another enquiry</button>
            </div>
          ) : (
            <>
              <h2 className="font-display text-3xl md:text-4xl">Admission enquiry</h2>
              <p className="text-muted-foreground mt-2">Takes about two minutes. The admissions office will call you back.</p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 grid sm:grid-cols-2 gap-5" noValidate>
                  <FormField control={form.control} name="course" render={({ field: f }) => (
                    <FormItem><FormLabel>Course interested</FormLabel>
                      <Select value={f.value} onValueChange={(v) => { f.onChange(v); form.setValue("branch", COURSES[v].branches.length === 1 ? COURSES[v].branches[0] : ""); }}>
                        <FormControl><SelectTrigger className="h-12 rounded-xl bg-background" data-testid="select-course"><SelectValue placeholder="Select course" /></SelectTrigger></FormControl>
                        <SelectContent>{Object.entries(COURSES).map(([k, v]) => <SelectItem key={k} value={k}>{k} ({v.college})</SelectItem>)}</SelectContent>
                      </Select><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="branch" render={({ field: f }) => (
                    <FormItem><FormLabel>Branch</FormLabel>
                      <Select value={f.value} onValueChange={f.onChange} disabled={!course}>
                        <FormControl><SelectTrigger className="h-12 rounded-xl bg-background" data-testid="select-branch"><SelectValue placeholder={course ? "Select branch" : "Choose course first"} /></SelectTrigger></FormControl>
                        <SelectContent>{(COURSES[course]?.branches ?? []).map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
                      </Select><FormMessage /></FormItem>
                  )} />
                  {field("studentName", "Student name", "Full name")}
                  {field("fatherName", "Father's name")}
                  {field("phone", "Mobile number", "10-digit mobile", "tel")}
                  {field("tenthMarks", "10th marks / GPA", "e.g. 9.2 or 512")}
                  {field("interMarks", "Inter marks (if applicable)", "Optional")}
                  {field("village", "Village / Town")}
                  {field("mandal", "Mandal")}
                  {field("district", "District")}
                  <div className="sm:col-span-2">
                    <FormField control={form.control} name="address" render={({ field: f }) => (
                      <FormItem><FormLabel>Address</FormLabel><FormControl><Textarea rows={3} {...f} className="rounded-xl bg-background" data-testid="input-address" /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    <p className="text-xs text-muted-foreground max-w-md">Your details go to the admissions office only for follow-up. Submitting does not confirm admission.</p>
                    <button type="submit" className="rounded-full bg-accent text-accent-foreground font-bold px-8 py-4" data-testid="button-submit-enquiry">Submit enquiry</button>
                  </div>
                </form>
              </Form>
            </>
          )}
        </div>
      </section>
    </>
  );
}
