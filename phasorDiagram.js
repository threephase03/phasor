const canvas = document.getElementById('phasorCanvas');
const ctx = canvas.getContext('2d');

function drawPhasor(value, angle, scale, color, isCurrent) {
  const length = value * scale; // Scale the phasor length
  const phaseRad = (angle * Math.PI) / 180; // Convert angle to radians

  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, canvas.height / 2);
  ctx.lineTo(
    canvas.width / 2 + length * Math.cos(phaseRad),
    canvas.height / 2 - length * Math.sin(phaseRad)
  );

  // Set color and style based on whether it's a current phasor or not
  ctx.strokeStyle = isCurrent ? color : color; // Use the selected color
  ctx.lineWidth = isCurrent ? 1 : 2; // Set line width for current phasors
  ctx.setLineDash(isCurrent ? [5, 5] : []); // Dotted line for current phasors
  ctx.stroke();
  ctx.setLineDash([]); // Reset line dash style
}

function drawNeutralCurrent(current1, current2, current3, angles, scale) {
  const angle1Rad = (angles[0] * Math.PI) / 180;
  const angle2Rad = (angles[1] * Math.PI) / 180;
  const angle3Rad = (angles[2] * Math.PI) / 180;

  // Calculate the neutral current vector
  const neutralReal = current1 * Math.cos(angle1Rad) + current2 * Math.cos(angle2Rad) + current3 * Math.cos(angle3Rad);
  const neutralImaginary = current1 * Math.sin(angle1Rad) + current2 * Math.sin(angle2Rad) + current3 * Math.sin(angle3Rad);

  const neutralMagnitude = Math.sqrt(neutralReal * neutralReal + neutralImaginary * neutralImaginary);
  const neutralAngle = Math.atan2(neutralImaginary, neutralReal) * (180 / Math.PI); // Convert to degrees

  // Display the neutral current magnitude and angle
  document.getElementById('neutralMagnitude').textContent = neutralMagnitude.toFixed(2);
  document.getElementById('neutralAngle').textContent = neutralAngle.toFixed(2);

  // Draw the neutral current phasor
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, canvas.height / 2);
  ctx.lineTo(
    canvas.width / 2 + neutralMagnitude * scale * Math.cos(neutralAngle * (Math.PI / 180)),
    canvas.height / 2 - neutralMagnitude * scale * Math.sin(neutralAngle * (Math.PI / 180))
  );
  ctx.strokeStyle = 'black'; // Neutral current color
  ctx.lineWidth = 2;
  ctx.stroke();
}

function updateDiagram() {
  const voltage1 = parseFloat(document.getElementById('voltage1').value);
  const current1 = parseFloat(document.getElementById('current1').value);
  const voltageAngle1 = parseFloat(document.getElementById('voltageAngle1').value);
  const currentAngle1 = parseFloat(document.getElementById('currentAngle1').value);
  const colorVoltage1 = document.getElementById('colorVoltage1').value;
  const colorCurrent1 = document.getElementById('colorCurrent1').value;

  const voltage2 = parseFloat(document.getElementById('voltage2').value);
  const current2 = parseFloat(document.getElementById('current2').value);
  const voltageAngle2 = parseFloat(document.getElementById('voltageAngle2').value);
  const currentAngle2 = parseFloat(document.getElementById('currentAngle2').value);
  const colorVoltage2 = document.getElementById('colorVoltage2').value;
  const colorCurrent2 = document.getElementById('colorCurrent2').value;

  const voltage3 = parseFloat(document.getElementById('voltage3').value);
  const current3 = parseFloat(document.getElementById('current3').value);
  const voltageAngle3 = parseFloat(document.getElementById('voltageAngle3').value);
  const currentAngle3 = parseFloat(document.getElementById('currentAngle3').value);
  const colorVoltage3 = document.getElementById('colorVoltage3').value;
  const colorCurrent3 = document.getElementById('colorCurrent3').value;

  const voltageScale = parseFloat(document.getElementById('voltageScale').value);
  const currentScale = parseFloat(document.getElementById('currentScale').value);

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  // Draw the voltage phasors with selected colors
  drawPhasor(voltage1, voltageAngle1, voltageScale, colorVoltage1, false);
  drawPhasor(voltage2, voltageAngle2, voltageScale, colorVoltage2, false);
  drawPhasor(voltage3, voltageAngle3, voltageScale, colorVoltage3, false);

  // Draw the current phasors with selected colors as dotted lines
  drawPhasor(current1, currentAngle1, currentScale, colorCurrent1, true);
  drawPhasor(current2, currentAngle2, currentScale, colorCurrent2, true);
  drawPhasor(current3, currentAngle3, currentScale, colorCurrent3, true);

  // Calculate and draw the neutral current using the current scale
  drawNeutralCurrent(current1, current2, current3, [currentAngle1, currentAngle2, currentAngle3], currentScale);
}

// Event listeners for real-time updates
document.getElementById('voltage1').addEventListener('input', updateDiagram);
document.getElementById('current1').addEventListener('input', updateDiagram);
document.getElementById('voltageAngle1').addEventListener('input', updateDiagram);
document.getElementById('currentAngle1').addEventListener('input', updateDiagram);
document.getElementById('colorVoltage1').addEventListener('input', updateDiagram);
document.getElementById('colorCurrent1').addEventListener('input', updateDiagram);

document.getElementById('voltage2').addEventListener('input', updateDiagram);
document.getElementById('current2').addEventListener('input', updateDiagram);
document.getElementById('voltageAngle2').addEventListener('input', updateDiagram);
document.getElementById('currentAngle2').addEventListener('input', updateDiagram);
document.getElementById('colorVoltage2').addEventListener('input', updateDiagram);
document.getElementById('colorCurrent2').addEventListener('input', updateDiagram);

document.getElementById('voltage3').addEventListener('input', updateDiagram);
document.getElementById('current3').addEventListener('input', updateDiagram);
document.getElementById('voltageAngle3').addEventListener('input', updateDiagram);
document.getElementById('currentAngle3').addEventListener('input', updateDiagram);
document.getElementById('colorVoltage3').addEventListener('input', updateDiagram);
document.getElementById('colorCurrent3').addEventListener('input', updateDiagram);

// Initialize the diagram
updateDiagram();

