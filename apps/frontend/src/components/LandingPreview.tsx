const tileClass = "rounded-lg border border-border bg-surface-elevated p-3 text-left";
const labelClass = "text-[10px] font-medium uppercase tracking-[0.15em] text-text-secondary";

export default function LandingPreview() {
  return (
    <div aria-hidden="true" className="mx-auto mt-6 grid max-w-sm grid-cols-2 gap-2">
      <div className={`${tileClass} col-span-2 flex items-center gap-3`}>
        <div className="h-10 w-10 flex-shrink-0 rounded-full border border-border bg-surface" />
        <div className="min-w-0">
          <p className={labelClass}>Профіль</p>
          <p className="mt-0.5 text-sm font-medium text-text-primary">Ім&apos;я та роль</p>
        </div>
      </div>
      <div className={tileClass}>
        <p className={labelClass}>Портфоліо</p>
        <p className="mt-1 text-xs text-text-secondary">Ваші роботи</p>
      </div>
      <div className={tileClass}>
        <p className={labelClass}>Локація</p>
        <p className="mt-1 text-xs text-text-secondary">Місто та час</p>
      </div>
      <div className={`${tileClass} col-span-2`}>
        <p className={labelClass}>Резюме</p>
        <p className="mt-1 text-xs text-text-secondary">Резюме у форматі PDF</p>
      </div>
    </div>
  );
}
