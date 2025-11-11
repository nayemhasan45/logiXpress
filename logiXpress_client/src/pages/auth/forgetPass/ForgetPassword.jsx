import React from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const ForgetPassword = () => {
  const { forgetPassword } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log(email);
    forgetPassword(email)
      .then(() => {
        Swal.fire({
          title: "Password reset email sent!",
          text: "Don't forget to check the spam",
          icon: "success",
          draggable: true,
        });
        navigate("/signIn");
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
        <h1 className="text-center text-xl md:text-4xl text-secondary font-semibold md:font-bold pb-3 md:pb-10">
          Verify Your Email
        </h1>
        <form onSubmit={handleSubmit}>
          <fieldset className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              className="input w-full text-base md:text-lg border border-gray-300 rounded-xl px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="Email"
            />
            <input
              type="submit"
              value="Submit"
              className="mt-3 bg-primary text-secondary font-bold py-3 md:py-4 rounded-lg cursor-pointer hover:bg-primary-dark transition-colors"
            />
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
