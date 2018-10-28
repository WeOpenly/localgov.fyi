import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import HorizontalListItem from './HorizontalListItem';
import withRoot from '../withRoot';

const styles = theme => ({
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)'
    }
});

const HorizontalList = ({list, component: ComponentToRender, classes}) => {
    return (
        <GridList className={classes.gridList}>
            {list.map((item, index) => (<ComponentToRender key={index} item={item}/>))}
        </GridList>
    );
};

export default withStyles(styles)(HorizontalList);
