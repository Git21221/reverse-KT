import { createSlice } from "@reduxjs/toolkit";
import { getJobPersist } from "@/persist/jobPersist";

let jobList = [];

const initialState = {
  jobList: getJobPersist() ? getJobPersist() : [],
};

console.log(jobList);

const job = createSlice({
  name: "job",
  initialState,
  reducers: {
    setJob: (state, action) => {
      state.jobList = action.payload.jobList;
    },
    addJob: (state, action) => {
      state.jobList.push(action.payload.job);
    },
    removeJob: (state, action) => {
      state.jobList = state.jobList.filter(
        (job) => job.id !== action.payload.id
      );
    },
    updateJob: (state, action) => {
      const { id, title, company } = action.payload.job;
      const updatedJob = state.jobList.find((job) => job.id === id);
      if (updatedJob) {
        updatedJob.title = title;
        updatedJob.company = company;
      }
    },
  },
});

export default job.reducer;
export const { setJob, addJob, removeJob, updateJob } = job.actions;
