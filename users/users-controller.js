import * as usersDao from "./users-dao.js";
import mongoose from "mongoose";


function UsersController(app) {
    const findAllUsers = async (req, res) => {
        const users = await usersDao.findAllUsers();
        res.send(users);
    };
    const findUserById = async (req, res) => {
        const id = req.params.id;
        const user = await usersDao.findUserById(id);
        res.send(user);
    };
    const deleteUserById = async (req, res) => {
        const id = req.params.id;
        const status = await usersDao.deleteUser(id);
        res.json(status);
    };
    const findUserByUsername = async (req, res) => {
        const user = await usersDao.findUserByUsername(req.params.username);
        res.json(user);
    };
    const createUser = async (req, res) => {
        const user = await usersDao.createUser(req.body);
        res.json(user);
    };
    const updateUser = async (req, res) => {
        const id = req.params.id;
        const status = await usersDao.updateUser(id, req.body);
        res.json(status);
    };

    const login = async (req, res) => {
        const user = req.body;
        const foundUser = await usersDao.findUserByCredentials(
            req.body.username,
            req.body.password
        );
        if (foundUser) {
            req.session["currentUser"] = foundUser;
            res.send(foundUser);
        } else {
            res.sendStatus(404);
        }
    };
    const logout = async (req, res) => {
        req.session.destroy();
        res.sendStatus(204);
    };
    const profile = async (req, res) => {
        const currentUser = req.session["currentUser"];
        console.log(currentUser);
        if (currentUser) {
            res.send(currentUser);
        } else {
            res.sendStatus(404);
        }
    };
    const register = async (req, res) => {
        const user = req.body;
        const foundUser = await usersDao.findUserByUsername(req.body.username);
        if (foundUser) {
            res.sendStatus(409);
        } else {
            const newUser = await usersDao.createUser(user);
            req.session["currentUser"] = newUser;
            res.json(newUser);
        }
    };
    const bookRead = async (req, res) => {
        const {user_id, google_id} = req.params;
        const booksRead = await usersDao.bookRead(user_id, google_id);
        res.send(booksRead);
    };
    const bookUnread = async (req, res) => {
        const {user_id, google_id} = req.params;
        const bookUnread = await usersDao.bookUnread(user_id, google_id);
        res.send(bookUnread);
    };
    const bookReadStatus = async (req, res) => {
        const {user_id,google_id} = req.params;
        const bookReadStatus = await usersDao.bookReadStatus(user_id,google_id);
        res.send(bookReadStatus);
    };

    const booksRead = async (req, res)=>{
        const username = req.params.user_id;
        const booksRead = await usersDao.booksRead(username);
        res.send(booksRead)
    }
    const booksReadByUid = async (req, res)=>{
        const uid = req.params.uid;
        const booksRead = await usersDao.booksReadbyUid(uid);
        res.send(booksRead)
    }


    app.post("/api/users/login", login);
    app.post("/api/users/logout", logout);
    app.get("/api/users/profile", profile);
    app.post("/api/users/register", register);
    app.get("/api/users", findAllUsers);
    app.delete("/api/users/:id", deleteUserById);
    app.get("/api/users/username/:username", findUserByUsername);
    app.post("/api/users", createUser);
    app.put("/api/users/:id", updateUser);
    app.get("/api/users/:id", findUserById);
    app.put("/api/users/bookread/:user_id/:google_id", bookRead)
    app.put("/api/users/bookunread/:user_id/:google_id", bookUnread)
    app.get("/api/users/bookreadstatus/:user_id/:google_id", bookReadStatus)
    app.get("/api/users/booksread/:user_id",booksRead )
    app.get("/api/users/anon/booksread/:uid",booksReadByUid )
}

export default UsersController;