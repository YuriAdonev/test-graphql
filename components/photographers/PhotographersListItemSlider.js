const PhotographersListItemSlider = ({ sliderData, user }) => {
  const images = sliderData.map((photo, index) => {
    return (
      <li
        key={index}
        itemProp="image"
        itemScope
        itemType="http://schema.org/ImageObject"
      >
        <a
          href={`/ru/photographer/${user.login}/`}
          target="_blank"
        >
          <img
            data-src={photo.googleUrl}
            src={photo.googleUrl}
            alt="${this._translations.jobTitleColon}${name} ${surname} (${this._catalogItem.login}). ${this._translations.photoOf}${this._parseDate(photo.addDate)}"
            className="format-39 smallImg lazy-load-blazy photographer-list-item-photo"
            itemProp="image"
          />
        </a>
        <meta itemProp="name" content="${this._translations.jobTitle}${name} ${surname} (${this._catalogItem.login}). ${this._translations.photoOf}${this._parseDate(photo.addDate)}"/>
        <meta itemProp="author" content="${name} ${surname}"/>
      </li>
    )
  })

  return (
    <>
      <div className="photos-wrap">

        <div data-id="{{index}}" className="photos-wrap-arrows photos-wrap-arrows__left"/>
        <div data-id="{{index}}" className="photos-wrap-arrows photos-wrap-arrows__right"/>

        <ul data-current-photo="0" data-number-photos="4" className="photos" style={{marginLeft: '0px'}}>
          {images}
        </ul>

      </div>
      <div className="photos_thumb_wrap">
        <div className="thumb_list" data-id="{{index}}">
          <div className="thumb_item active"></div>
          <div className="thumb_item"></div>
          <div className="thumb_item"></div>
          <div className="thumb_item"></div>
        </div>
      </div>
    </>
  )
}

export default PhotographersListItemSlider