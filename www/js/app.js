var url="http://localhost:8000/toutboismobPHP/"
app=angular.module('starter', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider,$urlRouterProvider){
   $stateProvider.state("login",{
       url:"/login/:idUser, :psw",
       templateUrl:"templates/Login.html",
     controller:"LoginCtrl"
   });
   
   $stateProvider.state("home",{
       url:"/home",
       templateUrl:"templates/Home.html",
  controller:"HomeCtrl"
   });
   
   $stateProvider.state("commande",{
       url:"/commande/:idCommande",
       templateUrl:"templates/Commande.html",
     controller:"CommandeCtrl"
   });
   
   $stateProvider.state("listecommandes",{
       url:"/listecommandes",
       templateUrl:"templates/Listecommandes.html",
      controller:"ListecommandesCtrl"
   });
   $urlRouterProvider.otherwise("home");
});

app.controller("HomeCtrl", function ($http, $scope) {
   
});

app.controller('LoginCtrl', function($http, $scope) {
   $scope.data = {};

    $scope.submit = function(){
        var link = 'http://localhost:8000/toutboismobPHP/login.php';

        $http.post(link, {username : $scope.data.username, password : $scope.data.password }).then(function (res){
            $scope.response = res.data;
        });
    };
});

app.controller('ListecommandesCtrl', function($http,$scope,$state) {
   //creation d'un tableau liste des commandes
    $scope.commandes = [];
    // creation d'une requete url vers le serveur
    $scope.url = url;
    $http.get(url + "listecommandes.php")
                // data = données de la reponse
            .success(function (data) {
                $scope.commandes = data;
            })
            .error(function (err) {
                console.log(err);
            });
    $scope.chargerCommande = function (idCom) {
        $state.go("commande", {
            idCommande: idCom,
        });
    }
});

app.controller("CommandeCtrl", function ($http, $scope, $stateParams) {
    $scope.idCommande = $stateParams.idCommande;
   
    $scope.commande = [];
    $http.get(url + "detailscom.php?idCommande=" + $scope.idCommande )
            .success(function (data) {
                $scope.commande = data;
            })
            .error(function (err) {
                console.log(err);
            });
});

