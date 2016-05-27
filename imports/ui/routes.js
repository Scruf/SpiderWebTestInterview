Router.configure({
	layoutTempalte:'index'
})
Router.route('/',function(){
	this.render('main');
})
Router.route('/sign',function (){
	this.render('login');
})
Router.route('/register',function(){
	this.render('sign_up');
})
Router.route('/:_id',function(){
	this.render('User');
	
})