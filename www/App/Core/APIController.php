<?php

class ApiController {
	
	protected $model;
	
	function __construct()
	{
        // header('Title')
		header('Access-Control-Allow-Origin: *');
		header("Content-Type: application/json");
	}
	
	// действие (action), вызываемое по умолчанию
	function ActionIndex()
	{
		// todo	w
	}
}
?>