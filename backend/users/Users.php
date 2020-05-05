<?php

	/**
	 * Users
	 */
	class Users
	{

		private $UsuarioDb    = 'root';
		private $PasswordDb   = '';
		private $ServidorDb = 'localhost';
		private $NameDb     = 'frontend_test';

		public function __construct(){
			$this->conexion();
		}

		public function conexion(){
			$this->mysql = mysqli_connect(
			                       $this->ServidorDb,
			                       $this->UsuarioDb,
			                       $this->PasswordDb,
			                       $this->NameDb
							   );
			if (!$this->mysql) {
				$this->apiResponse(array('status' => false,'data'=> 'Error al conectar a la base de datos'));
			}
		}

		public function getUsers($params){
			if ($params['id']<>'' ){ $where .= " id = $params[id] "; }
			$where =($where<>'')? " WHERE $where " : "" ;

			// if(!empty($params)){
				
			// 	// $where = " WHERE ".str_replace(":", "=",  $params[where]);
			// }
			// print_r($params);
			$sql = "SELECT 
						id,
						nombres,
						apellidos,
						identificacion,
						rol,
						estado,
						telefono,
						correo,
						username,
						contrasena,
						token
					FROM users $where ORDER BY id DESC  ";
			$query = mysqli_query($this->mysql,$sql);	
					
			while($result = $query->fetch_assoc()){
				$arrayUsers[] = array (
					"id"        => $result["id"],
					"nombres"        => utf8_encode($result["nombres"]),
					"apellidos"      => utf8_encode($result["apellidos"]),
					"identificacion" => $result["identificacion"],
					"rol"            => $result["rol"],
					"estado"         => $result["estado"],
					"telefono"       => $result["telefono"],
					"contrasena"         => $result["contrasena"],
					"correo"         => $result["correo"]
				);
				
			}
			if(empty($arrayUsers)){
				$arrayResponse = array('status'=>false, 'detalle' =>'No existe usuario con esos datos' );
			}
			else{
				$arrayResponse = array('status'=>true, 'data' =>$arrayUsers );
			}

			return $arrayResponse;
		}

		public function addUser($params){

            // INSERTAR EL REGISTRO EN LA BASE DE DATOS
            $sql="INSERT INTO users
            		(
						nombres,
						apellidos,
						identificacion,
						rol,
						estado,
						username,
						contrasena,
						telefono,
						correo

            		) VALUES
            		(
            			'$params[nombres]',
						'$params[apellidos]',
						'$params[identificacion]',
						'$params[rol]',
						'$params[estado]',
						'$params[correo]',
						'$params[contrasena]',
						'$params[telefono]',
						'$params[correo]'
            		)";
            $query=mysqli_query($this->mysql, $sql);
            if ($query) {
				$lastId = mysqli_insert_id($this->mysql);
				$response = array('response' => 'success', "id" => $lastId);
            }
            else {
            	unlink("images/".$fileName);
				$response = array('response' => 'failed', 'msg'=>'No se inserto el usuario', 'debug' => "" );
            }
			
			return array('status' => 200, $response	);

			// return $response;
		}

		public function editUser($params){
	    	// ACTUALIZAR EL REGISTRO EN LA BASE DE DATOS
            $sql="UPDATE users SET
						nombres        = '$params[nombres]',
						apellidos      = '$params[apellidos]',
						identificacion = '$params[identificacion]',
						rol            = '$params[rol]',
						correo         = '$params[correo]'
					WHERE id=$params[id] ";
            $query=mysqli_query($this->mysql, $sql);
            if ($query) {
				$response = array('response' => 'success', 'msg'=>'Se Actualizo correctamente', 'debug' =>  'N/F' );
            }
            else {
				$response = array('response' => 'failed', 'msg'=>'No se Actualizo el usuario', 'debug' => $sql );
            }
		    

			return array('status' => 200, $response	);
		}

		public function deleteUser($params){
        	$sql="DELETE from users WHERE id=$params[id] ";
        	$query=mysqli_query($this->mysql, $sql);
        	if ($query) {
				$response = array('status' => 'success', 'msg'=>'Se elimino correctamente' );
            }
            else {
				$response = array('status' => 'failed', 'msg'=>'No se elimino el usuario' );
            }
			return array('status' => 200, $response	);
		}

		public function apiResponse($response){
			$http_response_code = array(
				100 => 'Continue',
				101 => 'Switching Protocols',
				200 => 'OK',
				201 => 'Created',
				202 => 'Accepted',
				203 => 'Non-Authoritative Information',
				204 => 'No Content',
				205 => 'Reset Content',
				206 => 'Partial Content',
				300 => 'Multiple Choices',
				301 => 'Moved Permanently',
				302 => 'Found',
				303 => 'See Other',
				304 => 'Not Modified',
				305 => 'Use Proxy',
				306 => '(Unused)',
				307 => 'Temporary Redirect',
				400 => 'Bad Request',
				401 => 'Unauthorized',
				402 => 'Payment Required',
				403 => 'Forbidden',
				404 => 'Not Found',
				405 => 'Method Not Allowed',
				406 => 'Not Acceptable',
				407 => 'Proxy Authentication Required',
				408 => 'Request Timeout',
				409 => 'Conflict',
				410 => 'Gone',
				411 => 'Length Required',
				412 => 'Precondition Failed',
				413 => 'Request Entity Too Large',
				414 => 'Request-URI Too Long',
				415 => 'Unsupported Media Type',
				416 => 'Requested Range Not Satisfiable',
				417 => 'Expectation Failed',
				500 => 'Internal Server Error',
				501 => 'Not Implemented',
				502 => 'Bad Gateway',
				503 => 'Service Unavailable',
				504 => 'Gateway Timeout',
				505 => 'HTTP Version Not Supported',
			);
			
			header('Content-Type: application/json; charset=utf-8');
			if (is_array($response['data'])) {
				foreach ($response['data'] as $key => $arrayResult) {
					if (is_array($arrayResult)) {
						foreach ($arrayResult as $campo => $valor) {
							if (!is_array($valor)) {
								$response['data'][$key][$campo]=utf8_encode($valor);
							}
	
						}
					}
				}
			}
			// print_r($_SERVER);
			$json_response = json_encode($response['data']);
			echo $json_response;
			exit;
		}

	}


 ?>