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
  .controller('FunzoneCtrl', function ($scope, EventsPortalService, $state, $http, $mdDialog, Auth, $stateParams, Excel, $timeout, $mdToast, FileSaver, Blob) {
    
    $http.get('/api/funzones')
    	.then(function (response) {
    		$scope.slots = response.data;
        console.log($scope.slots);
    	});

      $scope.remove = function(slotid, userid){
        var data = { userid: userid };
        $http.post('/api/funzones/remove/' + slotid, data).then(function (response){
          console.log(response.data);
        });
      }

      $scope.exportData = function () {
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        FileSaver.saveAs(blob, "funzone.xls");
      };

      $scope.exportToExcel=function(tableId){ // ex: '#my-table'
            $scope.exportHref = Excel.tableToExcel(tableId, 'sheet name');
            $timeout(function() {
            var link = document.createElement('a');
            link.download = "funzone.xlsx";
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
