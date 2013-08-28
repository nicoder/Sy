namespace('App');

Sy.service.get('core::config').set({
    env: 'dev',
    server: {
        api: {
            url: 'api/',
            headers: {
                'X-Authorization': 'authorization-token'
            }
        }
    }
});