angular
  .module('angular-file-upload', [])
  .directive('ngFileupload', ngFileupload);

function ngFileupload($sce, $timeout) {
  function link(scope, element, attrs) {
    //defaults
    scope.config = {
      buttons: [
        //can use html code
        {
          name: 'selectFileBtn',
          text: $sce.trustAsHtml('<i class="glyphicon glyphicon-search"></i> Select File'),
          class: 'btn btn-primary',
          visible: true,
          show:true         
        },
        {
          name: 'uploadFileBtn',
          text: $sce.trustAsHtml('<i class="glyphicon glyphicon glyphicon-arrow-up"></i> Upload File'),
          class: 'btn btn-success',
          visible: true,
          show:false
        },
        {
          name: 'removeSelectionBtn',
          text: $sce.trustAsHtml('<i class="glyphicon glyphicon glyphicon glyphicon-remove"></i> Remove'),
          class: 'btn btn-danger',
          visible: true,
          show:false
        }
      ],
      input: {
        id: 'fileLabel',
        name: 'fileLabel',
        placeholder: 'Select File',
        class: 'form-control'
      },
      fileInput: {
        id: 'file',
        name: 'file'
      }
    }

    var $fileInput=null;
    scope.$watch('config',function(newNames,oldNames){     
      if (newNames){
        $fileInput = angular.element('input[type="file"][name="' + newNames.fileInput.name + '"]');
        //file input change
        $fileInput.on('change',function(e){
          console.log(scope.fileInputModel);
          val = e.target.value.split('\\');
          scope.fileInputModel=val[val.length-1];
          scope.config.buttons.
          scope.$apply();
          console.log('file selected', scope.fileInputModel);
        });
      }      
    });

    
    
    scope.$watch('fileInputModel',function(newNames){
      console.log(newNames);
    })

    //Functions
    scope.openFileBrowser() {    
      $fileInput.click();
    }
    
    
    //element.text('Hello World');
  }
  return {
    link: link,
    restrict: 'AE',
    templateUrl: 'template.html',
    scope: {
      fileInputModel:"=ngFileupload",
      inputLabelModel:"=ngFileupload"
    },
  }
}