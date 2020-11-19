/* eslint-disable prefer-arrow-callback */
/* eslint-disable promise/always-return */
'use strict';

const axios = require('axios').default;

// Add a valid subscription key and endpoint to your environment variables.
let subscriptionKey = 'cfe6f6165e2e4f0785d5f58300780130'
let endpoint = 'https://brazilsouth.api.cognitive.microsoft.com' + '/face/v1.0/detect'

// Optionally, replace with your own image URL (for example a .jpg or .png URL).
let imageUrl = 'https://firebasestorage.googleapis.com/v0/b/rumi-acdfa.appspot.com/o/test.jpg'

// Send a POST request
axios({
    method: 'post',
    url: 'https://brazilsouth.api.cognitive.microsoft.com' + '/face/v1.0/detect?returnFaceId=true',
    params : {
        detectionModel: 'detection_02',
        returnFaceId: true
    },
    data: {
        'url': 'https://firebasestorage.googleapis.com/v0/b/rumi-acdfa.appspot.com/o/test.jpg',
    },
    headers: { 'Ocp-Apim-Subscription-Key': 'cfe6f6165e2e4f0785d5f58300780130' }
}).then(function (response) {
    // console.log('Status text: ' + response.status)
    // console.log('Status text: ' + response.statusText)
    // console.log()
    console.log(response.data)
}).catch(function (error) {
    console.log(error)
});