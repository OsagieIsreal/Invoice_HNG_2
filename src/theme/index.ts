import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// Frontend Mentor invoice-app palette
export const colors = {
  brand: {
    500: "#7C5DFA", // primary violet
    300: "#9277FF", // hover violet
  },
  ink: {
    900: "#0C0E16",
    800: "#1E2139", // dark card
    700: "#252945", // dark hover / dark item bg
    600: "#373B53",
    500: "#7E88C3",
    400: "#888EB0",
    300: "#DFE3FA",
    200: "#F8F8FB", // light app bg
    100: "#FFFFFF",
  },
  status: {
    draft: "#373B53",
    pending: "#FF8F00",
    paid: "#33D69F",
  },
  danger: {
    500: "#EC5757",
    300: "#FF9797",
  },
};

const theme = extendTheme({
  config,
  colors,
  fonts: {
    heading: "'Spartan', system-ui, sans-serif",
    body: "'Spartan', system-ui, sans-serif",
  },
  styles: {
    global: (props: { colorMode: "light" | "dark" }) => ({
      body: {
        bg: props.colorMode === "dark" ? "#141625" : colors.ink[200],
        color: props.colorMode === "dark" ? colors.ink[100] : colors.ink[900],
        transitionProperty: "background-color, color",
        transitionDuration: "200ms",
      },
    }),
  },
  components: {
    Button: {
      baseStyle: { fontWeight: 700, borderRadius: "24px" },
      variants: {
        primary: {
          bg: "brand.500",
          color: "white",
          _hover: { bg: "brand.300" },
        },
        secondary: (props: { colorMode: "light" | "dark" }) => ({
          bg: props.colorMode === "dark" ? "ink.700" : "#F9FAFE",
          color: props.colorMode === "dark" ? "ink.300" : "ink.500",
          _hover: {
            bg: props.colorMode === "dark" ? "white" : "ink.300",
            color: props.colorMode === "dark" ? "ink.500" : "ink.500",
          },
        }),
        dark: (props: { colorMode: "light" | "dark" }) => ({
          bg: props.colorMode === "dark" ? "#252945" : "#373B53",
          color: "ink.500",
          _hover: { bg: "ink.900", color: "white" },
        }),
        danger: {
          bg: "danger.500",
          color: "white",
          _hover: { bg: "danger.300" },
        },
      },
    },
  },
});

export default theme;
