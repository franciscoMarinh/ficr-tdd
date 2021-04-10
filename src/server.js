const AppController = require('./app');
const { app } = new AppController();

app.listen(process.env.PORT || 3000);
