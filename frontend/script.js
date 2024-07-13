document.getElementById('bloodTypeForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const motherBloodType = document.getElementById('motherBloodType').value;
    const motherRh = document.getElementById('mother-rh').value;
    const fatherBloodType = document.getElementById('fatherBloodType').value;
    const fatherRh = document.getElementById('father-rh').value;

    fetch('http://localhost:3000/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ motherBloodType, fatherBloodType, motherRh, fatherRh }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById('result').innerHTML = `
            <h3>Possible Blood Types and Percentages:</h3>
            ${Object.entries(data.possibleBloodTypes).map(([type, percentage]) => `<p>${type}: ${percentage}%</p>`).join('')}
            <h3>Possible Rh Factors and Percentages:</h3>
            ${Object.entries(data.possibleRhFactors).map(([factor, percentage]) => `<p>${factor}: ${percentage}%</p>`).join('')}
        `;
        })
        .catch(error => {
            document.getElementById('result').innerText = 'Error calculating blood types';
        });
});
