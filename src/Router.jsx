import { Outlet, Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import ArticlePage from "./pages/ArticlePage"
import Header from "./components/Header"

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

function Router() {
  return (
    <Routes >
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path=":username/:slug" element={<ArticlePage />} />
      </Route>
    </Routes>
  )
}

export default Router