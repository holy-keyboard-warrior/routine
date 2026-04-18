# Security Specification - Routine Archive

## Data Invariants
1. An entry (Meal or Workout) must have a valid `userId` matching the authenticated creator.
2. Entries are strictly private to the user who created them.
3. Timestamps (`date`) must be valid ISO strings.
4. Entry IDs must be valid alphanumeric strings.

## The "Dirty Dozen" Payloads (Attack Vectors)
1. **Identity Spoofing**: Attempt to create an entry with a `userId` belonging to another user.
2. **Unauthorized Read**: Attempt to list entries without being authenticated.
3. **Cross-User Leak**: Authenticated User A attempts to read entries belonging to User B.
4. **Shadow Field Injection**: Attempt to create an entry with an extra field `isAdmin: true`.
5. **Type Poisoning**: Attempt to set `duration` as a string instead of a number.
6. **Malicious ID**: Attempt to use a 2MB string as a document ID.
7. **Negative Value**: Attempt to set a negative `duration` for a workout.
8. **Invalid Category**: Attempt to set a meal category like `buffet` which is not in the allowed enum.
9. **Update Hijack**: Attempt to change the `userId` of an existing entry during an update.
10. **Global Read**: Attempting a query that doesn't filter by `userId`, expecting the rules to fail closed.
11. **Future Date Injection**: Attempt to log an entry for the year 2099.
12. **Massive Payload**: Attempt to send a 1MB `notes` field.

## Test Strategy
- Verify that `request.auth.uid` matches `resource.data.userId` for all operations.
- Enforce strict schema validation on create and update.
- Ensure document IDs follow strict patterns.
