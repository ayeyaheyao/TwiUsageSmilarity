if(Meteor.isClient){
    

    Template.gettweet.helpers({
        users: function(){
            return Users.find({}, {    
            });
        } 
     });

     Template.gettweet.events({
         
        "submit .submit1_user": function(event){        
            
            var name1 = event.target.name1.value;                
            Users.insert({
                name: name1
            });
            
            event.target.name1.value = "";

        },
        

        "submit .submit2_user": function(event){
            var name2 = event.target.name2.value;
            Users.insert({
                name: name2
            });
            event.target.name2.value = "";
            Router.go('/');
        },

        "submit .submit_tweet1": function(event){            
            Meteor.call('getTweets1', function(err,res){
                if(err){
                    console.log(err);
                } else {                               
                        
                        
                    }
                });

                Router.go('/');
        },
        "submit .submit_tweet2": function(event){            
            Meteor.call('getTweets2', function(err,res){
                if(err){
                    console.log(err);
                } else {                               
                        
                        
                    }
                });

                Router.go('/');
        },
        
        'click .show-result': function(event){
            $('#tablo').fadeIn();
            
            $('.submit1_user').hide();
            $('.submit2_user').hide();
            $('.submit_tweet1').hide();
            $('.submit_tweet2').hide();
            $('.show-result').hide();
            $('#user-panel').fadeIn();
        }   
    });
}

