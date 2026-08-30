import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Status from "../../ui/Status";
import { FaCheck } from "react-icons/fa";
import { HiOutlineX } from "react-icons/hi";

function ProductViewModal({ open, setOpen, product, isAvailable }) {
  if (!product) return null;
  const {
    id: productId,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
  } = product;

  function handleClose() {
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={handleClose}
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500 opacity-60 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="relative w-full overflow-hidden rounded-2xl bg-white shadow-2xl md:max-w-[650px]">
            {/* Product Image */}
            {image && (
              <div className="flex h-80 items-center justify-center bg-slate-100 p-6">
                <img
                  src={image}
                  alt={productName}
                  className="h-full max-h-72 rounded-xl object-contain transition duration-300 hover:scale-105"
                />
              </div>
            )}

            <div className="space-y-5 p-6">
              {/* Title */}
              <DialogTitle className="text-3xl font-bold text-slate-800">
                {productName}
              </DialogTitle>

              {/* Price & Status */}
              <div className="flex items-center justify-between">
                <div>
                  {specialPrice ? (
                    <div className="flex items-center gap-3">
                      <span className="text-lg text-slate-400 line-through">
                        ${Number(price).toFixed(2)}
                      </span>

                      <span className="text-3xl font-bold text-blue-600">
                        ${Number(specialPrice).toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-3xl font-bold text-blue-600">
                      ${Number(price).toFixed(2)}
                    </span>
                  )}
                </div>

                {isAvailable ? (
                  <Status
                    text="In Stock"
                    icon={<FaCheck />}
                    bg="bg-green-100"
                    color="text-green-700"
                  />
                ) : (
                  <Status
                    text="Out of Stock"
                    icon={<HiOutlineX />}
                    bg="bg-red-100"
                    color="text-red-700"
                  />
                )}
              </div>

              {/* Information */}
              <div className="grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4">
                <div>
                  <p className="text-sm text-slate-500">Product ID</p>
                  <p className="font-semibold">{productId}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Quantity</p>
                  <p className="font-semibold">{quantity}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Discount</p>
                  <p className="font-semibold">{discount}%</p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Price</p>
                  <p className="font-semibold">${Number(price).toFixed(2)}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="mb-2 text-lg font-semibold text-slate-800">
                  Description
                </h4>

                <p className="leading-7 text-slate-600">{description}</p>
              </div>

              {/* Footer */}
              <div className="flex justify-end border-t pt-5">
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-slate-800 px-5 py-2 font-medium text-white transition hover:bg-slate-900"
                >
                  Close
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
export default ProductViewModal;
