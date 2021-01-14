import { useContext } from 'react';
import { CartContext } from '../../cartContext';
import './style.scss';

const ProductCard = ({ data, currency, open }) => {
  const { addToCart } = useContext(CartContext);

  const addItemToCart = () => {
    addToCart(data);
    open();
  };

  return (
    <div className="p_card flex-col">
      <div className="img_sec h-full flex-col j-start">
        <img className="contain" src={data.image_url} alt={data.title} />
        <h2>{data.title}</h2>
      </div>
      <div className="txt_sec">
        <span>from:</span>
        <span>
          {currency} {data.price}
        </span>
      </div>
      <button onClick={addItemToCart} className="flex-row">
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
