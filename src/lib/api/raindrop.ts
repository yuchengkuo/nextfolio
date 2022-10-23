import { RAINDROP_ACCESS_TOKEN as access_token } from '$env/static/private'

const RAINDROPS_ENDPOINT = `https://api.raindrop.io/rest/v1/raindrops/`

export async function getBookmarks(collection: string) {
  const url = new URL(RAINDROPS_ENDPOINT + collection)

  url.searchParams.append('perpage', '50')

  return fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}
