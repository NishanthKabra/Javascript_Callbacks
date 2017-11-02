var $status = $('#status');
var bestFriendId = 1;

//get Friends, then best friend latest post, hashtags in them
$.ajax({
    type:'GET',
    url: 'friends.json',
    dataType: 'json',
    success: function(friends){
        console.log(friends);
        $('#list-of-friends').html(JSON.stringify(friends));
        //Get Best Friends Posts
        $.ajax({
            type:'GET',
            url:'posts.json',
            datatype:'json',
            success: function(allPosts){
                console.log(allPosts);
                var bestFriendsPosts = getFriendsPosts(bestFriendId, allPosts);
                $('#best-friend').html(JSON.stringify(bestFriendsPosts));
                //Get bests friends latest posts hashtags
                $.ajax({
                    type:'GET',
                    url:'hashtags.json',
                    dataType:'json',
                    success: function(allHashTags){
                        console.log(allHashTags);
                        var bestFriendsLatestPostsHashTagIds = bestFriendsPosts.posts[0]['hashTags'];
                        var bestFriendHashTags = getHashTags(bestFriendsLatestPostsHashTagIds, allHashTags);
                        $('#best-friend-latest-post-hashtags').html(JSON.stringify(bestFriendHashTags));
                    },
                   error: function(err){
                        $status.append('<li>error:'+err.toString()+'</li>');
                    }
                });
            },
            error: function(err){
                $status.append('<li>error:'+err.toString()+'</li>');
            }
        });
    },
    error: function(xhr, status, err){
        $status.append('<li>error:' + err.toString() + '</li>');
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
