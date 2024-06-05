// Convenience method to make sure that DOM has been fully loaded
var documentReady = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}

// ----- Mobile Navigation toggle functionality

const mainNavToggleButton = document.getElementById('main-nav-toggle');
const mainNav = document.getElementById('main-nav');

mainNavToggleButton.addEventListener('click', (e) => {
  if (mainNavToggleButton.getAttribute('aria-expanded') == 'true') {
    mainNavToggleButton.setAttribute('aria-expanded', 'false')
  }
  else {
    mainNavToggleButton.setAttribute('aria-expanded', 'true')
  }

  mainNavToggleButton.classList.toggle('open');
  mainNav.classList.toggle('open');
});

// ----- Mobile Sub Navigation toggle functionality

const subNavToggleButton = document.getElementById('sub-nav-toggle');

if (subNavToggleButton) {
  const subNav = document.getElementById('sub-nav-body');

  subNavToggleButton.addEventListener('click', (e) => {
    if (subNavToggleButton.getAttribute('aria-expanded') == 'true') {
      subNavToggleButton.setAttribute('aria-expanded', 'false')
    }
    else {
      subNavToggleButton.setAttribute('aria-expanded', 'true')
    }

    subNavToggleButton.classList.toggle('open');
    subNav.classList.toggle('open');
    document.querySelectorAll('.sub-nav-chevron').forEach(item => {
      item.classList.toggle('block');
      item.classList.toggle('hidden');
    });
  });
}

// ----- Perform actions after the DOM has been fully loaded

documentReady(() => {

  // ----- Highlight the current section in navigation

  // Specify Navigations
  const navigations = ['#main-nav'];

  // Set Active Items In Specified Navigations
  const slug = window.location.pathname.split('/')[1];

  for (var i = navigations.length - 1; i >= 0; i--) {
    var selector = navigations[i] + ' li a';
    document.querySelectorAll(selector).forEach(navItem => {
      var hrefAttribute = navItem.getAttribute('href');
      var currentLink = hrefAttribute.substr(hrefAttribute.lastIndexOf('/') + 1);
      if(currentLink == slug) {
        navItem.parentElement.classList.add('active');
      }
    });
  }

  // ----- Responsive Tables

  var headertext = [];
  var headers = document.querySelectorAll("thead");
  var tablebody = document.querySelectorAll("tbody");

  for (var i = 0; i < headers.length; i++) {
    headertext[i]=[];
    for (var j = 0, headrow; headrow = headers[i].rows[0].cells[j]; j++) {
      var current = headrow;
      headertext[i].push(current.textContent);
      }
  }

  for (var h = 0, tbody; tbody = tablebody[h]; h++) {
    for (var i = 0, row; row = tbody.rows[i]; i++) {
      for (var j = 0, col; col = row.cells[j]; j++) {
        col.setAttribute("data-th", headertext[h][j]);
      }
    }
  }

  // RESPONSIVE VIDEOS

  // Vanilla version of FitVids

  (function(window, document, undefined) {
    "use strict";

    // List of Video Vendors embeds you want to support
    var players = ['iframe[src*="youtube.com"]', 'iframe[src*="vimeo.com"]'];

    // Select videos
    var fitVids = document.querySelectorAll(players.join(","));

    // If there are videos on the page...
    if (fitVids.length) {
      // Loop through videos
      for (var i = 0; i < fitVids.length; i++) {
        // Get Video Information
        var fitVid = fitVids[i];
        var width = fitVid.getAttribute("width");
        var height = fitVid.getAttribute("height");
        var aspectRatio = height / width;
        var parentDiv = fitVid.parentNode;

        // Wrap it in a DIV
        var div = document.createElement("div");
        div.className = "fitVids-wrapper";
        div.style.paddingBottom = aspectRatio * 100 + "%";
        parentDiv.insertBefore(div, fitVid);
        fitVid.remove();
        div.appendChild(fitVid);

        // Clear height/width from fitVid
        fitVid.removeAttribute("height");
        fitVid.removeAttribute("width");
      }
    }
  })(window, document);

});

// ************************************************************
// The code below needs to be translated into vanilla JS if needed
// ************************************************************

  // // Add open class to nain-nav li, when mouse over dropdown
  // $(".main-nav ul li ul").hover(
  //   function(){ // Mouse Over
  //    $(this).parent().addClass("open");
  //   },
  //   function(){ // Mouse Out
  //     $(this).parent().removeClass("open");
  //   }
  // );

  // // Prevent from navigating to a top level page that has dropdown

  // if ($(window).width() < 750) {
  //   $('.dropdownToggle').click(function(e) {
  //     e.preventDefault();
  //     $(this).toggleClass('open');
  //     $(this).next().toggleClass('open');
  //   });
  // }

  // // RESPONSIVE VIDEOS
  // // Find all YouTube videos
  // var $allVideos = $("iframe[src*='//www.youtube.com']"),

  //     // The element that is fluid width
  //     $fluidEl = $(".main-content");

  //   // Figure out and save aspect ratio for each video
  //   $allVideos.each(function() {

  //     $(this)
  //       .data('aspectRatio', this.height / this.width)

  //       // and remove the hard coded width/height
  //       .removeAttr('height')
  //       .removeAttr('width');

  //   });

  //   // When the window is resized
  //   $(window).resize(function() {

  //     var newWidth = $fluidEl.width();

  //     // Resize all videos according to their own aspect ratio
  //     $allVideos.each(function() {

  //       var $el = $(this);
  //       $el
  //         .width(newWidth)
  //         .height(newWidth * $el.data('aspectRatio'));

  //     });

  // // Kick off one resize to fix all videos on page load
  // }).resize();

  // // Add a title element to YouTube iframes
  // $('iframe[allowfullscreen]').prop('title', 'YouTube embedded video');
