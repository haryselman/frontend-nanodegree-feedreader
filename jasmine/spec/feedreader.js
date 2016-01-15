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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        // beforeAll executes only once and checks if the all feeds is defined. If not all tests below fail
        beforeAll (function () {
            expect(allFeeds).toBeDefined();
        });

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */

        it('are defined', function() {
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('all feeds have a URL defined', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            })
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('all feeds have a name defined', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            })
        });
    });

    /* A new test suite named "The menu" */
    describe('The menu', function () {
        // declared body as a var witin this test suite as it is reused within the tests
        var body = $('body');

        /* a test that ensures the menu element is
         * hidden by default.*/

        it('is by default hidden', function () {
            // using jQuery to check if the body tag has the class 'menu-hidden'
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. */

        it('toggles visibility when clicked', function () {
            var menuSelector = $('.menu-icon-link');
            // using jQuery to create click event on the hamburger menu icon
            menuSelector.click();
            // on click it expects the 'menu-hidden' class not to be present
            expect(body.hasClass('menu-hidden')).toBe(false);
            // using jQuery to create second click event on the hamburger menu icon
            menuSelector.click();
            // on second click it expects the 'menu-hidden' class not to be present
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function () {

        // feed is defined outside the before each scope so it is not re-created for every test below
        var feed,
            feedId = 0;
        // as the calls to the feed services are async we use the beforeEach done function
        beforeEach(function(done) {
            // calling the loadFeed function
            loadFeed(feedId, function() {
                // jQuery selector that selects the div containing the feed list and puts it in the var feed
                feed = $('.feed');
                done();
            });
        });

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container. */

        it('in the feed contains at least a single .entry element', function () {
            // checks how often the entry class occurs
            var numberOfEntries = feed.find('.entry').length;
            // checks if the number of occurrences us bigger than 0
            expect(numberOfEntries).toBeGreaterThan(0);
        });

        /*  a new test suite named "New Feed Selection" */

        describe('New Feed Selection', function () {

            var initFeedResults,
                secondFeedResults;

            beforeEach(function(done) {
                loadFeed(feedId, function() {
                    initFeedResults = $('.feed').html();
                    done();
                });
            });

         /* A test that ensures when a new feed is loaded */

            // this test will run when second async feed call returns
            it('results in different feed content', function(done) {
                // adding +1 to feedId to take the second feed
                feedId++;
                loadFeed(feedId, function() {
                    // loads the second feed results html in the secondFeedResults results
                    secondFeedResults = $('.feed').html();
                    // checks if feeds are different
                    expect(initFeedResults).not.toBe(secondFeedResults);
                    done();
                });
            });
        });

    });

}());
