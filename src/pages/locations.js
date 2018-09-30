import React, { Component, Fragment } from 'react';
import Link from 'gatsby-link';
import { isMobileOnly } from 'react-device-detect';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import withRoot from '../withRoot';
import HeaderWithSearch from '../components/HeaderWithSearch';

const styles = theme => ({
  titleWrapper: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 2,
  },
  title:{
    marginBottom: theme.spacing.unit * 2,
  },
  wrapper: {
    height: 4000,
  },
  wrapperMobile: {
    height: 1000,
  },
  section: {
    marginBottom: theme.spacing.unit,
  },
  link: {
    textDecoration: 'none',
  },
  heading: {
    fontWeight: 600,
  },
  listItem: {
    display: 'flex',
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
  },
});

const locations = [
  {
    id: 'e669d17c-6eef-4634-b0a2-9339dfea8527',
    name: 'Alabama',
    children: [],
  },
  {
    id: '468a2ab2-a602-4952-af60-f4a93f120ba3',
    name: 'Alaska',
    children: [],
  },
  {
    name: 'Arizona',
    children: [],
  },
  {
    name: 'Arkansas',
    children: [],
  },
  {
    id: '01d06777-1cf4-4fcc-a6cf-aadefbe7512d',
    name: 'California',
    children: [
      {
        id: 'a0cb45fa-3eab-42a0-b3a3-b41acebf3748',
        name: 'Palo Alto',
      },
      {
        id: '49ab4440-1176-4791-a7cf-1e27a756488d',
        name: 'San Francisco',
      },
      {
        id: '64398076-1dd4-4c06-bba0-f46bf893b2ae',
        name: 'San Mateo',
      },
      {
        id: '3d6dc5fd-650b-4900-8a00-d600cede6525',
        name: 'Santa Clara',
      }
    ],
  },
  {
    id: 'b77372d1-e2af-4621-a1df-e5a64f047cb8',
    name: 'Colorado',
    children: [
      {
        id: '3b710e10-b7a0-428a-9978-096a88324ef5',
        name: 'Boulder',
      }
    ],
  },
  {
    name: 'Connecticut',
    children: [],
  },
  {
    name: 'Delaware',
    children: [],
  },
  {
    name: 'Florida',
    children: [],
  },
  {
    name: 'Georgia',
    children: [],
  },
  {
    name: 'Hawaii',
    children: [],
  },
  {
    name: 'Idaho',
    children: [],
  },
  {
    name: 'Illinois',
    children: [],
  },
  {
    name: 'Indiana',
    children: [],
  },
  {
    name: 'Iowa',
    children: [],
  },
  {
    name: 'Kansas',
    children: [],
  },
  {
    name: 'Kentucky',
    children: [],
  },
  {
    id: '7c4f262d-4850-47b6-a48e-3e33ad372393',
    name: 'Louisiana',
    children: [
      {
        id: '17ecfd9d-b18b-4c30-848b-ae2d74a8335e',
        name: 'Baton Rouge',
      },
    ],
  },
  {
    name: 'Maine',
    children: [],
  },
  {
    name: 'Maryland',
    children: [],
  },
  {
    id: 'bdad4909-f05e-49d6-b4e2-762a837c9c7c',
    name: 'Massachusetts',
    children: [
      {
        id: '76ab3776-fe3d-4331-8df6-75dd37ae5c25',
        name: 'Boston',
      },
      {
        id: '0224ad49-a262-4f4b-8b93-c3f94f0023ca',
        name: 'Worcester',
      },
    ],
  },
  {
    name: 'Michigan',
    children: [],
  },
  {
    name: 'Minnesota',
    children: [],
  },
  {
    name: 'Mississippi',
    children: [],
  },
  {
    name: 'Missouri',
    children: [],
  },
  {
    name: 'Montana',
    children: [],
  },
  {
    name: 'Nebraska',
    children: [],
  },
  {
    name: 'Nevada',
    children: [],
  },
  {
    name: 'New Hampshire',
    children: [],
  },
  {
    name: 'New Jersey',
    children: [],
  },
  {
    name: 'New Mexico',
    children: [],
  },
  {
    id: '5914e045-3a8a-4322-ade5-6a3b8d3157a7',
    name: 'New York',
    children: [
      {
        id: '2c3e6f85-25ee-420d-a31b-25662e2e6a2e',
        name: 'New York City'
      },
    ],
  },
  {
    name: 'North Carolina',
    children: [],
  },
  {
    name: 'North Dakota',
    children: [],
  },
  {
    name: 'Ohio',
    children: [],
  },
  {
    name: 'Oklahoma',
    children: [],
  },
  {
    name: 'Oregon',
    children: [],
  },
  {
    name: 'Pennsylvania',
    children: [],
  },
  {
    name: 'Rhode Island',
    children: [],
  },
  {
    name: 'South Carolina',
    children: [],
  },
  {
    name: 'South Dakota',
    children: [],
  },
  {
    name: 'Tennessee',
    children: [],
  },
  {
    id: 'd7eeb494-5f80-4c69-b0f4-548baa83c34d',
    name: 'Texas',
    children: [
      {
        id: 'f212a1f8-d95e-4448-a6c7-659a4aa88934',
        name: 'Houston',
      },
      {
        id: '8f7e8e39-b333-41ef-b874-052bee6ec8a8',
        name: 'Irving',
      },
    ],
  },
  {
    name: 'Utah',
    children: [],
  },
  {
    name: 'Vermont',
    children: [],
  },
  {
    name: 'Virginia',
    children: [],
  },
  {
    name: 'Washington',
    children: [],
  },
  {
    name: 'West Virginia',
    children: [],
  },
  {
    name: 'Wisconsin',
    children: [],
  },
  {
    name: 'Wyoming',
    children: [],
  },
];

class Locations extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <HeaderWithSearch />
        <Grid container>
          <Grid item md={2} />
          <Grid item md={8} className={classes.titleWrapper}>
            <Typography variant="display1" color="textPrimary" className={classes.title}>More places on Localgov</Typography>
            <Divider />
          </Grid>
          <Grid item md={2} />
          <Grid item md={2} />
          <Grid item md={8} container direction="column" align="center" className={isMobileOnly ? classes.wrapperMobile : classes.wrapper}>
            {this.props.data.orgs.edges.map(loc => (
              <Grid item className={classes.section}>
                <Link to={`/organization/${loc.node.details.id}/`} className={classes.link}>
                  <Typography variant="body1" color="textPrimary" className={classes.heading}>
                    {loc.node.details.name}
                  </Typography>
                </Link>
                {/* {state.children.map(city => (
                  <Link to={`/organization/${city.id}/`} className={classes.link}>
                    <Typography variant="body1" color="primary">
                      {city.name}
                    </Typography>
                  </Link>
                ))} */}
              </Grid>
            ))}
          </Grid>
          <Grid item md={2} />
        </Grid>
      </Fragment>
    );
  }
}

export const query = graphql `
query orgsQuery  {
orgs : allOrgsJson (sort : {
  fields: details___name
}) {
    edges {
      node {
        id
        details {id name}
      }
    }
  }
}
`;


export default withRoot(withStyles(styles)(Locations));
