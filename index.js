const express = require("express");
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Array to store solve times
const solveTimes = [];
const scrambles = [];
app.get("/", (req, res) => {
    const randomStr = randomMoveSequence(25);
    const averageTime = calculateAverage(solveTimes);
    res.render("home", { randomNumberString: randomStr, solveTimes: solveTimes, averageTime: averageTime });
});

function calculateAverage(times) {
    if (times.length === 0) {
        return 'N/A';
    }
    const total = times.reduce((acc, curr) => acc + parseFloat(curr), 0);
    return (total / times.length).toFixed(2);
}


app.get("/newScramble", (req, res) => {
    const randomStr = randomMoveSequence(25);
    scrambles.push(randomStr);
    res.send(randomStr);
});

app.post("/recordTime", (req, res) => {
    const time = req.body.time;
    solveTimes.push(time);
    //calculateAverage(solveTimes);
    res.json({ solveTimes: solveTimes }); // Return the updated solveTimes array as JSON
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const moves = [['R', 'R\'', 'R2'], ['U', 'U\'', 'U2'], ['L', 'L\'', 'L2'], ['F', 'F\'', 'F2'], ['D', 'D\'', 'D2'], ['B', 'B\'', 'B2']];

function randomMoveSequence(length) {
    let result = '';
    const movesLength = moves.length;
    let lastMoveIndex = -1;

    for (let i = 0; i < length; i++) {
        let moveIndex;
        do {
            moveIndex = Math.floor(Math.random() * movesLength);
        } while (moveIndex === lastMoveIndex);

        const moveSubIndex = Math.floor(Math.random() * moves[moveIndex].length);
        result += moves[moveIndex][moveSubIndex] + ' ';
        lastMoveIndex = moveIndex;
    }
    return result.trim();
}
