import Header from "./components/Header";
import Shop from "./components/Shop";
import UserContextProvider from "./store/shopping-context";

function App() {
  return (
    <UserContextProvider>
      <Header />
      <Shop />
    </UserContextProvider>
  );
}

export default App;
