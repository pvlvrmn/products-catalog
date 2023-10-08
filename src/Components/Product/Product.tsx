import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProductById} from "../../api";
import {useDispatch, useSelector} from "react-redux";
import Images from "./Images.tsx";
import {hide} from "../../slices/menuSlice.ts";
import {Button, Text} from "@gravity-ui/uikit";
import {StarFill} from '@gravity-ui/icons';
import {ShoppingBag} from '@gravity-ui/icons';


function Product() {
  const currId = useParams();
  const [product, setProduct] = useState({});
  const isMenuShow = useSelector((state) => state.menu.isMenuShow);
  const dispatch = useDispatch();

  useEffect(() => {
    getProductById(currId.id).then(res => setProduct(res));
    dispatch(hide())
  }, [currId.id]);

  return (
    <div className={`product__wrapper ${!isMenuShow ? 'product__wrapper__wide' : 'product__wrapper__narrow'}`}>
      <Images obj={product && product.images}/>
      <div className='product__info'>
        <Text style={{display: 'block', padding: '10px 0 5px 0'}} variant='display-3'>{product && product.title}</Text>
        <Text style={{display: 'block', padding: '0 0 10px 0'}} variant='subheader-1'>{product && product.brand}</Text>
        <div className='product__rating'>
          <StarFill/>
          <Text style={{display: 'block', padding: '0 0 10px 0'}} variant='body-2'>{product && product.rating}</Text>
        </div>
        <Text style={{display: 'block', padding: '0 0 20px 0'}} variant='body-3'>{product && product.description}</Text>
        <div className='product__price'>
          <Text style={{display: 'block', padding: '0 0 0px 0'}} variant='display-3'>$ {product && product.price}</Text>
          <Text className='product__discount' variant='caption-2'>-{Math.round(product.discountPercentage)}%</Text>
          <Text className='product__withoutdiscount' style={{display: 'block', padding: '0 0 4px 0'}} variant='body-1'>/ <strike>$ {Math.round(product.price * 100 / (100 - product.discountPercentage))}</strike></Text>
        </div>
        <Button view='action' size='xl'>Add to cart</Button>
      </div>
    </div>
  )
}

export default Product;
