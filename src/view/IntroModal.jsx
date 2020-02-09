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
							<h2>Thanks!</h2>
							<p>
								Thanks for trying out my app! Please note that this
								is a <b>super early prototype</b>. To understand the basic idea,
								please see this video:
							</p>
							<p class="ml-4">
								<a href="https://www.facebook.com/li.mikael/videos/10157084270912339/"
										target="_blank" class="text-info">
									https://www.facebook.com/li.mikael/videos/10157084270912339/
								</a>
							</p>
							<p>
								There are also a few other things I would like to point out before
								you try it.
							</p>
							<ul>
								<li>
									Things will change and might not work as expected. Please don't get 
									attached to anything and don't get upset if it changes. Also, please
									promise that you will not lose hope, and give it another try later if
									there is something that isn't up to standard at this point.
								</li>
								<li>
									There is no documentation. If there is something that you
									don't understand, it is because I haven't yet thought through
									and tested the user interface. There is nothing wrong with your
									ability to understand, there is something wrong with the app.
								</li>
								<li>
									Even though this is going to be a mobile app eventually,
									at the moment it doesn't really work on mobiles at all. This is
									because this is just a very quick technology test at the moment.
								</li>
								<li>
									The built in instruments sound like shit. Or well, surprisingly
									they can actually be used to create music, but they sound nothing
									like they eventually will sound. Please have patience!
								</li>
								<li>
									At the moment, the songs created gets stored locally in your browser.
									This will also change, I'm envisioning a system whereby you can share
									the songs across several different devices, export them for usage in
									other programs, etc, etc. But nothing of this is in place yet. Also,
									the internal format that the app uses to save songs will probably change,
									which means that things you create now might not work in future versions
									of the app.
								</li>
							</ul>
							<p>
								That being said, please go ahead and test it! And again, please don't
								be too quick to pass judgement if there is something that is confusing
								or doesn't work. In this case, please reach out to me! Would love
								to have a chat!
							</p>
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
