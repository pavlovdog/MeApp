angular.module('starter.controllers', ['ionic','firebase'])

.controller('DashCtrl', ['$firebaseAuth','$scope','$ionicPopup','$timeout','$firebaseObject','$firebaseArray',
	function($firebaseAuth,$scope,$ionicPopup,$firebaseObject,$firebaseArray) {
		var authRef = new Firebase("https://meappionic.firebaseio.com/");
		$scope.authObj = $firebaseAuth(authRef);
		var authData = $scope.authObj.$getAuth();
		// console.log(authData.password.email);
		var userName = authData.password.email.replace(/\./g, '❒☠✍');
		console.log(userName);

		// Syncing to firebase
		var ref = new Firebase("https://meappionic.firebaseio.com/"+userName);
		var syncObject = $firebaseArray(ref); 
		syncObject.$bindTo($scope, "contacts");

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
				'dribble' : 'icon ion-social-dribbble-outline',
				'email': 'icon ion-android-mail'
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

		// Local list of contacts for debugging
		// $scope.contacts={
		// 	twitter: '@pavlovdog',
		// 	facebook: 'facebook.pavlovdog.com',
		// 	github: 'pavlovdog@github.com',
		// 	instagram: '#pavlovdog',
		// 	phone_home: '8-(916)-123-23-57',
		// };

	}])

.controller('EditCtrl', ['$scope', '$stateParams', '$firebaseObject','$firebaseArray','$firebaseAuth',
	function($scope, $stateParams,$firebaseObject,$firebaseArray,$firebaseAuth){ 
		// console.log('$stateParams: ',$stateParams);
		$scope.pageTitle = $stateParams.pageTitle;
		$scope.resourceName = $stateParams.resourceName;

		var authRef = new Firebase("https://meappionic.firebaseio.com/");
		$scope.authObj = $firebaseAuth(authRef);
		var authData = $scope.authObj.$getAuth();
		// console.log(authData.password.email);
		var userName = authData.password.email.replace(/\./g, '❒☠✍');


		var ref = new Firebase("https://meappionic.firebaseio.com/"+userName+"/"+$scope.resourceName+"/");
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
})

.controller('NewListCtrl',['$firebaseAuth','$scope','$ionicPopup','$timeout','$firebaseObject','$firebaseArray', 
	function($firebaseAuth,$scope,$ionicPopup,$firebaseObject,$firebaseArray){

		var authRef = new Firebase("https://meappionic.firebaseio.com/");
		$scope.authObj = $firebaseAuth(authRef);
		var authData = $scope.authObj.$getAuth();
		// console.log(authData.password.email);
		var userName = authData.password.email.replace(/\./g, '❒☠✍');

		var ref = new Firebase("https://meappionic.firebaseio.com/"+userName);
		var syncObject = $firebaseArray(ref);
		syncObject.$bindTo($scope,"userData");
		syncObject.$loaded().
			then(function(){
				$scope.existResources = Object.keys($scope.userData)
			});


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
				'dribble' : 'icon ion-social-dribbble-outline',
				'email': 'icon ion-android-mail'
			}

			return IconsDict[resourse]
		};

		$scope.allKeys=["facebook", "twitter", "github", 
						"instagram", "phone_home", "linkedin", 
						"twitch", "googleplus", "snapchat", 
						"whatsapp", "pinterest", "foursquare", 
						"skype", "vimeo", "dribble","email"]
		
}])

.controller('NewAddCtrl', ['$scope', '$stateParams', '$firebaseObject','$firebaseArray','$state','$firebaseAuth',
	function($scope, $stateParams,$firebaseObject,$firebaseArray,$state,$firebaseAuth){
		$scope.resourceName = $stateParams.resourceName;

		var authRef = new Firebase("https://meappionic.firebaseio.com/");
		$scope.authObj = $firebaseAuth(authRef);
		var authData = $scope.authObj.$getAuth();
		// console.log(authData.password.email);
		var userName = authData.password.email.replace(/\./g, '❒☠✍');

		var ref = new Firebase("https://meappionic.firebaseio.com/"+userName+"/"+$scope.resourceName);
		$scope.userData = $firebaseObject(ref);

		// $scope.userData.$loaded().then(function(){
		// 	// $scope.userData.$add({github: "pavlovdog@github.com"});
		// 	$scope.userData.$value = 'pavlovdog@github.com';
		// 	$scope.userData.$save();
		// 	console.log($scope.userData);
		// })

		$scope.addNew = function(login){
			// Save to FB
			$scope.userData.$value = login;
			$scope.userData.$save();

			// Go back 2 views
			// $state.go('tab.dash');

		}
}])

.controller('SignInCtrl', ['$state','$scope', '$firebaseAuth','$firebaseObject','$firebaseArray',
	function($state,$scope,$firebaseAuth,$firebaseObject,$firebaseArray){

		var ref = new Firebase('https://meappionic.firebaseio.com/');
		$scope.authObj = $firebaseAuth(ref);


		$scope.SignIn = function(userEmail,userPass){
			if (userEmail && userPass){
				$scope.authObj.$authWithPassword({
					email: userEmail,
					password: userPass
				}).then(function(user){
					console.log("User: ", user);
					$state.go('tab.dash');
				})
			}
			// $state.go('tab.dash');
		}
	
}])	

.controller('RegCtrl', ['$scope', '$firebaseAuth','$state','$firebaseObject','$firebaseArray',
	function($scope,$firebaseAuth,$state,$firebaseObject,$firebaseArray){
		var ref = new Firebase('https://meappionic.firebaseio.com/');
		$scope.authObj = $firebaseAuth(ref);

		$scope.createNewUser = function(userEmail,userPass){
			var userName = userEmail.replace(/\./g, '❒☠✍');
			
			if (userEmail && userPass){
				ref.child(userName).once('value', function(ss) {
					if( ss.val() === null ) {
						console.log('Doesnt exists');
						$scope.authObj.$createUser({
							email: userEmail,
							password: userPass
						}).then(function(uD) {
						// create new user in FB, using email adress
						// console.log(userData);
						var newRef = new Firebase('https://meappionic.firebaseio.com/'+userName+'/email');
						var userData = $firebaseObject(newRef);
						userData.$value = userEmail;
						userData.$save();

						
						// return to the login page
						$state.go('signin');

						}).catch(function(error) {
							console.error("Error: ", error);
						});

					}
					else {
						console.log('Exist');
					}

				});
			}
		}


}]);	


