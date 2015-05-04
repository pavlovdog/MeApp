angular.module('starter.controllers', ['ionic','firebase'])



.controller('DashCtrl', ['$scope','$ionicPopup','$timeout','$firebaseObject','$firebaseArray',
	function($scope,$ionicPopup,$firebaseObject,$firebaseArray) {
		
		// Syncing to firebase
		var ref = new Firebase("https://meappionic.firebaseio.com/pavlovdog/");
		var syncObject = $firebaseArray(ref); 
		syncObject.$bindTo($scope, "contacts");

		// Local list of contacts for debugging
		// $scope.contacts={
		// 	twitter: '@pavlovdog',
		// 	facebook: 'facebook.pavlovdog.com',
		// 	github: 'pavlovdog@github.com',
		// 	instagram: '#pavlovdog',
		// 	phone_home: '8-(916)-123-23-57',
		// };


		// Returns icon name for resources
		$scope.iconByResource = function(resourse){
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

			return IconsDict[resourse]
		};

		// Confirm message to delete
		$scope.ShowConfirm = function(resource) {
			var confirmPopup = $ionicPopup.confirm({
				title: 'Are you sure?',
				cancelText: 'No',
				okText: 'Yes'     
			});

			confirmPopup.then(function(res) {
				if(res) {
					delete $scope.contacts[resource]
				} else {
					console.log('Nope');
				}
			});
		};

		// Edit alert for contact, one day i'll fix it
		$scope.ShowEdit = function(resource) {};

		// Turn contacts to JSON valid file
		// console.log(JSON.stringify($scope.contacts));

		$scope.AddNew = function(){};

}])

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: false
  };
});

// .controller('NewCtrl', ['$scope', function($scope){
// 	$scope.tmp='Hello,world';
// }]);