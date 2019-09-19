var OUR_STATISCICS_SERVER = 'http://localhost:8080/recorder';


function informAboutAjaxRequest(ajaxRequestUrl) {
    var req = new XMLHttpRequest();
    var params = '?webappId=' + 1 + '&ajaxRequestUrl=' + ajaxRequestUrl
    req.open("GET", OUR_STATISCICS_SERVER + "/registerAjaxRequest" + params, true);
    req.setRequestHeader('Accept', 'application/json');
    req.withCredentials = true; // pass along cookies

    req.send();
}


//  Collecting page loading data.
 function collectPageLoadingStats(){
        (async () => {
          console.log('collectPageLoadingStats ' + (window.performance.timing.loadEventEnd) + "  " + window.performance.timing.navigationStart);

          const rawResponse = await fetch(OUR_STATISCICS_SERVER  + "/registerPageLoading", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: window.location.href,  //pathname. host
                load: 123,
//                load: window.performance.timing.loadEventEnd - window.performance.timing.navigationStart,
//                timing: {
//                    load: window.performance.timing.loadEventEnd - window.performance.timing.navigationStart,
//                },
            }),

          });

          const content = await rawResponse.json();

          console.log(content);
        })();
}


(function(window){
  console.log('perf-trace is perfect to trace!');

  const PT_RECORDER_URL = 'api/recorder/initializeSession';

  function post(params) {
    const req = new XMLHttpRequest();
    req.open("POST", PT_RECORDER_URL, true);
    // req.setRequestHeader("Accept", "application/json, text/plain, */*");
    req.withCredentials = true; // pass along cookies
    req.send();
  }

  function initSession() {
    post('');
  }



initSession();

})(window)


// Binding all server requests: Tracking user activities
//(function(open) {
//
//    function isNotOurStatisticRequest(url) {
//        return !url.includes(OUR_STATISCICS_SERVER);
//    }
//
//    XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
//
//        this.addEventListener("readystatechange", function() {
//            if (this.readyState == 4 && isNotOurStatisticRequest(this.responseURL)) {
//                //informAboutAjaxRequest(this.responseURL);
//                esAjaxReq(this.responseURL);
//            }
//            console.log(this.readyState); // this one I changed
//        }, false);
//
//        open.apply(this, [].slice.call(arguments))
//        // open.call(this, method, url, async, user, pass);
//    };
//
//    var req = new XMLHttpRequest();
//    var params = '?ajaxRequestUrl=' + "bzzzz";
//    req.open("GET", OUR_STATISCICS_SERVER + "/initializeSession" + params, true);
//    req.setRequestHeader('Accept', 'application/json');
//    req.withCredentials = true; // pass along cookies
//    req.send();
//
//})(XMLHttpRequest.prototype.open);

