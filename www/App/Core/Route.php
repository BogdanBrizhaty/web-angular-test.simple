<?php

class Route
{

	static function start()
	{
		$controller_name = 'Home';
		$action_name = 'Index';
		
		$routes = explode('/', $_SERVER['REQUEST_URI']);

		$routes2 = explode('?', $routes[1]);
		if ( !empty($routes2[0]) )
		{	
			$controller_name = $routes2[0];
		}
		if (!empty($routes[2]))
		$routes3 = explode('?', $routes[2]);
		if ( !empty($routes3[0]) )
		{
			$action_name = $routes3[0];
		}
		// $model_name = $controller_name.'Model';
		
		$model_name = (strpos(strtolower($controller_name), 'api') !== false) ? str_replace('api', '', $controller_name).'Model' : $controller_name.'Model';

		// echo $model_name;

		$controller_name = $controller_name.'Controller';
		$action_name = 'Action'.$action_name;

		$model_file = strtolower($model_name).'.php';
		$model_path = "App/Model/".$model_file;
		// echo $model_path;
		if(file_exists($model_path))
		{
			include "App/Model/".$model_file;
			// echo 'exists';
		}

		$controller_file = strtolower($controller_name).'.php';
        if (strpos($controller_name ,'api') !== false)
        {
            $controller_path = "App/API/".$controller_file;
            if(file_exists($controller_path))
            {
                include "App/API/".$controller_file;
            }
            else
                Route::ErrorPage404();
        }
        else
        {
            $controller_path = "App/Controllers/".$controller_file;
            if(file_exists($controller_path))
            {
                include "App/Controllers/".$controller_file;
            }
            else
                Route::ErrorPage404();
        }
		
		$controller = new $controller_name;
		$action = $action_name;
		
		if(method_exists($controller, $action))
		{
			$controller->$action();
		}
		else
			Route::ErrorPage404();
	
	}

	function ErrorPage404()
	{
        $host = 'http://'.$_SERVER['HTTP_HOST'].'/';
        header('HTTP/1.1 404 Not Found');
		header("Status: 404 Not Found");
		
		header('Location:'.$host.'Error404');
    }    
}
