(function(window){

  PT_RECORDER_URL = '/api/recorder';

  function post(url, bodyParams, callback) {
    console.log('POSTING: ' + url);
    const body = JSON.stringify(bodyParams);

    const req = new XMLHttpRequest();
    req.open("POST", PT_RECORDER_URL + url, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.withCredentials = true; // pass along cookies
    req.onload = () => { if (callback) callback() };
    req.send(body);
  }

  const recordingOnPageFunctions = {
    postPageLoadingPerformance: function() {
      const navigationPerformance = performance.getEntriesByType("navigation")[0];
      const stats = {
        loadingTime: navigationPerformance.loadEventEnd - navigationPerformance.responseEnd,
      }
      post('/pageLoadingPerformance', stats);
    },

    postPath: function() {
      const param = {
        path: window.location.pathname
      }
      post('/urlPath', param);
    }
  }

  const recordingOnPageCallbacks = Object.getOwnPropertyNames(recordingOnPageFunctions)
          .filter(propName => typeof recordingOnPageFunctions[propName] === 'function')
          .map(propName => recordingOnPageFunctions[propName]);



  function initSession() {

    function addRecordingForEachRequest() {
      const nativeOpen = XMLHttpRequest.prototype.open;
      const postWhenReady = function() {
        this.addEventListener("readystatechange", function() {
          console.log(this.readyState);

          if (this.readyState == 4 && !this.responseURL.includes(PT_RECORDER_URL)) {
            recordingOnPageCallbacks.forEach(callback => callback())
          }
          console.log(this.readyState);
        }, false);
      }

      XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
        postWhenReady.apply(this);
        nativeOpen.apply(this, [].slice.call(arguments));
      }
    }

    const initSessionCallback = function() {
      recordingOnPageCallbacks.forEach(callback => callback());
      addRecordingForEachRequest();
    }

    post('/initializeSession', undefined, initSessionCallback);
  }

/*******************************************/
  window.onload = function(){
    console.log('perf-trace is perfect to trace!');

    setTimeout(function(){
      initSession();
    }, 0);

  }
})(window)
