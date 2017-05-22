<?php

class BaseController {
	
	protected $model;
	protected $view;
	
	function __construct()
	{
		$this->view = new BaseView();
	}
	
	// действие (action), вызываемое по умолчанию
	function ActionIndex()
	{
		// todo	w
	}
}
?>