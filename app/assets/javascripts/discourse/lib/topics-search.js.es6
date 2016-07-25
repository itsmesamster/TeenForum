import { CANCELLED_STATUS } from 'discourse/lib/autocomplete';

var cache = {},
    cacheTopicId,
    cacheTime,
    currentTerm,
    oldSearch;

function performSearch(term, resultsFn) {
    var cached = cache[term];
    if (cached) {
        resultsFn(cached);
        return;
    }

    // need to be able to cancel this
    oldSearch = $.ajax(Discourse.getURL('/topics/search'), {
        data: { term: term }
    });

    var returnVal = CANCELLED_STATUS;

    oldSearch.then(function (r) {
        cache[term] = r;
        cacheTime = new Date();
        // If there is a newer search term, return null
        if (term === currentTerm) { returnVal = r; }

    }).always(function(){
        oldSearch = null;
        resultsFn(returnVal);
    });
}

var debouncedSearch = _.debounce(performSearch, 300);

function organizeResults(r, options) {
    if (r === CANCELLED_STATUS) { return r; }

    var exclude = options.exclude || [],
        limit = options.limit || 5,
        topics = [],
        results = [];
   console.log("topics"+JSON.stringify(r.topics));
    if (r.topics) {
        r.topics.every(function(u) {
          //  if (exclude.indexOf(u.username) === -1) {
                topics.push(u);
                results.push(u);
          //  }
            return results.length <= limit;
        });
    }

    results.topics = topics;
    return results;
}


export default function topicSearch(options) {
    var term = options.term || "";


    if (oldSearch) {
        oldSearch.abort();
        oldSearch = null;
    }

    currentTerm = term;

    return new Ember.RSVP.Promise(function(resolve) {
        // TODO site setting for allowed regex in username
        if (term.match(/[^\w\.\-]/)) {
            resolve([]);
            return;
        }

        var clearPromise = setTimeout(function(){
            resolve(CANCELLED_STATUS);
        }, 5000);

        debouncedSearch(term,  function(r) {
            clearTimeout(clearPromise);
            resolve(organizeResults(r, options));
        });

    });
}
