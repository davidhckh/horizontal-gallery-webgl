precision highp float;

uniform vec2 uImageSizes;
uniform vec2 uPlaneSizes;
uniform float uOffset;
uniform sampler2D tMap;
uniform float uZoom;

varying vec2 vUv;
        
void main() {
    vec2 ratio = vec2(
        min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
        min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
    );
        
    vec2 uv = vec2(
        vUv.x * ratio.x + (1.0 - ratio.x) * 0.5 + uOffset,
        vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    vec2 zoomedUv = vec2(
        mix(0.5, uv.x, uZoom),
        mix(0.5, uv.y, uZoom)
    );

    vec4 texture = texture2D(tMap, zoomedUv);

    gl_FragColor = texture;
}