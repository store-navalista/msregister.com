"use client";
import { useEffect, useRef } from "react";
import css from "./FlyCircles.module.css";

type Particle = {
    x: number;
    y: number;
    diameter: number;
    duration: number;
    amplitude: number;
    offsetY: number;
    arc: number;
    startTime: number;
    colour: string;
};

const NUM_PARTICLES = 600;
const PARTICLE_SIZE = 0.5;
const SPEED = 40000;

function rand(low: number, high: number): number {
    return Math.random() * (high - low) + low;
}

function randomNormal({ mean = 0, dev = 1, pool }: { mean?: number; dev?: number; pool?: number[] }): number {
    if (Array.isArray(pool) && pool.length > 0) {
        let r = 0;
        do {
            const a = Math.round(randomNormal({ mean, dev }));
            if (a >= 0 && a < pool.length) return pool[a];
            r++;
        } while (r < 100);
        return pool[0];
    }

    let u = 0,
        v = 0,
        s = 0;
    do {
        u = Math.random() * 2 - 1;
        v = Math.random() * 2 - 1;
        s = u * u + v * v;
    } while (s >= 1 || s === 0);
    const mul = Math.sqrt((-2.0 * Math.log(s)) / s);
    return mean + dev * u * mul;
}

function createParticle(): Particle {
    const colour = {
        r: 255,
        g: randomNormal({ mean: 125, dev: 20 }),
        b: 50,
        a: rand(0, 1),
    };

    return {
        x: -2,
        y: -2,
        diameter: Math.max(0, randomNormal({ mean: PARTICLE_SIZE, dev: PARTICLE_SIZE / 2 })),
        duration: randomNormal({ mean: SPEED, dev: SPEED * 0.1 }),
        amplitude: randomNormal({ mean: 16, dev: 2 }),
        offsetY: randomNormal({ mean: 0, dev: 10 }),
        arc: Math.PI * 2,
        startTime: performance.now() - rand(0, SPEED),
        colour: `rgba(${colour.r}, ${colour.g}, ${colour.b}, ${colour.a})`,
    };
}

function moveParticle(particle: Particle, time: number): Particle {
    const progress = ((time - particle.startTime) % particle.duration) / particle.duration;
    return {
        ...particle,
        x: progress,
        y: Math.sin(progress * particle.arc) * particle.amplitude + particle.offsetY,
    };
}

function drawParticle(particle: Particle, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    const vh = canvas.height / 100;
    ctx.fillStyle = particle.colour;
    ctx.beginPath();
    ctx.ellipse(particle.x * canvas.width, particle.y * vh + canvas.height / 2, particle.diameter * vh, particle.diameter * vh, 0, 0, 2 * Math.PI);
    ctx.fill();
}

export const FlyCircles = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const particlesRef = useRef<Particle[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        for (let i = 0; i < NUM_PARTICLES; i++) {
            particlesRef.current.push(createParticle());
        }

        const draw = (time: number) => {
            const particles = particlesRef.current;

            for (let i = 0; i < particles.length; i++) {
                particles[i] = moveParticle(particles[i], time);
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const particle of particles) {
                drawParticle(particle, canvas, ctx);
            }

            requestAnimationFrame(draw);
        };

        requestAnimationFrame(draw);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return (
        <div className={css.canvas_wrapper}>
            <canvas style={{ width: "100%", height: "600px" }} id="particle-canvas" ref={canvasRef} />
        </div>
    );
};
