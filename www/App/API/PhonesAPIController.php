<?php

class PhonesApiController extends ApiController {
	
	public function __construct()
	{
        	parent::__construct();
			$this->model = new PhonesModel();
	}
	
	public function ActionIndex()
	{
		echo 'service unavailable. Available API\'s: GET, FILTER, AMOUNT, FILTERDEFAULTS;';
	}
	public function ActionGet()
	{
		$page = $this->page();	
		echo json_encode($this->model->getPhones($page));
	}
	public function ActionAmount()
	{
		echo json_encode(['amount' => $this->model->phonesAmount()]);
	}
	public function ActionFilteredAmount()
	{
		if (!isset($_POST['filter']) || empty($_POST['filter']) || $_POST['filter'] === null)
		{
			$this->ActionAmount();
			return;
		}
		echo json_encode(['amount' => $this->model->filteredAmount($filter)]);
	}
	
	public function ActionFilter()
	{
		$page = $this->page();	
		if (!isset($_POST['filter']) || empty($_POST['filter']) || $_POST['filter'] === null)
		{
			echo json_encode($this->model->getPhones($page));
			return;
		}
		echo json_encode($this->model->getFiltered($_POST['filter']));
	}
	public function ActionFilterDefaults()
	{
		echo json_encode($this->model->defaultFilter());
	}
	private function page()
	{
		return (isset($_GET['page']) && !empty($_GET['page'] && $_GET['page'] !== null)) ? intval($_GET['page']) : 0;		
	}
	 
}
?>