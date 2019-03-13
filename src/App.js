import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from "react-router-dom";

import './App.css';
import NewProject from './Components/NewProject';
import PockerField from './Components/PockerField';
import PlayerField from './Components/PlayerField';

import { ApolloProvider } from "react-apollo";
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import { Rehydrated } from "aws-appsync-react";
import api_config from "./api-exports";

import Amplify from "aws-amplify";
import aws_config from "./aws-exports";
Amplify.configure(aws_config)


const client = new AWSAppSyncClient({
  url: aws_config.aws_appsync_graphqlEndpoint,
  region: aws_config.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: api_config.apiKey,
  },
  disableOffline:true
});

const App = () => (
  <Router>
    <div id="wrapper">
      <Route exact={true} path="/" component={NewProject} />
      <Route exact={true} path="/project/:id" component={PockerField} />
      <Route exact={true} path="/project/:id/player" component={PlayerField} />
      <Route path="/newProject" component={NewProject} />
    </div>
  </Router>
);

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
)

export default WithProvider;
