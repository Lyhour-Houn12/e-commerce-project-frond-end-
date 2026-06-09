import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaSearch } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Button,
} from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Filter = ({ categories }) => {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const currentCategory = searchParams.get("category") || "all";
    const currentSortOrder = searchParams.get("sortBy") || "asc";
    const currentSearchTerm = searchParams.get("keyword") || "";

    setCategory(currentCategory);
    setSortOrder(currentSortOrder);
    setSearchTerm(currentSearchTerm);
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (searchTerm) {
        params.set("keyword", searchTerm);
      } else {
        params.delete("keyword");
      }
      params.set("page", "1");
      navigate(`${pathname}?${params.toString()}`);
    }, 700);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  function handleCategory(e) {
    const selectedCategory = e.target.value;
    if (selectedCategory === "all") {
      params.delete("category");
    } else {
      params.set("category", selectedCategory);
    }
    params.set("page", "1");
    navigate(`${pathname}?${params}`);
    setCategory(e.target.value);
  }

  function toggleSortOrder() {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    params.set("sortDir", newOrder);
    params.set("page", "1");
    navigate(`${pathname}?${params}`);
    setSortOrder(newOrder);
  }

  function handleClearFilters() {
    navigate({ pathname: window.location.pathname });
  }

  return (
    <div className="flex flex-col-reverse items-center justify-center gap-4 lg:flex-row lg:justify-between">
      <div className="relative flex w-full items-center sm:w-[420px] 2xl:w-[450px]">
        <input
          type="text"
          placeholder="Search Product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-md border border-gray-400 py-2 pl-10 text-slate-800 duration-200 focus:ring-2 focus:ring-[#1976d2] focus:outline-none"
        />
        <FaSearch className="size={20} absolute left-3 text-slate-800" />
      </div>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <FormControl
          variant="outlined"
          size="small"
          className="border-slate-700 text-slate-700"
        >
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            id="category-select-label"
            value={category}
            onChange={handleCategory}
            label="Category"
            className="min-w-[120px] border-slate-700 text-slate-800"
          >
            <MenuItem value="all">All</MenuItem>

            {categories?.map((item) => (
              <MenuItem key={item.categoryId} value={item.categoryName}>
                {item.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Tooltip title={`Sorted by price: ${sortOrder}`}>
          <Button
            onClick={toggleSortOrder}
            variant="contained"
            color="primary"
            className="flex h-10 items-center gap-2"
          >
            SORT BY{" "}
            {sortOrder === "asc" ? (
              <FaArrowUp size={14} />
            ) : (
              <FaArrowDown size={14} />
            )}
          </Button>
        </Tooltip>
        <button
          onClick={handleClearFilters}
          className="flex items-center gap-2 rounded-md bg-rose-700 px-3 py-2 text-white shadow-md transition duration-300 ease-in"
        >
          <FiRefreshCcw size={14} />
          <span className="font-semibold">CLEAR FILTER</span>
        </button>
      </div>
    </div>
  );
};

export default Filter;
