import { Button, Stack, Flex } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import CompaniesList from "../../components/companies-list";
import Skeletons from "../../components/skeletons";
import { useCompanies } from "../../hooks/useCompanies";
import { useDocument } from "../../hooks/useDocument";
import { Company } from "../../types/Company";
import DocumentForm from "../../components/document-form";

const Invoice = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const { data: companies, isLoading: isCompaniesLoading } = useCompanies();
  const { setCompany } = useDocument();

  const onSelectCompany = (id?: string) => {
    if (id) {
      setCompany(companies.filter((c: Company) => c.id === id)[0]);
    }
    nextStep();
  };

  return (
    <Stack spacing={6} maxW="95%" w={{ md: "6xl" }} m="0 auto">
      <Steps colorScheme="facebook" activeStep={activeStep} mb={12}>
        <Step label="לקוח" key="לקוח" description="בחירת לקוח">
          {isCompaniesLoading ? (
            <Skeletons length={10} stackSpace={12} />
          ) : (
            <CompaniesList companies={companies} onSelect={onSelectCompany} />
          )}
        </Step>
        <Step label="פרטים" key="פרטים" description="הכנס את פרטי הלקוח">
          <DocumentForm />
        </Step>

        <Step label="קטלוג" key="קטלוג" description="בחר מוצרים">
          step 3
        </Step>

        <Step label="סיכום" key="סיכום" description="סיכום ההזמנה">
          step 4
        </Step>
      </Steps>
      {activeStep === 3 ? (
        <Button onClick={reset}>Reset</Button>
      ) : (
        <StepButtons
          {...{ nextStep, prevStep }}
          prevDisabled={activeStep === 0}
        />
      )}
    </Stack>
  );
};

type StepButtonsProps = {
  nextStep?: () => void;
  prevStep?: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  isLast?: boolean;
};

const StepButtons = ({
  nextStep,
  prevStep,
  prevDisabled,
  nextDisabled,
  isLast,
}: StepButtonsProps): JSX.Element => {
  return (
    <Flex width="100%" justify="flex-end">
      <Button
        mr={4}
        variant="ghost"
        onClick={prevStep}
        isDisabled={prevDisabled}
        colorScheme="facebook"
      >
        אחורה
      </Button>
      <Button
        isDisabled={nextDisabled}
        colorScheme="facebook"
        onClick={nextStep}
      >
        {isLast ? "סיים" : "הבא"}
      </Button>
    </Flex>
  );
};
export default Invoice;
