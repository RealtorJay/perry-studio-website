interface SectionLabelProps {
  children: React.ReactNode;
  light?: boolean;
  center?: boolean;
}

export default function SectionLabel({
  children,
  light,
  center,
}: SectionLabelProps) {
  return (
    <p
      className={`text-[12px] font-semibold uppercase tracking-[0.15em] flex items-center gap-3 ${
        light ? "text-[#666]" : "text-ps-black/50"
      } ${center ? "justify-center" : ""}`}
    >
      <span
        className={`inline-block w-8 h-[1.5px] ${
          light ? "bg-white/20" : "bg-ps-black/20"
        }`}
      />
      {children}
    </p>
  );
}
