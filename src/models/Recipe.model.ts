
export interface Recipe {
  title: string;
  image: string;
  spoonacularSourceUrl: string;
}
export interface RecipeList {
  recipes: Recipe[];
}

export interface RecipeSearchResult {
  title: string | undefined;
  image: string | undefined;
}

export interface RecipeSearchList {
  results: RecipeSearchResult[] | undefined;
}