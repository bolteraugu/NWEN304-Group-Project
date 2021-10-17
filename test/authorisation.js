import {describe} from "mocha";
import * as assert from "assert";
import fetch from 'node-fetch';

function delay(n){
	return new Promise(function(resolve){
		setTimeout(resolve,n*1000);
	});
}

describe('Authorisation Tests', () => {

	describe('Logs in and remembers the token. Checks that the token has been expired after 10 seconds', () => {
		it('should return a 403 error as the token has expired', async () => {
			let token = "";
			await fetch(`https://cooked-304-server.herokuapp.com/login`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Origin: `https://cooked-304-client.herokuapp.com`,
				},
				body: JSON.stringify({ emailVal: "drizzydrake@gmail.com", passwordVal: "qwerty123!" }),
			})
				.then((response) => response.json())
				.then(async (data) => {
					token = data.token;

					await delay(15);
					// CHECK TOKEN
					await fetch(`https://cooked-304-server.herokuapp.com/checkToken`, {
						method: 'GET',
						headers: {
							'Authorization': 'Bearer ' + token
						}
					}).then((response) => {
						assert.equal(response.status, 403);
					})
				})
				.catch((error) => {
					console.log(error);
					assert.fail("Login failed");
				});
		});
	});


	describe('Logs in and remembers the token. Checks that the token has not been expired before 10 seconds', () => {
		it('should return a 200 OK as the token has not expired', async () => {
			let token = "";
			await fetch(`https://cooked-304-server.herokuapp.com/login`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Origin: `https://cooked-304-client.herokuapp.com`,
				},
				body: JSON.stringify({ emailVal: "drizzydrake@gmail.com", passwordVal: "qwerty123!" }),
			})
				.then((response) => response.json())
				.then(async (data) => {
					token = data.token;

					await delay(5);
					// CHECK TOKEN
					await fetch(`https://cooked-304-server.herokuapp.com/checkToken`, {
						method: 'GET',
						headers: {
							'Authorization': 'Bearer ' + token
						}
					}).then((response) => {
						assert.equal(response.status, 200);
					})
				})
				.catch((error) => {
					console.log(error);
					assert.fail("Login failed");
				});
		});
	});

});

