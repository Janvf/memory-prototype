import Image from "next/image";
import ClientTabs from "@/components/ClientTabs";

export default function ChanelProfile() {
  return (
    <div className="animate-fade-in">
      {/* Premium Hero Section */}
      <div className="mb-16">
        {/* Client Profile label with black accent line */}
        <div className="underline-accent mb-6">
          <span className="text-[11px] font-mono uppercase tracking-wider text-chanel-gray">
            Client Profile
          </span>
        </div>

        {/* CHANEL Logo */}
        <div className="mb-4">
          <Image
            src="/chanel-logo.png"
            alt="CHANEL"
            width={180}
            height={100}
            className="h-auto w-[180px]"
            priority
          />
        </div>

        {/* Refined subtitle with dot separator */}
        <p className="text-[14px] text-chanel-gray mt-6 flex items-center gap-2">
          <span>Open Innovation</span>
          <span className="w-1 h-1 rounded-full bg-chanel-black" />
          <span>Venture Architect: Annie</span>
        </p>

        {/* Clean horizontal separator */}
        <div className="separator-luxury mt-10 w-full max-w-[120px]" />
      </div>

      <ClientTabs />
    </div>
  );
}
