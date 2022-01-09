import React, { useState } from "react";
import { CustomButton } from "./";
import { RecipeList } from "../models";
import { getRandomRecipe } from "../services";
import "../styles/App.css";
import SearchResultCard from "./SearchResultCard";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    marginBottom: 30
  }
}));

export function RandomRecipePage() {
  const classes = useStyles();
  const [recipe, setRecipe] = useState([
    {
      title: "",
      image: "",
      link: "",
      id: 0
    }
  ]);

  const handleRandomChange = () => {
    getRandomRecipe().then((data: RecipeList) => {
      console.log(data);
      setRecipe([
        {
          title: data.recipes[0].title,
          image: data.recipes[0].image,
          link: data.recipes[0].spoonacularSourceUrl,
          id: data.recipes[0].id
        }
      ]);
    });
  };
  return (
    <div>
      <CustomButton
        className={classes.container}
        title="Random Recipe"
        onClick={handleRandomChange}
      />
      {recipe[0].title.length ? (
        <Box sx={{ mx: "auto", width: 500 }}>
          <SearchResultCard
            title={recipe[0].title}
            description={recipe[0].id}
            image={recipe[0].image}
          />{" "}
        </Box>
      ) : (
        <h2>Click to get a random recipe!</h2>
      )}
    </div>
  );
}
