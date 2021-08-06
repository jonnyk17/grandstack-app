import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { Auth0Provider } from '@auth0/auth0-react';


const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI || '/graphql',
  cache: new InMemoryCache(),
})

const Main = () => (
  <ApolloProvider client={client}>
    <Auth0Provider
      domain="dev-jxxen9p2.us.auth0.com"
      clientId="s0lnhSpSrLXkQ5oYTfNisNkS6tjtoSt0"
      redirectUri={"http://localhost:3000/callback"}
    >
      <App />
    </Auth0Provider>
  </ApolloProvider>
)

ReactDOM.render(<Main />, document.getElementById('root'))
registerServiceWorker()
