const GithubClient = require('../../../services/githubClient');
const GithubUserNotFound = require('../../../commons/errors/githubUserNotFound');
const GithubGenericError = require('../../../commons/errors/githubGenericError');
class RepositoriesController {
	constructor() {
		this._githubClient = new GithubClient();
	}

	async normalizeRepositories(username) {
		try {
			const { data } = await this._githubClient.getRepositories(username);

			const normalizedData = {
				nome: data.name,
				bio: data.bio,
				githubPage: data.html_url,
			};
			return normalizedData;
		} catch (error) {
			if (error.response && error.response.status === 404) {
				throw new GithubUserNotFound();
			}
			throw new GithubGenericError();
		}
	}

	async getRepositories(req, res, next) {
		try {
			const { username } = req.params;
			const data = await this.normalizeRepositories(username);
			return res.json(data);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = RepositoriesController;
