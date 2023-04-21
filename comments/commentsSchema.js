import mongoose from "mongoose";
const commentsSchema = new mongoose.Schema(
    {
            comment: String,
            rating: Number,
            username: String,
            userId: String,
            google_id: String,
            bookTitle: String
    }, {

        timestamps: true,
        collection: "Comments",
    }
);
export default commentsSchema;