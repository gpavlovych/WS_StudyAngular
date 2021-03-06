'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngStorage',
    'angular.filter',
    'btford.socket-io',
    'myApp.services',
    'myApp.registration',
    'myApp.login',
    'myApp.gameTicTacToe',
    'myApp.gameDots',
    'myApp.gameChat',
    'myApp.version',
    'myApp.dashboard'
])

.config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/dashboard'});
    }])

.factory('gameSocketFactory', ['socketFactory', '$localStorage', function (socketFactory, $localStorage) {
        var socket = socketFactory({'ioSocket': io.connect('http://localhost:8188/')});
        socket
            .on('connect', function () {
                console.log("connected");
                socket.emit('authenticate', {token: $localStorage.currentUser.token}); // send the jwt
            });
        return socket;
    }])
    .service('gamesToBeCreated',['$http', function($http){
        this.get = function(){
            //TODO

        };
        this.create = function(){

        };
    }])
.run(['$rootScope', '$http', '$location', '$localStorage', function ($rootScope, $http, $location, $localStorage) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser && $localStorage.currentUser.user) {
            $http.defaults.headers.common['x-access-token'] = $localStorage.currentUser.token;
            $rootScope.user = $localStorage.currentUser.user;
        }
        $rootScope.gamesToBeCreated = [
            "Dots",
            "TicTacToe"
        ];
        $rootScope.incomingInvitations = [
            {
                "userPic": "http://www3.pictures.zimbio.com/gi/Lisa+Ann+Adult+Video+News+Awards+Hard+Rock+HLm94w9bJBel.jpg",
                "userName": "Lisa",
                "gameName": "Dots"
            },
            {
                "userPic": "http://www3.pictures.zimbio.com/gi/Lisa+Ann+Adult+Video+News+Awards+Hard+Rock+HLm94w9bJBel.jpg",
                "userName": "Lisa",
                "gameName": "TicTacToe"
            },
            {
                "userPic": "images/user-unknown.png",
                "userName": "Anonymous",
                "gameName": "TicTacToe"
            }
        ];
        $rootScope.outgoingInvitations = [
            {
                "userPic": "http://dzwnexfz53ofs.cloudfront.net/headshots/mandingo_m_mandingo_adt_c%20.jpg",
                "userName": "Mandingo",
                "gameName": "Dots"
            },
            {
                "userPic": "http://www3.pictures.zimbio.com/gi/Lisa+Ann+Adult+Video+News+Awards+Hard+Rock+HLm94w9bJBel.jpg",
                "userName": "Lisa",
                "gameName": "TicTacToe"
            },
            {
                "userPic": "images/user-unknown.png",
                "userName": "Anonymous",
                "gameName": "TicTacToe"
            }
        ];
        $rootScope.activeGames = [
            {
                "userPic": "http://www3.pictures.zimbio.com/gi/Lisa+Ann+Adult+Video+News+Awards+Hard+Rock+HLm94w9bJBel.jpg",
                "userName": "Lisa",
                "gameName": "Dots",
                "yourScore": 3,
                "opponentScore": 4
            },
            {
                "userPic": "images/user-unknown.png",
                "userName": "Anonymous",
                "gameName": "TicTacToe",
                "yourScore": 4,
                "opponentScore": 4
            },
            {
                "userPic": "http://dzwnexfz53ofs.cloudfront.net/headshots/mandingo_m_mandingo_adt_c%20.jpg",
                "userName": "Mandingo",
                "gameName": "TicTacToe",
                "yourScore": 14,
                "finishedBy": "Mandingo",
                "opponentScore": 4
            },
            {
                "userPic": "http://dzwnexfz53ofs.cloudfront.net/headshots/mandingo_m_mandingo_adt_c%20.jpg",
                "userName": "Mandingo",
                "gameName": "TicTacToe",
                "yourScore": 15,
                "finishedBy": $rootScope.user.username,
                "opponentScore": 4
            }
        ];
        $rootScope.finishedGames = [
            {
                "userPic": "http://www3.pictures.zimbio.com/gi/Lisa+Ann+Adult+Video+News+Awards+Hard+Rock+HLm94w9bJBel.jpg",
                "userName": "Lisa",
                "gameName": "Dots",
                "yourScore": 3,
                "opponentScore": 4,
                "endDate": new Date()
            },
            {
                "userPic": "images/user-unknown.png",
                "userName": "Anonymous",
                "gameName": "TicTacToe",
                "yourScore": 4,
                "opponentScore": 4,
                "endDate": new Date()
            },
            {
                "userPic": "http://dzwnexfz53ofs.cloudfront.net/headshots/mandingo_m_mandingo_adt_c%20.jpg",
                "userName": "Mandingo",
                "gameName": "TicTacToe",
                "yourScore": 14,
                "endDate": new Date(),
                "opponentScore": 4
            },
            {
                "userPic": "http://dzwnexfz53ofs.cloudfront.net/headshots/mandingo_m_mandingo_adt_c%20.jpg",
                "userName": "Mandingo",
                "gameName": "TicTacToe",
                "yourScore": 15,
                "endDate": new Date(),
                "opponentScore": 4
            }
        ];
        $rootScope.top100Players = [
            {
                "userPic": "http://dzwnexfz53ofs.cloudfront.net/headshots/mandingo_m_mandingo_adt_c%20.jpg",
                "userName": "Mandingo"
            },
            {
                "userPic": "http://www3.pictures.zimbio.com/gi/Lisa+Ann+Adult+Video+News+Awards+Hard+Rock+HLm94w9bJBel.jpg",
                "userName": "Lisa"
            }
        ];
        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function () {
            var publicPages = ['/login', '/register'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && (!$localStorage.currentUser || !$localStorage.currentUser.user)) {
                $location.path('/login');
            }
        });
    }]);
