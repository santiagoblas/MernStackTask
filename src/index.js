const express = require('express');
const morgan = require('morgan');
const path = require('path');
const tasksRouter  = require('./routes/tasks.routes');
const usersRouter  = require('./routes/users.routes');
const {mongoose} = require('./database');
const app = express();

//#region SETTINGS ----------
app.set('port', process.env.PORT || 3000)
//#endregion

//#region MIDDLEWARES -------
app.use(morgan('dev'));
app.use(express.json());
//#endregion

//#region ROUTES ------------
app.use('/api/tasks', tasksRouter);
app.use('/api/users', usersRouter);
//#endregion

//#region STATIC FILES ------
app.use(express.static(path.join(__dirname, 'public')));
//#endregion

//#region STARTING SERVER ---
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
//#endregion

