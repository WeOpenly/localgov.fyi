import React from 'react';
import {Router} from "@reach/router";
import Profile from './profile';
import Callback from './auth/callback';
import {withStyles} from '@material-ui/core/styles';

import {getCurrentUser, isLoggedIn} from '../../components/Account/Auth'

const windowGlobal = typeof window !== 'undefined'
    ? window
    : null

const styles = theme => ({})

class Root extends React.Component {
    state = {
        activeSection: 'user_account'
    }

    onSelectSection = (activeSection) => {
        this.setState({activeSection})
    }

    render() {
        // if (!windowGlobal) {
        //     return null
        // }
        
        // const {pathname} = windowGlobal.location;
        // console.log(pathname);
        return (<Router>
            <Profile path="/app/profile/" />
            <Callback path="/app/auth/callback/" />
        </Router>)
    }
}

export default withStyles(styles)(Root);