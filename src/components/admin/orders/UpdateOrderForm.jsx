import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import Spinner from "../../../ui/Spinner";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { updateOrderStatusFromDashboard } from "../../../store/action";

const ORDER_STATUS = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Accepted",
];
const UpdateOrderForm = ({
  setOpen,
  selectedId,
  selectedItem,
  loader,
  setLoader,
}) => {
  const [orderStatus, setOrderStatus] = useState(
    selectedId?.orderStatus || "Accepted",
  );
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user.roles.includes("ROLE_ADMIN");

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    if (!orderStatus) {
      setError("Order status is required");
      return;
    }
    if (!selectedItem?.id) {
      toast.error("No order selected");
      return;
    }

    dispatch(
      updateOrderStatusFromDashboard(
        selectedItem.id,
        orderStatus,
        setLoader,
        toast,
        isAdmin,
      ),
    );
  };

  return (
    <div className="relative h-full py-5">
      <form className="space-y-4" onSubmit={handleUpdateStatus}>
        <FormControl fullWidth variant="outlined" error={!!error}>
          <InputLabel id="order-status-label">Order Status</InputLabel>
          <Select
            labelId="order-status-label"
            label="Order"
            value={orderStatus}
            onChange={(e) => {
              setOrderStatus(e.target.value);
              setError("");
            }}
          >
            {ORDER_STATUS.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>

          {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
        <div className="absolute bottom-14 flex w-full items-center justify-between">
          <Button
            disabled={loader}
            onClick={() => setOpen(false)}
            variant="outlined"
            className="py-[10px] text-sm font-medium text-white"
          >
            Cancel
          </Button>
          <Button
            disabled={loader}
            type="submit"
            variant="contained"
            color="primary"
            className="bg-custom-blue py-[10px] text-sm font-medium text-white"
          >
            {loader ? (
              <div className="flex items-center gap-2">
                <Spinner /> Loading...
              </div>
            ) : (
              "Edit"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateOrderForm;
