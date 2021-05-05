const { Router } = require('express');
const RepositoriesController = require('./repositoriesController');
const routes = Router();

const controller = new RepositoriesController();

routes.get('/github/:username', (req, res, next) =>
	controller.getRepositories(req, res, next)
);

module.exports = routes;
