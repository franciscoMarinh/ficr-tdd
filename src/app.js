const express = require('express');
const RouterController = require('./api/routes');
const errorHandler = require('./commons/handles/errorHandler');
class AppController {
	constructor() {
		this._app = express();
		this._routes = new RouterController().routes;
		this._middlewares();
		this._applyRoutes();
		this._applyErrorHandler();
	}

	_middlewares() {
		this._app.use(express.urlencoded({ extended: true }));
		this._app.use(express.json());
	}

	_applyRoutes() {
		this._app.use(this._routes);
	}

	_applyErrorHandler() {
		this._app.use(errorHandler); // after all load errorHandler
	}

	get app() {
		return this._app;
	}
}
module.exports = AppController;
