const app =require("./src/app")  // Server run karne ka code

const PORT = 3000

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}port`)
})