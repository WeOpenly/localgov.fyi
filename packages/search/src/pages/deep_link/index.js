import React, {Component} from 'react';
import {connect} from "react-redux";
import {navigate} from '@reach/router';
import CircularProgress from '@material-ui/core/CircularProgress';
import Img from "gatsby-image";

import {CopyToClipboard} from 'react-copy-to-clipboard';
import {FacebookShareButton, TwitterShareButton} from 'react-share';

import MediaNetAd from "../../components/MediaNetAd";

import queryString from 'query-string'
import {withStyles} from '@material-ui/core/styles';
import withRoot from '../../withRoot';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import GoodBye from '../../illus/GoodBye'
import {trackClick} from "../../components/common/tracking";

import {decode} from 'universal-base64';
const styles = theme => ({
    redirDataContainer: {
        marginTop: theme.spacing.unit *6
    },
    adContainer:{
        marginTop: theme.spacing.unit *3
    },
    ser_redir_details: {
boxShadow : `0 1px 5px 0px #AB93FF`,
        width: '300px',
        marginTop: theme.spacing.unit*4,
        padding: `0 ${theme.spacing.unit*4}px ${theme.spacing.unit*4}px ${theme.spacing.unit*5}px`,
    }
});

const windowGlobal = typeof window !== 'undefined' && window

class DeepLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            decoding: true,
            decodedData: null,
            decodeError: false
        }
    }

    componentDidMount() {
        const {search} = this.props.location;
        const {trackClick} = this.props;

        let encodedData = null;

        if (search) {
            const values = queryString.parse(this.props.location.search);
            if (values && values.data) {
                encodedData = values.data;
            }
        }

        if (encodedData) {
            try {
                const decoded = decode(encodedData)
                const jsonDecoded = JSON.parse(decoded)
                const {u, s} = jsonDecoded;
                trackClick('external', 'service_delivery_link', u, s, 0);
                // setTimeout(() => windowGlobal.location.href =u , 4000);
                this.setState({decoding: false, decodedData: jsonDecoded})
            } catch (e) {
                this.setState({decoding: false, decodeError: true})
            }

        } else {
            this.setState({decoding: false, decodeError: true})
        }
    }

    render() {
        const {decodedData, decoding, decodeError} = this.state;
        const { classes, isMobile } = this.props;

        if (decoding) {
            return (
                <Grid container spacing={16}>
                    <Grid item xs={12} className={classes.redirDataContainer}>
                        <CircularProgress />
                    </Grid>
                </Grid>
            )
        }
        if (decoding) {
            return (
                <Grid container spacing={16}>
                    <Grid item xs={12} className={classes.redirDataContainer}>
                        Whoops!
                    </Grid>
                </Grid>
            )
        }
        const {s, o} = decodedData;
        return (
          <Grid container spacing={16}>
            <Grid
              item
              xs={12}
              align="center"
              className={classes.redirDataContainer}
            >
              <Typography variant="display2" color="primary" gutterBottom>
                papergov
              </Typography>
              <Paper className={classes.ser_redir_details}>
                <GoodBye />
                <Typography variant="subheading" gutterBottom>
                  See you soon!
                </Typography>
                <Typography
                  variant="caption"
                  style={{ paddingBottom: "16px" }}
                  gutterBottom
                >
                  You are currently leaving papergov, and will be auto
                  redirected to
                </Typography>
                <Typography variant="title" component="h4" gutterBottom>
                  <b>{o}</b>'s <b>{s}</b> website
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} align="center" className={classes.adContainer}>
              {!isMobile ? (
                <MediaNetAd
                  dims="728x90"
                  slotId="124203868"
                  containerStyles={{
                    marginTop: "8px",
                    borderTop: "1px solid #d4d4d4",
                    paddingTop: "8px"
                  }}
                />
              ) : null}
            </Grid>
          </Grid>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        trackClick: (click_type, resultType, id, title, listIndex) => {
            dispatch(trackClick(click_type, resultType, id, title, listIndex));
        }
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...ownProps
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRoot(withStyles(styles)(DeepLink)));

