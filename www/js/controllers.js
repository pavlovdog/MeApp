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

		// $scope.iconByResource = ContactsBase.iconByResource(resource);

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

}])

.controller('NewCtrl', ['$scope', '$stateParams', '$firebaseObject','$firebaseArray',
	function($scope, $stateParams,$firebaseObject,$firebaseArray){ 
		// console.log('$stateParams: ',$stateParams);
		$scope.pageTitle = $stateParams.pageTitle;
		$scope.resourceName = $stateParams.resourceName;

		var ref = new Firebase("https://meappionic.firebaseio.com/pavlovdog/"+$scope.resourceName+"/");
		$scope.userData = $firebaseObject(ref); 

		// console.log($scope.userData);
		// $scope.userData.$value="newId";
		// $scope.userData.$save();

		$scope.saveNewLogin = function(newLogin){
			if (newLogin){
				$scope.userData.$value = newLogin;
				$scope.userData.$save()
				// console.log("userData: ",$scope.userData);
				// console.log("newLogin: ", newLogin);
			}
		}






}])

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  // console.log('Chats.all() = ', $scope.chats);
})

.controller('ChatDetailCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
  $scope.chatId = $stateParams.chatId;
  console.log('$stateParams: ',$stateParams);
}])

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: false
  };
});


