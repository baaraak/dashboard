import { Alert, AlertIcon, AlertStatus } from '@chakra-ui/alert';

const FeedbackMessage = ({
  status,
  message,
}: {
  status: AlertStatus;
  message: string;
}) => {
  return (
    <Alert status={status}>
      <AlertIcon />
      {message}
    </Alert>
  );
};

export default FeedbackMessage;
