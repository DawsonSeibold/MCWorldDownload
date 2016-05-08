/**
 *
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
var showHelp = true
$(function() {
        checkHelpThing();
});

function checkHelpThing() {
        ocument.cookie = "menuOpen=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        var cookie = document.cookie;
         if (cookie.indexOf("downloaded") > -1)  {
                 myCookie = false
                 $('#helpLI').css('display', 'none');
        }else {
                 myCookie = true
        }
}

class SideNav {
  constructor () {
    this.showButtonEl = document.querySelector('.js-menu-show');
    this.hideButtonEl = document.querySelector('.js-menu-hide');
    this.sideNavEl = document.querySelector('.js-side-nav');
    this.sideNavContainerEl = document.querySelector('.js-side-nav-container');

    //download buttons
    this.one = document.querySelector('#one');
    this.two = document.querySelector('#two');
    this.three = document.querySelector('#three');

    this.showSideNav = this.showSideNav.bind(this);
    this.hideSideNav = this.hideSideNav.bind(this);
    this.blockClicks = this.blockClicks.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.update = this.update.bind(this);

    this.startX = 0;
    this.currentX = 0;
    this.touchingSideNav = false;

    this.addEventListeners();
  }

  addEventListeners () {
    this.showButtonEl.addEventListener('click', this.showSideNav);
    this.hideButtonEl.addEventListener('click', this.hideSideNav);
    this.sideNavEl.addEventListener('click', this.hideSideNav);
    this.sideNavContainerEl.addEventListener('click', this.blockClicks);

    //Download buttons
    this.one.addEventListener('click', this.downloadOne);
    this.two.addEventListener('click', this.downloadTwo);
    this.three.addEventListener('click', this.downloadThree);

    document.addEventListener('touchstart', this.onTouchStart);
    document.addEventListener('touchmove', this.onTouchMove);
    document.addEventListener('touchend', this.onTouchEnd);
  }

  downloadOne() {
          window.location = 'http://www.minecraftworldmap.com/user/33948/world5.zip'
          //document.cookie = "help=downloaded";
           $('#helpLI').css('display', 'none');
         // console.log("Download One");
  }downloadTwo(){
          window.location = 'http://www.minecraftworldmap.com/user/33948/world4.zip'
          //document.cookie = "help=downloaded";
           $('#helpLI').css('display', 'none');
         // console.log("Download Two");
  }downloadThree() {
          window.location = 'http://www.minecraftworldmap.com/user/33948/world2.zip'
         // document.cookie = "help=downloaded";
           $('#helpLI').css('display', 'none');
          //console.log('Download Three');
  }

  onTouchStart (evt) {
    if (!this.sideNavEl.classList.contains('side-nav--visible'))
      return;

    this.startX = evt.touches[0].pageX;
    this.currentX = this.startX;

    this.touchingSideNav = true;
    requestAnimationFrame(this.update);
  }

  onTouchMove (evt) {
    this.currentX = evt.touches[0].pageX;
    const translateX = Math.min(0, this.currentX - this.startX);

    if (translateX < 0) {
      evt.preventDefault();
    }
  }

  onTouchEnd (evt) {
    this.touchingSideNav = false;

    const translateX = Math.min(0, this.currentX - this.startX);
    this.sideNavContainerEl.style.transform = '';

    if (translateX < 0) {
      this.hideSideNav();
    }
  }

  update () {
    if (!this.sideNavEl.classList.contains('side-nav--visible'))
      return;

    if (this.touchingSideNav)
      requestAnimationFrame(this.update);

    const translateX = Math.min(0, this.currentX - this.startX);
    this.sideNavContainerEl.style.transform = `translateX(${translateX}px)`;
  }

  blockClicks (evt) {
    evt.stopPropagation();
  }

  onTransitionEnd (evt) {
    this.sideNavEl.classList.remove('side-nav--animatable');
    this.sideNavEl.removeEventListener('transitionend', this.onTransitionEnd);
  }

  showSideNav () {
          if (showHelp == false) {
                  $('#helpLI').css('display', 'none');
          }
    this.sideNavEl.classList.add('side-nav--animatable');
    this.sideNavEl.classList.add('side-nav--visible');
    this.sideNavEl.addEventListener('transitionend', this.onTransitionEnd);
    var offset = $("#scrollArea").offset();
    var scrollTop = $(window).scrollTop();
    var top = (offset.top - scrollTop);
    //console.log('Top:' + top);
    //console.log('left:' + offset.left);
    $('#scrollArea').css('position', 'fixed');
    //$('#scrollArea').transform `translateY(30px)`;
     //$('#scrollArea').css('top', (top + 30));
    $('#scrollArea').css('left', offset.left);
    checkHelpThing();
  }

  hideSideNav () {
    this.sideNavEl.classList.add('side-nav--animatable');
    this.sideNavEl.classList.remove('side-nav--visible');
    this.sideNavEl.addEventListener('transitionend', this.onTransitionEnd);
    $('#scrollArea').css('position', 'absolute');
    //$('#scrollArea').css('top', 'auto');
  }
}

new SideNav();
