let score1 = 0;
let score2 = 0;
let time = 600; // 10 minutes in seconds
let timer;
let isRunning = false;
let isTimerMode = true; // true for timer, false for stopwatch

function addScore(team, points) {
    if (team === 1) {
        score1 += points;
        document.getElementById('score1').innerText = score1;
    } else {
        score2 += points;
        document.getElementById('score2').innerText = score2;
    }
}

function subtractScore(team, points) {
    if (team === 1) {
        score1 = Math.max(0, score1 - points);
        document.getElementById('score1').innerText = score1;
    } else {
        score2 = Math.max(0, score2 - points);
        document.getElementById('score2').innerText = score2;
    }
}

function toggleTimer() {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    if (!timer) {
        timer = setInterval(updateTime, 1000);
        document.getElementById('startPauseBtn').innerHTML = "<i class='fas fa-pause'></i>";
        isRunning = true;
    }
}

function pauseTimer() {
    clearInterval(timer);
    timer = null;
    document.getElementById('startPauseBtn').innerHTML = "<i class='fas fa-play'></i>";
    isRunning = false;
}

function resetTimer() {
    pauseTimer();
    time = isTimerMode ? 600 : 0; // Reset to 10 minutes if timer mode, or to 0 if stopwatch
    document.getElementById('time').innerText = formatTime(time);
}

function updateTime() {
    if (isTimerMode) {
        if (time > 0) {
            time--;
            document.getElementById('time').innerText = formatTime(time);
        } else {
            resetTimer(); // Reset automatically when time reaches 0
        }
    } else {
        time++;
        document.getElementById('time').innerText = formatTime(time);
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
}

function updateTeamNames() {
    const team1Name = document.getElementById('team1-name-input').value;
    const team2Name = document.getElementById('team2-name-input').value;

    document.getElementById('team1-name').innerText = team1Name || "Equipo 1";
    document.getElementById('team2-name').innerText = team2Name || "Equipo 2";
    
    document.getElementById('name-section').style.display = 'none';
}

function toggleNameSection() {
    const nameSection = document.getElementById('name-section');
    if (nameSection.style.display === 'none' || nameSection.style.display === '') {
        nameSection.style.display = 'block';
    } else {
        nameSection.style.display = 'none';
    }
}

function addTime(seconds) {
    time += seconds;
    document.getElementById('time').innerText = formatTime(time);
}

function toggleMode() {
    isTimerMode = !isTimerMode;
    resetTimer();
    document.getElementById('startPauseBtn').innerHTML = "<i class='fas fa-play'></i>";
}

resetTimer();