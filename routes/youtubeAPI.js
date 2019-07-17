const request = require('request');
const Databox = require('databox');
const config = require('../configurations/index');

// Databox client token for pushing metrics
const client = new Databox({
    push_token: config.databox.push_token,
});

// Defined path to our api url
const youTubeData = {
    url: 'https://www.googleapis.com/youtube/v3/channels?part=statistics&id=' + config.api.youtube.youtubeID + '&key=' + config.api.youtube.apiKey,
    json: true,
}

// Calling our path with request
console.log('Get data from youtube')
request(youTubeData, function(err, res, body){
    // Save numer of subscribers, comments, videos and views to our constant
    const subs = body.items[0].statistics.subscriberCount
    const comments = body.items[0].statistics.commentCount
    const videos = body.items[0].statistics.videoCount
    const view = body.items[0].statistics.viewCount
    
    // Send metrics right away
    console.log('Immidietly send saved data to databox');
    setImmediate(() => {

        // Send data to databox
        client.insertAll([
            {
                key: 'Subscribers',
                value: subs,
            },
            {
                key: 'Comments',
                value: comments,
            },
            {
                key: 'Videos',
                value: videos,
            },
            {
                key: 'View count',
                value: view,
            }
        ]);
    });
    
    // Send metrics every hour
    console.log('Send saved data every hour');
    function intervalFunc(){
        request(youTubeData, function(err, res, body){
            // Save numer of subscribers, comments, videos and views to our constant
            const subs = body.items[0].statistics.subscriberCount
            const comments = body.items[0].statistics.commentCount
            const videos = body.items[0].statistics.videoCount
            const view = body.items[0].statistics.viewCount

            // Send data to databox
            console.log('Send data to databox hourly');
        client.insertAll([
            {
                key: 'Subscribers',
                value: subs,
            },
            {
                key: 'Comments',
                value: comments,
            },
            {
                key: 'Videos',
                value: videos,
            },
            {
                key: 'View count',
                value: view,
            }
        ]);
            
        })
    } setInterval(intervalFunc, 5000);

});