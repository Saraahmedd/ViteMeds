process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log(err.stack);
    console.log('Shutting down')
    process.exit(1);
})

const dotenv = require("dotenv");
dotenv.config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    //.connect(process.env.LOCAL -> to locacl db)
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con => {
    console.log("Connected to DB");
})


const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

process.on('unhandledRejection', err => {//handle unhandled errors like mongoDB authentication/promise erros etc..
    console.log(err.name, err.message, err.stack);
    console.log('Shutting down')
    server.close(() => {
        process.exit(1);
    })
});

process.on('uncaughtException', err => {
    console.log(err.name, err.message, err.stack);
    console.log('Shutting down')
    server.close(() => { 
        process.exit(1);
    })
})
