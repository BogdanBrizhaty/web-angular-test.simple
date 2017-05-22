<!DOCTYPE html>
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta name="description" content="" />
		<meta name="keywords" content="" />
		<?php extract($data); ?>
		<title><?php echo $title; ?></title>
		<script src="/App/Scripts/jquery-3.2.0.min.js"></script>
		<script src="/App/Scripts/angular.min.js"></script>
		<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-route.js"></script>
	</head>
	<body style="height:100%;">
		<?php include 'App/Views/'.$content_view; ?>
	</body>
</html>