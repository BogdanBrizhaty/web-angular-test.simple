<?php

class PhonesApiController extends ApiController {
	
	function __construct()
	{
        	parent::__construct();
	}
	
	// действие (action), вызываемое по умолчанию
	function ActionIndex()
	{
		echo 'phones api called';
		// todo	w
	}
}
?>