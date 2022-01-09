import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Badge, Grid, Typography } from "@material-ui/core";
import { getRecipeById } from "../services";
import { RecipeById } from "../models";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactHtmlParser from "react-html-parser";
import { BookmarkButton } from "./custom-button/BookmarkButton";
import { deleteCookie, getCookie, isCookie, setCookie } from "../utils/cookieUtils";

export interface SearchResultCardProperties {
  title: string;
  description: number;
  image: string;
  actions?: React.ReactNode[];
}

const useStyles = makeStyles(({ palette }) => ({
  card: {
    height: "100%",
    flexDirection: "column",
    boxShadow:
      "2px 4px 20px 0px rgb(0 0 0 / 50%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
  },
  actions: {
    justifyContent: "flex-end",
    marginTop: "auto"
  },
  primaryColor: {
    color: palette.primary.main
  },
  box: {
    display: 'inline-block',
    position: 'relative',
  },
  image: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%"
  },
  bookmark: {
    position: "absolute",
    right: 0,
    top: 0,
    lineHeight: 0,
  }
}));

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest
  })
}));

export default function SearchResultCard(props: SearchResultCardProperties) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [summary, setSummary] = useState("");
  let [isBookmarked, setIsBookmarked] = useState(isCookie(props.title));

  const getRecipeSummary = (id: number) => {
    getRecipeById(id).then((data: RecipeById) => {
      setSummary(data.summary);
    });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
    if (summary === "") getRecipeSummary(props.description);
  };

  const handleBookmarkChange = () => {
    if (isBookmarked) {
      deleteCookie(props.title);
      isBookmarked = false;
    }
    else {
      setCookie(props.title, props.description.toString(), props.image);
      isBookmarked = true;
    }
    setIsBookmarked(isBookmarked);
  }
  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid
          container
          direction="row"
          alignItems="center"
          spacing={1}
          align-content="centre"
        >
          <Grid item className={classes.box}>
            <img className={classes.image} src={props.image} alt="Recipe" />
            <BookmarkButton className={classes.bookmark} 
            id={props.description} image={props.image} title={props.title} onClick={handleBookmarkChange}/>
            <p>{props.title}</p>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.actions}>
        {props.actions}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {ReactHtmlParser(`<div>${summary}</div>`)}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
