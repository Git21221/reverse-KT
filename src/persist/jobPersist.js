"use client";

export const setjobPersist = (job) => {
  localStorage.setItem('job', JSON.stringify(job));
}

export const getJobPersist = () => {
  return JSON.parse(localStorage.getItem('job'));
}