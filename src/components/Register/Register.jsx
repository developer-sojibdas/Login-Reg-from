import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import auth from "../../firebase/firebase.config";
import { ToastContainer, toast } from "react-toastify";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;

    const password = e.target.password.value;
    const accepted = e.target.terms.checked;

    // password valitation
    const regExp =
      /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/;

    if (password.length < 8) {
      toast.error("Password should be at least 8 characters or longer");
      return;
    } else if (!regExp.test(password)) {
      toast.error(
        "Use one upper case and use one lower case and use one digit and special character  eight in length"
      );
      return;
    } else if (!accepted) {
      toast.warning("Please Accecpet our Terms & Condition ");
      return;
    }

    // creactUser with password
    createUserWithEmailAndPassword(auth, email, password, name)
      .then((result) => {
        const user = result.user;
        // update profile Name
        updateProfile(user, {
          displayName: name,
        })
          .then(() => {
            toast.success("Profile Updated");
          })
          .catch((error) => {
            const errorMessage = error.message;
            toast.error(errorMessage);
          });

        // set varificaton email
        sendEmailVerification(user).then(() => {
          toast.warn("Please check your email and verify your account ");
          return;
        });
        toast.success("user Create Succssully");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.warning(errorMessage);
      });
  };
  return (
    <div className="bg-sky-100">
      <section className=" min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-2xl text-[#002D74]">Register</h2>
            <p className="text-xs mt-4 text-[#002D74]">
              If you are no member, easily Register
            </p>

            <form onSubmit={handleRegister} className="flex flex-col gap-4 ">
              <input
                className="p-2 mt-8 rounded-xl border bg-white "
                type="test"
                name="name"
                placeholder="Name"
                required
              />
              <input
                className="p-2 rounded-xl border bg-white"
                type="email"
                name="email"
                placeholder="Email"
                required
              />

              <div className="relative">
                <input
                  className="p-2 rounded-xl border bg-white w-full"
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  required
                />
                <span
                  onClick={() => setShowPass(!showPass)}
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                >
                  {showPass ? <FaRegEyeSlash /> : <IoEyeOutline />}
                </span>
              </div>
              <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
                Register
              </button>

              <div className="  flex justify-center items-center gap-2">
                <input
                  type="checkbox"
                  name="terms"
                  id="terms"
                  className="checkbox checkbox-sm checkbox-warning"
                />
                <label className="text-sm" htmlFor="terms">
                  <span className="text-black"> Accept our</span>
                  <Link className="text-[#002D74] " to="#">
                    Terms & Conditions
                  </Link>
                </label>
              </div>
            </form>
            <div className="mt-3 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>

            <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
              <p>Already have an account ?</p>
              <Link to="/login">
                <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                  Log in
                </button>
              </Link>
            </div>
          </div>

          <div className="md:block hidden w-1/2">
            <img
              className="rounded-2xl"
              src="https://www.snackritexotiks.com/cdn/shop/products/Milk_42f550dc-45e3-4a94-b5db-b603eea1b85d_1800x1800.webp?v=1664993973"
              alt=""
            />
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default Register;
