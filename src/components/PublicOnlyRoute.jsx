import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import { AuthContext } from '../contexts/auth'

export default function PublicOnlyRoute({component: Component, ...rest}) {
    console.log({rest})
    const {user} = useContext(AuthContext)
    if (user) {
        return (
            <Redirect to="/" />
        )
    } else {
        return (
            <Route component={Component} {...rest} />
        )
    }
}
