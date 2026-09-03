import type { ReactNode } from "react";

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  introduction: string;
  children: ReactNode;
};

export function LegalDocument({ eyebrow, title, introduction, children }: LegalDocumentProps) {
  return (
    <main>
      <header className="border-b border-border bg-ivory">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-16 lg:px-8 lg:py-20">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display mt-4 max-w-4xl text-4xl sm:text-5xl md:text-6xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {introduction}
          </p>
          <p className="mt-8 border-l-2 border-primary pl-4 text-xs leading-6 text-muted-foreground">
            Última actualización: 2 de septiembre de 2026
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-20 lg:px-8 lg:py-20">
        <article className="legal-document min-w-0 max-w-3xl">{children}</article>
        <aside className="order-first border-b border-border pb-6 lg:order-last lg:border-b-0 lg:border-l lg:pb-0 lg:pl-6">
          <p className="eyebrow">Identificación</p>
          <dl className="mt-4 space-y-4 text-sm leading-6">
            <div>
              <dt className="font-semibold text-foreground">Responsable</dt>
              <dd className="text-muted-foreground">Arguz Digitalización S.A. de C.V.</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Marca</dt>
              <dd className="text-muted-foreground">Mikuva</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Aplicación</dt>
              <dd className="text-muted-foreground">Servicios prestados en México</dd>
            </div>
          </dl>
        </aside>
      </div>
    </main>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={id + "-title"}>
      <h2 id={id + "-title"}>{title}</h2>
      {children}
    </section>
  );
}
