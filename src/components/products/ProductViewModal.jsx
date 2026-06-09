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
          <DialogPanel className="relative w-full transform overflow-hidden rounded-lg bg-white shadow-xl transition-all md:max-w-[620px] md:min-w-[620px]">
            {image && (
              <div className="flex aspect-[3/2] justify-center">
                <img src={image} alt={productName} />
              </div>
            )}
            <div className="p-b2 px-6 pt-10">
              <DialogTitle
                as="h3"
                className="mb-4 text-xl leading-6 font-semibold text-gray-800 sm:text-2xl lg:text-3xl"
              >
                {productName}
              </DialogTitle>
              <div className="space-y-2 pb-4 text-gray-700">
                <div className="flex items-center justify-between gap-2">
                  {specialPrice ? (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 line-through">
                        ${Number(price).toFixed(2)}
                      </span>
                      <span className="font-semibold text-slate-700 sm:text-xl">
                        ${Number(specialPrice).toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xl font-bold">
                      {" "}
                      ${Number(price).toFixed(2)}
                    </span>
                  )}

                  {isAvailable ? (
                    <Status
                      text="In Stock"
                      icon={<FaCheck />}
                      bg="bg-teal-200"
                      color="text-teal-900"
                    />
                  ) : (
                    <Status
                      text="Out-Of-Stock"
                      icon={<HiOutlineX />}
                      bg="bg-rose-200"
                      color="text-rose-700"
                    />
                  )}
                </div>
              </div>

              <div className="border-t border-gray-300 pt-4">
                <p>{description}</p>
              </div>
            </div>

            <div className="flex justify-end gap-4 px-6 py-4">
              <button
                onClick={() => setOpen(false)}
                type="button"
                className="rounded-md border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-800 hover:text-slate-800"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
export default ProductViewModal;
