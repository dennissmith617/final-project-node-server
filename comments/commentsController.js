import * as commentsDao from "./commentsDao.js"
import commentsModel from "./commentsModel.js";

const createComment = async (req, res) => {
    const newComment = req.body.comment;
    const insertedComment = await commentsDao
        .createComment(newComment);
    res.json(insertedComment);
}

const findCommentsByBookId = async (req, res) => {
    const google_id  = req.params.google_id
    const comments = await commentsDao.findAllCommentsByBook(google_id)
    res.json(comments);
}
const findCommentsByUsername = async (req, res) => {
    const username  = req.params.username
    const comments = await commentsDao.findAllCommentsByUser(username)
    res.json(comments);
}
 const deleteComment = async (req, res) => {
    const commentIdToDelete = req.params._id;
    const status = await commentsDao
        .deleteComment(commentIdToDelete);
    res.json(status);
}

const findBookRating = async (req, res) => {
    const google_id  = req.params.google_id
    const bookRating = await commentsDao.readitBookRating(google_id)
    res.json(bookRating);
}

export default (app) => {
    app.post('/api/comments', createComment);
    app.get('/api/comments/bookcomments/:google_id', findCommentsByBookId);
    app.get('/api/comments/usercomments/:username', findCommentsByUsername);
    app.get('/api/comments/bookRating/:google_id', findBookRating);
    app.delete('/api/comments/:_id', deleteComment);
}
