import logoMikuva from "@/assets/marca/cropped-LOGO-MIKUVA.gif";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src={logoMikuva}
      alt="Mikuva, digitalización de fotografías"
      width={729}
      height={250}
      className={`h-9 w-auto mix-blend-multiply sm:h-10 ${className}`}
    />
  );
}
