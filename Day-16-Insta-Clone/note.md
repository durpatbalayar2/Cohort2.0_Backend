# Day -18 (Insta Clone)

* Middleware created for UserIdentifer -> **middlewares/auth.middleware.js** 
* follow schema created  -> **models/follow.model.js**

# 📅 Day-19 (Insta Clone | Follow Feature)

## 📌 Overview

In this module, we implemented the **Follow Feature** similar to Instagram.

We created a separate model to store the relationship between users.  
This type of relationship model is also known as an **Edge Collection**, where each document represents a connection between two users.

### 👤 Relationship Structure

- **Follower** → The logged-in user
- **Followee** → The user whom we are going to follow

---

## 🚀 Implementation Steps

###  Step 1: Create Follow Model  
📁 `models/follow.model.js`

We created a new model to store follower–followee relationships.

Each document contains:

- `follower` → Logged-in user's username  
- `followee` → Target user's username  

This keeps the relationship structure clean and scalable.

---

###  Step 2: Create User Route  
📁 `routes/user.routes.js`

We added a new route inside the user router:

```js
POST /api/users/follow/:username


Here:

:username is a dynamic route parameter.

It represents the username of the user we want to follow.

Example:

POST /api/users/follow/john123

```
### Step 3: Create User Controller
`📁 controllers/user.controller.js`
Inside the controller, we implemented the following logic:

1. Extract the logged-in user's username from req.user (via authentication middleware).
2. Extract the target username from req.params.username.
3. Prevent users from following themselves.
4. Check if the followee exists in the database.
5. Check if the follow relationship already exists.
6. If all validations pass, create a new follow record.
7. Return appropriate HTTP status codes.

### Step 4: Use Authentication Middleware

We applied authentication middleware in the user route to ensure:

- Only authenticated users can follow someone.
- The JWT token is verified before accessing the controller.
- The logged-in user's information is attached to `req.user`.

#### 📌 Example:

```js
router.post("/follow/:username", authMiddleware, followUserController);