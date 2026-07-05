import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full px-2 md:px-4 mt-auto">
      <div className="bg-[#f0f4ef] rounded-t-[24px] md:rounded-t-[32px] px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-6 w-full max-w-[1440px] mx-auto">
        
        {/* Left Section: Logo & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="relative h-12 w-[110px] shrink-0">
            <Image
              src="/images/maskot-temantumbuh.jpg"
              alt="Teman Tumbuh Logo"
              fill
              className="object-contain mix-blend-multiply drop-shadow-sm"
              priority
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 text-[14px] text-[#4a5c50]">
            <span className="font-bold">&copy; 2026 Teman Tumbuh.</span>
            <span className="font-bold">A sanctuary for growth.</span>
          </div>
        </div>

        {/* Right Section: Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-[14px] text-[#788a7e] font-medium tracking-wide">
          <Link href="/community-guidelines" className="hover:text-[#4a5c50] transition-colors">
            Community Guidelines
          </Link>
          <Link href="/privacy-policy" className="hover:text-[#4a5c50] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:text-[#4a5c50] transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
