import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { FaUserAlt, FaUserEdit } from "react-icons/fa";
import Modal from "../../../ui/Modal";
import AddUserForm from "./AddUserForm";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSellerFilter } from "../../hook/useSellerFilter";
import { sellerTableColumns } from "../../data/TableColumn";
import { useSelector } from "react-redux";
import SpinnerScreen from "../../../ui/SpinnerScreen";

const Seller = () => {
  const { isLoading } = useSelector((state) => state.errors);
  const { sellers, pagination } = useSelector((state) => state.sellers);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathName = useLocation().pathname;
  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1,
  );
  const navigate = useNavigate();
  const emptyUser = !sellers || sellers.length === 0;

  useSellerFilter();

  const tableRow = sellers?.map((item) => {
    return {
      id: item.id,
      username: item.username,
      email: item.email,
    };
  });
  function handlePaginationChange(paginationModel) {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page);
    navigate(`${pathName}?${params}`);
  }

  if (isLoading) return <SpinnerScreen />;

  return (
    <div className="pb-4 text-center text-2xl font-semibold uppercase">
      <h2>All Users</h2>
      <div className="flex justify-end pt-6 pb-10">
        <button
          onClick={() => setOpenAddUser(true)}
          className="bg-custom-blue flex items-center gap-2 rounded-md px-4 py-2 font-semibold text-white shadow-md transition-colors duration-300 hover:bg-blue-800 hover:text-slate-300"
        >
          <FaUserAlt className="text-xl" />
          Add User
        </button>
      </div>
      {emptyUser ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-600">
          <FaUserEdit size={50} className="mb-3" />
          <h2 className="text-2xl font-semibold">No User Created Yet</h2>
        </div>
      ) : (
        <>
          <Box>
            <DataGrid
              autoHeight
              rows={tableRow}
              columns={sellerTableColumns}
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

          <Modal open={openAddUser} setOpen={setOpenAddUser} title="Add User">
            <AddUserForm setOpen={setOpenAddUser} />
          </Modal>
        </>
      )}
    </div>
  );
};

export default Seller;
