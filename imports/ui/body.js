import {Template} from 'meteor/templating'
import {Session} from 'meteor/session'

import './body.html';

Router.route('/sign',function (){
	this.render('sign_in');
})

Router.route('/register',function (){
	this.render('sign_up');
})