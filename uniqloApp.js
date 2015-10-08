/**
 * Created by ytang on 10/7/2015.
 */

app.controller("clothesCtrl",function($scope,$http){
    $scope.find = function(){
        var url = "http://www.uniqlo.com/us/store/gcx/getProductInfo.do?format=json&product_cd="+$scope.clothid
        $http.get(url).success(
            function(response){
                $scope.clothinfo = response
            }
        )

    }
});