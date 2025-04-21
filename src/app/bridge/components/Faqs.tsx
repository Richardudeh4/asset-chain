import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export function Faqs() {
    return (
      <Accordion type="single" collapsible className="w-full flex flex-col space-y-2.5">
        <AccordionItem value="item-1" className="border border-[#1A2739] bg-transparent rounded-[5px] py-2.5 px-3.5">
          <AccordionTrigger className="hover:transition-none">Why do i need it?</AccordionTrigger>
          <AccordionContent className="text-[15px] text-[#8298AF] font-[450]">
          If you are new to Asset Chain you will need a small amount of juice  to get started. Click the button below to see magic
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2"  className="border border-[#1A2739] bg-transparent rounded-[5px] py-2.5 px-3.5">
          <AccordionTrigger className="text-[16px] font-[450]">What’s Asset Chain Gasoline Station</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3"  className="border border-[#1A2739] bg-transparent z-30 rounded-[5px] py-2.5 px-3.5">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It's animated by default, but you can disable it if you prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  