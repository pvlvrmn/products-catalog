import Header from "./Components/Header/Header.tsx";
import Categories from "./Components/Catalog/Categories.tsx";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Catalog from "./Components/Catalog/Catalog.tsx";

function App() {



  return (
    <Router basename={import.meta.env.DEV ? '/' : '/products-catalog/'}>
      <Header/>
      <Categories/>
      <Catalog/>
    </Router>
  )
}

export default App
