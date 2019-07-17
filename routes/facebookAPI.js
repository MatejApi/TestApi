const request = require ('request');
const Databox = require('databox');
const config = require('../configurations/index');

// List of metrics that we will take out from our request
const userFieldSet = 'id, name, friends, email, link, feed';

// Databox client token for pushing metrics
const client = new Databox({
    push_token: config.databox.push_token,
});

// Sending request with our client id and secret so we can get App token
request({
    uri: 'https://graph.facebook.com/oauth/access_token?client_id=' + config.oauth.facebook.clientID + '&client_secret=' + config.oauth.facebook.clientSecret + '&grant_type=client_credentials',
    json: true,
}, function(res, body, data){
    // Saving app token into our constant
    const appToken = data.access_token;

    // Sending request with app token that we got and our list of metrics that we wanna use
    console.log('Geting data from facebook')
    request({
        uri: 'https://graph.facebook.com/' + config.oauth.facebook.userID,
        json: true,
        qs: {
            access_token: appToken,
            fields: userFieldSet
        }
    }, function(req, res, body){
        // Saving friends count from body that we got with response to our field request
        const fbFriends = body.friends.summary.total_count;
            
        // Send data to databox
        console.log('Send facebook data to databox')
            client.push({
                key: 'Friends',
                value: fbFriends,
            });
    });
});