import { QueryClient, QueryClientProvider } from "react-query";
import "./App.scss";
import Router from "./Router";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
