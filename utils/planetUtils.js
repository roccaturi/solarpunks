export function generateRandomPlanets(numPlanets) {
  const minRadius = 5;
  const maxRadius = 40;
  const minOrbitRadius = 80;
  const maxOrbitRadius = 600;

  const newPlanets = [];

  for (let i = 0; i < numPlanets; i++) {
    const orbitRadius =
      Math.floor(Math.random() * (maxOrbitRadius - minOrbitRadius + 1)) +
      minOrbitRadius;

    const period = Math.sqrt(orbitRadius ** 3) * 20;

    const newPlanet = {
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      radius:
        Math.floor(Math.random() * (maxRadius - minRadius + 1)) + minRadius,
      orbitRadius: orbitRadius,
      startPosition: Math.random() * 2 * Math.PI,
      period: period,
    };
    newPlanets.push(newPlanet);
  }

  return newPlanets;
}
