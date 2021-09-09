import React, { useState } from "react";
import { Company } from "types/Company";

export type Details = {
  contactPerson: string;
  name: string;
  email: string;
  taxId: string;
  data: string;
  dueDate: Date;
};

export type DocumentItem = {
  name: string;
  quantity: number;
  discount?: number;
  price?: number;
};

type DocumentContextType = {
  company: Company | null;
  setCompany: (company: Company | null) => void;
  setDetails: (details: Details | null) => void;
  setCatalog: (catalogItem: DocumentItem[]) => void;
  catalog: DocumentItem[];
  details: Details | null;
};

const DocumentContext = React.createContext<DocumentContextType>({
  company: null,
  setCompany: () => {},
  setDetails: () => {},
  setCatalog: () => {},
  details: null,
  catalog: [],
});

function DocumentProvider({ children }: { children: React.ReactChild }) {
  const [company, setCompany] = useState<Company | null>(null);
  const [details, setDetails] = useState<Details | null>(null);
  const [catalog, setCatalog] = useState<DocumentItem[]>([]);

  return (
    <DocumentContext.Provider
      value={{
        company,
        setCompany,
        catalog,
        details,
        setDetails,
        setCatalog,
      }}
      children={children}
    />
  );
}

function useDocument() {
  const context = React.useContext(DocumentContext);
  return context;
}

export { DocumentProvider, useDocument };
