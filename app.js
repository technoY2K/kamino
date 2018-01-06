const Twitter = require('twitter')
require('dotenv').config()

// setup twitter client
const twitterClient = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.TOKEN_KEY,
  access_token_secret: process.env.TOKEN_SECRET,
})

let params = {
  q: '#rosebowl',
  count: 2,
  result_type: 'recent',
  lang: 'en'
}

twitterClient.get('search/tweets', params)
  .then(result => {
    let { statuses } = result

    statuses.forEach((status) => {
      let obj = { id: status.id_str }
      twitterClient.post('favorites/create', obj)
      .then(response => console.log(`The response is: ${response}`))
      .catch(err => console.error(`Liking had an error: ${err}`))
    })
  })
  .catch(error => console.log(error))
