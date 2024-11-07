<?php
namespace Model;

require_once 'database.php';

class Tarot {

    private $dataBase;

    public function __construct() {

        $this->dataBase = new \Database();
    }

    /**
     * Buscar cartas
     * @return array
     */
    public function buscarCartas()
    {
        $sql = "SELECT * FROM `cartas`";
        
        $res = $this->dataBase->getRows($sql);

        return $res;
    }

}

?>
