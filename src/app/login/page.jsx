"use client";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import { setAuth } from "@/features/auth/authSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { setAuthPersistForHr, setAuthPersistForUser } from "@/persist/authPersist";

function page() {
  const {user, isLoggedIn, isCompanyHr} = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHr, setIsHr] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      email: email?.trim(),
      password: password?.trim(),
      isHr,
    };
    console.log(data);
    if (data.email === "" || data.password === "") {
      return toast.error("Please fill all the fields");
    }
    isHr
      ? setAuthPersistForHr({ user, isLoggedIn: true, isCompanyHr: isHr })
      : setAuthPersistForUser({
          user,
          isLoggedIn: true,
          isCompanyHr: isHr,
        });
    dispatch(setAuth({ user, isLoggedIn: true, isCompanyHr: isHr }));
  };

  return (
    <div className="flex items-center justify-center h-full">
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="login-page flex flex-1 rounded-xl h-full max-w-[1400px]">
        <div className="leftImagePart h-full w-full p-8 lg:block hidden bg-slate-800"></div>
        <div className="rightImagePart h-full w-full lg:border-l border-l-0 border-neutral-600 p-8 flex items-center justify-center flex-col">
          <div className="form max-w-[400px] flex flex-col items-center justify-center gap-5">
            <div className="alltexts flex flex-col gap-2">
              <div className="ca text-3xl font-bold text-center">
                Please Login
              </div>
              <div className="enterdetails text-center text-neutral-400">
                Enter your details below to login to your account
              </div>
            </div>
            <div className="inputAndSubmit flex flex-col gap-2 w-full">
              <Input
                onInput={(e) => setEmail(e.target.value)}
                className="bg-transparent"
                placeholder="name@example.com"
                type="email"
              />
              <Input
                onInput={(e) => setPassword(e.target.value)}
                className="bg-transparent"
                placeholder="Password"
                type="password"
              />
              <div className="check flex text-sm items-center gap-4">
                <Input
                  type="checkbox"
                  id="h4"
                  className="h-4 border-none text-black w-min"
                  name="hecheck"
                  onInput={() => setIsHr(true)}
                />
                <label htmlFor="h4">Are you in a Company?</label>
              </div>
              <Button
                onClick={submitHandler}
                children="Login"
                className="hover:bg-white text-black bg-neutral-200 transition-colors"
              />
            </div>
            <div className="signinoptions w-full flex flex-col gap-4">
              <div className="text text-center flex flex-col items-center text-neutral-400">
                <hr className="relative top-[10px] w-full -z-10 border-neutral-400" />
                <div className="or text-sm uppercase bg-black w-fit px-2">
                  or continue with
                </div>
              </div>
              <div className="optionsButton">
                <Button
                  className="bg-transparent border border-neutral-700 hover:bg-neutral-700"
                  children="Sign In with Google"
                />
              </div>
            </div>
            <div className="privacypolicy text-center text-sm text-neutral-400">
              By clicking continue, you agree to our <u>Terms of Service</u> and{" "}
              <u>Privacy Policy</u>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page