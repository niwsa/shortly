import { useEffect, useState } from 'react'
import Form from 'components/Form'
import Hero from 'components/Hero'
import { ShrtCodeData } from 'lib/apiClient'
import styles from './Home.module.css'
import DataCard from 'components/DataCard'
import FeatureCard from 'components/FeatureCard'
import { featureHighlights } from 'lib/cms'
import {
  addShrtCodesToLocalStorage,
  getAllShrtCodesFromLocalStorage,
} from 'lib/localStorage'

const Home = (): JSX.Element => {
  const [shrtCodeList, setShrtCodeList] = useState<Array<ShrtCodeData>>(null)

  function addToList(shrtCodeData: ShrtCodeData) {
    setShrtCodeList((curList) => [...curList, shrtCodeData])
  }

  // populate shrtCodeList from localStorage
  useEffect(() => {
    const _storedCodes = getAllShrtCodesFromLocalStorage()
    setShrtCodeList(_storedCodes)
  }, [])

  // persist to localStorage when new item is added
  useEffect(() => {
    addShrtCodesToLocalStorage(shrtCodeList)
  }, [shrtCodeList])

  return (
    <>
      <Hero />
      <div className={styles['content']}>
        <div className={styles['content__interactive']}>
          <Form addShrtCodeToList={addToList}></Form>
        </div>
        <ul className={styles['content__list']}>
          {shrtCodeList?.map(({ original_link, full_short_link, code }) => (
            <li key={code} className={styles['content__list-item']}>
              <DataCard item={original_link} value={full_short_link} />
            </li>
          ))}
        </ul>
        <section className={styles['highlights']}>
          <h2 className={styles['highlights__heading']}>Advanced Statistics</h2>
          <p className={styles['highlights__meta']}>
            Track how your links are performing across the web with our advanced
            statistics dashboard.
          </p>
          <ul className={styles['highlights__card-list']}>
            {featureHighlights.map(
              ({ avatar, avatarSize, heading, description }, index) => (
                <li key={index} className={styles['highlights__card']}>
                  <FeatureCard
                    avatar={avatar}
                    avatarSize={avatarSize}
                    heading={heading}
                    description={description}
                  />
                </li>
              )
            )}
          </ul>
        </section>
      </div>
    </>
  )
}

export default Home
