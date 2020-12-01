const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const BASE_URL = `https://api.github.com`

const fetchBuilder = async (path, options = { method: 'GET' }) => {
  const { method, body } = options

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: body && JSON.stringify(body),
    })

    if (res.ok) return await res.json()

    throw res
  } catch (e) {
    throw e
  }
}

export const get = (path) => fetchBuilder(path)
