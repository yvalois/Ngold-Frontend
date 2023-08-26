import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Link
      to={`/producto/${product._id}`}
      className={`product-card ${hovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={product.imageUrl.url} alt={product.name} className="product-image" />
      <div className='card-product-container'>
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">${product.price}</p>
      <div className='card-product-button'>
      </div>

      </div>

    </Link>
  );
};

export default ProductCard;
