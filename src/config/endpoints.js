export default {
  session: {
    authenticate: '/session/authenticate',
    createAccount: '/session/register',
    me: '/session/me',
  },
  service: {
    me: '/service/me',
    item: '/service/item?ids=${itemIds}',
    recipeByProduct: '/service/recipe/product/${itemId}',
    recipeByMaterial: '/service/recipe/material/${itemId}',
    recipeByVocation: '/service/recipe/vocation/${vocation}',
    recipe: '/service/recipe/${recipeId}',
    vocations: '/service/vocations',
    searchByProduct: '/service/search/product/${query}',
    searchByMaterial: '/service/search/material/${query}',
  },
};
