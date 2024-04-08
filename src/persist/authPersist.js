"use client"
export const setAuthPersistForUser = (auth) => {
  localStorage.setItem("authForUser", JSON.stringify(auth));
}

export const setAuthPersistForHr = (auth) => {
  localStorage.setItem("authForHr", JSON.stringify(auth));
}

export const getAuthPersistForUser = () => {
  return JSON.parse(localStorage.getItem("authForUser"));
}

export const getAuthPersistForHr = () => {
  return JSON.parse(localStorage.getItem("authForHr"));
}