const GithubClient = require('../../../services/githubClient');

class RepositoriesController {
	constructor() {
		this._githubClient = new GithubClient();
	}

	async normalizeRepositories(username) {
		const { data } = await this._githubClient.getRepositories(username);
		const normalizedData = {
			nome: data.name,
			bio: data.bio,
			githubPage: data.html_url,
		};
		return normalizedData;
	}

	async getRepositories(req, res, next) {}
}

module.exports = RepositoriesController;
