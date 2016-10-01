'use strict';

angular.module('erp2015App')
  .factory('Excel',function($window){
    var uri='data:application/vnd.ms-excel;base64,',
      template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
      base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
      format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
    return {
      tableToExcel:function(tableId,worksheetName){
        var table=$(tableId),
        ctx={worksheet:worksheetName,table:table.html()},
        href=uri+base64(format(template,ctx));
        return href;
      }
    };
  })
  .controller('RegistrationsCtrl', function ($scope, EventsPortalService, $state, $http, $mdDialog, Auth, $stateParams, Excel, $timeout, $mdToast) {
    
    $http.get('/api/events/' + $stateParams.eventId)
    	.then(function (response) {
        console.log(response.data);
    		$scope.eventDetails = response.data;

        $scope.fileDownloadLink = "http://localhost:8080/api/imgs/" + $scope.eventDetails._id;

        $http.get('http://localhost:8080/api/imgs/files/' + $scope.eventDetails._id).then(function (response){
          $scope.files = response.data;
          console.log(response.data);
        });

        
    	});

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
