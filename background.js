//  dotgil

var Tarval = {

  /**
   *  List of urls to search in 
   *  @private
   */
  hnUrls = [],

  /**
   *  Loaded pages that we can search and interact with
   *  @private
   */
  hnPages = [],

  /**
   *  Timer used to poll the server
   *  @private
   */
  timer: null,

  /**
   *  Timer wait-time in ms used to poll the server
   *  @private
   *  @type {int}
   */
  timeLapse: 5000,

  /**
   *  Initiates the background task
   *  @public
   */
  init: function() {
    console.log("initing");
    for (var i = 0; i < Jerk.hnUrls.length; i++) {
      var url = Jerk.hnUrls[i];
      Jerk.loadPage(url).then(function(page){
        if(page != false) { //  This is wrong need to wait for them all to be loaded before starting

        }
      });
    }
    Jerk.startInterval();
  },

  /**
   *  Start the timer
   *  @private
   */
  startInterval: function() {
    Jerk.timer = setInterval(Jerk.run, Jerk.timeLapse );
  },

  /**
   *  Stop the timer
   *  @return {promise}
   *  @private
   */
  stopInterval: function() {
    clearInterval( Jerk.timer );
  },

  loadPage: function(url) {
    var promise = new Promise();
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onload = function(e) {
      if (this.status === 200) {
        var results = JSON.parse(this.responseText);
        promise.resolve(results);
      }
      else {
        promise.resolve(false);
      }
    };
    req.send(null);
    return promise;
  },

  /**
   *  Master loop that listens to requests and performs actions
   *  @private
   */
  run: function() {
    var requests = Jerk.grabRequests();
    if(requests.length > 0) {
      Jerk.stopInterval();    //  Wait until I'm done processing everything before asking for more
      for (var i = 0; i < requests.length; i++) {
        var request = requests[i];
        var response = Jerk.performAction(request);
        Jerk.requestFinished(response);
      }
      Jerk.startInterval();   //  Ready for more requests
    }
    Jerk.sendLifeSignal();
  },

  /**
   *  Tell the server that we're still alive and listening for requests
   *  @private
   */
  sendLifeSignal: function() {

  },

  /**
  * Get pending server requests to process
  * @private
  */
  grabRequests: function() {
    var requests = [{url: "http://blog.coinbase.com/post/57119163938/khan-academy-now-accepts-bitcoin-donations-using"}];
    return requests;
  },

  /**
  * Spawn a new hidden tab and go to website to perform the action
  * @private
  */
  spawnNewTab: function() {
  
  },

  /**
  * Perform the action
  * @private
  */
  performAction: function(request) {
    if(request && request.url) {
      var term = "a[href*=\"" + request.url +"\"]"
      console.log($(term));
    }

  },

  /**
  * Tell the db that we're done performing the action
  * @private
  */
  requestFinished: function(request) {
  
  }
};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  Jerk.init();
});
