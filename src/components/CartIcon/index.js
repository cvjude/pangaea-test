import { useContext } from 'react';
import { CartContext } from '../../cartContext';
import carticon from 'assets/cart.png';
import './style.scss';

const CartIcon = ({ openCart }) => {
  const { cart } = useContext(CartContext);
  return (
    <div onClick={openCart} className="cart_icon">
      <img src={carticon} alt="cartIcon" className="w-full contain" />
      <small>{cart.length}</small>
    </div>
  );
};

export default CartIcon;
