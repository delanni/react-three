type AnimatedBoxProperty = {
    i: number;
    x: number;
    y: number;
    z: number;
    phaseSpeedX: number;
    phaseSpeedY: number;
    phaseSpeedZ: number;
    size: number;
    color: string;
}

function intBetween(min: number, max: number): number {
    return Math.round(((max - min) * Math.random()) + min);
}

function rgb(r: number, g: number, b: number) {
    return ['#',
        r.toString(16).padStart(2, '0'),
        g.toString(16).padStart(2, '0'),
        b.toString(16).padStart(2, '0'),
    ].join('');
}

function generateCombinations(as: number[], bs: number[], cs: number[]): [number, number, number][] {
    const results: [number, number, number][] = [];
    for (let a of as) {
        for (let b of bs) {
            for (let c of cs) {
                results.push([a, b, c]);
            }
        }
    }
    return results;
}

export function generateRandomBoxesForCoordinates(xs: number[], ys: number[], zs: number[], spread = 1): AnimatedBoxProperty[] {
    const coordinateCombinations = generateCombinations(xs, ys, zs);
    console.log('Generating ' + coordinateCombinations.length + ' box properties');

    return coordinateCombinations.map(([x, y, z], index) => {
        return {
            i: index,
            x: x * spread,
            y: y * spread,
            z: z * spread,
            phaseSpeedX: intBetween(-5, 5) || 1,
            phaseSpeedY: intBetween(-5, 5) || 1,
            phaseSpeedZ: intBetween(-5, 5) || 1,
            size: intBetween(1, 100) / 100,
            color: rgb(intBetween(100, 255), intBetween(100, 255), intBetween(100, 255)),
        };
    });
}

// @ts-ignore
import orbitcontrols from 'three-orbit-controls';
import * as THREE from 'three';

export const OrbitControls = orbitcontrols(THREE);