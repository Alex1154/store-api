# Store Api

## This api will have the following entities

- User
- Product
- Payment
- Order

# Each entity will have the following attributes

- id
- createdAt
- updatedAt
- deletedAt

## User

- id
- name
- email
- password
- createdAt
- updatedAt
- deletedAt

## Product

- id
- name
- description
- price
- createdAt
- updatedAt
- deletedAt

## Payment

- id
- userId
- productId
- paymentMethod
- paymentStatus
- createdAt
- updatedAt
- deletedAt

## Order

- id
- userId
- productId
- paymentId
- createdAt
- updatedAt
- deletedAt

# Each entity has the following relationships

## User

- hasMany: Payment
- hasMany: Order

## Product

- belongsTo: User
- hasMany: Order

## Payment

- belongsTo: User
- belongsTo: Product
- hasMany: Order

## Order

- belongsTo: User
- belongsTo: Product
- belongsTo: Payment

# Each entity will have the following methods

## User

- create
- read
- update
- delete

## Product

- create
- read
- update
- delete

## Payment

- create
- read
- update
- delete

## Order

- create
- read
- update
- delete

# Each entity will have the following crud operations

## User

- create
- read
- update
- delete

## Product

- create
- read
- update
- delete

## Payment

- create
- read
- update
- delete

## Order

- create
- read
- update
- delete

# Each entity will have the following events

## User

- create
- read
- update
- delete

## Product

- create
- read
- update
- delete

## Payment

- create
- read
- update
- delete

## Order

- create
- read
- update
- delete

# Each entity will have the following hooks

## User

- create
- read
- update
- delete

## Product
