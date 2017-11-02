//Generators are cool!!!!
var bestFriendId = 1;

//get all Friends - > get your best friend's latest post -> get hashtags of that post

Promise.coroutine(function* () {
  var allFriends = yield $.get('friends.json');
  $('#list-of-friends').html(JSON.stringify(allFriends));
  
  var allPosts = yield $.get('posts.json');
  var bestFriendsPosts = getFriendsPosts(bestFriendId, allPosts);
  var bestFriendsLatestPostsHashTagIds = bestFriendsPosts.posts[0]['hashTags'];
  $('#best-friend').html(JSON.stringify(bestFriendsPosts));
  
  var allHashTags = yield $.get('hashtags.json');
  var bestFriendHashTags = getHashTags(bestFriendsLatestPostsHashTagIds, allHashTags);
  $('#best-friend-latest-post-hashtags').html(JSON.stringify(bestFriendHashTags));
  
})().catch(function(errs) {
  $('#status').append('<li>error:'+errs.toString()+'</li>');
})

var getFriendsPosts = function(id, allPosts){
    var friendsPosts;
    for (var i = 0; i < allPosts.length; i++) {
        if (allPosts[i]['userid'] == id) return allPosts[i];
    }
    return null;
};

var getHashTags = function(hashTagIds, allHashTags){
    var hashes = [];
    for(var i = 0; i < hashTagIds.length; i++){
        allHashTags.forEach(function(hashTag) {
            if(hashTag['id'] == hashTagIds[i]) {
                var key = hashTag['name'];
                hashes.push(key);
            }
        }, this);
    };
    return hashes;
};