'use strict';

angular.module('erp2015App')
  .controller('TotalRegistrationsCtrl', function ($scope, EventsPortalService, $state, $http, $mdDialog, Auth, $stateParams, Excel, $timeout, $mdToast) {
    
    $http.get('/api/events/' + $stateParams.eventId)
    	.then(function (response) {
        console.log(response.data);
    		$scope.eventDetails = response.data;

        $scope.fileDownloadLink = "http://shaastra.org:8080/api/imgs/" + $scope.eventDetails._id;

        $http.get('http://shaastra.org:8080/api/imgs/files/' + $scope.eventDetails._id).then(function (response){
          $scope.files = response.data;
          console.log(response.data);
        });

        
    	});

      $scope.exportData = function () {
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, $scope.eventDetails.name + "_registrations.xls");
      };

      $scope.exportToExcel=function(tableId){ // ex: '#my-table'
            $scope.exportHref = Excel.tableToExcel(tableId, 'sheet name');
            $timeout(function() {
            var link = document.createElement('a');
            link.download = $scope.eventDetails.name + "_registrations.xlsx";
            link.href = $scope.exportHref;
            link.click();
            }, 100);
        };
    
  

  // showing editDeal, createUpdate, editUpdate button only to permitted users
  Auth.isLoggedInAsync(function (loggedIn) {
    if(Auth.getCurrentUser().role === 'admin' || Auth.getCurrentUser().role === 'core' || Auth.getCurrentUser().role === 'superCoord') {
      $scope.showButton = true;                    
    }
  });

});
