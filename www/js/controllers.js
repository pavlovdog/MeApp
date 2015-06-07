angular.module('starter.controllers', ['ionic','firebase'])

.controller('DashCtrl', ['$ionicLoading','$firebaseAuth','$scope','$ionicPopup','$timeout','$firebaseObject','$firebaseArray',
	function($ionicLoading,$firebaseAuth,$scope,$ionicPopup,$firebaseObject,$firebaseArray) {
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-balanced"></ion-spinner>'
			// noBackdrop: true,

		});
		var authRef = new Firebase("https://meappionic.firebaseio.com/");
		$scope.authObj = $firebaseAuth(authRef);
		var authData = $scope.authObj.$getAuth();

		// Return user to the sign-in page if he doesn't logged in
		if (!authData){
			$state.go('signin')
			// console.log('Check auth: error')
		}
		else{
			// console.log('Check auth: successfully')
		}

		// console.log(authData.password.email);
		var userName = authData.password.email.	replace(/\./g, '❒☠').
												replace(/\$/g, '✾✡').
												replace(/\#/g, '❄✎').
												replace(/\[/g, '☎☹').
												replace(/\]/g, '❍☀').
												replace(/\//g, '★☪');

		console.log(userName);

		// Syncing to firebase
		var ref = new Firebase("https://meappionic.firebaseio.com/"+userName);
		var syncObject = $firebaseArray(ref);
		
		syncObject.$loaded().then(function(x){
			$ionicLoading.hide();
		}); 

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
				'email': 'icon ion-android-mail',
				'username': 'icon ion-android-desktop',
				'name': 'icon ion-android-person',
				'adress': 'icon ion-android-pin',
				'about_me': 'icon ion-android-create'
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

.controller('EditCtrl', ['$scope', '$stateParams', '$firebaseObject','$firebaseArray','$firebaseAuth','$state',
	function($scope, $stateParams,$firebaseObject,$firebaseArray,$firebaseAuth,$state){ 
		// console.log('$stateParams: ',$stateParams);
		$scope.pageTitle = $stateParams.pageTitle;
		$scope.resourceName = $stateParams.resourceName;

		var authRef = new Firebase("https://meappionic.firebaseio.com/");
		$scope.authObj = $firebaseAuth(authRef);
		var authData = $scope.authObj.$getAuth();

		// Return user to the sign-in page if he doesn't logged in
		if (!authData){
			$state.go('signin')
			// console.log('Check auth: error')
		}
		else{
			// console.log('Check auth: successfully')
		}

		// console.log(authData.password.email);
		var userName = authData.password.email.	replace(/\./g, '❒☠').
												replace(/\$/g, '✾✡').
												replace(/\#/g, '❄✎').
												replace(/\[/g, '☎☹').
												replace(/\]/g, '❍☀').
												replace(/\//g, '★☪');



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
				$state.go('tab.dash');
			}
		}

}])

.controller('FriendsCtrl', ['$scope', '$stateParams', '$firebaseObject','$firebaseArray','$firebaseAuth','$state','$ionicPopup',
	function($scope, $stateParams, $firebaseObject,$firebaseArray,$firebaseAuth,$state,$ionicPopup){
		// Get auth data and check if user is logged in
		var authRef = new Firebase("https://meappionic.firebaseio.com/");
		$scope.authObj = $firebaseAuth(authRef);
		var authData = $scope.authObj.$getAuth();
		
		var userEmail = authData.password.email.replace(/\./g, '❒☠').
												replace(/\$/g, '✾✡').
												replace(/\#/g, '❄✎').
												replace(/\[/g, '☎☹').
												replace(/\]/g, '❍☀').
												replace(/\//g, '★☪');

		var friendsRef = new Firebase("https://meappionic.firebaseio.com/"+userEmail+'/friends');
		var syncObject = $firebaseObject(friendsRef);

		syncObject.$bindTo($scope,'friendsList');
		syncObject.$loaded(function(){
			console.log($scope.friendsList);
		});


		if (!authData){
			$state.go('signin')
			// console.log('Check auth: error')
		}
		else{
			// console.log('Check auth: successfully')
		}

		$scope.userSearch = function(friendAdress){
			var friendAdress = friendAdress.replace(/\./g, '❒☠').
							replace(/\$/g, '✾✡').
							replace(/\#/g, '❄✎').
							replace(/\[/g, '☎☹').
							replace(/\]/g, '❍☀').
							replace(/\//g, '★☪');

			var searchRef = new Firebase("https://meappionic.firebaseio.com/" + friendAdress)
			var searchAns = $firebaseObject(searchRef);
			searchAns.$loaded(function(){
				// console.log(searchAns.$value !== null)
				if (searchAns.$value !== null){

					$scope.searchFound = true;
					// console.log(searchAns);

				}
			})
		}

		$scope.addToFriends = function(friendAdress){

			// Replace in email forbidden symbols
			var friendAdress = friendAdress.replace(/\./g, '❒☠').
							replace(/\$/g, '✾✡').
							replace(/\#/g, '❄✎').
							replace(/\[/g, '☎☹').
							replace(/\]/g, '❍☀').
							replace(/\//g, '★☪');

			// Connect to FB and create in friends folder new branch, using friendAdress of
			var newFriend = new Firebase('https://meappionic.firebaseio.com/'+userEmail+'/friends/'+friendAdress+'/permiss');
			var syncObject = $firebaseObject(newFriend);

			// Ser 'permiss'equal to 0, because friend must access watching his page
			// It will be added soon
			syncObject.$value = 0;
			syncObject.$save();

			// In friendAdress branch add name of friend
			// It's necessary for fast making a list of friends

			// Get the name of this email user
			var searchRef = new Firebase("https://meappionic.firebaseio.com/" + friendAdress + '/name')
			var searchAns = $firebaseObject(searchRef);

			searchAns.$loaded(function(){
				var friendName = searchAns.$value;			

				var AddNameRef = new Firebase('https://meappionic.firebaseio.com/'+userEmail+'/friends/'+friendAdress+'/name');
				var syncObject = $firebaseObject(AddNameRef);
				syncObject.$value = friendName;
				syncObject.$save();
			});


		}

		// Confirm message to delete
		$scope.ShowConfirm = function(name) {

			var confirmPopup = $ionicPopup.confirm({
				title: 'Are you sure?',
				cancelText: 'No',
				okText: 'Yes'     
			});

			confirmPopup.then(function(res) {
				if(res) {
					delete $scope.friendsList[name]
				} else {
					console.log('Nope');
				}
			});
		};

	}
])

.controller('FriendDetailCtrl', ['$scope', '$stateParams', function($scope,$stateParams) 
	{   
		$scope.chatId = $stateParams.chatId;
		console.log('$stateParams: ',$stateParams); 
	}
])

.controller('AccountCtrl', ['$scope','$firebaseAuth','$state',
	function($scope,$firebaseAuth,$state) {

		$scope.settings = {
			enableFriends: false
		};

		var authRef = new Firebase("https://meappionic.firebaseio.com/");
		var authObj = $firebaseAuth(authRef);

		var authData = authObj.$getAuth();

		// Return user to the sign-in page if he doesn't logged in
		if (!authData){
			$state.go('signin')
			// console.log('Check auth: error')
		}
		else{
			// console.log('Check auth: successfully')
		}

		$scope.LogOut = function(){
			authObj.$unauth(); 
			$state.go('signin')
		};

		$scope.MakeNewPass = function(userPass,userPass1,userPass2){
			if (userPass && userPass1 && userPass2 && userPass1===userPass2){
				authObj.$changePassword({
					email: authData.password.email,
					oldPassword: userPass,
					newPassword: userPass1
				}).then(function() {
					console.log("Password changed successfully!");
				}).catch(function(error) {
					console.error("Error: ", error);
				});
			}
		}
}])

.controller('NewListCtrl',['$firebaseAuth','$scope','$ionicPopup','$timeout','$firebaseObject','$firebaseArray', 
	function($firebaseAuth,$scope,$ionicPopup,$firebaseObject,$firebaseArray){

		var authRef = new Firebase("https://meappionic.firebaseio.com/");
		$scope.authObj = $firebaseAuth(authRef);
		var authData = $scope.authObj.$getAuth();

		// Return user to the sign-in page if he doesn't logged in
		if (!authData){
			$state.go('signin')
			// console.log('Check auth: error')
		}
		else{
			// console.log('Check auth: successfully')
		}

		// console.log(authData.password.email);
		var userName = authData.password.email.	replace(/\./g, '❒☠').
												replace(/\$/g, '✾✡').
												replace(/\#/g, '❄✎').
												replace(/\[/g, '☎☹').
												replace(/\]/g, '❍☀').
												replace(/\//g, '★☪');


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
				'email': 'icon ion-android-mail',
				'username': 'icon ion-android-desktop',
				'name': 'icon ion-android-person',
				'adress': 'icon ion-android-pin',
				'about_me': 'icon ion-android-create'
			}

			return IconsDict[resourse]
		};

		$scope.allKeys=["facebook", "twitter", "github", 
						"instagram", "phone_home", "linkedin", 
						"twitch", "googleplus", "snapchat", 
						"whatsapp", "pinterest", "foursquare", 
						"skype", "vimeo", "dribble","email",
						"username","name","adress",
						"about_me"]
		
}])

.controller('NewAddCtrl', ['$scope', '$stateParams', '$firebaseObject','$firebaseArray','$state','$firebaseAuth','$ionicHistory',
	function($scope, $stateParams,$firebaseObject,$firebaseArray,$state,$firebaseAuth,$ionicHistory){
		$scope.resourceName = $stateParams.resourceName;

		var authRef = new Firebase("https://meappionic.firebaseio.com/");
		$scope.authObj = $firebaseAuth(authRef);
		var authData = $scope.authObj.$getAuth();

		// Return user to the sign-in page if he doesn't logged in
		if (!authData){
			$state.go('signin')
			// console.log('Check auth: error')
		}
		else{
			// console.log('Check auth: successfully')
		}

		// console.log(authData.password.email);
		var userName = authData.password.email.	replace(/\./g, '❒☠').
												replace(/\$/g, '✾✡').
												replace(/\#/g, '❄✎').
												replace(/\[/g, '☎☹').
												replace(/\]/g, '❍☀').
												replace(/\//g, '★☪');

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
			$ionicHistory.goBack(-2);
		}
}])

.controller('SignInCtrl', ['$state','$scope', '$firebaseAuth','$firebaseObject','$firebaseArray',
	function($state,$scope,$firebaseAuth,$firebaseObject,$firebaseArray){

		var ref = new Firebase('https://meappionic.firebaseio.com/');
		$scope.authObj = $firebaseAuth(ref);

		var authData = $scope.authObj.$getAuth();

		if (authData) {
			$state.go('tab.dash');
		}

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

		$scope.createNewUser = function(userEmail,userPass,userName){

			// keys cannot contain . $ # [ ] / 
			var userCheckedEmail = userEmail.	replace(/\./g, '❒☠').
												replace(/\$/g, '✾✡').
												replace(/\#/g, '❄✎').
												replace(/\[/g, '☎☹').
												replace(/\]/g, '❍☀').
												replace(/\//g, '★☪');
			
			if (userEmail && userPass && userName){
				ref.child(userCheckedEmail).once('value', function(ss) {
					if( ss.val() === null ) {
						console.log('Doesnt exists');
						$scope.authObj.$createUser({
							email: userEmail,
							password: userPass
						}).then(function(uD) {
						// create new user in FB, using email adress
						// console.log(userData);
						var newRef = new Firebase('https://meappionic.firebaseio.com/'+userCheckedEmail+'/email');
						var userData = $firebaseObject(newRef);
						userData.$value = userEmail;
						userData.$save();

						var addUsernameRef = new Firebase('https://meappionic.firebaseio.com/'+userCheckedEmail+'/name')
						var userData = $firebaseObject(addUsernameRef);
						userData.$value = userName;
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

		$scope.ForgotPass = function(userEmail){
			if (userEmail){
				$scope.authObj.$resetPassword({
					email: userEmail
				}).then(function() {
					console.log("Password reset email sent successfully!");
				}).catch(function(error) {
					console.error("Error: ", error);
				});
			}
		}
}]);	


