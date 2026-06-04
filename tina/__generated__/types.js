export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const ProjectsPartsFragmentDoc = gql`
    fragment ProjectsParts on Projects {
  __typename
  webApps {
    __typename
    card {
      __typename
      title
      statusColor
      statusText
      subtitle
      description
      image
      bgImage
      link
      githubLink
      mockupWidth
      imgTransform
      sticker
    }
    detail {
      __typename
      title
      statusColor
      statusText
      link
      iconKey
      cardId
      githubLink
      mockupWidth
      button
      buttonText
      incomplete
      mockupImages {
        __typename
        id
        src
        alt
        caption
      }
      features
      stats {
        __typename
        label
        value
      }
    }
  }
  webGames {
    __typename
    card {
      __typename
      title
      statusColor
      statusText
      subtitle
      description
      image
      bgImage
      link
      githubLink
      mockupWidth
      imgTransform
      sticker
    }
    detail {
      __typename
      title
      statusColor
      statusText
      link
      iconKey
      cardId
      githubLink
      mockupWidth
      button
      buttonText
      incomplete
      mockupImages {
        __typename
        id
        src
        alt
        caption
      }
      features
      stats {
        __typename
        label
        value
      }
    }
  }
  mobileApps {
    __typename
    card {
      __typename
      title
      statusColor
      statusText
      subtitle
      description
      image
      bgImage
      link
      githubLink
      mockupWidth
      imgTransform
      sticker
    }
    detail {
      __typename
      title
      statusColor
      statusText
      link
      iconKey
      cardId
      githubLink
      mockupWidth
      button
      buttonText
      incomplete
      mockupImages {
        __typename
        id
        src
        alt
        caption
      }
      features
      stats {
        __typename
        label
        value
      }
    }
  }
  appGames {
    __typename
    card {
      __typename
      title
      statusColor
      statusText
      subtitle
      description
      image
      bgImage
      link
      githubLink
      mockupWidth
      imgTransform
      sticker
    }
    detail {
      __typename
      title
      statusColor
      statusText
      link
      iconKey
      cardId
      githubLink
      mockupWidth
      button
      buttonText
      incomplete
      mockupImages {
        __typename
        id
        src
        alt
        caption
      }
      features
      stats {
        __typename
        label
        value
      }
    }
  }
}
    `;
export const ProjectsDocument = gql`
    query projects($relativePath: String!) {
  projects(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ProjectsParts
  }
}
    ${ProjectsPartsFragmentDoc}`;
export const ProjectsConnectionDocument = gql`
    query projectsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ProjectsFilter) {
  projectsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ProjectsParts
      }
    }
  }
}
    ${ProjectsPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    projects(variables, options) {
      return requester(ProjectsDocument, variables, options);
    },
    projectsConnection(variables, options) {
      return requester(ProjectsConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
