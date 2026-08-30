import { Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar";
import { useState } from "react";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { RxCross1 } from "react-icons/rx";
import { FaBars } from "react-icons/fa";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      {/* Mobile sidebar dialog */}
      <Dialog
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        className="relative z-50 xl:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close Sidebar</span>
                  <RxCross1 className="text-2xl text-white" />
                </button>
              </div>
            </TransitionChild>
            <Sidebar />
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop sidebar — fixed, starts below the 70px navbar rendered in App.jsx */}
      <aside className="hidden xl:fixed xl:top-[70px] xl:bottom-0 xl:left-0 xl:z-40 xl:flex xl:w-72 xl:flex-col">
        <Sidebar />
      </aside>

      {/* Mobile sidebar toggle */}
      <div className="xl:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="-m-2.5 p-4 text-gray-700"
        >
          <span className="sr-only">Open Sidebar</span>
          <FaBars className="text-2xl text-slate-800" />
        </button>
      </div>

      {/* Main content, offset for sidebar on desktop */}
      <div className="xl:pl-72">
        <main className="p-4 sm:p-6 xl:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
