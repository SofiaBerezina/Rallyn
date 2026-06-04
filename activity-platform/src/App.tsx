import "./App.css";
import { AuthProvider } from "./app/providers/AuthProvider.tsx";
import { ModalProvider } from "./app/providers/ModalProvider.tsx";
import { QueryProvider } from "./app/providers/QueryProvider.tsx";
import { AppRouter } from "./app/router/AppRouter.tsx";

function App() {
  return (
    <ModalProvider>
      <QueryProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </QueryProvider>
    </ModalProvider>
  );
}

export default App;
