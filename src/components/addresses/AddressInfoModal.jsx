import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";

const AddressInfoModal = ({ open, setOpen, children }) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      {/* Backdrop */}
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/50 backdrop-blur-sm duration-300 data-closed:opacity-0"
      />

      {/* Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          transition
          className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl duration-300 data-closed:scale-95 data-closed:opacity-0"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Address Information
              </h2>
              <p className="text-sm text-slate-500">
                Add or update your delivery address
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
            {children}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default AddressInfoModal;
