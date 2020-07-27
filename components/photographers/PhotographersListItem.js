import { useState, useEffect } from 'react'
import PhotographersListItemSlider from "./PhotographersListItemSlider";

const PhotographersListItem = (props) => {
  const [avatarHrefs, setAvatarHrefs] = useState({ mobile: '', desktop: '' })
  const {
    photographer
  } = props

  useEffect(() => {
    let devicePixelRatio = 1
    if (typeof window.devicePixelRatio != 'undefined') {
      if (window.devicePixelRatio > 1) {
        devicePixelRatio = window.devicePixelRatio
      }
    }

    if (document.body.offsetWidth < 760) {
      setAvatarHrefs({
        mobile: `${photographer.userpicUrl}=w${45*devicePixelRatio}-h${45*devicePixelRatio}-l90-c`,
        desktop: ''
      })
    } else {
      setAvatarHrefs({
        mobile: '',
        desktop: `${photographer.userpicUrl}=w${200*devicePixelRatio}-h${200*devicePixelRatio}-l90-c`
      })
    }

  }, [])

  return (
    <li className="photographers-list-item" itemScope itemType="http://schema.org/Person">
      <div className="photographers-list-item__wrap">
        <div className="item-head">
          <div className="item-head-avatar">
            <a
              className="item-head-avatar__link"
              href={`/ru/photographer/${photographer.login}/`}
              target="_blank"
            >
              <svg baseProfile="full" style={{width: '45px', height: '45px'}}>
                <image
                  mask="url(#userpicmask-45)"
                  y="0" x="0"
                  width="45" height="45"
                  xlinkHref={avatarHrefs.mobile}
                />
              </svg>
            </a>
          </div>
          <div className="item-head-info">
            <div className="item-head-info__author">
              <meta itemProp="givenName" content={photographer.name}/>
              <meta itemProp="familyName" content={photographer.surname}/>
              <meta itemProp="memberOf" content="${this._translations.memberOf}"/>
              <meta itemProp="jobTitle" content="${this._translations.jobTitleColon}${user.mywedGooglePlace['name' + this._capLocale]}, ${user.mywedGooglePlace['country' + this._capLocale]}"/>
              <meta itemProp="telephone" content="${user.mobileParse}"/>
              <a
                href={`/ru/photographer/${photographer.login}/`}
                target="_blank"
              >
                <span itemProp="name" className="cap-author-name">{photographer.name} {photographer.surname}</span>
              </a>
              <span className={`author-login${photographer.hasPro ? ' pro' : ''}`}>
                <a
                  href={`/ru/photographer/${photographer.login}/`}
                  target="_blank"
                >{photographer.login}</a>
              </span>
              <span style={{marginRight: '60px'}} className="author-adress" itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
                  {/*<meta itemProp="addressLocality" content="${user.mywedGooglePlace['name' + this._capLocale]}"/>*/}
                {/*<meta itemProp="addressCountry" content="${user.mywedGooglePlace['country' + this._capLocale]}"/>*/}
                {/*${user.secondaryGooglePlace && user.secondaryGooglePlace.id === this._placeId ? this._translations.arriveFrom + ' ' : ''}${user.mywedGooglePlace['name' + this._capLocale]}, ${user.mywedGooglePlace['country' + this._capLocale]}*/}
                {photographer.mywedGooglePlace['nameRu']}, {photographer.mywedGooglePlace['countryRu']}
              </span>
              <span itemProp="workLocation" itemScope itemType="http://schema.org/Place">
                  {/*<meta itemProp="name" content="${this._translations.jobTitleColon}${user.mywedGooglePlace['name' + this._capLocale]}, ${user.mywedGooglePlace['country' + this._capLocale]}"/>*/}
                {/*<meta itemProp="address" content="${user.mywedGooglePlace['name' + this._capLocale]}, ${user.mywedGooglePlace['country' + this._capLocale]}"/>*/}
                {/*<meta itemProp="telephone" content="${user.mobileParse}"/>*/}
                <span itemProp="geo" itemScope itemType="http://schema.org/GeoCoordinates">
                    <meta itemProp="latitude" content={photographer.mywedGooglePlace.lat}/>
                    <meta itemProp="longitude" content={photographer.mywedGooglePlace.lng}/>
                  </span>
                </span>
            </div>
            <div className="item-head-info__price">
              {/*${price} ${this._translations.perHour}*/}
            </div>
          </div>
          <div className={`item-head-fav${photographer.favoriteByCurrentUser ? ' active' : ''}`}/>
        </div>
        <div className="item-content">
          <div className="item-content-user">
            <a
              href={`/ru/photographer/${photographer.login}/`}
              target="_blank"
            >
              <svg baseProfile="full" style={{width: '200px', height: '200px'}}>
                <image
                  mask="url(#userpicmask-200)"
                  y="0" x="0"
                  width="200" height="200"
                  xlinkHref={avatarHrefs.desktop}
                />
              </svg>
            </a>
            .item-content-user-tooltip
            <div className="nui-online-status set-in-list j_tooltip">
              <div className="nui-os-indicator ${user.isOnline ? 'online' : 'offline'}"/>
              <div className="nui-tooltip set-text-center set-up" style={{display: 'none'}}>
                <div className="nui-tt-wrap set-${user.isOnline ? 'online' : 'offline'}">
                  {/*${this._getLastVisitText(user.lastVisit)}*/}
                </div>
              </div>
            </div>

          </div>

          <div className="item-content-portfolio">

          </div>
          <div className="item-content-slider">
            <PhotographersListItemSlider
              sliderData={photographer.catalogPhotos}
              user={{
                name: photographer.name,
                surname: photographer.surname,
                login: photographer.login
              }}
            />
          </div>
          {photographer.hasAbout && (
            <div className="item-content-about">
              <div className="text-author">
                <span className="before">«</span>
                {photographer.hasAbout}
                <span className="after">»</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

export default PhotographersListItem;