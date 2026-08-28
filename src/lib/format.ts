const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

export function formatPrice(value: number): string {
  return currency.format(value);
}

const number = new Intl.NumberFormat("es-MX");

export function formatNumber(value: number): string {
  return number.format(value);
}

export function orderFolio(sequence: number, year = new Date().getFullYear()): string {
  return `MK-${year}-${String(sequence).padStart(5, "0")}`;
}
