import { useForm } from "react-hook-form";
import InputField from "../../../ui/InputField";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import Spinner from "../../../ui/Spinner";
import { useDispatch } from "react-redux";
import { addCategory, updateCategory } from "../../../store/action";
import toast from "react-hot-toast";

const AddCategoryForm = ({ setOpen, category, update = false }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("category prop", category);
    if (category && update) {
      setValue("categoryId", category?.id);
      setValue("categoryName", category?.categoryName);
    }
  }, [category, update, setValue]);

  function handleAddUpdateCategory(data) {
    if (!update) {
      const formData = {
        ...data,
      };
      dispatch(addCategory(formData, setLoader, reset, toast, setOpen));
    } else {
      const formData = {
        ...data,
        categoryId: data?.categoryId,
      };
      console.log(formData);
      dispatch(updateCategory(formData, setLoader, reset, toast, setOpen));
    }
  }

  const [loader, setLoader] = useState(false);
  return (
    <div className="relative h-full py-5">
      <form
        className="space-y-4"
        onSubmit={handleSubmit(handleAddUpdateCategory)}
      >
        <div className="flex w-full gap-4 md:flex-col">
          <InputField
            label="Category Name"
            required
            id="categoryName"
            type="text"
            message="This field is required*"
            placeholder="Category Name"
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

export default AddCategoryForm;
