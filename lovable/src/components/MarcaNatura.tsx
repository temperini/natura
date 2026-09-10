import wordmark from "@/assets/natura-wordmark.png.asset.json";

export function MarcaNatura() {
  return (
    <div className="bg-primary">
      <div className="mx-auto flex w-full max-w-xl items-center justify-between px-4 py-3">
        <img src={wordmark.url} alt="Natura" className="h-5 w-auto" />
        <span className="text-xs font-medium tracking-wide text-primary-foreground/80">
          Radar de Ativação
        </span>
      </div>
    </div>
  );
}
