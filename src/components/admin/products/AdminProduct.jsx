import { useDispatch, useSelector } from "react-redux";
import SpinnerScreen from "../../../ui/SpinnerScreen";
import { MdShoppingCart } from "react-icons/md";
import { useEffect, useState } from "react";
import { FaBoxOpen } from "react-icons/fa";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { adminProductTable } from "../../data/TableColumn";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Modal from "../../../ui/Modal";
import AddProductForm from "./AddProductForm";
import Filter from "../../products/Filter";
import {
  deleteProductFromDashboard,
  fetchCategories,
} from "../../../store/action";
import { DeleteModal } from "../../../ui/DeleteModal";
import toast from "react-hot-toast";
import ImageUpdateForm from "./ImageUpdateForm";
import ProductViewModal from "../../products/ProductViewModal";
import { useProductFilterForSellerAdmin } from "../../hook/useProductFilterForSellerAdmin";
import { buildProductQuery } from "../../../utility/buildProductQuery";

const AdminProduct = () => {
  const { isLoading } = useSelector((state) => state.errors);
  const { categories, products, pagination } = useSelector(
    (state) => state.products,
  );
  const [loader, setLoader] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openImageUploadModal, setOpenImageUploadModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [currentPage, setCurrentPage] = useState(pagination?.pageNumber || 1);
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathName = useLocation().pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user.roles.includes("ROLE_ADMIN");
  useProductFilterForSellerAdmin();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const emptyProduct = !products || products?.length === 0;
  const isAvailable = selectedProduct?.quantity > 0;

  function handlePaginationChange(paginationModel) {
    const page = paginationModel.page + 1;

    setCurrentPage(page);

    params.set("page", page);

    navigate(`${pathName}?${params}`);
  }

  const tableRows = products.map((item) => {
    return {
      id: item.productId,
      productName: item.productName,
      image: item.image,
      description: item.description,
      quantity: item.quantity,
      price: item.price,
      discount: item.discount,
      specialPrice: item.specialPrice,
    };
  });
  function handleEdit(product) {
    setSelectedProduct(product);
    setOpenUpdateModal(true);
  }
  function handleDelete(product) {
    setSelectedProduct(product);
    setOpenDeleteModal(true);
  }
  function handleUploadImage(product) {
    setSelectedProduct(product);
    setOpenImageUploadModal(true);
  }
  function handleProductView(product) {
    setSelectedProduct(product);
    setOpenViewModal(true);
  }

  function onDeleteProductHandler() {
    const query = buildProductQuery(searchParams);
    dispatch(
      deleteProductFromDashboard(
        setLoader,
        selectedProduct?.id,
        toast,
        setOpenDeleteModal,
        isAdmin,
        query,
      ),
    );
  }

  if (isLoading) return <SpinnerScreen />;
  return (
    <div>
      <h2 className="pb-4 text-center text-2xl font-semibold uppercase">
        All Product
      </h2>
      <div className="flex justify-between pt-6 pb-10">
        <Filter categories={categories} />
        <button
          className="bg-custom-blue flex items-center gap-2 rounded-md px-4 py-2 font-semibold text-white shadow-md transition-colors duration-300 hover:bg-blue-800 hover:text-slate-300"
          onClick={() => setOpenAddModal(true)}
        >
          <MdShoppingCart className="text-xl" />
          Add Product
        </button>
      </div>
      {emptyProduct ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-600">
          <FaBoxOpen size={50} className="mb-3" />
          <h2 className="text-2xl font-semibold">No Product Created Yet</h2>
        </div>
      ) : (
        <>
          <Box sx={{ width: "100%" }}>
            <DataGrid
              autoHeight
              className="w-full"
              rows={tableRows}
              columns={adminProductTable(
                handleEdit,
                handleDelete,
                handleUploadImage,
                handleProductView,
              )}
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
            open={openUpdateModal || openAddModal}
            setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
            title={openUpdateModal ? "Edit Product" : "Add Product"}
          >
            <AddProductForm
              setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
              product={selectedProduct}
              update={openUpdateModal}
            />
          </Modal>

          <DeleteModal
            onDeleteHandler={onDeleteProductHandler}
            open={openDeleteModal}
            setOpen={setOpenDeleteModal}
            title="Delete Product"
            loader={loader}
          />
          <Modal
            open={openImageUploadModal}
            setOpen={setOpenImageUploadModal}
            title="Upload Product Image"
          >
            <ImageUpdateForm
              product={selectedProduct}
              setOpen={setOpenImageUploadModal}
            />
          </Modal>

          <ProductViewModal
            open={openViewModal}
            setOpen={setOpenViewModal}
            product={selectedProduct}
            isAvailable={isAvailable}
          />
        </>
      )}
    </div>
  );
};

export default AdminProduct;
