import { Link } from "wouter";
import { ArrowRight, Info } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Container, PageHeader, ToBePublished } from "@/components/layout";
import { DISCLOSURE, UGC_GUIDELINE, UGC_REF, LAST_UPDATED } from "@/data/site";
import { IMG } from "@/data/images";

export default function Disclosure() {
  const total = DISCLOSURE.reduce((n, s) => n + s.items.length, 0);
  const avail = DISCLOSURE.reduce((n, s) => n + s.items.filter((i) => i.href).length, 0);
  const pct = (avail / total) * 100;
  return (
    <>
      <PageHeader img={IMG.libraryEngineering} eyebrow="Mandatory Disclosure" title="UGC Public Self-Disclosure" sub={`Published in accordance with the ${UGC_GUIDELINE}, issued vide ${UGC_REF}.`} crumbs={[["Information Corner", "/notices"], ["UGC Public Self-Disclosure"]]} />
      <Container className="mt-16">
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <div className="flex gap-4 text-[15px] text-foreground/85 leading-relaxed border rounded-lg bg-card p-7">
            <Info className="w-5 h-5 text-[hsl(var(--primary))] shrink-0 mt-1" />
            <p>All information below is openly accessible without login. Items marked <span className="font-semibold">View</span> link to the section of this website where the information is published. Items marked <span className="font-semibold">To be published</span> are being compiled by the institution and will be added on this page. Last reviewed: {LAST_UPDATED}.</p>
          </div>
          <div className="rounded-lg bg-[hsl(var(--teal-deep))] text-white p-7" data-testid="text-disclosure-count">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--brass))]">Publication status</div>
            <div className="mt-3 flex items-baseline gap-2"><span className="num-display text-[40px]">{avail}</span><span className="text-white/70">of {total} items published</span></div>
            <div className="mt-4 h-1.5 rounded-full bg-white/15 overflow-hidden" aria-hidden><div className="h-full bg-[hsl(var(--brass))]" style={{ width: `${pct}%` }} /></div>
          </div>
        </div>

        <div className="mt-14 grid lg:grid-cols-[260px_1fr] gap-10 items-start">
          <nav aria-label="Disclosure sections" className="lg:sticky lg:top-[100px]">
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3">Section index</div>
            <ul className="flex flex-wrap lg:flex-col gap-1.5 lg:gap-0 lg:border-l">
              {DISCLOSURE.map((s) => {
                const n = s.items.filter((i) => i.href).length;
                return (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="group flex items-center gap-3 lg:-ml-px lg:border-l-2 border-transparent hover:border-[hsl(var(--accent))] px-3 py-2 text-[13.5px] rounded-lg lg:rounded-none border lg:border-y-0 lg:border-r-0 bg-card lg:bg-transparent" data-testid={`link-disc-jump-${s.id}`}>
                      <span className="font-mono text-[12px] text-[hsl(var(--accent))]">({s.letter})</span>
                      <span className="flex-1 group-hover:text-[hsl(var(--primary))]">{s.title}</span>
                      <span className="hidden lg:inline font-mono text-[11px] text-muted-foreground">{n}/{s.items.length}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Accordion type="multiple" defaultValue={DISCLOSURE.map((s) => s.id)} className="space-y-4 min-w-0">
            {DISCLOSURE.map((s) => (
              <AccordionItem key={s.id} value={s.id} id={s.id} className="scroll-mt-36 border rounded-lg bg-card overflow-hidden">
                <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-[hsl(var(--sand)/0.6)]" data-testid={`button-disc-${s.id}`}>
                  <span className="flex items-center gap-4 text-left">
                    <span className="num-display text-[26px] w-8 text-[hsl(var(--accent))]">{s.letter}</span>
                    <span><span className="block font-display text-[18px] leading-tight text-[hsl(var(--primary))]">{s.title}</span><span className="block text-[12px] text-muted-foreground font-normal mt-1">{s.items.filter((i) => i.href).length} of {s.items.length} published</span></span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-0">
                  <div className="overflow-x-auto border-t">
                    <table className="w-full text-[14px]">
                      <thead className="text-left uppercase">
                        <tr><th scope="col" className="px-6 py-3 w-20">S.No.</th><th scope="col" className="px-6 py-3">Particulars</th><th scope="col" className="px-6 py-3 w-44">Status</th></tr>
                      </thead>
                      <tbody className="divide-y">
                        {s.items.map((d, i) => (
                          <tr key={d.label} data-testid={`row-disc-${s.id}-${i}`}>
                            <td className="px-6 py-3.5 font-mono text-[12px] text-muted-foreground">{s.letter}.{i + 1}</td>
                            <td className="px-6 py-3.5">{d.label}</td>
                            <td className="px-6 py-3.5">{d.href ? <Link href={d.href} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[12.5px] font-semibold bg-[hsl(var(--secondary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white transition-colors" data-testid={`link-disc-${s.id}-${i}`}><span className="w-1.5 h-1.5 rounded-full bg-current" />View <ArrowRight className="w-3.5 h-3.5" /></Link> : <ToBePublished testid={`status-disc-${s.id}-${i}`} />}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </>
  );
}
