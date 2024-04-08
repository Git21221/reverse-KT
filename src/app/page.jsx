"use client";
import { useSelector } from "react-redux";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setjobPersist, getJobPersist } from "@/persist/jobPersist";
import { addJob, setJob } from "@/features/job/jobSlice";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function Home() {
  const { jobList } = useSelector((state) => state.job);
  const { user, isCompanyHr, isLoggedIn } = useSelector((state) => state.auth);
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [hoverId, setHoverId] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: new Date().getTime(),
      title: jobTitle,
      company: companyName,
      posted: new Date().toLocaleDateString(),
      postedBy: user.fullName,
      isApplied: false,
      appliedBy: "",
    };
    const previousJobs = getJobPersist() ? getJobPersist() : [];
    previousJobs.push(data);
    setjobPersist(previousJobs);
    dispatch(addJob({ job: data }));
    console.log(previousJobs);
  };

  const handleJobApply = (id) => {
    const updatedJobList = jobList.map((job) => {
      if (job.id === id) {
        return { ...job, isApplied: true, appliedBy: user.fullName };
      }
      return job;
    });
    dispatch(setJob({ jobList: updatedJobList }));
    setjobPersist(updatedJobList);
  };

  return (
    <>
      <div className="jobs border border-neutral-600 rounded-lg p-4 m-4">
        {!isLoggedIn && (
          <h1 className="text-center text-3xl">
            Please login to see most recent jobs
          </h1>
        )}
        {!isCompanyHr &&
          isLoggedIn && (
            <h1 className="text-center text-3xl">Most recent jobs</h1>
          ) &&
          jobList.map((job) => (
            <div
              onMouseEnter={() => setHoverId(job.id)}
              onMouseLeave={() => setHoverId("")}
              key={job.id}
              className="job flex flex-col gap-3 border border-neutral-600 rounded-lg p-4 my-4"
            >
              <div className="firstRow flex justify-between">
                <h1 className="text-xl font-bold">{job.title}</h1>
                <span>By - {job.postedBy}</span>
              </div>
              <div className="secondRow flex justify-between">
                <h2 className="text-md font-medium">{job.company}</h2>
                <span className="text-[10px]">Posted: {job.posted}</span>
              </div>
              {hoverId == job.id && (
                <div className="applied">
                  {
                    job.isApplied && 
                      <Button
                        children="Applied"
                        className="bg-white w-min px-4 py-2 text-gray-400 cursor-not-allowed"
                        disabled
                      /> 
                  }
                  {
                    !job.isApplied && <Button
                    children="Apply"
                    className="bg-white w-min px-4 py-2 text-black"
                    onClick={() => handleJobApply(job.id)}
                  />
                  }
                </div>
              )}
            </div>
          ))}
        {isCompanyHr && isLoggedIn && (
          <>
            <h1 className="text-center text-3xl">Create a new job</h1>
            <div className="job border border-neutral-600 rounded-lg p-4 ym-4 flex flex-col gap-4 items-center justify-center">
              <Input
                className="bg-transparent"
                placeholder="Enter job title"
                onInput={(e) => setJobTitle(e.target.value)}
              />
              <Input
                className="bg-transparent"
                placeholder="Enter company name"
                onInput={(e) => setCompanyName(e.target.value)}
              />
              <Button
                children="Create"
                className="bg-white w-min px-4 py-2 text-black"
                onClick={handleSubmit}
              />
            </div>
            {jobList.map((job) => (
              <div
                key={job.id}
                className="job flex flex-col gap-3 border border-neutral-600 rounded-lg p-4 my-4"
              >
                <div className="firstRow flex justify-between">
                  <h1 className="text-xl font-bold">{job.title}</h1>
                  <span>By - {job.postedBy}</span>
                </div>
                <div className="secondRow flex justify-between">
                  <h2 className="text-md font-medium">{job.company}</h2>
                  <span className="text-[10px]">Posted: {job.posted}</span>
                </div>
                {/* <div className="thirdRow flex gap-4">
                    <div className="edit bg-neutral-600 p-2 rounded-full"><ModeEditIcon /></div>
                    <div className="delete bg-neutral-600 p-2 rounded-full"><DeleteOutlineIcon/></div>
                  </div> */}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
