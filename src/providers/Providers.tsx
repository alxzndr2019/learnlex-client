import { AuthProvider } from "../contexts/AuthContext";
import { Provider } from "react-redux";
import { store } from "../store/store";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
};
