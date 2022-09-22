attribute vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

uniform float uVelocity;

attribute vec2 uv;

varying vec2 vUv;

void main() {
    vec3 pos = position;
    pos.x += uVelocity * uv.y * 0.0005;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    
    vUv = uv;
}