import { Global } from "@emotion/react";
import { QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages";
import ProductDetailPage from "./pages/productDetail";
import { getClient } from "./queryClient";
import GlobalStyle from "./styles/Global";

function App() {
  const client = getClient();
  return (
    <QueryClientProvider client={client}>
      <Global styles={GlobalStyle} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:id" element={<ProductDetailPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
