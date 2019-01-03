$(document).ready(function() {
	function populateList() {
		// Store a reference to the list of streams
		const streams = document.querySelector("#streamsList");
		// Reset list of streams
		streams.innerHTML = "";
		var asyncCount = 0;
		for(var count = 0; count < usernames.length; count++) {
			userInfoEndpoint = "https://wind-bow.glitch.me/twitch-api/users/" + usernames[count];
			// AJAX call to store user information into list
			$.ajax({
				url: userInfoEndpoint,
				method: "GET",
				dataType: "json",
				cache: false,
				async: false,
				success: function(data){
					console.log("Testing AJAX call on username: " + data.display_name + " " + data.bio + " " + data._links.self);
					var userInfo = [data.display_name, data.bio, data.name];
					if(userInfo[0] == null) {
						userInfo[0] = usernames[count];
					}
					if(userInfo[1] == null) {
						userInfo[1] = "";
					}
					users.push(userInfo);
					streams.insertAdjacentHTML("beforeend",
						`<a href="https://www.twitch.tv/${users[asyncCount][2]}" target="_blank" rel="noreferrer">
							<div class="stream">
								<div id="item${asyncCount}" class="row">
									<div class="col-2 image-container">
										<img class="streamLogo" src="${data.logo}"/>
									</div>
									<div class="col-8">
										<h3 class="streamTitle">${users[asyncCount][0]}</h3>
										<p class="streamBio">${users[asyncCount][1]}</p>
									</div>
								</div>
			      			</div>
			      		</a>`
		    		);
		    		asyncCount++;
				}
			});
		}
	}

	function getOnlineStatus() {
		var asyncCount = 0;
		for(var count = 0; count < usernames.length; count++) {
			onlineStatusEndpoint = "https://wind-bow.glitch.me/twitch-api/streams/" + usernames[count];
			// AJAX call to categorize each user as Online or Offline
			$.ajax({
				url: onlineStatusEndpoint,
				method: "GET",
				dataType: "json",
				cache: false,
				async: false,
				success: function(data){
					console.log("Testing link value: " + data._links.self);
					var user = document.querySelector(`#item${asyncCount}`);
					if(data.stream == null) {
						console.log("Testing stream status: " + data.stream);
						user.insertAdjacentHTML("beforeend",
							`<div class="col-2">
								<h4 class="offline">&otimes;</h4>
							</div>`
						);
					}
					else {
						console.log("Testing stream status: " + data.stream.channel.status);
						user.insertAdjacentHTML("beforeend",
							`<div class="col-2">
								<h4 class="online">&check;</h4>
							</div>`
						);
					}
					asyncCount++;
				}
			});
		}
	}

	function searchList() {
		$(".stream").css("display", "none");
		var query = $(this).val();
		$(".stream:contains('" + query + "')").css("display", "block");
	}

	function filterAll() {
		$(".stream").css("display", "block");
	}

	function filterOnline() {
		$(".offline").parents(".stream").css("display", "none");
		$(".online").parents(".stream").css("display", "block");
	}

	function filterOffline() {
		$(".online").parents(".stream").css("display", "none");
		$(".offline").parents(".stream").css("display", "block");
	}
	
	// List of usernames to be used for Twitch API calls
	const usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
	var users = [];
	populateList();
	getOnlineStatus();
	document.querySelector(".searchFormInput").addEventListener("input", searchList);
	document.querySelector("#all").addEventListener("click", filterAll);
	document.querySelector("#online").addEventListener("click", filterOnline);
	document.querySelector("#offline").addEventListener("click", filterOffline);
});
