import { DataGrid } from "@mui/x-data-grid";
import { adminTableColumn } from "../../data/TableColumn";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Box } from "@mui/material";
import Modal from "../../../ui/Modal";
import { formatDate } from "../../../utility/formatDate";
import UpdateOrderForm from "./UpdateOrderForm";

const OrderDetails = ({ adminOrder, pagination }) => {
  const [updateOpenModal, setUpdateOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    (pagination?.pageNumber ?? 0) + 1,
  );
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (pagination.totalPages > 0 && currentPage > pagination.totalPages) {
      params.set("page", pagination.totalPages.toString());
      navigate(`${pathName}?${params}`, { replace: true });
    }
  }, [pagination.totalPages]);

  const tableRecords = adminOrder?.map((item) => {
    return {
      id: item.orderId,
      email: item.email,
      totalAmount: item.totalAmount,
      status: item.orderStatus,
      date: formatDate(item.orderDate),
    };
  });

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathName}?${params}`);
  };

  function handleEdit(order) {
    setSelectedItem(order);
    setUpdateOpenModal(true);
  }

  return (
    <div>
      <h1 className="pb-6 text-center text-3xl font-bold text-slate-800 uppercase">
        All Orders
      </h1>
      <Box>
        <DataGrid
          autoHeight
          className="w-full"
          rows={tableRecords}
          rowCount={pagination.totalElements}
          columns={adminTableColumn(handleEdit)}
          initialState={{
            pagination: {
              paginationModel: {
                page: currentPage - 1,
                pageSize: pagination?.pageSize || 10,
              },
            },
          }}
          paginationMode="server"
          onPaginationModelChange={handlePaginationChange}
          disableRowSelectionOnClick
          disableColumnResize
          pageSizeOptions={[pagination?.pageSize || 10]}
          pagination
        />
      </Box>

      <Modal
        open={updateOpenModal}
        setOpen={setUpdateOpenModal}
        title="Edit Order Status"
      >
        <UpdateOrderForm
          setOpen={setUpdateOpenModal}
          selectedId={selectedItem.id}
          selectedItem={selectedItem}
          loader={loader}
          setLoader={setLoader}
        />
      </Modal>
    </div>
  );
};

export default OrderDetails;
