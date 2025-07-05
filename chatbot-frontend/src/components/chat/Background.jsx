// https://bootsnipp.com/snippets/7nBnW
import React, { useEffect, useRef } from 'react';
import './Background.css';

export default function Background() {
  const particlesRef = useRef(null);

  useEffect(() => {
    const el = particlesRef.current;
    if (!el) return;

    // Particleground logic
    function particleground(element, options = {}) {
      const defaults = {
        minSpeedX: 0.1, maxSpeedX: 0.7,
        minSpeedY: 0.1, maxSpeedY: 0.7,
        directionX: 'center', directionY: 'center',
        density: 10000,
        dotColor: '#666666', lineColor: '#666666',
        particleRadius: 7, lineWidth: 1,
        curvedLines: false, proximity: 100,
        parallax: true, parallaxMultiplier: 5,
        onInit() {}, onDestroy() {}
      };
      options = { ...defaults, ...options };

      // create & style canvas
      let canvas = document.createElement('canvas');
      canvas.className = 'pg-canvas';
      element.insertBefore(canvas, element.firstChild);
      const ctx = canvas.getContext('2d');

      // reusable vars
      let particles = [], mouseX = 0, mouseY = 0;
      const desktop = !/mobi|tablet/i.test(navigator.userAgent);
      const orientationSupport = !!window.DeviceOrientationEvent;
      let tiltX = 0, tiltY = 0, pointerX, pointerY, paused = false;

      function styleCanvas() {
        canvas.width = element.offsetWidth;
        canvas.height = element.offsetHeight;
        ctx.fillStyle = options.dotColor;
        ctx.strokeStyle = options.lineColor;
        ctx.lineWidth = options.lineWidth;
      }

      // Particle constructor
      function Particle() {
        this.stackPos = 0;
        this.layer = Math.ceil(Math.random() * 3);
        this.parallaxOffsetX = 0;
        this.parallaxOffsetY = 0;
        this.position = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height
        };
        // compute speed.x
        switch (options.directionX) {
          case 'left':
            this.speedX = -options.maxSpeedX + Math.random() * options.maxSpeedX - options.minSpeedX;
            break;
          case 'right':
            this.speedX = options.minSpeedX + Math.random() * options.maxSpeedX;
            break;
          default:
            this.speedX = (Math.random() * options.maxSpeedX) - (options.maxSpeedX / 2);
            break;
        }
        // compute speed.y
        switch (options.directionY) {
          case 'up':
            this.speedY = -options.maxSpeedY + Math.random() * options.maxSpeedY - options.minSpeedY;
            break;
          case 'down':
            this.speedY = options.minSpeedY + Math.random() * options.maxSpeedY;
            break;
          default:
            this.speedY = (Math.random() * options.maxSpeedY) - (options.maxSpeedY / 2);
            break;
        }
      }

      // draw method
      Particle.prototype.draw = function() {
        ctx.beginPath();
        ctx.arc(
          this.position.x + this.parallaxOffsetX,
          this.position.y + this.parallaxOffsetY,
          options.particleRadius / 2,
          0, Math.PI * 2
        );
        ctx.fill();
        ctx.beginPath();
        for (let i = particles.length - 1; i > this.stackPos; i--) {
          const p2 = particles[i];
          const dx = this.position.x - p2.position.x;
          const dy = this.position.y - p2.position.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < options.proximity) {
            ctx.moveTo(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY);
            ctx.lineTo(p2.position.x + p2.parallaxOffsetX, p2.position.y + p2.parallaxOffsetY);
          }
        }
        ctx.stroke();
      };

      // update position
      Particle.prototype.updatePosition = function() {
        // parallax
        if (options.parallax) {
          if (orientationSupport && !desktop) {
            const ratioX = window.innerWidth / 60;
            const ratioY = window.innerHeight / 60;
            pointerX = (tiltX + 30) * ratioX;
            pointerY = (tiltY + 30) * ratioY;
          } else {
            pointerX = mouseX;
            pointerY = mouseY;
          }
          this.parallaxOffsetX += ((pointerX - window.innerWidth / 2) / (options.parallaxMultiplier * this.layer) - this.parallaxOffsetX) / 10;
          this.parallaxOffsetY += ((pointerY - window.innerHeight / 2) / (options.parallaxMultiplier * this.layer) - this.parallaxOffsetY) / 10;
        }

        this.position.x += this.speedX;
        this.position.y += this.speedY;

        // bounce edges
        if (this.position.x > canvas.width || this.position.x < 0) this.speedX = -this.speedX;
        if (this.position.y > canvas.height || this.position.y < 0) this.speedY = -this.speedY;
      };

      // init
      function init() {
        styleCanvas();
        const count = Math.round((canvas.width * canvas.height) / options.density);
        for (let i = 0; i < count; i++) {
          const p = new Particle();
          p.stackPos = i;
          particles.push(p);
        }
        window.addEventListener('resize', styleCanvas);
        document.addEventListener('mousemove', e => { mouseX = e.pageX; mouseY = e.pageY; });
        draw();
        options.onInit.call(element);
      }

      // draw loop
      function draw() {
        styleCanvas();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => p.updatePosition());
        particles.forEach(p => p.draw());
        if (!paused) requestAnimationFrame(draw);
      }

      init();
      return {
        destroy() {
          paused = true;
          options.onDestroy.call(element);
          element.removeChild(canvas);
        }
      };
    }


    const instance = particleground(el, {
      dotColor: '#56DFCF',
      lineColor: '#56DFCF'
    });

    return () => instance.destroy();
  }, []);

  return (
    <div id="particles" ref={particlesRef}>
      <div id="webcoderskull">
      </div>
    </div>
  );
}