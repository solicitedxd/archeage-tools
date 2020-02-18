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
    recipe: '/service/recipe?ids=${recipeIds}',
    recipeCategories: '/service/recipe/categories',
    recipeByCategory: '/service/recipe/categories/${category}',
    vocations: '/service/vocations',
    searchByProduct: '/service/search/product',
    searchByMaterial: '/service/search/material',
  },
};
