import { configureStore } from "@reduxjs/toolkit";
import userDetail from "../Redux/features/userDetailSlice";


export const store = configureStore({
  reducer: {
    app: userDetail,
  },
});

// get api     = http://localhost:7000/userdh
// get post    = http://localhost:7000/userdh
// get put     = http://localhost:7000/userdh/6656136e0ff89779b16124f7
// get delete  = http://localhost:7000/userdh/6656136e0ff89779b16124f7

// const inputdb = require("../models/inputSchema")

// exports.createInput = async (req, res) => {
//   console.log(req.body, "req.body"); 
//   const { inputdata } = req.body; 
//   try {
//     const newInput = new inputdb({ inputdata });
//     await newInput.save();
//     res.status(201).json({ status: 201, newInput, message: "Input data created successfully" });
//   } catch (error) {
//     console.log(error, "error create");
//     res.status(500).json({ status: 500, message: error.message });
//   }
// };

// exports.getAllInputs = async (req, res) => {
//   try {
//     const inputs = await inputdb.find();
//     res.status(200).json({ status: 200, data: inputs });
//   } catch (error) {
//     res.status(500).json({ status: 500, message: error.message });
//   }
// };

// exports.updateInput = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { inputdata } = req.body;
//     const updatedInput = await inputdb.findByIdAndUpdate(
//       id,
//       { inputdata },
//       { new: true }
//     );
//     res.status(200).json({ status: 200, data: updatedInput });
//   } catch (error) {
//     res.status(500).json({ status: 500, message: error.message });
//   }
// };

// exports.deleteInput = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await inputdb.findByIdAndDelete(id);
//     res
//       .status(200)
//       .json({ status: 200, message: "Input data deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ status: 500, message: error.message });
//   }
// };
