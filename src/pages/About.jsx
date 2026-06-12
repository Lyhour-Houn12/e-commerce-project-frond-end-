import ProductCard from "../components/products/ProductCard";

const products = [
  {
    image: "https://embarkx.com/sample/placeholder.png",
    productName: "iPhone 13 Pro Max",
    description:
      "The iPhone 13 Pro Max offers exceptional performance with its A15 Bionic chip, stunning Super Retina XDR display, and advanced camera features for breathtaking photos.",
    specialPrice: 720,
    price: 780,
  },
  {
    image: "https://embarkx.com/sample/placeholder.png",
    productName: "Samsung Galaxy S21",
    description:
      "Experience the brilliance of the Samsung Galaxy S21 with its vibrant AMOLED display, powerful camera, and sleek design that fits perfectly in your hand.",
    specialPrice: 699,
    price: 799,
  },
  {
    image: "https://embarkx.com/sample/placeholder.png",
    productName: "Google Pixel 6",
    description:
      "The Google Pixel 6 boasts cutting-edge AI features, exceptional photo quality, and a stunning display, making it a perfect choice for Android enthusiasts.",
    price: 599,
    specialPrice: 400,
  },
];

const About = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-12 text-center text-4xl font-bold text-slate-800">
        About Us
      </h1>
      <div className="mb-12 flex flex-col items-center justify-between lg:flex-row">
        <div className="w-full text-center md:w-1/2 md:text-left">
          <p className="mb-4 text-lg">
            Welcome to our e-commerce store! We are dedicated to providing the
            best products and services to our customers. Our mission is to offer
            a seamless shopping experience while ensuring the highest quality of
            our offerings.
          </p>
        </div>

        <div className="mb-6 w-full md:mb-0 md:w-1/2">
          <img
            src="https://embarkx.com/sample/placeholder.png"
            alt="About Us"
            className="h-auto w-full transform rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          ></img>
        </div>
      </div>

      <div className="space-y-8 py-7">
        <h1 className="text-center text-4xl font-bold text-slate-800">
          Our Products
        </h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard product={product} key={index} about />
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
