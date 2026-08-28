export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <span
        aria-hidden
        className="inline-block h-4 w-4 rounded-[3px] border-2 border-primary"
      />
      <span className="font-serif text-2xl tracking-tight text-foreground">Mikuva</span>
    </span>
  );
}
