const express = require('express');
const RouterController = require('./api/routes');

class AppController {
	constructor() {
		this._app = express();
		this._routes = new RouterController().routes;
		this._middlewares();
		this._applyRoutes();
	}

	_middlewares() {
		this._app.use(express.urlencoded({ extended: true }));
		this._app.use(express.json());
	}

	_applyRoutes() {
		this._app.use(this._routes);
	}

	get app() {
		return this._app;
	}
}
module.exports = AppController;
