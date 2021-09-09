import { Controller, useForm } from "react-hook-form";
import {
  Textarea,
  Stack,
  FormLabel,
  FormControl,
  Center,
  Button,
} from "@chakra-ui/react";
import DatePicker, { registerLocale } from "react-datepicker";
import InputField from "./input-field";
import { Company } from "types/Company";
import { Details } from "context/document";

import "react-datepicker/dist/react-datepicker.css";

import he from "date-fns/locale/he";

registerLocale("he", he);

const DocumentForm = ({
  onSubmit,
  company,
  details,
}: {
  onSubmit: (values: Details) => void;
  company: Company | null;
  details: Details | null;
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  return (
    <Center
      flexDir="column"
      bg="white"
      shadow="md"
      borderWidth={1}
      px={[4, 12]}
      py={[8, 6, 12]}
      my={[4, 0]}
      rounded="xl"
    >
      <Stack as="form" onSubmit={handleSubmit(onSubmit)} w="100%" spacing={6}>
        <InputField
          error={errors.name}
          label="שם העסק"
          placeholder='לירי הרן בע"מ'
          defaultValue={details?.name || company?.name}
          control={control}
          rules={{
            required: "אנא הכנס שם עסק/איש קשר",
          }}
          name="name"
        />
        <InputField
          error={errors.contactPerson}
          label="שם איש קשר"
          placeholder="הכנס שם"
          control={control}
          defaultValue={details?.contactPerson || company?.contactPerson}
          name="contactPerson"
        />
        <InputField
          error={errors.email}
          label="אימייל"
          placeholder="הכנס אימייל"
          type="email"
          defaultValue={details?.email || company?.emails[0]}
          control={control}
          name="email"
        />
        <InputField
          error={errors.taxId}
          label="מספר ח.פ"
          placeholder="הכנס ח.פ"
          control={control}
          defaultValue={details?.taxId || company?.taxId}
          name="taxId"
        />
        <FormControl>
          <FormLabel htmlFor="dueDate">תאריך לתשלום</FormLabel>
          <div className="light-theme">
            <Controller
              name="dueDate"
              control={control}
              defaultValue={details?.dueDate}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  selected={field.value || getDueDate(company, new Date())}
                  showPopperArrow={true}
                  locale="he"
                  onChange={(date) => field.onChange(date)}
                  dateFormat="dd/MM/yyyy"
                  id="dueDate"
                />
              )}
            />
          </div>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="data">פרטים נוספים</FormLabel>
          <Controller
            name="data"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                defaultValue={details?.data}
                placeholder="הכנס הערות / פרטים נוספים"
                id="data"
              />
            )}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          המשך
        </Button>
      </Stack>
    </Center>
  );
};

function getDueDate(company: Company | null, refDate: Date) {
  let paymentTerms = 0;
  if (company?.paymentTerms) {
    paymentTerms = company.paymentTerms;
  }
  const res =
    paymentTerms < 0
      ? refDate
      : new Date(
          refDate.getFullYear(),
          refDate.getMonth() + 1 + Math.floor(paymentTerms / 30),
          paymentTerms % 30,
        );
  return res;
}

export default DocumentForm;
