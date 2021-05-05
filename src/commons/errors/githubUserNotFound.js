const BaseError = require('./baseError');

class GithubUserNotFound extends BaseError {
	constructor() {
		super('Usuario não encontrado no github', 404);
	}
}

module.exports = GithubUserNotFound;
