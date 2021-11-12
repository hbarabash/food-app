import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { RecipeSearchList } from '../models';
import { getRecipeSearchResults } from '../services';
import '../styles/App.css';
import SearchBar from './SearchBar';
import SearchResultCard from './SearchResultCard';

export function RecipeSearchPage() {

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
      <Grid container>
      {searchResults?.results?.map((item) => {

        return (
          <Grid item xs={4} sm={4} md={4}>
            <SearchResultCard title={item.title} description={item.id} image={item.image} 
            />
          </Grid>
        );})}
      </Grid>
    </>
  );
}