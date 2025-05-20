import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router"
import { FaBookmark, FaRegComment, FaShare } from "react-icons/fa6";
import { useForm } from "react-hook-form";



function HomePage() {
  const [data, setData] = useState([])
  const [bookmark, setBookmark] = useState(false)
  const { handleSubmit, register, reset } = useForm()
  const [searchParams, setSearchParams] = useSearchParams()
  const [notFound, setNotFound] = useState(false)

  const onSubmit = (form) => {
    form && setSearchParams(form)
    if (searchParams.get('search') && !filtered.includes(searchParams.get('search'))) setNotFound(true)
    console.log(filtered.includes(searchParams.get('search')))
    reset()
  }

  const filtered = data.filter(e =>
    e.body.toLowerCase().includes(searchParams.get('search')?.toLowerCase()) ||
    e.title.toLowerCase().includes(searchParams.get('search')?.toLowerCase()))

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
  }, [])
  return (
    <section>
      <div>
        <div className="max-w-[680px] h-screen flex flex-col gap-10 mx-auto px-3">
          <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input {...register("search")} type="text" name="search" id="search" placeholder="Cari artikel" className="border px-4 py-2 rounded" />
            </form>
            {searchParams.get("search") && <div className="mt-3">Hasil pencarian untuk "{searchParams.get('search')}"</div>}
          </div>
          {searchParams.get('search') ? filtered.map((e, idx) => {
            return (
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
            )
          }) : data.map((e, idx) => {
            return (
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
                    <Link to={`/@${e.username.toLowerCase().split(' ').join('')}/${e.slug}`}>Read more</Link>
                  </div>
                  <div className="flex gap-3">
                    <FaRegComment className="text-2xl" />
                    <FaShare className="text-2xl" />
                  </div>
                </div>
              </div>
            )
          })}
          {notFound &&
            <div className="w-full">
              <div>Not found</div>
            </div>
          }
        </div>
      </div>
    </section>
  )
}

export default HomePage