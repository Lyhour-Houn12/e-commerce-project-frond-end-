import { Button } from "@mui/material";
import { useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Spinner from "../../../ui/Spinner";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateProductImageFromDashboard } from "../../../store/action";
import { buildProductQuery } from "../../../utility/buildProductQuery";
import { useSearchParams } from "react-router-dom";

const ImageUpdateForm = ({ product, setOpen }) => {
  const fileInputRef = useRef();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [previewImage, setPreviewImage] = useState(null); // use to preview image before sending to a server
  const [selectedFile, setSelectedFile] = useState(null); // use to send to a server or into a particular product
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user.roles.includes("ROLE_ADMIN");

  function onHandleImageChange(e) {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    } else {
      toast.error("Please select a valid image file (.jpeg, .jpg,. png)");
      setPreviewImage(null);
      setSelectedFile(null);
      fileInputRef.current.value = null;
    }
  }

  function handleClearImage() {
    setPreviewImage(null);
    setSelectedFile(null);
  }

  async function handleUploadImageProduct(e) {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select an image before saving.");
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedFile);
    const query = buildProductQuery(searchParams);
    dispatch(
      updateProductImageFromDashboard(
        formData,
        setLoader,
        product?.id,
        toast,
        setOpen,
        isAdmin,
        query,
      ),
    );
  }
  return (
    <div className="relative h-full py-5">
      <form className="space-y-4" onSubmit={handleUploadImageProduct}>
        <div className="flex w-full flex-col gap-4">
          <label className="text-custom-blue hover:border-custom-blue flex h-44 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:bg-slate-100">
            <FaCloudUploadAlt size={40} />

            <div className="text-center">
              <p className="font-semibold">Upload Product Image</p>
              <p className="text-sm text-slate-500">
                JPEG, JPG or PNG (Max 5MB)
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".jpeg,.jpg,.png"
              onChange={onHandleImageChange}
            />
          </label>

          {previewImage && (
            <div className="mt-2 flex flex-col items-center">
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-2 shadow-sm">
                <img
                  src={previewImage}
                  alt="Product Preview"
                  className="h-64 w-64 rounded-lg object-cover"
                />
              </div>

              <button
                type="button"
                onClick={handleClearImage}
                className="mt-4 rounded-lg bg-red-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-600"
              >
                Remove Image
              </button>
            </div>
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
              "Update"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ImageUpdateForm;
