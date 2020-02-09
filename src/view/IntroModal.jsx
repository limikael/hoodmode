import { h, Component } from 'preact';

export default class IntroModal extends Component {
	componentDidMount=()=>{
		$(this.base).modal('show');
		$(this.base).on('hidden.bs.modal', this.props.onClose);
	}

	render() {
		return (
			<div className="modal fade intro-modal">
				<div className="modal-dialog modal-lg">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title">Hoodmode</h4>
							<button type="button"
									className="close"
									data-dismiss="modal"
									aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<h2>Need your honest feedback!</h2>
							<p>
								This is a super early prototype of my app. It is a tool for 
								musicians to play around with rhythm, baselines and chords in a 
								live setting. Here is a <a 
										href="https://www.facebook.com/li.mikael/videos/10157084270912339/"
										target="_blank" class="text-info">
									video
								</a> to explain the basic idea.
								At the moment, the prototype is a bit messy and is not really
								straightforward to use. This is where you come in!
							</p>
							<h3>Just tell me this</h3>
							<ol>
								<li>Do you get the basic idea?</li>
								<li>Are you able to get the app to make any sound?</li>
								<li>How can the app be improved?</li>
							</ol>
							<p>
								Any feature suggestions and comments are welcome!
							</p>
							<h3>Things to keep in mind</h3>
							<ul>
								<li>
									<b>There is no documentation.</b><br/> Just click around and explore,
									don’t be afraid to break it! If something seems broken, tell me about it!
								</li>
								<li>
									<b>Not a mobile app yet.</b><br/> Even though this is going to be a mobile 
									app eventually, at the moment it doesn't really work on mobiles 
									at all. This is because this is just a very quick technology
									test at the moment.
								</li>
								<li>
									<b>The built-in instruments sound like shit.</b><br/> Or well, surprisingly 
									they can actually be used to create music, but they sound 
									nothing like they eventually will sound. 
								</li>
								<li>
									<b>Tracks are not downloadable for now.</b><br/> At the moment, the tracks
									created get stored locally in your browser. This will also change,
									I'm envisioning a system whereby you can share the songs/tracks
									across several different devices, export them for usage in other
									programs, etc, etc. But nothing of this is in place yet.
								</li>
								<li>
									<b>Features will change fast.</b><br/> If you potentially start using
									the app, please don't get attached to anything and don't get
									upset if it changes. Also, promise that you will not lose hope, 
									and give it another try later if there is something that isn't
									up to standard at this point.
								</li>
							</ul>
							<h3>Reach me via</h3>
							<p class="ml-4">
								Email:
								<a href="mailto:li.mikael@gmail.com" target="_blank" class="text-info ml-2">
									li.mikael@gmail.com
								</a>
								<br/>
								Facebook:
								<a href="https://www.facebook.com/li.mikael" target="_blank" class="text-info ml-2">
									https://www.facebook.com/li.mikael
								</a>
							</p>
							<p>Or put your comments as a reply to <a 
									href="https://www.facebook.com/li.mikael/videos/10157084270912339/"
									target="_blank" class="text-info">
								this</a> facebook post.
							</p>
							<p>Thanks for trying out my app!</p>
							<p>// Micke</p>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-primary"
									data-dismiss="modal">
								Let's Go!
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
