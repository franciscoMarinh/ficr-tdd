class BaseError extends Error {
	constructor(message, code = 500) {
		super(message);
		this.code = code;
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = BaseError;
