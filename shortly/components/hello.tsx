type HelloProps = {
  message: string
}

const Hello = ({ message }: HelloProps): JSX.Element => <div>{message}</div>

export default Hello
