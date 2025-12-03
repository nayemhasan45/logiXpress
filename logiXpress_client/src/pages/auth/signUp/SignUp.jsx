import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import SocialLogIn from "../../shared/components/SocialLogIn";
import axios from 'axios';
import { useState } from "react";


const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser,updateUser } = useAuth();
  const [profileImg,SetProfileImg]=useState('');
  const navigate = useNavigate();
  const handleImageUpload = async (e) => {
    const img = e.target.files[0];
    console.log(img);
    const formData = new FormData();
    formData.append('image',img);
    const imgUrl = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_imgbb_key}`;
    const res =await axios.post(imgUrl,formData);
    SetProfileImg(res.data.data.url);
  }
  const onSubmit = (data) => {
     createUser(data.email, data.password)
      .then(() => {

        // update user in firebase
        const userProfile = {
          displayName:data.name,
          photoURL:profileImg,
        }
        updateUser(userProfile).then(()=>{
          console.log('profile pic and name updated');
        }).catch(err=>console.log(err))
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Created Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/auth/signIn");
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: err.message,
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
            {/* name */}
            <label className="label text-secondary text-lg md:text-xl font-bold">
              Your Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input w-full text-base md:text-lg border border-gray-300 rounded-xl px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="Name"
            // value={name}
            />
           

            {/* emial  */}
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

             {/* image  */}
            <label className="label text-secondary text-lg md:text-xl font-bold">
              Upload your picture
            </label>
            <div className="w-full">
              <input
                onChange={handleImageUpload}
                type="file"
                className="block w-full text-secondary md:text-lg 
    border border-gray-300 rounded-xl 
    px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5
    file:bg-primary file:text-secondary file:font-semibold file:border-none file:rounded-lg
    file:px-4 file:py-2
    file:cursor-pointer file:hover:bg-primary/80
    cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-primary
    transition-all"
              />
            </div>
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
