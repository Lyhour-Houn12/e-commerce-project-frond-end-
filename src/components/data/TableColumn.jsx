import { FaEdit, FaEye, FaImage, FaTrashAlt } from "react-icons/fa";
import OrderStatusBadge from "../../ui/OrderStatusBadge";
import { MdOutlineEmail } from "react-icons/md";
export const adminProductTable = (
  handleEdit,
  handleDelete,
  handleUploadImage,
  handleProductView,
) => [
  {
    disableColumnMenu: true,
    sortable: false,
    field: "id",
    headerName: "Product ID",
    width: 200,
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: () => <span className="text-center">Product ID</span>,
  },
  {
    disableColumnMenu: true,
    field: "productName",
    headerName: "Product Name",
    width: 260,
    headerAlign: "center",
    sortable: false,
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: () => <span className="text-center">Email</span>,
  },
  {
    disableColumnMenu: true,
    field: "price",
    headerName: "Price",
    width: 200,
    headerAlign: "center",
    sortable: false,
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: () => <span className="text-center">Price</span>,
  },
  {
    disableColumnMenu: true,
    field: "quantity",
    headerName: "Quantity",
    width: 200,
    headerAlign: "center",
    sortable: false,
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: () => <span className="text-center">Quantity</span>,
  },
  {
    disableColumnMenu: true,
    field: "specialPrice",
    headerName: "Special Price",
    align: "center",
    width: 200,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border ",
    cellClassName: "text-slate-700 font-normal border text-center",
    renderHeader: () => <span>Special Price</span>,
  },
  {
    disableColumnMenu: true,
    field: "description",
    headerName: "Description",
    align: "center",
    width: 200,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border ",
    cellClassName: "text-slate-700 font-normal border text-center",
    renderHeader: () => <span>Description</span>,
  },
  {
    disableColumnMenu: true,
    field: "image",
    headerName: "Image",
    align: "center",
    width: 200,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border ",
    cellClassName: "text-slate-700 font-normal border text-center",
    renderHeader: () => <span className="ps-10">Image</span>,
  },
  {
    disableColumnMenu: true,
    field: "action",
    headerName: "Action",
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold text-center",
    cellClassName: "text-slate-700 font-normal",
    sortable: false,
    width: 400,
    renderHeader: () => <span>Action</span>,
    renderCell: (params) => {
      return (
        <div className="flex h-full items-center justify-center space-x-2 pt-2">
          <button
            onClick={() => handleUploadImage(params.row)}
            className="flex h-9 items-center rounded-md bg-green-500 px-4 text-white hover:bg-green-600"
          >
            <FaImage className="mr-2" />
            Image
          </button>
          <button
            onClick={() => handleEdit(params.row)}
            className="flex h-9 items-center rounded-md bg-blue-500 px-4 text-white"
          >
            <FaEdit className="mr-2" />
            Edit
          </button>

          <button
            onClick={() => handleDelete(params.row)}
            className="flex h-9 items-center rounded-md bg-red-500 px-4 text-white"
          >
            <FaTrashAlt className="mr-2" />
            Delete
          </button>

          <button
            onClick={() => handleProductView(params.row)}
            className="flex h-9 items-center rounded-md bg-slate-800 px-4 text-white"
          >
            <FaEye className="mr-2" />
            View
          </button>
        </div>
      );
    },
  },
];
export const adminCategoryTable = (handleEdit, handleDelete) => [
  {
    disableColumnMenu: true,
    sortable: false,
    field: "id",
    headerName: "Category ID",
    align: "center",
    minWidth: 250,
    headerAlign: "center",
    editable: false,
    flex: 1,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: () => <span className="text-center">Category ID</span>,
  },
  {
    disableColumnMenu: true,
    field: "categoryName",
    headerName: "Category Name",
    minWidth: 300,
    headerAlign: "center",
    align: "center",
    sortable: false,
    editable: false,
    flex: 1,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: () => <span className="text-center">Category Name</span>,
  },

  {
    disableColumnMenu: true,
    field: "action",
    headerName: "Action",

    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold text-center",
    cellClassName: "text-slate-700 font-normal",
    sortable: false,
    minWidth: 400,
    flex: 2,
    renderHeader: () => <span>Action</span>,
    renderCell: (params) => {
      return (
        <div className="flex h-full items-center justify-center space-x-2 pt-2">
          <button
            onClick={() => handleEdit(params.row)}
            className="flex h-9 items-center rounded-md bg-blue-500 px-4 text-white"
          >
            <FaEdit className="mr-2" />
            Edit
          </button>

          <button
            onClick={() => handleDelete(params.row)}
            className="flex h-9 items-center rounded-md bg-red-500 px-4 text-white"
          >
            <FaTrashAlt className="mr-2" />
            Delete
          </button>
        </div>
      );
    },
  },
];

