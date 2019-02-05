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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Grid from '@material-ui/core/Grid';
import { navigate } from "gatsby";

const styles = theme => ({
ser_template_card:{
    cursor: 'pointer',
    width: '240px',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.unit,
    margin: theme.spacing.unit,
    boxShadow : `0 2px 5px 2px ${theme.palette.primary['100']}`,
},
ser_template_card_img:{
    display: 'flex',
    justifyContent: 'center',
    minHeight: '80px',
    padding: theme.spacing.unit *3
},
ser_template_card_content:{
 textAlign: 'center',
display : 'flex',
justifyContent : 'center',

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
        const {classes, name, slug} = this.props;
        let icon = null;
        let mobIcon = null;
        const lowerCaseName = name.toLowerCase();

        if (lowerCaseName.indexOf('tax') !== -1){
            icon = (<SvgTax style={{fontSize: '64px'}} />);
            mobIcon = (<SvgTax style={{fontSize: '40px'}} />)
        }else if(lowerCaseName.indexOf('parking') !== -1){
            icon = (<SvgParking style={{fontSize: '64px'}} />)
            mobIcon = (<SvgParking style={{fontSize: '40px'}} />)
        }else if(lowerCaseName.indexOf('license') !== -1){
            icon = (<SvgLicense style={{fontSize: '64px'}} />)
            mobIcon = (<SvgLicense style={{fontSize: '40px'}} />)
        }else if(lowerCaseName.indexOf('utility') !== -1 || lowerCaseName.indexOf('water') !== -1){
            icon = (<SvgLeak style={{fontSize: '64px'}} />)
            mobIcon = (<SvgLeak style={{fontSize: '40px'}} />)
        }

        if (this.state.isMob){
            return (
            <ListItem  onClick={() => navigate(`services/${slug}`)} style={{background: '#fff', margin: '8px', padding: '24px', cursor: 'pointer'}} alignItems="flex-start">
                <ListItemAvatar>
                    {mobIcon}
                </ListItemAvatar>
                <ListItemText primary={name} />
            </ListItem>
            )
        } else {
            return (<Card className={classes.ser_template_card} onClick={() => navigate(`services/${slug}`)}>
                        <div className={classes.ser_template_card_img}>
                                {icon}
                        </div>
                        
                    <CardContent className={classes.ser_template_card_content}>
                    <Typography variant="body1" gutterBottom>
                    {name}
                    </Typography>
                    </CardContent>

                </Card>)
        }

        
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...state
    };
};

export default connect(mapStateToProps)(withStyles(styles)(ServiceTemplateCard));
