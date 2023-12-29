import { useEffect, useState } from "react";

import AccountHeader from "../../components/header/AccountHeader"
import PaintingModal from "./PaintingModal"
import ModelModal from "./ModelModal"
import AccountNav from "./AccountNav"

import ItemCard from "../../components/itemCard/ItemCard"
import { IItemCard } from "../../interfaces/ItemCard";

import { getElementById, getElementValueById } from "../../helpers/dom";
import { closeModal, openModal } from "../../helpers/modals";
import { getQuery, SERVERURL } from "../../helpers/URL";

import "./ArtWork.css"
import { postWithAuth, postWithAxios } from "../../helpers/http";
import { addInputFile } from "../../helpers/inputs";
import AuthCheck from "./AuthCheck";

const getArtworks = async (): Promise<any> => {
  const res = await postWithAuth('/works/get/all/by/artist', {
    kind: getQuery('kind')
  })

  return res;
}

export default () => {
	const [ works, setWorks ] = useState([]);
  
  useEffect(() => {
    (async () => {
      await setArtwork();
    })()
  }, []);

  const setArtwork  = async () => {
    const res = await getArtworks();
    setWorks(res.works);
  }

	const uploadPainting = async () => {
    const data = addInputFile('painting-file', 'painting');

    const res = await postWithAxios(`/painting/add/file`, data)

    if (res.successful) {
      (getElementById('painting-preview') as HTMLElement).style.backgroundImage =
        `url("${SERVERURL}/assets/uploads/artwork/paintings/${res.painting}")`;
    }
  };

  const uploadName = async (e: any) => {
    (e as PointerEvent).preventDefault();

    await postWithAuth('/painting/add/details', {
      name: getElementValueById('painting-name'),
      description: getElementValueById('painting-description'),
    })

		await setArtwork()

    closeModal('new-painting');
  }

	const uploadThumbnail = async () => {
    const data = addInputFile('thumbnail-file', 'thumbnail')

    const res = await postWithAxios(`/model/add/thumbnail`, data)

    if (res.successful) {
      (getElementById('thumbnail-preview') as HTMLElement).style.backgroundImage =
        `url("${SERVERURL}/assets/uploads/artwork/thumbnails/${res.thumbnail}")`;
    }
  };

	const uploadModelFile = async () => {
    const data = addInputFile('model-file', 'file')

    const res = await postWithAxios(`/model/add/thumbnail`, data)

    return res.art;
  };

  const uploadModelDetails = async (e: any) => {
    (e as PointerEvent).preventDefault();

    const _res = await postWithAuth('/model/add/details', {
      name: getElementValueById('model-name'),
      scale: getElementValueById('model-scale')
    })

		await setArtwork()

    closeModal('new-model');

    return (await _res.json()).art;
  }

  const deleteArtwork = async (artworkId: string) => {
    await postWithAuth('/works/delete', {
      id: artworkId
    })

		setArtwork();
  }

	return (
		<AuthCheck>
			<AccountHeader/>
			<main style={{ marginTop: '80px' }}>
				<AccountNav setArtwork={setArtwork} />
				<section className="container__browse__list-area">
					<div className="container__browse__list-area_list grid">
						{ works.map((item: IItemCard) => <ItemCard key={item._id} {...item} _isEditPage={true} deleteArtwork={deleteArtwork} />) }
					</div>
				</section>
				<div className="flex" style={{ padding: '4rem' }}>
          <button className="margin--right-2 btn btn--primary flex flex--a-center" onClick={() => openModal('new-model')}>
            <svg className="image--icon margin--right-1" style={{ fill: '#fafafa' }}>
							<use href="#add"></use>
						</svg>
            <span>Add 3D Model</span>
          </button>
					<p className="flex flex--a-center" onClick={() => openModal('new-painting')}>
						<svg className="image--icon margin--right-1">
							<use href="#add"></use>
						</svg>
						<span>Add Painting</span>
					</p>
				</div>
				<PaintingModal uploadPainting={uploadPainting} uploadName={uploadName}/>
				<ModelModal uploadThumbnail={uploadThumbnail} uploadModelDetails={uploadModelDetails} uploadModelFile={uploadModelFile}/>
			</main>
		</AuthCheck>
	)
}