import Header from "./Components/Header/Header.tsx";
import Categories from "./Components/Catalog/Categories.tsx";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {

  return (
    <Router basename={import.meta.env.DEV ? '/' : '/products-catalog/'}>
      <Header/>
      <Routes>
        <Route path="/" element={<Categories/>}/>
      </Routes>
    </Router>
  )
}

export default App
