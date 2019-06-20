import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import _ from "lodash";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {isMobileOnly} from 'react-device-detect';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core';
import SvgAddloc from '../../svgIcons/addLoc.js';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {navigate} from "@reach/router";

import LocatioDialog from './LocationDialog';
import {trackClick} from "../../components/common/tracking";
import { toggleLocationRequestDialog } from "./actions.js";

const styles = theme => ({
    loc_req_card: {
        width: '240px',
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        boxShadow: `0 2px 5px 2px ${theme.palette.primary['100']}`
    },
loc_req_icon_compact:{
    paddingRight: theme.spacing(1),
},
loc_req_card_action_compact : {
        display: 'flex',
        paddingTop: theme.spacing(1),
        justifyContent: 'flex-end'
    },
    
    suggest_loc_card: {
        display: 'flex'
    },
    loc_req_card_content: {
        display: 'flex',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
        justifyContent: 'space-between'
    }
});

class LocationCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMob: false
        }
        this.openDialog = this.openDialog.bind(this);
    }

    openDialog(){
        this.props.openDialog();
    }
    
    componentDidMount() {
        this.setState({isMob: isMobileOnly});
    }

    render() {
        const {classes, compact, message, prompt} = this.props;
        let icon = null;
        let mobIcon = null;

        icon = (<SvgAddloc style={{
            fontSize: '56px'
        }}/>);
        mobIcon = (<SvgAddloc style={{
            fontSize: '32px'
        }}/>)

        if (compact){
            return (
                <Fragment>
                    <LocatioDialog />
                    <Card
                        style={{
                            width: '300px',
                            display: 'flex',
                            flexDirection: 'column',
                            margin: 8,
                            borderTop: `2px solid #2B0EFF`,
                            boxShadow: '0px 3px 5px 0px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 2px 6px 1px rgba(0,0,0,0.06)'
                        }}>
                    <CardContent className={classes.suggest_loc_card}>
                            <div className={classes.loc_req_icon_compact}>
                            {icon}
                        </div>
                        <div className={classes.suggest_loc_org_details}>
                            <Typography variant="body1" style={{paddingBottom: '8px'}} gutterBottom>
                                {!message ? `Not seeing what you are looking for?` : message}
                            </Typography>

                               <div className={classes.loc_req_card_action_compact}>
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={this.openDialog}
                                color="primary">
                                Add it now
                    </Button>
                        </div>
                        </div>
                    </CardContent>
                    </Card>
                </Fragment>
            )
        }
        
        return (
            <Fragment>
                <LocatioDialog  />
                    <Card className={classes.loc_req_card}>
                <Typography variant="body1" gutterBottom>
                    {!message ? `Not seeing what you are looking for?` : message}
                </Typography>
                <div className={classes.loc_req_card_content}>
                    <Typography variant="caption" gutterBottom>
                        {!prompt ?  `Let us know what's missing` : prompt}
                    </Typography>
                    <div className={classes.loc_req_icon}>
                        {icon}
                    </div>
                </div>

                <div className={classes.loc_req_card_action}>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={this.openDialog}
                        color="primary">
                        Add it now
                    </Button>
                </div>
            </Card>
            </Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        trackClick: (click_type, resultType, id, title, listIndex) => {
            dispatch(trackClick(click_type, resultType, id, title, listIndex));
        },
        openDialog: () => {
            dispatch(toggleLocationRequestDialog(true))
        }
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...state,
        ...ownProps
    };
};

const ConnLocationCard = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LocationCard));

export default ConnLocationCard;