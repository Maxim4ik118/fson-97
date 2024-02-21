import css from "../../App.module.css";
import ProductCard from "../ProductCard/ProductCard";

const ProductGallery = ({ productData }) => {
  return (
    <div className={css.cardGrid}>
      {[...productData]
        .sort((a, b) => {
          const isPromotionalA = a.quantity <= 2;
          const isPromotionalB = b.quantity <= 2;
          return isPromotionalB - isPromotionalA;
        })
        .map((item) => {
          const isPromotional = item.quantity <= 2;

          return (
            <ProductCard
              key={item.id}
              productName={item.productName}
              img={item.img}
              price={item.price}
              hasDiscount={item.hasDiscount}
              quantity={item.quantity}
              description={item.description}
              promotional={isPromotional}
            />
          );
        })}
    </div>
  );
};

export default ProductGallery;
