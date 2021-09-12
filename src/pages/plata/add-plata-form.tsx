import { Controller, useForm } from "react-hook-form";
import {
  Stack,
  FormLabel,
  FormControl,
  Box,
  Select,
  Button,
} from "@chakra-ui/react";
import InputField from "components/input-field";
import { Plata as PlataType } from "types/Plata";
import { AddPlataValues } from "./Plata";

export default function AddPlataForm({
  onSubmit,
  isLoading,
  platotList,
}: {
  platotList: PlataType[];
  onSubmit: (v: AddPlataValues) => void;
  isLoading: boolean;
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} w="100%">
      <Stack spacing={6}>
        <InputField
          error={errors.name}
          label="שם הפלטה"
          placeholder="מארז לחג"
          control={control}
          rules={{
            required: "אנא הכנס שם",
          }}
          name="name"
        />
        <InputField
          error={errors.price}
          label="מחיר"
          placeholder="0"
          type="number"
          control={control}
          rules={{
            required: "הכנס מחיר או 0",
          }}
          name="price"
        />
        <FormControl>
          <FormLabel htmlFor="parent">הכנס תחת</FormLabel>
          <Controller
            name="parent"
            control={control}
            render={({ field }) => (
              <Select {...field} id="parent">
                <option value="">בחר פלטה</option>
                {platotList.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <Button colorScheme="facebook" type="submit" isLoading={isLoading}>
          צור פלטה
        </Button>
      </Stack>
    </Box>
  );
}
