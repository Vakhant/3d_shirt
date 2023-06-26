import { proxy } from 'valtio'

const state = proxy({
    intro: true,
    color: '#EFBD48',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: import.meta.env.BASE_URL+'/threejs.png',
    fullDecal: import.meta.env.BASE_URL+'/threejs.png',
});

export default state;