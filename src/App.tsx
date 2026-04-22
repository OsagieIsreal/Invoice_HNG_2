import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "@/theme";
import AppRouter from "@/routes/AppRouter";
import { useEffect } from "react";
import { useColorMode } from "@chakra-ui/react";
import { useThemeStore } from "@/store/useThemeStore";

const ColorModeSync = () => {
  const theme = useThemeStore((s) => s.theme);
  const { colorMode, setColorMode } = useColorMode();
  useEffect(() => {
    if (colorMode !== theme) setColorMode(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);
  return null;
};

const App = () => (
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <ColorModeSync />
      <AppRouter />
    </ChakraProvider>
  </>
);

export default App;
