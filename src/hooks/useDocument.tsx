import { useState } from "react";
import { Company } from "../types/Company";

export function useDocument() {
  const [company, setCompany] = useState<Company | null>();

  return { company, setCompany };
}
