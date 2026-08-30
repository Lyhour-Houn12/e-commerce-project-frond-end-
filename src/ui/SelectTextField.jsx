import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { FaCheck } from "react-icons/fa";

const SelectTextField = ({ label, selectItem, setSelectItem, list }) => {
  return (
    <Listbox value={selectItem} onChange={setSelectItem}>
      <div className="flex w-full flex-col gap-2">
        <label className="text-sm font-semibold text-slate-800">{label}</label>

        <div className="relative">
          <ListboxButton className="relative w-full cursor-default rounded-md border border-slate-700 bg-white py-2 text-left text-sm text-gray-600">
            <span className="block truncate ps-2">
              {selectItem?.categoryName || "Select Category"}
            </span>
          </ListboxButton>

          <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black focus:outline-none">
            {list?.map((category) => (
              <ListboxOption
                key={category.categoryId}
                value={category}
                className="group relative cursor-pointer py-2 pr-9 pl-3 text-gray-900 data-focus:bg-indigo-600 data-focus:text-white"
              >
                <span className="block truncate font-semibold">
                  {category.categoryName}
                </span>

                {selectItem?.categoryId === category.categoryId && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                    <FaCheck className="text-xl" />
                  </span>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </div>
    </Listbox>
  );
};

export default SelectTextField;
