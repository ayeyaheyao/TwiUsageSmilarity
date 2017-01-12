Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function(){
	// Home
	this.route('home', {
		path:'/',
		template: 'home'		
	});


});