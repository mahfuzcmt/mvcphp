
'use strict';

define(['app'], function (app) {

    var deviceFilter = function () {

        return function (devices, filterValue) {
            if (!filterValue) return devices;
            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < devices.length; i++) {
                var device = devices[i];
                if ((device.imeimac != undefined && device.imeimac.toLowerCase().indexOf(filterValue) > -1) ||
                    (device.devicetype != undefined && device.devicetype.toLowerCase().indexOf(filterValue) > -1) ||
                    (device.status != undefined && device.status.toLowerCase().indexOf(filterValue) > -1) ||
                    (device.devicemodel != undefined && device.devicemodel.toLowerCase().indexOf(filterValue) > -1) ||
                    (device.deviceserial != undefined && device.deviceserial.toLowerCase().indexOf(filterValue) > -1) ||
                	(device.devicemodel != undefined && device.devicemodel.toLowerCase().indexOf(filterValue) > -1)) {
                    matches.push(device);
                }
            }
            return matches;
        };
    };

    app.filter('deviceFilter', deviceFilter);

});