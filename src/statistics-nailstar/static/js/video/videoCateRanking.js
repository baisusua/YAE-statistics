app.controller('videoCateRanking', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

    $rootScope.promise = $http.get("/svc/dakatongji/getCateRanking", {}).success(function(data) {

        $scope.infos = data.result;

    }).error(function(data, status) {

    });

}]);