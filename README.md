## War Paws API

An API for the War Paws web application.

## Features

- User registration and authentication (with email verification)
- User profile management
- Animal listing creation (with photos, location, description)
- Browsing and searching animal listings (by location, type, status etc.)
- Mark animal as found / taken to shelter / adopted
- Messaging system between users
- Shelter registration and management (moderated or admin-approved)
- REST & WebSocket APIs for front-end integration
- Image storage support (e.g. via AWS S3 or local file system)


## Tech details
- Multi-layered architecture with separation of concerns
- RESTful API design
- Repositories for data access
- Mappers for data transformation
- Guards for authorization
- Global exception filter

### Tech stack
- NestJS & Express
- PrismaORM
- PostgreSQL
- Socket.io
- JWT
- Docker & Docker Compose
- Node mailer
- SMTP

## Structure

![image](https://github.com/user-attachments/assets/adc78d21-6589-467d-a092-026c0c85f81f)

## Pattern examples

- [Repository](https://github.com/Sikorsky-Devs/war-paws-api/blob/main/src/api/contact/contact.repository.ts): this pattern abstracts the data access layer, providing a centralized interface for querying and persisting domain entities. This allows for easier testing and separation of concerns.
- [Mapper](https://github.com/Sikorsky-Devs/war-paws-api/blob/main/src/api/comment/comment.mapper.ts): this pattern transforms data between different representations, such as converting database entities to DTOs (Data Transfer Objects) and vice versa. This ensures that the API layer remains decoupled from the database schema.
- [Factory](https://github.com/Sikorsky-Devs/war-paws-api/blob/main/src/api/auth/guard/auth.guard.ts): this pattern encapsulates the creation logic of objects, and in our case, it dynamically generates a guard class with behavior based on the provided account type.
- [Guard](https://github.com/Sikorsky-Devs/war-paws-api/blob/main/src/api/auth/guard/auth.guard.ts): this pattern provides a way to implement authorization logic, allowing us to restrict access to certain routes based on user roles or permissions.
- [DTO (Data Transfer Object)](https://github.com/Sikorsky-Devs/war-paws-api/blob/main/src/api/auth/dto/sign-in.dto.ts): this pattern defines the structure of data that is sent over the network, ensuring that only the necessary information is exposed to the client. It helps in validating and transforming incoming requests.
- [Decorators](https://github.com/Sikorsky-Devs/war-paws-api/blob/main/src/api/auth/auth.controller.ts): we use decorators to define metadata for classes and methods, such as route handlers, guards, and interceptors. This allows for cleaner and more readable code while providing additional functionality.

Also, all our services are built with a multi-layered architecture, which separates the business logic from the data access layer, making it easier to maintain and test **(SRP)**

## WebSocket Integration

Our project includes WebSocket support for real-time communication using socket.io. The WebSocket implementation enables users to join chat rooms, send messages, and leave rooms dynamically.

### Events

The WebSocket connection handles the following three events:

- **join** – Allows a user to join a specific chat room.

- **message** – Enables sending and receiving messages within the chat room.

- **leave** – Notifies when a user leaves a chat room.

## Installation

```bash
$ git clone https://github.com/Sikorsky-Devs/war-paws-api.git

$ cd war-paws-api
```

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Environment variables

```bash
DATABASE_URL=
PORT=4555

FRONT_BASE_URL=
BACK_BASE_URL=

SMTP_HOST=
SMTP_USERNAME=
SMTP_PASSWORD=

SECRET=
TTL=
```

## Deployment

First of all? we have dockerization for the project. Our Dockerfile is ready to use.

```dockerfile
FROM node:22

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn prisma generate && \
    yarn build && \
    yarn static

EXPOSE 4555

CMD ["yarn", "start"]
```
