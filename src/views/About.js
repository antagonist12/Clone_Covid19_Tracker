import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import Card from '../components/Card';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    GridRoot: {
       paddingLeft: "40px",
       paddingRight: "20px",
       paddingTop: "25px"
    }
});

function About() {
    const classes = useStyles();
    return (
    <Grid container spacing={2} className={classes.GridRoot} justify="center">
        <Grid item xs={12} sm={6} md={4}>
            <Card />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
            <Card />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
            <Card />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
            <Card />
        </Grid>
    </Grid>
    )
}

export default About
