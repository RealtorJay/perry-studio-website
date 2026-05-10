"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="bg-ps-black text-white rounded-full px-5 py-2 text-[14px] font-semibold hover:bg-ps-black/90 transition-colors"
    >
      Print / Save as PDF
    </button>
  );
}
