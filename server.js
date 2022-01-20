const express = require('express');
const app = express();
const cors = require("cors")

app.use(express.json())
app.use(cors())
app.set('port', process.env.PORT || 3001);

app.locals.title = 'Guild Messenger App Server';
app.locals.users = [
  {
    id: 1,
    name: 'ProfessorX',
    conversation_ids: [ 1234 ],
  },
  {
    id: 2,
    name: 'Angel',
    conversation_ids: [ 1234 ]
  }
]

app.locals.conversations = [
      {
        id: 1234,
        user_ids: [ 1, 2],
        message_log: [
          {
            sender: 1,
            message: 'Hello, this is Professor Charles Xavier.',
            time_sent: 'Thu Jan 20 2022 02:58:57 GMT-0700 (Mountain Standard Time)'
          },
          {
            sender: 2,
            message: 'Hello, this is Angel.',
            time_sent: 'Thu Jan 20 2022 02:59:37 GMT-0700 (Mountain Standard Time)'
          },
           {
            sender: 1,
            message: 'Where is your homework, Angel?',
            time_sent: 'Thu Jan 20 2022 02:59:51 GMT-0700 (Mountain Standard Time)'
          }
        ]
      }
];


app.get('/', (request, response) => {
  response.send('Welcome to the Guild Messenger API!');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

//Get all users
app.get('/api/v1/users/', (request, response) => {
  const users = app.locals.users;

  response.json({ users });
});

//Get user conversations by user id
app.get('/api/v1/conversations/:user_id', (request, response) => {
  const { user_id } = request.params;
  const conversations = app.locals.conversations.filter(conversations => conversations.user_ids.includes(Number(user_id)));

  response.status(200).json({conversations});
});

//add a new message to a conversation
app.patch('/api/v1/conversations/:user_id/:conversation_id', (request, response) => {
  const newMessage = request.body;
  const { conversation_id } = request.params;
  const conversationIndex = app.locals.conversations.findIndex(conversation => conversation.id === Number(conversation_id));

  app.locals.conversations[conversationIndex].message_log.push(newMessage);

  response.status(202).send(app.locals.conversations[conversationIndex]);


});



