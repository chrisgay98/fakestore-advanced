import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/app/store";

export function renderUI(ui: ReactElement) {
  const qc = new QueryClient();
  return render(
    <Provider store={store}>
      <QueryClientProvider client={qc}>{ui}</QueryClientProvider>
    </Provider>
  );
}

export function resetStore() {
  // Clear cart stored in sessionStorage and reset store by reloading page state
  try {
    sessionStorage.clear();
  } catch {}
}
