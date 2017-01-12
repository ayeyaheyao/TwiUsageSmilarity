Template.home.helpers({
    smilarity: function(){
        var k = 0;
        var l = 0;
        k = Yuzde.find().fetch()[0].indis;
        l = Yuzde.find().fetch()[1].indis;
        a = Math.abs(k-l);
        if(a===0){
            k = 75;
        }
        if(a===1){
            k=50;
        }
        if(a===2){
            k=25;
        }
        if(a===3){
            k=0;
        }
        
        
        return k;
    },
    day1: function(){
        return Yuzde.find().fetch()[0].day
    },
    day2: function(){
        return Yuzde.find().fetch()[1].day
    },
    max1: function(){
        return Yuzde.find().fetch()[0].yuzde;
    },
    max2: function(){
        return Yuzde.find().fetch()[1].yuzde;
    },
    user1: function(){
        return Timezone.find().fetch()[0].name;
    },
    user2: function(){
        return Timezone.find().fetch()[1].name;
    },
    sabah1: function(){       
        return Timezone.find().fetch()[0].sabah;
    },
    oglen1: function(){       
        return Timezone.find().fetch()[0].oglen;
    },
    aksam1: function(){       
        return Timezone.find().fetch()[0].aksam;
    },
    gece1: function(){       
        return Timezone.find().fetch()[0].gece;
    },
    sabah2: function(){       
        return Timezone.find().fetch()[1].sabah;
    },
    oglen2: function(){       
        return Timezone.find().fetch()[1].oglen;
    },
    aksam2: function(){       
        return Timezone.find().fetch()[1].aksam;
    },
    gece2: function(){       
        return Timezone.find().fetch()[1].gece;
    },
    syzd1: function(){
        return Timezone.find().fetch()[0].s_yzd;
    },
    oyzd1: function(){
        return Timezone.find().fetch()[0].o_yzd;
    },
    ayzd1: function(){
        return Timezone.find().fetch()[0].a_yzd;
    },
    gyzd1: function(){
        return Timezone.find().fetch()[0].g_yzd;
    },
    syzd2: function(){
        return Timezone.find().fetch()[1].s_yzd;
    },
    oyzd2: function(){
        return Timezone.find().fetch()[1].o_yzd;
    },
    ayzd2: function(){
        return Timezone.find().fetch()[1].a_yzd;
    },
    gyzd2: function(){
        return Timezone.find().fetch()[1].g_yzd;
    },

});







        