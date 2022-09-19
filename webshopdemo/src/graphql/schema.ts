import { buildSchema } from "graphql";

const schemaProduct = buildSchema(`

    input CartInput {
        uid: Int!
        userId: Int!
        productId: Int!
        price: Int!
        date: String!
    }

    type Product {
        _id: Int!
        uid: Int!
        name: String!
        description: String!
        price: Int!
    }
    
    type Cart {
        _id: Int!
        uid: Int!
        userId: Int!
        productId: Int!
        product: Product
        price: Int!
        date: String!
    }

    type Order {
        _id: Int!
        uid: Int!
        userId: Int!
        cartId: Int!
        cart: Cart
        date: String!
    }

    type Query {
        getProduct(id: Int): Product
        getProducts: [Product]
        getCart(id: Int): Cart
        getCarts: [Cart]
        getOrder(id: Int): Order
        getOrders: [Order]
    }

    type Mutation {
        createCart(input: CartInput): Cart
    }
`);

export default schemaProduct