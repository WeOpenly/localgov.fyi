import {withStyles} from '@material-ui/core/styles';
import {connect} from "react-redux";
import React from 'react';
import PropTypes from 'prop-types';
import {navigate} from '@reach/router'

import Link from 'gatsby-link';
import Helmet from "react-helmet";
import Spinner from 'react-spinkit';
import {isMobileOnly} from 'react-device-detect';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MoodBad from '@material-ui/icons/MoodBad';

import Sections from '../../../components/Profile/Sections';
import UserDetailCard from '../../../components/Profile/UserDetailCard';
import UserAccount from '../../../components/Profile/UserAccount';
import FaveOrgs from '../../../components/Profile/FaveOrgs';
import FaveServices from '../../../components/Profile/FaveServices';

import HeaderWithSearch from '../../../components/HeaderWithSearch';

import {MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from '../../../getPageContext';

import withRoot from '../../../withRoot';
import {trackView} from "../../../components/common/tracking";
import {updateInput, fetchSearchResults} from '../../../components/Search/actions';

import {getCurrentUser, isLoggedIn} from '../../../components/Account/Auth'
import {getUserSavedItems} from '../../../components/Profile/actions'


const styles = theme => ({
    app_profile_root: {
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0
    },
    app_profile_rootMobile: {
        width: 'auto',
        height: '100%',
        marginLeft: theme.spacing.unit * -2,
        marginRight: theme.spacing.unit * -2,
        padding: 0
    },
    app_profile_container: {
        paddingTop: theme.spacing.unit * 8
    },
    app_profile_grid: {

    },
    app_profile_grid_item: {

    },
});

class Profile extends React.Component {
    state = {
        activeSection: 'user_account'
    }

    onSelectSection = (activeSection) => {
        this.setState({activeSection})
    }
    
    
    componentDidMount = () => {
        const {dispatch} = this.props;
        dispatch(getUserSavedItems());
    }

    render() {
        const {classes} = this.props;
        const {orgsFullDetails, sersFullDetails} = this.props.profile;
        const {activeSection} = this.state;
        this.muiPageContext = getPageContext();
        const user = getCurrentUser()
        
        if (!isLoggedIn()){
            navigate('/?login=true')
        }

        let activeSectionComponent = (<UserAccount active={activeSection}/>)
        if (activeSection === 'organizations') {
            activeSectionComponent = (<FaveOrgs orgs={orgsFullDetails} active={activeSection}/>)
        } else if (activeSection === 'services') {
            activeSectionComponent = (<FaveServices sers={sersFullDetails} active={activeSection}/>)
        }
         
return (
            <div
                className={!isMobileOnly
                ? classes.app_profile_root
                : classes.app_profile_rootMobile}>
                <Helmet title={`Localgov.fyi profile ${user.email}`}/>
                <HeaderWithSearch location={this.props.location}/>
                <Grid container spacing={0} className={classes.app_profile_container}>
                    <Grid item xs={1} md={1}/>
                    <Grid className='app_profile_grid_item' item xs={10} md={10}>
                        <Grid className='app_profile_grid' container spacing={8}>
                            <Grid className='app_profile_grid_item' item xs={3}>
                                <UserDetailCard user={user}/>
                                <Sections onSelectSection={this.onSelectSection} active={activeSection}/>
                            </Grid>

                            <Grid className='app_profile_grid_item' item xs={8}>
                                {activeSectionComponent}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={1} md={1}/>
                </Grid>
            </div>
)

    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...state
    };
};

export default connect(mapStateToProps)(withRoot(withStyles(styles)(Profile)));