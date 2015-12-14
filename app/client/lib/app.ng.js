(function() { 'use strict';

// *****************************************************************************
// Meteor subscriptions
// *****************************************************************************

Meteor.subscribe("userData");

// ********************************************************************************
// Module definitions and organization
// ********************************************************************************

angular.module('amw-packages',    ['angular-meteor', 'ui.router', 'pascalprecht.translate']);
angular.module('amw-filters',     []);
angular.module('amw-directives',  []);
angular.module('amw-services',    []);
angular.module('amw-controllers', []);
angular.module('amw',             ['amw-packages', 'amw-filters', 'amw-directives', 'amw-services', 'amw-controllers']);

// ********************************************************************************
// Settings
// ********************************************************************************

// setup translation service
angular
    .module('amw')
    .config(function($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'languages/',
            suffix: '.locale.json'
        });
        $translateProvider.preferredLanguage('en-US');
    });

// ********************************************************************************

angular
    .module('amw')
    .run(function ($rootScope, $state) {
        $rootScope.$on('$stateChangeError', function(objEvent,
                objToState, objToParams, objFromState, objFromParams, objError) {
            console.log(">>> Debug ====================; Meteor.user():", Meteor.user(), '\n\n');
            if (objError === 'AUTH_REQUIRED') {
                $state.go('sign-in');
            }
        });
    });

// ********************************************************************************

})();
