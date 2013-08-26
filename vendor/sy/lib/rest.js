namespace('Sy.Lib');

/**
    * Make easy RESTful request to the server
*/

Sy.Lib.REST = function () {

    this.httpCodes = {};

};

Sy.Lib.REST.prototype = Object.create(Object.prototype, {

    /**
        * Make a request to the server with as options an object as follows
        *
        * <code>
        *   {
        *       data: {
        *           input: 'input value'
        *       },
        *       headers: {
        *           headerName: 'header value'
        *       },
        *       url: 'url/to/request',
        *       success: {
        *           fn: 'function to call',
        *           context: 'context object to apply on the function'
        *       },
        *       error: {
        *           fn: 'function to call',
        *           context: 'context object to apply on the function'
        *       },
        *       method: 'GET|POST|PUT|DELETE'
        *   }
        * </code>
        *
        * Every REST response as to be a JSON document with a "status" attribute set to successful|error
    */

    request: {

        value: function (options) {

            try {

                var server = new XMLHttpRequest(),
                    data = new FormData(),
                    httpCode = this.httpCodes;

                if (options.data !== undefined) {

                    for (var prop in options.data) {

                        if (options.data.hasOwnProperty(prop)) {

                            data.append(prop, options.data[prop]);

                        }

                    }

                }

                if (options.success !== undefined) {

                    server.addEventListener(
                        'readystatechange',
                        function (event) {

                            var t = event.target,
                                resp = null;

                            if (
                                t.readyState === 4 &&
                                (
                                    (
                                        options.method === 'DELETE' &&
                                        t.status === httpCode.code.clientError.GONE
                                    ) ||
                                    httpCode.isSuccess(t.status) ||
                                    t.status === 0
                                )
                            ) {

                                try {

                                    resp = JSON.parse(t.response);

                                    options.success.fn.call((options.success.context || window), resp);

                                } catch(error) {

                                    if (options.error) {

                                        options.error.fn.call((options.error.context || window), error.message);

                                    } else {

                                        throw error.message;

                                    }

                                }

                            } else if (t.readyState === 4) {

                                switch (httpCode.reverse(t.status)) {
                                    case 'UNAUTHORIZED':
                                        throw 'Invalid Credentials';
                                    case 'PAYMENT_REQUIRED':
                                        throw 'Plan expired';
                                    case 'NOT_FOUND':
                                        throw 'Entity not found';
                                    case 'FORBIDDEN':
                                        throw 'Unauthorized request';
                                    default:
                                        throw 'An unknown error occured';
                                }

                            }

                        },
                        false
                    );

                }

                server.open(options.method, options.url);

                if (options.headers !== undefined) {

                    for (var h in options.headers) {

                        if (options.headers.hasOwnProperty(h)){

                            server.setRequestHeader(h, options.headers[h]);

                        }

                    }

                }

                server.send(data);

            } catch (error) {

                if (options.error) {

                    options.error.fn.call((options.error.context || window), error.message);

                } else {

                    throw error.message;

                }

            }

        }

    },

    /**
        * Alias of request method but without specifying method attribute
    */

    get: {

        value: function (options) {

            options.method = 'GET';

            this.request(options);

        }

    },

    /**
        * Alias of request method but without specifying method attribute
    */

    post: {

        value: function (options) {

            options.method = 'POST';

            this.request(options);

        }

    },

    /**
        * Alias of request method but without specifying method attribute
        *
        * As the server can't handle data via PUT verb we use post with an attibute _method in the data set to put to workaround
    */

    put: {

        value: function (options) {

            options.method = 'POST';
            options.data = options.data || {};

            options.data._method = 'PUT';

            this.request(options);

        }

    },

    /**
        * Alias of request method but without specifying method attribute
    */

    remove: {

        value: function (options) {

            options.method = 'DELETE';

            this.request(options);

        }

    },

    setHttpCode: {

        value: function (object) {

            this.httpCodes = object;

            return this;

        }

    }

});