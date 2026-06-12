import { FaExclamationTriangle } from "react-icons/fa";
import { useSelector } from "react-redux";

const ErrorMessage = () => {
  const { errorMessage } = useSelector((state) => state.errors);
  return (
    <div className="flex h-[200px] items-center justify-center">
      <FaExclamationTriangle className="mr-2 text-3xl text-slate-800" />
      <span className="text-lg font-medium text-slate-800">{errorMessage}</span>
    </div>
  );
};

export default ErrorMessage;
