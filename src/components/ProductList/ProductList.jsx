import { Link, useLocation } from "react-router-dom";

const ProductList = ({ products = null }) => {
  const location = useLocation();

  return (
    <ul>
      {products !== null &&
        Array.isArray(products) &&
        products.map((product) => {
          return (
            <li key={product.id}>
              <img width={250} src={product.thumbnail} alt={product.title} />
              <h3>Product: {product.title}</h3>
              <p>{product.description}</p>
              <div>
                <span>Brand: {product.brand}</span>
                <span>Price: ${product.price}</span>
              </div>
              <Link state={location} to={`/products/${product.id}`}>
                See the details
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default ProductList;
