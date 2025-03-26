const express = require('express');
const sequelize = require('./config/databases');
const routes = require('./routes/index');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

/* ******** MIDLEWARE ************* */
async function getUser() {
    return{
        id: 12345,
        name: 'Mario',
    };
}
app.use((req, res, next)=>{
    if(req.ip === '187.139.17.60'){
        next(new Error('Error!!!'));
    }else{
        next();
    }
});

app.use(async(req, res, next) =>{
    const user = await getUser();
    req.localhost = {
        user,
    };
    next();
});

app.get('/test', async(req, res) => {
    const user = req.locals.user;
    res.json({
        status: 'ok',
    });
});

sequelize.sync()
    .then( () => console.log("DB is ready"))
    .catch( err => console.error(err));

app.listen(PORT, () => {
    console.log(`server is running ${PORT}`)
});

app.use(routes.unprotectedRoutes);




