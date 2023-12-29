import { useEffect, useState } from "react";

import ItemCard from "../../components/itemCard/ItemCard"
import { IItemCard } from "../../interfaces/ItemCard";
import { postWithAuth } from "../../helpers/http";
import { getQuery } from "../../helpers/URL";

import "./browseListArea.css"

const getArtworks = async (): Promise<any> => {
  const res = await postWithAuth('/works/get/all', {
    kind: getQuery('kind')
  })

  return res;
}

export default () => {
  const [ works, setWorks ] = useState([]);
  
  useEffect(() => {
    (async () => {
      const res = await getArtworks();

      setWorks(res.works);
    })()
  }, []);

  return (
    <section className="container__browse__list-area">
      <div className="container__browse__list-area_list grid">
        { works.map((item: IItemCard) => <ItemCard key={item._id} {...item}/>) }
      </div>
    </section>
  )
}