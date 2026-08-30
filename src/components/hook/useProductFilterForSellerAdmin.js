import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProductsForSeller } from "../../store/action";
import { buildProductQuery } from "../../utility/buildProductQuery";

export function useProductFilterForSellerAdmin() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user.roles.includes("ROLE_ADMIN");
  useEffect(() => {
    const query = buildProductQuery(searchParams);
    dispatch(fetchProductsForSeller(query, isAdmin));
  }, [dispatch, searchParams, isAdmin]);
}
