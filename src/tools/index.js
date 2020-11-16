export function shareFb(url) {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url));
}
export function shareLine(url, title) {
    window.open('http://line.naver.jp/R/msg/text/?' + title + '%0D%0A' + url);
}
export function shareLinkedin(url) {
    window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + url);
}
export function shareGoogle(url) {
    window.open('https://plus.google.com/share?url=' + url);
}

//簡單翻譯
export function __s(key, textFields){
    if( key in textFields){
      try {
        return textFields[key].$(body).data('lang');
      } catch (error) {

        return textFields[key].zh;
      }
    }

    //範例
    // var textFields = {
    //     '滿 [s1] 包即可加購禮盒，數量：': {
    //         'zh': `滿 ${state.giftBoxSize} 包即可加購禮盒，數量：`,
    //         'en': `You can purchase additional gift boxes for ${state.giftBoxSize} packs, quantity: `,
    //     },
    //     '加購': {
    //         'zh': '加購',
    //         'en': 'Purchase',
    //     },
    // }
    //in React or Vue
    //{__s('滿 [s1] 包即可加購禮盒，數量：', textFields)}
}

//產生隨機數
export function rand(min, max){
    return Math.floor( Math.random() * (max - min + 1) ) + min;
}

//創建陣列(可調增幅)
export function arrayGenerate(start, end, step=1){
    return Array.from(Array.from(Array(Math.ceil((end+1-start)/step)).keys()), x => start+ x*step);
}

//打亂陣列
export function arrayShuffle(a){
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

//產生一組不重複隨機數，需要打亂陣列和創建陣列
export function  arrayRandom ({min=0, max=2, length=2, step=1} = {min:0, max:2, length:2, step:1}){
    let arry = this.arrayGenerate(min, max, step);
    this.arrayShuffle(arry);
    return arry.slice(0, length);
}

//array chunk
export function arrayChunk(myArray, chunk_size){
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
        let myChunk = myArray.slice(index, index+chunk_size);
        // Do something if you want with the group
        tempArray.push(myChunk);
    }

    return tempArray;
}

//取得小數點位數
export function getDecimalPlace(num){
    if( num!==undefined && !isNaN(num) ){
        var sep = String(23.32).match(/\D/)[0];
        var b = String(num).split(sep);
        return b[1]? b[1].length : 0;
    }
}

//滾動到特定 el
export function scrollToSection({el, speed=800, offset=0, callback=function(){}}){

    if( $(el).length>0 ){
        $('html, body').animate({
            scrollTop: $(el).offset().top-Number($('body').css('padding-top').split('px')[0])+offset
        }, speed, function(){
            callback();
        });
    }
}

//取得 el 在螢幕上的％數
export function getItemPositionInViewport({el, based='top'}){
    if( $(el).length>0 ){
        switch(based){
            case 'top':
            return Math.round(($(el).offset().top-$(window).scrollTop()) * 100 / $(window).height())

            case 'bottom':
                let el_bottom_position = $(el).offset().top - $(el).outerHeight();
            return  Math.round(100*(el_bottom_position-$window.scrollTop())/($(window).height()+$(el).outerHeight()))
        }
    }
}

export function hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = x => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function isEmpty( value ){
    return  value === undefined || value === null || ( typeof value === 'object' && Object.keys( value ).length === 0 ) || ( typeof value === 'string' && value.trim().length === 0 );

        // // test results
        // //---------------
        // // []        true, empty array
        // // {}        true, empty object
        // // null      true
        // // undefined true
        // // ""        true, empty string
        // // ''        true, empty string
        // // 0         false, number
        // // true      false, boolean
        // // false     false, boolean
        // // Date      false
        // // function  false

        // if (value === undefined){
        //     return true
        // }
        // if (typeof (value) == 'function' || typeof (value) == 'number' || typeof (value) == 'boolean' || Object.prototype.toString.call(value) === '[object Date]'){
        //     return false
        // }
        // if (value == null || value.length === 0){
        //     return true
        // }
        // if (typeof (value) == "object") {
        //     // empty object
        //     var r = true;
        //     for (var f in value){
        //         r = false;
        //     }
        //     return r;
        // }
        // return false;
}

//補 0
export function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;

    //how to use
    // pad(10, 4);      // 0010
    // pad(9, 4);       // 0009
    // pad(123, 4);     // 0123
    // pad(10, 4, '-'); // --10
}

export function isIE(){
    if( window.document.documentMode ){
        return true
    }else{
        return false
    }
}