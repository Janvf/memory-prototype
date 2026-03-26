import ClientTabs from "@/components/ClientTabs";

export default function ChanelProfile() {
  return (
    <div>
      <div className="mb-6">
        <span className="text-[11px] font-mono uppercase tracking-wider text-tag-text">
          Client Profile
        </span>
        <h1 className="text-[24px] font-medium text-primary mt-1">
          CHANEL
        </h1>
        <p className="text-[13px] text-secondary mt-0.5">
          Open Innovation · Venture Architect: Annie
        </p>
      </div>

      <ClientTabs />
    </div>
  );
}
