import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { RecipeSearchList } from '../models';
import { getRecipeSearchResults } from '../services';
import '../styles/App.css';
import SearchBar from './SearchBar';
import SearchResultCard from './SearchResultCard';

const useStyles = makeStyles(() => ({
  container: {
    padding: 30
  },  
}));

export function RecipeSearchPage() {
  const classes = useStyles();

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
      <Grid container className={classes.container} rowSpacing={3} columnSpacing={{ xs: 3, sm: 5, md: 7 }}>
        {searchResults?.results?.map((item) => (
          <Grid item key={item.id} xs={4} sm={4} md={4}>
            <SearchResultCard title={item.title} description={item.id} image={item.image}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}