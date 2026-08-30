import { FaEdit, FaStreetView, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  MdAddLocation,
  MdLocationCity,
  MdPinDrop,
  MdPublic,
} from "react-icons/md";
import { selectedUserAddress } from "../../store/action";

const AddressList = ({
  addresses,
  setSelectedAddress,
  setOpenAddressModal,
  setOpenDeleteModal,
}) => {
  const dispatch = useDispatch();
  const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);

  const onEditButtonHandler = (addresses) => {
    setSelectedAddress(addresses);
    setOpenAddressModal(true);
  };

  const onDeleteButtonHandler = (addresses) => {
    setSelectedAddress(addresses);
    setOpenDeleteModal(true);
  };

  function handleAddressSelection(addresses) {
    dispatch(selectedUserAddress(addresses));
  }

  return (
    <div className="flex flex-col-reverse space-y-4">
      {addresses.map((address) => {
        const isSelected =
          selectedUserCheckoutAddress?.addressId === address.addressId;

        return (
          <div
            key={address.addressId}
            onClick={() => handleAddressSelection(address)}
            className={`group relative overflow-hidden rounded-2xl border p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
              isSelected
                ? "border-emerald-500 bg-emerald-600 text-white"
                : "border-slate-200 bg-white hover:border-blue-200"
            }`}
          >
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={() => {
                  onEditButtonHandler(address);
                }}
                className={`rounded-lg p-2 transition ${
                  isSelected
                    ? "text-emerald-100 hover:bg-emerald-500 hover:text-white"
                    : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <FaEdit size={16} />
              </button>

              <button
                onClick={() => onDeleteButtonHandler(address)}
                className={`rounded-lg p-2 transition ${
                  isSelected
                    ? "text-emerald-100 hover:bg-emerald-500 hover:text-white"
                    : "text-slate-500 hover:bg-red-50 hover:text-red-600"
                }`}
              >
                <FaTrash size={16} />
              </button>
            </div>

            {/* Address Content */}
            <div className="pr-20">
              <div className="mb-4 flex items-center gap-2">
                <div
                  className={`rounded-lg p-2 ${isSelected ? "bg-emerald-500" : "bg-blue-50"}`}
                >
                  <MdAddLocation
                    size={20}
                    className={isSelected ? "text-white" : "text-blue-600"}
                  />
                </div>

                <h3
                  className={`text-lg font-semibold ${isSelected ? "text-white" : "text-slate-800"}`}
                >
                  {address.buildingName}
                </h3>
              </div>

              <div
                className={`space-y-3 text-sm ${isSelected ? "text-emerald-100" : "text-slate-600"}`}
              >
                <div className="flex items-center gap-3">
                  <FaStreetView
                    size={16}
                    className={
                      isSelected ? "text-emerald-200" : "text-slate-400"
                    }
                  />
                  <span>{address.street}</span>
                </div>

                <div className="flex items-center gap-3">
                  <MdLocationCity
                    size={18}
                    className={
                      isSelected ? "text-emerald-200" : "text-slate-400"
                    }
                  />
                  <span>{address.state}</span>
                </div>

                <div className="flex items-center gap-3">
                  <MdPinDrop
                    size={18}
                    className={
                      isSelected ? "text-emerald-200" : "text-slate-400"
                    }
                  />
                  <span>{address.pinCode}</span>
                </div>

                <div className="flex items-center gap-3">
                  <MdPublic
                    size={18}
                    className={
                      isSelected ? "text-emerald-200" : "text-slate-400"
                    }
                  />
                  <span>{address.country}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AddressList;
