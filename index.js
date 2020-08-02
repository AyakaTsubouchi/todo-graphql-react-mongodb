require("dotenv").config();
const { GraphQLServer } = require("graphql-yoga");
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("Users", {
  username: String,
  email: String,
  image: String,
});

const Todo = mongoose.model("Todos", {
  contents: String,
});

const typeDefs = `
    type Query{
        getUser(id: ID!): User
        getUsers: [User]
        getTodo(id: ID!): Todo
        getTodos: [Todo]
    }
    type User{
        id: ID!
        username: String!
        email: String!
        image: String
      
    }
    type Todo{
        id: ID!
        contents: String!
       
    }
    type Mutation {
        addUser(username: String!, email: String!): User!,
        deleteUser(id: ID!): String,
        deleteTodo(id: ID!): String,
        addTodo(contents:String!):Todo!,
        updateTodo(id:ID!,contents:String!):Todo!
      
    }
`;

const resolvers = {
  Query: {
    getUser: async (_, { id }) => {
      const result = await User.findById(id);
      return result;
    },
    getUsers: () => User.find(),
    getTodos: () => Todo.find(),
  },
  Mutation: {
    addUser: async (_, { username, email }) => {
      const user = new User({ username, email });
      await user.save();
      return user;
    },
    deleteUser: async (_, { id }) => {
      await User.findByIdAndRemove(id);
      return "User deleted";
    },
    deleteTodo: async (_, { id }) => {
      await Todo.findByIdAndRemove(id);
      return "Todo deleted";
    },
    addTodo: async (_, { contents }) => {
      const todo = new Todo({ contents });
      await todo.save();
      return todo;
    },
    updateTodo: async (_, { id, contents }) => {
      return await Todo.findOneAndUpdate(id, { contents });
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
mongoose.connection.once("open", () => {
  server.start(() => console.log("Server is running on localhost:4000"));
});
