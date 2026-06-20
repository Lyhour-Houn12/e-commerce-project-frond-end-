import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import { truncateText } from "../../utility/truncateText";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/action";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const {
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
  } = product;
  const dispatch = useDispatch();
  const [openProductViewModal, setProductViewModal] = useState(false);
  const btnLoader = false;
  const [selectedViewProduct, setSelectViewProduct] = useState(null);
  const isAvailable = quantity && Number(quantity) > 0;

  function handleProductView(product) {
    setSelectViewProduct(product);
    setProductViewModal(true);
  }

  const addToCartHandler = (cartItem) => {
    dispatch(addToCart(cartItem, 1, toast));
  };

  return (
    <div className="overflow-hidden rounded-lg border shadow-xl transition-shadow duration-300">
      <div
        onClick={() => {
          handleProductView(product);
        }}
        className="aspect-[3/2] w-full overflow-hidden"
      >
        <img
          src={image}
          alt={productName}
          className="h-full w-full cursor-pointer transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h2
          onClick={() => {
            handleProductView(product);
          }}
          className="mb-2 cursor-pointer text-lg font-semibold"
        >
          {truncateText(productName, 25)}
        </h2>
        <div className="max-h-20 min-h-20">
          <p className="text-sm text-gray-600">
            {truncateText(description, 70)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          {specialPrice ? (
            <div className="flex flex-col">
              <span className="text-gray-400 line-through">
                ${Number(price).toFixed(2)}
              </span>
              <span className="text-xl font-bold text-slate-700">
                ${Number(specialPrice).toFixed(2)}
              </span>
            </div>
          ) : (
            <div>
              <span className="text-xl font-bold text-slate-700">
                ${Number(price).toFixed(2)}
              </span>
            </div>
          )}
          <button
            onClick={() => addToCartHandler(product)}
            disabled={!isAvailable || btnLoader}
            className={`flex bg-blue-500 ${isAvailable ? "opacity-100 hover:bg-blue-800" : "opacity-70"} w-36 items-center justify-center rounded-lg px-3 py-2 text-white transition-colors duration-300`}
          >
            <FaShoppingCart className="mr-2" />
            {isAvailable ? "Add to Cart" : "Stock Out"}
          </button>
        </div>
      </div>
      <ProductViewModal
        open={openProductViewModal}
        setOpen={setProductViewModal}
        product={selectedViewProduct}
        isAvailable={isAvailable}
      />
    </div>
  );
};

export default ProductCard;
