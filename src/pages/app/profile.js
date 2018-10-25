import React from 'react'
import {Link} from 'gatsby'
import {navigate} from '@reach/router'
import {getCurrentUser, isLoggedIn} from '../../components/Account/Auth'

const Profile = () => {
    const user = getCurrentUser()
    if(!isLoggedIn){
        navigate('/?login=true')
    }
    return (
        <div>
            <h1>Profile Details</h1>
            <p>Email: {user.email}</p>
            <p>picture: {user.picture}</p>
        </div>
    )
}

export default Profile