import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Router from "./router.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider>
          <Router />
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
