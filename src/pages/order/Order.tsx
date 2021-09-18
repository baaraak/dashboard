import { useMutation } from "react-query";

import { DocumentProvider } from "context/document";

import api from "services/api";
import Document from "modules/document/Document";
import { Heading } from "@chakra-ui/react";

export default function Order() {
  const mutation = useMutation(api.greenInvoice.priceQuote);

  return (
    <DocumentProvider>
      <>
        <Heading size="lg" fontWeight="regular">
          יצירת הזמנה
        </Heading>
        <Document {...mutation} />
      </>
    </DocumentProvider>
  );
}
