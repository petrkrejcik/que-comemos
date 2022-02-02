# Que comemos

## TODO

- `eatFor` -> `daytime`

## Features

- See food plan
  - Per week
  - Button for random food
- Database of food
  - Lunch
  - Dinner

## Firestore

```js
{
  "/meals": {
    "+/[groupId]": {
      "[id]": {
        "name": "string",
        "eatFor": "lunch"|"dinner"|"sideDish",
        "category": "fish"|"meat",
        "lastEaten": "datetime",
        "forChild": "boolean",
        "withSideDish": "boolean" // If side dish is allowed
      }
    }
  },
  "/weekPlans": {
    "+/[groupId]": {
      "[startDate]": {
        "d0": {
          "lunch": "abc123",
          "dinner": "abc123",
          "childLunch": "abc123",
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
