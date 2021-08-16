export type ShrtCodeDataRes = {
  ok: boolean
  result: ShrtCodeData
}

export type ShrtCodeData = {
  code: string
  short_link: string
  full_short_link: string
  short_link2: string
  full_short_link2: string
  share_link: string
  full_share_link: string
  original_link: string
}


export type ShrtCodeErr = {
  ok: boolean,
  error_code: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  error: string
}



async function client(path: string): Promise<ShrtCodeDataRes | ShrtCodeErr> {
  const url = process.env.NEXT_PUBLIC_API_BASE + path
  const response = await fetch(url)

  const data: ShrtCodeDataRes | ShrtCodeErr = await response.json()
  // console.log(data)
  if (response.ok) {
    return data
  } else {
    const { error } = data as ShrtCodeErr
    return Promise.reject(error)
  }

}

export default client
