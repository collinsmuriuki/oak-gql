import { applyGraphQL, gql, GQLError } from "https://deno.land/x/oak_graphql/mod.ts";
import { Router, RouterContext } from "https://deno.land/x/oak@v6.0.1/mod.ts";


// Typedefs
const typeDefs = (gql as any)`
    type User {
        username: String!
        email: String!
        password: String!
    }
    
    input SignUp {
        username: String!
        email: String!
        password: String!
    }
    
    type Query {
        users: [User]!
    }
    
    type Mutation {
        signup(data: SignUp): User
    }
`;

interface User {
    username: string,
    email: string,
    password: string,
}

const users: User[] = [
    {username: "Test", email: "test@example.com", password: "123456qwertyuip123asdf"}
];

// Resolvers
const resolvers = {
    Query: {
        users: (_parent: any, { data }: any, _ctx: any, _info: any) => {
            return users;
        }
    },
    Mutation: {
        signup: (_parent: any, { data } : { data: User }, _ctx: any, _info: any) => {
            users.push(data);
            return data;
        }
    }
}

// Schema
export const GraphQLService = await applyGraphQL<Router>({
    Router,
    typeDefs,
    resolvers
})