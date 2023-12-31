import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {getProducts} from "../../api";
import CatalogCard from "./CatalogCard.tsx";
import {Card, Pagination, Loader, PaginationProps} from "@gravity-ui/uikit";
import {useSelector, useDispatch} from "react-redux";
import {show} from "../../slices/menuSlice.ts";
import {RootState} from "../../slices";

function Catalog() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Array<{id: number, brand: string, title: string, thumbnail: string, price: number}>>([]);
  const [page, setPage] = useState({page: 1, pageSize: 12})
  const [totalSize, setTotalSize] = useState(100);
  const [isLoading, setLoading] = useState(true);
  const isMenuShow = useSelector((state: RootState) => state.menu.isMenuShow);
  const currCategory = useSelector((state: RootState) => state.category.category);
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
      setLoading(false)
    });
  }, [currCategory]);

  const handleUpdate: PaginationProps['onUpdate'] = (page: number, pageSize: number) => {
    setPage((prevState) => ({...prevState, page, pageSize}));
  }

  const handleClick = (id: number) => {
    console.log(id);
    navigate(`/product/${id}`);
  }

  return(
    <div className={`${!isMenuShow ? 'catalog__wrapper__wide' : 'catalog__wrapper__narrow'} catalog__wrapper`}>
      <h1>{currCategory && currCategory === 'All' ? 'Catalog' : `Catalog of ${currCategory}`}</h1>
      <div className='catalog__container'>
        {isLoading && <div className='catalog__loader'><Loader size='l'/></div>}
        {!isLoading && products && products.map(x => <Card type='action' onClick={() => handleClick(x.id)} className='catalog__card' key={x.id}><CatalogCard product={x}/></Card>)}
      </div>
      <div className='catalog__pagination'>
        {!isLoading && totalSize >= page.pageSize ? <Pagination compact={false} page={page.page} pageSize={page.pageSize} total={totalSize} onUpdate={handleUpdate} /> : ''}
      </div>
    </div>
  )
}

export default Catalog;
