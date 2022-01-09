import { makeStyles } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import { CustomButton } from ".";
import { RecipeList } from "../models";
import { getRandomRecipe } from "../services";
import "../styles/App.css";
import { getAllCookies } from "../utils/cookieUtils";
import SearchResultCard from "./SearchResultCard";

const useStyles = makeStyles(() => ({
  container: {
    padding: 100
  }
}));

export function BookmarkPage() {
  const classes = useStyles();
  const recipes = getAllCookies();
  console.log(recipes);

  return (
    <div>
      {recipes[0].length > 1 ? (
        <>
          <h2>Bookmarked Recipes</h2>
          <Grid
            container
            className={classes.container}
            rowSpacing={3}
            columnSpacing={{ xs: 3, sm: 5, md: 7 }}
          >
            {recipes.map(item => (
              <Grid
                item
                key={item.split("=")[1].split("*")[0]}
                xs={4}
                sm={4}
                md={4}
              >
                <SearchResultCard
                  title={item.split("=")[0]}
                  description={parseInt(item.split("=")[1].split("*")[0])}
                  image={item.split("=")[1].split("*")[1]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <h2>Bookmark recipes to see them here!</h2>
      )}
    </div>
  );
}
