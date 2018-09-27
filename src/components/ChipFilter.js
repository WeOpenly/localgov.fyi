import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

import withRoot from '../withRoot';

const styles = theme => ({
  chip: {
    marginRight: theme.spacing.unit,
  },
});

class ChipFilter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, tags, changeFilter } = this.props;
    return (
      <div>
        <Chip
          label="All"
          onClick={() => changeFilter('')}
          className={classes.chip}
        />
        {tags.map(tag => (
          <Chip
            key={tag}
            label={tag}
            onClick={() => changeFilter(tag)}
            className={classes.chip}
          />
        ))}
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(ChipFilter));
