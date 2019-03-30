import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Grid from '@material-ui/core/Grid';
import { isMobileOnly } from 'react-device-detect';
import SuggestedRow from './SuggestedRow';
import { withStyles } from '@material-ui/core/styles';
import ContentLoader from "react-content-loader"

const SuggestedLoader = () => (
    <ContentLoader
        height={200}
        width={400}
        speed={100}
        primaryColor="#f3f3f3"
        secondaryColor="#d5d9f3"
    >
        <rect x="11" y="75" rx="0" ry="0" width="166" height="61" />
        <rect x="8" y="12" rx="0" ry="0" width="304" height="19" />
    </ContentLoader>
)

const styles = theme => ({
    ser_template_card: {
        cursor: 'pointer',
        width: '240px',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing.unit,
        margin: theme.spacing.unit,
        boxShadow: `0 2px 5px 2px ${theme.palette.primary['100']}`,
    },
    ser_template_card_img: {
        display: 'flex',
        justifyContent: 'center',
        minHeight: '80px',
        padding: theme.spacing.unit * 3
    },
    ser_template_card_content: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',

    },
    ser_gloss_suggested_row: {
        paddingLeft: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2,
    },
});

class Suggested extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({ isMob: isMobileOnly });
    }

    render() {        
        const { autoLocLoading, autoLocResults, autoLocFailed, handleOrgClick, classes} = this.props;
        const { googLocLoading, googLocResults, googlLocFailed} = this.props;
   
        if (autoLocLoading || googLocLoading){
            return (<Grid container>
                <Grid item sm={1} />
                <Grid item sm={5} className={classes.ser_gloss_suggested_row}>
                    <SuggestedLoader />
                </Grid>
                <Grid item sm={6} />
                <Grid item sm={1} />
                <Grid item sm={5} className={classes.ser_gloss_suggested_row}>
                    <SuggestedLoader />
                </Grid>
                <Grid item sm={6} />
            </Grid>)
        }

        if (autoLocFailed || googlLocFailed){
            return null;
        }

        let locationCards = null;

        if (autoLocResults && autoLocResults.length > 0){
            locationCards = autoLocResults.map((result, idx) => {
                const header = result.header;
                const results = result.location_sers;
                return (<SuggestedRow key={`auto-loc-${result.header}-${idx}`} header={header} results={results} handleOrgClick={handleOrgClick} />)
            });
        }

        if (googLocResults && googLocResults.length > 0) {
            locationCards = googLocResults.map((result, idx) => {
                const header = result.header;
                const results = result.location_sers;
                return (<SuggestedRow  key={`goog-loc-${result.header}-${idx}`} header={header} results={results} handleOrgClick={handleOrgClick} />)
            });
        }

        return locationCards
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...state.serTemplate,
        ...ownProps
    };
};

export default connect(mapStateToProps)(withStyles(styles)(Suggested));
