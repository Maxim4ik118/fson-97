import { Link } from "react-router-dom";

const ProductInfo = ({ refValue, productData }) => {
  return (
    <div>
      <Link to={refValue}>Go back</Link>
      <h1>{productData.title}</h1>
      <p>{productData.description}</p>
      <p>Price: ${productData.price}</p>
      <p>Brand: {productData.brand}</p>
      <p>Rating: {productData.rating}</p>

      <ul>
        {productData.images.map((imageSrc) => (
          <li key={imageSrc}>
            <img width={150} src={imageSrc} alt={productData.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductInfo;
