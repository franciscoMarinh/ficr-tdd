const errorHandler = (error, req, res, next) => {
	const statusCode = error.code || 500;
	return res.status(statusCode).send({ message: error.message || '' });
};

module.exports = errorHandler;
