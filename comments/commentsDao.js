import commentsModel from "./commentsModel.js";

export const createComment = async (comment) =>{
    const newComment = await commentsModel.create(comment);
    return newComment;
}


export const findAllCommentsByBook = async (google_id) => {
    const comments = await commentsModel.find({google_id:google_id});
    return comments;
};

export const findAllComments = async (google_id) => {
    const comments = await commentsModel.find();
    return comments;
};

export const findAllCommentsByUser = async (username) => {
    const comments = await commentsModel.find({username: username});
    return comments;
};

export const deleteComment = async (commentId) => commentsModel.deleteOne({_id: commentId});

export const updateComment = async (commentId, NewComment) => {
    const comment = await commentsModel.findByIdAndUpdate({_id:commentId}, {comment: NewComment.comment, rating: NewComment.rating}, {returnDocument:"after"})

    return comment
}

export const readitBookRating = async (bookId) => {
    const bookRating = commentsModel.aggregate([
        {$match: {google_id : bookId}},
        {$group:{
            _id: null,
            bookRating:{$avg: "$rating"}}}]);
    return bookRating}