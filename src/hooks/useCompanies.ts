import { useQuery } from "react-query";
import api from "services/api";

export function useCompanies() {
  return useQuery("companies", () =>
    api.greenInvoice.companies().then((res) => res.companies),
  );
}
