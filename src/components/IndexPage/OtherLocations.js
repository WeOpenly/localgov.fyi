import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {Link} from 'gatsby';
import {isMobileOnly} from 'react-device-detect';
import { fade } from "@material-ui/core/styles/colorManipulator";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import OrgLite from '../Organization/Lite';
import Typography from '@material-ui/core/Typography';
import ContentLoader from "react-content-loader"
import Public from '@material-ui/icons/Public';
const windowGlobal = typeof window !== 'undefined' && window


const SuggestedLoader = () => (
  <ContentLoader
    height={200}
    width={400}
    speed={100}
    primaryColor="#f3f3f3"
    secondaryColor="#d5d9f3">
    <rect x="11" y="75" rx="0" ry="0" width="166" height="61" />
    <rect x="8" y="12" rx="0" ry="0" width="304" height="19" />
  </ContentLoader>
)

const styles = theme => ({
  index_otherLinkItem_mob: {
    display: "flex",
    flex: "1 1 100%",
    border: "none",
    margin: theme.spacing.unit,
    color: "#4F1FFF",
    letterSpacing: "2px",
    justifyContent: "center"
  },
  ser_org_list: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  index_otherLinkItem: {
    display: "flex",
    flex: "1 1 30%",
    border: "none",
    margin: theme.spacing.unit,
    color: fade("#000", 0.75),
    letterSpacing: "4px",
    justifyContent: "center"
  },
  ser_org_list_header_container_mob: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: theme.spacing.unit * 2
  },
  ser_org_list_header_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: theme.spacing.unit * 6
  },
  ser_org_list_header_mob: {
    fontSize: "16px"
  },
  ser_org_list_container: {
    alignItems: "center",
    display: "flex",
    minHeight: "720px",
    marginTop: theme.spacing.unit * 2,
    justifyContent: "center",
    flexDirection: "column",
    flexWrap: "wrap"
  }
});

class OtherLocationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      items: [
        {
          name: 'Atlanta',
          orgLink : 'https://evergov.com/organization/usa/georgia-state/fulton-county/atlanta-city/ '
        },
        {
          "name": "Austin",
          "orgLink": "https://evergov.com/organization/usa/texas-state/travis-county/austin-city/"
        },
        {
          "name": "Boston",
          "orgLink": "https://evergov.com/organization/usa/massachusetts-state/suffolk-county/boston-city/"
        },
        {
          "name": "Chicago",
          "orgLink": "https://evergov.com/organization/usa/illinois-state/cook-county/chicago-city/"
        },
        {
          "name": "Columbus",
          "orgLink": "https://evergov.com/organization/usa/ohio-state/franklin-county/columbus-city/"
        },
        {
          "name": "Dallas",
          "orgLink": "https://evergov.com/organization/usa/texas-state/dallas-county/dallas-city/"
        },
        {
          "name": "Detroit",
          "orgLink": "https://evergov.com/organization/usa/michigan-state/wayne-county/detroit-city/"
        },
        {
          "name": "El Paso",
          "orgLink": "https://evergov.com/organization/usa/texas-state/el-paso-county/el-paso-city/"
        },
        {
          "name": "Fort Worth",
          "orgLink": "https://evergov.com/organization/usa/texas-state/tarrant-county/fort-worth-city/"
        },
        {
          name: 'Houston',
          orgLink: 'https://evergov.com/organization/usa/texas-state/harris-county/houston-city/'
        },
        {
          "name": "Jacksonville",
          "orgLink": "https://evergov.com/organization/usa/florida-state/duval-county/jacksonville-city/"
        },
        {
          "name": "Jersey City",
          "orgLink": "https://evergov.com/organization/usa/new-jersey-state/hudson-county/jersey-city-city/"
        },
        {
          "name": "Indianapolis",
          "orgLink": "https://evergov.com/organization/usa/indiana-state/marion-county/indianapolis-city/"
        },
        {
          "name": "Kansas City",
          "orgLink": "https://evergov.com/organization/usa/missouri-state/platte-county/kansas-city-city/"
        },
        {
          name: 'Las Vegas',
orgLink : 'https://evergov.com/organization/usa/nevada-state/clark-county/las-vegas-city/'
        },
        
        {
          "name": "Los Angeles",
          "orgLink": "https://evergov.com/organization/usa/california-state/los-angeles-county/los-angeles-city/"
        },
        {
          "name": "Milwaukee",
          "orgLink": "https://evergov.com/organization/usa/wisconsin-state/milwaukee-county/milwaukee-city/"
        },
        {
          "name": "Nashville",
          "orgLink": "https://evergov.com/organization/usa/tennessee-state/davidson-county/nashville-city/"
        },
        {
          name: 'New York',
          orgLink: 'https://evergov.com/organization/usa/new-york-state/bronx-county/new-york-city/'
        },
        {
          "name": "Oakland",
          "orgLink": "https://evergov.com/organization/usa/california-state/alameda-county/oakland-city/"
        },
        {
          "name": "Oklahoma",
          "orgLink": "https://evergov.com/organization/usa/oklahoma-state/oklahoma-county/oklahoma-city-city/"
        },
        {
          "name": "Portland",
          "orgLink": "https://evergov.com/organization/usa/oregon-state/multnomah-county/portland-city/"
        },
        {
          "name": "Phoenix",
          "orgLink": "https://evergov.com/organization/usa/arizona-state/maricopa-county/phoenix-city/"
        },
        {
          name: 'Philadelphia',
orgLink : 'https://evergov.com/organization/usa/pennsylvania-state/philadelphia-county/'
        },
        {
          "name": "Pittsburgh",
          "orgLink": "https://evergov.com/organization/usa/pennsylvania-state/allegheny-county/pittsburgh-city/"
        },
        {
          "name": "San Antonio",
          "orgLink": "https://evergov.com/organization/usa/texas-state/bexar-county/san-antonio-city/"
        },
        {
          name: 'San Francisco',
          orgLink: 
          "https://evergov.com/organization/usa/california-state/san-francisco-county/"
        },
        {
          "name": "San Diego",
          "orgLink": "https://evergov.com/organization/usa/california-state/san-diego-county/san-diego-city/"
        },
        {
          name: 'San Jose',
          orgLink: 'https://evergov.com/organization/usa/california-state/santa-clara-county/san-jose-city/'
        },
        {
          "name": "Seattle",
          "orgLink": "https://evergov.com/organization/usa/washington-state/king-county/seattle-city/"
        },
        {
          "name": "Tucson",
          "orgLink": "https://evergov.com/organization/usa/arizona-state/pima-county/tucson-city/"
        }
      ]
    } 
  }

  componentDidMount() {
    this.setState({ isMobile: isMobileOnly });
  }


  render() {
    const {classes } = this.props;

       const otherLinks = this.state.items.slice(0, 24).map((item, idx) => {
         return (<Button key={`other-link-${idx}`} variant="outlined"  href={`${item.orgLink}`} className={this.state.isMobile ? classes.index_otherLinkItem_mob : classes.index_otherLinkItem}>
         {item.name}
      </Button>);
      });

      // otherLinks.push((<Typography variant="body2" style={{ padding: '16px' }}>
      //   <Link to={`locations`} style={{ color: '#5627FF'}} >
      //     More Locations
      //     </Link>
      // </Typography>
      // ))
      return (
        <Grid container>
          <Grid item sm={1} />

          <Grid item sm={10} className={classes.ser_org_list_container}>
            <div
              className={
                this.state.isMobile
                  ? classes.ser_org_list_header_container_mob
                  : classes.ser_org_list_header_container
              }
            >
              <Public
                style={{
                  fontSize: "14",
                  color: "#4F1FFF",
                  marginRight: "4px"
                }}
              />
              <Typography
                variant="title"
                className={
                  this.state.isMobile
                    ? classes.ser_org_list_header_mob
                    : classes.ser_org_list_header
                }
              >
                Discover Evergov
              </Typography>
            </div>
            <div className={classes.ser_org_list}>{otherLinks}</div>
            <div className={classes.other_locs_more}>
              <Button
                variant="outlined"
                href={"/locations"}
                className={classes.index_otherLinkItem}
              >
                Discover more
              </Button>
            </div>
          </Grid>
          <Grid item sm={1} />
        </Grid>
      );
    } 
  }


OtherLocationList.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(OtherLocationList);