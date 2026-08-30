import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getAllOrders } from "../../store/action";
import { useEffect } from "react";

export const useOrderFilter = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user?.roles.includes("ROLE_ADMIN");

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    params.set("pageNumber", currentPage);

    const query = params.toString();
    dispatch(getAllOrders(query, isAdmin));
  }, [searchParams, dispatch]);
};
