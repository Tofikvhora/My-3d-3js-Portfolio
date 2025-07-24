import { Suspense, useEffect, useState } from 'react';
import { Canvas, events } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from '../Loader';

// 3D Model Component
const ComputerModel = ({isMobile}) => {
  const computer = useGLTF('./public/desktop_pc/scene.gltf');

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={1} />
      <spotLight position={[-20,50,10]}
      angle={0.12}
      penumbra={1}
      intensity={1}
      castShadow
      shadow-mapSize={1024}
      
      />
      <primitive object={computer.scene}
      scale={isMobile ? 0.7 :0.75}

      position={isMobile ? [0,-3,-2.2]:[0,-3.5,-1.5]}
      rotation={[-0.01,-0.2,-0.1]}
      />
    </mesh>
  );
};

// Canvas Component
const ComputersCanvas = () => {

  const [isMobile,setIsMobile] = useState(false);

  useEffect(() =>{
    const MediaQuery = window.matchMedia('(max-width:500px)');
    setIsMobile(MediaQuery.matches);

    const handleMediaQueryChange = (events) =>{
      setIsMobile(events.matches);
    }
    MediaQuery.addEventListener('change',handleMediaQueryChange);
    return () =>{
      MediaQuery.removeEventListener('change',handleMediaQueryChange);
    }
  });
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <ComputerModel isMobile={isMobile}/>
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default ComputersCanvas;
