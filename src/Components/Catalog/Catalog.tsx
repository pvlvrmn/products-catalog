import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {getProducts} from "../../api";
import CatalogCard from "./CatalogCard.tsx";
import {Card, Pagination, Loader} from "@gravity-ui/uikit";
import {useSelector, useDispatch} from "react-redux";
import {show} from "../../slices/menuSlice.ts";

function Catalog() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState({page: 1, pageSize: 12})
  const [totalSize, setTotalSize] = useState(100);
  const isMenuShow = useSelector((state) => state.menu.isMenuShow);
  const currCategory = useSelector((state) => state.category.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(show())
  }, []);

  useEffect(() => {
    getProducts(page.page, currCategory).then(res => {
      setProducts(res.products);
      setTotalSize(res.total);
    });
  }, [page]);

  useEffect(() => {
    setPage({page: 1, pageSize: 12});
    getProducts(page.page, currCategory).then(res => {
      setProducts(res.products);
      setTotalSize(res.total);
    });
  }, [currCategory]);

  const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) => {
    setPage((prevState) => ({...prevState, page, pageSize}));
  }

  const handleClick = (id) => {
    console.log(id);
    navigate(`/product/${id}`);
  }

  return(
    <div className={`${!isMenuShow ? 'catalog__wrapper__wide' : 'catalog__wrapper__narrow'} catalog__wrapper`}>
      <h1>{currCategory && currCategory === 'All' ? 'Catalog' : `Catalog of ${currCategory}`}</h1>
      <div className='catalog__container'>
        {products && products.map(x => <Card type='action' onClick={() => handleClick(x.id)} className='catalog__card' key={x.id}><CatalogCard product={x}/></Card>)}
      </div>
      <div className='catalog__pagination'>
        {totalSize >= page.pageSize ? <Pagination compact={false} page={page.page} pageSize={page.pageSize} total={totalSize} onUpdate={handleUpdate} /> : ''}
      </div>
    </div>
  )
}

export default Catalog;
