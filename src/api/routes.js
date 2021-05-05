const express = require('express');
const fs = require('fs');
const { promisify } = require('util');
const path = require('path');

class RouterController {
	constructor() {
		this._routes = express.Router();
		this._applyRoutes();
	}

	async _getPathsToImport() {
		const promiseReadDir = promisify(fs.readdir);
		const folders = await promiseReadDir(
			path.resolve(__dirname, 'modules')
		);
		return folders;
	}

	async _importRoutesForApply() {
		const arrayPaths = await this._getPathsToImport();
		const modules = arrayPaths
			.map((pathToFile) =>
				require(path.join(__dirname, 'modules', pathToFile))
			)
			.filter(
				(module) => Object.getPrototypeOf(module) === express.Router
			);

		return modules;
	}

	async _applyRoutes() {
		const routes = await this._importRoutesForApply();
		routes.forEach((route) => this.routes.use('/api', route));
	}

	get routes() {
		return this._routes;
	}
}

module.exports = RouterController;
