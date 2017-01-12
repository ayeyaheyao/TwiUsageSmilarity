Template.navbar.events({
    'click #home': function(event){
        $('#tablo').hide();
            
        $('.submit1_user').fadeIn();
        $('.submit2_user').fadeIn();
        $('.submit_tweet1').fadeIn();
        $('.submit_tweet2').fadeIn();
        $('.show-result').fadeIn();
        $('#user-panel').hide();
        
        Meteor.call('removeAllYuzde');
        Meteor.call('removeAllTweets');
        Meteor.call('removeAllTimezone');
        Meteor.call('removeAllUsers');
        

    }
});



