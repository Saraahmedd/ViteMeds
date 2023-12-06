function checkResponse(res) {
    if (res.status >= 400) {
        return false;
    }
    return true;
}

async function updateLicense({ id, newLicenseNumber, newNationalId, newStatus, newIssueDate, newExpiryDate }) {
    fetch(`/api/staff/updatelicense`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, licensenumber: newLicenseNumber, nationalid: newNationalId, status: newStatus, issuedate: newIssueDate, expirydate: newExpiryDate })
    }).then(res => {
        if (!checkResponse(res)) {
            window.location.replace('/');
            return;
        }
    });
}

async function updateCar({ id, brand, year, model, color, licensePlateLetters, licensePlateNumbers, status, issuedate, expirydate }) {
    fetch(`/api/staff/updatecar`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, brand: brand, year: year, model: model, color: color, licensePlateLetters: licensePlateLetters, licensePlateNumbers: licensePlateNumbers, status: status, issuedate: issuedate, expirydate: expirydate })
    }).then(res => {
        if (!checkResponse(res)) {
            window.location.replace('/');
            return;
        }
    });
}

module.exports = {
    checkResponse,
    updateLicense,
    updateCar,
}