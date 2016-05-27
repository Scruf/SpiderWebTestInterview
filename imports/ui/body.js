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
	this.render('User');
	
})


//Logs the user in the system
//@param email will hold the email
//@param password  will hold the users password
Template.login.events({
	'submit .login_form'(event){
		event.preventDefault();
		const target = event.target;
		//get the email from login_email field
		const login_email = target.login_email.value;
		//get the password from the password field
		const login_password = target.login_password.value;
		//logs the user with email and password
		//@params login_email users email
		//@param login_password users password
		//@callback takes an erro to see if the credentials are valid
		Meteor.loginWithPassword(login_email,login_password,(error)=>{
			//on error displays the error reason
			if(error)
				console.log(error.reason);
			//otherwise uses users email and password to retrieve users id

			else
				{
					//@user_id will hold the userid which will be returned after query search
					user_id =  Meteor.users.findOne({"emails.address":login_email});
					//@url will create a url for router to redirect
					let url ="/" + user_id._id;
					//redirect user to his/her page
					Router.go(url);
				}
		});
	}
})

//saves the user to Mongo
Template.sign_up.events({
	//on submit request get the usrs password and email
	'submit .register_form'(event){
		event.preventDefault();
		const target = event.target;
		//@param email  is the users email
		const email = target.register_email.value;
		//@param password = is the usrs pasword
		const password = target.password.value;
		//@param verify password to verify the password
		const verify_password = target.confirm_password.value;
		//saves the user to mongo with @email and @password
		Accounts.createUser({
			email:email,
			password:password
		});
		

	}
})

//when the user is redirected to his/her page user will be provided with option to connect
//disconnect his/her page
Template.facebook_login.events({
	//on click log the user to facebook
	'click .login'(event){

		Meteor.loginWithFacebook({},(err)=>{
			//on error display the reason 	
			if(err)
				console.log(err.reason);
			else{
				// let fb = require('fbgraph');
				
				// let request = require('request');
				// let id=Meteor.user().services.facebook.id;

				// let access_token=Meteor.user().services.facebook.accessToken;
				// fb.setAccessToken(access_token);
				// request('https://graph.facebook.com/v2.0/1146859232035537/feed?access_token=EAADXuS6OFZBYBAIetbOcu8Ds7QDp7RTkCsUB1lvyqopbwq1do2L2JlC6XGEV4oH8QfcwS7U6lY1gMTZB5AmCUvb1q48ZA535xXm79VYj37pny2PivxrrxBO3DjiyODDh82YB9cQIjhSZCWD6v89slO3j4ZB57W7IXClbLYTFYN1797FlZA5dia',(error,response,body)=>{
				// 	if(error)
				// 		throw error;
				// 	else{
				// 		console.log(response.content);
				// 		console.log("----------------------");
				// 		console.log(body);
				// 	} 
				// })
				// // fb.post(id+"/feed?access_token="+access_token,function(error,response){
				// // 	if(error)
				// // 		console.log(error.reason);
				// // 	else
				// // 		console.log(response);
				// // })
				

			
		}
		});

	

	},
	//on click logout disconnect the users page
	'click #logout'(event){
		Meteor.logout((error)=>{
			//on error display the reason why
			if(error)
				console.log(error.reason);
		});
	}


})

Template.facebook_post.events({

	'click #facebook_post'(event){
		event.preventDefault();
		const post_text = $('.post_holder').get(0).value;
		const fb = require('fbgraph');
		let id=Meteor.user().services.facebook.id;
		let access_token=Meteor.user().services.facebook.accessToken;
		fb.setAccessToken(access_token);
		let wall_post = {
			message:post_text
		}

		fb.post(id+"/feed",wall_post,(err,response)=>{
			if(err)
				throw err;
			else
				console.log(response)
		});
		$('.post_holder').get(0).value="";

	}
})


