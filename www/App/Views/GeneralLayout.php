<!DOCTYPE html>
<html ng-app="app">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta name="description" content="" />
		<meta name="keywords" content="" />
		<?php extract($data); ?>
		<title><?php echo $title; ?></title>
		<script src="/App/client/Scripts/jquery-3.2.0.min.js"></script>
		<script src="/App/client/Scripts/angular.min.js"></script>
		<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-route.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <!--<script src="/App/Scripts/app.js"></script>-->

        <script src="/App/client/App/app.js"></script>
        <script src="/App/client/App/config.js"></script>
        <script src="/App/client/App/Services/CartService.js"></script>
        <script src="/App/client/App/Services/ErrorService.js"></script>
        <script src="/App/client/App/Controllers/AppController.js"></script>
        <script src="/App/client/App/Controllers/CartController.js"></script>
        <script src="/App/client/App/Controllers/OrderingController.js"></script>
		
        <script src="/App/client/Scripts/hint.js"></script>

		<style>

		</style>
	</head>
	<body style="height:100%;">
		<?php include 'App/Views/'.$content_view; ?>
	</body>
</html>