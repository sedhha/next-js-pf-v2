# Query for generating blog-pre-generated.json

```graphql
query {
	blogCollection {
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
}
```
