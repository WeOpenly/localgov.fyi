import React, {Component} from "react";
import {connect} from "react-redux";
import _ from "lodash";
import Spinner from 'react-spinkit';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {isMobileOnly} from 'react-device-detect';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import SvgTax from '../svgIcons/tax.js';
import SvgParking from '../svgIcons/parking.js';
import SvgLicense from '../svgIcons/license.js';
import SvgLeak from '../svgIcons/leak.js';
import SvgPark from '../svgIcons/park.js';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Grid from '@material-ui/core/Grid';
import { navigate } from "@reach/router";

const styles = theme => ({
ser_template_card:{
    cursor: 'pointer',
    width: '200px',
    height: '160px',
    background: '#fff',
    margin: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
        borderTop: `2px solid #AB93FF`,
        boxShadow: '0px 3px 5px 0px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 2px 6px 1px rgba(0,0,0,0.06)'
},
    ser_template_card_compact:{
        cursor: 'pointer',
        width: '140px',
        height: '140px',
        background: '#fff',
        margin: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'column',
        '&:hover':{
            bordeRadius: theme.spacing.unit,
            boxShadow: '0px 3px 5px 0px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 12px 16px 1px rgba(0,0,0,0.06)'
        }
    },
ser_template_card_img:{
    display: 'flex',
    justifyContent: 'center',
    minHeight: '80px',
    paddingBottom: theme.spacing.unit *3,
    paddingTop: theme.spacing.unit * 3
},
ser_template_card_img_compact:{
    display: 'flex',
    justifyContent: 'center',
    minHeight: '32px',
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2
},
ser_template_card_content:{
 textAlign: 'center',
display : 'flex',
flexWrap: 'wrap',
justifyContent : 'center',
padding: theme.spacing.unit,
alignItems: 'center',
}
});

class ServiceTemplateCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMob: false,
        }
    }

    componentDidMount() {
        this.setState({isMob: isMobileOnly});
    }

    render() {
        const {classes, name, slug, compact} = this.props;
        let icon = null;
        let mobIcon = null;
        const lowerCaseName = name.toLowerCase();

        if (lowerCaseName.indexOf('tax') !== -1){
            icon = (<SvgTax style={{fontSize: '48px'}} />);
            mobIcon = (<SvgTax style={{fontSize: '32px'}} />)
        }else if(lowerCaseName.indexOf('parking') !== -1){
            icon = (<SvgParking style={{fontSize: '48px'}} />)
            mobIcon = (<SvgParking style={{fontSize: '32px'}} />)
        }else if(lowerCaseName.indexOf('license') !== -1){
            icon = (<SvgLicense style={{fontSize: '48px'}} />)
            mobIcon = (<SvgLicense style={{fontSize: '32px'}} />)
        }else if(lowerCaseName.indexOf('utility') !== -1 || lowerCaseName.indexOf('water') !== -1){
            icon = (<SvgLeak style={{fontSize: '48px'}} />)
            mobIcon = (<SvgLeak style={{fontSize: '32px'}} />)
        } else if (lowerCaseName.indexOf('recreation') !== -1 || lowerCaseName.indexOf('recreational') !== -1) {
            icon = (<SvgPark style={{ fontSize: '48px' }} />)
            mobIcon = (<SvgPark style={{ fontSize: '32px' }} />)
        } 

        if (this.state.isMob){
            return (
                <ListItem onClick={() => navigate(`/services/${slug}`, true)} style={{ background: '#fff', margin: '8px', borderTop: `1px solid #AB93FF`, boxShadow: '0px 3px 5px 0px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 2px 6px 1px rgba(0,0,0,0.06)', padding: '16px', width: '300px', cursor: 'pointer'}} >
                <ListItemAvatar>
                    {mobIcon}
                </ListItemAvatar>
                    <ListItemText primary={<Typography style={{ fontWeight: 500, color: '#5627FF' }} variant="caption">
                        {name}
                    </Typography>} />
            </ListItem>
            )
        } else {
            return (<div className={compact ? classes.ser_template_card_compact : classes.ser_template_card} onClick={() => navigate(`/services/${slug}`, { replace: true })}>
                <div className={compact ? classes.ser_template_card_img_compact : classes.ser_template_card_img}>
                                {icon}
                        </div>
                        
                    <div className={classes.ser_template_card_content}>
                    <Typography style={{ fontWeight: 500, color: '#4D4D4D'}} variant="caption">
                    {name}
                    </Typography>
                    </div>

                </div>)
        }

        
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...state
    };
};

export default connect(mapStateToProps)(withStyles(styles)(ServiceTemplateCard));
