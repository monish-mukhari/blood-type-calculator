const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.post('/calculate', (req, res) => {
    const { motherBloodType, fatherBloodType, motherRh, fatherRh } = req.body;

    const bloodTypeCombinations = {
        'A,A': { 'A': 75, 'O': 25 },
        'A,B': { 'A': 25, 'B': 25, 'AB': 25, 'O': 25 },
        'A,AB': { 'A': 50, 'B': 25, 'AB': 25 },
        'A,O': { 'A': 50, 'O': 50 },
        'B,A': { 'A': 25, 'B': 25, 'AB': 25, 'O': 25 },
        'B,B': { 'B': 75, 'O': 25 },
        'B,AB': { 'A': 25, 'B': 50, 'AB': 25 },
        'B,O': { 'B': 50, 'O': 50 },
        'AB,A': { 'A': 50, 'B': 25, 'AB': 25 },
        'AB,B': { 'A': 25, 'B': 50, 'AB': 25 },
        'AB,AB': { 'A': 25, 'B': 25, 'AB': 50 },
        'O,A': { 'A': 50, 'O': 50 },
        'O,B': { 'B': 50, 'O': 50 },
        'O,AB': { 'A': 50, 'B': 50 },
        'O,O': { 'O': 100 },
    };

    const rhFactorCombinations = {
        '+,+': { '+': 94, '-': 6 },
        '+,-': { '+': 50, '-': 50 },
        '-,+': { '+': 50, '-': 50 },
        '-,-': { '-': 100 },
    };

    const bloodTypeKey = `${motherBloodType},${fatherBloodType}`;
    const rhFactorKey = `${motherRh},${fatherRh}`;

    const possibleBloodTypes = bloodTypeCombinations[bloodTypeKey];
    const possibleRhFactors = rhFactorCombinations[rhFactorKey];

    console.log(possibleBloodTypes);
    console.log(possibleRhFactors);

    res.json({ possibleBloodTypes, possibleRhFactors });

});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


