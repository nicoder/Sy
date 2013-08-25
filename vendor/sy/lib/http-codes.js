namespace('Sy.Lib');

Sy.Lib.HttpCode = function () {};

Sy.Lib.HttpCode.prototype = Object.create(Object.prototype, {

    code: {
        value: {
            info: {
                CONTINUE: 100,
                SWITCHING_PROTOCOLS: 101,
                PROCESSING: 102
            },
            success: {
                OK: 200,
                CREATED: 201,
                ACCEPTED: 202,
                NON_AUTHORITATIVE_INFO: 203,
                NO_CONTENT: 204,
                RESET_CONTENT: 205,
                PARTIAL_CONTENT: 206,
                MULTI_STATUS: 207,
                ALREADY_REPORTED: 208,
                IM_USED: 226
            },
            redirection: {
                MULTI_CHOICES: 300,
                MOVED_PERMANENTLY: 301,
                FOUND: 302,
                SEE_OTHER: 303,
                NOT_MODIFIED: 304,
                USE_PROXY: 305,
                SWITCH_PROXY: 306,
                TEMP_REDIRECT: 307,
                PERMANENT_REDIRECT: 308
            },
            clientError: {
                BAD_REQUEST: 400,
                UNAUTHORIZED: 401,
                PAYMENT_REQUIRED: 402,
                FORBIDDEN: 403,
                NOT_FOUND: 404,
                METHOD_NOT_ALLOWED: 405,
                NOT_ACCEPTABLE: 406,
                PROXY_AUTH_REQUIRED: 407,
                REQUEST_TIMEOUT: 408,
                CONFLICT: 409,
                GONE: 410,
                LENGTH_REQUIRED: 411,
                PRECONDITION_FAILED: 412,
                REQUEST_ENTITY_TOO_LARGE: 413,
                REQUEST_URI_TOO_LONG: 414,
                UNSUPPORTED_MEDIA_TYPE: 415,
                REQUESTED_RANGE_NOT_SATISFIABLE: 416,
                EXPECTATION_FAILED: 417,
                AUTH_TIMEOUT: 419,
                UNPROCESSABLE_ENTITY: 422,
                LOCKED: 423,
                METHOD_FAILURE: 424,
                UPGRADE_REQUIRED: 426,
                PRECONDITION_REQUIRED: 428,
                TOO_MANY_REQUEST: 429,
                REQUEST_HEADER_FILEDS_TOO_LARGE: 431
            },
            serverError: {
                INTERNAL_ERROR: 500,
                NOT_IMPLEMENTED: 501,
                BAD_GATEWAY: 502,
                SERVICE_UNAVAILABLE: 503,
                GATEWAY_TIMEOUT: 504,
                HTTP_VERSION_NOT_SUPPORTED: 505,
                VARIANT_ALSO_NEGOCIATES: 506,
                INSUFFICIENT_STORAGE: 507,
                LOOP_DETECTED: 508,
                BANDWIDTH_LIMIT_EXCEEDED: 509,
                NOT_EXTENDED: 510,
                NETWORK_AUTH_REQUIRED: 511
            }
        },
        writable: false,
        configurable: false
    },

    isInScope: {
        value: function (scope, statusCode) {

            for (var p in this.code[scope]) {
                if (this.code[scope].hasOwnProperty(p) && statusCode === this.code[scope][p]) {
                    return true;
                }
            }

            return false;

        }
    },

    isInfo: {
        value: function (statusCode) {

            return this.isInScope('info', statusCode);

        }
    },

    isSuccess: {
        value: function (statusCode) {

            return this.isInScope('success', statusCode);
        }
    },

    isRedirection: {
        value: function (statusCode) {

            return this.isInScope('redirection', statusCode);
        }
    },

    isClientError: {
        value: function (statusCode) {

            return this.isInScope('clientError', statusCode);
        }
    },

    isServerError: {
        value: function (statusCode) {

            return this.isInScope('serverError', statusCode);
        }
    },

    reverse: {
        value: function (statusCode) {

            for (var scope in this.code) {
                if (this.code.hasOwnProperty(scope)) {
                    for (var msg in this.code[scope]) {
                        if (this.code[scope].hasOwnProperty(msg) && statusCode === this.code[scope][msg]) {
                            return msg;
                        }
                    }
                }
            }
        }
    }

});