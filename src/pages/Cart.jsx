import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/carts/CartItem";
import CartEmpty from "../components/carts/CartEmpty";
import { useEffect } from "react";
import { fetchProducts } from "../store/action";
import { formatPrice } from "../utility/formatPrice";
const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((item) => item.carts);
  const newCart = { ...cart };

  newCart.totalPrice = cart?.reduce(
    (acc, curr) => acc + Number(curr.specialPrice) * Number(curr.quantity),
    0,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (!cart || cart.length === 0) return <CartEmpty />;

  return (
    <div className="m-auto w-[88%] px-4 py-10 sm:px-8 lg:px-14">
      <div className="flex flex-col items-center justify-center">
        <h1 className="flex justify-center gap-4 text-4xl font-bold text-gray-900">
          <MdShoppingCart size={36} className="text-gray-700" />
          Your Cart
        </h1>
        <p className="mt-2 text-lg text-gray-600">All your selected items</p>
      </div>
      <div className="mt-6 grid grid-cols-4 items-center gap-4 pb-2 font-semibold md:grid-cols-5">
        <div className="justify-self-start text-lg text-slate-800 md:col-span-2 lg:ps-2">
          Product
        </div>
        <div className="text-center text-lg text-slate-800">Price</div>
        <div className="text-center text-lg text-slate-800">Quantity</div>
        <div className="text-center text-lg text-slate-800">Total</div>
      </div>
      <div className="rounded-xl bg-white shadow-md">
        {cart &&
          cart.length > 0 &&
          cart.map((cart, i) => <CartItem key={i} cart={cart} />)}
      </div>

      <div className="sm: flex flex-col justify-between gap-4 border-t-[1.5px] border-slate-300 px-2 py-4 sm:flex-row sm:px-0">
        <div></div>
        <div className="flex w-full max-w-sm flex-col gap-3 rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
          <div className="flex w-full justify-between gap-1.5 text-sm font-semibold md:text-lg">
            <span>SubTotal:</span>
            <span>{formatPrice(newCart.totalPrice)}</span>
          </div>

          <p className="text-slate-500">
            Taxes and shipping calculated at checkout
          </p>

          <Link className="flex w-full justify-end" to="/checkout">
            <button
              onClick={() => {}}
              className="bg-custom-blue flex w-full items-center justify-center gap-2 rounded-sm px-4 py-2 font-semibold text-white transition duration-300 hover:text-gray-300"
            >
              <MdShoppingCart size={22} />
              Checkout
            </button>
          </Link>

          <Link
            className="mt-2 flex items-center gap-2 text-slate-500"
            to="/products"
          >
            <MdArrowBack />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
