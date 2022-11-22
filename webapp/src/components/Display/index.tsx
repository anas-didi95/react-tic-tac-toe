import { ReactNode } from "react"
import "./style.scss"

const Display: React.FC<{ children: ReactNode }> = ({ children }) => (
  <section className="display">{children}</section>
)

export default Display
