import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/store/actions/productActions';
import { addToCart, removeFromCart } from '../redux/store/actions/cartActions';
import Swal from 'sweetalert2';


const ProductDetail = () => {
    const navigate = useNavigate();
    const [cantidad, setCantidad] = useState(1);
    const user = useSelector(state => state.user);

    const dispatch = useDispatch();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const option = "Molido Ground"

    const handleDecrement = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };
    const productDetails = useSelector(state => state.product);
    const { initialLoad, error, products, errorMsg } = productDetails;
    const { tokenPrice } = useSelector(state => state.tokenPrice);

    const handleIncrement = () => {
        setCantidad(cantidad + 1);
    };

    useEffect(() => {
        if (initialLoad) {
          dispatch(fetchProducts());
        }
      }, [dispatch], [initialLoad]);
    
      useEffect(() => {
        if (!initialLoad && id !== products._id) {
          const producto = products.find(p => p._id === id)
          setProduct(producto);
          setLoading(false);
        }
      }, [id, products, initialLoad, dispatch]);

      const addToCartHandler = () => {
        if (product.countInStock < 1) {
          Swal.fire({
            title: 'Oops...',
            text: 'Quantity must be at least 1',
            icon: 'error',
            confirmButtonText: 'OK'
          })
          return;
        }

          if (user.loginSuccess) {
            dispatch(addToCart(product._id, cantidad, option)); 
            if (error) {
              Swal.fire({
                title: 'Oops...',
                text: errorMsg,
                icon: 'error',
                confirmButtonText: 'OK'
              })
              return;
            }
            navigate(`/carro-compras`)
            return
          } else {
            Swal.fire({
              title: 'Please login to add to cart',
              icon: 'warning',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Login',
              showCancelButton: true,
              cancelButtonColor: '#d33',
              cancelButtonText: 'Cancel',
              preConfirm: () => {
                navigate(`/sesion`)
              }
            })
          }
        
      }
    


    return (
        <div className="producto-detalle">
            <div className="imagen-producto">
                <img src={product.imageUrl?.url} alt={product.name} />
            </div>
            <div className="info-producto">

                <div>
                    <h2>{product.name}</h2>
                    <p> {product.description}</p>
                </div>
                <h6>Precio: ${product.price} USDT</h6>

                <div className='buttons-detail'>
                    <div className="cantidad-input">
                        <button className="btn-decrement" onClick={handleDecrement}>-</button>
                        <input className='input-number' type="number" value={cantidad} readOnly />
                        <button className="btn-increment" onClick={handleIncrement}>+</button>
                    </div>
                    <button onClick={addToCartHandler}>Agregar al Carrito</button>
                </div>
            </div>

        </div>
    )
}

export default ProductDetail