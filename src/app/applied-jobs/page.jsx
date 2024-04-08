"use client";
import React from "react";
import { useSelector } from "react-redux";

function page() {
  const { jobList } = useSelector((state) => state.job);
  return (
    <div className="border border-neutral-600 rounded-lg p-4 m-4 flex flex-col gap-4">
      {jobList.filter((job) => job.isApplied).map((job) => (
        <div className="border border-neutral-600 rounded-lg p-4">
          <span className="text-xl font-bold">{job.title}</span> - {job.appliedBy}
        </div>
      ))}
    </div>
  );
}

export default page;
