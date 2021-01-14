import { useContext, forwardRef, useImperativeHandle, useState } from 'react';
import Arrow from 'assets/arrow';
import CartItem from 'components/CartItem';
import { CartContext } from '../../cartContext';
import currencies from 'data/currencies';
import './style.scss';

const Cart = forwardRef(({ currency, setCurrency }, ref) => {
  const { cart, totalPrice } = useContext(CartContext);
  const [open, setOpen] = useState(false);

  const openPanel = () => {
    setOpen(true);
    document.querySelector('body').classList.add('overlay');
  };

  const closePanel = () => {
    setOpen(false);
    document.querySelector('body').classList.remove('overlay');
  };

  useImperativeHandle(ref, () => ({
    open: () => openPanel(),
  }));

  const handleChange = (e) => {
    setCurrency(
      currencies.find((currency) => currency.curr === e.target.value)
    );
  };

  return (
    <aside className="cart" data-open={open}>
      <nav className="cart_nav flex-row j-space">
        <div className="nav-item ">
          <div className="icon" onClick={closePanel}>
            <Arrow />
          </div>
        </div>
        <div className="nav-item flex-row">
          <h5>YOUR CART</h5>
        </div>
        <div className="nav-item"></div>
      </nav>

      <div className="cur-sel">
        <div className="select_el">
          <select onChange={handleChange}>
            {currencies.map((currency, i) => (
              <option value={currency.curr} key={`currencies_${i}`}>
                {currency.curr}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="cart-section">
        <div className="items">
          {cart.map((cartItem) => (
            <CartItem
              item={cartItem}
              sym={currency.curr}
              key={`cart_${cartItem.id}`}
            />
          ))}
        </div>
      </div>

      <footer>
        <div className="t_price flex-row j-space">
          <span>Subtotal</span>
          <div className="prc">
            {currency.sym} {totalPrice}
          </div>
        </div>
        <div className="crt_btn flex-col">
          <button className="btn w-full">
            <span>MAKE THIS SUBSCRIPTION (SAVE 20%)</span>
          </button>
          <button className="checkout w-full">PROCEED TO CHEKOUT</button>
        </div>
      </footer>
    </aside>
  );
});

export default Cart;
