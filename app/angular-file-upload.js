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
          events: {
            
          }
        },
        {
          name: 'uploadFileBtn',
          text: $sce.trustAsHtml('<i class="glyphicon glyphicon glyphicon-arrow-up"></i> Upload File'),
          class: 'btn btn-success',
          visible: true,
          event: selectFile
        },
        {
          name: 'removeSelectionBtn',
          text: $sce.trustAsHtml('<i class="glyphicon glyphicon glyphicon glyphicon-remove"></i> Remove'),
          class: 'btn btn-danger',
          visible: true,
          event: openFileBrowser
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
      console.log(newNames);
      if (newNames){
        $fileInput = angular.element('input[type="file"][name="' + newNames.fileInput.name + '"]');
      }      
    })
    function openFileBrowser() {    
      $fileInput.click();
      console.log('file browser opened', $fileInput)
    }

    function selectFile(){
      $fileInput.on('change',function(e){
        console.log('file selected', e);
      });
    }
    //element.text('Hello World');
  }
  return {
    link: link,
    restrict: 'AE',
    templateUrl: 'template.html',
    scope: {},
  }
}