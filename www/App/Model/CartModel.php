<?php
    class CartModel extends BaseModel
    {
        public function __construct()
        {
            parent::__construct(new PhonesDataProvider());
        }
        public function procceedOrder($orderList)
        {
            // make sure orderList is not empty
            if (is_null($orderList) || count($orderList) == 0)
                return (object)['status' => false, 'msg' => 'Order List is Empty', 'invalid_products' => null];

            // if api is used not from our angular app 
            // make sure all items are stored in our product list
            $notFoundList = [];
            foreach($orderList as $orderItem)
            {
                $isInList = false;
                foreach($phones as $phone)
                    if ($orderItem->Model == $phone->Model && $orderItem->Brand == $phone->Brand)
                    {
                        $isInList = true;
                        break;
                    }
                if (!$isInList)
                    array_push($notFoundList, $orderItem);
            }

            if (is_null($notFoundList) || count($notFoundList) == 0)
            {
                // send email to client
                // send email to admin@shop.dev
                return (object)['status' => true, 'msg' => ''];
            }

            return (object)['status' => false, 'msg' => 'Products were not found', 'invalid_products' => $notFoundList];
        }
    }
?>