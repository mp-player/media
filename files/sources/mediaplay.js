/*!
  Copyright (c) 2025 MP-Player (MediaPlay JS)
  Source (https://github.com/mp-player/media/blob/master/files/sources/mediaplay.js)
  Licensed under MIT (https://github.com/mp-player/media/blob/master/LICENSE)
*/

function MediaPlay(elementId, {streamFile}) {
  "use-strict";

  if (elementId) {
    const mediaPlayer = document.getElementById(elementId),
    mpVideo = `<video id="media-video" class="media-video" playisline crossorigin="anonymous"></video>`,
    mpLoader = `<div id="media-loader" class="media-loader"></div>`,
    mpWatermark = `<div class="watermark"></div>`,
    mpControls = `<div class="media-controls">
      <div class="media-controls-top">
        <span id="title" class="media-title"></span>
        <button id="current-quality" class="current-quality"></button>
        <div id="media-quality" class="container-quality hidden-menu">
          <label class="label-name">Quality</label>
          <div id="media-quality-list" class="quality-list"></div>
        </div>
        <button id="closed-caption" class="closed-caption">CC</button>
        <div id="media-closed-caption" class="container-closed-caption hidden-menu">
          <label class="label-name">Caption</label>
          <div id="media-caption-list" class="caption-list">
            <button id="none-caption" class="media-btn caption caption-active">Off</button>
          </div>
        </div>
        <button id="playback-speed" class="media-btn"><svg width="20px" height="20px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M9.60751 1.51737C10.3776 1.34229 11.1785 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C11.1785 22.75 10.3776 22.6577 9.60751 22.4826C9.2036 22.3908 8.95061 21.9889 9.04244 21.585C9.13427 21.1811 9.53614 20.9281 9.94005 21.02C10.6018 21.1704 11.2911 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75C11.2911 2.75 10.6018 2.8296 9.94005 2.98004C9.53614 3.07187 9.13427 2.81888 9.04244 2.41497C8.95061 2.01106 9.2036 1.60919 9.60751 1.51737Z"/><path d="M7.31372 3.13198C7.53443 3.4825 7.42919 3.94557 7.07868 4.16627C5.90349 4.90623 4.90623 5.90349 4.16627 7.07868C3.94556 7.42919 3.4825 7.53443 3.13198 7.31372C2.78146 7.09302 2.67623 6.62995 2.89693 6.27944C3.75646 4.91436 4.91436 3.75646 6.27943 2.89693C6.62995 2.67623 7.09302 2.78146 7.31372 3.13198Z"/><path d="M2.98004 9.94005C3.07187 9.53614 2.81888 9.13427 2.41497 9.04244C2.01106 8.95061 1.60919 9.2036 1.51737 9.60751C1.34229 10.3776 1.25 11.1785 1.25 12C1.25 12.8215 1.34229 13.6224 1.51737 14.3925C1.60919 14.7964 2.01106 15.0494 2.41497 14.9576C2.81888 14.8657 3.07187 14.4639 2.98004 14.06C2.8296 13.3982 2.75 12.7089 2.75 12C2.75 11.2911 2.8296 10.6018 2.98004 9.94005Z"/><path d="M3.13198 16.6863C3.4825 16.4656 3.94557 16.5708 4.16627 16.9213C4.90623 18.0965 5.90349 19.0938 7.07868 19.8337C7.42919 20.0544 7.53443 20.5175 7.31372 20.868C7.09302 21.2185 6.62995 21.3238 6.27944 21.1031C4.91436 20.2435 3.75646 19.0856 2.89693 17.7206C2.67623 17.37 2.78146 16.907 3.13198 16.6863Z"/><path d="M15.4137 10.941C16.1954 11.4026 16.1954 12.5974 15.4137 13.059L10.6935 15.8458C9.93371 16.2944 9 15.7105 9 14.7868V9.21316C9 8.28947 9.93371 7.70561 10.6935 8.15419L15.4137 10.941Z"/></svg></button>
        <div id="media-playback-speed" class="container-playback-speed hidden-menu">
          <label class="label-name">Speed</label>
          <div id="media-playback-speed-list" class="playback-speed-list">
            <button class="media-btn speed-level" data-speed="0.5">0.5x</button>
            <button class="media-btn speed-level" data-speed="0.5">0.7x</button>
            <button class="media-btn speed-level speed-level-active" data-speed="1.0">Normal</button>
            <button class="media-btn speed-level" data-speed="1.5">1.5x</button>
            <button class="media-btn speed-level" data-speed="2.0">2.0x</button>
          </div>
        </div>
      </div>
      <div class="media-controls-middle">
        <button id="backward" class="media-btn"><svg width="20px" height="20px" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M0 16q0 1.12 0.896 1.664l12 8q0.448 0.32 0.992 0.352t1.056-0.224q0.48-0.288 0.768-0.768t0.288-1.024v-16q0-0.544-0.288-1.024t-0.768-0.736-1.056-0.224-0.992 0.32l-12 8q-0.896 0.608-0.896 1.664zM16 16q0 1.12 0.896 1.664l12 8q0.448 0.32 0.992 0.352t1.056-0.224q0.48-0.288 0.768-0.768t0.288-1.024v-16q0-0.544-0.288-1.024t-0.768-0.736-1.056-0.224-0.992 0.32l-12 8q-0.896 0.608-0.896 1.664z"></path></svg></button>
        <button id="play" class="media-btn"><svg width="35px" height="35px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8.286 3.407A1.5 1.5 0 0 0 6 4.684v14.632a1.5 1.5 0 0 0 2.286 1.277l11.888-7.316a1.5 1.5 0 0 0 0-2.555L8.286 3.407z"/></svg></button>
        <button id="pause" class="media-btn hidden"><svg width="35px" height="35px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.163 3.819C5 4.139 5 4.559 5 5.4v13.2c0 .84 0 1.26.163 1.581a1.5 1.5 0 0 0 .656.655c.32.164.74.164 1.581.164h.2c.84 0 1.26 0 1.581-.163a1.5 1.5 0 0 0 .656-.656c.163-.32.163-.74.163-1.581V5.4c0-.84 0-1.26-.163-1.581a1.5 1.5 0 0 0-.656-.656C8.861 3 8.441 3 7.6 3h-.2c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.656.656zm9 0C14 4.139 14 4.559 14 5.4v13.2c0 .84 0 1.26.164 1.581a1.5 1.5 0 0 0 .655.655c.32.164.74.164 1.581.164h.2c.84 0 1.26 0 1.581-.163a1.5 1.5 0 0 0 .655-.656c.164-.32.164-.74.164-1.581V5.4c0-.84 0-1.26-.163-1.581a1.5 1.5 0 0 0-.656-.656C17.861 3 17.441 3 16.6 3h-.2c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.655.656z"/></svg></button>
        <button id="error" class="media-btn hidden"><svg width="35px" height="35px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.707 20.707a1 1 0 0 0 0-1.414l-16-16a1 1 0 0 0-1.414 1.414L6 8.414v10.902a1.5 1.5 0 0 0 2.286 1.277l6.124-3.769 3.883 3.883a1 1 0 0 0 1.414 0zm.467-7.43-2.262 1.392L6.674 3.432a1.488 1.488 0 0 1 1.612-.025l11.888 7.315a1.5 1.5 0 0 1 0 2.555z"/></svg></button>
        <button id="forward" class="media-btn"><svg width="20px" height="20px" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M0 24q0 0.544 0.288 1.056t0.768 0.736q0.48 0.256 1.056 0.224t0.992-0.32l12-8q0.896-0.608 0.896-1.696t-0.896-1.632l-12-8q-0.448-0.32-0.992-0.352t-1.056 0.224q-0.48 0.256-0.768 0.736t-0.288 1.024v16zM16 24q0 0.544 0.288 1.056t0.768 0.736q0.48 0.256 1.056 0.224t0.992-0.32l12-8q0.896-0.608 0.896-1.696t-0.896-1.632l-12-8q-0.448-0.32-0.992-0.352t-1.056 0.224q-0.48 0.256-0.768 0.736t-0.288 1.024v16z"></path></svg></button>
      </div>
      <div class="media-controls-bottom">
        <div class="media-controls-bottom-left">
          <button id="mute" class="media-btn"><svg width="22px" height="22px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.093 15H4.5A1.5 1.5 0 0 1 3 13.5v-3A1.5 1.5 0 0 1 4.5 9h2.593l5.181-5.469C12.896 2.875 14 3.315 14 4.22v15.562c0 .904-1.104 1.344-1.726.688L7.093 15zm12.978 4.07a1 1 0 1 1-1.414-1.413A7.97 7.97 0 0 0 21 12a7.97 7.97 0 0 0-2.343-5.656 1 1 0 1 1 1.415-1.415A9.97 9.97 0 0 1 23 12a9.97 9.97 0 0 1-2.929 7.07zm-3.673-3.269a1 1 0 0 0 1.4-.198A5.978 5.978 0 0 0 19 12a5.977 5.977 0 0 0-1.197-3.596 1 1 0 0 0-1.6 1.2c.515.686.797 1.518.797 2.396 0 .88-.284 1.714-.8 2.401a1 1 0 0 0 .198 1.4z"/></svg></button>
          <button id="unmute" class="media-btn hidden"><svg width="22px" height="22px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.707 20.707a1 1 0 0 0 0-1.414l-16-16a1 1 0 0 0-1.414 1.414L8.586 9H6.5A1.5 1.5 0 0 0 5 10.5v3A1.5 1.5 0 0 0 6.5 15h2.593l5.181 5.468c.622.657 1.726.217 1.726-.687v-3.367l4.293 4.293a1 1 0 0 0 1.414 0zM16 4.22v6.538l-4.402-4.401 2.676-2.825C14.896 2.875 16 3.315 16 4.22z"/></svg></button>
          <div class="media-volume-range">
            <input id="volume-slider" class="media-volume-slider" type="range" min="0" max="100" step="1" value="100">
            <progress id="volume-bar" class="media-volume-bar" min="0" max="100" value="100"></progress>
            <progress class="media-volume-linebar" value="0"></progress>
          </div>
        </div>
        <div class="media-controls-bottom-center">
          <span id="live-active" class="media-live hidden">LIVE</span>
          <span id="current-time" class="controls-time hide">00:00</span>
          <div id="timeline-range" class="media-timeline-range hide">
            <input id="timeline-slider" class="media-timeline-slider" type="range" min="0" max="100" value="0">
            <progress id="timeline-bar" class="media-timeline-bar" min="0" max="100" value="0"></progress>
            <progress id="buffer-bar" class="media-timeline-buffer" min="0" max="100" value="0"></progress>
          </div>
          <span id="duration-time" class="controls-time hide">00:00</span>
        </div>
        <div class="media-controls-bottom-right">
          <button id="fullscreen" class="media-btn"><svg width="22px" height="22px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18 4.654v.291a10 10 0 0 0-1.763 1.404l-2.944 2.944a1 1 0 0 0 1.414 1.414l2.933-2.932A9.995 9.995 0 0 0 19.05 6h.296l-.09.39A9.998 9.998 0 0 0 19 8.64v.857a1 1 0 1 0 2 0V4.503a1.5 1.5 0 0 0-1.5-1.5L14.5 3a1 1 0 1 0 0 2h.861a10 10 0 0 0 2.249-.256l.39-.09zM4.95 18a10 10 0 0 1 1.41-1.775l2.933-2.932a1 1 0 0 1 1.414 1.414l-2.944 2.944A9.998 9.998 0 0 1 6 19.055v.291l.39-.09A9.998 9.998 0 0 1 8.64 19H9.5a1 1 0 1 1 0 2l-5-.003a1.5 1.5 0 0 1-1.5-1.5V14.5a1 1 0 1 1 2 0v.861a10 10 0 0 1-.256 2.249l-.09.39h.295z"/></svg></button>
          <button id="fullscreen-exit" class="media-btn hidden"><svg width="22px" height="22px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.293 3.293a1 1 0 1 1 1.414 1.414l-2.944 2.944A10 10 0 0 1 16 9.055v.291l.39-.09A10 10 0 0 1 18.64 9h.861a1 1 0 1 1 0 2l-5-.003a1.5 1.5 0 0 1-1.5-1.5V4.5a1 1 0 1 1 2 0v.861c0 .757-.086 1.511-.256 2.249l-.09.39h.295a9.995 9.995 0 0 1 1.411-1.775l2.933-2.932zM8 14.653v.292c-.638.4-1.23.87-1.763 1.404l-2.944 2.944a1 1 0 1 0 1.414 1.414l2.933-2.932A10 10 0 0 0 9.05 16h.296l-.09.39A10 10 0 0 0 9 18.64v.861a1 1 0 1 0 2 0v-4.997a1.5 1.5 0 0 0-1.5-1.5L4.5 13a1 1 0 1 0 0 2h.861c.757 0 1.511-.086 2.249-.256l.39-.09z"/></svg></button>
        </div>
      </div>
    </div>`;
    mediaPlayer.classList.add("media-player");
    mediaPlayer.classList.add("media-screen");
    mediaPlayer.innerHTML = `
      ${mpVideo}
      ${mpLoader}
      ${mpWatermark}
      ${mpControls}
    `;

    const mediaVideo = document.querySelector("#media-video");
    const mediaLoader = document.querySelector("#media-loader");
    const watermark = document.querySelector(".watermark");
    const mediaControls = document.querySelector(".media-controls");
    const mediaControlsTop = document.querySelector(".media-controls-top");
    const mediaControlsMiddle = document.querySelector(".media-controls-middle");
    const mediaControlsBottom = document.querySelector(".media-controls-bottom");
    const mediaTitle = document.querySelector("#title");
    const currentQuality = document.querySelector("#current-quality");
    const containerQuality = document.querySelector("#media-quality");
    const mediaQualityList = document.querySelector("#media-quality-list");
    const closedCaption = document.querySelector("#closed-caption");
    const containerClosedCaption = document.querySelector("#media-closed-caption");
    const settingBtn = document.querySelector("#playback-speed");
    const containerPlaybackSpeed = document.querySelector("#media-playback-speed");
    const playBtn = document.querySelector("#play");
    const pauseBtn = document.querySelector("#pause");
    const errorBtn = document.querySelector("#error");
    const backwardBtn = document.querySelector("#backward");
    const forwardBtn = document.querySelector("#forward");
    const muteBtn = document.querySelector("#mute");
    const unmuteBtn = document.querySelector("#unmute");
    const volumeSlider = document.querySelector("#volume-slider");
    const volumeBar = document.querySelector("#volume-bar");
    const liveActive = document.querySelector("#live-active");
    const currentTime = document.querySelector("#current-time");
    const durationTime = document.querySelector("#duration-time");
    const timelineRange = document.querySelector("#timeline-range");
    const timelineSlider = document.querySelector("#timeline-slider");
    const timelineBar = document.querySelector("#timeline-bar");
    const bufferBar = document.querySelector("#buffer-bar");
    const fullscreenBtn = document.querySelector("#fullscreen");
    const fullscreenExitBtn = document.querySelector("#fullscreen-exit");

    function mediaDecoded(url) {
      if (url) {
        return decodeURIComponent(url);
      }
    }
    function dataObserver(data) {
      if (data) {
        var observer = "window";
        var dataChars = (str) => str.split("").map((c) => c.charCodeAt(0));
        var applyCode = (code) => dataChars(observer).reduce((a, b) => a ^ b, code);
        var byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
        return data.split("").map(dataChars).map(applyCode).map(byteHex).join("");
      }
    }
    function codeTaker(code) {
      if (code) {
        var observer = "window";
        var codeChars = (idx) => idx.split("").map((c) => c.charCodeAt(0));
        var applyData = (data) => codeChars(observer).reduce((a, b) => a ^ b, data);
        return code.match(/.{1,2}/g).map((hex) => parseInt(hex, 16)).map(applyData).map((charCode) => String.fromCharCode(charCode)).join("");
      }
    }
    function formatBandwidth(bytes, decimalPoint = 2) {
      if (bytes == 0) return "0 Bytes";
      var k = 1000,
      dm = decimalPoint,
      sizes = ["Bytes", "Kbps", "Mbps", "Gbps"],
      i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm))+" "+sizes[i];
    }
    function params(param, name) {
      for (let obj in param) {
        if (obj.indexOf(param)) {
          if (obj.toString().match(name)) {
            return true;
          }
        }
      }
    }
    HTMLElement.prototype.captionButton = ({CLOSED_CAPTION}) => {
      if (CLOSED_CAPTION === "hidden") {
        closedCaption.classList.add("hidden");
      }
    }
    HTMLElement.prototype.styleCaption = ({text}) => {
      var css = document.createElement("style");
      if (css.styleSheet) {
        css.styleSheet.cssText = `video::cue {
  font-size: "${text.fontSize}";
  font-weight: "${text.fontWeight}";
  color: "${text.color}";
  text-shadow: "${text.textShadow}";
  text-align: "${text.textAlign}";
  line-height: "${text.lineHeight}";
  background-color: "${text.backgroundColor}";
}`;
      } else {
        css.innerHTML = `video::cue {
  font-size: "${text.fontSize}";
  font-weight: "${text.fontWeight}";
  color: "${text.color}";
  text-shadow: "${text.textShadow}";
  text-align: "${text.textAlign}";
  line-height: "${text.lineHeight}";
  background-color: "${text.backgroundColor}";
}`;
      }
      var docHead = (document.head || document.getElementsByTagName("head")[0] || document.querySelector("head"));
      docHead.appendChild(css);
    }
    async function mediaHlsManifest(streamUrl, mime) {
      function replaceURL(manifest) {
        var i = manifest.toString();
        if (i.startsWith("https://") || i.startsWith("http://")) {
          return i;
        } else {
          var url = new URL(streamUrl);
          var pathname = url.pathname;
          if (i.includes("../../../../")) {
            pathname = pathname.split("/").slice(-5).join("/");
            url = url.toString().replace(pathname, i.replace("../../../../", ""));
          } else if (i.includes("../../../")) {
            pathname = pathname.split("/").slice(-4).join("/");
            url = url.toString().replace(pathname, i.replace("../../../", ""));
          } else if (i.includes("../../")) {
            pathname = pathname.split("/").slice(-3).join("/");
            url = url.toString().replace(pathname, i.replace("../../", ""));
          } else if (i.includes("../")) {
            pathname = pathname.split("/").slice(-2).join("/");
            url = url.toString().replace(pathname, i.replace("../", ""));
          } else {
            pathname = pathname.split("/").slice(-1).join("/");
            url = url.toString().replace(pathname, i);
          }
          return url;
        }
      }
      function dataVariant(data) {
        var child = mediaQualityList.lastElementChild;
        while (child) {
          mediaQualityList.removeChild(child);
          child = mediaQualityList.lastElementChild;
        }
        var resolution, codecs, framerate, bandwidth, manifest;
        var lines = data.split(/[\r\n]/);
        for (let i in lines) {
          var line = lines[i];
          if (line.startsWith("#EXT-X-STREAM-INF:")) {
            if (/RESOLUTION/.test(line)) {
              resolution = (line.match(/RESOLUTION=(.*?[^]),/g) || line.match(/RESOLUTION=(.*?[^]+)/g));
              if (resolution) {
                resolution = (resolution.toString().split("=")[1].split("x")[1].split(",")[0] || resolution.toString().split("=")[1].split("x")[1]);
              }
            } else {
              resolution = "undefined";
            }
            if (/CODECS/.test(line)) {
              codecs = (line.match(/CODECS="(.*?[^])",/g) || line.match(/CODECS="(.*?[^]+)"/g));
              if (codecs) {
                codecs = (codecs.toString().split('"')[1].split('"')[0]);
              }
            } else {
              codecs = "undefined";
            }
            if (/FRAME-RATE/.test(line)) {
              framerate = (line.match(/FRAME-RATE=(.*?[^]),/g) || line.match(/FRAME-RATE=(.*?[^]+)/g));
              if (framerate) {
                framerate = (framerate.toString().split("=")[1].split(",")[0] || framerate.toString().split("=")[1]);
              }
            } else {
              framerate = "undefined";
            }
            if (/BANDWIDTH/.test(line)) {
              bandwidth = (line.match(/BANDWIDTH=(.*?[^]),/g) || line.match(/BANDWIDTH=(.*?[^]+)/g));
              if (bandwidth) {
                bandwidth = (bandwidth.toString().split("=")[1].split(",")[0] || bandwidth.toString().split("=")[1]);
              }
            } else {
              bandwidth = "undefined";
            }
          } else if (line.endsWith(".m3u8") || line.match(".m3u8?")) {
            manifest = (line.match(/(.*?[^]).m3u8/gm) || line.match(/(.*?[^]).m3u8?(.*?[^]+)/gm));
            var button = document.createElement("button");
            button.innerHTML = `${resolution}p <small style="margin-left:10px;font-size:0.8em"><i>${formatBandwidth(bandwidth)}</i></small>`;
            button.setAttribute("class", "media-btn quality-level");
            button.setAttribute("data-resolution", dataObserver(resolution));
            button.setAttribute("data-codecs", dataObserver(codecs));
            button.setAttribute("data-manifest", dataObserver(replaceURL(manifest)));
            mediaQualityList.prepend(button);
          }
          if (line.startsWith("#EXT-X-MEDIA:")) {
            var subName, subLang, subUri, subType, subDefault;
            if (/NAME/.test(line)) {
              subName = (line.match(/NAME="(.*?[^])",/g) || line.match(/NAME="(.*?[^]+)"/g));
              if (subName) {
                subName = (subName.toString().split('"')[1].split('"')[0]);
              }
            } else {
              subName = "undefined";
            }
            if (/LANGUAGE/.test(line)) {
              subLang = (line.match(/LANGUAGE="(.*?[^])",/g) || line.match(/LANGUAGE="(.*?[^]+)"/g));
              if (subLang) {
                subLang = (subLang.toString().split('"')[1].split('"')[0]);
              }
            } else {
              subLang = "undefined";
            }
            if (/URI/.test(line)) {
              subUri = (line.match(/URI="(.*?[^])",/g) || line.match(/URI="(.*?[^]+)"/g));
              if (subUri) {
                subUri = (subUri.toString().split('"')[1].split('"')[0]);
              }
            } else {
              subUri = "undefined";
            }
            if (/TYPE/.test(line)) {
              subType = (line.match(/TYPE=(.*?[^]),/g) || line.match(/TYPE=(.*?[^]+)/g));
              if (subType) {
                subType = (subType.toString().split('=')[1].split(',')[0] || subType.toString().split('=')[1]);
              }
            } else {
              subType = "undefined";
            }
            if (/DEFAULT/.test(line)) {
              subDefault = (line.match(/DEFAULT=(.*?[^]),/g) || line.match(/TYPE=(.*?[^]+)/g));
              if (subDefault) {
                subDefault = (subDefault.toString().split('=')[1].split(',')[0] || subType.toString().split('=')[1]);
              }
            } else {
              subDefault = "undefined";
            }
            fetch(subUri, {method: "GET"})
            .then((response)=> response.text())
            .then((data)=> {
              if (data) {
                if (subUri.endsWith(".vtt")) {
                  var blob = new Blob([data.trimStart()], {type: "text/vtt"});
                  var uri = URL.createObjectURL(blob);
                  var track = document.createElement("track");
                  track.label = subName;
                  track.kind = subType.toLowerCase();
                  track.srcLang = subLang;
                  track.src = uri;
                  track.default = (subDefault === "YES") ? true : false;
                  mediaVideo.appendChild(track);
                  closedCaption.classList.remove("hidden");
                  var disableCaption = document.querySelector("#none-caption");
                  var mediaCaptionList = document.querySelector("#media-caption-list");
                  var btn = document.createElement("button");
                  btn.textContent = subName;
                  btn.setAttribute("class", "media-btn caption select");
                  btn.setAttribute("data-track-number", "0");
                  btn.setAttribute("data-text-cue", "true");
                  mediaCaptionList.appendChild(btn);
                  var captionList = document.querySelectorAll("#media-caption-list .select");
                  captionList.forEach((list)=> {
                    var textCue = list.getAttribute("data-text-cue");
                    if (textCue === "true") {
                      list.classList.add("caption-active");
                      disableCaption.classList.remove("caption-active");
                    } else if (textCue === "false") {
                      list.classList.remove("caption-active");
                    }
                    list.addEventListener("click", (e)=> {
                      e.preventDefault();
                      var trackNum = e.target.getAttribute("data-track-number");
                      trackNum = Number(trackNum);
                      [0,1,2,3,4].forEach((track)=> {
                        var tracks = mediaVideo.textTracks && mediaVideo.textTracks[track];
                        if (tracks) tracks.mode = "hidden";
                      });
                      setTimeout(()=> {
                        var thisTrack = mediaVideo.textTracks && mediaVideo.textTracks[trackNum];
                         if (thisTrack) thisTrack.mode = "showing";
                      }, 100);
                      disableCaption.classList.remove("caption-active");
                      captionList.forEach((all)=> {
                        all.classList.remove("caption-active");
                      });
                      list.classList.add("caption-active");
                    });
                  });
                  disableCaption.addEventListener("click", (e)=> {
                    e.preventDefault();
                    [0,1,2,3,4].forEach((track)=> {
                      var tracks = mediaVideo.textTracks && mediaVideo.textTracks[track];
                      if (tracks) tracks.mode = "hidden";
                    });
                    captionList.forEach((all)=> {
                      all.classList.remove("caption-active");
                    });
                    e.target.classList.add("caption-active");
                  });
                }
              }
            });
          }
        }
        var firstChild = mediaQualityList.firstElementChild;
        if (firstChild) {
          var reso = codeTaker(firstChild.getAttribute("data-resolution"));
          reso = Number(reso);
          if (reso > 144) {
            mediaQualityList.style.flexDirection = "column-reverse";
          } else {
            mediaQualityList.style.flexDirection = "column";
          }
        }
        var button = document.createElement("button");
        button.setAttribute("class", "media-btn quality-auto quality-level-active");
        button.setAttribute("id", "quality-auto");
        button.setAttribute("data-url", dataObserver(streamUrl));
        button.textContent = "Auto";
        mediaQualityList.appendChild(button);
        var qualityList = document.querySelectorAll("#media-quality-list .quality-level");
        var qualityAuto = document.querySelector("#quality-auto");
        qualityList.forEach((list)=> {
          if (list.textContent.match("undefined")) {
            list.style.display = "none";
          }
          list.addEventListener("click", (e)=> {
            e.preventDefault();
            mediaLoaded();
            mediaVideo.src = codeTaker(e.target.getAttribute("data-manifest"));
            var codecs = (!codeTaker(e.target.getAttribute("data-codecs")) === "undefined") ? `; codecs="${codeTaker(e.target.getAttribute("data-codecs"))}"` : "";
            mediaVideo.type = `${mime}${codecs}`;
            qualityAuto.classList.remove("quality-level-active");
            qualityAuto.classList.add("disable-auto");
            qualityList.forEach((all)=> {
              all.classList.remove("quality-level-active");
            });
            e.target.classList.add("quality-level-active");
          });
        });
        qualityAuto.addEventListener("click", (e)=> {
          e.preventDefault();
          mediaLoaded();
          mediaVideo.src = codeTaker(e.target.getAttribute("data-url"));
          mediaVideo.type = mime;
          qualityList.forEach((all)=> {
            all.classList.remove("quality-level-active");
          });
          e.target.classList.add("quality-level-active");
          e.target.classList.remove("disable-auto");
        });
        mediaVideo.addEventListener("resize", (e)=> {
          var videoHeight = e.target.videoHeight;
          if (videoHeight) {
            currentQuality.textContent = `${videoHeight}p`;
            qualityList.forEach((list)=> {
              var reso = codeTaker(list.getAttribute("data-resolution"));
              if (reso.match(videoHeight)) {
                qualityList.forEach((all)=> {
                  all.classList.remove("quality-level-active");
                });
                list.classList.add("quality-level-active");
                if (!qualityAuto.classList.contains("disable-auto")) {
                  qualityAuto.innerHTML = `Auto <small style="margin-left:15px;font-size:0.8em"><i>${currentQuality.textContent}</i></small>`;
                } else {
                  qualityAuto.innerHTML = "Auto";
                }
              }
            });
          }
        });
      }
      await fetch(streamUrl)
      .then((response)=> {
        if (!response.ok) {
          mediaLoader.classList.add("hidden");
          errorBtn.classList.remove("hidden");
          var errorUrl = streamUrl.replace(/\?token\=(.*?[^&]+)/g, "").replace(/\&token\=(.*?[^&]+)/g, "");
          console.error(`Error URL: (${errorUrl}) with status: ${response.status}`);
        }
        return response.text();
      }).then((data)=> {
        dataVariant(data);
      }).catch((err)=> {
        if (err.message === "Failed to fetch") {
          var errorUrl = streamUrl.replace(/\?token\=(.*?[^&]+)/g, "").replace(/\&token\=(.*?[^&]+)/g, "");
          console.error(`Cannot get data from URL: ("${errorUrl}")`);
        } else {
          console.error(err.message);
        }
      });
    }
    function loadStream(streamUrl) {
      if (streamUrl) {
        if (streamUrl.startsWith("https://") || streamUrl.startsWith("http://") || streamUrl.startsWith("file:///") || streamUrl.startsWith("/")) {
          var url = mediaDecoded(streamUrl);
          var format = url.toString();
          var mp4Codecs1 = 'video/mp4; codecs="avc1.42e01e, mp4a.40.2"';
          var mp4Codecs2 = 'video/mp4; codecs="avc1.42c00d", mp4a.40.2"';
          var webmCodecs = 'video/webm; codecs="vp8, opus"';
          if (format.match(".mp4")) {
            mediaVideo.src = url;
            if (mediaVideo.canPlayType("video/mp4")) {
              if (('MediaSource' in window) && MediaSource.isTypeSupported(mp4Codecs1)) {
                mediaVideo.type = mp4Codecs1;
              } else if (('MediaSource' in window) && MediaSource.isTypeSupported(mp4Codecs2)) {
                mediaVideo.type = mp4Codecs2;
              } else {
                mediaVideo.type = 'video/mp4';
              }
            }
          } else if (format.match(".webm")) {
            if (('MediaSource' in window) && MediaSource.isTypeSupported(webmCodecs)) {
              mediaVideo.type = webmCodecs;
            } else {
              mediaVideo.type = 'video/webm';
            }
          } else if (format.match(".mkv")) {
            mediaVideo.src = url;
            if (mediaVideo.canPlayType("video/x-matroska")) {
              mediaVideo.type = "video/x-matroska";
            } else {
              if (('MediaSource' in window) && MediaSource.isTypeSupported(webmCodecs)) {
                mediaVideo.type = webmCodecs;
              } else {
                mediaVideo.type = 'video/webm';
              }
            }
          } else if (format.match(".m3u8")) {
            mediaVideo.src = url;
            var mime;
            if (mediaVideo.canPlayType("application/vnd.apple.mpegurl")) {
              mime = "application/vnd.apple.mpegurl";
              mediaVideo.type = mime;
            } else if (mediaVideo.canPlayType("application/x-mpegURL")) {
              mime = "application/x-mpegURL";
              mediaVideo.type = mime;
            } else {
              if (('MediaSource' in window) && MediaSource.isTypeSupported(mp4Codecs1)) {
                mime = mp4Codecs1;
                mediaVideo.type = mime;
              } else if (('MediaSource' in window) && MediaSource.isTypeSupported(mp4Codecs2)) {
                mime = mp4Codecs2;
                mediaVideo.type = mime;
              } else {
                mime = 'video/mp4';
                mediaVideo.type = mime;
              }
            }
            mediaHlsManifest(url, mime, true);
          } else {
            mediaVideo.src = url;
            if (('MediaSource' in window) && MediaSource.isTypeSupported(mp4Codecs1)) {
              mediaVideo.type = mp4Codecs1;
            } else if (('MediaSource' in window) && MediaSource.isTypeSupported(mp4Codecs2)) {
              mediaVideo.type = mp4Codecs2;
            } else {
              mediaVideo.type = 'video/mp4';
            }
          }
        } else {
          forwardBtn.classList.add("hidden");
          backward.classList.add("hidden");
          setTimeout(()=> {
            mediaLoader.classList.add("hidden");
            playBtn.classList.add("hidden");
            errorBtn.classList.remove("hidden");
          }, 3000);
          console.error(`Media Error: Please add a valid 'URL' to play the video. \nstreamFile: {src: "${streamUrl}"}`);
        }
      } else {
        console.error(`Media Error: Please add a valid 'URL' to play the video. \nstreamFile: {src: "${streamUrl}"}`);
      }
    }

    if (streamFile) {
      var streamUrl = (streamFile.src !== "") ? streamFile.src : "undefined";
      loadStream(streamUrl);
      mediaVideo.autoplay = (streamFile.setMedia.autoplay) ? streamFile.setMedia.autoplay : false;
      mediaVideo.preload = (streamFile.setMedia.preload !== "") ? streamFile.setMedia.preload : "auto";
      mediaVideo.loop = (streamFile.setMedia.loop) ? streamFile.setMedia.loop : false;
      mediaVideo.poster = (streamFile.setMedia.poster !== "") ? streamFile.setMedia.poster : "../images/thumbnail-dark.jpg";
      if (streamFile.setMedia.autoplay === true) {
        function isSafari() {
          var chrome = window.navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
          var safari = window.navigator.userAgent.toLowerCase().indexOf("safari") > -1;
          return !chrome && safari;
        }
        var dom = window["Promise"] ? window["Promise"].toString() : "";
        if (dom.indexOf("function Promise()") !== -1 || dom.indexOf("function ZoneAwarePromise()") !== -1) {
          mediaVideo.play().catch((error)=> {
            if (error.name == "NotAllowedError") {
              /* chrome/firefox */
              mediaVideo.muted = true;
            } else if (error.name == "AbortError" && isSafari()) {
              /* safari */
              mediaVideo.muted = true;
            } else {
              mediaVideo.muted = false;
            }
          }).then(()=> {return});
        } else {
          mediaVideo.muted = false;
          console.error("[supportAutoplay]: Promise could not work in your browser ", media);
        }
      }
      if (streamFile.configs) {
        if (streamFile.configs.params) {
          var titles = streamFile.configs.params.titles;
          if (titles) {
            if (titles.name) {
              var titleName = (titles.name !== "") ? titles.name : "MediaPlay | MP-Player";
              mediaTitle.textContent = titleName;
              document.title = titleName;
            }
            if (titles.fonts) {
              if (titles.fonts.size) {
                mediaTitle.style.fontSize = (titles.fonts.size !== "") ? titles.fonts.size : "14px";
              }
              if (titles.fonts.weight) {
                mediaTitle.style.fontWeight = (titles.fonts.weight !== "") ? titles.fonts.weight : "400";
              }
              if (titles.fonts.color) {
                mediaTitle.style.color = (titles.fonts.color !== "") ? titles.fonts.color : "rgb(255,255,255)";
              }
            }
          }
          var captions = streamFile.configs.params.captions;
          var captions2 = streamFile.configs.params.captions2;
          var captions3 = streamFile.configs.params.captions3;
          var captions4 = streamFile.configs.params.captions4;
          var captions5 = streamFile.configs.params.captions5;
          function captionTracks(obj, num) {
            var srcFile, kindType, labelName, langCode, activeDefault, numOfTrack = num;
            if (params(obj, "src")) {
              srcFile = obj.src;
            } else {
              srcFile = "undefined";
              console.error('[paramCaptions]: There is something missing from the parameters (captions: {src: ""})');
            }
            if (params(obj, "kind")) {
              kindType = obj.kind;
            } else {
              kindType = "unknow";
              console.error('[paramCaptions]: There is something missing from the parameters (captions: {kind: ""})');
            }
            if (params(obj, "label")) {
              labelName = obj.label;
            } else {
              labelName = "unknow";
              console.error('[paramCaptions]: There is something missing from the parameters (captions: {label: ""})');
            }
            if (params(obj, "lang")) {
              langCode = obj.lang;
            } else {
              langCode = "unknow";
              console.error('[paramCaptions]: There is something missing from the parameters (captions: {lang: ""})');
            }
            if (params(obj, "active")) {
              activeDefault = obj.active;
            } else {
              activeDefault = false;
              console.error('[paramCaptions]: There is something missing from the parameters (captions: {active: ""})');
            }
            function srtTextCue(dataText) {
              var cue = "";
              var s = dataText.split(/\n/);
              while (s.length > 3) {
                for (var i = 3; i < s.length; i++) {
                  s[2] += "\n" + s[i]
                }
                s.splice(3, s.length - 3);
              }
              var line = 0;
              if (!s[0].match(/\d+:\d+:\d+/) && s[1].match(/\d+:\d+:\d+/)) {
                cue += s[0].match(/\w+/) + "\n";
                line += 1;
              }
              if (s[line].match(/\d+:\d+:\d+/)) {
                var m = s[1].match(/(\d+):(\d+):(\d+)(?:,(\d+))?\s*--?>\s*(\d+):(\d+):(\d+)(?:,(\d+))?/);
                if (m) {
                  cue += m[1]+":"+m[2]+":"+m[3]+"."+m[4]+" --> " +m[5]+":"+m[6]+":"+m[7]+"."+m[8]+"\n";
                  line += 1;
                } else {
                  return "";
                }
              } else {
                return "";
              }
              if (s[line]) {
                cue += s[line] + "\n\n";
              }
              return cue;
            }
            function convertSrt(dataText) {
              var srt = dataText.replace(/\r+/g, "");
              srt = srt.replace(/^\s+|\s+$/g, "");
              var cuelist = srt.split('\n\n');
              var result = "";
              if (cuelist.length > 0) {
                result += "WEBVTT\n\n";
                for (var i = 0; i < cuelist.length; i = i+1) {
                  result += srtTextCue(cuelist[i]);
                }
              }
              return result;
            }
            function addTrack(dataText, kind, label, lang, active, event) {
              var blob = new Blob([dataText.trimStart()], {type: "text/vtt"});
              var uri = URL.createObjectURL(blob);
              var track = document.createElement("track");
              track.src = (uri) ? uri : "undefined";
              track.kind = (kind) ? kind : "unknow";
              track.label = (label) ? label : "unknow";
              track.srclang = (lang) ? lang : "unknow";
              track.default = (active) ? active : false;
              mediaVideo.appendChild(track);
              document.addEventListener("DOMContentLoaded", event);
            }
            async function addCaption({src, kind, label, lang, active}, event) {
              if (src) {
                /* online */
                if (src.startsWith("https://") || src.startsWith("http://")) {
                  await fetch(src, {method: "GET"})
                 .then((response)=> response.text())
                 .then((data)=> {
                   if (src.endsWith(".vtt") || src.match(".vtt")) {
                     addTrack(data, kind, label, lang, active, event);
                   } else if (src.endsWith(".srt") || src.match(".srt")) {
                     addTrack(convertSrt(data), kind, label, lang, active, event);
                   }
                 });
               /* offline */
               } else {
                 var request = new XMLHttpRequest();
                 request.open("GET", src, true);
                 request.addEventListener("readystatechange", (e)=> {
                   if (e.target.readyState === 4)  {
                     if (e.target.status === 200 || e.target.status == 0) {
                      var data = e.target.responseText;
                      if (src.endsWith(".vtt") || src.match(".vtt")) {
                         addTrack(data, kind, label, lang, active, event);
                       } else if (src.endsWith(".srt") || src.match(".srt")) {
                         addTrack(convertSrt(data), kind, label, lang, active, event);
                       }
                     }
                   }
                 });
                 request.send(null);
                }
              }
            }
            function captionTrigger(label, number, active) {
              var disableCaption = document.querySelector("#none-caption");
              var mediaCaptionList = document.querySelector("#media-caption-list");
              var btn = document.createElement("button");
              btn.textContent = label;
              btn.setAttribute("class", "media-btn caption select");
              btn.setAttribute("data-track-number", number);
              btn.setAttribute("data-text-cue", active);
              mediaCaptionList.appendChild(btn);
              var allTracks = [0,1,2,3,4];
              var captionList = document.querySelectorAll("#media-caption-list .select");
              captionList.forEach((list)=> {
                var textCue = list.getAttribute("data-text-cue");
                if (textCue === "true") {
                  list.classList.add("caption-active");
                  disableCaption.classList.remove("caption-active");
                } else if (textCue === "false") {
                  list.classList.remove("caption-active");
                }
                list.addEventListener("click", (e)=> {
                  e.preventDefault();
                  allTracks.forEach((track)=> {
                    var tracks = mediaVideo.textTracks && mediaVideo.textTracks[track];
                    if (tracks) tracks.mode = "hidden";
                  });
                  setTimeout(()=> {
                    var trackNum = e.target.getAttribute("data-track-number");
                    trackNum = Number(trackNum);
                    var thisTrack = mediaVideo.textTracks && mediaVideo.textTracks[trackNum];
                    if (thisTrack) thisTrack.mode = "showing";
                  }, 100);
                  disableCaption.classList.remove("caption-active");
                  captionList.forEach((all)=> {
                    all.classList.remove("caption-active");
                  });
                  list.classList.add("caption-active");
                }, false);
              });
              disableCaption.addEventListener("click", (e)=> {
                e.preventDefault();
                allTracks.forEach((track)=> {
                  var tracks = mediaVideo.textTracks && mediaVideo.textTracks[track];
                  if (tracks) tracks.mode = "hidden";
                });
                captionList.forEach((all)=> {
                  all.classList.remove("caption-active");
                });
                e.target.classList.add("caption-active");
              }, false);
            }
            addCaption({
              src: srcFile,
              kind: kindType,
              label: labelName,
              lang: langCode,
              active: activeDefault
            }, captionTrigger(labelName, numOfTrack, activeDefault));
          }
          if (captions && !captions2 && !captions3 && !captions4 && !captions5) {
            captionTracks(captions.file, "0");
          } else if (captions && captions2 && !captions3 && !captions4 && !captions5) {
            captionTracks(captions.file, "1");
            captionTracks(captions2.file, "0");
          } else if (captions && captions2 && captions3 && !captions4 && !captions5) {
            captionTracks(captions.file, "2");
            captionTracks(captions2.file, "1");
            captionTracks(captions3.file, "0");
          } else if (captions && captions2 && captions3 && captions4 && !captions5) {
            captionTracks(captions.file, "3");
            captionTracks(captions2.file, "2");
            captionTracks(captions3.file, "1");
            captionTracks(captions4.file, "0");
          } else if (captions && captions2 && captions3 && captions4 && captions5) {
            captionTracks(captions.file, "4");
            captionTracks(captions2.file, "3");
            captionTracks(captions3.file, "2");
            captionTracks(captions4.file, "1");
            captionTracks(captions5.file, "0");
          }
          var waterMark = streamFile.configs.params.waterMark;
          var docTitle = document.querySelector("title");
          if (waterMark) {
            if (waterMark.type === "text") {
              var text = document.createElement("span");
              text.classList.add("watermark-text");
              text.textContent = waterMark.file;
              text.style.webkitOpacity = waterMark.transparent.opacity;
              text.style.mozOpacity = waterMark.transparent.opacity;
              text.style.opacity = waterMark.transparent.opacity;
              text.style.pointerEvents = "none";
              watermark.appendChild(text);
              document.title.textContent = waterMark.file;
            } else if (waterMark.type === "image") {
              var image = document.createElement("img");
              image.classList.add("watermark-image");
              image.src = waterMark.file;
              image.alt = "watermark";
              image.style.webkitOpacity = waterMark.transparent.opacity;
              image.style.mozOpacity = waterMark.transparent.opacity;
              image.style.opacity = waterMark.transparent.opacity;
              image.style.pointerEvents = "none";
              watermark.appendChild(image);
              function typeImg(t) {
                if (t.endsWith(".jpg")) return "image/jpg";
                else if (t.endsWith(".jpeg")) return "image/jpg";
                else if (t.endsWith(".png")) return "image/png";
                else if (t.endsWith(".webp")) return "image/webp";
              }
              var icons = `  <link rel="shortcut icon" href="${waterMark.file}" type="${typeImg(waterMark.file)}" size="any">
  <link rel="apple-touch-icon" href="${waterMark.file}">`;
              docTitle.insertAdjacentHTML("beforebegin", icons);
            }
          } else {
            var icons = `  <link rel="shortcut icon" href="../images/favicon.png" type="image/png" size="any">
  <link rel="apple-touch-icon" href="../images/favicon.png">`;
            docTitle.insertAdjacentHTML("beforebegin", icons);
          }
          var settings = streamFile.configs.params.playerSettings;
          if (settings) {
            if (settings.fitToScreen) {
              var set = (settings.fitToScreen) ? settings.fitToScreen : false;
              if (set === true) {
                mediaPlayer.classList.add("media-fit-to-screen");
                mediaPlayer.classList.remove("media-screen");
              } else if (set === false) {
                mediaPlayer.classList.add("media-screen");
                mediaPlayer.classList.remove("media-fit-to-screen");
              }
            }
            if (settings.accentColor) {
              if (settings.accentColor.length > 4) {
                var docElem = (document.documentElement || document.getElementsByTagName("html")[0] || document.querySelector(":root"));
                docElem.style.setProperty("--accent-color", settings.accentColor);
              }
            }
          }
        }
      }
    }

    mediaLoadFile(mediaVideo);

    mediaVideo.addEventListener("loadstart", ()=> {
      mediaLoaded();
    }, false);
    mediaVideo.addEventListener("loadedmetadata", (e)=> {
      mediaStream(e);
    }, false);
    mediaVideo.addEventListener("canplaythrough", (e)=> {
      mediaStart(e);
      mediaMuted();
      timelineChange();
      setVolume();
    }, false);
    mediaVideo.addEventListener("play", ()=> {
      isPlay();
    }, false);
    mediaVideo.addEventListener("playing", ()=> {
      mediaPlaying();
    }, false);
    mediaVideo.addEventListener("pause", ()=> {
      mediaPaused();
    }, false);
    mediaVideo.addEventListener("ended", ()=> {
      mediaTimeEnd();
    }, false);
    mediaVideo.addEventListener("waiting", ()=> {
      mediaBuffered();
    }, false);
    mediaVideo.addEventListener("error", ()=> {
      mediaError();
    }, false);
    mediaVideo.addEventListener("timeupdate", (e)=> {
      mediaStream(e);
      timeUpdate();
      timelineBuffer();
    }, false);
    mediaVideo.addEventListener("seeking", ()=> {
      timelineChange();
    }, false);
    mediaVideo.addEventListener("progress", ()=> {
      timelineBuffer();
    }, false);
    mediaVideo.addEventListener("volumechange", ()=> {
      mediaMuted();
    }, false);

    function mediaLoadFile(media) {
      media.load();
    }
    function mediaLoaded() {
      mediaLoader.classList.remove("hidden");
      playBtn.classList.add("hidden");
      pauseBtn.classList.add("hidden");
      errorBtn.classList.add("hidden");
      backwardBtn.classList.add("hidden");
      forwardBtn.classList.add("hidden");
      timelineRange.classList.add("hidden");
      currentTime.classList.add("hidden");
      durationTime.classList.add("hidden");
    }
    function mediaStream(e) {
      if (mediaVideo.readyState >= e.target.HAVE_FUTURE_DATA) {
        var duration = e.target.duration || mediaVideo.duration;
        var ms = duration.toString();
        if (duration == 00 || duration == NaN || ms.match("00:00") || ms.match("NaN:NaN") || ms.match("Infinity")) {
          backwardBtn.classList.add("hidden");
          forwardBtn.classList.add("hidden");
          timelineRange.classList.add("hidden");
          currentTime.classList.add("hidden");
          durationTime.classList.add("hidden");
          mediaLiveStream(true, mediaVideo.src);
        } else {
          mediaDuration();
          liveActive.classList.add("hidden");
          backwardBtn.classList.remove("hidden");
          forwardBtn.classList.remove("hidden");
          timelineRange.classList.remove("hidden");
          currentTime.classList.remove("hidden");
          durationTime.classList.remove("hidden");
          mediaLiveStream(false, mediaVideo.src);
        }
        if (mediaVideo.paused) {
          playBtn.classList.remove("hidden");
        }
      }
    }
    function mediaDuration() {
      let hours = Math.floor(mediaVideo.duration / 60 / 60 % 60);
      let minutes = Math.floor(mediaVideo.duration / 60 % 60);
      let seconds = Math.floor(mediaVideo.duration % 60);
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      if (hours == 00) {
        durationTime.textContent = `${minutes}:${seconds}`;
      } else {
        durationTime.textContent = `${hours}:${minutes}:${seconds}`;
      }
      return `${hours}:${minutes}:${seconds}`;
    }
    function timeUpdate() {
      let hours = Math.floor(mediaVideo.currentTime / 60 / 60 % 60);
      let minutes = Math.floor(mediaVideo.currentTime / 60 % 60);
      let seconds = Math.floor(mediaVideo.currentTime % 60);
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      var maxDuration = mediaDuration();
      if (maxDuration.startsWith("00:")) {
        currentTime.textContent = `${minutes}:${seconds}`;
      } else {
        currentTime.textContent = `${hours}:${minutes}:${seconds}`;
      }
      timelineSlider.value = (mediaVideo.currentTime / mediaVideo.duration) * 100;
      timelineBar.value = timelineSlider.value;
    }
    function timelineChange() {
      timelineSlider.addEventListener("input", (e)=> {
        var currentTime = mediaVideo.duration * (timelineSlider.value / 100);
        mediaVideo.currentTime = currentTime;
        timelineBar.value = e.target.value;
      });
    }
    function timelineBuffer() {
      if (mediaVideo && mediaVideo.buffered && mediaVideo.buffered.length > 0 && mediaVideo.buffered.end && mediaVideo.duration) {
        var buffered = mediaVideo.buffered.end(0);
        var duration = mediaVideo.duration;
        var percentage = (buffered / duration) * 100;
        bufferBar.value = percentage;
      }
    }
	function isPlay() {
      mediaLoader.classList.add("hidden");
    }
    function mediaStart(e) {
      if (mediaVideo.readyState >= e.target.HAVE_FUTURE_DATA) {
        isPlay();
        setTimeout(()=> {
          durationTime.classList.remove("hide");
          currentTime.classList.remove("hide");
          timelineRange.classList.remove("hide");
        }, 500);
      }
    }
    function mediaPlaying() {
      playBtn.classList.add("hidden");
      pauseBtn.classList.remove("hidden");
      errorBtn.classList.add("hidden");
    }
    function mediaPaused() {
      pauseBtn.classList.add("hidden");
      playBtn.classList.remove("hidden");
      mediaControls.classList.remove("hidden");
    }
    function mediaTimeEnd() {
      pauseBtn.classList.add("hidden");
      playBtn.classList.remove("hidden");
      mediaControls.classList.remove("hidden");
    }
    function mediaBuffered() {
      mediaLoader.classList.remove("hidden");
    }
    function mediaError() {
      mediaVideo.addEventListener("load", ()=> {
        mediaVideo.addEventListener("error", (error)=> {
          if (error) {
            backwardBtn.classList.add("hidden");
            forwardBtn.classList.add("hidden");
            playBtn.classList.add("hidden");
            pauseBtn.classList.add("hidden");
            errorBtn.classList.remove("hidden");
          }
        }, false);
      });
    }
    function mediaMuted() {
      if (mediaVideo.muted) {
        muteBtn.classList.add("hidden");
        unmuteBtn.classList.remove("hidden");
        volumeSlider.value = 0;
        volumeBar.value = 0;
      } else {
        muteBtn.classList.remove("hidden");
        unmuteBtn.classList.add("hidden");
        var setVolume = localStorage.getItem("set-volume");
        if (setVolume) {
          volumeSlider.value = setVolume;
          volumeBar.value = setVolume;
        } else {
          volumeSlider.value = 100;
          volumeBar.value = 100;
        }
      }
    }
    function setVolume() {
      var setVolume = localStorage.getItem("set-volume");
      if (setVolume) {
        volumeSlider.value = setVolume;
        volumeBar.value = setVolume;
      } else {
        volumeSlider.value = 100;
        volumeBar.value = 100;
      }
      if (mediaVideo.muted) {
        volumeSlider.value = 0;
        volumeBar.value = 0;
      }
      volumeSlider.addEventListener("input", (e)=> {
        if (mediaVideo.muted) {
          mediaVideo.muted = false;
          muteBtn.classList.remove("hidden");
          unmuteBtn.classList.add("hidden");
        }
        var currentVolume = e.target.value;
        var volume = currentVolume / 100;
        mediaVideo.volume = volume;
        volumeBar.value = currentVolume;
        localStorage.setItem("set-volume", currentVolume);
        if (mediaVideo.volume === 0) {
          mediaVideo.muted = true;
          muteBtn.classList.add("hidden");
          unmuteBtn.classList.remove("hidden");
        }
      });
    }
    function mediaLiveStream(live, media) {
      if (live === true) {
        liveActive.classList.remove("hidden");
      } else if (live === false) {
        liveActive.classList.add("hidden");
      }
      mediaVideo.addEventListener("load", ()=> {
        currentQuality.classList.add("hidden");
      });
      var url = new URL(media).pathname;
      if (url.endsWith(".m3u8")) {
        currentQuality.classList.remove("hidden");
        currentQuality.classList.remove("button-disabled");
        containerQuality.classList.remove("hidden");
      } else {
        mediaVideo.addEventListener("resize", (e)=> {
          var videoHeight = e.target.videoHeight;
          currentQuality.textContent = `${videoHeight}p`;
        }, false);
        currentQuality.classList.remove("hidden");
        currentQuality.classList.add("button-disabled");
        containerQuality.classList.add("hidden");
      }
    }

    mediaPlayer.addEventListener("contextmenu", (e)=> {
      e.preventDefault();
      e.stopPropagation();
    }, false);

    function showControls(e) {
      e.preventDefault();
      if (!watermark.contains(e.target)) {
        if (mediaControls.classList.contains("hidden")) {
          mediaControls.classList.remove("hidden");
        } else {
          if (!mediaControlsTop.contains(e.target) && !backwardBtn.contains(e.target) && !forwardBtn.contains(e.target) && !playBtn.contains(e.target) && !pauseBtn.contains(e.target) && !errorBtn.contains(e.target) && !mediaControlsBottom.contains(e.target)) {
            mediaControls.classList.add("hidden");
            containerQuality.classList.add("hidden-menu");
            containerClosedCaption.classList.add("hidden-menu");
            containerPlaybackSpeed.classList.add("hidden-menu");
          }
        }
      }
      if (!muteBtn.contains(e.target) && !unmuteBtn.contains(e.target)) {
        if (!mediaVideo.hasAttribute("media-volume")) {
          if (!mediaVideo.paused) {
            if (mediaVideo.muted) {
              mediaVideo.muted = false;
            }
          }
        }
      }
    }
    function hiddenControls() {
      if (!mediaControls.classList.contains("hidden")) {
        mediaControls.classList.add("hidden");
        containerQuality.classList.add("hidden-menu");
        containerClosedCaption.classList.add("hidden-menu");
        containerPlaybackSpeed.classList.add("hidden-menu");
      }
    }
    mediaPlayer.addEventListener("click", showControls);
    let mousedown = false;
    mediaPlayer.addEventListener("mousedown", ()=> (mousedown = true));
    mediaPlayer.addEventListener("mousemove", (e)=> mousedown && showControls(e));
    mediaPlayer.addEventListener("mouseup", ()=> (mousedown = false));
    mediaPlayer.addEventListener("mouseleave", hiddenControls);

    function inactivityTimeout() {
      let timer;
      var timeout = 5000;
      function resetTimer() {
        clearTimeout(timer);
        timer = setTimeout(()=> {
          if (!mediaVideo.paused) {
            if (!mediaControls.classList.contains("hidden")) {
              if (!containerQuality.classList.contains("hidden-menu") || !containerClosedCaption.classList.contains("hidden-menu") || !containerPlaybackSpeed.classList.contains("hidden-menu")) {
                mediaControls.classList.remove("hidden");
              } else {
                mediaControls.classList.add("hidden");
              }
            }
          }
        }, timeout);
      }
      window.addEventListener("load", resetTimer);
      mediaPlayer.addEventListener("click", resetTimer);
      mediaPlayer.addEventListener("mousemove", resetTimer);
      mediaPlayer.addEventListener("mousedown", resetTimer);
      mediaPlayer.addEventListener("keypress", resetTimer);
      mediaPlayer.addEventListener("scroll", resetTimer);
    }
    inactivityTimeout();

    /* quality video */
    currentQuality.addEventListener("click", (e)=> {
      e.preventDefault();
      if (containerQuality.classList.contains("hidden-menu")) {
        containerQuality.classList.remove("hidden-menu");
      } else {
        containerQuality.classList.add("hidden-menu");
      }
      containerPlaybackSpeed.classList.add("hidden-menu");
      containerClosedCaption.classList.add("hidden-menu");
    }, false);
    /* closed caption */
    closedCaption.addEventListener("click", (e)=> {
      e.preventDefault();
      if (containerClosedCaption.classList.contains("hidden-menu")) {
        containerClosedCaption.classList.remove("hidden-menu");
      } else {
        containerClosedCaption.classList.add("hidden-menu");
      }
      containerQuality.classList.add("hidden-menu");
      containerPlaybackSpeed.classList.add("hidden-menu");
    }, false);
    /* playback speed */
    settingBtn.addEventListener("click", (e)=> {
      e.preventDefault();
      if (containerPlaybackSpeed.classList.contains("hidden-menu")) {
        containerPlaybackSpeed.classList.remove("hidden-menu");
      } else {
        containerPlaybackSpeed.classList.add("hidden-menu");
      }
      containerQuality.classList.add("hidden-menu");
      containerClosedCaption.classList.add("hidden-menu");
    }, false);
    var playbackSpeedList = document.querySelectorAll("#media-playback-speed-list .speed-level");
    playbackSpeedList.forEach((list)=> {
      list.addEventListener("click", (e)=> {
        e.preventDefault();
        var speed = e.target.getAttribute("data-speed");
        mediaVideo.playbackRate = Number(speed);
        playbackSpeedList.forEach((all)=> {
          all.classList.remove("speed-level-active");
        });
        e.target.classList.add("speed-level-active");
      }, false);
    });
    /* play */
    playBtn.addEventListener("click", (e)=> {
      e.preventDefault();
      mediaVideo.play();
      if (!mediaVideo.src) {
        setTimeout(()=> {
          mediaLoader.classList.add("hidden");
        }, 3000);
      }
    }, false);
    /* pause */
    pauseBtn.addEventListener("click", (e)=> {
      e.preventDefault();
      mediaVideo.pause();
    }, false);
    /* backward */
    backwardBtn.addEventListener("click", (e)=> {
      e.preventDefault();
      liveActive.style.display = "none";
      e.target.classList.add("skip-left");
      mediaVideo.currentTime = mediaVideo.currentTime -= 10;
      timelineSlider.value = (mediaVideo.currentTime / mediaVideo.duration) * 100;
      timelineBar.value = timelineSlider.value;
      setTimeout(()=> {
        e.target.classList.remove("skip-left");
      }, 1000);
    }, false);
    /* forward */
    forwardBtn.addEventListener("click", (e)=> {
      e.preventDefault();
      liveActive.style.display = "none";
      e.target.classList.add("skip-right");
      mediaVideo.currentTime = mediaVideo.currentTime += 10;
      timelineSlider.value = (mediaVideo.currentTime / mediaVideo.duration) * 100;
      timelineBar.value = timelineSlider.value;
      setTimeout(()=> {
        e.target.classList.remove("skip-right");
      }, 1000);
    }, false);
    /* mute */
    muteBtn.addEventListener("click", (e)=> {
      e.preventDefault();
      mediaVideo.muted = true;
      mediaVideo.setAttribute("media-volume", "off");
    }, false);
    /* unmute */
    unmuteBtn.addEventListener("click", (e)=> {
      e.preventDefault();
      mediaVideo.muted = false;
      mediaVideo.removeAttribute("media-volume");
    }, false);
    /* fullscreen */
    fullscreenBtn.addEventListener("click", (e)=> {
      e.preventDefault();
      e.target.classList.add("hidden");
      fullscreenExitBtn.classList.remove("hidden");
      if (!mediaPlayer.classList.contains("media-fit-to-screen")) {
        mediaPlayer.classList.remove("media-screen");
      }
      mediaPlayer.classList.add("media-screen-expand");
      if (document.fullscreenEnabled || document.mozFullscreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled) {
        if (mediaPlayer.requestFullscreen) { 
          mediaPlayer.requestFullscreen();
        } else if (mediaPlayer.webkitRequestFullscreen) { 
          mediaPlayer.webkitRequestFullscreen();
        } else if (mediaPlayer.mozRequestFullScreen) { 
          mediaPlayer.mozRequestFullScreen();
        } else if (mediaPlayer.msRequestFullscreen) { 
          mediaPlayer.msRequestFullscreen();
        }
      }
    }, false);
    /* fullscreen exit */
    fullscreenExitBtn.addEventListener("click", (e)=> {
      e.preventDefault();
      e.target.classList.add("hidden");
      fullscreenBtn.classList.remove("hidden");
      mediaPlayer.classList.remove("media-screen-expand");
      if (!mediaPlayer.classList.contains("media-fit-to-screen")) {
        mediaPlayer.classList.add("media-screen");
      }
      if (document.fullscreenElement || document.mozFullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    }, false);
    /* (live) button */
    liveActive.addEventListener("click", (e)=> {
      e.preventDefault();
      mediaLoaded();
      var qualityAuto = document.querySelector("#quality-auto");
      mediaVideo.src = codeTaker(qualityAuto.getAttribute("data-url"));
    }, false);
    return mediaVideo;
  }
}
/* embed player (request params) */
function searchParams(variable) {
  var query = self.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }
}
function requestURL(url) {
  if (url !== "") {
    return searchParams("url");
  }
}
function requestName(name) {
  if (name !== "") {
    var title = searchParams("name");
    if (title) {
      return title;
    } else {
      return "MP-Player";
    }
  }
}
/* userAgent */
function updateUA(ua) {
  Object.defineProperty(navigator, "userAgent", {
    get: function() {
      return ua;
    }
  });
}
var userAgent = navigator.userAgent;
if (/Android/i.test(userAgent)) {// Android
  updateUA("Mozilla/5.0 (Linux; Android 15; rv:133.0) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Gecko/133.0 Chrome/131.0.6778.81 Firefox/133.0 Mobile Safari/537.36 EdgA/131.0.2903.68 OPR/76.2.4027.73374 XiaoMi/MiuiBrowser/18.4.410719 YaBrowser/24.10.6.33 UCBrowser/13.7.8.1322");
} else if (/iPhone/i.test(userAgent)) {// iPhone
  updateUA("Mozilla/5.0 (iPhone; CPU iPhone OS 17_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/131.0.6778.73 FxiOS/133.0 Mobile/15E148 Safari/604.1 EdgiOS/131.2903.77 Version/17.4.1 YaBrowser/24.12.1.391");
} else if (/iPad/i.test(userAgent)) {// iPad
  updateUA("Mozilla/5.0 (iPad; CPU OS 17_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/131.0.6778.73 FxiOS/133.0 Mobile/15E148 Safari/604.1 Version/17.4.1 YaBrowser/24.12.1.391");
} else if (/Windows/i.test(userAgent)) {// Windows
  updateUA("Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; Win64; x64; rv:133.0) AppleWebKit/537.36 (KHTML, like Gecko) Gecko/20100101 Chrome/131.0.0.0 Firefox/133.0 Safari/537.36 Edg/131.0.2903.70 OPR/115.0.0.0 Vivaldi/7.0.3495.20 YaBrowser/24.10.1.686 Yowser/2.5");
} else if (/Macintosh/i.test(userAgent)) {// MacOS
  updateUA("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7; rv:133.0) AppleWebKit/537.36 (KHTML, like Gecko) Gecko/20100101 Chrome/131.0.0.0 Firefox/133.0 Safari/537.36 Edg/131.0.2903.70 OPR/115.0.0.0 Vivaldi/7.0.3495.20 YaBrowser/24.10.1.686 Yowser/2.5");
}
