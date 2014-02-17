Chain.js - is extremely small JavaScript utility that can help you to create chain of async calls.

```javascript
var chain = new Chain;

// Get common image
chain.then(function(data) {
    var image = new Image;
    image.onload = function() {
        data.image = this;
        chain.walk(data);
    };
    image.onerror = function() {
        chain.fail("Can't load image!");
    };
    image.src = 'Wiki.png';
});

// Crop image
chain.then(function(data) {
    var request = new Request;

    request.onend = function() {
        data.request = this.getData();
    };
    request.onfail = function() {
        chain.fail("Can't load request data!");
    };
});

chain.onend = function(data) {
    console.log('onend. data: ', data);
};

chain.onwalk = function(data) {
    console.log('onwalk. data: ', data);
};

chain.onfail = function(error) {
    console.log('onfail. error: ', error);
};

// Start walk with data = {}
chain.walk({});
```