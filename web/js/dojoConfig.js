var dojoConfig = {
    parseOnLoad: true,
    packages: [
        {
            name: 'app',
            location: location.pathname.replace(/\/[^/]*$/, '') + '/js/app'
        }
    ]
};