(function(window){

  function post(url, bodyParams, callbacks) {
    PT_RECORDER_URL = '/api/recorder';
    console.log('POSTING: ' + url);
    const body = JSON.stringify(bodyParams);

    const req = new XMLHttpRequest();
    req.open("POST", this.PT_RECORDER_URL + url, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.withCredentials = true; // pass along cookies
    if (callbacks) {
      req.onload = () => { callbacks.forEach(callback => callback()) };
    }
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


  function initSession(callbacks) {
    post('/initializeSession', undefined, callbacks);
  }

/*******************************************/
  window.onload = function(){
    console.log('perf-trace is perfect to trace!');

    setTimeout(function(){
      initSession(recordingOnPageCallbacks);
    }, 0);
  }
})(window)
