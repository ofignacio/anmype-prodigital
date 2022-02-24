<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// require '../vendor/autoload.php';
require './vendor/autoload.php';

$app = new \Slim\App;

// function getConnection()
// {
//     $dbhost = "127.0.0.1";
//     $dbuser = "anmypeorg_analytics";
//     $dbpass = '`"uxe.}_V?2,,/"7vN';
//     $dbname = "anmypeorg_analytics";
//     $options = [
//         PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
//         PDO::ATTR_PERSISTENT => false,
//         PDO::ATTR_EMULATE_PREPARES => false,
//         PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
//         PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8 COLLATE utf8_unicode_ci"
//     ];
//     $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass, $options);
//     return $dbh;
// }

function getConnection()
{
    $dbhost = "127.0.0.1";
    $dbuser = "root";
    $dbpass = '';
    $dbname = "analytics";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_PERSISTENT => false,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8 COLLATE utf8_unicode_ci"
    ];
    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass, $options);
    return $dbh;
}

$app->group('/api', function () use ($app) {
    $app->post('/create', function (Request $request, Response $response) {
        $post = (array) $request->getParsedBody();

        $row = [
            'fname' => $post['fname'],
            'email' => $post['email'],
            'phone' => $post['phone']
        ];

        $sql = "INSERT INTO users(fname, email, phone) VALUES(:fname, :email, :phone);";
        $db = getConnection();
        $sth = $db->prepare($sql);
        $sth->bindParam("fname", $row['fname']);
        $sth->bindParam("email", $row['email']);
        $sth->bindParam("phone", $row['phone']);
        $sth->execute();
        $id = $db->lastInsertId();

        $response->getBody()->write((string) json_encode(array(
            'statusCode' => 200,
            'id' => $id
        )));
        $response = $response->withHeader('Content-Type', 'application/json');
        return $response;
    });

    $app->post('/result', function (Request $request, Response $response) {
        $post = (array) $request->getParsedBody();

        $dimension = $post['dimension'];
        $score = $post['score'];
        $id = $post['id'];

        $sql = "INSERT INTO results(dimension, score, idUser) VALUES(:dimension, :score, :idUser);";
        $db = getConnection();
        $sth = $db->prepare($sql);
        $sth->bindParam("dimension", $dimension);
        $sth->bindParam("score", $score);
        $sth->bindParam("idUser", $id);
        $sth->execute();

        $response->getBody()->write((string) json_encode(array(
            'statusCode' => 200
        )));
        $response = $response->withHeader('Content-Type', 'application/json');
        return $response;
    });

    $app->post('/add', function (Request $request, Response $response) {

        $post = (array) $request->getParsedBody();

        $row = [
            'question' => $post['question'],
            'answer' => $post['answer'],
            'id' => $post['id']
        ];

        $sql = "INSERT INTO answers(question, idUser, answer) VALUES(:question, :id, :answer) ON DUPLICATE KEY UPDATE answer = '" . $row['answer'] . "';";

        $sth = getConnection()->prepare($sql);
        $sth->bindParam("question", $row['question']);
        $sth->bindParam("answer", $row['answer']);
        $sth->bindParam("id", $row['id']);
        $sth->execute();

        $response->getBody()->write((string) json_encode(array(
            'statusCode' => 200
        )));
        $response = $response->withHeader('Content-Type', 'application/json');
        return $response;
    });

    $app->post('/questions', function (Request $request, Response $response) {

        $sql = "SELECT * from questions order by position asc;";

        $sth = getConnection()->prepare($sql);
        $sth->execute();
        $todos = $sth->fetchAll(PDO::FETCH_ASSOC);
        $response->getBody()->write((string) json_encode(array(
            'statusCode' => 200,
            'data' => $todos
        )));
        $response = $response->withHeader('Content-Type', 'application/json');
        return $response;
    });

    $app->post('/options', function (Request $request, Response $response) {

        $sql = "SELECT * from options order by idQuestion asc, position asc;";

        $sth = getConnection()->prepare($sql);
        $sth->execute();
        $todos = $sth->fetchAll((PDO::FETCH_ASSOC));
        $response->getBody()->write((string) json_encode(array(
            'statusCode' => 200,
            'data' => $todos
        )));
        $response = $response->withHeader('Content-Type', 'application/json');
        return $response;
    });

    $app->post('/dimensions', function (Request $request, Response $response) {

        $sql = "SELECT * from dimensions order by id asc;";

        $sth = getConnection()->prepare($sql);
        $sth->execute();
        $todos = $sth->fetchAll((PDO::FETCH_ASSOC));
        $response->getBody()->write((string) json_encode(array(
            'statusCode' => 200,
            'data' => $todos
        )));
        $response = $response->withHeader('Content-Type', 'application/json');
        return $response;
    });

    $app->post('/getResults', function (Request $request, Response $response) {

        $post = (array) $request->getParsedBody();

        $id = $post['id'];
        $email = $post['email'];

        $sql = "SELECT * from results where idUser = :id and idUser IN (select idUser from users where email = :email);";

        $sth = getConnection()->prepare($sql);
        $sth->bindParam("id", $id);
        $sth->bindParam("email", $email);
        $sth->execute();
        $todos = $sth->fetchAll((PDO::FETCH_ASSOC));

        $sqlDim = "SELECT * from dimensions order by id asc;";

        $sthDim = getConnection()->prepare($sqlDim);
        $sthDim->execute();
        $todosDim = $sthDim->fetchAll((PDO::FETCH_ASSOC));

        $sqlMay = "SELECT * from maturity;";

        $sthMay = getConnection()->prepare($sqlMay);
        $sthMay->execute();
        $todosMay = $sthMay->fetchAll((PDO::FETCH_ASSOC));

        $sqlAns = "SELECT * from answers where idUser = :id;";

        $sthAns = getConnection()->prepare($sqlAns);
        $sthAns->bindParam("id", $id);
        $sthAns->execute();
        $todosAns = $sthAns->fetchAll((PDO::FETCH_ASSOC));

        $response->getBody()->write((string) json_encode(array(
            'statusCode' => 200,
            'results' => $todos,
            'dimensions' => $todosDim,
            'maturities' => $todosMay,
            'answers' => $todosAns,
        )));
        $response = $response->withHeader('Content-Type', 'application/json');
        return $response;
    });

    $app->post('/getFullResults', function (Request $request, Response $response) {

        
        $sqlUsr = "SELECT * from users;";

        $sthUsr = getConnection()->prepare($sqlUsr);
        $sthUsr->execute();
        $todosUsr = $sthUsr->fetchAll((PDO::FETCH_ASSOC));

        $sql = "SELECT * from results;";

        $sth = getConnection()->prepare($sql);
        $sth->execute();
        $todos = $sth->fetchAll((PDO::FETCH_ASSOC));

        $sqlDim = "SELECT * from dimensions order by id asc;";

        $sthDim = getConnection()->prepare($sqlDim);
        $sthDim->execute();
        $todosDim = $sthDim->fetchAll((PDO::FETCH_ASSOC));

        $sqlMay = "SELECT * from maturity;";

        $sthMay = getConnection()->prepare($sqlMay);
        $sthMay->execute();
        $todosMay = $sthMay->fetchAll((PDO::FETCH_ASSOC));

        $sqlAns = "SELECT * from answers";

        $sthAns = getConnection()->prepare($sqlAns);
        $sthAns->execute();
        $todosAns = $sthAns->fetchAll((PDO::FETCH_ASSOC));

        $response->getBody()->write((string) json_encode(array(
            'statusCode' => 200,
            'users' => $todosUsr,
            'results' => $todos,
            'dimensions' => $todosDim,
            'maturities' => $todosMay,
            'answers' => $todosAns,
        )));
        $response = $response->withHeader('Content-Type', 'application/json');
        return $response;
    });

    $app->post('/sendMail', function (Request $request, Response $response) {

        $post = (array) $request->getParsedBody();

        $id = $post['id'];

        $sql = "SELECT email, fname from users where id = :id;";

        $sth = getConnection()->prepare($sql);
        $sth->bindParam("id", $id);
        $sth->execute();
        $data = $sth->fetch(PDO::FETCH_ASSOC);

        $mail = new PHPMailer(true);

        try {
            //$mail->isSMTP();                                            // Send using SMTP
            $mail->Host       = 'smtp.sendgrid.net';                    // Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
            $mail->Username   = 'apikey';                     // SMTP username
            $mail->Password   = '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';                               // SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
            $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

            $mail->setFrom('comunicacion@anmype.org.uy', 'Anmype');
            $mail->addAddress($data['email'], $data['fname']);     // Add a recipient

            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'Resultado autodiagnostico';
            $mail->Body    = '<h4>Autodiagn&oacute;stico digital</h4><br/><a href="https://prodigital.anmype.org.uy/result?id=' . $id . '&email=' . $data['email'] . '" target="_blank">Descargar PDF</a>';
            $mail->AltBody = 'https://prodigital.anmype.org.uy/result?id=' . $id . '&email=' . $data['email'];
            $mail->send();
        } catch (Exception $e) {
            echo "No se pudo enviar el correo: {$mail->ErrorInfo}";
        }

        $response->getBody()->write((string) json_encode(array(
            'statusCode' => 200,
            'email' => $data->email
        )));
        $response = $response->withHeader('Content-Type', 'application/json');
        return $response;
    });
});

$app->run();
