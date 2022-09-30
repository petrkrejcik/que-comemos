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
- [ ] Create group
  - [ ] Profile page

### First sign in
1. Trigger sign in function on server
1. Generate random `groupId` and create `/groups/{groupId}`
1. Set cusotm claims with `{groupdId}`

### Add user to group
If I want to colaborate and share the week plan with somebody I have to invite them.
1. Open profile page
1. Click "Add group member"
1. Fill email
  - Call function `invite(email)`
  - Find user by email and their group
  - I'll get a user object of a person who I want to invite with the `groupId` in claims
  - Add invited user to `groups/{myGroupId}/members` `{[userId]: {name, isPending}}`
  - Add `groups/{groupId}/invitations {myName, myGroupId}
1. That user will see a dialog "User xyz wants to invite you to their group"
1. Accept

### Questions
- How can I register?
- What is my default `groupId` when I register?

## Features

- Colaborate on your week plan with family members
- Create a database of your favorite dishes

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
      "owner": {
        "uid": "string",
        "name": "string", // Filled from sign in provider during the first login
      },
      "members": { // Todo now it's `users` -> rename it to `members`. List of accepted
        "[userId]": {
          "name": "string",
          "isPending?": "boolean", // Indicating that the user is invited but haven't accepted yet
        }
      },
      "invitations?": [ // List of received (incoming) invitations
        {
          "name": "string", // Name of the user who sent the invitation
          "groupId": "string"
        }
      ]
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
