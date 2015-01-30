var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
/*post model*/
var Post = mongoose.model('Post', {
    title: String,
    tag: String,
    content: String,
    cTime: Date,
    uTime: Date
});

exports.Post = Post;