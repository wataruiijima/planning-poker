import React, { Component } from "react";
import { Link } from "react-router-dom";

import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { graphqlMutation } from 'aws-appsync-react'

const allProjects = gql`
  query listProjects{
    listProjects(limit:20) {
      items {
        id,title
      }
    }
  }
`;

const CreateProject = gql`
    mutation createProject($input: CreateProjectInput!) {
        createProject(
            input: $input
        ) {
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
              }
              nextToken
            }
            players {
              items {
                id
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

class NewProject extends Component {
    state = { title: '' }
    onChange = (n) => (e) => { this.setState({ [n]: e.target.value }) }
    addProject = () => this.props.createProject({ input: {title:this.state.title,description:this.state.description ? this.state.description : null} })
    render() {
        console.log(this.state);
        console.log(this.props);
        return (
          <div className="ui container">
            <div className="ui form">
              <div className="field">
                <label>プロジェクト名</label>
                <input type="text" onChange={this.onChange("title")} placeholder='Project name' />
              </div>
              <div className="field">
                <label>プロジェクト詳細</label>
                <input type="text" onChange={this.onChange("description")} placeholder="Project description" />
              </div>
              <button className="ui teal button" onClick={this.addProject}>Add Project</button>
            </div>
              {
                this.props.projects.map((project, index) => (
                <div key={index}>
                  <h2>{project.title}</h2>
                  <Link to={"/project/"+project.id}>{project.id}</Link>
                </div>
                ))
              }
          </div>
        )
    }
}

export default compose(
    graphql(allProjects, {
      options: {
        fetchPolicy: 'cache-and-network'
      },
      props: props => ({
        projects: props.data.listProjects ? props.data.listProjects.items : []
      })
    }),
    graphqlMutation(CreateProject,allProjects,"Project")
  )(NewProject)