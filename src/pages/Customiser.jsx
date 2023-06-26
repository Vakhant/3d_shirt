import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import config from '../config/config'
import state from '../store'
import { download } from '../assets'
import { downloadCanvasToImage, reader } from '../config/helpers'
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'
import { fadeAnimation, slideAnimation } from '../config/motion'
import ColorPicker from '../components/ColorPicker'
import FilePicker from '../components/FilePicker'
import Tab from '../components/Tab'
import CustomButton from '../components/CustomButton'


const Customiser = () => {
  const snap = useSnapshot(state);

  const [file, setfile] = useState('')
  const [prompt, setprompt] = useState('')
  const [generatingImg, setgeneratingImg] = useState(false)
  const [activeEditorTab, setactiveEditorTab] = useState('')
  const [activeFilterTab, setactiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  const generateTabContent = () => {
    console.log(activeEditorTab);
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker/>
      case "filepicker":
        return <FilePicker
          file={file}
          setFile={setfile}
          readFile={readFile}
        />
      default:
        return null
    }
  }
  
const handleSubmit = async (type) => {
  if(!prompt) return alert("Please enter a prompt")

  try{
    setgeneratingImg(true)

    const response = await fetch('http://localhost:8080/api/v1/dalle', 
      { 
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({prompt})
      }
    )

    const data = await response.json()

    handleDecals(type, `data:image/png;base64,${data.photo}`)
  } catch (error){
    alert(error)
  }finally{
    setgeneratingImg(false)
    setactiveEditorTab("")
  }
}

const handleDecals = (type, result) => {
  const decalType = DecalTypes[type]
  state[decalType.stateProperty] = result

  if(!activeFilterTab[decalType.filterTab]){
    handleActiveFilterTab(decalType.filterTab)
  }
}

const handleActiveFilterTab = (tabName) => {
  switch (tabName) {
    case "logoShirt":
      state.isLogoTexture = !activeFilterTab[tabName]
      break
    case "stylishShirt":
      state.isFullTexture = !activeFilterTab[tabName]
      break
    default:
      state.isLogoTexture = true
      state.isFullTexture = false
      break
  }
  setactiveFilterTab((prevState) => {
    return{
      ...prevState,
      [tabName]: !prevState[tabName]
    }
  })
}

const readFile = (type) => {
  reader(file).then((result)=>{
    handleDecals(type, result)
    setactiveEditorTab("")
  })
}

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
          key="custom"
          className='absolute top-0 left-0 z-10' {...slideAnimation('left')}>
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'>
                {EditorTabs.map((tab)=><Tab key={tab.name} tab={tab}  handleClick={()=>{setactiveEditorTab(tab.name === activeEditorTab ? "": tab.name)}}/>)}
            {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}>
            <CustomButton
              type='filled'
              title='Go Back'
              handleClick={() => state.intro=true}
              customStyles='w-fit px-4 py-2.5 font-bold text-sm'
            />
          </motion.div>
          <motion.div
          className='filtertabs-container'
          {...slideAnimation('up')}
          >
            {FilterTabs.map((tab)=>
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            )
            }
          </motion.div>

        </>
      )}
    </AnimatePresence>
  )
}

export default Customiser