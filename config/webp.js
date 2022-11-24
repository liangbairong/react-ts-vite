import webp from 'vite-plugin-webp';
import { join } from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const fs = require('fs');

// eslint-disable-next-line no-undef
const isBindWebp = process.env.TYPE === 'uat' || process.env.TYPE === 'production';

const version = Date.now();

let publicScss = '@import "@/app/scss/common.scss";';

let webpPlugins = null;

if (isBindWebp) {
    // eslint-disable-next-line no-undef
    const fd = fs.openSync(join(__dirname, '../src/.env'), 'w');
    fs.writeFileSync(fd, 'VITE_VERSION=' + version, 'utf8');
    fs.closeSync(fd);
    webpPlugins = webp({
        // eslint-disable-next-line no-undef
        onlyWebp: join(__dirname, '../src/public/images'),
        imageType: ['.png', '.jpg'],
    });
    publicScss += `@mixin bg($name,$format){
                      background-image: url('/images/'+$name+'.'+$format+'?v=t${version}');
                      .webp & {
                            background-image: url('/images/'+$name+'.webp?v=t${version}');
                      }
                  }`;
    publicScss += `@mixin bg2($name1,$name2,$format){
                      background-image: url('/images/'+$name1+'.'+$format+'?v=t${version}'),$name2;
                      .webp & {
                            background-image: url('/images/'+$name1+'.webp?v=t${version}'),$name2;
                      }
                  }`;
} else {
    publicScss += `@mixin bg($name,$format){
                      background-image: url('/images/'+$name+'.'+$format+'?v=t${version}');
    }`;
    publicScss += `@mixin bg2($name1,$name2,$format){
                      background-image: url('/images/'+$name1+'.'+$format+'?v=t${version}'), $name2;
    }`;
}

export { publicScss, webpPlugins };
