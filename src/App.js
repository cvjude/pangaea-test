import { useState, useRef, useContext, useEffect } from 'react';
import NavBar from 'components/NavBar';
import { gql, useQuery } from '@apollo/client';
import ProductCard from 'components/ProductCard';
import { CartContext } from './cartContext';
import Cart from 'pages/Cart';
import './App.scss';

export const PRODUCTS = (currency) => gql`
  {
    products {
      id
      title
      image_url
      price(currency: ${currency})
    },
    currency
  }
  `;

function App() {
  const [products, setProducts] = useState([]);
  const [currency, setCurrency] = useState({ curr: 'USD', sym: '$' });
  const { loading, error } = useQuery(PRODUCTS(currency.curr), {
    onCompleted: (data) => setProducts(data.products),
  });
  const cartref = useRef();

  const { updateCurrency } = useContext(CartContext);

  useEffect(() => {
    updateCurrency(products);
  }, [products]);

  useEffect(() => {
    if (loading) {
      document.querySelector('body').classList.add('spinner1');
    } else {
      document.querySelector('body').classList.remove('spinner1');
    }
  }, [loading]);

  return (
    <section className="products">
      <NavBar openCart={() => cartref.current.open()} />
      {error ? (
        <div className="w-full flex-row" style={{ height: '100vh' }}>
          <h2>An Error Occured Please refresh and Try again</h2>
        </div>
      ) : (
        <>
          <div className="products_sec  w-full">
            <div className="container flex">
              {products.map((product) => (
                <ProductCard
                  data={product}
                  key={product.id}
                  currency={currency.sym}
                  open={() => cartref.current.open()}
                />
              ))}
            </div>
          </div>

          <Cart currency={currency} ref={cartref} setCurrency={setCurrency} />
        </>
      )}
    </section>
  );
}

export default App;
