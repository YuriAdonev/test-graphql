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
      <div className="wrapper">
        <div className="filter-rusult-head">
          <ul className="title-author wide">
            <li>
              <meta itemProp="givenName" content={photographer.name}/>
              <meta itemProp="familyName" content={photographer.surname}/>
              <meta itemProp="memberOf" content="${this._translations.memberOf}"/>
              <meta itemProp="jobTitle" content="${this._translations.jobTitleColon}${user.mywedGooglePlace['name' + this._capLocale]}, ${user.mywedGooglePlace['country' + this._capLocale]}"/>
              <meta itemProp="telephone" content="${user.mobileParse}"/>
              <div className="mobile_userpic">
                <div className="userpic">
                  <a
                    className="userpic-link"
                    href={`/ru/photographer/${photographer.login}/`}
                    target="_blank"
                  >
                    <svg baseProfile="full" version="1.2" style={{width: '45px', height: '45px'}}>
                      <image
                        className="smallUserpic pic-big format-40"
                        mask="url(#userpicmask-45)"
                        y="0" x="0"
                        width="45" height="45"
                        alt={`${photographer.name} ${photographer.surname} (${photographer.login})`}
                        xlinkHref={avatarHrefs.mobile}
                      />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="photographer_name_geo">
                <a
                  href={`/ru/photographer/${photographer.login}/`}
                  target="_blank"
                >
                  <span itemProp="name" className="cap-author-name">{photographer.name} {photographer.surname}</span>
                </a>
                <span className="author-login${user.hasPro ? ' pro' : ''}">
                  <a
                    href={`/ru/photographer/${photographer.login}/`}
                    target="_blank"
                  >${photographer.login}</a>
                </span>
                <span style={{marginRight: '60px'}} className="author-adress" itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
                  {/*<meta itemProp="addressLocality" content="${user.mywedGooglePlace['name' + this._capLocale]}"/>*/}
                  {/*<meta itemProp="addressCountry" content="${user.mywedGooglePlace['country' + this._capLocale]}"/>*/}
                  {/*${user.secondaryGooglePlace && user.secondaryGooglePlace.id === this._placeId ? this._translations.arriveFrom + ' ' : ''}${user.mywedGooglePlace['name' + this._capLocale]}, ${user.mywedGooglePlace['country' + this._capLocale]}*/}
                  ${photographer.mywedGooglePlace['nameRu']}, ${photographer.mywedGooglePlace['countryRu']}
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
            </li>
            <li className="price${price === '' ? ' hidden' : ''}">
              {/*${price} ${this._translations.perHour}*/}
            </li>
          </ul>

          <div className="favourite-author">
            <div className="favourite-author-ico j_switchFav${user.favoriteByCurrentUser ? ' active' : ''}"
                 data-id={photographer.id}/>
          </div>
        </div>

        <div className="filter-rusult-cont">
          <div className="filter-user-col">
            <div className="user-pic-crop">
              <div className="userpic">
                <a
                  className="userpic-link"
                  href={`/ru/photographer/${photographer.login}/`}
                  target="_blank"
                >
                  <svg baseProfile="full" version="1.2" style={{width: '200px', height: '200px'}}>
                    <image
                      className="bigUserpic pic-big format-12"
                      mask="url(#userpicmask-200)"
                      y="0" x="0"
                      width="200" height="200"
                      alt={`${photographer.name} ${photographer.surname} (${photographer.login})`}
                      xlinkHref={avatarHrefs.desktop}
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="nui-online-status set-in-list j_tooltip">
              <div className="nui-os-indicator ${user.isOnline ? 'online' : 'offline'}"/>
              <div className="nui-tooltip set-text-center set-up" style={{display: 'none'}}>
                <div className="nui-tt-wrap set-${user.isOnline ? 'online' : 'offline'}">
                  {/*${this._getLastVisitText(user.lastVisit)}*/}
                </div>
              </div>
            </div>

          </div>
          <div className="filter-long-col">
            <PhotographersListItemSlider
              sliderData={photographer.catalogPhotos}
              user={{
                name: photographer.name,
                surname: photographer.surname,
                login: photographer.login
              }}
            />

            {photographer.hasAbout && (
              <div className="author-text-wrap">
                <div className="text-author">
                  <span className="before">«</span>
                    {photographer.hasAbout}
                  <span className="after">»</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}

export default PhotographersListItem;