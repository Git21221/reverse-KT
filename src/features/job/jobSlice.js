import { createSlice } from "@reduxjs/toolkit";
import { setjobPersist, getJobPersist } from "@/persist/jobPersist";

let jobList = [];

const initialState = {
  jobList: getJobPersist() ? getJobPersist() : [],
};

console.log(jobList);

const job = createSlice({
  name: "job",
  initialState,
  reducers: {
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
export const { addJob, removeJob, updateJob } = job.actions;
