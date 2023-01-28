const workExperienceQuery = `
query($limit: Int!, $skip: Int!) {
  output: workExperienceCollection(
    limit: $limit
    skip: $skip
    order: order_ASC
  ) {
    total
    items {
      orgName
      designation
      startDate
      currentOrg
      image {
        url
      }
      description
      endDate
    }
  }
}
`;

const blogWithCategoryAndIDQuery = `query($ids: [String]!) {
  output: blogCollection(where: { sys: { id_in: $ids } }) {
    items {
      title
      content
      author {
        authorName
        avatar {
          title
          description
          url
        }
        bio
      }
      primaryImage {
        title
        description
        url
      }
      excerpt
      categoriesCollection {
        items {
          slug
        }
      }
    }
  }
}
`;

export { workExperienceQuery, blogWithCategoryAndIDQuery };
