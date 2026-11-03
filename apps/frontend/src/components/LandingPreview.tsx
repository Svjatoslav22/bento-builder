const tileClass = "rounded-[20px] border border-[#26262c] bg-[#111114] p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[#5546c8] hover:shadow-[0_0_22px_rgba(109,91,255,0.12)]";
const labelClass = "text-[10px] font-medium uppercase tracking-[0.16em] text-[#8f8f9b]";

export default function LandingPreview() {
  return (
    <div aria-hidden="true" className="rounded-[28px] border border-[#26262c] bg-[#0e0e11]/90 p-3 shadow-[0_0_80px_rgba(109,91,255,0.08)] sm:p-5">
      <div className="mb-4 flex items-center justify-between px-1">
        <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#8E7FFF]" /><p className="text-xs font-medium text-[#c5c4ce]">Приклад профілю</p></div>
        <span className="rounded-full border border-[#292832] px-2.5 py-1 text-[10px] text-[#888792]">ПУБЛІЧНИЙ ПРОФІЛЬ</span>
      </div>
      <div className="grid grid-cols-6 auto-rows-[74px] gap-2.5 sm:auto-rows-[88px] sm:gap-3">
        <div className={`${tileClass} col-span-4 row-span-1 flex items-center gap-3 sm:col-span-3 sm:row-span-2`}>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#24212f] text-lg font-semibold text-[#b8afff]">М</div>
          <div className="min-w-0"><p className={labelClass}>Профіль</p><p className="mt-1 truncate text-sm font-semibold text-white">Марія Коваль</p><p className="text-xs text-[#9A9AA5]">Frontend-розробниця</p></div>
        </div>
        <div className={`${tileClass} col-span-2 row-span-1 flex flex-col justify-center sm:col-span-3`}>
          <p className={labelClass}>Портфоліо</p><p className="mt-2 text-sm font-semibold text-white">Вибрані роботи <span className="text-[#8E7FFF]">↗</span></p>
        </div>
        <div className={`${tileClass} col-span-3 row-span-1 sm:col-span-3`}>
          <p className={labelClass}>Стек технологій</p><div className="mt-2 flex flex-wrap gap-1.5"><span className="rounded-md bg-[#23222a] px-2 py-1 text-[10px] text-[#d7d5e1]">React</span><span className="rounded-md bg-[#23222a] px-2 py-1 text-[10px] text-[#d7d5e1]">TypeScript</span><span className="rounded-md bg-[#23222a] px-2 py-1 text-[10px] text-[#d7d5e1]">Next.js</span></div>
        </div>
        <div className={`${tileClass} col-span-3 row-span-1 sm:col-span-3`}>
          <p className={labelClass}>Локація</p><p className="mt-2 text-sm font-medium text-white">Київ, Україна</p>
        </div>
        <div className={`${tileClass} col-span-4 row-span-1 sm:col-span-4`}>
          <div className="flex items-center justify-between"><p className={labelClass}>Активність GitHub</p><span className="text-[10px] text-[#777781]">Останній рік</span></div>
          <div className="mt-3 grid grid-cols-12 gap-1">{Array.from({ length: 36 }, (_, index) => <span key={index} className={`aspect-square rounded-[3px] ${[2, 5, 8, 11, 13, 15, 18, 20, 23, 25, 28, 30, 33, 35].includes(index) ? "bg-[#6D5BFF]" : [4, 16, 27].includes(index) ? "bg-[#453a99]" : "bg-[#25242c]"}`} />)}</div>
        </div>
        <div className={`${tileClass} col-span-2 row-span-1 flex flex-col justify-between border-[#6D5BFF]/60 bg-[#6D5BFF] sm:col-span-2`}>
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/75">Резюме</p><p className="text-sm font-semibold text-white">Завантажити PDF <span>↓</span></p>
        </div>
      </div>
    </div>
  );
}
