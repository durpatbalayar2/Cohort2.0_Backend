# Day-2 (Insta Clone )

# **How to Set Up DataBase ?**

1. Connection code should be written in **config/db.js** & export it.
2. Import to **server.js**
3. Define the schema & models  **models/user.model.js**


# **What I did today**

* First setup backend server -> npm init -y
* Create & run the server
* Database connection
* Define the schema & models in **models/user.model.js**
* Define the separate route i.e auth routes for authentication  -> **routes/auth.routes.js**
  

# **Key Notes**

* **Routes Defines**

**routes/auth.routes.js**
  ```
  const express = require("express");
  const authRouter = express.Router();

  ```

**app.js**

```
app.use("api/auth",authRouter);

```
* **express.Router()** is like mini Express app
* Helps us to separate routes to different fileds
* Make code clean , readable & scalable

* **middleware**
  ```
  app.use(express.json())

  ```
🔸Read the json data from  -> **req.body**

* **Hashing password**
  🔸Use of crypto for hashing password


* **Generating token**
  🔸install  -> jsonwebtoken

  ```
  const jwt = require("jsonwebtoken")

  const token = jwt.sign( {id:user._id},process.env.JWT_SECRET , {expiresIn:"1d"} )

  ```

* **Store token**
  1. install -> **cookie-parser**
  2. **app.js** -> app.use(cookie-parser()) //read  the cookie
  3. **controller/auth.controller.js**
     ```
     const userModel = require("../models/user.model");
     const crypto = require("crypto");
     const jwt = require("jsonwebtoken");

     async function registerController(req, res) {
     const { username, email, password, bio, profileImage } = req.body;

     //1. Check is user alreaday exist in db - username/email
     const isUserAlreadyExist = await userModel.findOne({
     $or: [{ username }, { email }],
     });
     if (isUserAlreadyExist)
     return res.status(409).json({
      message:
        "User is already exist" + (isUserAlreadyExist == email)
          ? "Email already exist"
          : "Username already exist",
     });

     //2. Create hash password
     const hashpassword = crypto
     .createHash("sha256")
     .update(password)
     .digest("hex");

     //3. Create user
     const user = await userModel.create({
     username,
     email,
     password: hashpassword,
     bio,
     profileImage,
     });

     //4. Generate token

     //user ka data hona chaiye wor unique hona chahiye -id

     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
     expiresIn: "1d",
     });

     //5.Store the token in cookie

     res.cookie("jwt_token", token);

     res.status(200).json({
     message: "User registered  successfully",
     user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
     },
     });
     }

     

  
  

  

  
  
  




