import {Template} from 'meteor/templating'
import {Session} from 'meteor/session'

import {Users} from '../api/users.js';
import './body.html';
import './templates/main_form_template.html';

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
	this.layout('some_template');
	this.render('Users');
	this.render('UserAsides',{to:'main'});
})


//Save the user info to mongo
//@param email will hold the email
//@param password  will hold the users password
Template.login.events({
	'submit .login_form'(event){
		event.preventDefault();
		const target = event.target;
		const login_email = target.login_email.value;
		const login_password = target.login_password.value;
		console.log(login_email+" "+login_password);
		Meteor.loginWithPassword(login_email,login_password,(error)=>{
			if(error)
				console.log(error.reason);
			else
				{
					user_id =  Meteor.users.findOne({"emails.address":login_email});
					console.log(user_id._id);
					let url ="/" + user_id._id;
					Router.go(url);
				}
		});
	}
})
Template.sign_up.events({
	'submit .register_form'(event){
		event.preventDefault();
		const target = event.target;
		const email = target.register_email.value;
		const password = target.password.value;
		const verify_password = target.confirm_password.value;
		
		Accounts.createUser({
			email:email,
			password:password
		});
		console.log("You tried to register");

	}
})
