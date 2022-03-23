const express = require("express")
const router = express.Router()

const { postsControllers } = require("../controllers")

router.get("/", postsControllers.getAllPosts)
router.get("/:id", postsControllers.getPostsById)
router.post("/",  postsControllers.createNewPost)
router.patch("/:id", postsControllers.editPostById)
router.delete("/:id", postsControllers.deletePost)

module.exports = router