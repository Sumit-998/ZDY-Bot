const fs = require('fs');
const path = require('path');

const settingsPath = path.join(__dirname, '../config/settings.json');

function loadSettings() {
    return JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
}

function saveSettings(settings) {
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 4));
}

module.exports = {
    loadSettings,
    saveSettings
};