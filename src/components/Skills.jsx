import React, { useEffect, useRef, useCallback } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

/*
  Skills section:
  - Fully BLACK globe (no white parts) with skill logos rotating on it
  - Auto-rotating slowly
  - Hover effect: logo scales up + tooltip with skill name
  - Only skills from the left pills
*/

/*
  Fibonacci sphere distribution for evenly spacing logos
*/
const distributeSkills = (logos) => {
  const n = logos.length;
  const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
  return logos.map((logo, i) => {
    // Avoid exact poles by clamping Y
    let y = 1 - (i / (n - 1)) * 2;
    y *= 0.85; 
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;
    
    const lat = Math.asin(y) * (180 / Math.PI);
    const lng = Math.atan2(Math.sin(theta) * radius, Math.cos(theta) * radius) * (180 / Math.PI);
    
    return { ...logo, lat, lng };
  });
};

const skillLogos = distributeSkills([
  { name: 'HTML5', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', size: 34 },
  { name: 'CSS3', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', size: 34 },
  { name: 'JavaScript', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', size: 32 },
  { name: 'React.js', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', size: 36 },
  { name: 'Tailwind CSS', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', size: 32 },
  { name: 'Node.js', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', size: 36 },
  { name: 'Express', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', size: 30 },
  { name: 'MongoDB', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', size: 32 },
  { name: 'Redis', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', size: 32 },
  { name: 'Netlify', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/netlify/netlify-original.svg', size: 30 },
  { name: 'Vercel', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg', size: 30, invert: true },
  { name: 'Render', img: 'https://cdn.simpleicons.org/render', size: 30, invert: true },
  { name: 'Git', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', size: 30 },
  { name: 'GitHub', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', size: 32, invert: true },
  { name: 'Vite', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg', size: 30 },
  { name: 'VS Code', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', size: 30 },
  { name: 'Figma', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', size: 28 },
  { name: 'Postman', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg', size: 30 },
]);

const GLOBE_SIZE = 520;

const Skills = () => {
  const globeRef = useRef(null);
  const globeMatRef = useRef(null);

  const reqRef = useRef(null);

  useEffect(() => {
    if (!globeRef.current) return;

    // Auto-rotate slowly
    const controls = globeRef.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minDistance = 400;
    controls.maxDistance = 400;

    globeRef.current.pointOfView({ lat: 15, lng: 0, altitude: 2.2 });

    // Make the globe fully BLACK — override the globe material
    const globeObj = globeRef.current;
    // Wait for globe to initialize then override material
    setTimeout(() => {
      try {
        const scene = globeObj.scene();
        scene.traverse((obj) => {
          if (obj.isMesh && obj.geometry && obj.geometry.type === 'SphereGeometry') {
            // Replace with dark material — black globe with subtle grid lines
            obj.material = new THREE.MeshPhongMaterial({
              color: new THREE.Color('#111111'),
              emissive: new THREE.Color('#0a0a0a'),
              shininess: 5,
              transparent: true,
              opacity: 0.92,
              wireframe: false,
            });
            globeMatRef.current = obj.material;
          }
        });

        // Add a subtle wireframe overlay for the mesh look
        const globeMesh = scene.children.find(c =>
          c.type === 'Group' || c.type === 'Object3D'
        );
        if (globeMesh) {
          globeMesh.traverse((obj) => {
            if (obj.isMesh && obj.geometry && obj.geometry.type === 'SphereGeometry') {
              const wireGeo = obj.geometry.clone();
              const wireMat = new THREE.MeshBasicMaterial({
                color: new THREE.Color('#222222'),
                wireframe: true,
                transparent: true,
                opacity: 0.15,
              });
              const wireMesh = new THREE.Mesh(wireGeo, wireMat);
              wireMesh.scale.copy(obj.scale).multiplyScalar(1.002);
              obj.parent.add(wireMesh);
            }
          });
        }
      } catch (e) {
        console.log('Globe material override skipped:', e);
      }
    }, 1000);

    // Visibility update loop
    const updateVisibility = () => {
      if (globeRef.current) {
        const camera = globeRef.current.camera();
        const wrappers = document.querySelectorAll('.skill-logo-wrapper');
        
        wrappers.forEach(wrapper => {
          const lat = parseFloat(wrapper.dataset.lat);
          const lng = parseFloat(wrapper.dataset.lng);
          const coords = globeRef.current.getCoords(lat, lng, 0);
          
          if (coords && camera) {
            const camVec = new THREE.Vector3().copy(camera.position).normalize();
            const ptVec = new THREE.Vector3(coords.x, coords.y, coords.z).normalize();
            const dot = camVec.dot(ptVec);
            
            if (dot < 0.25) {
              const opacity = Math.max(0, dot * 4);
              wrapper.style.opacity = opacity.toString();
              wrapper.style.pointerEvents = opacity > 0.05 ? 'auto' : 'none';
            } else {
              wrapper.style.opacity = '1';
              wrapper.style.pointerEvents = 'auto';
            }
          }
        });
      }
      reqRef.current = requestAnimationFrame(updateVisibility);
    };

    reqRef.current = requestAnimationFrame(updateVisibility);

    return () => {
      if (reqRef.current) {
        cancelAnimationFrame(reqRef.current);
      }
    };
  }, []);

  const frontendSkills = ["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS", "Framer Motion"];
  const backendSkills = ["Node.js", "Express", "MongoDB", "Redis", "REST API"];
  const tools = ["Git", "GitHub", "Vite", "VS Code", "Figma", "Postman", "Netlify", "Vercel", "Render"];

  const renderSkillPills = (skills) => (
    <div className="flex flex-wrap gap-2 md:gap-3 lg:pr-10">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="px-4 py-2 border border-white/10 rounded-full font-medium text-sm text-gray-300 bg-[#161616]/50 backdrop-blur-md hover:bg-white hover:text-black transition-all cursor-crosshair delay-75 ease-out duration-300 translate-y-0 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(255,255,255,0.3)]"
        >
          {skill}
        </span>
      ))}
    </div>
  );

  /* Logo renderer with proper HOVER effect — tooltip + scale */
  const labelRenderer = useCallback((d) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'skill-logo-wrapper';
    wrapper.dataset.lat = d.lat;
    wrapper.dataset.lng = d.lng;
    wrapper.style.cssText = `
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      transition: opacity 0.1s ease;
    `;

    // Logo image
    const img = document.createElement('img');
    img.src = d.img;
    img.alt = d.name;
    img.width = d.size;
    img.height = d.size;
    img.draggable = false;
    img.style.cssText = `
      filter: drop-shadow(0 0 8px rgba(255,255,255,0.3)) ${d.invert ? 'invert(1)' : ''};
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease;
    `;

    // Tooltip — hidden by default, shows on hover
    const tooltip = document.createElement('div');
    tooltip.textContent = d.name;
    tooltip.style.cssText = `
      position: absolute;
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%) scale(0.8);
      background: rgba(255, 255, 255, 0.95);
      color: #000;
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      font-family: 'Inter', sans-serif;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    `;

    // Arrow for tooltip
    const arrow = document.createElement('div');
    arrow.style.cssText = `
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      width: 8px;
      height: 8px;
      background: rgba(255, 255, 255, 0.95);
    `;
    tooltip.appendChild(arrow);

    wrapper.appendChild(tooltip);
    wrapper.appendChild(img);

    // Hover events
    wrapper.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.35)';
      img.style.filter = `drop-shadow(0 0 14px rgba(255,255,255,0.6)) ${d.invert ? 'invert(1)' : ''}`;
      tooltip.style.opacity = '1';
      tooltip.style.transform = 'translateX(-50%) scale(1)';
    });
    wrapper.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
      img.style.filter = `drop-shadow(0 0 8px rgba(255,255,255,0.3)) ${d.invert ? 'invert(1)' : ''}`;
      tooltip.style.opacity = '0';
      tooltip.style.transform = 'translateX(-50%) scale(0.8)';
    });

    return wrapper;
  }, []);

  return (
    <div className="w-full relative min-h-[600px] flex flex-col md:flex-row items-center border border-white/10 rounded-[40px] bg-[#0E0E0E] overflow-hidden p-8 md:p-12 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0,_#000_100%)] opacity-20 pointer-events-none" />

      {/* ── Left: Skill pills ── */}
      <div className="w-full md:w-1/2 flex flex-col z-10 space-y-8">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">My Skills.</h2>
          <p className="text-gray-400 text-sm">Technologies I use to bring ideas to life</p>
          <div className="w-24 h-[1px] bg-gradient-to-r from-white/20 to-transparent mt-6 mb-2" />
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-widest text-[#666] uppercase mb-4">Frontend</h3>
          {renderSkillPills(frontendSkills)}
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-widest text-[#666] uppercase mb-4">Backend</h3>
          {renderSkillPills(backendSkills)}
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-widest text-[#666] uppercase mb-4">Tools</h3>
          {renderSkillPills(tools)}
        </div>
      </div>

      {/* ── Right: BLACK globe with skill logos ── */}
      <div
        className="w-full md:w-1/2 flex justify-center items-center mt-12 md:mt-0 z-10"
        style={{ height: `${GLOBE_SIZE}px`, minHeight: `${GLOBE_SIZE}px` }}
      >
        <div style={{ width: `${GLOBE_SIZE}px`, height: `${GLOBE_SIZE}px`, flexShrink: 0 }}>
          <Globe
            ref={globeRef}
            width={GLOBE_SIZE}
            height={GLOBE_SIZE}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            atmosphereColor="#333333"
            atmosphereAltitude={0.12}
            htmlElementsData={skillLogos}
            htmlLat="lat"
            htmlLng="lng"
            htmlAltitude={0.12}
            htmlElement={labelRenderer}
          />
        </div>
      </div>
    </div>
  );
};

export default Skills;
