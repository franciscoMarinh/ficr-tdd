const axios = require('axios');

class GithubClient {
	async getRepositories(usuario) {
		return axios.get(`${usuario}`);
	}
}

module.exports = GithubClient;
