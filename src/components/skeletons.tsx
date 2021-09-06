import { Stack, SkeletonText, SkeletonProps } from "@chakra-ui/react";

interface Props extends SkeletonProps {
  stackSpace?: number;
  length?: number;
}

const Skeletons = ({ stackSpace = 8, length = 1, ...skeletonProps }: Props) => {
  return (
    <Stack spacing={stackSpace} w="100%">
      {Array(length)
        .fill(null)
        .map((_, i) => (
          <SkeletonText key={i} {...skeletonProps} />
        ))}
    </Stack>
  );
};

export default Skeletons;
