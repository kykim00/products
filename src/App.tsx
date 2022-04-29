import React from "react";
import { QueryClientProvider } from "react-query";
import MainPage from "./pages";
import { getClient } from "./queryClient";

function App() {
  const client = getClient();
  return (
    <QueryClientProvider client={client}>
      <MainPage />
    </QueryClientProvider>
  );
}

export default App;
