import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import "./assets/index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routing/routes";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </ChakraProvider>
  </React.StrictMode>
);
