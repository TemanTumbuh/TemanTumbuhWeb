import Link from "next/link";
import type { ReactNode } from "react";
import Image from "next/image";

type AuthShellProps = {
  title: string;
  subtitle?: string;
  alternatePrompt: string;
  alternateHref: string;
  alternateLabel: string;
  children: ReactNode;
  logo?: ReactNode;
};

export default function AuthShell({
  title,
  subtitle,
  alternatePrompt,
  alternateHref,
  alternateLabel,
  children,
  logo,
}: AuthShellProps) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#fefefb]">
      <BackgroundShapes />

      <div className="relative flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full max-w-[512px] rounded-[2rem] bg-white px-6 py-7 shadow-[0_16px_40px_rgba(50,72,42,0.1)]">
          <div className="flex flex-col items-center text-center">
            <Link
              href="/"
              className="mb-4 inline-flex items-center justify-center"
            >
              {logo ?? <DefaultAuthLogo />}
            </Link>

            <h1 className="text-[1.4rem] leading-[1.15] font-semibold tracking-[-0.04em] text-[#212a24] sm:text-[2.2rem]">
              {title}
            </h1>

            {subtitle ? (
              <p className="mt-3 max-w-[32ch] text-[0.8rem] leading-6 text-[#7a857d] sm:text-[0.95rem]">
                {subtitle}
              </p>
            ) : null}
          </div>

          {children}

          <p className="mt-4 text-center text-[0.72rem] leading-5 text-[#667168] sm:mt-5">
            {alternatePrompt}{" "}
            <Link
              href={alternateHref}
              className="font-semibold text-[#2f4f24] transition hover:text-[#22381b]"
            >
              {alternateLabel}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

function BackgroundShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <Image
        src="/images/bg-auth-page.png"
        alt="Authentication Background"
        fill
        className="object-cover object-center"
        priority
        quality={90}
      />
    </div>
  );
}

function DefaultAuthLogo() {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="/images/maskot-temantumbuh.jpg"
        alt="Teman Tumbuh"
        width={120}
        height={40}
        priority
        className="object-contain"
      />
    </div>
  );
}
