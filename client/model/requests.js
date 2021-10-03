import { SERVER_PORT } from '../../credentials.js';
import { Recipe } from './Recipe.js';

/**
 * For bookmarking recipes to your cookbook.
 * @param {String} cookbook_id 
 * @param {Recipe} recipe 
 * @returns Response
 */
export const addRecipe = (cookbook_id, recipe) =>
  fetch(`http://localhost:${SERVER_PORT}/cookbook/${cookbook_id}/recipes/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(recipe),
  }).then((response) => response.json());

export const removeRecipe = (cookbook_id, recipe_id) =>
  fetch(
    `http://localhost:${SERVER_PORT}/cookbook/${cookbook_id}/recipes/${recipe_id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  ).then((response) => response.json());
