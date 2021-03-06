app.controller('indexRollTimes', ['$rootScope', '$scope', '$http', 'utilsService', function ($rootScope, $scope, $http, utilsService) {

    (function init() {
        initindexRollTimes();
    })();

    //每日圈子评论数
    function initindexRollTimes() {
        //默认参数
        $scope.params = {
            num: 20,
            totalCount: 0
        };

        $scope.result_x = [0, 0, 0, 0, 0];
        $scope.result_y = [0, 0, 0, 0, 0];

        //数据缓存
        var dataCacheX = {};
        var dataCacheY = {};

        getindexRollTimesData($scope.params.num);

        //获取每日圈子评论数
        function getindexRollTimesData(num) {
            if (dataCacheX[num] && dataCacheY[num]) {
                $scope.result_x = dataCacheX[num];
                $scope.result_y = dataCacheY[num];
                return;
            }

            var url = "/svc/dakatongji/index/indexRollTimes?num=" + num;
            $http.get(url).success(function (data) {

                utilsService.formatDataByOrderAndNum(data.result, 0, num, ['count']);

                var rs = utilsService.getFormatData(data.result, "time");
                var ls = utilsService.getFormatData(data.result, 'count');

                dataCacheX[num] = rs;
                dataCacheY[num] = ls;

                $scope.result_x = rs;
                $scope.result_y = ls;

            }).error(function (data, status) {
                console.log("getindexRollTimesData in error");
            });
        }

        //监听参数变化
        $scope.$watch('params', function (newVal, oldVal) {
            if (newVal !== oldVal || newVal.num !== oldVal.num) {
                getindexRollTimesData($scope.params.num);
            }
        }, true);
    }

}]);