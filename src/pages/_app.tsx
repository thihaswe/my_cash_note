import { store } from "@/store";
import { theme } from "@/utils/theme";
import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
