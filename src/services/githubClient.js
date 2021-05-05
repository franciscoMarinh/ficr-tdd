const axios = require('axios');

class GithubClient {
	async getRepositories(usuario) {
		return axios.get(`https://api.github.com/users/${usuario}`);
	}
}

module.exports = GithubClient;
