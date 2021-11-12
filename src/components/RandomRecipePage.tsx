import React, { useState } from 'react';
import { CustomButton } from './';
import { RecipeList } from '../models';
import { getRandomRecipe } from '../services';
import '../styles/App.css';

export function RandomRecipePage() {

  const [recipe, setRecipe] = useState([{
    title: '',
    image: '',
    link: ''
  }]);

  const handleRandomChange = () => {
    getRandomRecipe().then((data: RecipeList) => {
      console.log(data);
      setRecipe([{
        title: data.recipes[0].title, image: data.recipes[0].image,
        link: data.recipes[0].spoonacularSourceUrl
      }]);
    });
  }
  return (
    <div>
      <CustomButton title="Random Recipe" onClick={handleRandomChange} />
      {recipe[0].title.length ? <div><h2>{recipe[0].title}</h2><img
        src={recipe[0].image}
        alt="Recipe" />
        <br />
        <a className="Recipe-link" rel="noreferrer" target='_blank'
          href={recipe[0].link}>See full recipe</a></div>
        : <h2>Click to get a random recipe!</h2>}

    </div>
  );
}
