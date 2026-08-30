import { useForm } from "react-hook-form";
import InputField from "../../../ui/InputField";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import Spinner from "../../../ui/Spinner";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  addProductFromDashboard,
  fetchCategories,
  updateProductFromDashboard,
} from "../../../store/action";
import SelectTextField from "../../../ui/SelectTextField";
import SpinnerScreen from "../../../ui/SpinnerScreen";
import ErrorPage from "../../../ui/ErrorPage";
import { useSearchParams } from "react-router-dom";
import { buildProductQuery } from "../../../utility/buildProductQuery";

const AddProductForm = ({ setOpen, product, update = false }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });
  const [loader, setLoader] = useState(false);
  const [selectedCategory, setSelectCategory] = useState("");
  const { categories } = useSelector((state) => state.products);
  const { categoryLoader, errorMessage } = useSelector((state) => state.errors);
  const [searchParams] = useSearchParams();
  const query = buildProductQuery(searchParams);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user.roles.includes("ROLE_ADMIN");

  useEffect(() => {
    if (product && update) {
      setValue("productName", product?.productName);
      setValue("quantity", product?.quantity);
      setValue("price", product?.price);
      setValue("discount", product?.discount);
      setValue("specialPrice", product?.specialPrice);
      setValue("description", product?.description);
    }
  }, [product, update, setValue]);

  const upsertProduct = (data) => {
    if (!update) {
      const sendData = {
        ...data,
        categoryId: selectedCategory.categoryId,
      };
      dispatch(
        addProductFromDashboard(
          sendData,
          toast,
          reset,
          setLoader,
          setOpen,
          isAdmin,
          query,
        ),
      );
    } else {
      const sendData = {
        ...data,
        id: product.id,
      };
      dispatch(
        updateProductFromDashboard(
          sendData,
          toast,
          reset,
          setLoader,
          setOpen,
          isAdmin,
          query,
        ),
      );
    }
  };

  useEffect(() => {
    if (!categories || (categories.length === 0 && !update)) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories, update]);

  if (categoryLoader) return <SpinnerScreen />;
  if (errorMessage) return <ErrorPage message={errorMessage} />;

  return (
    <div className="relative h-full py-5">
      <form className="space-y-4" onSubmit={handleSubmit(upsertProduct)}>
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <InputField
            label="Product Name"
            required
            id="productName"
            type="text"
            placeholder="Product Name"
            message="This field is required"
            register={register}
            errors={errors}
          />
          {!update && (
            <SelectTextField
              label="Select Category"
              selectItem={selectedCategory}
              setSelectItem={setSelectCategory}
              list={categories}
            />
          )}
        </div>
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <InputField
            label="Price"
            required
            id="price"
            type="number"
            placeholder="price"
            message="This field is required"
            register={register}
            errors={errors}
          />
          <InputField
            label="Quantity"
            required
            id="quantity"
            type="number"
            placeholder="Product Quantity"
            message="This field is required"
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <InputField
            label="Discount"
            id="discount"
            type="number"
            message="This field is required*"
            placeholder="Product Discount"
            register={register}
            errors={errors}
          />
          <InputField
            label="Special Price"
            id="specialPrice"
            type="number"
            step="0.01"
            readOnly
            placeholder="Product Discount"
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-start">
          <label
            htmlFor="description"
            className="w-32 text-sm font-semibold text-slate-800"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={5}
            placeholder="Add Product Description"
            maxLength={255}
            className={`w-full flex-1 rounded-md border bg-transparent px-2 py-2 text-slate-800 outline-none ${errors?.["description"]?.message ? "border-red-500" : "border-slate-700"}`}
            {...register("description")}
          />
          {errors["description"]?.message && (
            <p className="mt-0 text-sm font-semibold text-red-600">
              {errors["description"]?.message}
            </p>
          )}
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

export default AddProductForm;
