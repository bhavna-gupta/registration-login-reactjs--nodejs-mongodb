const express=require('express');
const app=express();
const cors=require('cors');
const Connection=require('./databas/db');
const bodyParser = require('body-parser');
const router=require('./routes/userRoutes');

app.use(express.json({limit:"200mb"}))
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));

//Database Connection
Connection();

//Routes
app.use('/',router);

//port
const port=8005 || process.env.PORT;
app.listen(port,()=>{
    console.log(`Server is running on the ${port}`);
})