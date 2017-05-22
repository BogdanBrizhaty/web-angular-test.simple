<?php

    class FilterArgs
    {
        // public $Model; // does it really neascecery?
        public $Brand;
        public $LowerPricePoint;
        public $UpperPricePoint;        
        public $MinDisplaySize;
        public $MaxDisplaySize;        
        public $MinRam;
        public $MaxRam;            
        public $DualSim;
        public static function Defaults($phones)
        {
			$args = new FilterArgs();

			$phonesLength = count($phones);

			// NULL for any
			$args->Brand = null;
			$args->DualSim = null;

			$args->LowerPricePoint = $phones[0]->Price;
			$args->UpperPricePoint = $phones[0]->Price;
			$args->MinDisplaySize = $phones[0]->DisplaySize;
			$args->MaxDisplaySize = $phones[0]->DisplaySize;
			$args->MinRam = $phones[0]->Ram;
			$args->MaxRam = $phones[0]->Ram;

			foreach($phones as $phone)
			{
				// Price
				if ($phone->Price < $args->LowerPricePoint)
					$args->LowerPricePoint = $phone->Price;
				if ($phone->Price > $args->UpperPricePoint)
					$args->UpperPricePoint = $phone->Price;
				// Display size
				if ($phone->DisplaySize < $args->MinDisplaySize)
					$args->MinDisplaySize = $phone->DisplaySize;
				if ($phone->DisplaySize > $args->MaxDisplaySize)
					$args->MaxDisplaySize = $phone->DisplaySize;
				// Ram
				if ($phone->Ram < $args->MinRam)
					$args->MinRam = $phone->Ram;
				if ($phone->Ram > $args->MaxRam)
					$args->MaxRam = $phone->Ram;
			}
			return $args;
        }
    }
?>