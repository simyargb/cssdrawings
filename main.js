

const svgCanvas = document.getElementById("svgCanvas");

svgCanvas.addEventListener("pointermove", (event) => {
  const point = svgCanvas.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;

  const coordinates = point.matrixTransform(
    svgCanvas.getScreenCTM().inverse()
  );

  console.log(`x: ${Math.round(coordinates.x)}, y: ${Math.round(coordinates.y)}`);
});