import React, { Component } from 'react';
import Card from './Card';
import Card2 from './Card2';

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const getTopic = gql`query GetTopic($id: ID!) {
    getTopic(id: $id) {
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
          player{
              id,
              user{
                  name
              }
          }
        }
        nextToken
      }
    }
  }
  `;

  const subscribeToTopicAnswers = gql`subscription SubscribeToTopicAnswers($topicId: String!) {
    subscribeToTopicAnswers(topicId: $topicId) {
      id
      text
      createdAt
      player {
        id
        projectId
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

class CardsField extends Component {
    subscription;
    componentDidMount(){
        this.subscription = this.props.subscribeToTopicAnswers();
    }

    componentDidUpdate(){
        window.$('.table-card').last().transition("fly up in");
    }

    componentWillUnmount(){
        console.log("UNMOUNT")

    }
    render(){
        return(
            <div className="playarea">
              <div className="scene">
                {this.props.answers.items.map((answer, index) => (
                    <div key={index}>
                        {/* <Card frontText={answer.text} backText={answer.player && answer.player.user.name} /> */}
                        <Card2 frontText={answer.text} backText={answer.player && answer.player.user.name} />

                    </div>
                ))}
              </div>
            </div>
        )
    }
}

export default graphql(
    getTopic,
    {
        options:({topicId:id}) =>({
            fetchPolicy: 'cache-and-network',
            variables: {id}
        }),
        props:(props) => ({
            answers: props.data.getTopic ? props.data.getTopic.answers : { items: [] },
            getTopic: props.data.getTopic,
            subscribeToTopicAnswers: () => props.data.subscribeToMore({
                document:subscribeToTopicAnswers,
                variables:{
                    topicId:props.ownProps.topicId,
                },
                updateQuery: (prev, { subscriptionData: { data: { subscribeToTopicAnswers } } }) => {
                    console.log(subscribeToTopicAnswers);
                    const res = {
                        ...prev,
                        getTopic: {
                            ...prev.getTopic,
                            answers: {
                                __typename: 'ModelAnswerConnection',
                                ...prev.getTopic.answers,
                                items: [
                                    ...prev.getTopic.answers.items.filter(a => a.id !== subscribeToTopicAnswers.id),
                                    subscribeToTopicAnswers,
                                ]
                            }
                        }
                      };
                    return res;             
                }
            }),
        })
    })(CardsField);
