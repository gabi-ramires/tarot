<?php
// Definindo as variáveis
$to = 'engenheira.ramires@gmail.com';
$subject = 'Assunto do Email';
$message = 'Olá, este é um email de teste enviado a partir de um script PHP!';

// Cabeçalhos do email
$headers = "From: teste@gabrielaramires.com.br\r\n";
$headers .= "Reply-To: teste@gabrielaramires.com.br\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Enviar o email
if (mail($to, $subject, $message, $headers)) {
    echo "Email enviado com sucesso!";
} else {
    echo "Falha ao enviar o email.";
}
?>
