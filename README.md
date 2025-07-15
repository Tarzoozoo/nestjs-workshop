# NestJS Project with MongoDB

This is a NestJS project with MongoDB as the database. It includes two modules: **Products** and **Orders**, where:

- **ProductsModule**: Handles the creation and retrieval of product data.
- **OrdersModule**: Manages the order creation and links products to orders.

## Features

- **MongoDB**: The project uses MongoDB as the data store. The MongoDB service is configured through Docker.
- **Validation**: Global validation using NestJS's `ValidationPipe` to ensure that DTOs (Data Transfer Objects) are validated properly.
- **Mongoose Integration**: The `MongooseModule` is used to integrate MongoDB with NestJS for easy interaction with the database.

## Project Setup

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v14.x or above)
- **Docker** (for running MongoDB)
- **Docker Compose** (to manage Docker services)

### Install Dependencies

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

## Compile and run the project

Running MongoDB with Docker

```bash
docker-compose up -d
```

Running the Application

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Endpoints

1. Products:

`POST /products`: Create a new product.

    Request Body: CreateProductDto (Name, Description, Price)

`GET /products`: Retrieve all products.

`GET /products/:id`: Retrieve a product by ID.

`PATCH /products/:id`: Update a product by ID.

`DELETE /products/:id`: Remove a product by ID.

2. Orders:

`POST /orders`: Create a new order with a linked product.

    Request Body: CreateOrderDto (Product ID, Quantity)

`GET /orders/:id`: Retrieve an order by ID.

โลกของ NestJS คุยกันผ่าน Injection
