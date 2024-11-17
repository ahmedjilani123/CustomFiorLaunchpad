/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sapad/adv_lauchpad/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
