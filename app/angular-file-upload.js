angular
  .module('angular-file-upload', [])
  .directive('ngFileupload', ngFileupload);

function ngFileupload($sce, $timeout, $log) {
  function link(scope, element, attrs) {
    //defaults
    scope.config = {
      postUrl:'upload.asp',
      buttons: {
        select: {
          text: $sce.trustAsHtml('<i class="glyphicon glyphicon-search"></i> Select File'),
          class: 'btn btn-primary',
          active: true,
          show: true
        },
        upload: {
          text: $sce.trustAsHtml('<i class="glyphicon glyphicon glyphicon-arrow-up"></i> Upload File'),
          class: 'btn btn-success',
          active: true,
          show: false
        },
        removeSelection: {
          text: $sce.trustAsHtml('<i class="glyphicon glyphicon glyphicon glyphicon-remove"></i> Remove'),
          class: 'btn btn-danger',
          active: true,
          show: false
        },
        loading: {
          text: $sce.trustAsHtml('Loading...'),
          class: 'btn btn-danger',
          active: true,
          show: false
        }
      },
      input: {
        id: 'fileLabel',
        name: 'fileLabel',
        placeholder: 'Select File',
        class: 'form-control'
      },
      fileInput: {
        id: 'file',
        name: 'file'
      },
      progress: {
        status: 'Waiting',
        loaded: 0,
        totalSize: 0,
        progress: 0
      }
    }

    var $fileInput = null;
    scope.$watch('config', function (newNames, oldNames) {
      if (newNames) {
        $fileInput = angular.element('input[type="file"][name="' + newNames.fileInput.name + '"]');
        //file input change
        $fileInput.on('change', function (e) {
          console.log(e);
          val = e.target.value.split('\\');
          scope.fileInputModel = val[val.length - 1];
          if (val!=''){
            scope.config.buttons.upload.show = true;
            if (scope.config.buttons.removeSelection.active) {
              scope.config.buttons.removeSelection.show = true;
            }
          }else{
            scope.config.buttons.upload.show = false;
            if (scope.config.buttons.removeSelection.active) {
              scope.config.buttons.removeSelection.show = false;
            }
          }          
          scope.$apply();         
        });
      }
    });

    scope.$watch('fileInputModel', function (newNames) {
      console.log(newNames);
    })

    //Functions:Scope
    scope.openFileBrowser = function () {
      $fileInput.click();
    }

    scope.removeSelection = function () {
      $log.info('removeSelection tıklandı');
    }

    scope.upload = function () {
      $log.info('upload tıklandı');
      var file = $fileInput[0].files[0],
        fd = new FormData();
      fd.append("file", file);

      var xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", xhrUploadProgress, false);
      xhr.addEventListener("load", xhrUploadComplete, false);
      xhr.open("POST", scope.config.postUrl)
      xhr.send(fd);
    }

    //Functions
    function xhrUploadProgress(e) {
      var done = e.position || e.loaded,
          total = e.totalSize || e.total;
      scope.config.progress.status='Loading';
      scope.config.progress.loaded=done;
      scope.config.progress.totalSize=total;
      scope.config.progress.progress=(Math.floor(done / total * 1000) / 10);
      $log.info(scope.config.progress);      
      scope.$apply();
    }

    function xhrUploadComplete(evt) {
      var status = evt.srcElement.status;
      //console.log('complete', status)          
      if (status == 200) {
        scope.config.progress.status='Done';
        scope.$apply();
      } else {

      }

    }
    //element.text('Hello World');
  }
  return {
    link: link,
    restrict: 'AE',
    templateUrl: 'template.html',
    scope: {
      fileInputModel: "=ngFileupload",
      inputLabelModel: "=ngFileupload"
    }
  }
}