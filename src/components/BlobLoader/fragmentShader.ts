const fragmentShader = `
uniform float u_intensity;
uniform float u_time;
varying vec2 vUv;
varying float vDisplacement;
void main() {
    float distort = 2.9 * vDisplacement * u_intensity * sin(vUv.y * 15.0 + u_time);
    vec3 color = vec3(abs(vUv - 0.6) * 2.5  * (1.2 - distort), 1.2);
    gl_FragColor = vec4(color, 1.69);
}
`;

export default fragmentShader;
