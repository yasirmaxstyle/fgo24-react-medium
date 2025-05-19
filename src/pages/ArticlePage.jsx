import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

function ArticlePage() {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const { username, slug } = useParams()

  useEffect(() => {
    fetch('/userArticles.json').
      then(data => data.json()).
      then(data => {
        const seleted = []
        data.forEach(e => {
          if (e.username === username && e.slug === slug) {
            seleted.push(e)
          }
        })
        setData(seleted)
      })
  }, [])

  return (
    <section>
      <div className="w-screen flex flex-col justify-center items-center">
        <div className="max-w-[680px] h-screen flex flex-col gap-6">
          {data.map(e =>
            <div>
              <div className="mb-10 text-center">
                <div key={e.title}><h1 className="font-bold text-3xl">{e.title}</h1></div>
                <div key={e.username}>Article by : {e.username}</div>
              </div>
              <div key={e.body}>{e.body}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ArticlePage