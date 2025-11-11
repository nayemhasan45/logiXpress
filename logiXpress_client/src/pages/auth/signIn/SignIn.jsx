import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogIn from "../../shared/components/SocialLogIn";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const SignIn = () => {
  const { signInUser } = useAuth(); //custom hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; 

  const onSubmit = (data) => {
    console.log(data);
    signInUser(data.email, data.password)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User LogedIn Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from,{replace:true});
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Check Your Cradinatials",
          icon: "error",
          confirmButtonText: "sorry",
        });
      });
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
              <p className="text-red-500">password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">Password must be 6 char</p>
            )}
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
        <SocialLogIn></SocialLogIn>
      </div>
    </div>
  );
};

export default SignIn;
