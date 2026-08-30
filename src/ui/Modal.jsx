import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { RxCross1 } from "react-icons/rx";

const Modal = ({ open, setOpen, title = "", children }) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-10"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0" />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative flex w-screen max-w-[700px] transform flex-col bg-white transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="px-4 sm:px-6">
                <DialogTitle className="text-base leading-6 font-semibold text-gray-900">
                  Panel Title
                </DialogTitle>
              </div>
              <div className="relative mt-6 flex-1 p-8">
                <div className="flex justify-between border-b pb-8">
                  <h1 className="font-montserrat pt-4 text-2xl font-bold text-slate-800">
                    {title}
                  </h1>
                  <button onClick={() => setOpen(false)}>
                    <RxCross1 className="text-2xl text-slate-800" />
                  </button>
                </div>
                {children}
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
