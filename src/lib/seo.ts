export function routeMeta(title: string, description: string) {
  return [
    { title: `${title} — Mikuva` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} — Mikuva` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
  ];
}
