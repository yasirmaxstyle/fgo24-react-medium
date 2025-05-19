import { Link } from 'react-router'

function Header() {
  return (
    <header>
      <div className="text-center py-10">
        <Link to={'/'} className="font-bold text-4xl">MaxStyle.com</Link>
        <p>Read More, Style More</p>
      </div>
    </header>
  )
}

export default Header