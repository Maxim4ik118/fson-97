import ProductCard from "./components/ProductCard";
import MailBox from "./components/MailBox";
import "./App.css";
// import iconReact from "./assets/react.svg";

const productData = [
  {
    id: "1_product",
    productName: "Taco Black",
    img: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640",
    price: 10.99,
    hasDiscount: true,
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat, reprehenderit?",
  },
  {
    id: "2_product",
    productName: "Big Mak",
    img: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640",
    price: 6.25,
    hasDiscount: false,
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat, reprehenderit?",
  },
  {
    id: "3_product",
    productName: "Taco S",
    img: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640",
    price: 3.99,
    hasDiscount: false,
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat, reprehenderit?",
  },
];

function App() {
  return (
    <div>
      <MailBox />
      {productData.map((item) => {
        return (
          <ProductCard
            key={item.id}
            productName={item.productName}
            img={item.img}
            price={item.price}
            hasDiscount={item.hasDiscount}
            description={item.description}
          />
        );
      })}
      {/* 
      <ProductCard
        productName="Taco Black"
        img="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640"
        price={10.99}
        hasDiscount={true}
        description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat, reprehenderit?"
      /> */}
    </div>
  );
}

export default App;
