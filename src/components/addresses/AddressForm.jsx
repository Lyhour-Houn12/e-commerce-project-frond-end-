import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../ui/InputField";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";
import { addUpdateUserAddress } from "../../store/action";
import { useEffect } from "react";

const AddressForm = ({ address, setOpenAddressModal }) => {
  const { btnLoader } = useSelector((state) => state.errors);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onTouched" });
  const dispatch = useDispatch();

  async function onSaveAddressHandler(data) {
    dispatch(
      addUpdateUserAddress(
        data,
        reset,
        toast,
        address?.addressId,
        setOpenAddressModal,
      ),
    );
  }

  useEffect(() => {
    setValue("buildingName", address.buildingName);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pinCode", address.pinCode);
    setValue("country", address.country);
  }, [address, setValue]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          {address?.addressId ? "Edit Address" : "Add New Address"}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Provide your delivery address details below.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSaveAddressHandler)}>
        <div className="space-y-5">
          <InputField
            label="Building Name"
            required
            id="buildingName"
            type="text"
            message="*Building Name is required"
            placeholder="Apartment, Building, House Name"
            register={register}
            errors={errors}
          />

          <InputField
            label="Street Address"
            required
            id="street"
            type="text"
            message="*Street is required"
            placeholder="Street, Road, Village"
            register={register}
            errors={errors}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputField
              label="City"
              required
              id="city"
              type="text"
              message="*City is required"
              placeholder="Enter City"
              register={register}
              errors={errors}
            />

            <InputField
              label="State / Province"
              required
              id="state"
              type="text"
              message="*State is required"
              placeholder="Enter State"
              register={register}
              errors={errors}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputField
              label="Country"
              required
              id="country"
              type="text"
              message="*Country is required"
              placeholder="Enter Country"
              register={register}
              errors={errors}
            />

            <InputField
              label="Postal Code"
              required
              id="pinCode"
              type="text"
              message="*Postal Code is required"
              placeholder="Enter Postal Code"
              register={register}
              errors={errors}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
          <button
            type="button"
            onClick={() => setOpenAddressModal(false)}
            className="rounded-xl border border-slate-300 px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            disabled={btnLoader}
            type="submit"
            className="bg-custom-blue flex min-w-[140px] items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-medium text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            {btnLoader ? (
              <>
                <Spinner />
                Saving...
              </>
            ) : (
              "Save Address"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
