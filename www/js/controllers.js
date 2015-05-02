angular.module('starter.controllers', ['ionic'])

.controller('DashCtrl', function($scope,$ionicPopup) {
	$scope.contacts=[
	{	
		resourse: 'Twitter',
		name: '@pavlovdog',
		image: 'icon ion-social-twitter-outline'
	},{
		resourse: 'Facebook',
		name: 'facebook.pavlovdog.com',
		image: 'icon ion-social-facebook-outline'
	},{
		resourse: 'Github',
		name: 'pavlovdog@github.com',
		image: 'icon ion-social-github-outline'
	},{
		resourse: 'Instagram',
		name: '#pavlovdog',
		image: 'icon ion-social-instagram-outline'
	},{
		resourse: 'Phone number',
		name: '8-(916)-123-23-57',
		image: 'icon ion-ios-telephone-outline'
	}];

	$scope.ShowConfirm = function(contact) {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Are you sure?',
			// template: 'Are you sure you want to eat this ice cream?'
			cancelText: 'No',
			okText: 'Yes'     
		});
		confirmPopup.then(function(res) {
			if(res) {
				$scope.contacts.splice($scope.contacts.indexOf(contact),1);
			} else {
				console.log('Nope');
			}
		});
	};

	$scope.ShowEdit = function(){

	}
})

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
