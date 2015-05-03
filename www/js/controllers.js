angular.module('starter.controllers', ['ionic'])

.controller('DashCtrl', function($scope,$ionicPopup,$timeout) {
	$scope.contacts=[
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
	}];

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
		});
	};

	$scope.ShowEdit = function(contact) {

		$scope.newLogin='';
		// An elaborate, custom popup
		var myPopup = $ionicPopup.show({
		template: '<input type="text" ng-model="newLogin">',
		title: 'Enter your login',
		// subTitle: 'Please use normal things',
		scope: $scope,
		buttons: 
		[{ text: 'Cancel' },
		{
			text: '<b>Save</b>',
			type: 'button-positive',
			onTap: function(e) {
				if (!$scope.newLogin) {
					//don't allow the user to close unless he enters smth
					e.preventDefault();
				} else {
					console.log($scope.newLogin);
					return $scope.newLogin;
				}
			}
		}]
		
		});
		myPopup.then(function(res) {
			// console.log('Tapped!', res);
			$scope.contacts[contact.id].name=res;
		});

		// $timeout(function() {
		// myPopup.close(); //close the popup after 3 seconds for some reason
		// }, 3000);
	};

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
