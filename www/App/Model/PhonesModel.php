<?php
    require 'FilterArgs.php';
    class PhonesModel extends BaseModel
    {
        public function __construct()
        {
            parent::__construct();
        }
        public function phonesAmount()
        {
            $phones = json_decode(file_get_contents("App/AppData/phones.json"));
            return count($phones);
        }
        public function filteredAmount($filter)
        {
            if ($filter === null || $filter === FilterArgs::Defaults())
                return $this->phonesAmount();

            $phones = json_decode(file_get_contents("App/AppData/phones.json"));

            $phones = $this->applyFilter($phones, $filter);

            return count($phones);
        }
        public function getPhones($page)
        {
            $phones = json_decode(file_get_contents("App/AppData/phones.json"));
            return ($page > 0) ? $this->paginate($phones, $page) : $phones;
        }
        public function getFiltered($filter, $page)
        {
            if ($filter === null || $filter === FilterArgs::Defaults())
                return $this->getPhones();

            $phones = json_decode(file_get_contents("App/AppData/phones.json"));

            $phones = $this->applyFilter($phones, $filter);

            return ($page > 0) ? $this->paginate($phones, $page) : $phones;
        }
        public function defaultFilter()
        {
            $phones = json_decode(file_get_contents("App/AppData/phones.json"));
            return FilterArgs::Defaults($phones);            
        }
        private function paginate($phones, $page, $perPage = 9)
        {
			$startAt = ($page - 1) * $perPage;
			return array_slice($phones, $startAt, $perPage);
        }
        private function applyFilter($phones, $params)
        {
            $buffer = [];

			foreach($phones as $phone)
				if (
					$phone->Price >= $params->LowerPricePoint &&
					$phone->Price <= $params->UpperPricePoint &&
					$phone->DisplaySize >= $params->MinDisplaySize &&
					$phone->DisplaySize <= $params->MaxDisplaySize &&
					$phone->Ram >= $params->MinRam &&
					$phone->Ram <= $params->MaxRam &&
					(
						$phone->Brand == $params->Brand ||
						$params->Brand == null
					) &&
					(
						$phone->DualSim == $params->DualSim ||
						$params->DualSim == null
					)
				)
				{
					array_push($buffer, $phone);
				}
            return $buffer;
        }
    }
?>