export const adminTableColumn = (handleEdit) => [
  {
    disableColumnMenu: true,
    sortable: false,
    field: "id",
    headerName: "orderId",
    minWidth: 220,
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: () => <span className="text-center">Order ID</span>,
  },
  {
    disableColumnMenu: true,
    field: "email",
    headerName: "Email",
    minWidth: 225,
    headerAlign: "center",
    sortable: false,
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: () => <span className="text-center">Email</span>,
  },
  {
    disableColumnMenu: true,
    field: "totalAmount",
    headerName: "Total Amount",
    minWidth: 200,
    headerAlign: "center",
    sortable: true,
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: () => <span className="text-center">Total Amount</span>,
  },
  {
    disableColumnMenu: true,
    field: "status",
    headerName: "Status",
    minWidth: 209,
    headerAlign: "center",
    sortable: false,
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: () => <span className="text-center">Status</span>,
    renderCell: (params) => <OrderStatusBadge status={params.value} />,
  },
  {
    disableColumnMenu: true,
    field: "date",
    headerName: "Order Date",
    align: "center",
    width: 220,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border ",
    cellClassName: "text-slate-700 font-normal border text-center",
    renderHeader: () => <span>Order Date</span>,
  },
  {
    disableColumnMenu: true,
    field: "action",
    headerName: "Action",
    align: "center",
    width: 280,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border ",
    cellClassName: "text-slate-700 font-normal border text-center",
    renderHeader: () => <span>Action</span>,
    renderCell: (params) => {
      return (
        <div className="flex h-full items-center justify-center space-x-2 pt-2">
          <button
            onClick={() => handleEdit(params.row)}
            className="flex h-9 items-center rounded-md bg-blue-500 px-4 text-white"
          >
            <FaEdit className="mr-2" />
            Edit
          </button>
        </div>
      );
    },
  },
];
export const sellerTableColumns = [
  {
    disableColumnMenu: true,
    field: "id",
    headerName: "ID",
    minWidth: 400,
    headerAlign: "center",
    align: "center",
    editable: false,
    flex: 1,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: (params) => <span className="text-center">SellerID</span>,
  },
  {
    disableColumnMenu: true,
    field: "username",
    headerName: "UserName",
    minWidth: 400,
    headerAlign: "center",
    align: "center",
    editable: false,
    sortable: false,
    flex: 1,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: (params) => <span className="text-center">UserName</span>,
  },
  {
    disableColumnMenu: true,
    field: "email",
    headerName: "Email",
    align: "center",
    width: 400,
    editable: false,
    sortable: false,
    flex: 2,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border ",
    cellClassName: "text-slate-700 font-normal border text-center",
    renderHeader: (params) => <span>Email</span>,
    renderCell: (params) => {
      return (
        <div className="flex items-center justify-center gap-1">
          <span>
            <MdOutlineEmail className="text-lg text-slate-700" />
          </span>
          <span>{params?.row?.email}</span>
        </div>
      );
    },
  },
];
