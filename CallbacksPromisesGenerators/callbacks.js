var bestFriendId = 1;

//get all Friends - > get your best friend's latest post -> get hashtags of that post
$.ajax({
    type:'GET',
    url: 'data_friends.json',
    dataType: 'json',
    success: function(friends){
        $('#list-of-friends').html(JSON.stringify(friends));
        //Get Best Friends Posts
        $.ajax({
            type:'GET',
            url:'data_posts.json',
            datatype:'json',
            success: function(allPosts){
                var bestFriendsPosts = getFriendsPosts(bestFriendId, allPosts);
                $('#best-friend').html(JSON.stringify(bestFriendsPosts));
                //Get bests friends latest posts hashtags
                $.ajax({
                    type:'GET',
                    url:'data_hashtags.json',
                    dataType:'json',
                    success: function(allHashTags){
                        var bestFriendsLatestPostsHashTagIds = bestFriendsPosts.posts[0]['hashTags'];
                        var bestFriendHashTags = getHashTags(bestFriendsLatestPostsHashTagIds, allHashTags);
                        $('#best-friend-latest-post-hashtags').html(JSON.stringify(bestFriendHashTags));
                    },
                    error: function(err){
                        $('#status').append('<li>error:'+err.toString()+'</li>');
                    }
                });
            },
            error: function(err){
                $('#status').append('<li>error:'+err.toString()+'</li>');
            }
        });
    },
    error: function(xhr, status, err){
        $('#status').append('<li>error:' + err.toString() + '</li>');
    }
});

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
