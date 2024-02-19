const ProductCard = ({
  img,
  productName,
  price,
  description,
  hasDiscount = false,
}) => {
  return (
    <div>
      <img width={250} src={img} alt="" />
      <h3>
        {productName} {hasDiscount ? <span>🎁 BIG SALE</span> : null}
        {/* {hasDiscount && <span>🎁 BIG SALE</span>} */}
      </h3>
      <h4>Price: ${price}</h4>
      <p>{description}</p>

      <button type="button">Add to Cart</button>
      <button type="button">😶</button>
    </div>
  );
};

export default ProductCard;
