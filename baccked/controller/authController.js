const userdb = require("../models/userSchema")
var bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {

  const { username, useremail, userpassword, usercpassword } = req.body;

  if (!username || !useremail || !userpassword || !usercpassword) {
    res.status(422).json({ error: "fill all the details" });
  }

  try {
    const preuser = await userdb.findOne({ useremail: useremail });

    if (preuser) {
      res.status(400).json({ error: "This Email is Already Exist" });
    } else if (userpassword !== usercpassword) {
      res
        .status(422)
        .json({ error: "Password and Confirm Password Not Match" });
    } else {
      const finalUser = new userdb({username, useremail,userpassword,usercpassword});

      // here password hasing

      const storeData = await finalUser.save();

      console.log(storeData, "storeData");
      res.status(201).json({ status: 201, storeData,message: "Registration successful!" });
    }
  } catch (error) {
    res.status(422).json(error);
    console.log("catch block error");
  }
};

exports.loginUser = async (req, res) => {

  const { useremail, userpassword } = req.body;

  if (!useremail || !userpassword) {
    res.status(422).json({ error: "fill all the details" });
  }

  try {
    const userValid = await userdb.findOne({ useremail: useremail });
    if (!userValid) {
      res.status(404).json({ error: "User not registered. Please sign up." });
    }

    if (userValid) {
      const isMatch = await bcrypt.compare(userpassword, userValid.userpassword);

      if (!isMatch) {
        res.status(422).json({ error: "invalid details" });
      } else {

        const token = await userValid.generateAuthtoken();

        res.cookie("usercookie", token, {
          expires: new Date(Date.now() + 9000000),
          httpOnly: true,
        });

        const result = {
          userValid,
          token,
        };
        res.status(201).json({ status: 201, result });
      }
    }
  } catch (error) {
    res.status(401).json(error);
    console.log("catch block 11");
  }
};

// extra 

// exports.validUser = async (req, res) => {
//   try {
//     const ValidUserOne = await userdb.findOne({ _id: req.userId });
//     res.status(201).json({ status: 201, ValidUserOne });
//   } catch (error) {
//     res.status(401).json({ status: 401, error });
//   }
// };




