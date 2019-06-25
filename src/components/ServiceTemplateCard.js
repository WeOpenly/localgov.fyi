import React, {Component} from "react";
import {connect} from "react-redux";

import Spinner from 'react-spinkit';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {isMobileOnly} from 'react-device-detect';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import ParkingcitSvg from '../svgIcons/ParkingCitIl.js'
import ProptaxSvg from '../svgIcons/PropTaxIl.js'
import BusinessLic from '../svgIcons/businessLic.js'
import RecreationSvg from '../svgIcons/RecreationIl.js'
import Utilitybill from '../svgIcons/utbIl.js';

import Img from "gatsby-image";
import { graphql, StaticQuery } from 'gatsby';
import Link, {navigate} from "gatsby-link";

import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  ser_template_card: {
    cursor: "pointer",
    width: "200px",
    textDecoration: "none",
    height: "200px",
    background: "#fff",
    margin: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    display: "flex",
    flexDirection: "column",
    borderTop: `1px solid #AB93FF`,
    boxShadow:
      "0px 3px 5px 0px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 2px 6px 1px rgba(0,0,0,0.06)"
  },
  ser_template_card_compact: {
    cursor: "pointer",
    textDecoration: "none",
    width: "160px",
    height: "200px",
    margin: theme.spacing.unit,
    display: "flex",
    position: "relative",
    flexDirection: "column",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: "1px",
      left: 40,
      height: "4px",
      width: "50%",
      background: `linear-gradient(bottom, #5627da 0%, #5627FF 65%, transparent 65%, transparent 100%)`,
      transform: `scaleX(0)`,
      transition: `transform 180ms ease-in-out`
    },
    "&:hover::after": {
      transform: `scaleX(1)`
    }
  },
  ser_template_card_img: {
    display: "flex",
    justifyContent: "center",
    minHeight: "80px",
    paddingBottom: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 3
  },
  ser_template_card_img_compact: {
    display: "flex",
    justifyContent: "center",
    minHeight: "80px",
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2
  },
  ser_template_card_content: {
    textAlign: "center",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: theme.spacing.unit,
    alignItems: "center"
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
          icon = (<ProptaxSvg style={{ width: '64px', height: '64px' }} />);
          mobIcon = (<ProptaxSvg style={{ width: '48px', height: '48px'}} />)
        }else if(lowerCaseName.indexOf('parking') !== -1){
          icon = (<ParkingcitSvg style={{ width: '112px', height: '64px'  }}/>)
          mobIcon = (<ParkingcitSvg style={{ width: '56px', height: '32px' }} />)
        }else if(lowerCaseName.indexOf('license') !== -1){
          icon = (<BusinessLic style={{ width: '80px', height: '64px'  }} />)
          mobIcon = (<BusinessLic style={{ width: '56px', height: '48px' }} />)
        }else if(lowerCaseName.indexOf('utility') !== -1 || lowerCaseName.indexOf('water') !== -1){
          icon = (<Utilitybill style={{ width: '64px', height: '64px' }} />)
          mobIcon = (<Utilitybill style={{ width: '48px', height: '48px'}} />)
        } else if (lowerCaseName.indexOf('recreation') !== -1 || lowerCaseName.indexOf('recreational') !== -1) {
          icon = (<RecreationSvg style={{ width: '78px', height: '64px'  }} />)
          mobIcon = (<RecreationSvg style={{ width: '48px', height: '32px' }} />)
        }   
    
   
        if (this.state.isMob){
            return (
              <div
                onClick={() => navigate(`/services/${slug}`)}
                style={{
                  background: "#fff",
                  margin: "8px",
                  borderTop: `1px solid #AB93FF`,
                  boxShadow:
                    "0px 3px 5px 0px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 2px 6px 1px rgba(0,0,0,0.06)",
                  padding: "16px",
                  "alignItems": 'center',
                  width: "300px",
                  display: "flex",
                  textDecoration: "none",
                  cursor: "pointer"
                }}
              >
                <div style={{width: '56px', height:'48px'}}>{mobIcon}</div>
                <ListItemText
                  primary={
                    <Typography
                      style={{ fontWeight: 500, color: "#5627FF" }}
                      variant="body1"
                    >
                      {name}
                    </Typography>
                  }
                />
              </div>
            );
        } else {
            return (<a className={compact ? classes.ser_template_card_compact : classes.ser_template_card} href={`/services/${slug}`}>
                <div className={compact ? classes.ser_template_card_img_compact : classes.ser_template_card_img}>
                                {icon}
                        </div>
                        
                    <div className={classes.ser_template_card_content}>
                    <Typography svariant="body2">
                    {name}
                    </Typography>
                    </div>

                </a>)
        }

        
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...state
    };
};

export default connect(mapStateToProps)(withStyles(styles)(ServiceTemplateCard));
