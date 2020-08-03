import Head from "next/head"
import PhotographersList from "../components/photographers/PhotographersList"

const Home = (props) => {
  const {
    catalogStats,
    catalogData
  } = props

  // console.log('req', req);
  return (
    <div className="photographers">
      <Head>
        <title>{catalogStats.metaData.title}</title>
      </Head>

      <h1 className="photographers__title">{catalogStats.metaData.h1}</h1>
      <p>linksTop</p>
      <p>filters</p>
      <PhotographersList catalogData={catalogData} />
      <p>pagination</p>
      <p>rating</p>
      <p>linksBottom</p>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const queryStr = `
      {
        catalogStats(
          type: POPULAR
          filter: {
            langId: null
            pageLangId: 7
            gp: null
            countryId: null
            userRole: PHOTOGRAPHER
            categoryId: 1
            currentPage: 0
        }) {
          catalogCount
          pageRating {
            avg
            count
          }
          pageRatingByUser {
            value
          }
          languages {
            id
            name
            count
          }
          nearestPlacesTop {
            id
            city: nameRu
            country: countryRu
            cityEn: nameEn
            countryEn
            path
          }
          nearestPlacesBottom {
            id
            city: nameRu
            country: countryRu
            cityEn: nameEn
            countryEn
            path
          }
          countsCurrentPlaceByCategory {
            cityId: googlePlaceId
            countryId
            categoryId
            countPhotographers
            countVideographers
            countTravelPhotographers
            countTravelVideographers
          }
          budget
          countPhotographersBudget
          countsCurrentCountryByCategory {
            cityId: googlePlaceId
            countryId
            categoryId
            countPhotographers
            countVideographers
            countTravelPhotographers
            countTravelVideographers
          }
          countsNearestPlacesBottom {
            cityId: googlePlaceId
            countryId
            categoryId
            countPhotographers
            countVideographers
          }
          countsPopularCountriesBottom {
            cityId: googlePlaceId
            countryId
            categoryId
            countPhotographers
            countVideographers
          }
          countsPopularPlacesBottom {
            cityId: googlePlaceId
            countryId
            categoryId
            countPhotographers
            countVideographers
          }
          popularPlacesTop {
            id
            city: nameRu
            country: countryRu
            cityEn: nameEn
            countryEn
            path
          }
          popularPlacesBottom {
            id
            city: nameRu
            country: countryRu
            cityEn: nameEn
            countryEn
            path
          }
          popularCountriesTop {
            id: countryId
            country: ru
            countryEn: slug
          }
          popularCountriesBottom {
            id: countryId
            country: ru
            countryEn: slug
          }
          seoTextData {
            text
            data
          }
          metaData {
            h1
            title
            backToCountry
          }
          payedPlaces {
            id
            name
            surname
            login
            paidTo
            userpicUrl
            mywedGooglePlace {
              city: nameRu
            }
            secondaryGooglePlace {
              city: nameRu
            }
          }
          country {
            id
            countryWordForms {
              createdAt
              updatedAt
              base
              firstForm
              secondForm
              language {
                id
                nameEn
              }
            }
          }
          mywedGooglePlace {
            id
            gpWordForms {
              createdAt
              updatedAt
              lang
              base
              firstForm
              secondForm
            }
          }
        }
        catalog(
          type: POPULAR
          filter: {
              langId: null
              pageLangId: 7
              gp: null
              countryId: null
              userRole: PHOTOGRAPHER
              categoryId: 1
          }
          paging: {
              pageNumber: 0
              pageSize: 30
          }
        ){
          id
          name
          surname
          userpicUrl
          mobileParse
          login
          proTo
          lastVisit
          hasPro
          isOnline
          userCategories {
            category {
              id
            }
            costServicesUsd
          }
          mywedGooglePlace {
            id
            countryRu
            nameRu
            lat
            lng
          }
          secondaryGooglePlace {
            id
          }
          catalogPhotos {
            googleUrl
            addDate
          }
          userLanguages {
            id
            about
            status
            language {
              id
            }
          }
          favoriteByCurrentUser
        }
      }`
  const response = await fetch('https://api.mywed.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Host': 'api.mywed.com',
      'Cookie': '_ym_uid=1590127062211189017; _ym_d=1590127062; _ga=GA1.2.380349839.1590127062; _fbp=fb.1.1590127063135.1860465467; current_currency=USD; retina=1; _gid=GA1.2.486542917.1596030844; whatiscountry=RU; current_screen_width=1440; current_screen_height=900; detectMobile=0; detectTablet=0; rememberMe=cGhvdG9saWFuOjE2MDg1NTEwMTQ6MWU5YzA2MDg2NmMyZTFhNGExNmUwNjJkZDUwYjU3ODA%3D; SESSID=rpl1kp7h9shmhv4s6qlrc1rt01; _gat=1; _ym_visorc_22909075=w; _ym_isad=2',
      'Origin': 'https://mywed.com',
      'Pragma': 'no-cache',
      'Referer': 'https://mywed.com/ru/photographers/'
    },
    body: JSON.stringify({query: queryStr})
  })
  const respJson = await response.json()
  console.log('req', ctx.req);

  // const req = JSON.stringify(ctx.req)
  return { props: {
      catalogStats: respJson.data.catalogStats,
      catalogData: respJson.data.catalog
    }
  }
}

export default Home
