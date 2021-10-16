import {describe} from "mocha";
import * as assert from "assert";
import fetch from 'node-fetch';

// Left in here for example
describe('Array', function() {
	describe('#indexOf()', function() {
		it('should return -1 when the value is not present', function() {
			assert.equal([1, 2, 3].indexOf(2), 1);
		});
	});
});


describe('Authentication Tests', () => {

	describe('Logging in with correct details', () => {
		it('should return an OK response', async () => {
			await fetch(`http://localhost:8080/login`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Origin: `http://localhost:3000`,
				},
				body: JSON.stringify({ emailVal: "drizzydrake@gmail.com", passwordVal: "qwerty123!" }),
			})
				.then((response) => {
					assert.equal(response.ok, true);
				})
				.catch((error) => {
					console.log(error);
					assert.fail("Login failed");
				});
		});
	});

	describe('Logging in with incorrect details', () => {
		it('should not return an OK response', async () => {
			await fetch(`http://localhost:8080/login`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Origin: `http://localhost:3000`,
				},
				body: JSON.stringify({ emailVal: "drizzydrake@gmail.com", passwordVal: "dfkjgngdf" }),
			})
				.then((response) => {
					assert.equal(response.ok, false);
				})
				.catch((error) => {
					console.log(error);
					assert.fail("Login failed");
				})
		});
	});

	describe('Registering an account with email already registered', () => {
		it('should return an error response as email is already in use', async () => {
			await fetch(`http://localhost:8080/register`, {
				method: 'POST',
				headers: {
					Origin: `http://localhost:3000`,
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({ emailVal: "drizzydrake@gmail.com", passwordVal: "qwerty123!" }),
			})
				.then((response) => response.json())
				.then((data) => {
					assert.equal(data.message, "A user with the email you provided already exists. Please try submit a different email.");
				})
				.catch((error) => {
					console.log(error);
					assert.fail("Registration failed");
				})
		});
	});

	describe('Registering an account with invalid email format', () => {
		it('should return an error response as email is incorrectly formatted', async () => {
			await fetch(`http://localhost:8080/register`, {
				method: 'POST',
				headers: {
					Origin: `http://localhost:3000`,
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({ emailVal: "drizs.com", passwordVal: "qwerty123!" }),
			})
				.then((response) => response.json())
				.then((data) => {
					assert.equal(data.message, "The email you provided is invalid. Please make sure it is at least three characters and contains a @.");
				})
				.catch((error) => {
					console.log(error);
					assert.fail("Registration failed");
				})
		});
	});

	describe('Registering an account with weak password', () => {
		it('should return an error response as password needs to be stronger', async () => {
			await fetch(`http://localhost:8080/register`, {
				method: 'POST',
				headers: {
					Origin: `http://localhost:3000`,
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({ emailVal: "drizzydrake@gmail.com", passwordVal: "test" }),
			})
				.then((response) => response.json())
				.then((data) => {
					assert.equal(data.message, "Your password needs to be stronger. Please make sure it has at least 8 characters and contains at least one letter, number and symbol.");
				})
				.catch((error) => {
					console.log(error);
					assert.fail("Registration failed");
				})
		});
	});

	describe('Registering an account with weak password and incorrect email', () => {
		it('should return an error response as password needs to be stronger and email is incorrectly formatted', async () => {
			await fetch(`http://localhost:8080/register`, {
				method: 'POST',
				headers: {
					Origin: `http://localhost:3000`,
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({ emailVal: "drizl.com", passwordVal: "test" }),
			})
				.then((response) => response.json())
				.then((data) => {
					assert.equal(data.message, "The email you provided is invalid. Please make sure it is at least three characters and contains a @. Also, your password needs to be stronger. Please make sure it has at least 8 characters and contains at least one letter, number and symbol.");
				})
				.catch((error) => {
					console.log(error);
					assert.fail("Registration failed");
				})
		});
	});

	describe('Registering an account with weak password and incorrect email', () => {
		it('should return an error response as password needs to be stronger and email is incorrectly formatted', async () => {
			await fetch(`http://localhost:8080/register`, {
				method: 'POST',
				headers: {
					Origin: `http://localhost:3000`,
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({ emailVal: "drizl.com", passwordVal: "test" }),
			})
				.then((response) => response.json())
				.then((data) => {
					assert.equal(data.message, "The email you provided is invalid. Please make sure it is at least three characters and contains a @. Also, your password needs to be stronger. Please make sure it has at least 8 characters and contains at least one letter, number and symbol.");
				})
				.catch((error) => {
					console.log(error);
					assert.fail("Registration failed");
				})
		});
	});

	describe('Registering an account with correct email and format', () => {
		it('should return an okay incorrectly formatted', async () => {
			await fetch(`http://localhost:8080/register`, {
				method: 'POST',
				headers: {
					Origin: `http://localhost:3000`,
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				// CHANGE EMAIL NUMBER TO ENSURE NEW USER IS ADDED
				body: JSON.stringify({ emailVal: "qwerty25@gmail.com", passwordVal: "qwerty123!" }),
			})
				.then((response) => {
					assert.equal(response.status, 200);
				})
				.catch((error) => {
					console.log(error);
					assert.fail("Registration failed");
				})
		});
	});

});