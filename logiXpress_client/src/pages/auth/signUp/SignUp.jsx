import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import SocialLogIn from "../../shared/components/SocialLogIn";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Created Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/signIn");
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "user can not be created",
          icon: "error",
          confirmButtonText: "sorry",
        });
      });
  };
  return (
    <div className="w-full h-full flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md md:w-3/4 lg:w-2/3 p-8 md:p-10 bg-white rounded-2xl shadow-lg">
      <h1 className="text-center text-xl md:text-4xl text-secondary font-semibold md:font-bold pb-3 md:pb-10">Please Sign-Up</h1>
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

            <input
              type="submit"
              value="Sign Up"
              className="mt-3 bg-primary text-secondary font-bold py-3 md:py-4 rounded-lg cursor-pointer hover:bg-primary-dark transition-colors"
            />
          </fieldset>
        </form>
        <p className="mt-5 md:mt-10">
          Allready have an Accoutn?
          <Link className="text-secondary hover:text-primary pl-2 font-bold text-xl" to={"/auth/signIn"}>
            Login
          </Link>
        </p>
        <div className="divider">OR</div>
        <SocialLogIn></SocialLogIn>
      </div>
    </div>
  );
};

export default SignUp;
