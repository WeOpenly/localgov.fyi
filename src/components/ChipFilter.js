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
    this.state = {
      selectedTag: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(tag) {
    this.props.changeFilter(tag);
    this.setState({ selectedTag: tag });
  }

  render() {
    const { classes, tags } = this.props;
    return (
      <div>
        <Chip
          label="All"
          onClick={() => this.handleClick('')}
          className={classes.chip}
          color={this.state.selectedTag === '' ? 'primary' : 'default'}
        />
        {tags.map(tag => (
          <Chip
            key={tag}
            label={tag}
            onClick={() => this.handleClick(tag)}
            className={classes.chip}
            color={this.state.selectedTag === tag ? 'primary' : 'default'}
          />
        ))}
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(ChipFilter));
