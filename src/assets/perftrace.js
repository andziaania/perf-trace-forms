(function(window){
  console.log('perf-trace is perfect to trace!');

  function post(url, bodyParams, callback, callbackParams) {
    PT_RECORDER_URL = '/api/recorder';
    console.log('POSTING: ' + url);
    const body = bodyParams ? JSON.stringify(bodyParams) : undefined;
    const req = new XMLHttpRequest();

    req.open("POST", this.PT_RECORDER_URL + url, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.withCredentials = true; // pass along cookies
    req.onload = function() {
      if (callback) callback.apply(callbackParams);
    }
    req.send(body);
  }

  function postPageLoadingPerformance() {
    const navigationPerformance = performance.getEntriesByType("navigation")[0];
    const stats = {
      "loadingTime": navigationPerformance.loadEventEnd - navigationPerformance.responseEnd,
    }
    post('/pageLoadingPerformance', stats);
  }

  function initSession(callback, callbackParams) {
    post('/initializeSession', undefined, callback, callbackParams);
  }


/*******************************************/
  window.onload = function(){
    setTimeout(function(){
      // const pageLoadingEndTime = performance.now();

      initSession(postPageLoadingPerformance);
    }, 0);
  }
})(window)
