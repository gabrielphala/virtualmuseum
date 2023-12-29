import { useEffect, useRef, useState } from "react"

import * as T3 from "three"

import T3Helper from "../../helpers/T3"
import { SERVERURL } from "../../helpers/URL";
import { closeModal } from "../../helpers/modals";
import { getElementById } from "../../helpers/dom";

const threeHelper = new T3Helper(650, 400);
threeHelper.setCameraPosition()

threeHelper.loader.load(`${SERVERURL}/assets/3D/little_house/scene.gltf`, (gltf) => {
  gltf.scene.children[0].scale.set(.03, .03, .03)
  gltf.scene.children[0].position.set(-5, 0, 3)

  threeHelper.scene.add(gltf.scene)
  threeHelper.animate()
})

threeHelper.loader.load(`${SERVERURL}/assets/3D/pedestal/scene.gltf`, (gltf) => {
  gltf.scene.children[0].scale.set(.03, .03, .03)
  gltf.scene.children[0].position.set(0, 0.6, 0)

  threeHelper.scene.add(gltf.scene)
})

// threeHelper.loader.load(`${SERVERURL}/assets/uploads/artwork/models/africanwoodenhead-1703022213210/scene.gltf`, (gltf) => {
  // gltf.scene.children[0].scale.set(.01, .01, .01)
  // gltf.scene.children[0].position.set(-0.07, .9, -0.01)

//   threeHelper.scene.add(gltf.scene)
// })

export default (props: any) => {
  const con = useRef(null);
  const previewCon = useRef(null);
  const thumbnailCon = useRef(null);

  const [ art, setArt ] = useState(null) as any;

  const uploadModelFile = async () => {
    setArt(await props.uploadModelFile());
  }

  const uploadModelDetails = async (e: any) => {
    setArt(await props.uploadModelDetails(e))
  }

  const showDetailsAndPreviewForm = () => {
    previewCon.current && ((previewCon.current as HTMLElement).style.display = 'block');
    thumbnailCon.current && ((thumbnailCon.current as HTMLElement).style.display = 'none');

    getElementById('show-thumbnail-btn')?.classList.remove('btn--primary')
    getElementById('show-previw-btn')?.classList.add('btn--primary')
  }

  const showThumbnailForm = () => {
    previewCon.current && ((previewCon.current as HTMLElement).style.display = 'none');
    thumbnailCon.current && ((thumbnailCon.current as HTMLElement).style.display = 'block');

    getElementById('show-previw-btn')?.classList.remove('btn--primary')
    getElementById('show-thumbnail-btn')?.classList.add('btn--primary')
  }
  
  useEffect(() => {
    con.current && (con.current as HTMLElement).appendChild(threeHelper.renderer.domElement);

    if (art) threeHelper.loadModel(art.model.folder, art.model.file);

  }, [con, art])

	return (
		<div className="modal modal--closed flex--a-start flex--j-center" id="new-model-modal">
      <form className="modal__main card" style={{marginTop: '3rem'}} id="new-model-form" onSubmit={(e) => uploadModelDetails(e)}>
        <div className="card__header flex flex--a-center flex--j-space-between">
          <div>
            <h1>Add a model</h1>
            <p>Add a new model to your collection</p>
          </div>
          <svg className="image--icon" onClick={() => closeModal('new-model')}>
            <use href="#cross"></use>
          </svg>
        </div>

        <div className="model-upload-tabs flex">
          <button type="button" id="show-previw-btn" className="btn btn--primary" onClick={showDetailsAndPreviewForm}>Model file &amp; Details</button>
          <button type="button" id="show-thumbnail-btn" className="btn" onClick={showThumbnailForm}>Model thumbnail</button>
        </div>

        <div ref={previewCon}>
          <div id="artwork-preview" ref={con} className="image--back"></div>

          <div className="card__body">
            <input type="file" id="thumbnail-file" onChange={() => props.uploadThumbnail() } hidden />

            <div className="twin-inputs">
              <div className="input">
                <label htmlFor="model-name">Model name</label>
                <input type="text" id="model-name" placeholder="e.g. African lady" />
              </div>

              <div className="input">
                <label htmlFor="model-scale">Scale</label>
                <input type="number" id="model-scale" defaultValue="1" placeholder="e.g. 1" />
              </div>
            </div>

            <div className="flex margin--top-2">
              <label htmlFor="model-file">Select 3D model file</label>
              <div className="sep margin--left-2 margin--right-2"></div>
              <p>0% Done</p>
            </div>
            
            <input type="file" id="model-file" onChange={() => uploadModelFile() } hidden />
          </div>  
        </div>

        <div ref={thumbnailCon} style={{display: 'none'}}>
          <div id="thumbnail-preview" className="image--back">
            <label htmlFor="thumbnail-file" className="flex flex--a-center flex--j-center pos--abs pos--center" style={{ flexDirection: "column" }}>
              <svg className="image--icon">
                <use href="#add"></use>
              </svg>
              <span>Upload artwork</span>
            </label>
          </div>

          <input type="file" id="thumbnail-file" onChange={props.uploadThumbnail} hidden />
        </div>

        <div className="card__footer">
          <button className="btn btn--primary">Upload model</button>
          <button type="button" className="btn" onClick={() => closeModal('new-model')}>Cancel</button>
        </div>
      </form>
    </div>
	)
}