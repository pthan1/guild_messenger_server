const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3001);
app.locals.title = 'Guild Messenger App Server';
app.locals.users = [
  {
    user_id: 1,
    user_name: 'ProfessorX',
    conversation_ids: [ 1234 ],
  },
  {
    user_id: 2,
    user_name: 'Angel',
    conversation_ids: [ 1234 ]
  }
]

app.locals.conversations = [
      {
        conversation_id: 1234,
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
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});