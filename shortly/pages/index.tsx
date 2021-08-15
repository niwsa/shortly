import { useState } from 'react'
import Form from 'components/Form'
import Hero from 'components/Hero'
import { ShrtCodeData } from 'lib/apiClient'
import styles from './index.module.css'

const Home = (): JSX.Element => {
  const [shrtCodeList, setShrtCodeList] = useState<Array<ShrtCodeData>>([])

  function addToList(shrtCodeData: ShrtCodeData) {
    setShrtCodeList((curList) => [...curList, shrtCodeData])
  }
  return (
    <>
      <Hero />
      <div className={styles['content']}>
        <div className={styles['content__interactive']}>
          <Form addShrtCodeToList={addToList}></Form>
        </div>
        <ul>
          {shrtCodeList.map(({ original_link, full_short_link, code }) => (
            <li key={code}>
              {original_link}-{full_short_link}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Home