if(Meteor.isServer){
    Meteor.startup(function () {
        console.log("Hi from server !");
        Meteor.methods({
            getTweets1: function(){
                

                var Twit = require('twit');
                var config = require('./config.js');

                var T = new Twit(config);               
                                             
                var params = {                            
                    screen_name: Users.find().fetch()[0].name,
                    
                    count: 200   
                };
                    
                T.get('statuses/user_timeline', params, Meteor.bindEnvironment(function(err, data, response){
                    var cnt = 0 ;
                    tweets = data;
                    var day_cnt = [0, 0, 0, 0];
                    var yzd = [0, 0, 0, 0];
                    var days= ["Morning", "Midday", "Evening", "Night"];
                                               
                    for(var i = 0 ; i < tweets.length ; i++){                                                            
                        
                        var ts = tweets[i].created_at[11]+tweets[i].created_at[12];
                        ts = Number(ts);                           
                        if(ts>6 && ts<12){
                            day_cnt[0]++;
                            Tweets.insert({
                                name: tweets[i].user.screen_name,
                                tweet: tweets[i].text,
                                real_date: tweets[i].created_at,
                                date: ts,
                                sabah: true,
                                oglen: false,
                                aksam: false,
                                gece: false                                       
                            });    
                        }
                        if(ts>11 && ts<18){
                            day_cnt[1]++;
                            Tweets.insert({
                                name: tweets[i].user.screen_name,
                                tweet: tweets[i].text,
                                real_date: tweets[i].created_at,
                                date: ts,
                                sabah: false,
                                oglen: true,
                                aksam: false,
                                gece: false                                       
                            });    
                        }
                        if(ts>17 && ts<23){
                            day_cnt[2]++;
                            Tweets.insert({
                                name: tweets[i].user.screen_name,
                                tweet: tweets[i].text,
                                real_date: tweets[i].created_at,
                                date: ts,
                                sabah: false,
                                oglen: false,
                                aksam: true,
                                gece: false                                       
                            });    
                        }
                        if(ts===23){
                            day_cnt[3]++;
                            Tweets.insert({
                                name: tweets[i].user.screen_name,
                                tweet: tweets[i].text,
                                real_date: tweets[i].created_at,
                                date: ts,
                                sabah: false,
                                oglen: false,
                                aksam: false,
                                gece: true                                       
                            });    
                        }
                        if(ts>=0 && ts <7){
                            day_cnt[3]++;
                            Tweets.insert({
                                name: tweets[i].user.screen_name,
                                tweet: tweets[i].text,
                                real_date: tweets[i].created_at,
                                date: ts,
                                sabah: false,
                                oglen: false,
                                aksam: false,
                                gece: true                                       
                            });    
                        }
                    
                    }                   
                    cnt = day_cnt[0]+day_cnt[1]+day_cnt[2]+day_cnt[3];
                    for(var i=0; i<day_cnt.length;i++){
                        yzd[i] = day_cnt[i]*100;
                        yzd[i] = parseInt(yzd[i]/cnt);
                    }
                    
                    Timezone.insert({
                        name: tweets[0].user.screen_name,
                        sabah: day_cnt[0],
                        oglen: day_cnt[1],
                        aksam: day_cnt[2],
                        gece: day_cnt[3],
                        cnt: cnt,
                        s_yzd: yzd[0],
                        o_yzd: yzd[1],
                        a_yzd: yzd[2],
                        g_yzd: yzd[3]
                    });
                    var yzd1 = [];
                    for(var i =0;i<4;i++){
                        yzd1[i]=yzd[i];
                    }

                    yzd1.sort(function(a, b) {
                    return a - b;
                    });
                    console.log(yzd1[3]);
                    var j;
                    var i=0;
                    var buldu = 0;
                    while(i<4 && buldu === 0){
                        if(yzd[i] == yzd1[3]){
                            j = i;
                            buldu = 1;
                        }
                        i++;
                    }

                    Yuzde.insert({
                        yuzde: yzd1[3],
                        day: days[j],
                        indis: j
                    });

 
                }));
                        
                       
                        
                             

                                               
                
            },
            getTweets2: function(){
                

                var Twit = require('twit');
                var config = require('./config.js');

                var T = new Twit(config);               
                                             
                var params = {                            
                    screen_name: Users.find().fetch()[1].name,
                    
                    count: 200   
                };
                    
                T.get('statuses/user_timeline', params, Meteor.bindEnvironment(function(err, data, response){
                    
                    tweets = data;
                    var day_cnt = [0, 0, 0, 0];
                    var yzd = [0, 0, 0, 0];                         
                    var cnt = 0;
                    var days= ["Morning", "Midday", "Evening", "Night"];
                    for(var i = 0 ; i < tweets.length ; i++){                                                            
                        
                        var ts = tweets[i].created_at[11]+tweets[i].created_at[12];
                        ts = Number(ts);                           
                        if(ts>6 && ts<12){
                            day_cnt[0]++;
                            Tweets.insert({
                                name: tweets[i].user.screen_name,
                                tweet: tweets[i].text,
                                real_date: tweets[i].created_at,
                                date: ts,
                                sabah: true,
                                oglen: false,
                                aksam: false,
                                gece: false                                       
                            });    
                        }
                        if(ts>11 && ts<18){
                            day_cnt[1]++;
                            Tweets.insert({
                                name: tweets[i].user.screen_name,
                                tweet: tweets[i].text,
                                real_date: tweets[i].created_at,
                                date: ts,
                                sabah: false,
                                oglen: true,
                                aksam: false,
                                gece: false                                       
                            });    
                        }
                        if(ts>17 && ts<23){
                            day_cnt[2]++;
                            Tweets.insert({
                                name: tweets[i].user.screen_name,
                                tweet: tweets[i].text,
                                real_date: tweets[i].created_at,
                                date: ts,
                                sabah: false,
                                oglen: false,
                                aksam: true,
                                gece: false                                       
                            });    
                        }
                        if(ts===23){
                            day_cnt[3]++;
                            Tweets.insert({
                                name: tweets[i].user.screen_name,
                                tweet: tweets[i].text,
                                real_date: tweets[i].created_at,
                                date: ts,
                                sabah: false,
                                oglen: false,
                                aksam: false,
                                gece: true                                       
                            });    
                        }
                        if(ts>=0 && ts <7){
                            day_cnt[3]++;
                            Tweets.insert({
                                name: tweets[i].user.screen_name,
                                tweet: tweets[i].text,
                                real_date: tweets[i].created_at,
                                date: ts,
                                sabah: false,
                                oglen: false,
                                aksam: false,
                                gece: true                                       
                            });    
                        }
                    
                    }
                    
                    cnt = day_cnt[0]+day_cnt[1]+day_cnt[2]+day_cnt[3];
                    for(var i=0; i<day_cnt.length;i++){
                        yzd[i] = day_cnt[i]*100;
                        yzd[i] = parseInt(yzd[i]/cnt);
                    }
                    
                    Timezone.insert({
                        name: tweets[0].user.screen_name,
                        sabah: day_cnt[0],
                        oglen: day_cnt[1],
                        aksam: day_cnt[2],
                        gece: day_cnt[3],
                        cnt: cnt,
                        s_yzd: yzd[0],
                        o_yzd: yzd[1],
                        a_yzd: yzd[2],
                        g_yzd: yzd[3]
                        
                    });
                    var yzd1 = [];
                    for(var i =0;i<4;i++){
                        yzd1[i]=yzd[i];
                    }

                    yzd1.sort(function(a, b) {
                    return a - b;
                    });
                    console.log(yzd1[3]);
                    var j;
                    var i=0;
                    var buldu = 0;
                    while(i<4 && buldu === 0){
                        if(yzd[i] == yzd1[3]){
                            j = i;
                            buldu = 1;
                        }
                        i++;
                    }

                    Yuzde.insert({
                        yuzde: yzd1[3],
                        day: days[j],
                        indis: j
                    });                           

                        
                }));
           
            },
            removeAllYuzde: function() {

                return Yuzde.remove({});

            },
            removeAllTweets: function() {

                return Tweets.remove({});

            },
            removeAllUsers: function() {

                return Users.remove({});

            },
            removeAllTimezone: function() {

                return Timezone.remove({});

            }
        })      
    });
}