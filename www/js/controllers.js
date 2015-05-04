angular.module('starter.controllers', ['ionic','firebase'])

.controller('DashCtrl', ['$scope','$ionicPopup','$timeout','$firebaseObject',
	function($scope,$ionicPopup,$timeout,$firebaseObject) {
		
		// Local list of contacts for debugging
		$scope.contacts=
		{
			twitter: '@pavlovdog',
			facebook: 'facebook.pavlovdog.com',
			github: 'pavlovdog@github.com',
			instagram: '#pavlovdog',
			phone_home: '8-(916)-123-23-57'
		};

		// Returns icon name for resources
		$scope.iconByResource = function(resourse){
			var IconsDict={
				'facebook' : 'icon ion-social-facebook-outline',
				'twitter' : 'icon ion-social-twitter-outline',
				'github' : 'icon ion-social-github-outline',
				'instagram' : 'icon ion-social-instagram-outline',
				'phone_home' : 'icon ion-ios-telephone-outline'
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
		$scope.ShowEdit = function(contact) {}
	
		// Turn contacts to JSON valid file
		// console.log(JSON.stringify($scope.contacts));

	}
])

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
