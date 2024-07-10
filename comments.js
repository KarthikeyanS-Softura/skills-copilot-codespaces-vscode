// Create web server
// Create comments array
// Create a route to get all comments
// Create a route to get a single comment
// Create a route to add a new comment
// Create a route to edit a comment
// Create a route to delete a comment
// Create a route to upvote a comment
// Create a route to downvote a comment
// Create a route to upvote a comment
// Create a route to downvote a comment
// Create a route to get all comments for a post

const express = require('express');
const bodyParser = require('body-parser');
const comments = require('./comments');

const app = express();
app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.get('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === Number(req.params.id));
  res.json(comment);
});

app.post('/comments', (req, res) => {
  const newComment = {
    id: comments.length + 1,
    ...req.body,
  };
  comments.push(newComment);
  res.json(newComment);
});

app.put('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === Number(req.params.id));
  Object.assign(comment, req.body);
  res.json(comment);
});

app.delete('/comments/:id', (req, res) => {
  const index = comments.findIndex(comment => comment.id === Number(req.params.id));
  comments.splice(index, 1);
  res.sendStatus(204);
});

app.post('/comments/:id/upvote', (req, res) => {
  const comment = comments.find(comment => comment.id === Number(req.params.id));
  comment.votes++;
  res.json(comment);
});

app.post('/comments/:id/downvote', (req, res) => {
  const comment = comments.find(comment => comment.id === Number(req.params.id));
  comment.votes--;
  res.json(comment);
});

app.get('/posts/:id/comments', (req, res) => {
  const postComments = comments.filter(comment => comment.postId === Number(req.params.id));
  res.json(postComments);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});