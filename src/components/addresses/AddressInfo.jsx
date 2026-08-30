import { useState } from "react";
import Skeleton from "../../ui/Skeleton";
import { FaAddressBook } from "react-icons/fa";
import AddressInfoModal from "./AddressInfoModal";
import AddressForm from "./AddressForm";
import AddressList from "./AddressList";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { DeleteModal } from "../../ui/DeleteModal";
import { deleteUserAddress } from "../../store/action";
import toast from "react-hot-toast";

const AddressInfo = ({ address }) => {
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const noAddressExist = !address || address.length === 0;
  const { isLoading, btnLoader } = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  function addNewAddressHandler() {
    setSelectedAddress("");
    setOpenAddressModal((open) => !open);
  }

  function deleteAddressHandler() {
    dispatch(
      deleteUserAddress(selectedAddress?.addressId, toast, setOpenDeleteModal),
    );
  }

  return (
    <div className="pt-4">
      {noAddressExist ? (
        <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-lg p-6">
          <FaAddressBook size={50} className="mb-4 text-gray-500" />
          <h1 className="mb-2 text-center text-2xl font-semibold text-slate-900">
            No Address Added Yet
          </h1>
          <p className="mb-2 text-center text-slate-600">
            Please add your address to complete purchase
          </p>
          <button
            onClick={addNewAddressHandler}
            className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white"
          >
            Add Address
          </button>
        </div>
      ) : (
        <div className="relative mx-auto max-w-md rounded-lg p-6">
          <h1 className="text-center text-2xl font-bold text-slate-800">
            Select Address
          </h1>
          {isLoading ? (
            <div className="px-8 py-4">
              <Skeleton />
            </div>
          ) : (
            <>
              <div className="space-y-4 pt-6">
                <AddressList
                  addresses={address}
                  setSelectedAddress={setSelectedAddress}
                  setOpenAddressModal={setOpenAddressModal}
                  setOpenDeleteModal={setOpenDeleteModal}
                />
              </div>

              {address.length > 0 && (
                <div className="mt-4">
                  <Button onClick={addNewAddressHandler} children="Add More" />
                </div>
              )}
            </>
          )}
        </div>
      )}

      <AddressInfoModal open={openAddressModal} setOpen={setOpenAddressModal}>
        <AddressForm
          address={selectedAddress}
          setOpenAddressModal={setOpenAddressModal}
        />
      </AddressInfoModal>

      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        loader={btnLoader}
        title="Delete Address"
        onDeleteHandler={deleteAddressHandler}
      />
    </div>
  );
};

export default AddressInfo;
