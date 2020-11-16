//polyfill
// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';
import "@babel/polyfill";

window.$ = window.jQuery = jQuery;
// Vue.prototype.window = window;

const lightboxOpen = function(which){
  $('body').addClass('lb-open');
  $(which).css({display: 'flex'});
}

const lightboxClear = function(){
  $('.lightbox').hide();
  $('body').removeClass('lb-open');
}

const bgm = {
  play(){
    if( window.self !== window.top ){
      $('audio#bgm', window.parent.document)[0].play();
      $('.btn-audio').removeClass('on off').addClass('on');
    }
  },
  pause(){
    if( window.self !== window.top ){
      $('audio#bgm', window.parent.document)[0].pause();
      $('.btn-audio').removeClass('on off').addClass('off');
    }
  },
  toggle(){
    if( window.self !== window.top ){
      if( $('audio#bgm', window.parent.document)[0].paused ){
        this.play()
      }else{
        this.pause()
      }
    }
  }
}

window.lightboxOpen = lightboxOpen;
window.lightboxClear = lightboxClear;
window.bgm = bgm;

$(document).ready(function(){

  if( window.self !== window.top && $('audio#bgm', window.parent.document)[0].paused ){
    $('.btn-audio').removeClass('on off').addClass('off')
  }else{
    $('.btn-audio').removeClass('on off').addClass('on')
  }

})