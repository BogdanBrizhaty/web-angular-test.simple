<?php

	class BaseModel
	{
		protected $dataProvider = null;
		// protected $Repository;
		public function __construct(IDataProvider $dataProviderInjection)
		{
			$this->dataProvider = $dataProviderInjection;
		}
	}
?>