# webshopdemo
Webshop Demo Project (Product, Cart, Order)

Technologies: 
Node.js, 
Typescript, 
Express, 
Microservices, 
Mongoose, 
MongoDB, 
GraphQL, 
RabbitMQ

GraphQL examples:

Postman requests (Query):
{
    "query": "{ getProduct(id: 1) { uid name description price } }"
}
{
    "query": "{ getProducts { uid name description price } }"
}
{
    "query": "{ getCarts { uid userId productId product { uid name description price } price } }"
}

Postman requests (Mutation):
{
    "query": "mutation CreateCart($input: CartInput) { createCart(input: $input) { uid userId productId price date }}",
    "variables": { "input" : {
            "uid": 3,
            "userId": 1,
            "productId": 3,
            "price": 300,
            "date": "2022-09-19 10:00:00"
        }
    }
}

