import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema(
  {
    about: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "About",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Dashboard = mongoose.model("Dashboard", dashboardSchema);
export default Dashboard;
