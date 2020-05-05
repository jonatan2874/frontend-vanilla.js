<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: *");
	header("Access-Control-Allow-Headers: *");
	error_reporting(E_ERROR | E_PARSE);

	require 'Users.php';
	// OBJETO DE LA CLASE
	$obj    = new Users();
	$method = $_SERVER['REQUEST_METHOD'];
	$json   = file_get_contents('php://input');
	$data   = json_decode($json,true);
	switch($method){
		/*
		 * Nota: Por regla el JSON debe estar aramado con comilla doble no simple para los string.
		*/

		case 'GET':
				$result=$obj->getUsers($_GET);
				if($result['status']){
					$response['status'] = 202;
					$response['data']   = $result['data'];
				}else{
					$response['status'] = 400;
					$response['data']   = array('failure'=>'No hay informacion para mostrar','detalle'=>$result['detalle']);
				}
		break;

		case 'POST':
			$result =$obj->addUser($data);
			if($result['status']){
				$response['status'] = 202;
				$response['data']=array('status'=>'success',"data"=> $result);
			}else{
				$response['status'] = 400;
				$response['data']=array('failure'=>'Ha ocurrido un error','detalle'=>$result['detalle']);
			}
			break;

		case 'PUT':
			$result =$obj->editUser($data);
			if($result['status']){
				$response['status'] = 202;
				$response['data']=array('status'=>'success',"data"=> $result);
			}else{
				$response['status'] = 400;
				$response['data']=array('failure'=>'Ha ocurrido un error','detalle'=>$result['detalle']);
			}
			break;

		case 'DELETE':
			$result =$obj->deleteUser($data);
			if($result['status']){
				$response['status'] = 202;
				$response['data']=array('status'=>'success',"data"=>$result);
			}else{
				$response['status'] = 400;
				$response['data']=array('failure'=>'Ha ocurrido un error','detalle'=>$result['detalle']);
			}
			break;

		default:
			$response['status'] = 405;
        	$response['data']=array('failure'=>'Metodo HTTP no configurado para respuesta.');
			break;
	}

	$obj->apiResponse($response);


?>