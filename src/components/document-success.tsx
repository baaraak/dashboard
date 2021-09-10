import { useState } from "react";
import api from "services/api";
import {
  Alert,
  Link,
  AlertDescription,
  AlertIcon,
  Button,
  AlertTitle,
  Input,
  Stack,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";

export default function DocumentSuccess({
  url,
  number,
}: {
  url: string;
  number: number;
}) {
  const [errors, setErrors] = useState<{ phone?: string; email?: string }>({});
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [smsLoading, setSmsLoading] = useState(false);
  const toast = useToast();

  const sendEmail = async () => {
    if (email === "") return setErrors({ ...errors, email: "הכנס אימייל" });
    setEmailLoading(true);
    const result = await api.misc.sendDocumentEmail({
      to: email,
      url,
    });
    if (result.success) {
      toast({
        description: "אימייל נשלח בהצלחה!",
        status: "success",
      });
      setErrors({});
      setEmail("");
    } else {
      toast({
        description: "אופס, משהו השתבש",
        status: "error",
      });
      setErrors({ ...errors, email: result.error });
    }
    setEmailLoading(false);
  };

  const sendSms = async () => {
    if (phone === "")
      return setErrors({ ...errors, phone: "הכנס מספר פלאפון" });
    setSmsLoading(true);
    console.log({
      phone: phone,
      url,
    });
    const result = await api.misc.sendDocumentSms({
      phone: phone,
      url,
    });
    if (result.success) {
      toast({
        description: "הודעה נשלחה בהצלחה!",
        status: "success",
      });
      setErrors({});
      setPhone("");
    } else {
      toast({
        description: "אופס, משהו השתבש",
        status: "error",
      });
      setErrors({ ...errors, phone: result.error });
    }
    setSmsLoading(false);
  };

  return (
    <Stack spacing={4} alignSelf="center">
      <Alert
        status="success"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        minH="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          פעולה בוצעה בהצלחה!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          מספר חשבונית\עסקה:{number}
          <br />
          <Link
            fontWeight="bold"
            fontSize="lg"
            textDecoration="underline"
            target="_blank"
            rel="noopener noreferrer"
            href={url}
          >
            צפה במסמך
          </Link>
        </AlertDescription>
      </Alert>

      <Stack spacing={4}>
        <Flex alignItems="flex-end">
          <FormControl isInvalid={!!errors.phone}>
            <FormLabel htmlFor="phone">שלח מסמך לנייד</FormLabel>
            <Input
              id="phone"
              type="phone"
              placeholder="מספר פלאפון"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <FormErrorMessage>{errors.phone}</FormErrorMessage>
          </FormControl>
          <Button
            size="lg"
            colorScheme="facebook"
            isLoading={smsLoading}
            onClick={sendSms}
            mr={4}
          >
            שלח הודעה
          </Button>
        </Flex>
        <Flex alignItems="flex-end">
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">שלח מסמך לאימייל</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="כתובת אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>
          <Button
            size="lg"
            colorScheme="facebook"
            isLoading={emailLoading}
            onClick={sendEmail}
            mr={4}
          >
            שלח אימייל
          </Button>
        </Flex>
        <Button>לחץ כאן להתחיל מהתחלה</Button>
      </Stack>
    </Stack>
  );
}
