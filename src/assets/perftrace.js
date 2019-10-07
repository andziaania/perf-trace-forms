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
      console.log(window.location.pathname)
      const param = {
        path: window.location.pathname
      }
      post('/urlPath', param);
    }
  }

  function initSession() {

    addPathChangeListener = function(listenerFunction) {
      var pushState = window.history.pushState;
      window.history.pushState = function () {
        console.info("adding listener on path change")
        pushState.apply(history, arguments);
        listenerFunction();
      };
    }

    const initSessionCallback = function() {
      recordingOnPageFunctions.postPageLoadingPerformance();
      recordingOnPageFunctions.postPath();
      addPathChangeListener(recordingOnPageFunctions.postPath);
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
