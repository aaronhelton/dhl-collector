$(init);

function isJsonString(s) {
  try {
    JSON.parse(s);
  } catch (e) {
    return false;
  }
  return true;
}

function listBucket(s3) {

}

function init() {
  // Hide all elements to start off 

  $( '#loginContainer' ).hide();
  $( '#describeContainer' ).hide();
  $( '#submitAnotherContainer' ).hide();
  $( '#recentPackagesContainer' ).hide();


  // Check local storage for credentials
  if (localStorage.getItem("access_key_id") && localStorage.getItem("secret_access_key") && localStorage.getItem("bucket")) {
    $( "#console" ).html('<span class="text-info">Found credentials from a previous session.  If something goes wrong, you can re-enter them by clicking <a href="#" onClick="$(\'#loginContainer\').show(); $(\'#messages\').empty();">here</a></span>');
    $( '#describeContainer' ).show();
    $( '#packageAuthor' ).val( localStorage.getItem( 'department' ) );
    $( '#telephone' ).val( localStorage.getItem( 'phone' ) );
    $( '#email' ).val( localStorage.getItem( 'email' ) );

    $( '#describeContainer' ).show();
    $( '#recentPackagesContainer' ).show();
  } else {
    $( '#loginContainer' ).show();
    $( "#console" ).empty();
  }

  // To do: consider the implications of persistent storage versus sessional for a random package name.  
  // So far there don't seem to be any issues doing it this way.
  $.get("lib/as.txt", function(data) {
    var lines = data.split("\n");
    var idx = Math.floor(Math.random() * lines.length);
    localStorage.setItem("packageName", lines[idx].toLowerCase() + "-");
    $.get("lib/ns.txt", function(data) {
      var lines = data.split("\n");
      var idx = Math.floor(Math.random() * lines.length);
      localStorage.setItem("packageName", localStorage.packageName + lines[idx].toLowerCase());
    });
  });

  $( '#loginContainer' ).on('click', '#validateCredentials', function(e) {
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
            $("#console").html('<span class="text-danger">There was an error with the credentials: ' + err + '<br/></span>');
          } else {
            $("#console").html(
'<span class="text-success">Your credentials appear to be valid.  If something goes wrong, you can re-enter them by clicking <a href="#" onClick="$(\'#loginContainer\').show(); $(\'#messages\').empty();">here</a></span>');
            localStorage.setItem("access_key_id", jsonData['AccessKeyID']);
            localStorage.setItem("secret_access_key", jsonData['SecretAccessKey']);
            localStorage.setItem("bucket", jsonData['bucket']);
            localStorage.setItem("username", jsonData['username']);
            localStorage.setItem("department", jsonData['Department']);
            localStorage.setItem("email", jsonData['Contact Email']);
            localStorage.setItem("phone", jsonData['Phone']);

            $( '#packageAuthor' ).val( jsonData['Department'] );
            $( '#telephone' ).val( jsonData['Phone'] );
            $( '#email' ).val( jsonData['Contact Email'] );

            $( '#describeContainer' ).show();
            $( '#recentPackagesContainer' ).show();
            $( '#loginContainer' ).hide();
          }
        });
      }
    } else {
      $("#console").html('<span class="text-danger">There was an error processing the credentials.  Paste them EXACTLY as you received them and try again.</span>');
    }

  });


  $( '#describeContainer' ).on('click', '#uploadButton', function(e) {
    e.preventDefault();
    var s3_params = {
          'accessKeyId': localStorage.getItem("access_key_id"),
          'secretAccessKey': localStorage.getItem("secret_access_key"),
          'Bucket': localStorage.getItem("bucket")
    };

    var milliseconds = (new Date).getTime();
    var s3_bucket = new AWS.S3(s3_params);
    var file = fileChooser.files[0];
    // Ensure the package is as unique as we can get it.  Also helps to figure out when things were put there.
    var packageName = localStorage.getItem("packageName") + "-" + milliseconds.toString();
    //console.log( packageName );
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
          $("#console").html('<span class="text-danger">' + err + '</span>');
        } else {
          var b_params = { Bucket: localStorage.getItem("bucket"), Key: binaryFile, ContentType: file.type, Body: file };
          s3_bucket.putObject(b_params, function (err, data) {
            if(err) {
              $("#console").html('<span class="text-danger">' + err + '</span>');
            } else {
              $("#describeContainer").hide();
              $( '#submitAnotherContainer' ).show();
            }
          });
        }
      });
    } else {
      $("#console").html('<span class="text-danger">Please provide all of the requested information below.</span>');
    }
    
  });

}
