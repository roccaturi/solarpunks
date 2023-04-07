// Earliest version with just two planets
// import { useEffect } from "react";
// import * as d3 from "d3";

// const PlanetarySystem = () => {
//   useEffect(() => {
//     const width = window.innerWidth;
//     const height = window.innerHeight;

//     const svg = d3
//       .select("body")
//       .append("svg")
//       .attr("width", width)
//       .attr("height", height)
//       .style("background-color", "black");

//     const star = svg
//       .append("circle")
//       .attr("r", 50)
//       .attr("cx", width / 2)
//       .attr("cy", height / 2)
//       .attr("fill", "yellow");

//     const planet1 = svg.append("circle").attr("r", 20).attr("fill", "blue");

//     const planet2 = svg.append("circle").attr("r", 30).attr("fill", "green");

//     const orbitRadius1 = 150;
//     const orbitRadius2 = 250;
//     const orbitSpeed1 = 0.0001;
//     const orbitSpeed2 = 0.00005;
//     const planet1StartPosition = 0;
//     const planet2StartPosition = 90;

//     function updatePlanets() {
//       const planet1X =
//         width / 2 +
//         orbitRadius1 *
//           Math.cos(orbitSpeed1 * Date.now() + planet1StartPosition);
//       const planet1Y =
//         height / 2 +
//         orbitRadius1 *
//           Math.sin(orbitSpeed1 * Date.now() + planet1StartPosition);
//       const planet2X =
//         width / 2 +
//         orbitRadius2 *
//           Math.cos(orbitSpeed2 * Date.now() + planet2StartPosition);
//       const planet2Y =
//         height / 2 +
//         orbitRadius2 *
//           Math.sin(orbitSpeed2 * Date.now() + planet2StartPosition);

//       planet1.attr("cx", planet1X).attr("cy", planet1Y);
//       planet2.attr("cx", planet2X).attr("cy", planet2Y);
//     }

//     setInterval(updatePlanets, 10);
//   }, []);

//   return null;
// };

// export default PlanetarySystem;

// Second version with three planets and a ring
import { useEffect } from "react";
import * as d3 from "d3";

const PlanetarySystem = () => {
  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const svg = d3
      .select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "black");

    const star = svg
      .append("circle")
      .attr("r", 50)
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("fill", "yellow");

    const planet1 = svg.append("circle").attr("r", 20).attr("fill", "blue");

    const planet2 = svg.append("circle").attr("r", 30).attr("fill", "green");

    const planet3 = svg.append("circle").attr("r", 25).attr("fill", "orange");

    const ring = svg
      .append("ellipse")
      .attr("rx", 40)
      .attr("ry", 15)
      .attr("fill", "none")
      .attr("stroke", "brown")
      .attr("stroke-width", 12);

    const orbitRadius1 = 150;
    const orbitRadius2 = 250;
    const orbitRadius3 = 350;
    const orbitSpeed1 = 0.0001;
    const orbitSpeed2 = 0.00005;
    const orbitSpeed3 = 0.00003;
    const planet1StartPosition = 0;
    const planet2StartPosition = 90;
    const planet3StartPosition = 180;

    function updatePlanets() {
      const planet1X =
        width / 2 +
        orbitRadius1 *
          Math.cos(orbitSpeed1 * Date.now() + planet1StartPosition);
      const planet1Y =
        height / 2 +
        orbitRadius1 *
          Math.sin(orbitSpeed1 * Date.now() + planet1StartPosition);
      const planet2X =
        width / 2 +
        orbitRadius2 *
          Math.cos(orbitSpeed2 * Date.now() + planet2StartPosition);
      const planet2Y =
        height / 2 +
        orbitRadius2 *
          Math.sin(orbitSpeed2 * Date.now() + planet2StartPosition);
      const planet3X =
        width / 2 +
        orbitRadius3 *
          Math.cos(orbitSpeed3 * Date.now() + planet3StartPosition);
      const planet3Y =
        height / 2 +
        orbitRadius3 *
          Math.sin(orbitSpeed3 * Date.now() + planet3StartPosition);

      planet1.attr("cx", planet1X).attr("cy", planet1Y);
      planet2.attr("cx", planet2X).attr("cy", planet2Y);
      planet3.attr("cx", planet3X).attr("cy", planet3Y);

      // Position the ring around planet3
      const ringX = planet3X;
      const ringY = planet3Y;
      ring.attr("cx", ringX).attr("cy", ringY);
    }

    setInterval(updatePlanets, 10);
  }, []);

  return null;
};

export default PlanetarySystem;

