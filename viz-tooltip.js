/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/VizTooltip.ts":
/*!***************************!*\
  !*** ./src/VizTooltip.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var rowTemplate = document.createElement('template');
rowTemplate.innerHTML = "\n    <div class=\"tooltip-row\">\n        <img class=\"entry-icon\"\n            width=\"22\"\n            height=\"22\"\n        >\n        <div class=\"tooltip-row-label\">\n            <span class=\"entry-label\"></span>\n        </div>\n    </div>\n";
var containerTemplate = document.createElement('template');
containerTemplate.innerHTML = "\n    <style>\n        :host {\n            display: block;\n            min-width: 80px;\n            max-width: 250px;\n            min-height: 24px;\n        }\n\n        .tooltip-container {\n            padding: 12px;\n            display: flex;\n            min-width: 80px;\n            min-height: 24px;\n            flex-flow: column nowrap;\n        }\n\n        .price::before {\n            font-family: SAP-icons;\n            content: \"\\E026\";\n        }\n\n        .manager::before {\n            font-family: SAP-icons;\n            content: \"\\E036\";\n        }\n\n        .product::before {\n            font-family: SAP-icons;\n            content \"\\E16D\";\n        }\n\n        .location::before {\n            font-family: SAP-icons;\n            content \"\\E021\";\n        }\n\n        .store::before {\n            font-family: SAP-icons;\n            content \"\\E00F\";\n        }\n\n        .tooltip-row {\n            display: flex;\n            min-height: 30px;\n            flex-flow: row nowrap;\n            align-items: center;\n        }\n\n        .tooltip-row-label {\n            display: flex;\n            flex-flow: column nowrap;\n            flex: auto;\n        }\n\n        .tooltip-row-label progress {\n            height: 6px;\n            width: 100%;\n            border-radius: 0;\n        }\n\n        .tooltip-row-label progress::-webkit-progress-bar {\n            color: lightblue;\n            background-color: #eee;\n        }\n\n        .tooltip-row-label progress::-webkit-progress-value {\n            background-color: red;\n        }\n\n        .tooltip-row:not(:last-of-type) {\n            border-bottom: solid 1px #e6e7e8;\n        }\n\n        .entry-icon {\n            display: inline-block;\n            padding-right: 12px;\n        }\n\n        .entry-label {\n            display: inline-block;\n            flex: auto;\n            vertical-align: middle;\n        }\n    </style>\n    <div class=\"tooltip-container\">\n    </div>\n\n";
var iconMap = {
    'Location': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Location.png',
    'Product': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Product.png',
    'Sales Manager': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/SalesManager.png',
    'Date': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Date.png',
    'Store': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Store.png',
    'Category': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Category.png',
    'Price (fixed)': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Price.png',
    'Quantity Sold': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Quantity.png',
    'California': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Location.png',
    'Nevada': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Location.png',
    'Oregon': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Location.png',
    'Carbonated Drinks': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/CarbonatedDrinks.png',
    'Juices': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Juices.png',
    'Alcohol': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Alcohol.png',
    'Others': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Others.png',
    'Gross Margin': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/GrossMargin.png',
    'Discount': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Discount.png',
    'Original Sales Price': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Price.png',
    'City': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/City.png',
    'Info': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Info.png',
};
var tooltipEntryToRow = function (entry, withPercentageBar, max) {
    if (withPercentageBar === void 0) { withPercentageBar = false; }
    if (max === void 0) { max = 100; }
    var rowElement = rowTemplate.content.cloneNode(true);
    var iconEl = rowElement.querySelector('.entry-icon');
    var labelEl = rowElement.querySelector('.entry-label');
    iconEl.setAttribute('src', iconMap[entry.value] || iconMap[entry.title] || iconMap['Info']);
    iconEl.setAttribute('title', entry.title);
    labelEl.textContent = entry.value;
    if (withPercentageBar) {
        var numberRegexp = /[.0-9]+/;
        if (!numberRegexp.test(entry.value)) {
            return;
        }
        var percentageBar = document.createElement('progress');
        percentageBar.value = Number(/[.0-9]+/.exec(entry.value)[0]);
        percentageBar.max = max;
        var rowLabelDiv = rowElement.querySelector('.tooltip-row-label');
        // (percentageBar as HTMLElement).style['width'] = '100%';
        rowLabelDiv.appendChild(percentageBar);
    }
    return rowElement;
};
var VizTooltip = /** @class */ (function (_super) {
    __extends(VizTooltip, _super);
    function VizTooltip() {
        var _this = _super.call(this) || this;
        _this._max = 100;
        _this._color = 'lightblue';
        _this._shadowRoot = _this.attachShadow({ mode: 'open' });
        _this._shadowRoot.appendChild(containerTemplate.content.cloneNode(true));
        _this._tooltipContainer = _this._shadowRoot.querySelector('.tooltip-container');
        _this._props = {};
        _this.render();
        return _this;
    }
    VizTooltip.prototype.render = function () {
        var _this = this;
        var _a;
        this._tooltipContainer.innerHTML = '';
        if (this._props.header) {
            this._tooltipContainer.appendChild(tooltipEntryToRow(this._props.header, true, this._max));
        }
        if (this._props.details) {
            (_a = this._props.details) === null || _a === void 0 ? void 0 : _a.forEach(function (detailsRow) {
                _this._tooltipContainer.appendChild(tooltipEntryToRow(detailsRow));
            });
        }
        if (this._color) {
            var percentageColorReg = /progress::\-webkit\-progress\-value\s+\{\s+background-color:\s+[#a-z0-9]+\s?;\s+}/;
            var styleElement = this._shadowRoot.querySelector('style');
            var styleContent = styleElement.textContent.replace(percentageColorReg, "progress::-webkit-progress-value { background-color: ".concat(this._color, "; }"));
            styleElement.innerHTML = styleContent;
        }
    };
    VizTooltip.prototype.setExtensionData = function (value) {
        this._props = value;
        this.render();
    };
    Object.defineProperty(VizTooltip.prototype, "max", {
        set: function (value) {
            this._max = value;
            this.render();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VizTooltip.prototype, "color", {
        set: function (value) {
            this._color = value;
            this.render();
        },
        enumerable: false,
        configurable: true
    });
    return VizTooltip;
}(HTMLElement));
customElements.define('viz-tooltip', VizTooltip);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/VizTooltip.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidml6LXRvb2x0aXAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsZUFBZSxnQkFBZ0Isc0NBQXNDLGtCQUFrQjtBQUN2Riw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCw2QkFBNkIsOEJBQThCLCtCQUErQiwrQkFBK0IsV0FBVyxnQ0FBZ0MsNEJBQTRCLDRCQUE0Qiw4QkFBOEIsK0JBQStCLHVDQUF1QyxXQUFXLDRCQUE0QixxQ0FBcUMsa0NBQWtDLFdBQVcsOEJBQThCLHFDQUFxQyxrQ0FBa0MsV0FBVyw4QkFBOEIscUNBQXFDLGlDQUFpQyxXQUFXLCtCQUErQixxQ0FBcUMsaUNBQWlDLFdBQVcsNEJBQTRCLHFDQUFxQyxpQ0FBaUMsV0FBVywwQkFBMEIsNEJBQTRCLCtCQUErQixvQ0FBb0Msa0NBQWtDLFdBQVcsZ0NBQWdDLDRCQUE0Qix1Q0FBdUMseUJBQXlCLFdBQVcseUNBQXlDLDBCQUEwQiwwQkFBMEIsK0JBQStCLFdBQVcsK0RBQStELCtCQUErQixxQ0FBcUMsV0FBVyxpRUFBaUUsb0NBQW9DLFdBQVcsNkNBQTZDLCtDQUErQyxXQUFXLHlCQUF5QixvQ0FBb0Msa0NBQWtDLFdBQVcsMEJBQTBCLG9DQUFvQyx5QkFBeUIscUNBQXFDLFdBQVc7QUFDNTdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEMsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsY0FBYztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsOEVBQThFLHFDQUFxQyxJQUFJO0FBQ3ZIO0FBQ0Esd0hBQXdILDRDQUE0QztBQUNwSztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7VUV4SEE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dpZGdldC1hZGQtb24tc2FtcGxlcy8uL3NyYy9WaXpUb29sdGlwLnRzIiwid2VicGFjazovL3dpZGdldC1hZGQtb24tc2FtcGxlcy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3dpZGdldC1hZGQtb24tc2FtcGxlcy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vd2lkZ2V0LWFkZC1vbi1zYW1wbGVzL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHJvd1RlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcclxucm93VGVtcGxhdGUuaW5uZXJIVE1MID0gXCJcXG4gICAgPGRpdiBjbGFzcz1cXFwidG9vbHRpcC1yb3dcXFwiPlxcbiAgICAgICAgPGltZyBjbGFzcz1cXFwiZW50cnktaWNvblxcXCJcXG4gICAgICAgICAgICB3aWR0aD1cXFwiMjJcXFwiXFxuICAgICAgICAgICAgaGVpZ2h0PVxcXCIyMlxcXCJcXG4gICAgICAgID5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInRvb2x0aXAtcm93LWxhYmVsXFxcIj5cXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwiZW50cnktbGFiZWxcXFwiPjwvc3Bhbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cIjtcclxudmFyIGNvbnRhaW5lclRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcclxuY29udGFpbmVyVGVtcGxhdGUuaW5uZXJIVE1MID0gXCJcXG4gICAgPHN0eWxlPlxcbiAgICAgICAgOmhvc3Qge1xcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgICAgIG1pbi13aWR0aDogODBweDtcXG4gICAgICAgICAgICBtYXgtd2lkdGg6IDI1MHB4O1xcbiAgICAgICAgICAgIG1pbi1oZWlnaHQ6IDI0cHg7XFxuICAgICAgICB9XFxuXFxuICAgICAgICAudG9vbHRpcC1jb250YWluZXIge1xcbiAgICAgICAgICAgIHBhZGRpbmc6IDEycHg7XFxuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgICAgICBtaW4td2lkdGg6IDgwcHg7XFxuICAgICAgICAgICAgbWluLWhlaWdodDogMjRweDtcXG4gICAgICAgICAgICBmbGV4LWZsb3c6IGNvbHVtbiBub3dyYXA7XFxuICAgICAgICB9XFxuXFxuICAgICAgICAucHJpY2U6OmJlZm9yZSB7XFxuICAgICAgICAgICAgZm9udC1mYW1pbHk6IFNBUC1pY29ucztcXG4gICAgICAgICAgICBjb250ZW50OiBcXFwiXFxcXEUwMjZcXFwiO1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgLm1hbmFnZXI6OmJlZm9yZSB7XFxuICAgICAgICAgICAgZm9udC1mYW1pbHk6IFNBUC1pY29ucztcXG4gICAgICAgICAgICBjb250ZW50OiBcXFwiXFxcXEUwMzZcXFwiO1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgLnByb2R1Y3Q6OmJlZm9yZSB7XFxuICAgICAgICAgICAgZm9udC1mYW1pbHk6IFNBUC1pY29ucztcXG4gICAgICAgICAgICBjb250ZW50IFxcXCJcXFxcRTE2RFxcXCI7XFxuICAgICAgICB9XFxuXFxuICAgICAgICAubG9jYXRpb246OmJlZm9yZSB7XFxuICAgICAgICAgICAgZm9udC1mYW1pbHk6IFNBUC1pY29ucztcXG4gICAgICAgICAgICBjb250ZW50IFxcXCJcXFxcRTAyMVxcXCI7XFxuICAgICAgICB9XFxuXFxuICAgICAgICAuc3RvcmU6OmJlZm9yZSB7XFxuICAgICAgICAgICAgZm9udC1mYW1pbHk6IFNBUC1pY29ucztcXG4gICAgICAgICAgICBjb250ZW50IFxcXCJcXFxcRTAwRlxcXCI7XFxuICAgICAgICB9XFxuXFxuICAgICAgICAudG9vbHRpcC1yb3cge1xcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgICAgICAgbWluLWhlaWdodDogMzBweDtcXG4gICAgICAgICAgICBmbGV4LWZsb3c6IHJvdyBub3dyYXA7XFxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIC50b29sdGlwLXJvdy1sYWJlbCB7XFxuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgICAgICBmbGV4LWZsb3c6IGNvbHVtbiBub3dyYXA7XFxuICAgICAgICAgICAgZmxleDogYXV0bztcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIC50b29sdGlwLXJvdy1sYWJlbCBwcm9ncmVzcyB7XFxuICAgICAgICAgICAgaGVpZ2h0OiA2cHg7XFxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMDtcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIC50b29sdGlwLXJvdy1sYWJlbCBwcm9ncmVzczo6LXdlYmtpdC1wcm9ncmVzcy1iYXIge1xcbiAgICAgICAgICAgIGNvbG9yOiBsaWdodGJsdWU7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIC50b29sdGlwLXJvdy1sYWJlbCBwcm9ncmVzczo6LXdlYmtpdC1wcm9ncmVzcy12YWx1ZSB7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgLnRvb2x0aXAtcm93Om5vdCg6bGFzdC1vZi10eXBlKSB7XFxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogc29saWQgMXB4ICNlNmU3ZTg7XFxuICAgICAgICB9XFxuXFxuICAgICAgICAuZW50cnktaWNvbiB7XFxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDEycHg7XFxuICAgICAgICB9XFxuXFxuICAgICAgICAuZW50cnktbGFiZWwge1xcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICAgICAgICBmbGV4OiBhdXRvO1xcbiAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICAgICAgICB9XFxuICAgIDwvc3R5bGU+XFxuICAgIDxkaXYgY2xhc3M9XFxcInRvb2x0aXAtY29udGFpbmVyXFxcIj5cXG4gICAgPC9kaXY+XFxuXFxuXCI7XHJcbnZhciBpY29uTWFwID0ge1xyXG4gICAgJ0xvY2F0aW9uJzogJ2h0dHBzOi8vZnA2OHN0YXRpYy5jZmFwcHMuZXUxMC0wMDQuaGFuYS5vbmRlbWFuZC5jb20vc2FwLWljb25zL0xvY2F0aW9uLnBuZycsXHJcbiAgICAnUHJvZHVjdCc6ICdodHRwczovL2ZwNjhzdGF0aWMuY2ZhcHBzLmV1MTAtMDA0LmhhbmEub25kZW1hbmQuY29tL3NhcC1pY29ucy9Qcm9kdWN0LnBuZycsXHJcbiAgICAnU2FsZXMgTWFuYWdlcic6ICdodHRwczovL2ZwNjhzdGF0aWMuY2ZhcHBzLmV1MTAtMDA0LmhhbmEub25kZW1hbmQuY29tL3NhcC1pY29ucy9TYWxlc01hbmFnZXIucG5nJyxcclxuICAgICdEYXRlJzogJ2h0dHBzOi8vZnA2OHN0YXRpYy5jZmFwcHMuZXUxMC0wMDQuaGFuYS5vbmRlbWFuZC5jb20vc2FwLWljb25zL0RhdGUucG5nJyxcclxuICAgICdTdG9yZSc6ICdodHRwczovL2ZwNjhzdGF0aWMuY2ZhcHBzLmV1MTAtMDA0LmhhbmEub25kZW1hbmQuY29tL3NhcC1pY29ucy9TdG9yZS5wbmcnLFxyXG4gICAgJ0NhdGVnb3J5JzogJ2h0dHBzOi8vZnA2OHN0YXRpYy5jZmFwcHMuZXUxMC0wMDQuaGFuYS5vbmRlbWFuZC5jb20vc2FwLWljb25zL0NhdGVnb3J5LnBuZycsXHJcbiAgICAnUHJpY2UgKGZpeGVkKSc6ICdodHRwczovL2ZwNjhzdGF0aWMuY2ZhcHBzLmV1MTAtMDA0LmhhbmEub25kZW1hbmQuY29tL3NhcC1pY29ucy9QcmljZS5wbmcnLFxyXG4gICAgJ1F1YW50aXR5IFNvbGQnOiAnaHR0cHM6Ly9mcDY4c3RhdGljLmNmYXBwcy5ldTEwLTAwNC5oYW5hLm9uZGVtYW5kLmNvbS9zYXAtaWNvbnMvUXVhbnRpdHkucG5nJyxcclxuICAgICdDYWxpZm9ybmlhJzogJ2h0dHBzOi8vZnA2OHN0YXRpYy5jZmFwcHMuZXUxMC0wMDQuaGFuYS5vbmRlbWFuZC5jb20vc2FwLWljb25zL0xvY2F0aW9uLnBuZycsXHJcbiAgICAnTmV2YWRhJzogJ2h0dHBzOi8vZnA2OHN0YXRpYy5jZmFwcHMuZXUxMC0wMDQuaGFuYS5vbmRlbWFuZC5jb20vc2FwLWljb25zL0xvY2F0aW9uLnBuZycsXHJcbiAgICAnT3JlZ29uJzogJ2h0dHBzOi8vZnA2OHN0YXRpYy5jZmFwcHMuZXUxMC0wMDQuaGFuYS5vbmRlbWFuZC5jb20vc2FwLWljb25zL0xvY2F0aW9uLnBuZycsXHJcbiAgICAnQ2FyYm9uYXRlZCBEcmlua3MnOiAnaHR0cHM6Ly9mcDY4c3RhdGljLmNmYXBwcy5ldTEwLTAwNC5oYW5hLm9uZGVtYW5kLmNvbS9zYXAtaWNvbnMvQ2FyYm9uYXRlZERyaW5rcy5wbmcnLFxyXG4gICAgJ0p1aWNlcyc6ICdodHRwczovL2ZwNjhzdGF0aWMuY2ZhcHBzLmV1MTAtMDA0LmhhbmEub25kZW1hbmQuY29tL3NhcC1pY29ucy9KdWljZXMucG5nJyxcclxuICAgICdBbGNvaG9sJzogJ2h0dHBzOi8vZnA2OHN0YXRpYy5jZmFwcHMuZXUxMC0wMDQuaGFuYS5vbmRlbWFuZC5jb20vc2FwLWljb25zL0FsY29ob2wucG5nJyxcclxuICAgICdPdGhlcnMnOiAnaHR0cHM6Ly9mcDY4c3RhdGljLmNmYXBwcy5ldTEwLTAwNC5oYW5hLm9uZGVtYW5kLmNvbS9zYXAtaWNvbnMvT3RoZXJzLnBuZycsXHJcbiAgICAnR3Jvc3MgTWFyZ2luJzogJ2h0dHBzOi8vZnA2OHN0YXRpYy5jZmFwcHMuZXUxMC0wMDQuaGFuYS5vbmRlbWFuZC5jb20vc2FwLWljb25zL0dyb3NzTWFyZ2luLnBuZycsXHJcbiAgICAnRGlzY291bnQnOiAnaHR0cHM6Ly9mcDY4c3RhdGljLmNmYXBwcy5ldTEwLTAwNC5oYW5hLm9uZGVtYW5kLmNvbS9zYXAtaWNvbnMvRGlzY291bnQucG5nJyxcclxuICAgICdPcmlnaW5hbCBTYWxlcyBQcmljZSc6ICdodHRwczovL2ZwNjhzdGF0aWMuY2ZhcHBzLmV1MTAtMDA0LmhhbmEub25kZW1hbmQuY29tL3NhcC1pY29ucy9QcmljZS5wbmcnLFxyXG4gICAgJ0NpdHknOiAnaHR0cHM6Ly9mcDY4c3RhdGljLmNmYXBwcy5ldTEwLTAwNC5oYW5hLm9uZGVtYW5kLmNvbS9zYXAtaWNvbnMvQ2l0eS5wbmcnLFxyXG4gICAgJ0luZm8nOiAnaHR0cHM6Ly9mcDY4c3RhdGljLmNmYXBwcy5ldTEwLTAwNC5oYW5hLm9uZGVtYW5kLmNvbS9zYXAtaWNvbnMvSW5mby5wbmcnLFxyXG59O1xyXG52YXIgdG9vbHRpcEVudHJ5VG9Sb3cgPSBmdW5jdGlvbiAoZW50cnksIHdpdGhQZXJjZW50YWdlQmFyLCBtYXgpIHtcclxuICAgIGlmICh3aXRoUGVyY2VudGFnZUJhciA9PT0gdm9pZCAwKSB7IHdpdGhQZXJjZW50YWdlQmFyID0gZmFsc2U7IH1cclxuICAgIGlmIChtYXggPT09IHZvaWQgMCkgeyBtYXggPSAxMDA7IH1cclxuICAgIHZhciByb3dFbGVtZW50ID0gcm93VGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICB2YXIgaWNvbkVsID0gcm93RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZW50cnktaWNvbicpO1xyXG4gICAgdmFyIGxhYmVsRWwgPSByb3dFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbnRyeS1sYWJlbCcpO1xyXG4gICAgaWNvbkVsLnNldEF0dHJpYnV0ZSgnc3JjJywgaWNvbk1hcFtlbnRyeS52YWx1ZV0gfHwgaWNvbk1hcFtlbnRyeS50aXRsZV0gfHwgaWNvbk1hcFsnSW5mbyddKTtcclxuICAgIGljb25FbC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgZW50cnkudGl0bGUpO1xyXG4gICAgbGFiZWxFbC50ZXh0Q29udGVudCA9IGVudHJ5LnZhbHVlO1xyXG4gICAgaWYgKHdpdGhQZXJjZW50YWdlQmFyKSB7XHJcbiAgICAgICAgdmFyIG51bWJlclJlZ2V4cCA9IC9bLjAtOV0rLztcclxuICAgICAgICBpZiAoIW51bWJlclJlZ2V4cC50ZXN0KGVudHJ5LnZhbHVlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBwZXJjZW50YWdlQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncHJvZ3Jlc3MnKTtcclxuICAgICAgICBwZXJjZW50YWdlQmFyLnZhbHVlID0gTnVtYmVyKC9bLjAtOV0rLy5leGVjKGVudHJ5LnZhbHVlKVswXSk7XHJcbiAgICAgICAgcGVyY2VudGFnZUJhci5tYXggPSBtYXg7XHJcbiAgICAgICAgdmFyIHJvd0xhYmVsRGl2ID0gcm93RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudG9vbHRpcC1yb3ctbGFiZWwnKTtcclxuICAgICAgICAvLyAocGVyY2VudGFnZUJhciBhcyBIVE1MRWxlbWVudCkuc3R5bGVbJ3dpZHRoJ10gPSAnMTAwJSc7XHJcbiAgICAgICAgcm93TGFiZWxEaXYuYXBwZW5kQ2hpbGQocGVyY2VudGFnZUJhcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcm93RWxlbWVudDtcclxufTtcclxudmFyIFZpelRvb2x0aXAgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoVml6VG9vbHRpcCwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFZpelRvb2x0aXAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5fbWF4ID0gMTAwO1xyXG4gICAgICAgIF90aGlzLl9jb2xvciA9ICdsaWdodGJsdWUnO1xyXG4gICAgICAgIF90aGlzLl9zaGFkb3dSb290ID0gX3RoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xyXG4gICAgICAgIF90aGlzLl9zaGFkb3dSb290LmFwcGVuZENoaWxkKGNvbnRhaW5lclRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcclxuICAgICAgICBfdGhpcy5fdG9vbHRpcENvbnRhaW5lciA9IF90aGlzLl9zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy50b29sdGlwLWNvbnRhaW5lcicpO1xyXG4gICAgICAgIF90aGlzLl9wcm9wcyA9IHt9O1xyXG4gICAgICAgIF90aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIFZpelRvb2x0aXAucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICB0aGlzLl90b29sdGlwQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIGlmICh0aGlzLl9wcm9wcy5oZWFkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcENvbnRhaW5lci5hcHBlbmRDaGlsZCh0b29sdGlwRW50cnlUb1Jvdyh0aGlzLl9wcm9wcy5oZWFkZXIsIHRydWUsIHRoaXMuX21heCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fcHJvcHMuZGV0YWlscykge1xyXG4gICAgICAgICAgICAoX2EgPSB0aGlzLl9wcm9wcy5kZXRhaWxzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZm9yRWFjaChmdW5jdGlvbiAoZGV0YWlsc1Jvdykge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuX3Rvb2x0aXBDb250YWluZXIuYXBwZW5kQ2hpbGQodG9vbHRpcEVudHJ5VG9Sb3coZGV0YWlsc1JvdykpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbG9yKSB7XHJcbiAgICAgICAgICAgIHZhciBwZXJjZW50YWdlQ29sb3JSZWcgPSAvcHJvZ3Jlc3M6OlxcLXdlYmtpdFxcLXByb2dyZXNzXFwtdmFsdWVcXHMrXFx7XFxzK2JhY2tncm91bmQtY29sb3I6XFxzK1sjYS16MC05XStcXHM/O1xccyt9LztcclxuICAgICAgICAgICAgdmFyIHN0eWxlRWxlbWVudCA9IHRoaXMuX3NoYWRvd1Jvb3QucXVlcnlTZWxlY3Rvcignc3R5bGUnKTtcclxuICAgICAgICAgICAgdmFyIHN0eWxlQ29udGVudCA9IHN0eWxlRWxlbWVudC50ZXh0Q29udGVudC5yZXBsYWNlKHBlcmNlbnRhZ2VDb2xvclJlZywgXCJwcm9ncmVzczo6LXdlYmtpdC1wcm9ncmVzcy12YWx1ZSB7IGJhY2tncm91bmQtY29sb3I6IFwiLmNvbmNhdCh0aGlzLl9jb2xvciwgXCI7IH1cIikpO1xyXG4gICAgICAgICAgICBzdHlsZUVsZW1lbnQuaW5uZXJIVE1MID0gc3R5bGVDb250ZW50O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBWaXpUb29sdGlwLnByb3RvdHlwZS5zZXRFeHRlbnNpb25EYXRhID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fcHJvcHMgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShWaXpUb29sdGlwLnByb3RvdHlwZSwgXCJtYXhcIiwge1xyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21heCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShWaXpUb29sdGlwLnByb3RvdHlwZSwgXCJjb2xvclwiLCB7XHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29sb3IgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gVml6VG9vbHRpcDtcclxufShIVE1MRWxlbWVudCkpO1xyXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3Zpei10b29sdGlwJywgVml6VG9vbHRpcCk7XHJcbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG5fX3dlYnBhY2tfbW9kdWxlc19fW1wiLi9zcmMvVml6VG9vbHRpcC50c1wiXSgwLCBfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==