import { useState } from "react";

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className="min-w-0">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        {current && (
          <img
            src={current}
            alt={`${name}, vista ${active + 1}`}
            width={1200}
            height={900}
            className="aspect-[4/3] w-full object-cover"
          />
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-3 gap-3" role="group" aria-label="Vistas del servicio">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Mostrar vista ${index + 1}`}
              aria-pressed={active === index}
              className={`overflow-hidden rounded-md border-2 ${active === index ? "border-primary" : "border-transparent"}`}
            >
              <img src={image} alt="" className="aspect-[4/3] w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
