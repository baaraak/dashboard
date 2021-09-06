import React from "react";
import { Grid, Box, Input, Center } from "@chakra-ui/react";
import { Company } from "../types/Company";

const CompaniesList = ({
  companies,
  onSelect,
}: {
  companies: Company[];
  onSelect: (id?: string) => void;
}) => {
  const [filteredCompanies, setFilteredCompanies] = React.useState(companies);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim().toLowerCase();
    if (value === "") {
      setFilteredCompanies(companies);
      return;
    }
    setFilteredCompanies(
      companies.filter(
        (c: Company) =>
          c.name.toLowerCase().indexOf(value) !== -1 ||
          (c.emails[0] || "").toLowerCase().indexOf(value) !== -1 ||
          (c.phone || "").toLowerCase().indexOf(value) !== -1,
      ),
    );
  };
  return (
    <>
      <Input
        size="lg"
        my={4}
        bg="white"
        shadow="sm"
        onChange={onChange}
        placeholder="חפש לפי שם / אימייל / טלפון"
      />
      <Center
        border="2px"
        borderColor="gray.300"
        minH={12}
        fontWeight="semibold"
        alignItems="center"
        shadow="md"
        bg="white"
        mb={{ base: 6, md: 2 }}
        rounded="xl"
        color="gray.600"
        transition="all .2s ease-in"
        cursor="pointer"
        _hover={{
          borderColor: "blue.600",
        }}
        onClick={() => onSelect()}
      >
        המשך ללא בחירת לקוח
      </Center>
      {filteredCompanies.map((company: Company) => (
        <Grid
          key={company.id}
          gridTemplateColumns={{ base: "25% 1fr", md: "1fr" }}
          overflowX="auto"
          pb={{ base: 6, md: 2 }}
        >
          <Grid
            gridTemplateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
            px={{ base: 2, md: 12 }}
            mb={1}
            fontSize="xs"
            fontWeight="semibold"
            color="gray.700"
          >
            <Box>שם הלקוח</Box>
            <Box>אימייל</Box>
            <Box>מספר טלפון</Box>
          </Grid>
          <Grid
            gridTemplateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
            border="1px"
            borderColor="gray.100"
            minH={12}
            alignItems="center"
            px={{ base: 2, md: 12 }}
            shadow="md"
            bg="white"
            rounded="xl"
            color="gray.600"
            transition="all .2s ease-in"
            rowGap={{ base: 4 }}
            cursor="pointer"
            _hover={{
              borderColor: "blue.600",
            }}
            onClick={() => onSelect(company.id)}
          >
            <Box>{company.name}</Box>
            <Box>{company.emails[0]}</Box>
            <Box>{company.phone}</Box>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default CompaniesList;
