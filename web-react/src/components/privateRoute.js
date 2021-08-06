import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery, gql } from '@apollo/client';

export const CHECK_USER = gql`
    query {
        users{
            id
        }
    }
`
export const PrivateRoute = (props) => {
    const { user, isAuthenticated } = useAuth0()
    const { pathname } = useLocation()
    var registered = false;
    const { loading, error, data } = useQuery(CHECK_USER)
    if (error) return <p>Error</p>
    if (loading) return <p>Loading</p>
    if (data.users.find((e) =>
        e.id === user.sub
    )) {
        registered = true
    }
    if (!isAuthenticated) return (
        <Redirect to={"/"} />
    )
    else if (isAuthenticated && !registered && pathname !== "/register") return (
        <Redirect to={"/register"} />
    )

    return <Route {...props} />
}
