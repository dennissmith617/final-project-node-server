import * as commentsDao from "./commentsDao.js"
import commentsModel from "./commentsModel.js";
import * as usersDao from "../users/users-dao.js";


const findAllComments = async (req, res) => {
    const comments = await commentsDao.findAllComments();
    res.send(comments);
};
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
const findCommentsByUserID = async (req, res) => {
    const uid  = req.params.uid
    const comments = await commentsDao.findAllCommentsByUserID(uid)
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

const updateComment = async (req, res) => {
    const {_id, google_id, comment, username, rating} = req.body;
    const commentToUpdate = {_id, google_id, comment, username, rating}
    if(req.params._id === req.body._id) console.log('ids are equal')
    const commentId = req.params._id;
    const updatedComment  = await commentsDao.updateComment(commentId, commentToUpdate)
    res.status(200).json({
        msg:"comment updated successfully",
        comment : updatedComment
    });
}

export default (app) => {
    app.post('/api/comments', createComment);
    app.get('/api/comments', findAllComments);
    app.get('/api/comments/bookcomments/:google_id', findCommentsByBookId);
    app.get('/api/comments/usercomments/:username', findCommentsByUsername);
    app.get('/api/comments/anon/usercomments/:uid', findCommentsByUserID);
    app.get('/api/comments/bookRating/:google_id', findBookRating);
    app.put('/api/comments/updateComment/:_id',updateComment)
    app.delete('/api/comments/bookcomments/:_id', deleteComment);

}
