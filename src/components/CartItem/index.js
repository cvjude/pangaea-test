import { useContext } from 'react';
import { CartContext } from '../../cartContext';
import './style.scss';

const CartItem = ({ item, sym }) => {
  const { addToCart, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart-item flex">
      <div className="txt-sec flex-col j-space al-start">
        <span className="rmv" onClick={() => removeFromCart(item, true)}>
          x
        </span>
        <h6>{item.title}</h6>

        <div className="qnty flex-row j-space w-full">
          <div className="m_qty flex-row j-space">
            <span className="c_btn" onClick={() => removeFromCart(item)}>
              -
            </span>
            <span className="c_desc">{item.quantity}</span>
            <span className="c_btn" onClick={() => addToCart(item)}>
              +
            </span>
          </div>

          <div className="price">
            {sym} {item.price * item.quantity}
          </div>
        </div>
      </div>
      <div className="img-sec">
        <img src={item.image_url} alt={item.title} />
      </div>
    </div>
  );
};

export default CartItem;
