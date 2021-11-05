const express = require('express');

const app = express();

const dbConnection = require('./database/mongoConn');

const bodyparser = require('body-parser');
app.use(express.json());
app.use(bodyparser.json());

const membersRoutes = require('./routes/members');
app.use('/', membersRoutes);

const projectsRoutes = require('./routes/projects');
app.use('/', projectsRoutes);

const taskRoutes = require('./routes/tasks');
app.use('/', taskRoutes);

app.listen(3000, ()=>{
    console.log("Server is up and running at port: 3000");
});