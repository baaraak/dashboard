import { DocumentItem } from "context/document";

export const getCatalogLength = (catalog: DocumentItem[]) =>
  catalog.reduce((s, v) => (s += Number(v.quantity)), 0);

export const getCatalogPriceSum = (catalog: DocumentItem[]) => {
  const sum = catalog.reduce(
    (s, v) => (v.discount ? s : (s += Number(v.price) * Number(v.quantity))),
    0,
  );
  const hasDiscount = catalog.filter((o) => o.name === "הנחה")[0];
  if (hasDiscount) {
    return sum - sum * (Number(hasDiscount.discount) / 100);
  }
  return sum.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};
