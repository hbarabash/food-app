import { render } from '@testing-library/react';
import React, { useState } from 'react';
import { RecipeList, RecipeSearchList } from '../models';
import { getRecipeSearchResults } from '../services';
import '../styles/App.css';
import SearchBar from './SearchBar';

export function RecipeSearchPage() {

  const [recipe, setRecipe] = useState([{
    title: '',
    image: ''
  }]);
  const [searchResults, setSearchResults] = useState<RecipeSearchList>();

  const handleRecipeSearch = (input: string) => {
    getRecipeSearchResults(input).then((data: RecipeSearchList) => {
      setSearchResults(data);
      console.log(searchResults);
    });
  }
  return (
    <>
    <SearchBar label="Search for recipe" onSubmit={handleRecipeSearch} />
    {searchResults?.results?.map((recipe) => {
        return (<div className="App"><h2>{recipe.title}</h2><img
        src={recipe.image}
        alt="Recipe" />
        <br />
        </div>);
      })}
    </>
  );
}
