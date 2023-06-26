import { AccumulativeShadows, RandomizedLight } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { easing } from "maath"
import { useRef } from "react"


const Backdrop = () => {
  const shadows = useRef()
  return (
    //temporal - сглаживание тени?
    //alphaTest - прозрачность
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={.85}
      scale={10}
      rotation={[Math.PI / 2 , 0, 0]}
      position={[0, 0, -0.14]}
    >
    <RandomizedLight
      amount={4}
      radius={9}
      intensity={.55}
      ambient={.25}
      position={[5,5,-10]}
    />
    <RandomizedLight
      amount={4}
      radius={5}
      intensity={.25}
      ambient={.55}
      position={[-5,5,-9]}
    />
    </AccumulativeShadows>
  )
}

export default Backdrop