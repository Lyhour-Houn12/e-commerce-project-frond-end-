import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "../ui/HeroBanner";
import { useEffect } from "react";
import { fetchProducts } from "../store/action";
import ProductCard from "../components/products/ProductCard";
import Loader from "../ui/Loader";
import ErrorMessage from "../ui/ErrorMessage";

const Home = () => {
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) return <Loader />;
  if (errorMessage) return <ErrorMessage />;

  return (
    <div className="px-4 sm:px-8 lg:px-14">
      <div className="py-6">
        <HeroBanner />
      </div>
      <div className="py-5">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h2 className="text-4xl font-bold text-slate-800">Products</h2>
          <span className="text-xl text-slate-700">
            Discover our handpicked selection of top-rated just for you
          </span>
        </div>
      </div>
      <div className="grid gap-x-6 gap-y-6 pt-14 pb-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {products &&
          products
            ?.slice(0, 4)
            .map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
      </div>
    </div>
  );
};

export default Home;
