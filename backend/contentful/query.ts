const workExperienceQuery = `
query($limit: Int!, $skip: Int!) {
    output: workExperienceCollection(
      limit: $limit
      skip: $skip
      order: startDate_DESC
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
