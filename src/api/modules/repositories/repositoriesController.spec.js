const axios = require('axios');

const RepositoriesController = require('./repositoriesController');
const GithubUserNotFound = require('../../../commons/errors/githubUserNotFound');
const GithubGenericError = require('../../../commons/errors/githubGenericError');
const githubResponseMocked = require('../../../../tests/fixtures/github-users-response.json');
const githubResponseUserNotFound = require('../../../../tests/fixtures/github-users-notfound.json');
jest.mock('axios');

describe('RepositoriesController', () => {
	test('Deverá importar e instanciar a classe controller', async () => {
		const repositoriesController = new RepositoriesController();

		axios.get.mockResolvedValue({ data: githubResponseMocked });

		expect(repositoriesController).toMatchObject({
			getRepositories: expect.any(Function),
			normalizeRepositories: expect.any(Function),
		});

		const user = 'franciscoMarinh';

		await expect(
			repositoriesController.normalizeRepositories(user)
		).resolves.toEqual({
			nome: githubResponseMocked.name,
			bio: githubResponseMocked.bio,
			githubPage: githubResponseMocked.html_url,
		});
	});

	test('Deverá Retornar error de que o usuario nao foi encontrado no github', async () => {
		const repositoriesController = new RepositoriesController();

		axios.get.mockRejectedValue({
			...githubResponseUserNotFound,
			response: {
				status: 404,
			},
		});

		expect(repositoriesController).toMatchObject({
			getRepositories: expect.any(Function),
			normalizeRepositories: expect.any(Function),
		});

		const user = 'usuarioNaoEncontrado';

		await expect(
			repositoriesController.normalizeRepositories(user)
		).rejects.toThrowError(GithubUserNotFound);
	});

	test('Deverá Retornar error de serviço indisponivel', async () => {
		const repositoriesController = new RepositoriesController();

		axios.get.mockRejectedValue({
			response: {
				status: 403,
			},
		});

		expect(repositoriesController).toMatchObject({
			getRepositories: expect.any(Function),
			normalizeRepositories: expect.any(Function),
		});

		const user = 'usuarioNaoEncontrado';

		await expect(
			repositoriesController.normalizeRepositories(user)
		).rejects.toThrowError(GithubGenericError);
	});
});
