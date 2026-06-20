import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosLogIn } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../ui/InputField";
import { useDispatch } from "react-redux";
import { authenticatedSignInUser } from "../store/action";
import toast from "react-hot-toast";
import Spinner from "../ui/Spinner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched" });
  async function loginHandler(data) {
    dispatch(authenticatedSignInUser(data, navigate, setLoader, toast, reset));
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
      <form
        className="shadow-custom w-[360px] rounded-md py-8 sm:w-[450px] sm:px-4"
        onSubmit={handleSubmit(loginHandler)}
      >
        <div className="flex flex-col items-center justify-center">
          <IoIosLogIn className="text-5xl text-slate-800" />
          <h1 className="font-montserrat text-center text-2xl font-bold text-slate-800 lg:text-3xl">
            Login Here
          </h1>
        </div>
        <hr className="mt-2 mb-5 text-black" />
        <div className="flex flex-col gap-3">
          <InputField
            label={"Username"}
            required
            id="username"
            type="text"
            message="*Username is required"
            placeholder="Enter your username"
            register={register}
            errors={errors}
          />
          <InputField
            label={"Password"}
            required
            id="password"
            type="password"
            message="*Password is required"
            min={6}
            placeholder="Enter your password"
            register={register}
            errors={errors}
          />
        </div>

        <button
          disabled={loader}
          className="bg-button-gradient my-3 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.01] hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loader ? <Spinner /> : "Login"}
        </button>

        <p className="mt-6 text-center text-sm text-slate-700">
          Don't have an account?
          <Link
            to="/register"
            className="font-semibold underline hover:text-black"
          >
            <span className="ml-1">Sign up</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
