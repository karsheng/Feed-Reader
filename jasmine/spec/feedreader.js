/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
              expect(allFeeds).toBeDefined();
              expect(allFeeds.length).not.toBe(0);
        });

        /* loops through each feed in the allFeeds object
         * and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URLs are defined and not empty', function() {
              allFeeds.forEach(function(feed) {
                  expect(feed.url).toBeDefined();
                  expect(feed.url.length).not.toBe(0);
              });
         });

        /* loops through each feed in the allFeeds object and
         * ensures it has a name defined
         * and that the name is not empty.
         */
         it('names are defined and not empty', function() {
              allFeeds.forEach(function(feed) {
                  expect(feed.name).toBeDefined();
                  expect(feed.name.length).not.toBe(0);
              });
         });
    });

    /* test suite named "The menu" */
    describe('The menu', function() {
        /* test that ensures the menu element is
         * hidden by default.
         */
        // NOTE: App toggles .menu-hidden to hide/unhide the menu from the body.
         var hidden;
         beforeEach(function() {
              hidden = $('body').hasClass('menu-hidden');
         });

         it('is hidden by default', function() {
              // expect body has the class of .menu-hidden, which hides the menu.
              expect(hidden).toBe(true);
         });
         /* test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('menu changes visibility when clicked', function() {
              // click on the menu
              $('.menu-icon-link').trigger('click');
              // expect the .menu-hidden to be removed i.e. menu visible
              expect($('body').hasClass('menu-hidden')).not.toBe(true);
              // click on the menu
              $('.menu-icon-link').trigger('click');
              // expect the .menu-hidden to be present i.e. menu hidden
              expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });
    /* test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* ensures when the loadFeed function is called and completes its work,
         * there is at least a single .entry element within the .feed container.
         */
          beforeEach(function(done){
              loadFeed(0, done);
          });

          it('loadFeed function is called and completed: at least a single .entry element within the .feed container.', function(done) {
              // expects to find content in the .entry element in the .feed container
              expect($('.feed .entry').length).not.toBe(0);
              done();
          });
    });
    /* test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
        /* ensures when a new feed is loaded by the loadFeed
         * function that the content actually changes.
         */
         var oldFeed;
         var newFeed;
         // load two different feeds
         beforeEach(function(done){
              loadFeed(0, function() {
                  oldFeed = $('.feed').html();
                  loadFeed(1, function() {
                      newFeed = $('.feed').html();
                      done();
                  });
              });
          });
         // when loadFeed() finished loading asynchronously, expect oldFeed to not be equal to newFeed
         it('content changes when a new feed is loaded', function(done) {
              expect(oldFeed).not.toEqual(newFeed);
              done();
          });
    });
}());
