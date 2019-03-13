import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Cache } from 'aws-amplify';

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { compose } from 'react-apollo';
import { graphqlMutation } from 'aws-appsync-react'

import { listTopics } from '../graphql/queries';

import "./PlayerField.css"

const CreatePlayer = gql`mutation CreatePlayer($input: CreatePlayerInput!) {
    createPlayer(input: $input) {
        id
        projectId
        user{
            name
        }
    }
}`;

const CreateUser = gql`mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
  `;

const subscribeToProjectTopics = gql`subscription SubscribeToProjectTopics($projectId: String!) {
    subscribeToProjectTopics(projectId: $projectId) {
        id
        title
        description
        createdAt
        point
        projectId
    }
}`;

const getProject = gql`query GetProject($id: ID!) {
    getProject(id: $id) {
      id
      title
      password
      description
      limitCard
      topics(limit:100) {
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

  const CreateAnswer = gql`mutation CreateAnswer($input: CreateAnswerInput!) {
    createAnswer(input: $input) {
      id
      text
      createdAt
      player {
        id
        projectId
        user{
            name
        }
      }
      topicId
      topic {
        id
        title
        description
        createdAt
        point
        projectId
      }
    }
  }
  `;


const projectTopics = gql`query ListTopics(
    $id:ID!
  ) {
    listTopics(filter: {
        projectId:{
            eq:$id
        }},
        limit:100,
    ) {
      items {
        id
        title
        description
        createdAt
        point
        projectId
        project {
          id
          title
          password
          description
          limitCard
        }
        answers {
          items {
            id
            text
            createdAt
            topicId
          }
          nextToken
        }
      }
      nextToken
    }
  }
  `;

class PlayerField extends Component {
    constructor(props){
        super(props)

        const { id } = this.props.match.params;
        // if(id !== Cache.getItem("projectId")){
        //     Cache.clear()
        // }
        const raw = Cache.getItem(id)
        if(raw){
            const json = JSON.parse(raw);
            this.state ={
                playerId:json.playerId,
                playerName:json.playerName
            }
        }
        
    }

    state = { 
        title: '',
        name: Cache.getItem("name") ? Cache.getItem("name") : ""
    }
    onChange = (n) => (e) => {this.setState({ [n]: e.target.value }) }
    joinPlayer = async () => { 
        this.registUser()
    }

    subscription;
    componentDidMount = async() => {
        this.subscription = this.props.subscribeToTopics();  
    }

    componentDidUpdate(){

    }

    registUser = async () => {
        const { id } = this.props.match.params;
        const resUser = await this.props.createUser({ input: {name:this.state.name}}) 
        const { createUser } = resUser.data;
        if(createUser){
            const resPlayer = await this.props.createPlayer({input:{playerProjectId:id,playerUserId:createUser.id,projectId:id}})
            const { createPlayer } = resPlayer.data;
            if(createPlayer){
                const obj = {
                    playerId: createPlayer.id,
                    playerName: createPlayer.user.name,
                }
                Cache.setItem("name",createPlayer.user.name)
                Cache.setItem(id,JSON.stringify(obj))
                this.setState({
                    playerId:createPlayer.id,
                    playerName:createPlayer.user.name,
                    isRegistered:true,
                })
            }
        }
    }

    selectCard = () => (e) =>{
        const cards = document.getElementsByClassName('card');
        const max = cards.length;
        for(var i = 0; i < max; i++){
            const card = cards[i];
            card.classList.remove("selected")
        }

        e.target.classList.add("selected");

        this.setState({
            selectCard:e.target
        })
    }

    sendAnswerCard = async () =>{
        const txt = this.state.selectCard.innerText;
        const topicId = this.props.topics.items.slice(-1)[0].id;
        const res = await this.props.createAnswer({ 
            input: {
                text:txt,
                answerPlayerId:this.state.playerId,
                topicId:topicId,
                answerTopicId:topicId,
            }
        })
        const { createAnswer } = res.data;
        if(createAnswer){
            console.log(createAnswer)
            this.setState({
                selectCard: null,
            })
        }

    }

    render() {
        const plans = ["?","0","1/2","1","2","3","5","8","13","20","40","100","∞"]
        console.log(this.props);
        return(
        <div className="ui container">
            {this.state.playerName ? 
            <div className="main">
                <div className="field">
                <div id="topic-header" className="ui blue piled segment">
                    <div className="ui blue ribbon label">
                        {(this.props.topics.items.length > 0) ? "Q"+this.props.topics.items.length.toString():""}                  
                    </div>
                    <h2 className="ui center aligned header">
                        {(this.props.topics.items.length > 0) ? this.props.topics.items.slice(-1)[0].title : "お待ちください"}
                    </h2>
                </div>
                <div className="ui playerfield">
                    {plans.map((plan,index) => (
                    <h1 key={index} className="ui card" onClick={this.selectCard("t")}>
                        {plan}
                    </h1>
                    ))}
                </div>
                </div>
                <div className="ui tag labels container">
                    <div className="ui label">
                        <i className="user icon"></i>
                        {this.state.playerName}
                    </div>
                    {this.props.getProject &&
                    <div className="ui teal label">
                        {this.props.getProject.title}
                    </div>
                    }
                </div>
                {this.state.selectCard ?
                    <button id="send-card" onClick={this.sendAnswerCard} className={"ui huge orange bottom attached label button fluid"}>SEND</button>
                    :
                    <button id="send-card" className={"ui huge orange bottom attached label button fluid disabled"}>SEND</button>
                }
            </div>
            :
            <div className="userform">
                <div className="ui form">
                    <div className="field">
                        <label>プレイヤー名</label>
                        <input type="text" value={this.state.name} onChange={this.onChange("name")} placeholder='Player name' />
                    </div>
                    <button className="ui teal button" onClick={this.joinPlayer}>参加する</button>
                </div>
            </div>
            }
        </div>            
        )
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
            topics: props.data.getProject ? props.data.getProject.topics : { items: [] },
            getProject: props.data.getProject,
            subscribeToTopics: () => props.data.subscribeToMore({
              document:subscribeToProjectTopics,
              variables:{
                projectId:props.ownProps.match.params.id
              },
              updateQuery: (prev, { subscriptionData: { data: { subscribeToProjectTopics } } }) => {
                window.$("#topic-header").transition("jiggle");

                const res = {
                  ...prev,
                  getProject: {
                      ...prev.getProject,
                      topics: {
                          __typename: 'ModelTopicConnection',
                          ...prev.getProject.topics,
                          items: [
                              ...prev.getProject.topics.items.filter(t => t.id !== subscribeToProjectTopics.id),
                              subscribeToProjectTopics,
                          ]
                      }
                  }
                };
                console.log(res)
                return res;          
              },
            }),
          }),
    }),
    graphqlMutation(CreateUser,null,"User"),
    graphqlMutation(CreatePlayer,null,"Player"),
    graphqlMutation(CreateAnswer,null,"Answer"),
  )(PlayerField)

