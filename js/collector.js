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
    $( "#credentialsForm" ).show();
  } else {
    $( "#credentialsForm" ).hide();
  }
}

function listBucket(s3) {

}


function init() {
  // Hide elements that need to start off that way
  $("#describeContainer").hide();
  $("#fileContainer").hide();
  

  // Check local storage for credentials
  if (localStorage.getItem("access_key_id") && localStorage.getItem("secret_access_key") && localStorage.getItem("bucket")) {
    toggleForm("off");
    $( "#messages" ).addClass("text-info");
    $( "#messages" ).html('Found credentials from a previous session.  If something goes wrong, you can re-enter them by clicking <a href="#" onClick="toggleForm(\'on\')">here</a><br/>');
  } else {
    toggleForm("on");
    $( "#messages" ).empty();
  }

  
}
/*
	  
	        $("#validateCredentials").click(function(e) {
        e.preventDefault();
        var str = $("#jsonCredentials").val();
        if (str) {
          if (isJsonString(str)) {
            var jsonData = JSON.parse(str);
          }
          if (jsonData && jsonData['username'] && jsonData['bucket'] && jsonData['AccessKeyID'] && jsonData['SecretAccessKey']) {
            var username = jsonData['username'];
            bucket = jsonData['bucket'];
            var access_key_id = jsonData['AccessKeyID'];
            var secret_access_key = jsonData['SecretAccessKey'];

            //$( "#console" ).append("Found username " + username + ", bucket " + bucket + " and other credentials...<br/>");

            creds = AWS.credentials = AWS.config.credentials = ({
              'accessKeyId': access_key_id,
              'secretAccessKey': secret_access_key
            });
            var s3 = new AWS.S3({params: {Bucket: bucket}});

            s3.getBucketAcl(params = { 'Bucket': bucket }, function (err, data) {
              if (err) {
                $("#messages").html("There was an error with the credentials: " + err + "<br/>");
              } else {
                $("#loginContainer").hide();
                $("#messages").html('<p>Your credentials appear to be valid.  If something goes wrong, you can re-enter them by clicking <a href="#" onClick="restoreForm()">here</a><br/>');
                localStorage.setItem("access_key_id", access_key_id);
                localStorage.setItem("secret_access_key", secret_access_key);
                localStorage.setItem("bucket", bucket);
                localStorage.setItem("username", username);

                $("#describeContainer").show();
                $("#fileContainer").show();
              }
            });
          }
        }
      });

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
        if (file) {
          $("#results").empty();
          var params = {Bucket: localStorage.getItem("bucket"), Key: file.name, ContentType: file.type, Body: file};
          s3_bucket.putObject(params, function (err, data) {
            $("#results").html( err ? 'ERROR!' + err : 'UPLOADED.');
          });
        } else {
          $("#results").html("Nothing to upload.");
        }
      });
*/
