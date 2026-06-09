import { BeatLoader } from "react-spinners";
const Loader = ({ text }) => {
  return (
    <div className="flex h-[450px] w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6">
        <BeatLoader
          color="#313131"
          cssOverride={{}}
          margin={1}
          size={26}
          speedMultiplier={1}
        />
        <p className="text-xl font-semibold text-slate-700">
          {text ? text : `Loading....`}
        </p>
      </div>
    </div>
  );
};

export default Loader;
