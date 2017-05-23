<?php
    interface IDataProvider
    {
        function getAllData();
        function getData($parameters);
        function addData($item);
        function deleteData($item);
    }
?>