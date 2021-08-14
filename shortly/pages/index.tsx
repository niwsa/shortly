import Form from 'components/Form'
import { ShrtCodeData } from 'lib/apiClient'
import { useState } from 'react'

const Home = (): JSX.Element => {
  const [shrtCodeList, setShrtCodeList] = useState<Array<ShrtCodeData>>([])

  function addToList(shrtCodeData: ShrtCodeData) {
    setShrtCodeList((curList) => [...curList, shrtCodeData])
  }
  return (
    <>
      <Form addShrtCodeToList={addToList}></Form>
      <ul>
        {shrtCodeList.map(({ original_link, full_short_link, code }) => (
          <li key={code}>
            {original_link}-{full_short_link}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Home
