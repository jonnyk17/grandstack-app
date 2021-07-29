import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import {Redirect } from 'react-router-dom'
import { useQuery, gql } from "@apollo/client";
const GET_USER = gql`
    query Query($usersWhere: UserWhere) {
  users(where: $usersWhere) {
    displayName
  }
}
`
export default function callback(){
    const {user, isLoading}=useAuth0();
    
    if (isLoading) return <p>Loading</p>
    const{loading, data, error}=useQuery(GET_USER, {
        variables:{
            "usersWhere": {
                "id": user.sub
              }
        }
    })
    if (error) return <p>Error</p>
    if (loading) return <p>Loading</p>
    
    if(data.users.length>0){
        return (
            <Redirect
                    to={{
                        pathname:"/",
                        
                    }} 
                    />

        )
    }
    else{
        return (
                
             <Redirect
                to={{
                    pathname:"/register",
                    }} 
            />

        )
    }


}