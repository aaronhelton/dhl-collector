<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="United Nations Libraries Material Collector">
    <meta name="author" content="United Nations">
    <title>DHL Material Collector</title>
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
    <style>
      .filedrop { border: 2px dashed #ccc; border-radius: 5px; min-height: 10em;}
    </style>
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="../../assets/js/html5shiv.js"></script>
      <script src="../../assets/js/respond.min.js"></script>
    <![endif]-->

  <head>
  <body>
    <div class="container">
      <form role="form">
        <h2>Please describe your materials</h2>
        <div class="form-group">
          <label for="packageName">Package Name</label>
          <input type="text" class="form-control" id="packageName" placeholder="Enter package name" required>
        </div>
        <div class="form-group">
          <label for="packageAuthor">Author/Department</label>
          <input type="text" class="form-control" id="packageAuthor" placeholder="Enter author/department" required>
        </div>
        <div class="form-group">
          <label for="packageDescription">Package Description</label>
          <textarea class="form-control" rows="3" id="packageDescription" placeholder="Enter a brief description"></textarea>
        </div>
        <h2>Now, drop some files here</h2>
        <div class="form-group filedrop">
          
        </div>
        <h2>And finally, we need your S3 credentials</h2>
        <p>These should have been supplied to you in a file.  Drop that file here.</p>
      </form>
    </div><!-- container -->

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="//code.jquery.com/jquery.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <!-- Amazon's Javascript SDK for Browsers -->
    <script src="lib/dist/aws-sdk-2.0.0-rc9.min.js"></script>
    <!-- JQuery File Drop by Daniel O'Callahan: https://github.com/danielocallaghan/jquery-s3-filedrop -->
    <script src="lib/jquery.filedrop.js"></script>
  </body>
</html>