// Third version with variable planet counts.
// import { useEffect } from "react";
// import * as d3 from "d3";
// import { generateRandomPlanets } from "../utils/planetUtils.js";

// const PlanetarySystem = () => {
//   useEffect(() => {
//     const width = window.innerWidth;
//     const height = window.innerHeight;

//     const svg = d3
//       .select("body")
//       .append("svg")
//       .attr("width", width)
//       .attr("height", height)
//       .style("background-color", "black");

//     const star = svg
//       .append("circle")
//       .attr("r", 50)
//       .attr("cx", width / 2)
//       .attr("cy", height / 2)
//       .attr("fill", "yellow");

//     const planetData = [];
//     // const newPlanets = generateRandomPlanets(Math.floor(Math.random() * 5));
//     const newPlanets = generateRandomPlanets(5);
//     planetData.push(...newPlanets);

//     function updatePlanets(planetData) {
//       const planets = svg
//         .selectAll("circle.planet")
//         .data(planetData)
//         .join(
//           (enter) =>
//             enter
//               .append("circle")
//               .attr("class", "planet")
//               .attr("fill", (d) => d.color)
//               .attr("r", (d) => d.radius),
//           (update) => update,
//           (exit) => exit.remove()
//         );

//       planets
//         .attr("cx", (d) => {
//           return (
//             width / 2 +
//             d.orbitRadius *
//               Math.cos(d.orbitSpeed * Date.now() + d.startPosition)
//           );
//         })
//         .attr("cy", (d) => {
//           return (
//             height / 2 +
//             d.orbitRadius *
//               Math.sin(d.orbitSpeed * Date.now() + d.startPosition)
//           );
//         });
//     }

//     setInterval(() => {
//       updatePlanets(planetData);
//     }, 10);

//     return () => clearInterval();
//   }, []);

//   return null;
// };

// export default PlanetarySystem;

// Version with auras
// import { useEffect, useRef, useCallback } from "react";
// import * as d3 from "d3";
// import * as planetUtils from "../utils/planetUtils.js";

// const PlanetarySystem = () => {
//   const svgRef = useRef(null);

//   const generatePlanetData = useCallback(() => {
//     return planetUtils.generateRandomPlanets(5);
//   }, []);

//   const updatePlanets = useCallback((planetData) => {
//     const { width, height } = svgRef.current.getBoundingClientRect();

//     const planets = d3
//       .select(svgRef.current)
//       .selectAll("circle.planet")
//       .data(planetData)
//       .join(
//         (enter) =>
//           enter
//             .append("circle")
//             .attr("class", "planet")
//             .attr("fill", (d) => d.color)
//             .attr("r", (d) => d.radius),
//         (update) => update,
//         (exit) => exit.remove()
//       );

//     planets
//       .attr("cx", (d) => {
//         return (
//           width / 2 +
//           d.orbitRadius * Math.cos(d.orbitSpeed * Date.now() + d.startPosition)
//         );
//       })
//       .attr("cy", (d) => {
//         return (
//           height / 2 +
//           d.orbitRadius * Math.sin(d.orbitSpeed * Date.now() + d.startPosition)
//         );
//       });
//   }, []);

//   useEffect(() => {
//     const svg = d3.select(svgRef.current);

//     const width = window.innerWidth;
//     const height = window.innerHeight;

//     svg
//       .attr("width", width)
//       .attr("height", height)
//       .style("background-color", "black");

//     const star = svg
//       .append("circle")
//       .attr("r", 50)
//       .attr("cx", width / 2)
//       .attr("cy", height / 2)
//       .attr("fill", "yellow");

//     const aura = svg
//       .append("circle")
//       .attr("r", 500)
//       .attr("cx", width / 2)
//       .attr("cy", height / 2)
//       .style("fill", "rgba(255, 255, 0, 0.5)")
//       .classed("animate-pulse", true);

//     const sedcondaryAura = svg
//       .append("circle")
//       .attr("r", 800)
//       .attr("cx", width / 2)
//       .attr("cy", height / 2)
//       .style("fill", "rgba(255, 255, 0, 0.05)");

//     let planetData = generatePlanetData();

//     const animate = () => {
//       updatePlanets(planetData);
//       requestAnimationFrame(animate);
//     };

//     const handleResize = () => {
//       const width = window.innerWidth;
//       const height = window.innerHeight;

//       svg.attr("width", width).attr("height", height);
//     };

//     window.addEventListener("resize", handleResize);

//     requestAnimationFrame(animate);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [generatePlanetData, updatePlanets]);

//   return <svg ref={svgRef} />;
// };

// export default PlanetarySystem;
