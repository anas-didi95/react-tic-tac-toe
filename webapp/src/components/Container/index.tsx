import { ReactNode } from "react"
import "./style.scss"

interface IContainer {
  children: ReactNode
}

const Container: React.FC<IContainer> = ({ children }) => (
  <section className="container">{children}</section>
)

export default Container
