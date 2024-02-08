// function to check if video is in viewport
const isElementInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};
// function to pause all video is users opens new tab from the app
export const onNewTabOpenPauseVideo = () => {
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => video.pause());
};
// * listener for scroll
export const videoScroll = () => {
  if (document.querySelectorAll("video[autoplay]").length > 0) {
    let windowHeight = window.innerHeight,
      videoEl = document.querySelectorAll("video[autoplay]");

    for (let i = 0; i < videoEl.length; i++) {
      let thisVideoEl = videoEl[i],
        videoHeight = thisVideoEl.clientHeight,
        videoClientRect = thisVideoEl.getBoundingClientRect().top;

      if (
        videoClientRect <= windowHeight - videoHeight * 1.2 &&
        videoClientRect >= 0 - videoHeight * 0.5
      ) {
        // Check if this video has sound enabled
        thisVideoEl.play();
      } else {
        thisVideoEl.pause();
      }
    }
  }
};

// lazy load video and auto play if video is viewport
export const lazyLoadAndAutoPlayVideo = () => {
  const videos = document.querySelectorAll("video[data-src]");
  videos.forEach((video) => {
    if (isElementInViewport(video)) {
      video.src = video.getAttribute("data-src");
      video.removeAttribute("data-src");
      video.setAttribute("autoplay", "true");
      video.setAttribute("playsinline", "true");

      video.play();
    }
  });
};
