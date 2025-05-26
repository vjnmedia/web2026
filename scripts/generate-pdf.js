const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

const docsDir = path.join(__dirname, '../docs');
const outputDir = path.join(__dirname, '../pdf');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Generate PDF using pandoc
async function generatePDF(inputFile, outputFile) {
  try {
    const command = `pandoc "${inputFile}" -o "${outputFile}" --pdf-engine=wkhtmltopdf --standalone --css="${path.join(__dirname, 'pdf-styles.css')}"`;
    await execAsync(command);
    console.log(`Generated ${outputFile}`);
  } catch (error) {
    console.error(`Error generating ${outputFile}:`, error);
  }
}

// Main function
async function main() {
  try {
    // Generate PDFs for each markdown file
    const files = [
      { input: 'PROJECT_PLAN.md', output: 'project-plan.pdf' },
      { input: 'TECHNICAL_SPEC.md', output: 'technical-spec.pdf' },
      { input: 'SETUP.md', output: 'setup-guide.pdf' }
    ];

    for (const file of files) {
      const inputPath = path.join(docsDir, file.input);
      const outputPath = path.join(outputDir, file.output);
      await generatePDF(inputPath, outputPath);
    }

    console.log('All PDFs generated successfully!');
  } catch (error) {
    console.error('Error generating PDFs:', error);
  }
}

main(); 