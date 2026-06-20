import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerNewUser } from "../store/action";
import { FaUserPlus } from "react-icons/fa";
import InputField from "../ui/InputField";
import Spinner from "../ui/Spinner";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  async function handleRegister(data) {
    console.log("Register....");
    dispatch(registerNewUser(data, toast, reset, navigate, setLoader));
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="shadow-custom w-[360px] rounded-md py-8 sm:w-[450px] sm:px-4"
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <FaUserPlus className="text-5xl text-slate-800" />
          <h1 className="font-montserrat text-center text-2xl font-bold text-slate-800 lg:text-3xl">
            Register Here
          </h1>
          <hr className="mt-2 mb-5 text-black" />
          <div className="flex w-full flex-col gap-3">
            <InputField
              label="Username"
              required
              id="username"
              type="text"
              message="*Username is required"
              placeholder="Enter your usename"
              register={register}
              errors={errors}
            />
            <InputField
              label="Email"
              required
              id="email"
              type="email"
              message="*Email is required"
              placeholder="Enter your email"
              register={register}
              errors={errors}
            />

            <InputField
              label="Password"
              required
              id="password"
              min={6}
              type="password"
              message="*Password is required"
              placeholder="Enter your password"
              register={register}
              errors={errors}
            />
          </div>
          <button
            disabled={loader}
            className="bg-button-gradient my-3 flex w-full items-center justify-center gap-2 rounded-md py-2 font-semibold text-white transition-colors duration-100 hover:text-slate-400"
            type="submit"
          >
            {loader ? (
              <>
                {" "}
                <Spinner /> Loading...
              </>
            ) : (
              "Register"
            )}
          </button>
          <div className="mt-6 flex items-center justify-center gap-2">
            <p className="text-center text-slate-700">
              Already have an account
            </p>
            <Link
              className="font-semibold underline hover:text-black"
              to="/login"
            >
              <span>Login</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
