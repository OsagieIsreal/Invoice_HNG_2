import {
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  Button,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import type { InvoiceStatus } from "@/types/invoice";

export type FilterValue = "all" | InvoiceStatus;

interface Props {
  value: FilterValue[];
  onChange: (next: FilterValue[]) => void;
}

const options: { v: InvoiceStatus; label: string }[] = [
  { v: "draft", label: "Draft" },
  { v: "pending", label: "Pending" },
  { v: "paid", label: "Paid" },
];

const StatusFilter = ({ value, onChange }: Props) => {
  const { colorMode } = useColorMode();
  const isChecked = (v: InvoiceStatus) => value.includes(v);
  const toggle = (v: InvoiceStatus) => {
    const next = isChecked(v) ? value.filter((x) => x !== v) : [...value, v];
    onChange(next as FilterValue[]);
  };
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        variant="ghost"
        rightIcon={<ChevronDownIcon color="brand.500" />}
        fontWeight={700}
        _hover={{ bg: "transparent" }}
      >
        Filter <span style={{ display: "inline" }}> by status</span>
      </MenuButton>
      <MenuList
        bg={colorMode === "dark" ? "#252945" : "white"}
        border="none"
        boxShadow="0 10px 20px rgba(72,84,159,0.25)"
        borderRadius="8px"
        py={6}
        px={6}
        minW="192px"
      >
        <VStack align="stretch" spacing={3}>
          {options.map((o) => (
            <Checkbox
              key={o.v}
              isChecked={isChecked(o.v)}
              onChange={() => toggle(o.v)}
              colorScheme="purple"
              fontWeight={700}
            >
              {o.label}
            </Checkbox>
          ))}
        </VStack>
      </MenuList>
    </Menu>
  );
};

export default StatusFilter;
