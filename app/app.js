angular
    .module('fileUploadApp', ['angular-file-upload'])
    .controller('MainCtrl', MainCtrl)

/** @ngInject */
function MainCtrl($scope) {
    // $scope.mesaj="Hello World";
    $scope.pictureFile="uploads/resim.jpg";
}