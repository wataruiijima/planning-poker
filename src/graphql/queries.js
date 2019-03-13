// eslint-disable
// this is an auto generated file. This will be overwritten

export const getProject = `query GetProject($id: ID!) {
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
export const listProjects = `query ListProjects(
  $filter: ModelProjectFilterInput
  $limit: Int
  $nextToken: String
) {
  listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
        }
        nextToken
      }
      template {
        id
        type
      }
    }
    nextToken
  }
}
`;
export const getPlayer = `query GetPlayer($id: ID!) {
  getPlayer(id: $id) {
    id
    projectId
    answers {
      items {
        id
        text
        createdAt
        topicId
      }
      nextToken
    }
    project {
      id
      title
      password
      description
      limitCard
    }
    user {
      id
      name
      image
    }
  }
}
`;
export const listPlayers = `query ListPlayers(
  $filter: ModelPlayerFilterInput
  $limit: Int
  $nextToken: String
) {
  listPlayers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      projectId
      answers {
        items {
          id
          text
          createdAt
          topicId
        }
        nextToken
      }
      project {
        id
        title
        password
        description
        limitCard
      }
      user {
        id
        name
        image
      }
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    image
    players {
      items {
        id
        projectId
      }
      nextToken
    }
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      image
      players {
        items {
          id
          projectId
        }
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getTemplate = `query GetTemplate($id: ID!) {
  getTemplate(id: $id) {
    id
    type
    projects {
      items {
        id
        title
        password
        description
        limitCard
      }
      nextToken
    }
    cards {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const listTemplates = `query ListTemplates(
  $filter: ModelTemplateFilterInput
  $limit: Int
  $nextToken: String
) {
  listTemplates(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      type
      projects {
        items {
          id
          title
          password
          description
          limitCard
        }
        nextToken
      }
      cards {
        items {
          id
        }
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getCard = `query GetCard($id: ID!) {
  getCard(id: $id) {
    id
    template {
      id
      type
    }
    base {
      id
      number
    }
  }
}
`;
export const listCards = `query ListCards(
  $filter: ModelCardFilterInput
  $limit: Int
  $nextToken: String
) {
  listCards(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      template {
        id
        type
      }
      base {
        id
        number
      }
    }
    nextToken
  }
}
`;
export const getCardContent = `query GetCardContent($id: ID!) {
  getCardContent(id: $id) {
    id
    number
    cards {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const listCardContents = `query ListCardContents(
  $filter: ModelCardContentFilterInput
  $limit: Int
  $nextToken: String
) {
  listCardContents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      number
      cards {
        items {
          id
        }
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getTopic = `query GetTopic($id: ID!) {
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
      }
      nextToken
    }
  }
}
`;
export const listTopics = `query ListTopics(
  $filter: ModelTopicFilterInput
  $limit: Int
  $nextToken: String
) {
  listTopics(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const getAnswer = `query GetAnswer($id: ID!) {
  getAnswer(id: $id) {
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
export const listAnswers = `query ListAnswers(
  $filter: ModelAnswerFilterInput
  $limit: Int
  $nextToken: String
) {
  listAnswers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
