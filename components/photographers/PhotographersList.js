import PhotographersListItem from "./PhotographersListItem";

const PhotographersList = ({ catalogData }) => {

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
      {/*<pre>{JSON.stringify(catalogData, null, 2)}</pre>*/}
    </div>
  )
}

export default PhotographersList