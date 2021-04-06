const GithubClient = require('./githubClient');
const githubResponseMocked = require('../../tests/fixtures/github-users-response.json');
const axios = require('axios');

jest.mock('axios');

describe('Github client -', () => {
	test('Deve retornar um objeto contendo as informações do usuario', async () => {
		axios.get.mockResolvedValue({ data: githubResponseMocked });

		const client = new GithubClient();

		expect(client.getRepositories).toBeDefined();

		const respositories = await client.getRepositories('franciscoMarinh');

		expect(respositories.data).toMatchObject(githubResponseMocked);
	});
});
