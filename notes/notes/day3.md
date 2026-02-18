# Day3

**Key Notes**

* Use of **bcrypt.js** for proper authentication

```
const userModel = require("../models/users.model");
const bcrypt = require("bcryptjs");


async function registerController(req, res) {
  const { username, email, password, bio, profileImage } = req.body;

  //  Hash the password
  const hashPass = await bcrypt.hash(password, 10);

}


async function loginController(req, res) {
  const { username, email, password } = req.body;

  //  Check the password
  const isPassValid = await bcrypt.compare(password, user.password);

  if (!isPassValid)
    return res.status(401).json({ message: "Invalid Password" });
}

module.exports = {
  registerController,
  loginController,
};
```

# Multer
* It is a middleware used to read the form-data
* install -> npm i multer

  **routes/post.routes.js**

```
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

// Multer upload middleware
const imageUpload = upload.single("image");

//POST - api/posts [protected]

postRouter.post("/", imageUpload, postController.createPostController);
```

# Image Kit
* To handle image uploading and delivery efficiently in web applications
* ImageKit is used to upload, store, optimize, and deliver images efficiently through CDN instead of storing them directly on the backend server.
* Install - npm i @imagekit/node.js

```
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

// Initialize ImageKit
const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  //   console.log(req.body,req.file);

  // image file uplaoding logic to imagekit
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
  });

```
  
