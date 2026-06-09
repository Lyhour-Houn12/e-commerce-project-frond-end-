import { Pagination } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Paginations = ({ numberOfPage, numberOfElement }) => {
  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const params = new URLSearchParams(searchParams);
  const navigate = useNavigate();

  const paramValue = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  function onChangeHandler(e, value) {
    params.set("page", value.toString());
    navigate(`${pathname}?${params}`);
  }

  return (
    <div className="flex items-center justify-center pt-10">
      <Pagination
        count={numberOfPage}
        page={paramValue}
        defaultPage={1}
        siblingCount={0}
        boundaryCount={1}
        shape="rounded"
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default Paginations;
