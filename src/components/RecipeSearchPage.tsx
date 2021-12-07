import { makeStyles, TablePagination } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import { RecipeSearchList } from "../models";
import { getRecipeSearchResults } from "../services";
import "../styles/App.css";
import SearchBar from "./SearchBar";
import SearchResultCard from "./SearchResultCard";

const useStyles = makeStyles(() => ({
  container: {
    padding: 30
  }
}));

export function RecipeSearchPage() {
  const classes = useStyles();

  const [searchResults, setSearchResults] = useState<RecipeSearchList>();
  const [search, setSearch] = useState("");
  let [page, setPage] = React.useState(0);
  const [resultsCount, setResultsCount] = React.useState(0);
  let [resultsPerPage, setResultsPerPage] = React.useState(10);

  const handleRecipeSearch = (input: string) => {
    getRecipeSearchResults(input, resultsPerPage, page * resultsPerPage).then(
      (data: RecipeSearchList) => {
        setSearchResults(data);
        setResultsCount(data.totalResults);
        console.log(searchResults);
      }
    );
    setSearch(input);
    setSearchResults(searchResults);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    page = newPage;
    setPage(page);
    console.log(page);
    getRecipeSearchResults(search, resultsPerPage, page * resultsPerPage).then(
      (data: RecipeSearchList) => {
        setSearchResults(data);
        console.log(searchResults);
      }
    );
    setSearchResults(searchResults);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    resultsPerPage = parseInt(event.target.value, 10);
    setResultsPerPage(resultsPerPage);
    setPage(0);
    getRecipeSearchResults(search, resultsPerPage, page * resultsPerPage).then(
      (data: RecipeSearchList) => {
        setSearchResults(data);
        console.log(searchResults);
      }
    );
    setSearchResults(searchResults);
  };

  return (
    <>
      <SearchBar label="Search for recipe" onSubmit={handleRecipeSearch} />
      <Grid
        container
        className={classes.container}
        rowSpacing={3}
        columnSpacing={{ xs: 3, sm: 5, md: 7 }}
      >
        {searchResults?.results?.map(item => (
          <Grid item key={item.id} xs={4} sm={4} md={4}>
            <SearchResultCard
              title={item.title}
              description={item.id}
              image={item.image}
            />
          </Grid>
        ))}
      </Grid>
      {searchResults && (
        <TablePagination
          labelRowsPerPage="Results per page:"
          component="div"
          count={resultsCount}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={resultsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  );
}
