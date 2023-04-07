import { useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";
import * as planetUtils from "../utils/planetUtils.js";

const PlanetarySystem = () => {
  const svgRef = useRef(null);

  const generatePlanetData = useCallback(() => {
    return planetUtils.generateRandomPlanets(Math.floor(Math.random() * 9));
  }, []);

  const updatePlanets = useCallback((planetData) => {
    const { width, height } = svgRef.current.getBoundingClientRect();

    const planets = d3
      .select(svgRef.current)
      .selectAll("circle.planet")
      .data(planetData)
      .join(
        (enter) =>
          enter
            .append("circle")
            .attr("class", "planet")
            .attr("fill", (d) => d.color)
            .attr("r", (d) => d.radius),
        (update) => update,
        (exit) => exit.remove()
      );

    planets
      .attr("cx", (d) => {
        return (
          width / 2 +
          d.orbitRadius *
            Math.cos((2 * Math.PI * Date.now()) / d.period + d.startPosition)
        );
      })
      .attr("cy", (d) => {
        return (
          height / 2 +
          d.orbitRadius *
            Math.sin((2 * Math.PI * Date.now()) / d.period + d.startPosition)
        );
      });
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const width = window.innerWidth;
    const height = window.innerHeight;

    svg
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "black");

    const star = svg
      .append("circle")
      .attr("r", 50)
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("fill", "yellow");

    const aura = svg
      .append("circle")
      .attr("r", 500)
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .style("fill", "rgba(255, 255, 0, 0.06)");

    const sedcondaryAura = svg
      .append("circle")
      .attr("r", 800)
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .style("fill", "rgba(255, 255, 0, 0.03)");

    let planetData = generatePlanetData();

    const animate = () => {
      updatePlanets(planetData);
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      svg.attr("width", width).attr("height", height);
    };

    window.addEventListener("resize", handleResize);

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [generatePlanetData, updatePlanets]);

  return <svg ref={svgRef} />;
};

export default PlanetarySystem;
