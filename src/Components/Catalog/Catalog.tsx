import {useEffect, useState} from "react";
import {getProducts} from "../../api";
import CatalogCard from "./CatalogCard.tsx";
import {Card, Pagination} from "@gravity-ui/uikit";
import {useSelector} from "react-redux";

function Catalog() {
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState({page: 1, pageSize: 12})
  const [totalSize, setTotalSize] = useState(100);
  const isMenuShow = useSelector((state) => state.menu.isMenuShow);

  useEffect(() => {
    getProducts(page.page).then(res => {
      setProducts(res.products);
      setTotalSize(res.total);
    });
  }, [page]);

  const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) => {
    setPage((prevState) => ({...prevState, page, pageSize}));
  }

  return(
    <div className={`catalog__wrapper ${!isMenuShow ? 'catalog__wrapper__wide' : 'catalog__wrapper__narrow'}`}>
      <h1>Catalog</h1>
      <div className='catalog__container'>
        {products && products.map(x => <Card className='catalog__card'><CatalogCard product={x}/></Card>)}
      </div>
      <div className='catalog__pagination'>
        <Pagination compact={false} page={page.page} pageSize={page.pageSize} total={totalSize} onUpdate={handleUpdate} />
      </div>
    </div>
  )
}

export default Catalog;
