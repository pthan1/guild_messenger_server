const express = require('express');
const app = express();
app.use(express.json())

app.set('port', process.env.PORT || 3001);
app.locals.title = 'Guild Messenger App Server';
app.locals.users = [
  {
    id: 1,
    user_name: 'ProfessorX',
    conversation_ids: [ 1234 ],
  },
  {
    id: 2,
    user_name: 'Angel',
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
            time_sent: '2022-01-20T04:06:24.448Z'
          },
          {
            sender: 2,
            message: 'Hello, this is Angel.',
            time_sent: '2022-01-20T04:07:26.768Z'
          },
           {
            sender: 1,
            message: 'Where is your homework, Angel?',
            time_sent: '2022-01-20T04:08:22.768Z'
          }
        ]
      }
];


app.get('/', (request, response) => {
  console.log('Request received')
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
  console.log(request.params)
  const conversations = app.locals.conversations.find(conversations => conversations.user_ids.includes(Number(user_id)));

  response.status(200).json(conversations);
});

app.patch('/api/v1/conversations/:user_id/:conversation_id', (request, response) => {
  const newMessage = request.body;
  console.log(request.body)
  const { user_id, conversation_id } = request.params;
console.log('user id and convo id', user_id, conversation_id)
  const conversationIndex = app.locals.conversations.findIndex(conversation => conversation.id === Number(conversation_id));
console.log(conversationIndex);


  app.locals.conversations[conversationIndex].message_log.push(newMessage);

  response.status(202).send(app.locals.conversations[conversationIndex].message_log);
});



