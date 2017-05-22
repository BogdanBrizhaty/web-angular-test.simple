<?php 

	class Error404Controller extends BaseController
	{
		function __construct()
		{
			parent::__construct();
		}
		public function ActionIndex()
		{
			$data['title'] = "Error";
			
			$this->view->generate('Error404.php', 'GeneralLayout.php', $data);
		}
	}

?>