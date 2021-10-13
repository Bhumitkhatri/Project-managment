const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/projectManagement')

.then(() => console.log("Database connected"))
.catch((err) => console.log('error',err));