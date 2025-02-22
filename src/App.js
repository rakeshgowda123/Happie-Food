import Pages from "./pages/Pages";
import Category from "./components/Category";
import { BrowserRouter } from "react-router-dom";
import Logo from "./components/Logo";

import Search from "./components/Search";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Logo></Logo>
        <Search />
        <Category></Category>
        <Pages></Pages>
      </BrowserRouter>
    </div>
  );
}

export default App;
