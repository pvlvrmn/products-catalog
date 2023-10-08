import Header from "./Components/Header/Header.tsx";
import Categories from "./Components/Catalog/Categories.tsx";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Catalog from "./Components/Catalog/Catalog.tsx";
import Product from "./Components/Product/Product.tsx";

function App() {



  return (
    <Router basename={import.meta.env.DEV ? '/' : '/products-catalog/'}>
      <Header/>
      <Categories/>
      <Routes>
        <Route path='/' element={<Catalog/>}/>
        <Route path='/category/:cat' element={<Catalog/>}/>
        <Route path='/product/:id' element={<Product/>}/>
      </Routes>
    </Router>
  )
}

export default App
