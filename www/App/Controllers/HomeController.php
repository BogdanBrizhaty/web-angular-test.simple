<?php 

	class HomeController extends BaseController
	{
		function __construct()
		{
			parent::__construct();
		}
		public function ActionIndex()
		{
			$data['title'] = "Awesome shop";

			$this->view->generate('Home.php', 'GeneralLayout.php', $data);
		}
	}

?>