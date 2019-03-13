import React, { Component } from "react";
import { Link } from "react-router-dom";
import { graphql, compose, withApollo } from "react-apollo";
import gql from "graphql-tag";

import { listProjects } from "./graphql/queries";

const allProjects = `
  query {
    listProjects {
      items {
        id,title
      }
    }
  }
`;

class AllProjects extends Component {
    componentDidMount(){
    }

    render() {
        console.log(this.props)
        return(
            <div></div>
        )
    }
}

export default withApollo(compose(
    graphql(
        gql(allProjects),
        {
            options: {
                fetchPolicy: 'cache-first',
            },
            props: ({ data: { listProjects = { items: [] } } }) => ({
                projects: listProjects.items
            })
        }
    )
)(AllProjects));