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
    recipeSearchByProduct: '/service/recipe/product',
    recipeByMaterial: '/service/recipe/material/${itemId}',
    recipeSearchByMaterial: '/service/recipe/material',
    recipeByVocation: '/service/recipe/vocation/${vocation}',
    recipe: '/service/recipe/${recipeId}',
    recipeCategories: '/service/recipe/categories',
    vocations: '/service/vocations',
    searchByProduct: '/service/search/product',
    searchByMaterial: '/service/search/material',
  },
};
