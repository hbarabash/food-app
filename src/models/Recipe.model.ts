
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
  id: number;
}

export interface RecipeSearchList {
  results: RecipeSearchResult[] | undefined;
}

export interface RecipeById {
  summary: string;
}