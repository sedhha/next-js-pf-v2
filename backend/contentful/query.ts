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

const getBlogIdsByCategory = `query($categorySlug:String!) {
  output: categoryCollection(where: { slug_contains: $categorySlug }) {
    items {
      linkedFrom {
        output: blogCollection {
          items {
            sys {
              id
            }
            
          }
        }
      }
    }
  }
}
`;

const getBlogsByIds = `query($ids: [String]!,$limit:Int!,$skip:Int!) {
  output:blogCollection(where: { sys: { id_in: $ids } },limit:$limit,skip:$skip) {
    total
    items {
      title
      excerpt
      publishDate
      sys {
        id
      }
      primaryImage @include(if: true) {
        url
      }
      author {
        avatar {
          url
        }
        authorName
      }
      categoriesCollection {
        items {
          title
          slug
        }
      }
    }
  }
}
`;

const blogWithPreRendering = `query {
  output: blogCollection(where:{preRenderContent:true}) {
    items {
      sys {
        id
      }
     categoriesCollection {
        items {
          slug
        }
      }
    }
  }
}`;

const getAllCategories = `query {
  output:categoryCollection {
    items {
      slug
    }
  }
}
`;

export {
	workExperienceQuery,
	blogWithCategoryAndIDQuery,
	getBlogIdsByCategory,
	getBlogsByIds,
	blogWithPreRendering,
	getAllCategories
};
