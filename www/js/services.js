angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = 
  [{
	id: 0,
	name: 'Ben Sparrow',
	lastText: 'You on your way?',
	face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
	id: 1,
	name: 'Max Lynx',
	lastText: 'Hey, it\'s me',
	face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
	id: 2,
	name: 'Adam Bradleyson',
	lastText: 'I should buy a boat',
	face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
	id: 3,
	name: 'Perry Governor',
	lastText: 'Look at my mukluks!',
	face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }, {
	id: 4,
	name: 'Mike Harrington',
	lastText: 'This is wicked good ice cream.',
	face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
	all: function() {
	  return chats;
	},
	remove: function(chat) {
	  chats.splice(chats.indexOf(chat), 1);
	}
  };
})

.factory('ContactsBase',  function(){
	// Returns icon name for resources
	var IconsDict={
		'facebook' : 'icon ion-social-facebook-outline',
		'twitter' : 'icon ion-social-twitter-outline',
		'github' : 'icon ion-social-github-outline',
		'instagram' : 'icon ion-social-instagram-outline',
		'phone_home' : 'icon ion-ios-telephone-outline',
		'linkedin' : 'icon ion-social-linkedin-outline',
		'twitch' : 'icon ion-social-twitch-outline',
		'googleplus' : 'icon ion-social-googleplus-outline',
		'snapchat' : 'icon ion-social-snapchat-outline',
		'whatsapp' : 'icon ion-social-whatsapp-outline',
		'pinterest' : 'icon ion-social-pinterest-outline',
		'foursquare' : 'icon ion-social-foursquare-outline',
		'skype' : 'icon ion-social-skype-outline',
		'vimeo' : 'icon ion-social-vimeo-outline',
		'dribble' : 'icon ion-social-dribbble-outline'
	}

	return {
		iconByResource: function(resource){
			return IconsDict[resource]
		}
		
	};
});
