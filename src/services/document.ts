import { Details, DocumentItem } from "context/document";
import { Company } from "types/Company";

export const transformFields = (
  company: Company | null,
  details: Details,
  catalog: DocumentItem[],
) => {
  let hasDiscount = catalog.filter((o) => o.name === "הנחה")[0];
  const client = {
    id: company?.id,
    name: details.name,
    emails: [details.email],
    taxId: details.taxId,
  };
  let discount;
  if (hasDiscount) {
    discount = { amount: Number(hasDiscount.discount), type: "percentage" };
  }
  return { discount, client };
};
