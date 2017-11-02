var $status = $('#status');
var bestFriendId = 1;

//get Friends, then best friend latest post, hashtags in them
$.ajax({
    type:'GET',
    url: 'friends.json',
    dataType: 'json',
    success: function(friends){
        $('#list-of-friends').html(JSON.stringify(friends));
        //Get Best Friends Posts
        $.ajax({
            type:'GET',
            url:'posts.json',
            datatype:'json',
            success: getBestFriendsLatestPosts,
            error: errorHandler
        });
    },
    error:errorHandler
});

var getBestFriendsLatestPosts = function(allPosts){
        var bestFriendsPosts = getFriendsPosts(bestFriendId, allPosts);
        $('#best-friend').html(JSON.stringify(bestFriendsPosts));
        //Get bests friends latest posts hashtags
        $.ajax({
            type:'GET',
            url:'hashtags.json',
            dataType:'json',
            success: function(allHashTags){
                var bestFriendsLatestPostsHashTagIds = bestFriendsPosts.posts[0]['hashTags'];
                getHashTagsFromPost(bestFriendsLatestPostsHashTagIds, allHashTags);
            },
            error: errorHandler
        });
};

var getHashTagsFromPost = function(bestFriendsLatestPostsHashTagIds, allHashTags){
        var bestFriendHashTags = getHashTags(bestFriendsLatestPostsHashTagIds, allHashTags);
        $('#best-friend-latest-post-hashtags').html(JSON.stringify(bestFriendHashTags));
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

function errorHandler(xhr, status, error) {
  $status.append('<li>error:'+error.toString()+'</li>');
};
