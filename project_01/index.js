const express = require('express');
// const users = require("./MOCK_DATA.json");

const fs = require('fs')
const mongoose = require('mongoose');
const { type } = require('os');

const app = express();

const PORT = 8000;


mongoose.connect('mongodb://127.0.0.1:27017/project_01').then(() => console.log("Mongo Db connected")).catch((err) => console.log("Mongo Error", err));


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
});

const User = mongoose.model("user", userSchema);


// middleware -Plugin
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
    fs.appendFile(
        '\nlog.txt', `${Date.now()}:${req.ip}:${req.method}: ${req.path}`,
        (err, data) => {
            next();
        }
    );
    console.log("Hello from middleware 1");
    // return res.json({ msg: "HEllo from middleware 1" });
    next();
});


// Routes
app.get('/api/users', (req, res) => {
    return res.json(users);
});

app.get('/users', async (req, res) => {
    const allDBUsers = await User.find({});
    const html = `
<ul>
${allDBUsers.map((user) => `<li>${user.firstName}-${user.email}</li>`)}
</ul>
`;
    res.send(html)
})

app.route("/api/users/:id").get((req, res) => {

    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
}).patch((req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({ message: "User Not Found" });
    }
    // update only provided fields
    Object.assign(user, req.body);

    return res.json({
        message: "User Updated Successfully",
        user,
    });

    // Edit user with id
    // res.send('pending');
}).delete((req, res) => {
    // delete user with id
    const id = Number(req.params.id);
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "User Not Found" });
    }
    users.splice(index, 1);

    return res.json({
        message: "User deleted successfully",
    });
})


app.post('/api/users', async (req, res) => {
    const body = req.body;
    // console.log('Body', body)
    if (
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.jobTitle

    ) {
        return res.status(400).json({ msg: "All fields are req..." })
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    });

    return res.status(201).json({ msg: "success" });
    // console.log('result', result);


    // users.push({ ...body, id: users.length + 1 });
    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    //     return res.json({ status: "pending" });
    // })
    // return res.status(201).json({ status: "Success", id: users.length });

});




//  start server
app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`))