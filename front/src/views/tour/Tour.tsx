import Header from "../../components/header/BaseHeader"

import * as T3 from "three"

import { useEffect, useRef, useState } from "react"

import { SERVERURL } from "../../helpers/URL"
import { getArtwork } from "../../helpers/artwork"

import T3Helper from "../../helpers/T3"

const threeHelper = new T3Helper(window.innerWidth, window.innerHeight);
threeHelper.setCameraPosition()

threeHelper.loader.load(`${SERVERURL}/assets/3D/little_house/scene.gltf`, (gltf) => {
  gltf.scene.children[0].scale.set(.03, .03, .03)
  gltf.scene.children[0].position.set(-5, 0, 3)

  threeHelper.scene.add(gltf.scene)

  threeHelper.animate()
})

export default () => {
  const refCon = useRef(null);
  const [ art, setArt ] = useState(null) as any;

  refCon.current && (refCon.current as HTMLElement).appendChild(threeHelper.renderer.domElement);

  useEffect(() => {
    (async () => {
      setArt(await getArtwork());
      
    })()
  }, [])

  if (art) {
    const artDetails = art.art;

    if (artDetails.kind == 'painting') threeHelper.loadImage(artDetails.image)
    // else if (artDetails.kind == 'model') threeHelper.loadModel(artDetails.modelFile)
  }

	return (
		<>
			<Header/>
			<main>
        <div id="museum" ref={refCon}></div>
			</main>
		</>
	)
}