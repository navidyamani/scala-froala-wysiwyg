window.addEventListener("load",function() {
     var changeDirection = function (dir, align) {
        this.selection.save();
        var elements = this.selection.blocks();
        for (var i = 0; i < elements.length; i++) {
          var element = elements[i];
          if (element != this.$el.get(0)) {
           $(element)
             .css('direction', dir)
             .css('text-align', align);
          }
        }

        this.selection.restore();
      }

      $.FroalaEditor.DefineIcon('rightToLeft', {NAME: 'long-arrow-left'});
     $.FroalaEditor.RegisterCommand('rightToLeft', {
        title: 'RTL',
        focus: true,
        undo: true,
        refreshAfterCallback: true,
        callback: function () {
          changeDirection.apply(this, ['rtl', 'right']);
        }
     })

     $.FroalaEditor.DefineIcon('leftToRight', {NAME: 'long-arrow-right'});
     $.FroalaEditor.RegisterCommand('leftToRight', {
        title: 'LTR',
        focus: true,
        undo: true,
        refreshAfterCallback: true,
        callback: function () {
          changeDirection.apply(this, ['ltr', 'left']);
        }
     });

     $('#edit').froalaEditor({

        //-------------------- LOAD IMAGE --------------------
        // Set the load images request URL.
        imageManagerLoadURL: "/api/froala_load_images",

        //-------------------- DELETE IMAGE --------------------
        // Set the image Delete URL.
        imageManagerDeleteURL: '/api/froala_delete_image',

        // Set request type.
        imageManagerDeleteMethod: 'POST',

        //-------------------- UPLOAD IMAGE --------------------
        // Set the image upload URL.
        imageUploadURL: '/api/froala_upload_image',

        // Set request type.
        imageUploadMethod: 'POST',

        // Allow to upload these types
        imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif'], // default: ['jpeg', 'jpg', 'png', 'gif', 'svg+xml']

        // Set max image size to 5MB.
        imageMaxSize: 5 * 1024 * 1024,

        //-------------------- INSERT LINK --------------------
        linkInsertButtons: ['linkBack'], // default: ['linkBack', '|', 'linkList']

        //-------------------- UPLOAD VIDEO --------------------
        // Set the video upload URL.
        videoUploadURL: '/api/froala_upload_video',

        // Allow to upload these types
        videoAllowedTypes: ['mp4', 'webm', 'ogg'], // default: ['mp4', 'webm', 'ogg']

        // Set max video size to 30MB.
        videoMaxSize: 1024 * 1024 * 30,

        //-------------------- UPLOAD FILE --------------------
        // Set the file upload URL.
        fileUploadURL: '/api/froala_upload_file',

        // Set request type.
        fileUploadMethod: 'POST',

        fileAllowedTypes: ['application/pdf', 'application/msword'],

        // Set max file size to 50MB.
        fileMaxSize: 1024 * 1024 * 50,




        placeholderText: ' ...',
        heightMin: 200,
        heightMax: 400,
        toolbarButtons: [ 'fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontSize', 'color', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '|', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '-', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'help', 'html' , '|', 'rightToLeft', 'leftToRight' , '|', 'undo', 'redo'],
        toolbarButtonsMD: ['fullscreen', 'bold', 'italic', 'underline', 'fontSize', 'color', 'align', 'insertLink', 'insertImage', 'insertTable', 'rightToLeft', 'leftToRight' , '|', 'undo', 'redo'],
        toolbarButtonsSM: ['fullscreen', 'bold', 'italic', 'underline', 'fontSize', 'color', 'align', 'insertLink', 'insertImage', 'insertTable', 'rightToLeft', 'leftToRight' , '|', 'undo', 'redo'],
        toolbarButtonsXS: ['undo', 'redo' , '-', 'bold', 'italic', 'underline' , 'rightToLeft', 'leftToRight' ]
     });

});