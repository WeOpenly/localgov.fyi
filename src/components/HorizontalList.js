import React from 'react';
import {withStyles} from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import HorizontalListItem from './HorizontalListItem';


const styles = theme => ({
    ho_l_gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)'
    }
});

const HorizontalList = ({list, component: ComponentToRender, classes}) => {
    return (
        <GridList className={classes.ho_l_gridList}>
            {list.map((item, index) => (<ComponentToRender key={index} item={item}/>))}
        </GridList>
    );
};

export default withStyles(styles)(HorizontalList);
