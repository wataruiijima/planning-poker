import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from "react-router-dom";

import './App.css';
import Card from './Components/Card';
import AllProjects from './AllProjects';
import NewProject from './Components/NewProject';
import PockerField from './Components/PockerField';
import PlayerField from './Components/PlayerField';

import { ApolloProvider } from "react-apollo";
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import { Rehydrated } from "aws-appsync-react";

import Amplify from "aws-amplify";
import aws_config from "./aws-exports";
Amplify.configure(aws_config);


const client = new AWSAppSyncClient({
  url: aws_config.aws_appsync_graphqlEndpoint,
  region: aws_config.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: aws_config.aws_appsync_apiKey,
  },
  disableOffline:true
});

class Home extends Component {
  constructor(props){
    super(props)

    this.state = {
      cards:[],
      count:10
    }

    this.addCard = this.addCard.bind(this)
  }

  componentDidMount(){
    

    this.interval = setInterval(this.addCard, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  componentDidUpdate(){
    console.log("update")
    // window.$('.card:last')
    //  .transition('fly left');
  }

  addCard(){
    var date = new Date() ;
    var a = date.getTime() ;
    const card = <Card key={a} frontText="FRONT" backText="BACK" />
    this.setState({
        cards:[...this.state.cards,card]      
    })
  }

  handleOpen = () => {
    this.flipCards(true)
  }

  handleClose = () => {
    this.flipCards(false);
  }

  handleNext = () => {
    this.flipCards(false);
  }

  handleRetry = () => {
    this.flipCards(false);
    this.removeCards();
  }

  handleFinish = () => {
  }

  flipCards(open = true){
    const cards = document.getElementsByClassName('table-card');
    const max = cards.length;
    for(var i = 0; i < max; i++){
      const card = cards[i];
      if(open){
        card.classList.add('is-flipped');
      }
      else{
        card.classList.remove('is-flipped');
      }
    }    
  }

  removeCards(){
    // const cards = document.getElementsByClassName('card');
    // const max = cards.length;
    // for(var i = 0; i < max; i++){
    //   cards[i].remove();
    // }
    this.setState({
      count:0
    })
  }
  
  render() {
    if(this.state.cards.length  > 2){
      clearInterval(this.interval);     
    }

    return (
        <div className="App">
          <div className="control-buttons">
            <div className="ui buttons left floated">
              <button className="huge ui green button" onClick={this.handleOpen}>OPEN</button>          
              <button className="huge ui button" onClick={this.handleClose}>CLOSE</button>                 
            </div>
            <div className="ui buttons right floated">
              <button className="huge ui yellow button" onClick={this.handleRetry}>
                <i className="undo icon"></i>
                RETRY
              </button>          
              <button className="huge ui blue button" onClick={this.handleNext}>
                NEXT
                <i className="chevron right icon"></i>
              </button>          
            </div>
            {/* <div className="ui buttons right floated">
              <button className="huge ui black button" onClick={this.handleFinish}>FINISH</button>   
            </div> */}
          </div>
          {/* <div className="titlebar ui transparent input"> */}
          <div className="bar">
            <div className="ui input">
              <input type="text" placeholder="お題を入力" />
              <button className="ui green large button">              
              <i className="paper plane icon"></i>
                決定
              </button>
            </div>
            <div className="right floated">
              <button className="ui black button" onClick={this.handleFinish}>
                <i className="check icon"></i>
                FINISH
              </button>
            </div>
          </div>
          <div className="playarea">
            <div className="scene">
              <Card frontText="物による😆" backText="IIJIMA"/>
              {this.state.cards}
            </div>
          </div>
          <h1><Link to='/newProject'>NEW</Link></h1>

      </div>
    );
  }
}

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
