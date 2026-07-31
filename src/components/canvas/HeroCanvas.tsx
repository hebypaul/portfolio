"use client";

import { useEffect, useRef } from "react";
import { Renderer, Texture, Program, Mesh, Triangle, Vec2 } from "ogl";

const vertex = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;



const fragment = `
  precision highp float;
  
  uniform sampler2D tPaint;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec2 uMouseVelocity;
  
  varying vec2 vUv;

  // 3D Noise function
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float snoise(vec3 v){ 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod(i, 289.0 ); 
    vec4 p = permute( permute( permute( 
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vec2 uv = vUv;
    
    // Paint mask from canvas
    float mask = texture2D(tPaint, uv).r;
    
    // Aspect ratio correction for mouse
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 mouseUV = uMouse * 0.5 + 0.5;
    
    // Analytical Ripple calculation based on mouse distance and velocity
    float dist = distance(uv * aspect, mouseUV * aspect);
    float wave = sin(dist * 40.0 - uTime * 5.0) * exp(-dist * 5.0);
    
    // Add noise distortion
    float n = snoise(vec3(uv * 3.0, uTime * 0.1));
    vec2 distortedUV = uv + wave * 0.02 * length(uMouseVelocity) + n * 0.01;
    
    // Generate beautiful "artwork" procedurally
    vec3 color1 = vec3(0.02, 0.45, 0.85); // Blue
    vec3 color2 = vec3(0.05, 0.8, 0.9);   // Cyan
    vec3 color3 = vec3(0.4, 0.1, 0.8);    // Purple
    
    float noise1 = snoise(vec3(distortedUV * 2.0, uTime * 0.2));
    float noise2 = snoise(vec3(distortedUV * 4.0, uTime * 0.15 + 10.0));
    
    vec3 artColor = mix(color1, color2, noise1 * 0.5 + 0.5);
    artColor = mix(artColor, color3, noise2 * 0.5 + 0.5);
    
    // Add glow and bloom
    artColor += vec3(0.1, 0.3, 0.5) * wave * 2.0;
    
    // Base dark color
    vec3 baseColor = vec3(0.03, 0.03, 0.04);
    
    // Mix based on accumulated paint mask
    vec3 finalColor = mix(baseColor, artColor, smoothstep(0.0, 1.0, mask));
    
    // Slight vignette
    float vignette = length(uv - 0.5);
    finalColor *= 1.0 - vignette * 0.5;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    // Setup OGL Renderer
    const renderer = new Renderer({ dpr: 2, alpha: true, premultipliedAlpha: false });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    
    // Setup Paint Mask Canvas (2D)
    const paintCanvas = document.createElement('canvas');
    const pctx = paintCanvas.getContext('2d', { willReadFrequently: true })!;
    
    const texture = new Texture(gl, {
      image: paintCanvas,
      generateMipmaps: false,
      wrapS: gl.CLAMP_TO_EDGE,
      wrapT: gl.CLAMP_TO_EDGE,
      minFilter: gl.LINEAR,
      magFilter: gl.LINEAR,
    });
    
    const geometry = new Triangle(gl);
    
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        tPaint: { value: texture },
        uTime: { value: 0 },
        uResolution: { value: new Vec2(window.innerWidth, window.innerHeight) },
        uMouse: { value: new Vec2(-2, -2) },
        uMouseVelocity: { value: new Vec2(0, 0) }
      },
    });
    
    const mesh = new Mesh(gl, { geometry, program });
    
    const lastMouse = { x: 0, y: 0 };
    const mouse = { x: -2, y: -2 };
    const velocity = { x: 0, y: 0 };
    
    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      
      paintCanvas.width = w;
      paintCanvas.height = h;
      
      // Fill black initially
      pctx.fillStyle = 'black';
      pctx.fillRect(0, 0, w, h);
      
      program.uniforms.uResolution.value.set(w, h);
    }
    
    window.addEventListener('resize', resize);
    resize();
    
    // Mouse Interaction
    function onPointerMove(e: MouseEvent | TouchEvent) {
      let clientX, clientY;
      if (e instanceof MouseEvent) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
      
      // Calculate Normalized Device Coordinates (-1 to 1) for shader
      mouse.x = (clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(clientY / window.innerHeight) * 2 + 1;
      
      // Calculate velocity
      velocity.x = clientX - lastMouse.x;
      velocity.y = clientY - lastMouse.y;
      
      lastMouse.x = clientX;
      lastMouse.y = clientY;
      
      // Draw to paint mask canvas
      const dist = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
      const brushSize = Math.max(80, Math.min(250, dist * 2)); // Pressure simulation
      
      const gradient = pctx.createRadialGradient(clientX, clientY, 0, clientX, clientY, brushSize);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      pctx.fillStyle = gradient;
      pctx.beginPath();
      pctx.arc(clientX, clientY, brushSize, 0, Math.PI * 2);
      pctx.fill();
      
      // Needs update
      texture.needsUpdate = true;
    }
    
    window.addEventListener('pointermove', onPointerMove);
    
    // Decay the paint canvas slowly so it's not permanently revealed (optional, but requested "interactive digital canvas")
    // If the user wants it permanently revealed where painted, we remove decay. I will add a slight decay.
    
    let time = 0;
    let animationId: number;
    
    function update(_t: number) {
      animationId = requestAnimationFrame(update);
      
      time += 0.01;
      program.uniforms.uTime.value = time;
      
      // Smoothly damp velocity
      program.uniforms.uMouseVelocity.value.x += (velocity.x - program.uniforms.uMouseVelocity.value.x) * 0.1;
      program.uniforms.uMouseVelocity.value.y += (velocity.y - program.uniforms.uMouseVelocity.value.y) * 0.1;
      
      program.uniforms.uMouse.value.set(mouse.x, mouse.y);
      
      // Fade out canvas slowly (viscosity/decay)
      pctx.fillStyle = 'rgba(0, 0, 0, 0.005)';
      pctx.fillRect(0, 0, paintCanvas.width, paintCanvas.height);
      texture.needsUpdate = true;
      
      // Render
      renderer.render({ scene: mesh });
    }
    
    animationId = requestAnimationFrame(update);
    
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(animationId);
      container.removeChild(gl.canvas);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}
