var Consumer = require('sqs-consumer');
var AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: '...',
    secretAccessKey: '...'
});

var listenerCount = 4;
var queueUrl = '...';
var endpointUrl = '...';

var pushMessage = function (postData) {
    var request = require('request');
    request({
        method: 'POST',
        preambleCRLF: true,
        postambleCRLF: true,
        uri: endpointUrl,
        body: postData
    });

};

var configure = function() {
    var app = Consumer.create({
        queueUrl: queueUrl,
        handleMessage: function (message, done) {
            pushMessage(message.Body);
            done();
        }
    });
    app.start();
};

var listeners = 0;

while (listeners++ < listenerCount) {
    configure();
}