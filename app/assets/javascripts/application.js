// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs

// Foundation Dependencies:
// Add '= require' to include plugin
///////////////////////////////////////
//= require foundation.core.js
// foundation.abide.js
// foundation.accordion.js
// foundation.accordionMenu.js
// foundation.drilldown.js
// foundation.dropdown.js
//= require foundation.dropdownMenu.js
//= require foundation.equalizer.js
// foundation.interchange.js
// foundation.magellan.js
// foundation.offcanvas.js
// foundation.orbit.js
//= require foundation.responsiveMenu.js
//= require foundation.responsiveToggle.js
//= require foundation.reveal.js
// foundation.slider.js
//= require foundation.sticky.js
// foundation.tabs.js
// foundation.toggler.js
// foundation.tooltip.js
// foundation.util.box.js
//= require foundation.util.keyboard.js
//= require foundation.util.mediaQuery.js
//= require foundation.util.motion.js
// foundation.util.nest.js
// foundation.util.timerAndImageLoader.js
//= require foundation.util.touch.js
//= require foundation.util.triggers.js
// foundation.zf.responsiveAccordionTabs.js'
///////////////////////////////////////

//= require activestorage
//= require_tree .

$(function(){ $(document).foundation(); });
