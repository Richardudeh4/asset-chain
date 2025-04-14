import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import polygon from "../../../../public/assets/polygon.svg";
import assetChain from "../../../../public/assets/assetChain.svg";
import greenCheck from "../../../../public/assets/greenCheck.svg";
import message from "../../../../public/assets/message.svg";
import { useWallet } from "@/context/web3";

const transactionCategory = [
  { name: "All" },
  { name: "Claimed" },
  { name: "Unclaimed" },
];

export function TransactionList() {
  const { isConnected } = useWallet();
  return (
    <div className="py-3 px-5 border border-[#1A2739] z-30 bg-[#070E17] rounded-[10px]">
      <div className="flex flex-col gap-[3px] z-50">
        <p className="text-[16px] font-[450] leading-[145%] font-circular text-white">
          Transaction History
        </p>
        <p className="text-[#8298AF] text-[15px] ">
          View and claim bridged asset
        </p>
        <Separator className="my-4 bg-[#1A2739]" />
        {isConnected ? (
          <>
            <div className="px-1.5 py-2 flex flex-row justify-between items-center rounded-[54.11px] bg-[#030A13] overflow-x-auto w-full">
              {transactionCategory.map((item, index) => (
                <div
                  key={index}
                  className={`px-2 py-1 border border-transparent flex justify-center items-center ${
                    index === 0
                      ? "bg-[#3CC9CD] text-[#000000] rounded-[66.18px] w-[84.64px]"
                      : ""
                  }`}
                >
                  <p
                    className={`text-[#8298AF] ${
                      index === 0 ? "text-black " : ""
                    } text-[14px] font-[450] leading-[145%] font-circular`}
                  >
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
            <div className="px-3 bg-[#070E17] border border-[#1A2739] py-3 flex flex-col gap-5 rounded-[5px]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="flex flex-row space-x-2.5">
                  <div className="flex flex-row -space-x-5">
                    <Image
                      src={polygon || "/placeholder.svg"}
                      alt="polygon"
                      width={42}
                      height={42}
                      className="z-20"
                    />
                    <Image
                      src={assetChain || "/placeholder.svg"}
                      alt="assetChain"
                      width={42}
                      height={42}
                      className="z-40"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <h1 className="text-[#8298AF] font-[450] text-[14px]">
                      Bridged asset
                    </h1>
                    <h1 className="text-[#FFFFFF] text-[16px] font-[450]">
                      340,345, USDC
                    </h1>
                  </div>
                </div>
                <h1 className="text-[#8298AF] text-[14px] font-[450]">
                  17-05-2056 23:78
                </h1>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-1.5">
                  <h1 className="text-[#8298AF] text-[14px] font-[450]">
                    Block Verfication
                  </h1>
                  <div className="flex flex-row space-x-1 items-center">
                    <h1 className="text-[16px] font-[450] font-circular">
                      [ 100% ]
                    </h1>
                    <Image
                      src={greenCheck || "/placeholder.svg"}
                      alt="greenCheck"
                      width={16}
                      height={16}
                    />
                    <p className="text-[16px] pl-1 font-[450] text-[#00F482] font-circular">
                      Verifed
                    </p>
                  </div>
                </div>
                <Button className="bg-[#2042B8] cursor-pointer w-[139px] rounded-[25.26px]">
                  Claim
                </Button>
              </div>
            </div>
            <div className="px-3 bg-[#070E17] border border-[#1A2739] py-3 flex flex-col gap-5 rounded-[5px]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="flex flex-row space-x-2.5">
                  <div className="flex flex-row -space-x-5">
                    <Image
                      src={polygon || "/placeholder.svg"}
                      alt="polygon"
                      width={42}
                      height={42}
                      className="z-20"
                    />
                    <Image
                      src={assetChain || "/placeholder.svg"}
                      alt="assetChain"
                      width={42}
                      height={42}
                      className="z-40"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <h1 className="text-[#8298AF] font-[450] text-[14px]">
                      Bridged asset
                    </h1>
                    <h1 className="text-[#FFFFFF] text-[16px] font-[450]">
                      340,345, USDC
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <h1 className="text-[#8298AF] text-[14px] font-[450]">
                    17-05-2056 23:78
                  </h1>
                  <Button className="font-italic text-[14px] font-[450] text-[#5CFFF3] cursor-pointer bg-[#040A13] w-[86px] rounded-[22px]">
                    Trx Hash
                  </Button>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-1.5">
                  <h1 className="text-[#8298AF] text-[14px] font-[450]">
                    Block Verfication
                  </h1>
                  <div className="flex flex-row space-x-1 items-center">
                    <h1 className="text-[16px] font-[450] font-circular">
                      [ 100% ]
                    </h1>
                    <Image
                      src={greenCheck || "/placeholder.svg"}
                      alt="greenCheck"
                      width={16}
                      height={16}
                    />
                    <p className="text-[16px] pl-1 font-[450] text-[#00F482] font-circular">
                      Verifed
                    </p>
                  </div>
                </div>
                <Button className="bg-[#070E17] w-[139px] rounded-[25.26px] cursor-pointer border border-[#213040]">
                  Claimed
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col gap-6 md:justify-center md:mt-28 items-center">
                <Image
                  src={message}
                  alt="message"
                  className="w-[120px] h-[120px] md:w-[149px] md:h-[149px]"
                />
                <p className="font-[450] text-[14px] font-circular text-[#8298AF]">
                  Connect wallet to see transaction here
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
