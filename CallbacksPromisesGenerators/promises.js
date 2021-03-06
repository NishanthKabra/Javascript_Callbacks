var bestFriendId = 1;

//get all Friends - > get your best friend's latest post -> get hashtags of that post

var getAllFriends = $.ajax({type: 'GET', url: 'friends.json'});
var getAllPosts = $.ajax({type: 'GET', url: 'posts.json'});
var getAllHashTags =  $.ajax({type: 'GET', url: 'hashtags.json'});
    var bestFriendsLatestPostsHashTagIds;

getAllFriends.then(function(friends){
    $('#list-of-friends').html(JSON.stringify(friends));
}).then(function(){
    return getAllPosts.then(function(allPosts){
        var bestFriendsPosts = getFriendsPosts(bestFriendId, allPosts);
        $('#best-friend').html(JSON.stringify(bestFriendsPosts));
        var bestFriendsLatestPostsHashTagIds = bestFriendsPosts.posts[0]['hashTags'];
        return bestFriendsLatestPostsHashTagIds;
    });
}).then(function(bestFriendsLatestPostsHashTagIds){
    getAllHashTags.then(function(allHashTags){
        var bestFriendHashTags = getHashTags(bestFriendsLatestPostsHashTagIds, allHashTags);
        $('#best-friend-latest-post-hashtags').html(JSON.stringify(bestFriendHashTags));
    })
}, errorHandler);

function errorHandler(xhr, status, error) {
  $('#status').append('<li>error:'+error.toString()+'</li>');
};

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

