import { useEffect, useState } from "react"
import { Link } from "react-router"
import { FaBookmark, FaRegComment, FaShare } from "react-icons/fa6";

function HomePage() {
  const [data, setData] = useState([])
  const [bookmark, setBookmark] = useState(false)

  function handleClick(e) {
    setBookmark(!bookmark)
    const checkbook = e.target.parentElement
    if (bookmark) checkbook.classList.add('!text-black')
    else checkbook.classList.remove('!text-black')
  }

  useEffect(() => {
    fetch('/userArticles.json').
      then(data => data.json()).
      then(data => setData(data))
  }
    , [])
  return (
    <section>
      <div className="w-screen flex flex-col justify-center items-center">
        <div className="max-w-[680px] h-screen flex flex-col gap-10">
          {data.map((e, idx) =>
            <div className="flex flex-col gap-5 shadow p-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-gray-300 rounded-full"></div>
                  <span key={e.username}>
                    {e.username}
                  </span>
                </div>
                <button className={`hover:cursor-pointer`} onClick={handleClick} >
                  <FaBookmark id={idx} className={`text-4xl text-gray-300`} />
                </button>
              </div>
              <div key={e.title}><h1 className="font-bold text-3xl">{e.title}</h1></div>
              <div key={e.body} className="truncate text-gray-700">{e.body}</div>
              <div className="flex justify-between w-full items-center">
                <div className="text-white bg-black px-4 py-2 rounded w-fit">
                  <Link to={`/${e.username}/${e.slug}`}>Read more</Link>
                </div>
                <div className="flex gap-3">
                  <FaRegComment className="text-2xl" />
                  <FaShare className="text-2xl" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default HomePage