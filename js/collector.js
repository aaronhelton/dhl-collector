$(init);

function isJsonString(s) {
  try {
    JSON.parse(s);
  } catch (e) {
    return false;
  }
  return true;
}

function toggleForm(state) {
  if (state == "on") {
    $( "#loginContainer" ).show();
  } else {
    $( "#loginContainer" ).hide();
  }
}

function listBucket(s3) {

}

function init() {
  // Hide elements that need to start off that way
  $("#describeContainer").hide();
  $("#fileContainer").hide();
  $("#submitAnother").hide();
  

  // Check local storage for credentials
  if (localStorage.getItem("access_key_id") && localStorage.getItem("secret_access_key") && localStorage.getItem("bucket")) {
    $("#messages").toggleClass('text-danger', false);
    $("#messages").toggleClass('text-info', true);
    $( "#messages" ).html('Found credentials from a previous session.  If something goes wrong, you can re-enter them by clicking <a href="#" onClick="$(\'#loginContainer\').show(); $(\'#messages\').empty();">here</a><br/>');
    $( "#loginContainer" ).hide();
    $( "#describeContainer" ).show();
  } else {
    $("#loginContainer").show();
    $( "#messages" ).empty();
  }

  // Add event listener to the validateCredentials button
  $("#validateCredentials").click(function(e) {
    e.preventDefault();
    var str = $("#jsonCredentials").val();
    if (isJsonString(str)) {
      var jsonData = JSON.parse(str);
      if (jsonData && jsonData['username'] && jsonData['bucket'] && jsonData['AccessKeyID'] && jsonData['SecretAccessKey']) {
        var s3_params = {
          'accessKeyId': jsonData['AccessKeyID'],
          'secretAccessKey': jsonData['SecretAccessKey'],
          'Bucket': jsonData['bucket']
        };  
        var s3 = new AWS.S3(s3_params);

        s3.getBucketAcl(params = { 'Bucket': jsonData['bucket'] }, function (err, data) {
          if (err) {
            $("#messages").toggleClass('text-danger', false);
            $("#messages").toggleClass('text-info', true);
            $("#messages").html("There was an error with the credentials: " + err + "<br/>");
          } else {
            $("#loginContainer").hide();
            $("#messages").html(
'<p>Your credentials appear to be valid.  If something goes wrong, you can re-enter them by clicking <a href="#" onClick="$(\'#loginContainer\').show(); $(\'#messages\').empty();">here</a><br/>');
            localStorage.setItem("access_key_id", jsonData['AccessKeyID']);
            localStorage.setItem("secret_access_key", jsonData['SecretAccessKey']);
            localStorage.setItem("bucket", jsonData['bucket']);
            localStorage.setItem("username", jsonData['username']);

            $("#describeContainer").show();
            $("#fileContainer").show();
          }
        });
      }
    } else {
      $("#messages").toggleClass('text-danger', true);
      $("#messages").toggleClass('text-info', false);
      $("#messages").html("There was an error processing the credentials.  Paste them EXACTLY as you received them and try again.");
    }
  });

  // Add event listener to upload button
  // Not sure why the jQuery selector doeesn't work here
  var fileChooser = document.getElementById("fileChooser");
  $("#uploadButton").click(function(e) { 
    e.preventDefault();
    var s3_params = {
          'accessKeyId': localStorage.getItem("access_key_id"),
          'secretAccessKey': localStorage.getItem("secret_access_key"),
          'Bucket': localStorage.getItem("bucket")
    };

    var s3_bucket = new AWS.S3(s3_params);
    var file = fileChooser.files[0];
    var packageName = $("#packageName").val();
    var packageAuthor = $("#packageAuthor").val();
    var telephone = $("#telephone").val();
    var email = $("#email").val();
    if (file && packageName && packageAuthor && telephone && email) {
      // Everything is here?
      var descriptionFile = packageName + "/metadata.txt";
      var binaryFile = packageName + "/" + file.name;
      var textBody = "Package Name: " + packageName + "\nAuthor/Department: " + packageAuthor + "\nTelephone: " + telephone + "\nEmail: " + email + "\nContents: " + file.name;

      // Write description file
      var m_params = { Bucket: localStorage.getItem("bucket"), Key: descriptionFile, Body: textBody };
      s3_bucket.putObject(m_params, function (err, data) {
        if(err) {
          $("#messages").toggleClass('text-danger', true);
          $("#messages").toggleClass('text-info', false);
          $("#messages").html(err);
        } else {
          var b_params = { Bucket: localStorage.getItem("bucket"), Key: binaryFile, ContentType: file.type, Body: file };
          s3_bucket.putObject(b_params, function (err, data) {
            if(err) {
              $("#messages").toggleClass('text-danger', true);
              $("#messages").toggleClass('text-info', false);
              $("#messages").html(err);
            } else {
              $("#describeContainer").hide();
              $("#fileContainer").hide();
              $("#submitAnother").show();
            }
          });
        }
      });
    } else {
      $("#messages").toggleClass('text-danger', true);
      $("#messages").toggleClass('text-info', false);
      $("#messages").html("Please provide all of the requested information below.");
    }
  });
}
