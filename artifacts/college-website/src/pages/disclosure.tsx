import { Link } from "wouter";
import { ArrowRight, Info } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Container, PageHeader, ToBePublished } from "@/components/layout";
import { DISCLOSURE, UGC_GUIDELINE, UGC_REF, LAST_UPDATED } from "@/data/site";

export default function Disclosure() {
  const total = DISCLOSURE.reduce((n, s) => n + s.items.length, 0);
  const avail = DISCLOSURE.reduce((n, s) => n + s.items.filter((i) => i.href).length, 0);
  return (
    <>
      <PageHeader eyebrow="Mandatory Disclosure" title="UGC Public Self-Disclosure" sub={`Published in accordance with the ${UGC_GUIDELINE}, issued vide ${UGC_REF}.`} crumbs={[["Information Corner", "/notices"], ["UGC Public Self-Disclosure"]]} />
      <Container className="mt-12">
        <div className="grid md:grid-cols-[1fr_auto] gap-6 items-start border rounded-md bg-card p-5">
          <div className="flex gap-3 text-[14px] text-foreground/85 leading-relaxed">
            <Info className="w-5 h-5 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
            <p>All information below is openly accessible without login. Items marked <span className="font-semibold">View</span> link to the section of this website where the information is published. Items marked <span className="font-semibold">To be published</span> are being compiled by the institution and will be added on this page. Last reviewed: {LAST_UPDATED}.</p>
          </div>
          <div className="text-[13px] text-muted-foreground whitespace-nowrap" data-testid="text-disclosure-count"><span className="font-display text-2xl text-[hsl(var(--primary))]">{avail}</span> of {total} items published</div>
        </div>

        <nav aria-label="Disclosure sections" className="mt-8 flex flex-wrap gap-2">
          {DISCLOSURE.map((s) => <a key={s.id} href={`#${s.id}`} className="text-[13px] px-3 py-1.5 rounded-sm border bg-card hover:bg-secondary" data-testid={`link-disc-jump-${s.id}`}>({s.letter}) {s.title}</a>)}
        </nav>

        <Accordion type="multiple" defaultValue={DISCLOSURE.map((s) => s.id)} className="mt-8 border rounded-md bg-card">
          {DISCLOSURE.map((s) => (
            <AccordionItem key={s.id} value={s.id} id={s.id} className="scroll-mt-36 last:border-b-0">
              <AccordionTrigger className="px-5 hover:no-underline hover:bg-secondary/50" data-testid={`button-disc-${s.id}`}>
                <span className="flex items-center gap-3 text-left"><span className="w-8 h-8 rounded-sm bg-primary text-primary-foreground grid place-items-center text-[13px] font-semibold uppercase">{s.letter}</span><span className="font-display text-lg text-[hsl(var(--primary))]">{s.title}</span><span className="text-[12px] text-muted-foreground font-normal">{s.items.length} items</span></span>
              </AccordionTrigger>
              <AccordionContent className="px-0 pb-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-[14px]">
                    <thead className="bg-secondary/60 text-left text-[12px] uppercase tracking-wider text-muted-foreground">
                      <tr><th scope="col" className="px-5 py-2.5 w-16">S.No.</th><th scope="col" className="px-5 py-2.5">Particulars</th><th scope="col" className="px-5 py-2.5 w-44">Status</th></tr>
                    </thead>
                    <tbody className="divide-y">
                      {s.items.map((d, i) => (
                        <tr key={d.label} data-testid={`row-disc-${s.id}-${i}`}>
                          <td className="px-5 py-3 text-muted-foreground">{s.letter}.{i + 1}</td>
                          <td className="px-5 py-3">{d.label}</td>
                          <td className="px-5 py-3">{d.href ? <Link href={d.href} className="inline-flex items-center gap-1 font-semibold text-[hsl(var(--primary))] hover:underline" data-testid={`link-disc-${s.id}-${i}`}>View <ArrowRight className="w-3.5 h-3.5" /></Link> : <ToBePublished testid={`status-disc-${s.id}-${i}`} />}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </>
  );
}
