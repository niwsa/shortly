import { FormEvent, useState } from 'react'
import { ShrtCodeData, ShrtCodeDataRes } from 'lib/apiClient'
import styles from './index.module.css'

interface FormProps {
  addShrtCodeToList: (data: ShrtCodeData) => void
}

const Form = (props: FormProps): JSX.Element => {
  const { addShrtCodeToList } = props
  const [inputUrl, setInputUrl] = useState('')

  const handleChange = (e: FormEvent<HTMLInputElement>): void => {
    setInputUrl(e.currentTarget.value)
  }

  const [fetchingShrtCode, setFetchingShrtCode] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    // show loading state
    setFetchingShrtCode(true)
    const client = (await import('lib/apiClient')).default
    try {
      const { result } = (await client(
        `/shorten?url=${inputUrl}`
      )) as ShrtCodeDataRes
      addShrtCodeToList(result)
    } catch (err) {
      console.error(err)
    } finally {
      // remove loading state
      setFetchingShrtCode(false)
      // reset input
      setInputUrl('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles['form']}>
      <input
        type="url"
        placeholder="Shorten a link here..."
        pattern="https://.*"
        title="Only https urls allowed"
        required
        value={inputUrl}
        onChange={handleChange}
        aria-label="URL to shorten"
      ></input>
      {fetchingShrtCode ? (
        <div
          aria-live="polite"
          aria-label="Fetching short link"
          role="status"
          className={styles['form__status']}
        >
          <img
            src="/bars.svg"
            alt="fetching short link"
            aria-hidden="true"
            className={styles['form__spinner']}
          ></img>
        </div>
      ) : (
        <button type="submit" className={styles['form__submit']}>
          Shorten It!
        </button>
      )}
    </form>
  )
}

export default Form
