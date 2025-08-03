<?php
// api.php - Backend per gestire i dati del torneo
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

// Directory dove salvare i dati (assicurati che abbia permessi di scrittura)
$dataDir = __DIR__ . '/tournament_data/';
if (!file_exists($dataDir)) {
    mkdir($dataDir, 0777, true);
}

$dataFile = $dataDir . 'tournament.json';
$scoresFile = $dataDir . 'scores.json';

// Gestione delle richieste
$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($method) {
    case 'GET':
        if ($action === 'load') {
            // Carica tutti i dati del torneo
            $response = [
                'tournament' => file_exists($dataFile) ? json_decode(file_get_contents($dataFile), true) : null,
                'scores' => file_exists($scoresFile) ? json_decode(file_get_contents($scoresFile), true) : []
            ];
            echo json_encode($response);
        }
        break;
        
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        
        switch ($action) {
            case 'save_tournament':
                // Salva la struttura del torneo
                if (isset($input['html']) && isset($input['matchesData'])) {
                    $tournamentData = [
                        'html' => $input['html'],
                        'matchesData' => $input['matchesData'],
                        'lastUpdated' => date('Y-m-d H:i:s')
                    ];
                    file_put_contents($dataFile, json_encode($tournamentData));
                    echo json_encode(['success' => true]);
                } else {
                    http_response_code(400);
                    echo json_encode(['error' => 'Dati mancanti']);
                }
                break;
                
            case 'save_score':
                // Salva un singolo punteggio
                if (isset($input['scoreId']) && isset($input['value'])) {
                    $scores = file_exists($scoresFile) ? json_decode(file_get_contents($scoresFile), true) : [];
                    $scores[$input['scoreId']] = $input['value'];
                    file_put_contents($scoresFile, json_encode($scores));
                    echo json_encode(['success' => true]);
                } else {
                    http_response_code(400);
                    echo json_encode(['error' => 'Dati mancanti']);
                }
                break;
                
            case 'reset':
                // Reset completo (richiede password)
                if (isset($input['password']) && $input['password'] === 'wimbledon2024') {
                    if (file_exists($dataFile)) unlink($dataFile);
                    if (file_exists($scoresFile)) unlink($scoresFile);
                    echo json_encode(['success' => true]);
                } else {
                    http_response_code(401);
                    echo json_encode(['error' => 'Password non valida']);
                }
                break;
                
            default:
                http_response_code(400);
                echo json_encode(['error' => 'Azione non valida']);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Metodo non permesso']);
}
?>