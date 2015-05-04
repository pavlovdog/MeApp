angular.module('starter.controllers', ['ionic','firebase'])

.controller('DashCtrl', ['$scope','$ionicPopup','$timeout','$firebaseObject',
	function($scope,$ionicPopup,$timeout,$firebaseObject) {
		var ref = new Firebase("https://meappionic.firebaseio.com/");

		// // download the data into a local object
		$scope.FB = $firebaseObject(ref);
		console.log($scope.FB);

		// List of contacts
		// Don't delete after firebase adding! 
		$scope.contacts=
		{
		pavlovdog:[
			{	
						id: 0,
						resourse: 'Twitter',
						name: '@pavlovdog',
						image: 'icon ion-social-twitter-outline'
					},{
						id: 1,
						resourse: 'Facebook',
						name: 'facebook.pavlovdog.com',
						image: 'icon ion-social-facebook-outline'
					},{
						id: 2,
						resourse: 'Github',
						name: 'pavlovdog@github.com',
						image: 'icon ion-social-github-outline'
					},{
						id: 3,
						resourse: 'Instagram',
						name: '#pavlovdog',
						image: 'icon ion-social-instagram-outline'
					},{
						id: 4,
						resourse: 'Phone number',
						name: '8-(916)-123-23-57',
						image: 'icon ion-ios-telephone-outline'
					}],
		guest: 	  [
			{	
						id: 0,
						resourse: 'Twitter',
						name: '@guest',
						image: 'icon ion-social-twitter-outline'
					},{
						id: 1,
						resourse: 'Facebook',
						name: 'facebook.guest.com',
						image: 'icon ion-social-facebook-outline'
					},{
						id: 2,
						resourse: 'Github',
						name: 'guest@github.com',
						image: 'icon ion-social-github-outline'
					},{
						id: 3,
						resourse: 'Instagram',
						name: '#guest',
						image: 'icon ion-social-instagram-outline'
					},{
						id: 4,
						resourse: 'Phone number',
						name: '8-(303)-924-23-57',
						image: 'icon ion-ios-telephone-outline'
					}]
		};

		// Turn contacts to JSON valid file
		// console.log(JSON.stringify($scope.contacts));
		
		// Confirm message to delete
		$scope.ShowConfirm = function(contact) {
			console.log(contact);
			var confirmPopup = $ionicPopup.confirm({
				title: 'Are you sure?',
				cancelText: 'No',
				okText: 'Yes'     
			});
			confirmPopup.then(function(res) {
				if(res) {
					$scope.contacts.splice($scope.contacts.indexOf(contact),1);
				} else {
					console.log('Nope');
				}
			});};

		// Edit alert for contact, one day i'll fix it
		$scope.ShowEdit = function(contact) {}
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
