import { useDispatch, useSelector } from "react-redux";
import { useProductFilter } from "../components/useProductFilter";
import { useEffect } from "react";
import { fetchCategories } from "../store/action";
import Loader from "../ui/Loader";
import Filter from "../components/products/Filter";
import ProductCard from "../components/products/ProductCard";
import Paginations from "../ui/Paginations";
import { useSearchParams } from "react-router-dom";
import ErrorMessage from "../ui/ErrorMessage";
const Product = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { products, categories, pagination } = useSelector(
    (state) => state.products,
  );

  const dispatch = useDispatch();
  useProductFilter();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    if (pagination?.totalPages && currentPage > pagination.totalPages) {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      setSearchParams(params);
    }
  }, [pagination, searchParams, setSearchParams]);

  return (
    <div className="px-4 py-14 sm:px-8 lg:px-14 2xl:mx-auto 2xl:w-[90%]">
      <Filter categories={categories} />
      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <ErrorMessage />
      ) : (
        <div className="min-h-[700px]">
          <div className="grid gap-x-6 gap-y-6 pt-14 pb-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {products &&
              products.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))}
          </div>
        </div>
      )}
      <Paginations
        numberOfPage={pagination?.totalPages}
        numberOfElement={pagination?.totalElements}
      />
    </div>
  );
};

export default Product;
