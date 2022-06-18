# Que comemos

## TODO

- [ ] `eatFor` -> `daytime`
- [ ] Non-existing route throws error. Should redirect.
- [ ] Add side-dish from week plan (do not hardcode if a dish has side-dish)
- [ ] Filter "something with potatoes"

## Features

- See food plan
  - Per week
  - Button for random food
- Database of food
  - Lunch
  - Dinner

## Firestore

```json
{
  "/groups": {
    "[groupId]": {
      "/meals": {
        "[id]": {
          "name": "string",
          "eatFor": "lunch"|"dinner"|"side-dish",
          "category": "fish"|"meat",
          "lastEaten": "datetime",
          "forChild": "boolean",
          "withSideDish": "boolean" // If side dish is allowed
        }
      },
      "/weekPlans": {
        "[startDate]": {
          "d0": {
            "lunch|dinner|lunch-side-dish": {
              "icon": ":emoji",
              "category": "string",
              "id": "abc123",
              "name": "duplicated name"
            }
          }
        }
      },
      "users": {
        "[userId]": {
          "name": "string",
          "isPending": "boolean",
        }
      }
    }
  }
}
```

## Database of products

openfoodfacts.org

### API

https://world.openfoodfacts.org/api/v0/product/8435065300277.json

## Assets

Table icon - https://www.iconsdb.com/custom-color/table-icon.html
