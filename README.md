# Que comemos

## Progress

- [ ] SSR returns wrong day highlighted. Once client is ready it's moved to correct day. Trying at 00:15.
- [ ] When using prod DB and navigating between weeks, seems that SSR works but after page is loaded then the same query is performed again (because it's possible to see the skeletons)

## Start

```
yarn dev # For usage with emulators - it's using FIREBASE_AUTH_EMULATOR_HOST=localhost:9099 in order to set correctly kid claim in the token
```

## TODO

- [x] I need to run the query on SSR and then dehydrate the state
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
Other icons - https://materialui.co/icons/

## Routes

- `/week/[week]/[time]/[day]`
- `/week/2022-11-07/lunch/2`

## Docs

SvelteKit lifecycle: https://github.com/sveltejs/kit/discussions/5748#discussioncomment-3282246
