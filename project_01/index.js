const express = require('express');
const users = require("./MOCK_DATA.json");
const fs = require('fs')


const app = express();

const PORT = 8000;

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

app.get('/users', (req, res) => {
    const html = `
<ul>
${users.map((user) => `<li>${user.first_name}</li>`)}
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


app.post('/api/users', (req, res) => {
    const body = req.body;
    // console.log('Body', body)
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({ status: "pending" });
    })
    return res.status(201).json({ status: "Success", id: users.length });

});




//  start server
app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`))