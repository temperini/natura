import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

function iniciais(nome: string) {
  return nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export function AvatarConsultora({
  nome,
  src,
  className,
}: {
  nome: string;
  src: string;
  className?: string;
}) {
  return (
    <Avatar className={cn("size-12 border border-border", className)}>
      <AvatarImage src={src} alt={`Foto de ${nome}`} />
      <AvatarFallback className="bg-secondary font-semibold text-secondary-foreground">
        {iniciais(nome)}
      </AvatarFallback>
    </Avatar>
  );
}
