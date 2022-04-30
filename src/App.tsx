import { Global } from "@emotion/react";
import { QueryClientProvider } from "react-query";
import MainPage from "./pages";
import { getClient } from "./queryClient";
import GlobalStyle from "./styles/Global";

function App() {
  const client = getClient();
  return (
    <QueryClientProvider client={client}>
      <Global styles={GlobalStyle} />
      <MainPage />
    </QueryClientProvider>
  );
}

export default App;
