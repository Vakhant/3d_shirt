import { useSnapshot } from "valtio"
import state from "../store"

const Tab = ({tab, isFilterTab, isActiveTab, handleClick}) => {
  const snap = useSnapshot(state)
  const activeStyle = isFilterTab && isActiveTab
    ? {background: snap.color, opacity: .5}
    : {background: "transparent", opacity: 1}

  return (
    <div
      key={tab.name}
      className={`tab-btn ${isFilterTab ? 'rounded-full glassmorhism':'rounded-4'}`}
      onClick={handleClick}
      style={activeStyle}
    >
      <img className={`${isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12 object-contain'}`} src={tab.icon} alt="" />
    </div>
  )
}

export default Tab