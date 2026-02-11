// VeerNeo — Generative 3D Intelligence
document.addEventListener('DOMContentLoaded', () => {
    
    // --- GSAP Plugins ---
    gsap.registerPlugin(ScrollTrigger);

    // --- Core Modules ---
    
    /**
     * Mobile Navigation Toggle
     */
    const initMobileNav = () => {
        const toggle = document.querySelector('.nav-toggle');
        const links = document.querySelector('.nav-links');
        
        if (!toggle || !links) return;

        toggle.addEventListener('click', () => {
            links.classList.toggle('mobile-active');
            // Toggle hamburger animation
            toggle.classList.toggle('active');
            document.body.style.overflow = links.classList.contains('mobile-active') ? 'hidden' : '';
        });

        // Close when clicking links
        links.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                links.classList.remove('mobile-active');
                toggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    };

    /**
     * Staggered Scroll Animations (Apple-like)
     */
    const initScrollAnimations = () => {
        // Target all text-heavy elements and blocks
        const elements = document.querySelectorAll(
            '.eyebrow, .reveal, .large-p, .bento-item, h1, h2, h3, h4, h5, p, .hero-stats div, .contact-method, .stat-pill, .latency-indicator'
        );
        
        elements.forEach(el => {
            // Snappier initial state
            gsap.set(el, { opacity: 0, y: 15 });

            gsap.to(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 95%", 
                    toggleActions: "play none none none"
                },
                y: 0,
                opacity: 1,
                duration: 0.6, // Very snappy
                ease: "power2.out",
                stagger: 0.02
            });
        });

        // Special entrance for 3d containers
        gsap.from('.demo-visual', {
            scrollTrigger: {
                trigger: '.demo-section',
                start: "top 85%",
            },
            scale: 0.98,
            opacity: 0,
            duration: 1.0,
            ease: "expo.out"
        });
    };

    /**
     * Hero 3D Scene
     */
    const initHero3D = () => {
        const container = document.getElementById('hero-canvas-container');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        const group = new THREE.Group();
        scene.add(group);

        // Particle System Configuration
        const particleCount = 200;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const targetPositions = new Float32Array(particleCount * 3);
        const initialPositions = new Float32Array(particleCount * 3);
        const velocities = [];

        // Generate initial random field
        for(let i = 0; i < particleCount; i++) {
            const x = (Math.random() - 0.5) * 10;
            const y = (Math.random() - 0.5) * 10;
            const z = (Math.random() - 0.5) * 10;
            positions[i*3] = initialPositions[i*3] = x;
            positions[i*3+1] = initialPositions[i*3+1] = y;
            positions[i*3+2] = initialPositions[i*3+2] = z;
            velocities.push(new THREE.Vector3((Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01));
        }

        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const pointCloud = new THREE.Points(particles, new THREE.PointsMaterial({ size: 0.04, color: 0xffffff }));
        group.add(pointCloud);

        // CAD Concept Geometry Generator
        const generateTarget = (type) => {
            const pts = [];
            if(type === 'cube') {
                for(let i = 0; i < particleCount; i++) {
                    const x = (Math.random() - 0.5) * 4;
                    const y = (Math.random() - 0.5) * 4;
                    const z = (Math.random() - 0.5) * 4;
                    pts.push(Math.round(x * 1.5), Math.round(y * 1.5), Math.round(z * 1.5));
                }
            } else if(type === 'gear') { // Spur Gear Wireframe
                for(let i = 0; i < particleCount; i++) {
                    const angle = (i / particleCount) * Math.PI * 2;
                    const radius = i % 10 < 5 ? 2.5 : 2; // Teeth
                    pts.push(Math.cos(angle) * radius, Math.sin(angle) * radius, (Math.random() - 0.5) * 0.5);
                }
            } else if(type === 'sphere') {
                for(let i = 0; i < particleCount; i++) {
                    const phi = Math.acos(-1 + (2 * i) / particleCount);
                    const theta = Math.sqrt(particleCount * Math.PI) * phi;
                    pts.push(
                        2.5 * Math.cos(theta) * Math.sin(phi),
                        2.5 * Math.sin(theta) * Math.sin(phi),
                        2.5 * Math.cos(phi)
                    );
                }
            } else if(type === 'bracket') { // U-shape bracket
                for(let i = 0; i < particleCount; i++) {
                    const side = Math.random() > 0.5 ? 1 : -1;
                    if(i < particleCount * 0.6) { // Base curve
                        const t = (Math.random() * Math.PI);
                        pts.push(Math.cos(t) * 2, Math.sin(t) * 2, (Math.random() - 0.5) * 2);
                    } else { // Walls
                        pts.push(side * 2, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 2);
                    }
                }
            } else { // High-density grid bits
                for(let i = 0; i < particleCount; i++) {
                    pts.push((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
                }
            }
            return new Float32Array(pts);
        };

        let currentTarget = generateTarget('sphere');
        let lerpFactor = 0;
        const targetTypes = ['sphere', 'gear', 'cube', 'bracket', 'random'];
        let typeIndex = 0;

        // Line Segments for Plexus Effect (Forming CAD structures)
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2 });
        const lineGeometry = new THREE.BufferGeometry();
        const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
        group.add(lineMesh);

        scene.add(new THREE.PointLight(0xffffff, 5, 20));
        scene.add(new THREE.AmbientLight(0xffffff, 0.1));

        camera.position.z = 7; // Further back to prevent overlap

        const animate = () => {
            requestAnimationFrame(animate);
            lerpFactor += 0.01;
            if(lerpFactor > 4) { // Longer hold on shapes
                lerpFactor = 0;
                typeIndex = (typeIndex + 1) % targetTypes.length;
                currentTarget = generateTarget(targetTypes[typeIndex]);
            }
            
            // Movement logic
            const posAttr = particles.getAttribute('position');
            const linePositions = [];
            
            for(let i = 0; i < particleCount; i++) {
                // Morph towards target
                const targetX = currentTarget[i*3];
                const targetY = currentTarget[i*3+1];
                const targetZ = currentTarget[i*3+2];

                posAttr.array[i*3] += (targetX - posAttr.array[i*3]) * 0.04 + velocities[i].x;
                posAttr.array[i*3+1] += (targetY - posAttr.array[i*3+1]) * 0.04 + velocities[i].y;
                posAttr.array[i*3+2] += (targetZ - posAttr.array[i*3+2]) * 0.04 + velocities[i].z;

                // Draw lines between neighbors (PLEXUS) - distance logic
                for(let j = i + 1; j < particleCount; j++) {
                    const dx = posAttr.array[i*3] - posAttr.array[j*3];
                    const dy = posAttr.array[i*3+1] - posAttr.array[j*3+1];
                    const dz = posAttr.array[i*3+2] - posAttr.array[j*3+2];
                    const distSq = dx*dx + dy*dy + dz*dz;
                    
                    if(distSq < 2.5) { // More connections
                        linePositions.push(posAttr.array[i*3], posAttr.array[i*3+1], posAttr.array[i*3+2]);
                        linePositions.push(posAttr.array[j*3], posAttr.array[j*3+1], posAttr.array[j*3+2]);
                    }
                }
            }
            
            posAttr.needsUpdate = true;
            lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
            
            group.rotation.y += 0.005;
            group.rotation.x += 0.002;
            renderer.render(scene, camera);
        };
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    };

    /**
     * Demo 3D Scene Controller
     */
    let switchDemoModel = () => {};
    let globalTime = 0;

    const initDemo3D = () => {
        const container = document.getElementById('demo-canvas-container');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        const modelGroup = new THREE.Group();
        scene.add(modelGroup);

        const mats = {
            solid: new THREE.MeshPhongMaterial({ 
                color: 0x222222, 
                specular: 0x444444, 
                shininess: 100, 
                flatShading: false 
            }),
            wire: new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15 }),
            glow: new THREE.MeshPhongMaterial({ 
                color: 0x111111, 
                emissive: 0xffffff, 
                emissiveIntensity: 0.4, 
                transparent: true, 
                opacity: 0.8 
            })
        };

        let currentParts = [];

        const updateModel = (index) => {
            modelGroup.clear();
            currentParts = [];
            
            // Model Factories
            const addPart = (mesh, type, params = {}) => {
                modelGroup.add(mesh);
                currentParts.push({ mesh, type, ...params });
                // Automatically add wireframe
                const wire = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), mats.wire);
                mesh.add(wire);
            };

            switch(index % 6) {
                case 0: // Gears
                    const g1 = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.2, 16, 32), mats.solid);
                    addPart(g1, 'rotate', { speed: 0.02 });
                    break;
                case 1: // Gripper
                    const base = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), mats.solid);
                    const finger = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1, 0.3), mats.solid);
                    finger.position.y = 0.5;
                    addPart(base, 'none');
                    addPart(finger, 'osc', { axis: 'y', range: 0.5 });
                    break;
                case 2: // Drone
                    const frame = new THREE.Mesh(new THREE.BoxGeometry(2, 0.05, 0.05), mats.solid);
                    addPart(frame, 'rotate', { speed: 0.01 });
                    break;
                case 3: // Joint
                    const s1 = new THREE.Mesh(new THREE.SphereGeometry(0.5), mats.glow);
                    addPart(s1, 'pulse');
                    break;
                case 4: // Leg
                    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1.5), mats.solid);
                    addPart(leg, 'osc', { axis: 'z', range: 0.7 });
                    break;
                case 5: // Bracket
                    const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.6, 0.2, 100, 16), mats.glow);
                    addPart(knot, 'rotate', { speed: 0.01 });
                    break;
            }

            modelGroup.scale.set(0,0,0);
            gsap.to(modelGroup.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: "back.out" });
        };

        switchDemoModel = updateModel;

        // Better "Medium" Lighting
        const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
        mainLight.position.set(5, 10, 7.5);
        scene.add(mainLight);

        const fillLight = new THREE.PointLight(0xffffff, 0.8, 20);
        fillLight.position.set(-5, 5, 2);
        scene.add(fillLight);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);
        
        camera.position.z = 4.5;

        const animate = () => {
            requestAnimationFrame(animate);
            globalTime += 0.05;
            
            currentParts.forEach(p => {
                if(p.type === 'rotate') p.mesh.rotation.y += p.speed;
                if(p.type === 'osc') p.mesh.rotation[p.axis] = Math.sin(globalTime) * p.range;
                if(p.type === 'pulse') p.mesh.scale.setScalar(1 + Math.sin(globalTime) * 0.1);
            });

            modelGroup.rotation.y += 0.005;
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        updateModel(0);
    };

    /**
     * Real-time Latency Simulation
     */
    const initLatencySim = () => {
        const indicators = document.querySelectorAll('.latency-value');
        if (!indicators.length) return;

        setInterval(() => {
            indicators.forEach(el => {
                const base = parseFloat(el.dataset.base || 10);
                const variance = Math.random() * 2;
                el.textContent = (base + variance).toFixed(1);
            });
        }, 800);
    };

    /**
     * Typewriter Engine
     */
    const initTypewriter = () => {
        const el = document.getElementById('demo-prompt');
        if (!el) return;

        const phrases = [
            "Generate a high-torque planetary gear system...",
            "Design a 3-axis robotic gripper end-effector...",
            "Optimize a carbon fiber UAV racing frame...",
            "Model a high-speed robotic actuator joint...",
            "Synthesize a bionic quadruped leg linkage...",
            "Create a topologically optimized aerospace bracket..."
        ];

        let i = 0, j = 0, isDeleting = false;

        const tick = () => {
            const full = phrases[i];
            el.textContent = isDeleting ? full.substring(0, j--) : full.substring(0, j++);

            let speed = isDeleting ? 40 : 80;
            if (!isDeleting && j === full.length + 1) {
                isDeleting = true;
                speed = 2000;
            } else if (isDeleting && j === 0) {
                isDeleting = false;
                i = (i + 1) % phrases.length;
                switchDemoModel(i);
                speed = 500;
            }
            setTimeout(tick, speed);
        };
        tick();
    };

    // --- Boot ---
    initHero3D();
    initDemo3D();
    initTypewriter();
    initLatencySim();
    initScrollAnimations();
    initMobileNav();
});
