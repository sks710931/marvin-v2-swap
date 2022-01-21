import { Grid, makeStyles, Paper } from '@material-ui/core'
import React from 'react'
import { SwapTabs } from './swap-tabs';

export const SwapContainer = () => {

    const classes = useStyles();
    return (
        <div>
            <Grid container>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                    <Paper className={classes.paper} variant="outlined">
                        <SwapTabs />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    paper:{
        margin: theme.spacing(2)
    }
}))