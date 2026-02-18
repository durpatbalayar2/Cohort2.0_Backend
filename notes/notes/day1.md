# Insta - Note SetUp and Day wise progress backend

---
# Day-1 (Project Setup)
#️⃣Set up Project Structure
* Install **package** -> express
*  **src** ->app.js  // Server ko create krne wala code
*  root file: **server.js** // Server ko run krne wala code


#️⃣REST Api (HTTP Methods)
* POST -> creating new resource 
* GET -> Fetching the data from server to client
* DELETE -> Deleting the existing resource
* PUT -> Updating the existing data
* PATCH -> Partial updation of resource


#️⃣ Status Code
* **200** -> Success | OK   (GET)
* **201** -> New resource created successfully   (POST)
* **204** -> Success but no data returned | No Content (often for DELETE or update without response body)
  
* **400** -> Bad Request → Invalid request data
* **401** -> Unauthorized → Authentication required or invalid token
* **403** -> Forbidden → User authenticated but not allowed
* **404** -> Not Found → Resource does not exist
* **409** -> Conflict → Duplicate data / resource conflict
* **500** -> Internal Server Error → Server crash/error

---

**app.js**
 ```bash
// Server create krne ka code
const express = require("express")
const app = express() // server ka instance
module.exports = app
```

**server.js**

```base
// Server run krne ka code

const app = require("/src/app")
const PORT = 3000  // Port number where our server run

app.listen(PORT , ()=> {
console.log(`Server is running on ${PORT}`)
```


