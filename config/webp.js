import webp from 'vite-plugin-webp';
import {join} from "path";

const isBindWebp = process.env.TYPE === 'uat' || process.env.TYPE === 'production'

let publicScss = '@import "@/app/scss/common.scss";'

let webpPlugins = null;

if (isBindWebp) {
    webpPlugins = webp({
        onlyWebp: join(__dirname, '../src/assets/images'),
        imageType: ['.png', '.jpg']
    })
    publicScss += `@mixin bg($name,$format){
                      background-image: url('@Assets/images/'+$name+'.'+$format);
                      .webp & {
                            background-image: url('@Assets/images/'+$name+'.webp');
                      }
                  }`
} else {
    publicScss += `@mixin bg($name,$format){
                      background-image: url('@Assets/images/'+$name+'.'+$format);
    }`
}

export {
    publicScss,
    webpPlugins
}