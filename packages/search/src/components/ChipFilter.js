import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';


const styles = theme => ({
  cf_chip: {
    marginRight: theme.spacing.unit,
    background: '#fff',
    color: theme.palette.primary['700'],
    border: `1px solid ${theme.palette.primary['200']}`,
    '&:hover': {
      color: '#fff',
      background: theme.palette.primary['700'],
    },
  },
cf_chipSelected : {
    marginRight: theme.spacing.unit,
    color : '#fff',
    background : theme.palette.primary['700'], 
    border: `1px solid ${theme.palette.primary['200']}`,
    '&:hover': {
      background: '#fff',
      color: theme.palette.primary['700'],
    },
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
 
          variant="outlined"
          className={this.state.selectedTag === '' ? classes.cf_chipSelected : classes.cf_chip}
        />
        {tags.map(tag => (
          <Chip
            key={tag}
            label={tag}
            onClick={() => this.handleClick(tag)}
 
            variant="outlined"
            className={this.state.selectedTag === tag ? classes.cf_chipSelected : classes.cf_chip}
          />
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(ChipFilter);
