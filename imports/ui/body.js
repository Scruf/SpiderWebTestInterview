import {Template} from 'meteor/templating'
import {Session} from 'meteor/session'

import {Users} from '../api/users.js';
import './body.html';
import './templates/main_form_template.html';
import './routes.js';



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
			if(error){
				console.log(error.reason);
				
				Router.go('/sign');
			}
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
				console.log(err);
			else{
					
		}
		});

	

	},
	//on click logout disconnect the users page
	'click .logout'(event){
		Meteor.logout((error)=>{
			//on error display the reason why
			if(error)
				console.log(error.reason);
		});
	}


})
//will presumabhly post to a facebook wall
Template.facebook_post.events({
//capture a click from a facebook post button
	'click #facebook_post'(event){
		event.preventDefault();
		//@param post_text will get the text from post_holder area
		const post_text = $('.post_holder').get(0).value;
		//require fbgraph
		const fb = require('fbgraph');
		//get @param id will hold the users facebook id to later be used in sending the post
		let id=Meteor.user().services.facebook.id;
		//get @param access_token will hold the users page access token so the app can post on the wall
		let access_token=Meteor.user().services.facebook.accessToken;
		//authorize fbgraph with page access token
		fb.setAccessToken(access_token);
		//@param wall_post will create a wall_post message object
		let wall_post = {
			message:post_text
		}
		// let node_fb = require('fb');
		// node_fb.setAccessToken(access_token);
		// node_fb.api('me/feed', 'post', { message: post_text }, function (res) {
  		
  // 			console.log('Post Id: ' + res.id);
		// });
		
		//post the messager using graph api
		fb.post("me/feed",wall_post,(err,response)=>{
			//on error the error will be thrown to let the user know what went wrong
			if(err)
				console.log(err.reason);
			else{
				//will display the users post id
				console.log(response)
			}
		});
		//will reset a text area back to default value
		$('.post_holder').get(0).value="";

	}
})
Template.facebook_sdk_post.events({
	'click #post'(event){
		event.preventDefault();
		$('.post_holder').get(0).value= " ";

	}
})


