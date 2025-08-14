<?php
/**
 * API per la gestione del torneo di tennis all'italiana
 * File: api.php
 * 
 * Questo file gestisce il salvataggio e caricamento dei dati del torneo
 * utilizzando un file JSON come database
 */

// Configurazione
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Gestione preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Percorso del file di dati
$dataFile = 'tournament_data.json';

// Funzione per leggere i dati
function loadData($file) {
    if (!file_exists($file)) {
        return [
            'schedule' => [],
            'results' => [],
            'standings' => []
        ];
    }
    
    $content = file_get_contents($file);
    if ($content === false) {
        return [
            'schedule' => [],
            'results' => [],
            'standings' => []
        ];
    }
    
    $data = json_decode($content, true);
    if ($data === null) {
        return [
            'schedule' => [],
            'results' => [],
            'standings' => []
        ];
    }
    
    return $data;
}

// Funzione per salvare i dati
function saveData($file, $data) {
    // Validazione base dei dati
    if (!isset($data['schedule']) || !isset($data['results']) || !isset($data['standings'])) {
        return false;
    }
    
    // Crea un backup del file esistente se esiste
    if (file_exists($file)) {
        $backupFile = $file . '.backup_' . date('Y-m-d_H-i-s');
        copy($file, $backupFile);
        
        // Mantieni solo gli ultimi 5 backup
        $backups = glob($file . '.backup_*');
        if (count($backups) > 5) {
            usort($backups, function($a, $b) {
                return filemtime($a) - filemtime($b);
            });
            $toDelete = array_slice($backups, 0, count($backups) - 5);
            foreach ($toDelete as $oldBackup) {
                unlink($oldBackup);
            }
        }
    }
    
    // Salva i dati
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    if ($json === false) {
        return false;
    }
    
    $result = file_put_contents($file, $json);
    return $result !== false;
}

// Gestione delle richieste
try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Caricamento dati
        $action = isset($_GET['action']) ? $_GET['action'] : 'load';
        
        if ($action === 'load') {
            $data = loadData($dataFile);
            echo json_encode($data);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Azione non valida']);
        }
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Salvataggio dati
        $input = file_get_contents('php://input');
        $requestData = json_decode($input, true);
        
        if ($requestData === null) {
            http_response_code(400);
            echo json_encode(['error' => 'Dati JSON non validi']);
            exit();
        }
        
        $action = isset($requestData['action']) ? $requestData['action'] : '';
        
        if ($action === 'save') {
            if (!isset($requestData['data'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Dati mancanti']);
                exit();
            }
            
            $success = saveData($dataFile, $requestData['data']);
            
            if ($success) {
                echo json_encode(['success' => true, 'message' => 'Dati salvati con successo']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Errore nel salvataggio dei dati']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Azione non valida']);
        }
        
    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Metodo non permesso']);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Errore del server: ' . $e->getMessage()]);
}

/**
 * NOTE PER L'INSTALLAZIONE:
 * 
 * 1. Salvare questo file come "api.php" nella stessa directory del file HTML
 * 
 * 2. Assicurarsi che la directory abbia i permessi di scrittura per PHP
 *    Su Linux/Mac: chmod 755 .
 *    Su Windows: verificare che l'utente del web server abbia permessi di scrittura
 * 
 * 3. Il file tournament_data.json verrà creato automaticamente al primo salvataggio
 * 
 * 4. Requisiti minimi:
 *    - PHP 5.4 o superiore
 *    - Estensione JSON abilitata (di default nella maggior parte delle installazioni)
 * 
 * 5. Per testare localmente:
 *    - Con XAMPP/WAMP/MAMP: copiare i file nella cartella htdocs
 *    - Con PHP built-in server: php -S localhost:8000
 * 
 * 6. Sicurezza:
 *    - In produzione, considerare l'aggiunta di autenticazione
 *    - Limitare CORS a domini specifici invece di '*'
 *    - Implementare rate limiting per prevenire abusi
 */
?>