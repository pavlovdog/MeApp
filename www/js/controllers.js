angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
	$scope.contacts=[
	{
		resourse:'Twitter',
		name:'@pavlovdog',
		image:'icon ion-social-twitter-outline'
	},{
		resourse:'Facebook',
		name:'facebook.pavlovdog.com',
		image:'icon ion-social-facebook-outline'
	},{
		resourse:'Github',
		name:'pavlovdog@github.com',
		image:'icon ion-social-github-outline'
	},{
		resourse:'Instagram',
		name:'#pavlovdog',
		image:'icon ion-social-instagram-outline'
	},{
		resourse:'Phone number',
		name:'#pavlovdog',
		image:'icon ion-social-instagram-outline'
	}];
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
