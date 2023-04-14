import * as usersDao from "./users-dao.js";


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

    app.post("/api/users/login", login);
    app.post("/api/users/logout", logout);
    app.get("/api/users/profile", profile);
    app.post("/api/users/register", register);

    app.get("/api/users", findAllUsers);
    app.delete("/api/users/:id", deleteUserById);
    app.get("/api/users/username/:username", findUserByUsername);
    app.post("/api/users", createUser);
    app.put("/api/users/:id", updateUser);
    app.get("/api/users/:id", findUserById)
}

export default UsersController;