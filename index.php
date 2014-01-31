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
        <h2>Enter your S3 credentials</h2>
        <p>These should have been supplied to you in a file.  Put the contents of that file here.</p>
        <div class="form-group">
          <label for="jsonCredentials">Credentials</label>
          <textarea class="form-control" rows="3" required></textarea>
        </div>
      </form>
    </div><!-- container -->

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="//code.jquery.com/jquery.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <!-- Amazon's Javascript SDK for Browsers -->
    <script src="lib/dist/aws-sdk-2.0.0-rc9.min.js"></script>
  </body>
</html>
