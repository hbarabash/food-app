import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Grid, Typography } from '@material-ui/core';
import { getRecipeById } from '../services';
import { RecipeById } from '../models';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactHtmlParser from 'react-html-parser'; 


export interface SearchResultCardProperties {
    title: string | undefined;
    description: number;
    image: string | undefined;
    actions?: React.ReactNode[];
  }

  const useStyles = makeStyles(theme => ({
    card: {
      height: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
      margin: '30px',
    },
    actions: {
      justifyContent: 'flex-end',
      marginTop: 'auto',
    },
    primaryColor: {
      color: theme.palette.primary.main,
    },
    image: {
        flexGrow: 1,
        display: 'flex',
      flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
    
  }));

  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }
  
  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  export default function SearchResultCard(props: SearchResultCardProperties) {

    
    const classes = useStyles();
      const [expanded, setExpanded] = React.useState(false);
      const [summary, setSummary] = useState('');

      const getRecipeSummary = (id: number) => {
        getRecipeById(id).then((data: RecipeById) => {
          setSummary(data.summary);
      })
      }
      

      const handleExpandClick = () => {
        setExpanded(!expanded);
        if (summary === '') {
          getRecipeSummary(props.description);
        }
      };

    return (
        <div>
      <Card className={classes.card}>
        <CardContent >
          <Grid container direction="row" alignItems="center" spacing={1}
          align-content="centre">
            <Grid item>
            <img className={classes.image}
        src={props.image}
        alt="Recipe" />
              <p >{props.title}</p>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions className={classes.actions}>{props.actions}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore></CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{ ReactHtmlParser ("<div>" + summary + "</div>") }</Typography>
        </CardContent>
      </Collapse>
      </Card>
      </div>
    );
  }