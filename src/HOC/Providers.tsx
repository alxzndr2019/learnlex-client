"use client";

import { AuthProvider } from "../contexts/AuthContext";
import { Provider } from "react-redux";
import { store } from "../store/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
}
