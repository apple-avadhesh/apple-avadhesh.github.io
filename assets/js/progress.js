document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('back-to-top');

  if (!btn) {
    return;
  }

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("id", "progress-circle");
  svg.setAttribute("width", "44");
  svg.setAttribute("height", "44");
  svg.setAttribute("viewBox", "0 0 44 44");

  // Define gradient
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const linearGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
  linearGradient.setAttribute("id", "gradient");
  linearGradient.setAttribute("x1", "0%");
  linearGradient.setAttribute("y1", "0%");
  linearGradient.setAttribute("x2", "100%");
  linearGradient.setAttribute("y2", "0%");

  const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", "#ff7e5f"); // Gradient start color

  const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop2.setAttribute("offset", "100%");
  stop2.setAttribute("stop-color", "#feb47b"); // Gradient end color

  linearGradient.appendChild(stop1);
  linearGradient.appendChild(stop2);
  defs.appendChild(linearGradient);
  svg.appendChild(defs);

  // Create the progress circle
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", "22");
  circle.setAttribute("cy", "22");
  circle.setAttribute("r", "20");
  circle.setAttribute("stroke-width", "3");
  circle.setAttribute("fill", "none");
  circle.setAttribute("stroke-dasharray", `${2 * Math.PI * 20}`);
  circle.setAttribute("stroke-dashoffset", `${2 * Math.PI * 20}`);
  circle.setAttribute("stroke", "url(#gradient)"); // Apply the gradient

  svg.appendChild(circle);
  btn.appendChild(svg);

  // Update progress on scroll
  window.addEventListener('scroll', () => {
    const circumference = 2 * Math.PI * 20; // 2πr
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / docHeight;
    const drawLength = circumference * scrollFraction;

    circle.style.strokeDashoffset = circumference - drawLength;
  });
});
