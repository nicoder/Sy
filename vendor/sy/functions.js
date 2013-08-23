function namespace (ns, referer) {

    var namespaces = null,
        referer = referer || window;

    if (typeof ns === 'string') {
        namespaces = ns.split('.');
    } else if (ns instanceof Array && ns.length > 0) {
        namespaces = ns;
    } else {
        return;
    }

    referer[namespaces[0]] = referer[namespaces[0]] || {};

    ns = namespaces.shift();

    namespace(namespaces, referer[ns]);

}

function exist(className, referer) {

    var names = null,
        referer = referer || window;

    if (typeof className === 'string') {
        names = className.split('.');
    } else if (className instanceof Array && className.length > 0) {
        names = className;
    }

    if (referer[names[0]] !== undefined  && names.length > 1) {

        cn = names.shift();

        return exist(names, referer[cn]);

    } else if (referer[names[0]] !== undefined  && names.length === 1) {

        return true;

    } else {

        return false;

    }

}