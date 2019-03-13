// eslint-disable
// this is an auto generated file. This will be overwritten

export const createProject = `mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
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
export const updateProject = `mutation UpdateProject($input: UpdateProjectInput!) {
  updateProject(input: $input) {
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
export const deleteProject = `mutation DeleteProject($input: DeleteProjectInput!) {
  deleteProject(input: $input) {
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
export const createPlayer = `mutation CreatePlayer($input: CreatePlayerInput!) {
  createPlayer(input: $input) {
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
export const updatePlayer = `mutation UpdatePlayer($input: UpdatePlayerInput!) {
  updatePlayer(input: $input) {
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
export const deletePlayer = `mutation DeletePlayer($input: DeletePlayerInput!) {
  deletePlayer(input: $input) {
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
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
export const createTemplate = `mutation CreateTemplate($input: CreateTemplateInput!) {
  createTemplate(input: $input) {
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
export const updateTemplate = `mutation UpdateTemplate($input: UpdateTemplateInput!) {
  updateTemplate(input: $input) {
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
export const deleteTemplate = `mutation DeleteTemplate($input: DeleteTemplateInput!) {
  deleteTemplate(input: $input) {
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
export const createCard = `mutation CreateCard($input: CreateCardInput!) {
  createCard(input: $input) {
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
export const updateCard = `mutation UpdateCard($input: UpdateCardInput!) {
  updateCard(input: $input) {
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
export const deleteCard = `mutation DeleteCard($input: DeleteCardInput!) {
  deleteCard(input: $input) {
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
export const createCardContent = `mutation CreateCardContent($input: CreateCardContentInput!) {
  createCardContent(input: $input) {
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
export const updateCardContent = `mutation UpdateCardContent($input: UpdateCardContentInput!) {
  updateCardContent(input: $input) {
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
export const deleteCardContent = `mutation DeleteCardContent($input: DeleteCardContentInput!) {
  deleteCardContent(input: $input) {
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
export const createTopic = `mutation CreateTopic($input: CreateTopicInput!) {
  createTopic(input: $input) {
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
export const updateTopic = `mutation UpdateTopic($input: UpdateTopicInput!) {
  updateTopic(input: $input) {
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
export const deleteTopic = `mutation DeleteTopic($input: DeleteTopicInput!) {
  deleteTopic(input: $input) {
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
export const createAnswer = `mutation CreateAnswer($input: CreateAnswerInput!) {
  createAnswer(input: $input) {
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
export const updateAnswer = `mutation UpdateAnswer($input: UpdateAnswerInput!) {
  updateAnswer(input: $input) {
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
export const deleteAnswer = `mutation DeleteAnswer($input: DeleteAnswerInput!) {
  deleteAnswer(input: $input) {
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
