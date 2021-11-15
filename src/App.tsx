
import React, { useEffect, useState } from 'react';
import { RandomRecipePage, RecipeSearchPage } from './components';
import './styles/App.css';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Router>
        <h1>Food App</h1>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '4rem' }}>
          <Link to="/">Home</Link>
          <Link to="/recipes/random">Recipe Randomizer</Link>
          <Link to="/recipes/search">Search Recipes</Link>
        </div>
        <div>
          <Switch>
            <Route exact path={'/'}>
            </Route>
            <Route path={"/recipes/random"}><RandomRecipePage /></Route>
            <Route path={"/recipes/search"}><RecipeSearchPage /></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}


export default App;

