"use client";
import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "@/features/auth/authSlice";
import {
  setAuthPersistForHr,
  setAuthPersistForUser,
} from "@/persist/authPersist";

function navbar() {
  const { user, isLoggedIn, isCompanyHr } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setAuth({ user, isLoggedIn: false, isCompanyHr }));
    isCompanyHr
      ? setAuthPersistForHr({ user, isLoggedIn: false, isCompanyHr })
      : setAuthPersistForUser({ user, isLoggedIn: false, isCompanyHr });
  };

  return (
    <div className="container mx-auto flex justify-between items-center p-4 max-w-[1400px]">
      <div className="">
        <h1 className="text-2xl font-bold">Job Board</h1>
      </div>
      <div className="">
        <ul className="flex space-x-4">
          <li className="">
            <Link href="/" className="text-white">
              Home
            </Link>
          </li>
          {isLoggedIn && !isCompanyHr && (
            <>
              <li className="">
                <Link href="/jobs" className="text-white">
                  Find jobs
                </Link>
              </li>
              <li className="">
                <Link href="profile">Hi, User</Link>
              </li>
              <li className="" onClick={handleLogout}>
                Logout
              </li>
            </>
          )}
          {!isLoggedIn && (
            <>
              <li className="">
                <Link href="/login" className="text-white">
                  Login
                </Link>
              </li>
              <li className="">
                <Link href="/signup" className="text-white">
                  Sign up
                </Link>
              </li>
            </>
          )}
          {isLoggedIn && isCompanyHr && (
            <>
              <li>Job Applied</li>
              <li>Hii, HR</li>
              <li onClick={handleLogout}>Logout</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default navbar;
