/**
 * @name        AmwSignUpCtrl
 * @author      Marco Schaule <marco.schaule@net-designer.net>
 * @file        This file is an AngularJS controller.
 * 
 * @copyright   (c) 2015  net-designer.net, Marco Schaule <marco.schaule@net-designer.net>
 * @license     https://github.com/OnceMac/net-designer.net/blob/master/LICENSE
 */
(function() { 'use strict';

// *****************************************************************************
// Controller module
// *****************************************************************************

angular
    .module('amw-controllers')
    .controller('AmwSignUpCtrl', Controller);

// *****************************************************************************
// Controller definition function
// *****************************************************************************

function Controller($rootScope, $state, AuthService) {
    var vm = this;

    // *****************************************************************************
    // Public variables
    // *****************************************************************************

    vm.objUserNew = {};
    vm.objErrs    = {};

    // *****************************************************************************
    // Controller function linking
    // *****************************************************************************

    vm.init      = init;
    vm.signUp    = signUp;
    vm.isInvalid = isInvalid;

    // *****************************************************************************
    // Controller function definition
    // *****************************************************************************

    /**
     * Service method to initialize controller. Is called immediately or can
     * be called from within controller.
     */
    function init() {
        _resetUser();
    } init();

    // *****************************************************************************

    /**
     * Controller function to accomplish a sign up supported by the 
     * authentication service.
     */
    function signUp() {
        $rootScope.isProcessing = true;

        return AuthService.signUp(vm.objUserNew, function(objErrs) {
            $rootScope.isProcessing = false;
            if (objErrs) {
                return (vm.objErrs = objErrs);
            }
            _resetUser();
            return $state.go('profile');
        });
    }

    // *****************************************************************************

    /**
     * Controller method to delegate the test for valid sign up form to the
     * authentication service.
     * 
     * @param  {String}  strFieldName  string of the field's name
     * @return {Boolean}               true if form is valid
     */
    function isInvalid(strFieldName, strFieldNameSource) {
        var mixField         = vm.objUserNew[strFieldName];
        var strFieldNameReal = strFieldName;

        if (strFieldNameSource) {
            mixField = {
                strKey               : strFieldNameSource,
                strField             : vm.objUserNew[strFieldNameSource],
                strKeyConfirmation   : strFieldName,
                strFieldConfirmation : vm.objUserNew[strFieldName],
            };
            strFieldNameReal = 'confirmation';
        }

        var objErrs = AuthService.getErrs(mixField, strFieldNameReal, 'signUp');
        if (!objErrs && vm.objErrs[strFieldName]) {
            delete vm.objErrs[strFieldName];
            return false;
        }

        _.extend(vm.objErrs, objErrs);
        return true;
    }

    // *****************************************************************************
    // Controller helper definitions
    // *****************************************************************************

    /**
     * Helper function to reset the signing up user.
     */
    function _resetUser() {
        vm.objUserNew = {
            strGender               : 'male',
            strFirstName            : 'Marco',
            strLastName             : 'Schaule',
            strUsername             : 'MarcoSchaule',
            strEmail                : 'marco.schaule@net-designer',
            strEmailConfirmation    : 'marco.schaule@net-designer',
            strPassword             : '123123',
            strPasswordConfirmation : '123123',
        };
    }

    // *****************************************************************************
}

// *****************************************************************************

})();
