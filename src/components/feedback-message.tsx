import {
  Alert,
  AlertIcon,
  AlertStatus,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/alert";

const FeedbackMessage = ({
  status,
  title,
  description,
}: {
  title?: string;
  description: string;
  status: AlertStatus;
}) => {
  return (
    <Alert status={status}>
      <AlertIcon />
      {title && <AlertTitle mr={2}>{title}</AlertTitle>}
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default FeedbackMessage;
