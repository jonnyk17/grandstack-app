
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// import { useQuery, gql } from '@apollo/client';
// import { Link } from 'react-router-dom'
// const USER_EXIST = gql`
//   query Query($usersWhere: UserWhere) {
//   users(where: $usersWhere) {
//     userName
//   }
// }
//`
const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
 
  
  return (
    !isAuthenticated && (
      <button type="button" className="btn" onClick={loginWithRedirect}>
        Log In
      </button>
    )
  )
}

export default LoginButton