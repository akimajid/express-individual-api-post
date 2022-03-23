const { postsDB } = require("../database")
const { nanoid } = require("nanoid")

const postsControllers = {
    getAllPosts: (req, res) => {
        if (!postsDB.length) {
            res.status(404).json({
                message: "No posts found"
            })
            return
        }

        res.status(200).json({
            message: "All posts fetched",
            result: postsDB
        })
    },
    getPostsById: (req, res) => {
        const postId = req.params.id

        const findIndex = postsDB.findIndex(val => {
            return val.id == postId
        })

        if (findIndex == -1) {
            res.status(404).json({
                message: "Post not found"
            })
            return
        }

        const foundPosts = postsDB[findIndex]

        res.status(200).json({
            message: "Post found!",
            result: foundPosts
        })
    },
    createNewPost: (req, res) => {
        const newPostData = req.body

        if (!newPostData) {
            res.status(400).json({
                message: "Post data required!"
            })
            return
        }

        if (!newPostData.location) {
            res.status(400).json({
                message: "Post location is required!"
            })
            return
        }

        if (!newPostData.image_url) {
            res.status(400).json({
                message: "Post image is required!"
            })
            return
        }

        if (!newPostData.number_of_likes) {
            res.status(400).json({
                message: "Post like is required!"
            })
            return
        }

        if (!newPostData.caption) {
            res.status(400).json({
                message: "Post caption required"
            })
            return
        }

        newPostData.id = nanoid()

        postsDB.push(newPostData)

        res.status(201).json({
            message: "Post Created",
            result: newPostData
        })
    },
    editPostById: (req, res) => {
        const postsId = req.params.id
        const editPostData = req.body

        const findIndex = postsDB.findIndex(val => {
            return val.id == postsId
        })

        if (findIndex == -1) {
            res.status(404).json({
                message: "Post not found!"
            })
            return
        }

        postsDB[findIndex] = {
            ...postsDB[findIndex],
            ...editPostData
        }

        res.status(200).json({
            message: "Post editted",
            result: postsDB[findIndex]
        })
    },
    deletePost: (req, res) => {
        const postId = req.params.id

        const findIndex = postsDB.findIndex(val => {
            return val.id == postId
        })

        if (findIndex == -1) {
            res.status(404).json({
                message: "Post not found!"
            })
            return
        }

        postsDB.splice(findIndex, 1)

        res.status(200).json({
            message: "Post deleted!"
        })
    }
}

module.exports = postsControllers