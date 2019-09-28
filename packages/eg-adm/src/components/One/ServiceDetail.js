import React, { Component, Fragment } from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";


const styles = theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
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
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

class ServiceDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { service, classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {service.id}
          </Typography>
          <Typography variant="h5" component="h2">
            {service.name}
          </Typography>
          <Typography variant="body2" component="p">
 
              <pre>{JSON.stringify(service.formData, null, 2)}</pre>
         
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(ServiceDetail);
