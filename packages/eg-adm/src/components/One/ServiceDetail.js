import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import { Router, Link } from "@reach/router";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Paper from '@material-ui/core/Paper';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from '@material-ui/icons/Delete'
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Formik, Form, Field, FieldArray } from "formik";
import { FormikTextField, } from "formik-material-fields";
import TextField from "@material-ui/core/TextField";
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";
import { fetchSerDetail, updateSerDetail } from "./serActions";
import ServiceList from "./ServiceList";

const styles = theme => ({
  container: {
    padding: theme.spacing(2)
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

class SerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editedFormSchema: null
    };
    this.editSerDetail = this.editSerDetail.bind(this);
    this.handleFormSchemaChange = this.handleFormSchemaChange.bind(this);
    this.saveFromSchema = this.saveFromSchema.bind(this);
  }

  handleFormSchemaChange(json) {
    try{
      console.log(json)
      this.setState({ editedFormSchema: json });
    }catch (e){
      console.log(e)
    }
    
  }

  saveFromSchema(){
    const { dispatch } = this.props;
    dispatch(
      updateSerDetail(this.props.serId, {
        formSchema: this.state.editedFormSchema
      })
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchSerDetail(this.props.serId));
  }

  editSerDetail(vals) {
    const { dispatch } = this.props;
    dispatch(updateSerDetail(this.props.serId, vals));
  }

  render() {
    const { serDetails, classes } = this.props;
    const { fetching, serData, failure } = serDetails;
    const { faq, shortDescription, formSchema } = serData;

    if (fetching) {
      return <CircularProgress className={classes.progress} />;
    }

    
    if (!serData || Object.keys(serData).length === 0) {
      return null;
    }

    let editorForm = null;
    if (this.state.editedFormSchema) {
      editorForm = this.state.editedFormSchema;
    } else {
      editorForm = formSchema;
    }
  
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {serData.sid}
              </Typography>
              <Typography variant="h5" component="h2">
                {serData.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.container}>
            <Typography variant="h5" component="h4">
              Service formSchema
            </Typography>

            <Editor
              value={editorForm}
              mode={Editor.modes.code}
              onChange={this.handleFormSchemaChange}
            />

            <Button onClick={this.saveFromSchema} variant="outlined">
              Submit formSchema
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.container}>
            <Typography variant="h5" component="h4">
              Service Description
            </Typography>
            <Formik
              name="shortDescription"
              initialValues={{ shortDescription: shortDescription || "" }}
              onSubmit={this.editSerDetail}
              render={props => (
                <Form>
                  <FormikTextField
                    multiline
                    rowsMax="4"
                    name="shortDescription"
                    label="Short Description"
                    margin="normal"
                    fullWidth
                  />
                  <Button type="submit" variant="outlined">
                    Submit Description
                  </Button>
                </Form>
              )}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.container}>
            <Typography variant="h5" component="h4">
              Faqs
            </Typography>
            <Formik
              initialValues={{ faq: faq }}
              onSubmit={this.editSerDetail}
              render={({ values }) => (
                <Form>
                  <FieldArray
                    name="faq"
                    render={arrayHelpers => (
                      <div>
                        {values.faq.map((qa, index) => (
                          <div key={index}>
                            <FieldArray />
                            <FormikTextField
                              name={`faq[${index}].question`}
                              label="question"
                              margin="normal"
                              fullWidth
                            />
                            <FormikTextField
                              name={`faq.${index}.answer`}
                              label="answer"
                              margin="normal"
                              fullWidth
                            />
                            <Fab
                              color="primary"
                              size="small"
                              onClick={() => arrayHelpers.remove(index)}
                              aria-label="add"
                              className={classes.fab}
                            >
                              <DeleteIcon />
                            </Fab>
                          </div>
                        ))}

                        <Fab
                          color="primary"
                          size="small"
                          onClick={() =>
                            arrayHelpers.push({ question: "", answer: "" })
                          }
                          aria-label="add"
                          className={classes.fab}
                        >
                          <AddIcon />
                        </Fab>
                        <div>
                          <Button type="submit" variant="outlined">
                            Submit Faqs
                          </Button>
                        </div>
                      </div>
                    )}
                  />
                </Form>
              )}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    serDetails: state.admOneSerDetailReducer
  };
};

export default connect(mapStateToProps)(withStyles(styles)(SerDetail));
