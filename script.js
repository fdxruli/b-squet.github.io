// Lista de jugadores para cada equipo
const players = {
    team1: [],
    team2: []
};

let scoreTeam1 = 0;
let scoreTeam2 = 0;

// Función para actualizar la puntuación en el DOM
function updateScore() {
    document.getElementById('scoreTeam1').textContent = scoreTeam1;
    document.getElementById('scoreTeam2').textContent = scoreTeam2;
}

// Función para agregar un jugador a un equipo
function addPlayer(team) {
    const playerName = prompt(`Ingresa el nombre del nuevo jugador para el ${team}`);
    const playerNumber = prompt(`Ingresa el número del jugador ${playerName}`);
    
    if (playerName && playerNumber) {
        players[team].push({ name: playerName, number: playerNumber, score: 0 });
    }
}

// Función para registrar una canasta para un jugador de un equipo específico
function addPoints(team, points) {
    const playerList = document.createElement('div');
    playerList.className = 'player-list';
    
    players[team].forEach(player => {
        const playerButton = document.createElement('button');
        playerButton.textContent = `#${player.number} ${player.name}`;
        playerButton.onclick = () => {
            player.score += points;
            if (team === 'team1') {
                scoreTeam1 += points;
            } else {
                scoreTeam2 += points;
            }
            updateScore();
            document.body.removeChild(playerList);
        };
        playerList.appendChild(playerButton);
    });
    
    document.body.appendChild(playerList);
}

// Asignar eventos a los botones de puntos
document.getElementById('team1Add1').addEventListener('click', () => addPoints('team1', 1));
document.getElementById('team1Add2').addEventListener('click', () => addPoints('team1', 2));
document.getElementById('team1Add3').addEventListener('click', () => addPoints('team1', 3));

document.getElementById('team2Add1').addEventListener('click', () => addPoints('team2', 1));
document.getElementById('team2Add2').addEventListener('click', () => addPoints('team2', 2));
document.getElementById('team2Add3').addEventListener('click', () => addPoints('team2', 3));

// Asignar eventos a los botones para agregar jugadores
document.getElementById('addPlayerTeam1').addEventListener('click', () => addPlayer('team1'));
document.getElementById('addPlayerTeam2').addEventListener('click', () => addPlayer('team2'));

// Función para generar el reporte del partido
function generateReport() {
    let report = "Reporte del Partido\n\n";
    let highestScorer = { name: '', points: 0 };
    let totalPointsTeam1 = 0;
    let totalPointsTeam2 = 0;

    report += "Equipo 1:\n";
    players.team1.forEach(player => {
        report += `Jugador: ${player.name}, Número: ${player.number}, Puntos: ${player.score}\n`;
        totalPointsTeam1 += player.score;
        if (player.score > highestScorer.points) {
            highestScorer = { name: player.name, points: player.score };
        }
    });

    report += `Total puntos del Equipo 1: ${totalPointsTeam1}\n\n`;

    report += "Equipo 2:\n";
    players.team2.forEach(player => {
        report += `Jugador: ${player.name}, Número: ${player.number}, Puntos: ${player.score}\n`;
        totalPointsTeam2 += player.score;
        if (player.score > highestScorer.points) {
            highestScorer = { name: player.name, points: player.score };
        }
    });

    report += `Total puntos del Equipo 2: ${totalPointsTeam2}\n\n`;

    report += `Máximo anotador: ${highestScorer.name} con ${highestScorer.points} puntos\n`;

    // Crear un archivo de texto y descargarlo
    const blob = new Blob([report], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'reporte_partido.txt';
    document.body.appendChild(link); // Necesario para Firefox
    link.click();
    document.body.removeChild(link); // Limpiar
}

// Event listener para generar el reporte cuando termine el partido
document.getElementById('generateReportBtn').addEventListener('click', generateReport);