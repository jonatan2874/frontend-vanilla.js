<?php
foreach($_POST as $nombre_campo => $valor){
   $asignacion = "\$" . $nombre_campo . "='" .utf8_decode($valor). "';";
   eval($asignacion);
}
foreach($_GET as $nombre_campo => $valor){
   $asignacion = "\$" . $nombre_campo . "='" .utf8_decode($valor). "';";
   eval($asignacion);
}

?>