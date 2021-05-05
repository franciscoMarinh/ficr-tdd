const { get } = require('../e2e/utils/api');
const nock = require('nock');
const githubSuccessResponse = require('../fixtures/github-users-response.json');
const githubNotFoundResponse = require('../fixtures/github-users-notfound.json');

describe('Github fetch Users', () => {
	test('deverá retornar o usuario que exista', async () => {
		const username = 'franciscoMarinh';

		nock('https://api.github.com')
			.get(`/users/${username}`)
			.reply(200, githubSuccessResponse);

		const res = await get(`/api/github/${username}`);

		expect(res.status).toEqual(200);

		expect(res.body).toMatchSnapshot({
			nome: githubSuccessResponse.name,
			bio: githubSuccessResponse.bio,
			githubPage: githubSuccessResponse.html_url,
		});
	});

	test('Deve retornar mensagem de que o usuario nao existe', async () => {
		const username = 'userNotFound';

		nock('https://api.github.com')
			.get(`/users/${username}`)
			.reply(404, githubNotFoundResponse);

		const res = await get(`/api/github/${username}`);

		expect(res.status).toEqual(404);
	});
});
