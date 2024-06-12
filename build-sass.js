// build-sass.js

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const themesDir = path.join(__dirname, 'src/themes');

// Function to compile a SASS file
const compileSass = (inputFile, outputFile) => {
  const command = `npx sass --style=compressed ${inputFile}:${outputFile}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error compiling SASS: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`SASS stderr: ${stderr}`);
      return;
    }
    console.log(`Compiled ${inputFile} to ${outputFile}`);
  });
};

// Function to get all theme directories
const getThemeDirectories = (source) => {
  return fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
};

// Compile all SASS files in theme directories
const compileAllThemes = () => {
  const themes = getThemeDirectories(themesDir);
  themes.forEach(theme => {
    const inputFile = path.join(themesDir, theme, '/sass/main.scss');
    const outputFile = path.join(themesDir, theme, 'main.css');
    if (fs.existsSync(inputFile)) {
      console.log(`INPUT: ${inputFile}`);
      console.log(`OUTPUT: ${outputFile}`);
      compileSass(inputFile, outputFile);
    } else {
      console.warn(`SASS file not found: ${inputFile}`);
    }
  });
};

// Watch for changes and recompile
const watchAndCompile = () => {
  const chokidar = require('chokidar');
  const watcher = chokidar.watch(`${themesDir}/**/*.scss`, { persistent: true });
  watcher.on('change', (filePath) => {
    console.log(`File changed: ${filePath}`);
    compileAllThemes();
  });
};

// Determine if we are watching or just compiling
if (process.argv.includes('--watch')) {
  watchAndCompile();
} else {
  compileAllThemes();
}
