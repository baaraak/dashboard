import React, { useState } from "react";
import { Company } from "../types/Company";

export type Details = {
  contactPerson: string;
  name: string;
  email: string;
  taxId: string;
  data: string;
  dueDate: Date;
};

type DocumentContextType = {
  company: Company | null;
  setCompany: (company: Company | null) => void;
  setDetails: (details: Details | null) => void;
  catalog: any;
  details: any;
};

const DocumentContext = React.createContext<DocumentContextType>({
  company: null,
  setCompany: () => {},
  setDetails: () => {},
  details: "",
  catalog: "",
});

function DocumentProvider({ children }: { children: React.ReactChild }) {
  const [company, setCompany] = useState<Company | null>(null);
  const [details, setDetails] = useState<Details | null>(null);
  const [catalog, setCatalog] = useState(null);

  return (
    <DocumentContext.Provider
      value={{ company, setCompany, catalog, details, setDetails }}
      children={children}
    />
  );
}

function useDocument() {
  const context = React.useContext(DocumentContext);
  return context;
}

export { DocumentProvider, useDocument };
