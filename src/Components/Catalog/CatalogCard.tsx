import {Text} from "@gravity-ui/uikit";

function CatalogCard(props) {
  return (
    <div>
      <div className='card__img' style={{backgroundImage: `url(${props.product.thumbnail})`}}>
      </div>
      <div className='card__description'>
        <Text style={{display: 'block', padding: '10px 0 5px 0'}} variant='subheader-3'>{props.product.title}</Text>
        <Text style={{display: 'block', padding: '0 0 10px 0'}} variant='caption-2'>{props.product.brand}</Text>
        <Text style={{display: 'block', padding: '0 0 10px 0'}} variant='header-1'>$ {props.product.price}</Text>
      </div>
    </div>
  )
}

export default CatalogCard;
