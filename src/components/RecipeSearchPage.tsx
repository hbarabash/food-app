import { Grid, IconButton, ImageList, ImageListItem, ImageListItemBar } from '@material-ui/core';
import React, { useState } from 'react';
import { RecipeById, RecipeSearchList } from '../models';
import { getRecipeById, getRecipeSearchResults } from '../services';
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
    {/* {searchResults?.results?.map((recipe) => {
        return (<div className="App"><h2>{recipe.title}</h2><img
        src={recipe.image}
        alt="Recipe" />
        <br />
        </div>);
      })} */}
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

{/* <ImageListItem key={item.image}>
            <img
              src={`${item.image}?w=248&fit=crop&auto=format`}
              srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={item.id}
              actionIcon={
                <IconButton>
                </IconButton>
              }
            />
            </ImageListItem> */}