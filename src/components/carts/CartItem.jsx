import { useState } from "react";
import { truncateText } from "../../utility/truncateText";
import { useDispatch } from "react-redux";
import { HiOutlineTrash } from "react-icons/hi2";
import { formatPrice } from "../../utility/formatPrice";
import SetQuantity from "./SetQuantity";
import {
  decreaseCartQuantity,
  increaseCartQuantity,
  removeFromCart,
} from "../../store/action";
import toast from "react-hot-toast";

const CartItem = ({ cart }) => {
  const {
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
    cartId,
  } = cart;
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const dispatch = useDispatch();

  function handleQtyIncrease(cartItems) {
    dispatch(
      increaseCartQuantity(
        cartItems,
        toast,
        currentQuantity,
        setCurrentQuantity,
      ),
    );
  }

  function handleQtyDecrease(cartItems) {
    dispatch(
      decreaseCartQuantity(cartItems, currentQuantity, setCurrentQuantity),
    );
  }

  function handleRemoveCart(cartItem) {
    dispatch(removeFromCart(cartItem, toast));
  }

  return (
    <main className="grid grid-cols-4 items-center gap-4 border-b border-slate-100 py-6 md:grid-cols-5">
      <ul className="flex items-center gap-5 justify-self-start md:col-span-2">
        <li className="w-24 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-2 md:w-32">
          <img
            src={image}
            alt={productName}
            className="h-20 w-full object-contain md:h-24"
          />
        </li>

        <li className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-slate-800">
            {truncateText(productName, 30)}
          </h3>

          <p className="text-sm text-slate-500">
            {truncateText(description, 50)}
          </p>

          {discount > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-400 line-through">
                {formatPrice(price)}
              </span>

              <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">
                -{discount}%
              </span>
            </div>
          )}

          <button
            onClick={() => {
              handleRemoveCart({
                productId,
                productName,
                image,
                description,
                quantity,
                price,
                discount,
                specialPrice,
              });
            }}
            className="flex items-center gap-1 text-sm text-red-500 transition hover:text-red-700"
          >
            <HiOutlineTrash size={16} />
            Remove
          </button>
        </li>
      </ul>

      <ul className="text-center text-sm font-semibold text-slate-600 lg:text-[17px]">
        {formatPrice(specialPrice)}
      </ul>
      <ul className="text-center">
        <SetQuantity
          cardCounter={true}
          quantity={currentQuantity}
          handleQtyIncrease={() =>
            handleQtyIncrease({
              productId,
              productName,
              image,
              description,
              quantity,
              price,
              discount,
              specialPrice,
            })
          }
          handleQtyDecrease={() => {
            handleQtyDecrease({
              productId,
              productName,
              image,
              description,
              quantity,
              price,
              discount,
              specialPrice,
            });
          }}
        />
      </ul>
      <ul className="text-center text-sm font-semibold text-slate-600 lg:text-[17px]">
        {formatPrice(Number(currentQuantity) * Number(specialPrice))}
      </ul>
    </main>
  );
};

export default CartItem;
