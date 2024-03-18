import { useParams } from "react-router-dom";

const ProductComments = () => {
  const { productId } = useParams();
  return <div>Some comments for productId: {productId}</div>;
};

export default ProductComments;
