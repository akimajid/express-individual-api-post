const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT

const { postsRoutes } = require("./routes")

app.use("/home", postsRoutes)

app.listen(PORT, () => {
    console.log("Listening to port", PORT)
})