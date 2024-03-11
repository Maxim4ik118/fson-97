const ProductList = ({ products = null }) => {
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
            </li>
          );
        })}
    </ul>
  );
};

export default ProductList;
