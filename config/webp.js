import webp from 'vite-plugin-webp';
import {join} from "path";

const isBindWebp = process.env.TYPE === 'uat' || process.env.TYPE === 'production'
const v=Date.now()
let publicScss = '@import "@/app/scss/common.scss";'

let webpPlugins = null;

if (isBindWebp) {
    webpPlugins = webp({
        onlyWebp: join(__dirname, '../src/public/images'),
        imageType: ['.png', '.jpg']
    })
    publicScss += `@mixin bg($name,$format){
                      background-image: url('/images/'+$name+'.'+$format+'?v=t${v}');
                      .webp & {
                            background-image: url('/images/'+$name+'.webp');
                      }
                  }`
} else {
    publicScss += `@mixin bg($name,$format){
                      background-image: url('/images/'+$name+'.'+$format+'?v=t${v}');
    }`
}

export {
    publicScss,
    webpPlugins
}