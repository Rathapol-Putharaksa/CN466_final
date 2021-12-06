const line = require('@line/bot-sdk');
const path = require('path');
const express = require('express');
require('dotenv').config()

const axios = require('axios');

 




// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.LINE_BOT_CHANNEL_TOKEN,
  channelSecret: process.env.LINE_BOT_CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});



// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  else{
    if(event.message.text === "check"){
      axios.get(process.env.check)
      .then((response) => {
      console.log(response.data)
      return client.replyMessage(event.replyToken, 
        {
            "type":"text",
            "text":`STATUS : ${response.data}`
        });

      })
     
      
  }
  else if(event.message.text === "time"){
    axios.get(process.env.checktime)
    .then((response) => {
    console.log(response.data)
    return client.replyMessage(event.replyToken, 
      {
          "type":"text",
          "text":`stay ${response.data.stay_time} sec , move ${response.data.move_time} sec`
      });

    })
   
    
}

}

}


// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});