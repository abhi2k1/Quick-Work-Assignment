const express = require('express');
const app = express();

const dotenv = require('dotenv');


dotenv.config({path : './config.env'});



const PORT =  process.env.PORT;
app.use(express.json());



app.use(require('./email'));
app.listen(PORT,()=>{
    console.log(`server at ${PORT}`);
});