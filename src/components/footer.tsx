import { isProd } from "@/config/env-var";
import localFont from "next/font/local";
import Link from "next/link";
import React from "react";

const circularStd = localFont({
  src: "../../public/fonts/CircularStd-Medium.woff2",
});

const explorer = isProd
  ? "https://scan.assetchain.org/"
  : "https://scan-testnet.assetchain.org/";

const Footer = () => {
  return (
    <div
      className={`px-4 sm:px-8 md:px-[47.38px] py-4 sm:py-6 md:py-[27.43px] flex flex-col md:flex-row justify-between items-center ${circularStd.className}`}
    >
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 text-[#8298AF] text-xs sm:text-sm md:text-[14px] font-medium mb-3 md:mb-0">
        <Link href={"#"}>
          <p>Give Feedback</p>
        </Link>
        <Link href={"https://assetchain.org/"} target="_blank">
          <p>Support</p>
        </Link>
        <Link href={explorer} target="_blank">
          <p>Explorer</p>
        </Link>

        <Link href={"https://docs.assetchain.org/"} target="_blank">
          <p>Docs</p>
        </Link>
      </div>
      <div className="text-[#8298AF] font-medium text-xs sm:text-sm md:text-[14px]">
        <p>Version 1.2</p>
      </div>
    </div>
  );
};

export default Footer;
