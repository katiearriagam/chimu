import React from 'react';
import '../../style/style.css';

import chimu from '../../images/tea-white.png';

class Home extends React.Component{
	render(){
		return(
			<div>
				<div id="landing">
					<div className="column-50 left image-logo">
						<img className="big-logo" alt="logo" src={chimu}/>
						<div className="big-title">Chimu</div>
					</div>
					<div className="column-50 right">
						<label className="slogan">Built for developers</label>
						<label className="short-chimu">Chimu is a platform to join connect the talent in the tech community. Join now to discover new exciting projects.</label>
					</div>
				</div>
				<div id="about">
					<div className="about-box">
						<div className="column-50 right image-logo about-chimu">About Chimu</div>
						<div className="column-50 right image-logo about-content">
							Chimu is a platform connected to GitHub to help developers find other members of the tech community to collaborate with fellow developers and designers in new projects. Chimiu allows you to share your ideas and turn them into reality by building the team you need. 
						</div>
					</div>
				</div>
				<div id="faq">
					<div className="column-50 left image-logo faq-box">
						<div className="faq-title">FAQ</div>
						<div className="faq-question">I don't see the register</div>
						<div className="faq-answer">Chimu is built for members of the tech community! As such, you can login directly using your GitHub account.</div>
						<div className="faq-question">How do I add a project?</div>
						<div className="faq-answer">Once you are logged in, you will see a + icon in the header. Click there to add a project.</div>
						<div className="faq-question">How do I join a project?</div>
						<div className="faq-answer">If you find a project that seems interesting, you can join by going to the project description and request to join.</div>
						<div className="faq-question">How do I improve my rating?</div>
						<div className="faq-answer">Ratings are assigned by project owners once they close the project. Make sure to collaborate and have a good team spirit that motivates project owners to give you good ratings! </div>
					</div>
				</div>
			</div>
		);
	}
}
export default Home;
