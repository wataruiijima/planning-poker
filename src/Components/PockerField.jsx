import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Card from './Card';
import CardsField from './CardsField';

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { compose } from 'redux';
import { graphqlMutation } from 'aws-appsync-react'

import "./PockerField.css"

const subscribeToProjectPlayers = gql`subscription SubscribeToProjectPlayers($projectId: String!) {
  subscribeToProjectPlayers(projectId: $projectId) {
    id
    projectId
    user {
      id
      name
    }
  }
}`

const getProject = gql`query GetProject($id: ID!) {
  getProject(id: $id) {
    id
    title
    password
    description
    limitCard
    topics {
      items {
        id
        title
        description
        createdAt
        point
        projectId
      }
      nextToken
    }
    players {
      items {
        id
        projectId
        user{
          name
        }
      }
      nextToken
    }
    template {
      id
      type
    }
  }
}
`;

const CreateTopic = gql`mutation CreateTopic($input: CreateTopicInput!) {
  createTopic(input: $input) {
    id
    title
    description
    createdAt
    point
    projectId
  }
}
`;

const onUpdateProject = gql`
subscription OnUpdateProject {
  onUpdateProject {
    id
    players {
      items {
        id
        user{
          name
        }
      }
    }
  }
}
`;

class PockerField extends Component {
    constructor(props){
      super(props)
      }
    state = { topicId:"",topicTitle:""}

    subscription;
    componentDidMount(){
      window.$('#qrcode').qrcode({width: 75, height: 75, text: window.location.href+"/player"});
      window.$('#qrcode-big').qrcode({width: 500, height: 500, text: window.location.href+"/player"});

      this.subscription = this.props.subscribeToPlayers();
    }
  
    componentWillUnmount(){
    }
  
    componentDidUpdate(){
      // window.$('.card:last')
      //  .transition('fly left');
    }

    sendTopic = async () => {
      const { topicTitle } = this.state;
      if(!topicTitle){return;}
      const { id } = this.props.match.params;
      const res = await this.props.createTopic({input:{title:topicTitle,projectId:id,topicProjectId:id}})
      const { createTopic } = res.data;
      if(createTopic){
        this.setState({
          topicId: createTopic.id
        })
      }
    }

    handleChange = (n) => (e) => {
      this.setState({ [n]: e.target.value }) 
    }
  
    handleOpen = () => {
      this.flipCards(true)
    }
  
    handleClose = () => {
      this.flipCards(false);
    }
  
    handleNext = () => {
      const self = this;
      window.$('.table-card').transition({
        animation:"fly left out",
        onComplete: function(){
          self.setState({
            topicId:"",
            topicTitle:""
          })    
        }
      });

    }
  
    handleRetry = () => {
      this.flipCards(false);
      this.removeCards();
    }
  
    handleFinish = () => {
    }

    showQRCode = () => {
      window.$('.ui.modal').modal('show');
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
      this.setState({
        count:0
      })
    }
    
    render() {

      const colors = ["blue","teal","yellow","pink","green","orange","brown","purple","olive","violet"]
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
            </div>
            <div className="bar">
              <div onClick={this.showQRCode} id="qrcode"></div>
              <div className="ui input massive action">
                <input type="text" value={this.state.topicTitle} placeholder="お題を入力" onChange={this.handleChange("topicTitle")}/>
                <button className="ui green large button" onClick={this.sendTopic}>              
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
            {this.state.topicId &&
              <CardsField topicId={this.state.topicId} />
            }
            <div className="userarea">
            {this.props.players.items.map((player, index) => (
                <div key={index} className={"user ui label "+colors[parseInt(index.toString().substring(index.toString().length -1,index.toString().length))]}>
                <i className={"user icon "}></i>{player.user.name}
                </div>
            ))}
            </div>
            <div className="ui modal">
              <div id="qrcode-big"></div>
            </div>
        </div>
      );
    }
  }

export default compose(
  graphql(
    getProject, 
    {
    options: ({match: {params:{id}}}) => ({
      variables: { id },
      fetchPolicy: 'cache-and-network'
    }),
    props: (props) => ({
      players: props.data.getProject ? props.data.getProject.players : { items: [] },
      getProject: props.data.getProject,
      subscribeToPlayers: () => props.data.subscribeToMore({
        document:subscribeToProjectPlayers,
        variables:{
          projectId:props.ownProps.match.params.id
        },
        updateQuery: (prev, { subscriptionData: { data: { subscribeToProjectPlayers } } }) => {
          const res = {
            ...prev,
            getProject: {
                ...prev.getProject,
                players: {
                    __typename: 'ModelPlayerConnection',
                    ...prev.getProject.players,
                    items: [
                        ...prev.getProject.players.items.filter(p => p.id !== subscribeToProjectPlayers.id),
                        subscribeToProjectPlayers,
                    ]
                }
            }
          };
          return res;          
        },
      }),
    }),
  }),
  graphqlMutation(CreateTopic,null,"Topic")
  )(PockerField)