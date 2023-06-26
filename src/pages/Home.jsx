import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'
import CustomButton from '../components/CustomButton'
import { headContainerAnimation, headContentAnimation, headTextAnimation, slideAnimation } from '../config/motion'
import state from '../store'

const Home = () => {
    const snap = useSnapshot(state);

    return (
        <AnimatePresence>
            {snap.intro && (
                <motion.section className='home' {...slideAnimation('left')}>
                    <motion.header {...slideAnimation('down')}>
                        <img className='w-8 h-8 object-contain' src="./threejs.png" alt="logo" />
                    </motion.header>
                    <motion.div className='home-content' {...headContainerAnimation}>
                        <motion.div {...headTextAnimation}>
                            <h1 className='head-text'>LET'S <br className='xl:block hidden'/> DO IT.</h1>
                        </motion.div>
                        <motion.div className='flex flex-col gap-5' {...headTextAnimation}>
                            
                            <p className='max-w-md font-normal text-gray-600 text-base'>
                                Create your own unique and exclusive shirt with our brand-new 3d customisation tool.
                                <strong> Unleashe your imagination </strong>
                                and define your own style.
                            </p>
                        <CustomButton
                            type="filled"
                            title="Customise It"
                            handleClick={()=> state.intro = false}
                            customStyles='w-fit px-4 py2.5 font-bold text-sm'
                        />
                        </motion.div>
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    )
}

export default Home