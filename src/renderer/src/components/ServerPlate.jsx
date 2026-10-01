import { SERVER_NAME } from '../../../shared/config.mjs'
import logo from '../assets/logo.svg'

export default function ServerPlate() {
  return <img src={logo} alt={SERVER_NAME} draggable={false} className="block h-30 w-auto select-none" />
}
