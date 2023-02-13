import React, { useContext, useMemo, useRef } from "react";
import vertexShader from "./vertexShader";
import fragmentShader from "./fragmentShader";
import { Canvas, useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import { FormattedMessage } from "react-intl";
import { ThemeColorContext } from "../../context/ThemeColorWrapper";

const Blob = () => {
  const mesh: React.MutableRefObject<any> = useRef();
  const hover = useRef(false);
  const uniforms = useMemo(() => {
    return {
      u_time: { value: 0 },
      u_intensity: { value: 0.3 },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, undefined);

  useFrame((state) => {
    const { clock } = state;
    if (mesh.current) {
      mesh.current.material.uniforms.u_time.value =
        0.4 * clock.getElapsedTime();

      mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
        mesh.current.material.uniforms.u_intensity.value,
        hover.current ? 1 : 0.15,
        0.02
      );
    }
  });
  return (
    <mesh
      ref={mesh}
      scale={1.5}
      position={[0, 0, 0]}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
    >
      <icosahedronBufferGeometry args={[2, 20]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

const BlobLoader = () => {
  const { themeColor } = useContext(ThemeColorContext);

  return (
    <div className={`blobLoader ${themeColor}`}>
      <section>
        <div>
          <FormattedMessage id="app.loading" />
          <Canvas
            className="blobLoader__blob"
            camera={{ position: [0.0, 0.0, 8.0] }}
          >
            <Blob />
          </Canvas>
        </div>
      </section>
    </div>
  );
};

export default BlobLoader;
