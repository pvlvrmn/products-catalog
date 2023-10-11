import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProductById} from "../../api";
import {useDispatch, useSelector} from "react-redux";
import Images from "./Images.tsx";
import {hide} from "../../slices/menuSlice.ts";
import {Button, Text} from "@gravity-ui/uikit";
import {StarFill} from '@gravity-ui/icons';
import {RootState} from "../../slices";


function Product() {
  const { id } = useParams<{id: string}>();
  const [product, setProduct] = useState<{images: Array<string>, title: string, brand: string, rating: number, description: string, price: number, discountPercentage: number}>({title: '', images: [''], brand: '', rating: 0, description: '', price: 0, discountPercentage: 0});
  const isMenuShow = useSelector<RootState, boolean>((state) => state.menu.isMenuShow);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id != null) {
      getProductById(parseInt(id)).then(res => setProduct(res));
      dispatch(hide())
    }
  }, [id]);

  return (
    <div className={`product__wrapper ${!isMenuShow ? 'product__wrapper__wide' : 'product__wrapper__narrow'}`}>
      <Images obj={product.images}/>
      <div className='product__info'>
        <Text style={{display: 'block', padding: '10px 0 5px 0'}} variant='display-3'>{product.title !== '' && product.title}</Text>
        <Text style={{display: 'block', padding: '0 0 10px 0'}} variant='subheader-1'>{product.title !== '' && product.brand}</Text>
        <div className='product__rating'>
          <StarFill/>
          <Text style={{display: 'block', padding: '0 0 10px 0'}} variant='body-2'>{product.title !== '' && product.rating}</Text>
        </div>
        <Text style={{display: 'block', padding: '0 0 20px 0'}} variant='body-3'>{product.title !== '' && product.description}</Text>
        <div className='product__price'>
          <Text style={{display: 'block', padding: '0 0 0px 0'}} variant='display-3'>$ {product.title !== '' && product.price}</Text>
          <Text className='product__discount' variant='caption-2'>-{Math.round(product.discountPercentage)}%</Text>
          <Text className='product__withoutdiscount' style={{display: 'block', padding: '0 0 4px 0'}} variant='body-1'>/ <s>$ {Math.round(product.price * 100 / (100 - product.discountPercentage))}</s></Text>
        </div>
        <Button view='action' size='xl'>Add to cart</Button>
      </div>
    </div>
  )
}

export default Product;
