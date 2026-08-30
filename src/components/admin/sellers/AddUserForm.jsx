import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../ui/InputField";
import { Button } from "@mui/material";
import Spinner from "../../../ui/Spinner";
import { useDispatch } from "react-redux";
import { createSeller } from "../../../store/action";
import toast from "react-hot-toast";

const AddUserForm = ({ setOpen }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  function handleAddUser(data) {
    const sendData = {
      ...data,
      role: ["seller"],
    };
    dispatch(createSeller(sendData, toast, reset, setOpen, setLoader));
  }
  return (
    <div className="relative h-full py-5">
      <form className="space-y-4" onSubmit={handleSubmit(handleAddUser)}>
        <div className="flex w-full flex-col gap-4 md:flex-col">
          <InputField
            label="Username"
            required
            id="username"
            type="text"
            placeholder="Username"
            message="This field is required"
            register={register}
            errors={errors}
          />
          <InputField
            label="Email"
            required
            id="email"
            type="email"
            placeholder="Email"
            message="This field is required"
            register={register}
            errors={errors}
          />
          <InputField
            label="Password"
            required
            id="password"
            type="password"
            placeholder="Password"
            message="This field is required"
            register={register}
            errors={errors}
          />
        </div>
        <div className="absolute bottom-14 flex w-full items-center justify-between">
          <Button
            disabled={loader}
            onClick={() => setOpen(false)}
            variant="outlined"
            className="px-4 py-[10px] text-sm font-medium text-white"
          >
            Cancel
          </Button>

          <Button
            disabled={loader}
            type="submit"
            variant="contained"
            color="primary"
            className="bg-custom-blue px-4 py-[10px] text-sm font-medium text-white"
          >
            {loader ? (
              <div className="flex items-center gap-2">
                <Spinner /> Loading...
              </div>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
