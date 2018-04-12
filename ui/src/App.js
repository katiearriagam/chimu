import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import $ from 'jquery'; 

import request from 'request';

import GitHubLogin from './components/containers/GitHub/';
import GitHub from "github-api";

class App extends Component {
	onFailure(response) {
		console.error(response);
	}
	onSuccess(response) {
		// Get the access token here
		console.log("code -> " + response['code']);
		let jsonObject = {'code': response['code']};
		request.post({
			url: 'http://localhost/chimu/',
			form: jsonObject,
		}, (err, response, body) => {
			if(err){
				console.error("ERROR");
				console.error(err);
			}
			console.log("-------");
			console.log(response);
			console.log("-------");
			console.log(body);
			console.log("-------");
			console.log(JSON.parse(body)['access_token']);
			var gh = new GitHub({
				token: JSON.parse(body)['access_token']
			});

			var me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided

			me.listStarredRepos()
			   .then(function({data: reposJson}) {
			     console.log(`me has ${reposJson.length} repos!`);
			   });

			me.getProfile()
				.then(function({data:userProfile}){
					console.log(userProfile.login);
				});

		});
	}
	render() {
		console.log("Hello, this is my console");

		return (
			<div id="w">
				<div id="example">
					<GitHubLogin 
						clientId="6e245fffc482d35bca47"
						redirectUri="http://localhost:3000/oauthcb"
						onSuccess={this.onSuccess}
						onFailure={this.onFailure}
					/>
				</div>
				<h1>Simple Github API Webapp</h1>
				<p>Enter a single Github username below and click the button to display profile info via JSON.</p>
				<input type="text" name="ghusername" id="ghusername" placeholder="Github username..."/>
				<a href="#" id="ghsubmitbtn">Pull User Data</a>
				<div id="ghapidata" className="clearfix"></div>
			</div>
		);
	}
}
/*
$(document).ready(function () {
  console.log("hello load");



  function requestJSON(url, callback) {
	  $.ajax({
		url: url,
		complete: function(xhr) {
		  callback.call(null, xhr.responseJSON);
		}
	  });
	}

	$('#ghsubmitbtn').on('click', function(e){
	  console.log("hello world");
	  e.preventDefault();
	  $('#ghapidata').html('<div id="loader"><img src="css/loader.gif" alt="loading..."></div>');
	  
	  var username = $('#ghusername').val();
	  var requri   = 'https://api.github.com/users/'+username;
	  console.log(username);
	  var repouri  = 'https://api.github.com/users/'+username+'/repos';
	  
	  requestJSON(requri, function(json) {
		if(json.message == "Not Found" || username == '') {
		  $('#ghapidata').html("<h2>No User Info Found</h2>");
		}
		
		else {
		  // else we have a user and we display their info
		  var fullname   = json.name;
		  var username   = json.login;
		  var aviurl     = json.avatar_url;
		  var profileurl = json.html_url;
		  var location   = json.location;
		  var followersnum = json.followers;
		  var followingnum = json.following;
		  var reposnum     = json.public_repos;
		  
		  if(fullname == undefined) { fullname = username; }

		  var outhtml = '<h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</span></h2>';
		  outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username+'"></a></div>';
		  outhtml = outhtml + '<p>Followers: '+followersnum+' - Following: '+followingnum+'<br>Repos: '+reposnum+'</p></div>';
		  outhtml = outhtml + '<div class="repolist clearfix">';
				  var repositories;
		  $.getJSON(repouri, function(json){
			repositories = json;   
			outputPageContent();	
		  });          
		  
		  function outputPageContent() {
			if(repositories.length == 0) { outhtml = outhtml + '<p>No repos!</p></div>'; }
			else {
			  outhtml = outhtml + '<p><strong>Repos List:</strong></p> <ul>';
			  $.each(repositories, function(index) {
				outhtml = outhtml + '<li><a href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name + '</a></li>';
			  });
			  outhtml = outhtml + '</ul></div>'; 
			}
			$('#ghapidata').html(outhtml);
		  } // end outputPageContent()
		} // end else statement
	  }); // end requestJSON Ajax call
	}); // end click event handler
});
*/
export default App;

