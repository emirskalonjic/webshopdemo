# webshopdemo
Webshop Demo Project (Product, Cart, Order)\

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
-----------------  

Postman requests (Query):  
{  
    &emsp;"query": "{ getProduct(id: 1) { uid name description price } }"   
}  
{  
    &emsp;"query": "{ getProducts { uid name description price } }"   
}    
{   
    &emsp;"query": "{ getCarts { uid userId productId product { uid name description price } price } }"  
}  

Postman requests (Mutation):  
{  
    &emsp;"query": "mutation CreateCart($input: CartInput) { createCart(input: $input) { uid userId productId price date }}",  
    &emsp;"variables": { "input" : {  
            &emsp;&emsp;"uid": 3,  
            &emsp;&emsp;"userId": 1,  
            &emsp;&emsp;"productId": 3,  
            &emsp;&emsp;"price": 300,  
            &emsp;&emsp;"date": "2022-09-19 10:00:00"  
        &emsp;&emsp;}  
    &emsp;}  
}  

