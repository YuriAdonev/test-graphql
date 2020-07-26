import { useEffect } from 'react'
import PhotographersListItem from "./PhotographersListItem";

const PhotographersList = ({ catalogData }) => {

  useEffect(() => {
    const catalog = document.querySelector('.photographers-list')
    catalog.querySelectorAll('[data-src]').forEach(item => {
      setPreview(item, item.getAttribute('data-src'))
      item.removeAttribute('data-src')
    })
  }, [])

  const setPreview = (preview, url) => {
    let devicePixelRatio = 1
    if (typeof window.devicePixelRatio != 'undefined') {
      if (window.devicePixelRatio > 1) {
        devicePixelRatio = window.devicePixelRatio
      }
    }

    if (window.innerWidth >= 760) {
      preview.setAttribute('src', `${url}=w${228*devicePixelRatio}-h${228*devicePixelRatio}-l90-c`)
    } else {
      preview.setAttribute('src', `${url}=w${Math.floor(preview.parentElement.offsetWidth)*devicePixelRatio}-h${Math.floor(preview.parentElement.offsetWidth)*devicePixelRatio}-l90-c`)
    }
  }

  const catalogItems = catalogData.map(item => {
    return (
      <PhotographersListItem
        key={item.id}
        photographer={item}
      />
    )
  })

  return (
    <div>
      PhotographersList
      <ul className="photographers-list">
        {catalogItems}
      </ul>
      <pre>{JSON.stringify(catalogData, null, 2)}</pre>
    </div>
  )
}

export default PhotographersList