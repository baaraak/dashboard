import { Box, Button, Heading, Center, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FeedbackMessage from "components/feedback-message";
import InputField from "components/input-field";
import { useAuth } from "context/auth";

export type InputLoginType = {
  username: string;
  password: string;
};

const AuthenticatePage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm();
  const { login } = useAuth();
  const [serverError, setServerError] = useState();

  const onSubmit = async (values: InputLoginType) => {
    try {
      await login(values);
    } catch (err: any) {
      setServerError(err.message);
    }
  };

  return (
    <Center
      overflow="hidden"
      flexDir="column"
      minH="100vh"
      bgImage="url('/background.jpg')"
      bgSize="cover"
    >
      <Box
        bg="white"
        py="8"
        px={{ base: "4", md: "10" }}
        w={{ base: "95%", md: "sm" }}
        shadow="md"
        rounded="xl"
      >
        <Heading textAlign="center" size="xl" mb="4" fontWeight="extrabold">
          התחבר לחשבון
        </Heading>
        {serverError && (
          <FeedbackMessage status="error" description={serverError} />
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="6">
            <InputField
              error={errors.username}
              label="שם משתמש"
              placeholder="שם משתמש"
              control={control}
              rules={{
                required: "אנא הכנס שם משתמש",
              }}
              name="username"
            />
            <InputField
              error={errors.password}
              placeholder="******"
              type="password"
              label="סיסמה"
              control={control}
              rules={{
                required: "הכנס סיסמה",
              }}
              name="password"
            />
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              w="full"
              isLoading={isSubmitting}
              fontSize="md"
            >
              Sign in
            </Button>
          </Stack>
        </form>
      </Box>
    </Center>
  );
};

export default AuthenticatePage;
