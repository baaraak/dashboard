import {
  Button,
  Stack,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { useMutation } from "react-query";

import CompaniesList from "modules/document/companies-list";
import DocumentForm from "modules/document/document-form";
import PlataCatalog from "modules/document/plata-catalog/PlataCatalog";
import DocumentSummary from "modules/document/document-summary";
import DocumentSuccess from "modules/document/document-success";

import { Details, DocumentProvider, useDocument } from "context/document";
import { useCompanies } from "hooks/useCompanies";
import Skeletons from "components/skeletons";
import { Company } from "types/Company";
import { transformFields } from "services/document";
import api from "services/api";

const Invoice = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const { data: companies, isLoading: isCompaniesLoading } = useCompanies();
  const { company, details, catalog, setCompany, setDetails, setCatalog } =
    useDocument();
  const {
    mutate: createInvoice,
    isLoading,
    data,
    reset: resetMutation,
  } = useMutation(api.greenInvoice.invoice);

  const handleSelectCompany = (id?: string) => {
    if (id !== company?.id && details) {
      // if user select new company, remove old details fields
      setDetails(null);
    }
    if (id) {
      setCompany(companies.filter((c: Company) => c.id === id)[0]);
    } else {
      // continue-without/remove client
      setCompany(null);
    }
    nextStep();
  };

  const handleDocumentDetails = (details: Details) => {
    setDetails(details);
    nextStep();
  };

  const onSubmit = () => {
    if (details === null) return;
    const fields = transformFields(company, details, catalog);

    createInvoice({
      order: catalog.filter((o) => o.name !== "הנחה"),
      data: details.data,
      dueDate: details.dueDate ?? new Date(),
      ...fields,
    });
  };

  const onReset = () => {
    setCompany(null);
    setDetails(null);
    setCatalog([]);
    reset();
    resetMutation();
  };

  return (
    <Stack spacing={6} maxW="95%" w={{ md: "6xl" }} m="0 auto">
      <Steps colorScheme="facebook" activeStep={activeStep} mb={12}>
        <Step label="לקוח" key="לקוח" description="בחירת לקוח">
          {isCompaniesLoading ? (
            <Skeletons length={10} stackSpace={12} />
          ) : (
            <CompaniesList
              companies={companies}
              onSelect={handleSelectCompany}
            />
          )}
        </Step>
        <Step label="פרטים" key="פרטים" description="הכנס את פרטי הלקוח">
          <DocumentForm
            details={details}
            onSubmit={handleDocumentDetails}
            company={company}
          />
        </Step>

        <Step label="קטלוג" key="קטלוג" description="בחר מוצרים">
          <PlataCatalog catalog={catalog} onChange={setCatalog} />
        </Step>
        <Step
          label="סיכום"
          key="סיכום"
          description="סיכום ההזמנה"
          isCompletedStep={!!data?.success}
        >
          {data?.error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>שגיאה</AlertTitle>
              <AlertDescription>{data.error}</AlertDescription>
            </Alert>
          )}
          {data?.success ? (
            <DocumentSuccess {...data} onReset={onReset} />
          ) : (
            <DocumentSummary
              onSubmit={onSubmit}
              details={details}
              catalog={catalog}
              isLoading={isLoading}
            />
          )}
        </Step>
      </Steps>

      {!data?.success && (
        <Flex width="100%" justify="flex-end">
          <Button
            ml={4}
            variant="ghost"
            onClick={prevStep}
            colorScheme="facebook"
            disabled={activeStep === 0}
          >
            אחורה
          </Button>
          <Button
            colorScheme="facebook"
            onClick={nextStep}
            disabled={checkDisableButton(activeStep, details, catalog)}
          >
            הבא
          </Button>
        </Flex>
      )}
    </Stack>
  );
};

function checkDisableButton(
  activeStep: number,
  details: any,
  catalog: any,
): boolean {
  if (activeStep === 0) return true;
  if (activeStep === 1 && !details?.name) return true;
  if (activeStep === 2 && !catalog?.length) return true;
  if (activeStep === 3) return true;
  return false;
}

export default function InvoiceWithDocument() {
  return (
    <DocumentProvider>
      <Invoice />
    </DocumentProvider>
  );
}
