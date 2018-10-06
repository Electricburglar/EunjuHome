import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: "https://boardql-nwvadtfkzf.now.sh"
});
export default client;