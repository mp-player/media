[![Download File](https://img.shields.io/badge/Download%20File-ZIP-orange.svg)](https://codeload.github.com/mp-player/media/zip/refs/heads/master)

[![Testing Player](https://img.shields.io/badge/Testing%20Player-MediaPlay-blue.svg)](https://mp-player.github.io/media)

<br>

<div align="center"><h2>MP-Player (MediaPlay)</h2></div>

<br><br>

### HTML5 Player

This player can be played anywhere that can load <strong>HTML</strong> to play videos directly from <strong>MP-Player</strong> and this player also supports <strong>MP4</strong>, <strong>MKV</strong>, <strong>WEBM</strong> and <strong>M3U8</strong> formats. `(VOD/LIVE)`

<br>
<hr>
<br>

## Guide and Usage

**Table of Contents**

+ *[Create Player](https://github.com/mp-player/media#Create-Player)*
+ *[Setup Player](https://github.com/mp-player/media#Setup-Player)*
+ *[Parameter Settings](https://github.com/mp-player/media#Parameter-Settings)*
+ *[Use of Parameters](https://github.com/mp-player/media#Use-of-Parameters)*
+ *[Style Captions](https://github.com/mp-player/media#Style-Captions)*
+ *[Caption Button](https://github.com/mp-player/media#Caption-Button)*
+ *[Embed Player](https://github.com/mp-player/media#Embed-Player)*

<br><br>

### Create Player

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MediaPlay | MP-Player</title>
  <!-- mediaplay css -->
  <link href="https://cdn.jsdelivr.net/gh/mp-player/media@master/files/sources/mediaplay.min.css" rel="stylesheet" crossorigin="anonymous">
  <!-- mediaplay js -->
  <script src="https://cdn.jsdelivr.net/gh/mp-player/media@master/files/sources/mediaplay.min.js" crossorigin="anonymous"></script>
</head>
<body>

  <div id="video"></div>
  
<script>
  /* create player */
  const player = new MediaPlay("video", {
    streamFile: {
      src: "video.mp4", /* video (file/url) */
      setMedia: {
        autoplay: true,          /* (true/false) default > false */
        preload: "auto",         /* ("auto"/"metadata") default > auto */
        loop: false,             /* (true/false) default > false */
        poster: "thumbnail.png", /* video thumbnail (file/url) optional */
      },
    }
  });
</script>
</body>
</html>
```

<br>

### Setup Player

```javascript
configs: {
  params: {
    /* parameter settings */
    ...
  }
}
```

<br>

### Parameter Settings

```javascript
streamFile: {
  ...
  setMedia: {
    ...
  },
  configs: {
    params: {
      titles: {
        name: "",
        fonts: {
          size: "",
          weight: "",
          color: "",
        }
      },
      waterMark: {
        type: "",
        file: "",
        transparent: {
          opacity: "",
        }
      },
      captions: {
        file: {
          src: "",
          kind: "",
          label: "",
          lang: "",
          active: --,
        }
      },
      playerSettings: {
        fitToScreen: --,
        accentColor: "",
      },
    }
  }
}
```

<br>

### Use of Parameters

```javascript
/* media title
  @ show the name or title of the video
  @ remove this from the parameter if you don't want to show it
*/
titles: {
  name: "My Video", /* video name */
  /* style */
  fonts: {
    size: "1em",   /* (px/rem/em/%) default > 14px */
    weight: "500", /* ("400"/"500"/"600") default > 400 */
    color: "#fff", /* (hex/rgb) default > rgb(255,255,255) */
  }
},

/* watermark
  @ please use one (image or text)
  @ "type" of watermark
  @ "file" target
  @ transparent watermark  
  @ ("0.3"/"0.5"/"0.7") default > 0.3
*/
waterMark: {
  /* with image */
  type: "image",
  file: "logo.png",
  transparent: {
    opacity: "0.5",
  }
  /* with text */
  type: "text",
  file: "Watermark Name",
  transparent: {
    opacity: "0.5",
  }
},

/* closed caption
  @ supports VTT/SRT format files
  @ work for online/offline
*/
captions: {
  file: {
    src: "subs-english.vtt", /* caption (file/url) */
    kind: "subtitles",       /* type ("captions"/"subtitles") */
    label: "English",        /* label name eg > ("English") */
    lang: "en",              /* language code eg > ("en") */
    active: true,            /* display caption (true/false) default > false */
  }
},
/* 
  @ add more captions
  @ just put the number
  @ starting from 2
  @ max caption allowed 5
*/
captions2: {
  file: {
    src: "subs-spanish.vtt",
    kind: "subtitles",
    label: "Spanish",
    lang: "es",
    active: false,
  }
},
captions3: {
  file: {
    src: "subs-french.vtt",
    kind: "subtitles",
    label: "French",
    lang: "fr",
    active: false,
  }
},

/* player settings
  @ resize or expand the player to fit the screen
  @ change the main color
*/
playerSettings: {
  fitToScreen: true,      /* (true/false) default > false */
  accentColor: "#4169E1", /* (hex/rgb) default > rgb(65,105,225) */
},
```

<br>

### Style Captions

```javascript
/*
  @ some devices or browsers do not support or do not allow to change settings on caption text
  @ MP-Player allows you to adjust as you wish in the appearance of the caption text
*/
const player = new MediaPlay("video", {
  ...
});

player.styleCaption({
  text: {
    fontSize: "",        /* default > 0.98em */
    fontWeight: "",      /* default > 400 */
    color: "",           /* default > rgb(255,255,255) */
    textShadow: "",      /* default > 0 1px 3px rgb(0,0,0) */
    textAlign: "",       /* default > center */
    lineHeight: "",      /* default > 1.6 */
    backgroundColor: "", /* default > rgba(17,17,17,0.7) set to (!important) */
  }
});
```

<br>

### Caption Button

```javascript
/* hide closed caption button */
player.captionButton({
  CLOSED_CAPTION: "hidden"
});
```

<br>

### Embed Player

```javascript
/* make your own (HTML)
  @ folder (embed)
  @ file (index.html)
*/
```

`embed/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Embed | MP-Player</title>
  <link href="https://cdn.jsdelivr.net/gh/mp-player/media@master/files/sources/mediaplay.min.css" rel="stylesheet" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/gh/mp-player/media@master/files/sources/mediaplay.min.js" crossorigin="anonymous"></script>
</head>
<body>

  <div id="video"></div>
  
<script>
  /* get video url and name from request parameters */
  const videoUrl = requestURL();
  const videoName = requestName();

  const player = new MediaPlay("video", {
    streamFile: {
      src: `${videoUrl}`,
      setMedia: {
        autoplay: true,
        preload: "auto",
        loop: false,
        poster: "",
      },
      configs: {
        params: {
          titles: {
            name: `${videoName}`,
            fonts: {
              size: "14px",
              weight: "400",
              color: "rgb(255,255,255)",
            }
          },
          waterMark: {
            type: "text",
            file: "MP-Player",
            transparent: {
              opacity: "0.3",
            }
          },
          playerSettings: {
            fitToScreen: true,
            accentColor: "rgb(65,105,225)",
          },
        }
      },
    }
  });
</script>
</body>
</html>
```

```javascript
/* usage
  @ top url: http://example.com/
  @ video url: http://video-stream.mp4
  @ video name: My Video
  @ request: http://example.com/embed?url=http://video-stream.mp4&name=My Video
*/
```

<br><br><br>

> <strong>MP-Player</strong> is built to play videos smoothly whether the video stream is VOD or LIVE and speed up the video loader even if the connection is slow. Video quality options are also available by dividing the quality into several levels e.g. (240p, 360p, 480p, 720p), this quality option works for M3U8 only `(VOD/LIVE)` and does not work for other formats such as (mp4, mkv, webm etc).

<br><br>

> <strong>Note:</strong> This is not recommended for developer use, as the code generation for this video player is low level and can only be used for personal projects or you can download all provided files and improve this open source code and make it your developer project.

<br><br><br><br><br>

<div align="center">&copy; 2025 MP-Player (MediaPlay)</div>
