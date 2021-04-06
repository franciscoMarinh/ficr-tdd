const RepositoriesController = require('./repositoriesController');
const githubResponseMocked = require('../../../../tests/fixtures/github-users-response.json');

describe('TodoService', () => {
	test('Deverá importar e instanciar a classe controller', async () => {
		const repositoriesController = new RepositoriesController();

		repositoriesController._githubClient = {
			getRepositories: async () => ({ data: githubResponseMocked }),
		};

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
});
