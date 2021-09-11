import { useMutation } from "react-query";

import { DocumentProvider } from "context/document";

import api from "services/api";
import Document from "modules/document/Document";
import { Heading, Stack } from "@chakra-ui/react";

export default function Order() {
  const mutation = useMutation(api.greenInvoice.priceQuote);

  return (
    <DocumentProvider>
      <Stack spacing={6} maxW="95%" w={{ md: "6xl" }} m="0 auto">
        <Heading size="lg" fontWeight="regular">
          יצירת הזמנה
        </Heading>
        <Document {...mutation} />
      </Stack>
    </DocumentProvider>
  );
}
