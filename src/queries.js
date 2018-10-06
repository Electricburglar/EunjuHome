import gql from 'graphql-tag';
// Get posts
export const getPosts = gql`
   query {
        posts{
            _id,
            title,
            author,
            date,
            count,
            countComment
        }
    }
`;

// Get post
export const getPost = gql`
   query getPost($_id: String!){
       post(_id: $_id) {
           title,
           content,
           author,
       }
    }
`;

// Get comments
export const getComments = gql`
    query getComments($PostID: String!){
        comments(PostID: $PostID) {
            _id,
            text,
            date
        }
    }
`;

// Search posts
export const getSearch = gql`
    query getSearch($type: String!, $value: String!){
        search(type: $type, value: $value) {
            _id,
            title,
            author,
            date,
            count,
            countComment
        }
    }
`;

// Check password
export const checkPassword = gql`
    mutation checkPassword($_id: String!, $password: String!){
        checkPassword(_id: $_id, password: $password)
    }
`;

// Create post
export const createPost = gql`
   mutation createPost($title: String!, $author: String!, $content: String!, $password: PasswordInput!, $date: String!){
        createPost(title: $title, author: $author, content: $content, password: $password, date: $date)
    }
`;

// Update post
export const updatePost = gql`
   mutation updatePost($_id: String!, $title: String!, $content: String!){
        updatePost(_id: $_id, title: $title, content: $content)
    }
`;

// Delete post
export const deletePost = gql`
   mutation deletePost($_id: String!, $password: String!) {
        deletePost(_id: $_id, password: $password)
    }
`;

// Count post
export const countPost = gql`
    mutation countPost($_id: String!){
        countPost(_id: $_id)
    }
`;

// Create comment
export const createComment = gql`
    mutation createComment($text: String!, $PostID: String!, $date: String!, $password: PasswordInput!){
        createComment(text: $text, PostID: $PostID, date: $date, password: $password)
    }
`;

// Delete comment
export const deleteComment = gql`
   mutation deleteComment($_id: String!, $password: String!, $PostID: String!) {
        deleteComment(_id: $_id, password: $password, PostID: $PostID)
    }
`;
