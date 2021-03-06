angular.module('ease.services', [])

    .constant({
        //apiHost: 'http://112.124.118.82:8200'
        apiHost: 'http://127.0.0.1:8200'
    })
    .factory('News', ['$resource', 'apiHost', function ($resource, apiHost) {
        return $resource(apiHost + '/api/news/:id/:method', {id: '@id', method: '@method'},
            {
                updateCommented: {
                    method: 'PUT'
                }
            }
        );
    }])
    .factory('User', ['$resource', 'apiHost', function ($resource, apiHost) {
        return $resource(apiHost + '/api/user/:username/:method', {username: '@username', method: '@method'}, {
            login: {
                method: 'POST',
                url: apiHost + '/api/user/login'
            },

            reg: {
                method: 'PUT',
                url: apiHost + '/api/user/reg'
            },
            getUsers: {
                method: 'GET',
                url: apiHost + '/api/user/getUsers',
                isArray: true
            }
        });
    }])
    .factory('Comment', ['$resource', 'apiHost', function ($resource, apiHost) {
        return $resource(apiHost + '/api/comment/:method', {method: '@method'})
    }])
    .service('Tips', ['$ionicLoading', function ($ionicLoading) {

        return {
            show: function (html) {
                $ionicLoading.show({
                    template: html,
                    duration: 1000,
                    noBackdrop: true
                })
            },
            hide: function () {
                $ionicLoading.hide();
            }
        }

    }])

    .service('UserInfo', ['$rootScope', function ($rootScope) {

        return {
            save: function (o) {
                localStorage.setItem('userInfo', JSON.stringify(o));
                $rootScope.$broadcast('userinfochange', this.get());
            },
            remove: function () {
                localStorage.removeItem('userInfo');
                $rootScope.$broadcast('userinfochange', this.get());
            },
            set: function (o) {
                var info = JSON.parse(localStorage.getItem('userInfo'));
                newInfo = $rootScope.extend(info, o);
                localStorage.setItem('userInfo', JSON.stringify(newInfo));
                $rootScope.$broadcast('userinfochange', this.get());
            },
            get: function (key) {
                var info = JSON.parse(localStorage.getItem('userInfo'));
                if (info) {
                    if (key) {
                        return info.key;
                    } else {
                        return info;
                    }
                } else {
                    return undefined;
                }
            }
        }
    }])
;
