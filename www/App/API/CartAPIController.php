<?php
    class CartAPIController extends APIController
    {
        public function __construct()
        {
            parent::__construct();
			$this->model = new CartModel();
        }
        public function ActionIndex()
        {
            echo 'Cart API';
        }
        public function ActionProcceedOrder()
        {
            $order = (isset($_POST['order'])) ? $_POST['order'] : null;
            $clientinfo = (isset($_POST['clientinfo'])) ? $_POST['clientinfo'] : null;
            echo json_encode($this->model->procceedOrder(json_decode($order), json_decode($clientinfo)));
        }
    }
?>