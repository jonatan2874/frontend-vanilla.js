<?php

	class Token{
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

		public function show($data){
			$sql = "SELECT 
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
					FROM users 
					WHERE token='$data[token]' ";
			$query = mysqli_query($this->mysql,$sql);
			$result = $query->fetch_assoc();

			if(empty($result)){
				$arrayResponse = array('status'=>false, 'detalle' =>'No existe usuario con esos datos' );
			}
			else{
				$arrayResponse = array('status'=>true, 'data' =>$result );
			}

			return $arrayResponse;
			// $this->apiResponse($arrayResponse);
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