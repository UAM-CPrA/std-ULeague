document.addEventListener('DOMContentLoaded', function() {
    console.log('Welcome to std::ULeague!');
});

const cursor = document.createElement('div');
cursor.style.width = '20px';
cursor.style.height = '20px';
cursor.style.borderRadius = '50%';
cursor.style.position = 'absolute';
cursor.style.pointerEvents = 'none';
cursor.style.zIndex = '1000';
cursor.style.backgroundColor = 'white';

const cursorRing = document.createElement('div');
cursorRing.style.width = '40px';
cursorRing.style.height = '40px';
cursorRing.style.borderRadius = '50%';
cursorRing.style.position = 'absolute';
cursorRing.style.pointerEvents = 'none';
cursorRing.style.border = '2px solid orange'; 
cursorRing.style.boxShadow = '0 0 8px rgba(0, 0, 0, 0.5)'; 
cursorRing.style.zIndex = '999';

document.body.appendChild(cursorRing);
document.body.appendChild(cursor);

document.body.style.cursor = 'none';

document.addEventListener('mousemove', function (e) {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
    cursorRing.style.left = e.pageX - 10 + 'px';
    cursorRing.style.top = e.pageY - 10 + 'px'; 
});

const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function () {
        cursor.style.backgroundColor = 'orange'; 
        cursorRing.style.border = '2px solid white'; 
    });
    element.addEventListener('mouseleave', function () {
        cursor.style.backgroundColor = 'white'; 
        cursorRing.style.border = '2px solid orange'; 
    });
});

document.addEventListener('DOMContentLoaded', function() {
    fetch('equipos.json')
        .then(response => response.json())
        .then(data => {
            const associationTableBody = document.querySelector('#association-table tbody');
            const teamTableBody = document.querySelector('#team-table tbody');

            const topTeams = data.sort((a, b) => b.puntuación - a.puntuación);
            topTeams.forEach(team => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <th scope="row"></th> 
                    <td>${team.asociación}</td>
                    <td>${team.nombreEquipo}</td>
                    <td>${team.puntuación}</td>
                `;
                teamTableBody.appendChild(row);
            });

            const associationPoints = data.reduce((acc, team) => {
                if (!acc[team.asociación]) {
                    acc[team.asociación] = 0;
                }
                acc[team.asociación] += team.puntuación;
                return acc;
            }, {});

            const sortedAssociations = Object.keys(associationPoints)
                .map(association => ({
                    name: association,
                    points: associationPoints[association]
                }))
                .sort((a, b) => b.points - a.points);

            sortedAssociations.forEach((association, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <th scope="row">${index + 1}</th>
                    <td>${association.name}</td>
                    <td>${association.points}</td>
                `;
                associationTableBody.appendChild(row);
            });

            const teamRows = teamTableBody.querySelectorAll('tr');
            Array.from(teamRows).forEach((row, index) => {
                row.querySelector('th').textContent = index + 1;
            });
        })
        .catch(error => console.error('Error loading data:', error));
});