(function () {
  "use strict";

  const css = `
#root > div.win-wapper > div.app-main-wrapper > div > div.content-wrapper-box.app-content-wrapper > div > div.room-layout > div > div.room-content-left > div.kook-message-header-alert > div,
#icon-app-download,
div.banner-box,
div.audio-center-promotion,
div.kbc-banner-wrapper,
div.voice-icon.screen,
div.vip-tag,
div.kook-avatar-frame-static,
div.user-name-info > img,
div.text-channel-unread-icon,
div.guild-unread-icon,
div.user-setting-entry-mask > div > div.bottom-content.menu-background > div.user-setting-menu-list > div:nth-child(1),
#root > div.win-wapper > div.app-main-wrapper > div:nth-child(3) > div > div.setting-page-nav > div > div > div:nth-child(1) > div:nth-child(3),
#root > div.win-wapper > div.app-main-wrapper > div:nth-child(3) > div > div.setting-page-nav > div > div > div:nth-child(1) > div:nth-child(6),
.entry-list > .entry-line,
.text-message-item:has(.poke-msg-icon),
.kook-tootip.kook-tootip-text-align-left.kook-tootip-text-wrap-break.shop-icon-tooltip-big:has(> .shop-icon-tooltip-big-content)
{
  display: none !important;
}

.text-gradient {
  color: inherit !important;
}

.entry-list > .entry-line:nth-child(1),
.entry-list > .entry-line:nth-child(2),
.entry-list > .entry-line:nth-child(4) {
  display: block !important;
}
`;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  // 入场音效替换
  const regexs = [/img\.kookapp\.cn\/assets\/item\/resources\/.+\.mp3/, /resources\/.+_notifications?_.+\.mp3/];
  const OriginalAudio = Audio;
  window.Audio = new Proxy(OriginalAudio, {
    construct(target, args) {
      const audio = new target(...args);
      const originalPlay = audio.play;
      audio.play = function (...playArgs) {
        if (regexs.some(regex => regex.test(audio.src))) {
          audio.src = "https://static.kookapp.cn/app/assets/audio/user-join.mp3";
        }
        return originalPlay.apply(audio, playArgs);
      };
      return audio;
    },
  });
})();
