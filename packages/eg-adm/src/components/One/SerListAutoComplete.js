import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import { Router, Link } from "@reach/router";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Formik, Form, Field, FieldArray } from "formik";
import { FormikTextField } from "formik-material-fields";
import TextField from "@material-ui/core/TextField";
import deburr from "lodash/deburr";
import Downshift from "downshift";
import { makeStyles } from "@material-ui/core/styles";

import Popper from "@material-ui/core/Popper";

import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Switch from "@material-ui/core/Switch";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import PlanList from "./PlanList";
import { subscribeForSers } from "./serActions";
import {
  fetchPackageDetail,
  editPackDetail,
  updateServicesInPackage,
  updatePlansInPackage
} from "./packActions";

const styles = theme => ({
  container: {
    padding: theme.spacing(2)
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  progress: {
    margin: theme.spacing(2)
  },
  card: {
    marginTop: theme.spacing(2),
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },

  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});


class SerListAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: [],
      inputVal: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
  }

  renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
      <TextField
        InputProps={{
          inputRef: ref,
          classes: {
            root: classes.inputRoot,
            input: classes.inputInput
          },
          ...InputProps
        }}
        {...other}
      />
    );
  }

  renderSuggestion(suggestionProps) {
    const {
      suggestion,
      index,
      itemProps,
      highlightedIndex,
      selectedItem
    } = suggestionProps;
    const isHighlighted = highlightedIndex === index;

 

    return (
      <MenuItem
        {...itemProps}
        key={suggestion.id}
        selected={isHighlighted}
        component="div"
      >
        {suggestion.name}
        <br />
        <small>{suggestion.sid}</small>
      </MenuItem>
    );
  }

  handleInputChange(e){
    this.setState({
    inputVal: e.target.value
    });
  }

  handleChange(item) {
    console.log(item, 'change');
    this.setState({
      selectedItem: item,
      inputVal: item.name
    });
    this.props.onSelectSer(item);
  }

  getSuggestions(value, { showEmpty = false } = {}) {
    const { fetching, items, failure } = this.props.ser;
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    console.log(value, items);
    if (fetching) {
      return null;
    }
    return inputLength === 0 && !showEmpty
      ? []
      : items.filter(suggestion => {
          const keep =
            count < 5 &&
            suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;

          if (keep) {
            count += 1;
          }

          return keep;
        });
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={3}>
        <div className={classes.root}>
          <Downshift
            id="downshift-simple"
            onChange={this.handleChange}
            inputValue={this.state.inputVal}
            selectedItem={this.state.selectedItem}
          >
            {({
              getInputProps,
              getItemProps,
              getLabelProps,
              getMenuProps,
              highlightedIndex,
              inputValue,
              isOpen,
              selectedItem
            }) => {
              const {
                onBlur,
                onChange,
                onFocus,
                ...inputProps
              } = getInputProps({
                placeholder: "Search for a service"
              });

              return (
                <div className={classes.container}>
                  {this.renderInput({
                    fullWidth: true,
                    classes,

                    label: "Service",
                    InputLabelProps: getLabelProps({ shrink: true }),
                    InputProps: { onBlur, onFocus },
                    inputProps,
                    onChange: event => {
                      this.handleInputChange(event);
                      onChange(event);
                    }
                  })}

                  <div {...getMenuProps()}>
                    {isOpen ? (
                      <Paper className={classes.paper} square>
                        {this.getSuggestions(inputValue).map(
                          (suggestion, index) =>
                            this.renderSuggestion({
                              suggestion,
                              index,
                              itemProps: getItemProps({ item: suggestion }),
                              highlightedIndex,
                              selectedItem
                            })
                        )}
                      </Paper>
                    ) : null}
                  </div>
                </div>
              );
            }}
          </Downshift>
        </div>
      </Grid>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    ser: state.admOneSerReducer
  };
};

export default connect(mapStateToProps)(
  withStyles(styles)(SerListAutoComplete)
);
