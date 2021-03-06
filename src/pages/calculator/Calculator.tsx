import React, { useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import { Grid, Heading, Center, Button, Input, Box } from "@chakra-ui/react";

const Calculator = () => {
  const [result, updateResult] = useState<Sufganya[]>(SUFGANYOT);
  const componentRef = useRef<HTMLTableElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = (Number(e.target.value) / 35).toFixed();
    // set resultss
    updateResult(
      SUFGANYOT.map((suf: Sufganya) => {
        const sum = Math.round((suf.percentage / 100) * Number(number));
        let divider = Math.round(sum / 3);
        suf.sum = [divider, divider, sum - divider * 2, sum];
        return suf;
      }),
    );
  };

  const totalPrice = result.reduce((a, s) => a + Number(s.sum[3]), 0);

  return (
    <>
      <Heading size="lg" fontWeight="regular">
        מחשבון סופגניות
      </Heading>
      <Center
        flexDir="column"
        bg="white"
        shadow="md"
        borderWidth={1}
        px={[4, 12, 12]}
        py={[8, 6, 12]}
        rounded="xl"
      >
        <Input
          type="number"
          size="lg"
          placeholder="כמות סופגניות"
          mb={8}
          onChange={onChange}
        />
        <Box ref={componentRef} w="100%">
          <Grid
            gridTemplateColumns="repeat(5, 1fr)"
            gridGap={1}
            fontWeight={["normal", "normal", "semibold"]}
            fontSize={["sm", "md", "xl"]}
            alignItems="center"
            textAlign="center"
            overflowX="auto"
            gridAutoRows="1fr"
          >
            <Center bg="gray.400" h="100%" minH="3.8rem">
              סוג סופגניה
            </Center>
            <Center bg="gray.400" h="100%" minH="3.8rem">
              1/3
            </Center>
            <Center bg="gray.400" h="100%" minH="3.8rem">
              1/3
            </Center>
            <Center bg="gray.400" h="100%" minH="3.8rem">
              1/3
            </Center>
            <Center bg="gray.400" h="100%" minH="3.8rem">
              כמות
            </Center>

            {result.map((o) => (
              <React.Fragment key={o.name}>
                <Center h="100%" minH="3.8rem" bg="gray.100">
                  {o.name}
                </Center>
                <Center h="100%" minH="3.8rem" bg="gray.100">
                  {o.sum[0] || 0}
                </Center>
                <Center h="100%" minH="3.8rem" bg="gray.100">
                  {o.sum[1] || 0}
                </Center>
                <Center h="100%" minH="3.8rem" bg="gray.100">
                  {o.sum[2] || 0}
                </Center>
                <Center h="100%" minH="3.8rem" bg="gray.100">
                  {o.sum[3] || "-"}
                </Center>
              </React.Fragment>
            ))}
          </Grid>

          <Center mt={4} fontWeight="semibold" color="gray.600">
            סה"כ:(מגשים) &#8362;{totalPrice || 0}
          </Center>
        </Box>

        <ReactToPrint
          trigger={() => (
            <Button colorScheme="facebook" w="100%" mt={4}>
              הדפס
            </Button>
          )}
          content={() => componentRef.current}
        />
      </Center>
    </>
  );
};

type Sufganya = {
  name: string;
  sum: number[];
  percentage: number;
};

const SUFGANYOT: Sufganya[] = [
  { name: "ריקות", sum: [], percentage: 5.5 },
  { name: "ריבה", sum: [], percentage: 28 },
  { name: "ריבת חלב", sum: [], percentage: 8.5 },
  { name: "אינפיניטי וניל", sum: [], percentage: 5.5 },
  { name: "ונילה קוקי קרים", sum: [], percentage: 11 },
  { name: "שוקו פארטי", sum: [], percentage: 6 },
  { name: "שוקו שיק", sum: [], percentage: 8 },
  { name: "טרופיזאן", sum: [], percentage: 3.5 },
  { name: "פיסטוק", sum: [], percentage: 4.5 },
  { name: "פבלובה פירות יער", sum: [], percentage: 4.5 },
  { name: "איספהאן", sum: [], percentage: 4.5 },
  { name: "קפה", sum: [], percentage: 4.5 },
  { name: "טרופ", sum: [], percentage: 4.5 },
  { name: "קצפת", sum: [], percentage: 4.5 },
];

export default Calculator;
