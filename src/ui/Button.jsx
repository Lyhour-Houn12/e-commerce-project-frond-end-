import { IoMdAdd } from "react-icons/io";
const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-emerald-500 bg-white px-6 py-3 font-semibold text-emerald-600 shadow-sm transition-all duration-300 hover:shadow-md"
    >
      <span className="absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-gradient-to-r from-emerald-500 to-emerald-600 text-white transition-transform duration-300 group-hover:translate-x-0">
        <IoMdAdd size={22}/>
      </span>

      <span className="absolute flex h-full w-full items-center justify-center text-emerald-600 transition-all duration-300 group-hover:translate-x-full">
        {children}
      </span>

      <span className="invisible relative">{children}</span>
    </button>
  );
};

export default Button;
