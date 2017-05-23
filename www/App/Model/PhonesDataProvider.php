<?php
    class PhonesDataProvider implements IDataProvider
    {
        public function getAllData()
        {
            return json_decode(file_get_contents('App/AppData/phones.json'));
        }
        public function getData($parameters)
        {
            throw new Exception('Not implemented');
        }
        public function addData($item)
        {
            throw new Exception('Not implemented');            
        }
        public function deleteData($item)
        {
            throw new Exception('Not implemented');
        }
    }
?>