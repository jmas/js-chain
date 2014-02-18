Chain.js - is extremely small JavaScript utility that can help you to create chain of async calls.

```javascript
// New chain
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

// Get text
chain.then(function(data) {
    var request = new XMLHttpRequest();

    request.open('GET', 'content.html', false);
    
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                data.text = this.responseText;
                chain.walk(data);
            } else {
                chain.fail("Can't load text!");
            }
        }
    };

    request.send(null);
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