import { useForm } from "react-hook-form";
import { Link } from "react-router";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="w-full h-full flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md md:w-3/4 lg:w-2/3 p-8 md:p-10 bg-white rounded-2xl shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <fieldset className="flex flex-col gap-4">
            <label className="label text-secondary text-lg md:text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input w-full text-base md:text-lg border border-gray-300 rounded-xl px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="Email"
            />

            <label className="label text-secondary text-lg md:text-xl font-bold mt-2">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input w-full text-base md:text-lg border border-gray-300 rounded-xl px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">password  is required</p>
            )}
            {
                errors.password?.type==='minLength' && <p className="text-red-500">Password must be 6 char</p>
            }
            <div className="flex justify-start mt-1">
              <a className="link link-hover text-sm md:text-base underline text-primary">
                Forgot password?
              </a>
            </div>

            <input
              type="submit"
              value="Sign In"
              className="mt-3 bg-primary text-secondary font-bold py-3 md:py-4 rounded-lg cursor-pointer hover:bg-primary-dark transition-colors"
            />
          </fieldset>
        </form>
        <p className="mt-5 md:mt-10">
          Don't have accoutn?
          <Link className="text-primary font-bold text-xl" to={"/signUp"}>
            Register
          </Link>
        </p>
        <div className="divider">OR</div>
        {/* Google */}
        <button className="btn w-full md:text-lg p-5 bg-white text-black border-[#e5e5e5]">
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
