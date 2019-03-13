// eslint-disable
// this is an auto generated file. This will be overwritten

export const subscribeToProjectPlayers = `subscription SubscribeToProjectPlayers($projectId: String!) {
  subscribeToProjectPlayers(projectId: $projectId) {
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
export const subscribeToProjectTopics = `subscription SubscribeToProjectTopics($projectId: String!) {
  subscribeToProjectTopics(projectId: $projectId) {
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
export const subscribeToTopicAnswers = `subscription SubscribeToTopicAnswers($topicId: String!) {
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
export const onCreateProject = `subscription OnCreateProject {
  onCreateProject {
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
export const onUpdateProject = `subscription OnUpdateProject {
  onUpdateProject {
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
export const onDeleteProject = `subscription OnDeleteProject {
  onDeleteProject {
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
export const onCreatePlayer = `subscription OnCreatePlayer {
  onCreatePlayer {
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
export const onUpdatePlayer = `subscription OnUpdatePlayer {
  onUpdatePlayer {
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
export const onDeletePlayer = `subscription OnDeletePlayer {
  onDeletePlayer {
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
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateTemplate = `subscription OnCreateTemplate {
  onCreateTemplate {
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
export const onUpdateTemplate = `subscription OnUpdateTemplate {
  onUpdateTemplate {
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
export const onDeleteTemplate = `subscription OnDeleteTemplate {
  onDeleteTemplate {
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
export const onCreateCard = `subscription OnCreateCard {
  onCreateCard {
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
export const onUpdateCard = `subscription OnUpdateCard {
  onUpdateCard {
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
export const onDeleteCard = `subscription OnDeleteCard {
  onDeleteCard {
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
export const onCreateCardContent = `subscription OnCreateCardContent {
  onCreateCardContent {
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
export const onUpdateCardContent = `subscription OnUpdateCardContent {
  onUpdateCardContent {
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
export const onDeleteCardContent = `subscription OnDeleteCardContent {
  onDeleteCardContent {
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
export const onCreateTopic = `subscription OnCreateTopic {
  onCreateTopic {
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
export const onUpdateTopic = `subscription OnUpdateTopic {
  onUpdateTopic {
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
export const onDeleteTopic = `subscription OnDeleteTopic {
  onDeleteTopic {
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
export const onCreateAnswer = `subscription OnCreateAnswer {
  onCreateAnswer {
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
export const onUpdateAnswer = `subscription OnUpdateAnswer {
  onUpdateAnswer {
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
export const onDeleteAnswer = `subscription OnDeleteAnswer {
  onDeleteAnswer {
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
