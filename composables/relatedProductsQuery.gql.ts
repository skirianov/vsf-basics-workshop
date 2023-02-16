export default `
  query relatedProductsQuery($filter: ProductAttributeFilterInput,) {
    products(filter: $filter) {
      items {
        uid
        name
        related_products {
          uid
          name
          sku
          image {
            url
          }
          rating_summary
          review_count
          thumbnail {
            url
          }
          url_rewrites {
            url
          }
          price_range {
            maximum_price {
                final_price {
                    currency
                    value
                }
                regular_price {
                    currency
                    value
                }
            }
            minimum_price {
                final_price {
                    currency
                    value
                }
                regular_price {
                    currency
                    value
                }
            }
          }
        }
      }
    }
  }
`;
