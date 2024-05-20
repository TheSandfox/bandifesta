import { useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useControls } from 'leva';
import * as THREE from 'three';

function SceneObject() {
	const gltf = useGLTF('bandifesta_scene.glb');
	const scene = useMemo(() => gltf.scene.clone(), [gltf.scene]);
	const control = useControls({
		positionX: { value: 0.0, min: -50, max: 50, step: 0.05, label: 'position x' },
		positionY: { value: 0.0, min: -50, max: 50, step: 0.05, label: 'position y' },
		positionZ: { value: 0.0, min: -50, max: 50, step: 0.05, label: 'position z' },
		rotationX: { value: 0.0, min: -180, max: 180, step: 1.0, label: 'rotation x' },
		rotationY: { value: 0.0, min: -180, max: 180, step: 1.0, label: 'rotation y' },
		rotationZ: { value: 0.0, min: -180, max: 180, step: 1.0, label: 'rotation z' },
	  });
	// 카메라 리프레시
	useEffect(() => {
		// scene.position.set(control.positionX,control.positionY,control.positionZ)
	},[control.positionX,control.positionY,control.positionZ])

	useEffect(()=>{
		console.log(scene);
	},[])

	return (
		<>
			<ambientLight />
			<primitive 
				object={scene} 
				position={[
					control.positionX,
					control.positionY,
					control.positionZ
				]}
				rotation={[
					THREE.MathUtils.degToRad(control.rotationX),
					THREE.MathUtils.degToRad(control.rotationY),
					THREE.MathUtils.degToRad(control.rotationZ)
				]}
			/>
		</>
	);
}

export default function Scene() {
	return (
		<Canvas 
			camera={{fov:45,near:0.05,far:128,position:[
				0,
				5,
				15
			]}}
		>
			<SceneObject />
		</Canvas>
	);
}