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
          if (`@${e.username.toLowerCase().split(' ').join('')}` === username && e.slug === slug) {
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
            <div key={e.title}>
              <div className="mb-10">
                <div><h1 className="font-bold text-3xl">{e.title}</h1></div>
                <div>Article by : {e.username}</div>
              </div>
              <div><p>{e.body}</p></div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ArticlePage