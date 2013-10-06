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

namespace('Sy');

Sy.init = function () {

    var conf = Sy.service.get('core::config'),
        meta = {
            bundles: {}
        };

    for (var bundle in App.Bundle) {
        if (App.Bundle.hasOwnProperty(bundle)) {

            meta.bundles[bundle] = {
                controllers: [],
                entities: [],
                forms: [],
                views: []
            };

            namespace('App.Bundle.'+bundle+'.Controller');
            namespace('App.Bundle.'+bundle+'.Entity');
            namespace('App.Bundle.'+bundle+'.Form');
            namespace('App.Bundle.'+bundle+'.View');

            for (var controller in App.Bundle[bundle].Controller) {
                if (App.Bundle[bundle].Controller.hasOwnProperty(controller)) {
                    meta.bundles[bundle].controllers.push(controller);
                }
            }

            for (var entity in App.Bundle[bundle].Entity) {
                if (App.Bundle[bundle].Entity.hasOwnProperty(entity)) {
                    meta.bundles[bundle].entities.push(entity);
                }
            }

            for (var form in App.Bundle[bundle].Form) {
                if (App.Bundle[bundle].Form.hasOwnProperty(form)) {
                    meta.bundles[bundle].forms.push(form);
                }
            }

            for (var view in App.Bundle[bundle].View) {
                if (App.Bundle[bundle].View.hasOwnProperty(view)) {
                    meta.bundles[bundle].views.push(view);
                }
            }

        }
    }

    conf.set({
        app: {meta: meta}
    });

};