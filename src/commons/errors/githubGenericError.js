const BaseError = require('./baseError');

class GithubGenericError extends BaseError {
	constructor() {
		super('Serviço indisponivel.', 500);
	}
}

module.exports = GithubGenericError;
