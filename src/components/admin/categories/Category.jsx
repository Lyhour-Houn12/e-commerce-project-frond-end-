import { useDispatch, useSelector } from "react-redux";
import SpinnerScreen from "../../../ui/SpinnerScreen";
import { MdCategory } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { adminCategoryTable } from "../../data/TableColumn";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useCategoryFilter } from "../../hook/useCategoryFilter";
import Modal from "../../../ui/Modal";
import AddCategoryForm from "./AddCategoryForm";
import { DeleteModal } from "../../../ui/DeleteModal";
import { deleteCategory } from "../../../store/action";
import toast from "react-hot-toast";

const Category = () => {
  const { isLoading, categoryLoader } = useSelector((state) => state.errors);
  const { categories, pagination } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1,
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [openUpdateCategory, setOpenUpdateCategory] = useState(false);
  const [openDeleteCategory, setOpenDeleteCategory] = useState(false);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathName = useLocation().pathname;
  const navigate = useNavigate();
  useCategoryFilter();

  const emptyCategory = !categories || categories.length == 0;

  function handlePaginationChange(paginationModel) {
    const page = paginationModel.page + 1;

    setCurrentPage(page);

    params.set("page", page);

    navigate(`${pathName}?${params}`);
  }
  function handleEdit(category) {
    setSelectedCategory(category);
    setOpenUpdateCategory(true);
  }
  function handleDelete(category) {
    setSelectedCategory(category);
    setOpenDeleteCategory(true);
  }

  function onDeleteCategory() {
    dispatch(
      deleteCategory(
        selectedCategory?.id,
        setLoader,
        toast,
        setOpenDeleteCategory,
      ),
    );
  }

  const tableRow = categories?.map((item) => {
    return {
      id: item.categoryId,
      categoryName: item.categoryName,
    };
  });

  if (isLoading || categoryLoader) return <SpinnerScreen />;
  return (
    <div className="pb-4 text-center text-2xl font-semibold uppercase">
      <h2>All Category</h2>
      <div className="flex justify-end pt-6 pb-10">
        <button
          onClick={() => setOpenAddCategory(true)}
          className="bg-custom-blue flex items-center gap-2 rounded-md px-4 py-2 font-semibold text-white shadow-md transition-colors duration-300 hover:bg-blue-800 hover:text-slate-300"
        >
          <MdCategory className="text-xl" />
          Add Product
        </button>
      </div>
      {emptyCategory ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-600">
          <FaBoxOpen size={50} className="mb-3" />
          <h2 className="text-2xl font-semibold">No Category Created Yet</h2>
        </div>
      ) : (
        <>
          <Box>
            <DataGrid
              autoHeight
              rows={tableRow}
              columns={adminCategoryTable(handleEdit, handleDelete)}
              initialState={{
                pagination: {
                  paginationModel: {
                    page: currentPage - 1,
                    pageSize: pagination?.pageSize || 10,
                  },
                },
              }}
              rowCount={pagination?.totalElements}
              paginationMode="server"
              onPaginationModelChange={handlePaginationChange}
              disableRowSelectionOnClick
              disableColumnResize
              pageSizeOptions={[pagination?.pageSize || 10]}
              pagination
            />
          </Box>

          <Modal
            open={openAddCategory || openUpdateCategory}
            setOpen={
              openAddCategory ? setOpenAddCategory : setOpenUpdateCategory
            }
            title={openAddCategory ? "Add Category" : "Edit Category"}
          >
            <AddCategoryForm
              setOpen={
                openAddCategory ? setOpenAddCategory : setOpenUpdateCategory
              }
              category={selectedCategory}
              update={openUpdateCategory}
            />
          </Modal>

          <DeleteModal
            loader={categoryLoader || loader}
            onDeleteHandler={onDeleteCategory}
            open={openDeleteCategory}
            setOpen={setOpenDeleteCategory}
            title="Are you sure to delete this category?"
          />
        </>
      )}
    </div>
  );
};

export default Category;
