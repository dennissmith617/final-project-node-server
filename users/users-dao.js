import usersModel from "./users-model.js";
import mongoose from "mongoose";

export const findAllUsers = async () => {
    const users = await usersModel.find();
    return users;
};

export const findAllAuthors = async () => {
    const users = await usersModel.find({ role: "AUTHOR" });
    return users;
};

export const findAllByRole = async (role) => {
    const users = await usersModel.find({ role });
    return users;
};

export const findUserById = async (id) => {
    const user = await usersModel.findById(id);
    return user;
};

export const findUserByUsername = async (username) => {
    const user = await usersModel.findOne({ username });
    return user;
};

export const findUserByCredentials = async (username, password) => {
    const user = await usersModel.findOne({ username, password });
    return user;
};

export const deleteUser = async (id) => {
    const status = await usersModel.deleteOne({ _id: id });
    return status;
};
export const createUser = async (user) => {
    const newUser = await usersModel.create(user);
    return newUser;
};

export const updateUser = async (id, user) => {
    const status = await usersModel.updateOne({ _id: id }, user);
    return status;
};

export const bookRead = async (user_id, google_id, title) => {
    const status = await usersModel.findByIdAndUpdate({ _id: user_id }, {$push:{booksRead: {bookId:google_id, bookTitle:title }}});
    return status;
};

export const bookUnread = async (user_id, google_id,title) => {
    const status = await usersModel.updateOne({ _id: user_id }, {$pull:{booksRead: {bookId:google_id, bookTitle:title }}});
    return status;
};

export const bookReadStatus = async (user_id, google_id) => {
    const status = await usersModel.find({ _id: user_id, booksRead: { $elemMatch: { bookId:google_id } } }
    ).count()>0
    console.log(status)
    // const status = await usersModel.find({_id: user_id, booksRead: {$in: [google_id]}}).count()>0
    return status
};

export const booksRead = async (user_id) => {
    console.log(user_id)
    const status = await usersModel.distinct("booksRead", {username: user_id});
    console.log(status)
    return status
};
export const booksReadbyUid = async (uid) => {
    console.log(uid)
    const status = await usersModel.distinct("booksRead", {_id:uid});
    return status
};