<?php

require_once 'vendor/autoload.php';

// Carrega as variáveis de ambiente do arquivo .env
$dotenv = Dotenv\Dotenv::createImmutable('./');
$dotenv->load();


class Database {
    private $host = "";
    private $db_name = "";
    private $username = "";
    private $password = "";
    private $socket = ""; // Não é necessário para conexões remotas
    private $conn = null;

    public function __construct()
    {
        $this->host = $_ENV['DB_HOST'];
        $this->db_name = $_ENV['DB_DATABASE'];
        $this->username = $_ENV['DB_USERNAME'];
        $this->password = $_ENV['DB_PASSWORD'];
        $this->socket = $_ENV['DB_SOCKET'];
        
    }

    // Método para obter a conexão
    public function conn() {
        if ($this->conn === null) {
            if($this->socket != "") {
                $this->conn = new \mysqli($this->host, $this->username, $this->password, $this->db_name, null, $this->socket);                
            } else {
                $this->conn = new \mysqli($this->host, $this->username, $this->password, $this->db_name);                
            }

            // Verifica a conexão
            if ($this->conn->connect_error) {
                die("Erro de conexão: " . $this->conn->connect_error);
            }

            // Define o charset da conexão
            $this->conn->set_charset("utf8mb4");
        }

        return $this->conn;
    }

    public function getRows($sql) {
        $conn = $this->conn();
        if ($conn === null) {
            die("Erro: Conexão não foi estabelecida.");
        }

        $result = $conn->query($sql);

        if ($result === false) {
            die("Erro na consulta: " . $conn->error);
        }

        $rows = [];
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }

        return $rows;
    }

    public function getRow($sql) {
        $conn = $this->conn();
        if ($conn === null) {
            die("Erro: Conexão não foi estabelecida.");
        }

        $result = $conn->query($sql);

        if ($result === false) {
            die("Erro na consulta: " . $conn->error);
        }

        return $result->fetch_assoc();
    }

    public function insert($sql) {
        $conn = $this->conn();
        if ($conn === null) {
            die("Erro: Conexão não foi estabelecida.");
        }
    
        // Execute a consulta de inserção
        if ($conn->query($sql) === true) {
            // Retorna o ID do último registro inserido, caso queira utilizá-lo
            return $conn->insert_id;
        } else {
            // Retorna uma mensagem de erro em vez de interromper a execução
            return array(false, "Erro na inserção: " . $conn->error);
        }
    }

    public function query($sql) {
        $conn = $this->conn();
        if ($conn === null) {
            die("Erro: Conexão não foi estabelecida.");
        }
    
        // Execute a consulta de atualização
        if ($conn->query($sql) === true) {
            // Retorna o número de linhas afetadas
            return $conn->affected_rows;
        } else {
            // Retorna uma mensagem de erro em vez de interromper a execução
            return array(false, "Erro na atualização: " . $conn->error);
        }
    }
}


?>
