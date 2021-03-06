import { FocusEvent, FormEvent, useState } from 'react'
import { ShrtCodeData, ShrtCodeDataRes } from 'lib/apiClient'
import styles from './index.module.css'

interface FormProps {
  addShrtCodeToList: (data: ShrtCodeData) => void
}

const Form = (props: FormProps): JSX.Element => {
  const { addShrtCodeToList } = props
  const [inputUrl, setInputUrl] = useState('')
  const [errMessage, setErrMessage] = useState('')

  const handleChange = (e: FormEvent<HTMLInputElement>): void => {
    // setErrMessage('')
    setInputUrl(e.currentTarget.value)
  }

  const checkValidity = (e: FocusEvent<HTMLInputElement>): void => {
    const inputEl = e.target as HTMLInputElement
    if (inputEl.validity.typeMismatch) {
      setErrMessage('Please enter a valid https:// url')
    }
    if (inputEl.validity.patternMismatch) {
      setErrMessage('Only HTTPS urls allowed')
    }
    if (inputEl.validity.valueMissing) {
      setErrMessage('Please add a link')
    }
  }

  const [fetchingShrtCode, setFetchingShrtCode] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    // clear previous error messages
    setErrMessage('')
    // show loading state
    setFetchingShrtCode(true)
    // lazy load the api client
    const client = (await import('lib/apiClient')).default
    try {
      const { result } = (await client(
        `/shorten?url=${inputUrl}`
      )) as ShrtCodeDataRes
      addShrtCodeToList(result)
    } catch (err) {
      if (typeof err === 'object') {
        console.error(err)
        setErrMessage(`Request failed.Please try again`)
      } else {
        setErrMessage(err)
      }
    } finally {
      // remove loading state
      setFetchingShrtCode(false)
      // reset input
      setInputUrl('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles['form']} aria-label="form">
      <div className={styles['form__input-container']}>
        <input
          type="url"
          className={styles['form__input']}
          placeholder="Shorten a link here..."
          pattern="https://.*"
          title="Only https urls allowed"
          required
          aria-required
          value={inputUrl}
          onChange={handleChange}
          aria-label="URL to shorten"
          aria-describedby="url-error"
          aria-invalid={!!errMessage}
          onBlur={checkValidity}
        ></input>
        <div id="url-error" className={styles['form__error']}>
          {errMessage}
        </div>
      </div>
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
