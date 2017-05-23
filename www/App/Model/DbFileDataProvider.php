<?php
    class JsonFileDataProvider implements IDataProvider
    {
        public function getData()
        {
            return json_decode(file_get_contents('App/AppData/phones.json'))
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