// Variables globales
let jugadores = {
    equipo1: [],
    equipo2: []
};
let puntajeEquipo1 = 0;
let puntajeEquipo2 = 0;
let configuracionJuego = {};

// Elementos del DOM
const seccionConfiguracion = document.getElementById('setupSection');
const seccionJugadores = document.getElementById('playersSection');
const seccionJuego = document.getElementById('gameSection');
const botonSiguiente = document.getElementById('nextButton');
const botonIniciarJuego = document.getElementById('startGameButton');

// Event Listeners
botonSiguiente.addEventListener('click', pasarASeccionJugadores);
botonIniciarJuego.addEventListener('click', iniciarJuego);
document.getElementById('addPlayerTeam1').addEventListener('click', () => agregarJugador('equipo1'));
document.getElementById('addPlayerTeam2').addEventListener('click', () => agregarJugador('equipo2'));
document.getElementById('team1Add1').addEventListener('click', () => agregarPuntos('equipo1', 1));
document.getElementById('team1Add2').addEventListener('click', () => agregarPuntos('equipo1', 2));
document.getElementById('team1Add3').addEventListener('click', () => agregarPuntos('equipo1', 3));
document.getElementById('team2Add1').addEventListener('click', () => agregarPuntos('equipo2', 1));
document.getElementById('team2Add2').addEventListener('click', () => agregarPuntos('equipo2', 2));
document.getElementById('team2Add3').addEventListener('click', () => agregarPuntos('equipo2', 3));
document.getElementById('generateReportBtn').addEventListener('click', generarReporte);

function pasarASeccionJugadores() {
    configuracionJuego = {
        nombreEquipo1: document.getElementById('team1Name').value,
        nombreEquipo2: document.getElementById('team2Name').value,
        tipoReloj: document.getElementById('clockType').value,
        tipoPartido: document.getElementById('matchType').value,
        periodos: document.getElementById('periods').value
    };

    seccionConfiguracion.style.display = 'none';
    seccionJugadores.style.display = 'block';

    document.querySelector('#team1Players h2').textContent = `Jugadores de ${configuracionJuego.nombreEquipo1}`;
    document.querySelector('#team2Players h2').textContent = `Jugadores de ${configuracionJuego.nombreEquipo2}`;
}

function agregarJugador(equipo) {
    const nombreJugador = prompt(`Ingresa el nombre del nuevo jugador para ${equipo === 'equipo1' ? configuracionJuego.nombreEquipo1 : configuracionJuego.nombreEquipo2}`);
    const numeroJugador = prompt(`Ingresa el número del jugador ${nombreJugador}`);

    if (nombreJugador && numeroJugador) {
        jugadores[equipo].push({ nombre: nombreJugador, numero: numeroJugador, puntaje: 0 });
        actualizarListaJugadores(equipo);
    }
}

function actualizarListaJugadores(equipo) {
    const elementoLista = document.getElementById(`${equipo === 'equipo1' ? 'team1' : 'team2'}PlayerList`);
    elementoLista.innerHTML = '';
    jugadores[equipo].forEach(jugador => {
        const li = document.createElement('li');
        li.textContent = `#${jugador.numero} ${jugador.nombre}`;
        elementoLista.appendChild(li);
    });
}

function iniciarJuego() {
    seccionJugadores.style.display = 'none';
    seccionJuego.style.display = 'block';

    document.getElementById('team1NameDisplay').textContent = configuracionJuego.nombreEquipo1;
    document.getElementById('team2NameDisplay').textContent = configuracionJuego.nombreEquipo2;

    actualizarPuntaje();
}

function actualizarPuntaje() {
    document.getElementById('scoreTeam1').textContent = puntajeEquipo1;
    document.getElementById('scoreTeam2').textContent = puntajeEquipo2;
}

function agregarPuntos(equipo, puntos) {
    if (jugadores[equipo].length === 0) {
        if (equipo === 'equipo1') {
            puntajeEquipo1 += puntos;
        } else {
            puntajeEquipo2 += puntos;
        }
        actualizarPuntaje();
    } else {
        const playerList = document.createElement('div');
        playerList.className = 'player-list';

        jugadores[equipo].forEach(jugador => {
            const playerButton = document.createElement('button');
            playerButton.textContent = `#${jugador.numero} ${jugador.nombre}`;
            playerButton.onclick = () => {
                jugador.puntaje += puntos;
                if (equipo === 'equipo1') {
                    puntajeEquipo1 += puntos;
                } else {
                    puntajeEquipo2 += puntos;
                }
                actualizarPuntaje();
                document.body.removeChild(playerList);
            };
            playerList.appendChild(playerButton);
        });

        document.body.appendChild(playerList);
    }
}

function generarReporte() {
    let reporte = `Reporte del Partido: ${configuracionJuego.nombreEquipo1} vs ${configuracionJuego.nombreEquipo2}\n\n`;
    let maximoAnotador = { nombre: '', puntos: 0 };

    reporte += `${configuracionJuego.nombreEquipo1}:\n`;
    jugadores.equipo1.forEach(jugador => {
        reporte += `Jugador: ${jugador.nombre}, Número: ${jugador.numero}, Puntos: ${jugador.puntaje}\n`;
        if (jugador.puntaje > maximoAnotador.puntos) {
            maximoAnotador = { nombre: jugador.nombre, puntos: jugador.puntaje };
        }
    });
    reporte += `Total puntos del ${configuracionJuego.nombreEquipo1}: ${puntajeEquipo1}\n\n`;

    reporte += `${configuracionJuego.nombreEquipo2}:\n`;
    jugadores.equipo2.forEach(jugador => {
        reporte += `Jugador: ${jugador.nombre}, Número: ${jugador.numero}, Puntos: ${jugador.puntaje}\n`;
        if (jugador.puntaje > maximoAnotador.puntos) {
            maximoAnotador = { nombre: jugador.nombre, puntos: jugador.puntaje };
        }
    });
    reporte += `Total puntos del ${configuracionJuego.nombreEquipo2}: ${puntajeEquipo2}\n\n`;

    reporte += `Máximo anotador: ${maximoAnotador.nombre} con ${maximoAnotador.puntos} puntos\n`;

    // Crear un archivo de texto y descargarlo
    const blob = new Blob([reporte], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'reporte_partido.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}