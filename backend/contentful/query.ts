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

export { workExperienceQuery };
