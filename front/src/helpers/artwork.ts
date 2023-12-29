import { SERVERURL, getQuery } from "./URL"

export interface Model {
  path: string,
  position: Array<number>,
  scale?: Array<number>,
  rotation?: Array<number>,
}

export async function getArtwork () {
  const res = await fetch(`${SERVERURL}/works/get/one`, {
    method: 'POST',
    body: JSON.stringify({
      id: getQuery('art')
    }),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    }
  })

  return res.json()
}