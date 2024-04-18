import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef, useState } from "react";

const Login = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [passwordShow, setPasswordShow] = useState(false);
  const emailRef = useRef(null);
  const [user, setUser] = useState(null);
  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();
  //Google handelar
  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedInUser = result.user;
        setUser(loggedInUser);
        toast.success("Loging Successfully");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.warning(errorMessage);
      });
  };

  // handle github logOut
  const handleGitHubLogin = () => {
    signInWithPopup(auth, gitHubProvider)
      .then((result) => {
        const loggedInUser = result.user;
        setUser(loggedInUser);
        toast.success("Loging Successfully");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.warning(errorMessage);
      });
  };

  // handle Log  Out
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("LogOut Successfully");
        setUser(null);
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.warning(errorMessage);
      });
  };

  // handlePasswordLogin
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;

        if (user.emailVerified) {
          toast.success("You are Logied In");
        } else {
          alert("Please check yout email and verify you account");
          return;
        }
        setUser(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  // forget Password
  const forgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      toast.error("Email Field Eamty");
      return;
    } else if (!emailRegex.test(email)) {
      toast.error("Please Write a valid email");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.warn("Password reset email sent!");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return (
    <div className="bg-sky-100 ">
      <section className=" pt-[86px] min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          <div className="md:w-1/2 px-8 md:px-16">
            <div className="flex gap-2  ">
              <h2 className="font-bold text-2xl text-[#002D74]  ">
                {user ? user.displayName : "login"}{" "}
                <p className="text-xs -mt-2">{user && user.email}</p>
              </h2>
              <div className="avatar">
                <div className="w-8 rounded">
                  {user ? (
                    <img
                      src={user && user.photoURL}
                      alt="Tailwind-CSS-Avatar-component"
                    />
                  ) : (
                    ""
                  )}
                </div>
                {user && (
                  <button
                    onClick={handleLogOut}
                    className="text-white ms-1 bg-[#002D74] rounded-md p-2"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>

            <p className="text-xs mt-4 text-[#002D74]">
              If you are already a member, easily log in
            </p>

            <form
              onSubmit={handlePasswordSubmit}
              className="flex flex-col gap-4"
            >
              <input
                className="p-2 mt-8 rounded-xl border bg-white "
                type="email"
                name="email"
                ref={emailRef}
                placeholder="Email"
              />
              <div className="relative">
                <input
                  className="p-2 rounded-xl border bg-white w-full "
                  type={passwordShow ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                />
                <span
                  onClick={() => setPasswordShow(!passwordShow)}
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                >
                  {passwordShow ? <FaRegEyeSlash /> : <IoEyeOutline />}
                </span>
              </div>
              <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
                Login
              </button>
            </form>

            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleGoogleLogin}
                className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]"
              >
                <svg
                  className="mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="25px"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
                Google
              </button>
              <button
                onClick={handleGitHubLogin}
                className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]"
              >
                <svg
                  className="mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </button>
            </div>

            <div
              onClick={forgetPassword}
              className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]"
            >
              <a href="#">Forgot your password?</a>
            </div>

            <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
              <p>Do not have an account?</p>
              <Link to="/register">
                <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                  Register
                </button>
              </Link>
            </div>
          </div>

          <div className="md:block hidden w-1/2">
            <img
              className="rounded-2xl"
              src="https://le-panier.eu/cdn/shop/files/FeastablesQuinoaCrunchChocolatebaropened_1024x.webp?v=1697114869"
              alt=""
            />
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default Login;
