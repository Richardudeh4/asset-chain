import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faqs() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full flex flex-col space-y-2.5"
    >
      <AccordionItem
        value="item-1"
        className="border border-[#1A2739] border-b-1 first:rounded-t-[5px]  cursor-pointer last:rounded-b-[5px] last:border-b  rounded-[5px]  bg-transparent py-2 px-4.5"
      >
        <AccordionTrigger className="hover:no-underline  cursor-pointer">
          What is a Bridge?
        </AccordionTrigger>
        <AccordionContent className="text-[15px] text-[#8298AF] font-[450]  cursor-pointer">
          Bridge is a decentralized application for token transfer between
          blockchain networks. It allows a user to swap a cryptocurrency from
          one blockchain to another without the necessity of its selling.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="item-2"
        className="border border-[#1A2739] border-b-1 first:rounded-t-[5px]  cursor-pointer last:rounded-b-[5px] rounded-[5px]  last:border-b bg-transparent py-2 px-4.5"
      >
        <AccordionTrigger className="hover:no-underline  cursor-pointer">
          How does a bridge work
        </AccordionTrigger>
        <AccordionContent className="text-[15px] text-[#8298AF]  cursor-pointer font-[450]">
          A user has to make two transactions because transfer executes between
          two networks. Thus, the first transaction is sending of tokens to the
          smart contract of the first blockchain. After this, it is possible to
          get tokens from the smart contract of the second blockchain.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="item-3"
        className="border border-[#1A2739] border-b-1 first:rounded-t-[5px]  cursor-pointer last:rounded-b-[5px]  rounded-[5px]  last:border-b bg-transparent py-2 px-4.5"
      >
        <AccordionTrigger className="hover:no-underline  cursor-pointer">
          What functionality does a bridge have
        </AccordionTrigger>
        <AccordionContent className="text-[15px] text-[#8298AF] font-[450]  cursor-pointer">
          - Connect a self-custody wallet (MetaMask, WalletConnect, OKX, MAD
          Wallet) 
          - Check on tokens balance- Get information about an amount of
          tokens that would be received after the transfer; 
          - Transfer of tokens from one network to another and vice versa.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
//   } from "@/components/ui/accordion"

//   export function Faqs() {
//     return (
//       <Accordion type="single" collapsible className="w-full flex flex-col space-y-2.5">
//         <AccordionItem value="item-1" className="border border-[#1A2739] bg-transparent rounded-[5px] py-2.5 px-4.5">
//           <AccordionTrigger className="hover:no-underline">Why do i need it?</AccordionTrigger>
//           <AccordionContent className="text-[15px] text-[#8298AF] font-[450]">
//           If you are new to Asset Chain you will need a small amount of juice  to get started. Click the button below to see magic
//           </AccordionContent>
//         </AccordionItem>
//         <AccordionItem value="item-2"  className="border border-[#1A2739] bg-transparent rounded-[5px] py-2.5 px-4.5">
//           <AccordionTrigger className="hover:no-underline">What’s Asset Chain Gasoline Station</AccordionTrigger>
//           <AccordionContent  className="text-[15px] text-[#8298AF] font-[450]">
//           If you are new to Asset Chain you will need a small amount of juice  to get started. Click the button below to see magic
//           </AccordionContent>
//         </AccordionItem>
//         <AccordionItem value="item-3"  className="border border-[#1A2739] bg-transparent  rounded-[5px] py-2.5 px-4.5">
//           <AccordionTrigger className="hover:no-underline">What’s Asset Chain Gasoline Station</AccordionTrigger>
//           <AccordionContent  className="text-[15px] text-[#8298AF] font-[450]">
//           If you are new to Asset Chain you will need a small amount of juice  to get started. Click the button below to see magic
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>
//     )
//   }
