import { closeModal } from "../../helpers/modals"

export default (props: any) => {
	return (
		<div className="modal modal--closed flex--a-start flex--j-center" id="new-painting-modal">
      <form className="modal__main card" id="new-painting-form" onSubmit={(e) => props.uploadName(e)}>
        <div className="card__header flex flex--a-center flex--j-space-between">
          <div>
            <h1>Add a painting</h1>
            <p>Add a new painting to your collection</p>
          </div>
          <svg className="image--icon" onClick={(e) => closeModal('new-painting')}>
              <use href="#cross"></use>
          </svg>
          </div>

          <div id="painting-preview" className="image--back">
            <label htmlFor="painting-file" className="flex flex--a-center flex--j-center pos--abs pos--center" style={{ flexDirection: "column" }}>
              <svg className="image--icon">
                <use href="#add"></use>
              </svg>
              <span>Upload artwork</span>
            </label>
          </div>

          <div className="card__body">
            <input type="file" id="painting-file" onChange={() => props.uploadPainting() } hidden />

            <div className="input">
              <input type="text" id="painting-name" placeholder="Painting name" />
            </div>

            <div className="input margin--top-1">
              <textarea id="painting-description" placeholder="Describe painting"></textarea>
            </div>
          </div>
          <div className="card__footer">
            <button className="btn btn--primary margin--right-1">upload painting</button>
            <button type="button" className="btn" onClick={(e) => closeModal('new-painting')}>Cancel</button>
          </div>
      </form>
    </div>
	)
}