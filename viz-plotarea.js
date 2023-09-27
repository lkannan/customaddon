/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/PlotareaOverlay.ts":
/*!********************************!*\
  !*** ./src/PlotareaOverlay.ts ***!
  \********************************/
/***/ (function() {

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
var OverlayContainerTemplate = document.createElement('template');
OverlayContainerTemplate.innerHTML = "\n    <style>\n        .chart-overlay-container {\n            position: relative;\n            pointer-events: none;\n            overflow: hidden;\n        }\n        .series-bar-column-container {\n            background-color: transparent;\n        }\n        .series-bar-column {\n            width: 100%;\n            height: 100%;\n        }\n        .axis-label-container {\n            position: absolute;\n            display: flex;\n            height: 18px;\n            flex-flow: row nowrap;\n            align-items: center;\n            justify-content: flex-end;\n            background-color: transparent;\n        }\n        .axis-label {\n            text-overflow: ellipsis;\n        }\n        .axis-label-icon {\n            padding-left: 4px;\n        }\n        .common-label {\n            position: absolute;\n            display: flex;\n            flex-flow: row nowrap;\n            align-items: center;\n        }\n    </style>\n    <div class=\"chart-overlay-container\"/>\n";
var BarColumnTemplate = document.createElement('template');
BarColumnTemplate.innerHTML = "<div class=\"series-bar-column-container\">\n</div>";
var AxisLabelTemplate = document.createElement('template');
AxisLabelTemplate.innerHTML = "\n    <span class=\"axis-label-container\">\n        <span class=\"axis-label\"></span>\n        <img class=\"axis-label-icon\"\n            width=\"22\"\n            height=\"22\"\n        >\n    </span>\n";
var iconMap = {
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
// For PoC
var ChartOverlayComponent = /** @class */ (function (_super) {
    __extends(ChartOverlayComponent, _super);
    function ChartOverlayComponent() {
        var _this = _super.call(this) || this;
        _this._rounded = true;
        _this._sizeIncrement = 0;
        _this._axisLabelColor = '#333';
        _this.shadowRoot = _this.attachShadow({ mode: 'open' });
        var container = OverlayContainerTemplate.content.cloneNode(true);
        _this._containerElement = container.querySelector('.chart-overlay-container');
        _this.shadowRoot.appendChild(container);
        return _this;
    }
    ChartOverlayComponent.prototype.render = function () {
        var _this = this;
        this._containerElement.innerHTML = '';
        var supportedChartTypes = [
            'barcolumn',
            'stackedbar',
            'line',
            'area',
        ];
        if (!supportedChartTypes.includes(this._chartType)) {
            return;
        }
        var _a = this._size, chartWidth = _a.width, chartHeight = _a.height;
        var _b = this._clipPath, clipPathY = _b.y, clipPathHeight = _b.height;
        this._containerElement.setAttribute('style', "position: relative; pointer-events: none; overflow: hidden; width: ".concat(chartWidth, "px; height: ").concat(chartHeight, "px; clip-path: inset(").concat(clipPathY, "px 0 ").concat(chartHeight - clipPathY - clipPathHeight, "px 0);"));
        this._series.forEach(function (singleSeries, index) {
            var options = {
                color: singleSeries.color,
                showAsTriangle: singleSeries.showAsTriangle,
                isLast: index === 0,
            };
            _this.renderASeries(singleSeries, options);
        });
        this.renderAxisLabels(this._xAxisLabels);
        this.renderAxisLabels(this._yAxisLabels);
        this.renderAxisStackLabels(this._xAxisStackLabels);
        this.renderAxisStackLabels(this._yAxisStackLabels);
    };
    ChartOverlayComponent.prototype.renderASeries = function (singleSeries, options) {
        var _this = this;
        singleSeries.dataPoints.forEach(function (dataPoint) {
            var dataInfo = dataPoint.dataInfo, labelInfo = dataPoint.labelInfo;
            _this.renderData(dataInfo, options);
            _this.renderLabel(labelInfo, options);
        });
    };
    ChartOverlayComponent.prototype.renderData = function (dataInfo, options) {
        if (!dataInfo) {
            return;
        }
        var x = dataInfo.x, y = dataInfo.y, width = dataInfo.width, height = dataInfo.height;
        var dataElement = BarColumnTemplate.content.cloneNode(true);
        var barColumnContainer = dataElement.querySelector('.series-bar-column-container');
        var increment = this._sizeIncrement / 100;
        var roundedStyle = '';
        if (options === null || options === void 0 ? void 0 : options.showAsTriangle) {
            var originalWidth = width;
            var originalHeight = height;
            width = height = (Math.min(originalWidth, originalHeight) / 2) * (1 + increment);
            x = width === originalWidth ? x : x + (originalWidth - width) / 2;
            y = height === originalHeight ? y : y + (originalHeight - height) / 2;
            roundedStyle = "border-radius: ".concat(height / 2 + 3, "px;");
        }
        else {
            switch (this._chartType) {
                case 'barcolumn':
                case 'stackedbar':
                    if (this._isHorizontal) {
                        height = height * (1 + increment);
                        y = y - height * increment / 2;
                        if (this._chartType === 'stackedbar' && !options.isLast) {
                            break;
                        }
                        roundedStyle = "border-radius: 0 ".concat(height / 2, "px ").concat(height / 2, "px 0;");
                    }
                    else {
                        width = width * (1 + increment);
                        x = x - width * increment / 2;
                        if (this._chartType === 'stackedbar' && !options.isLast) {
                            break;
                        }
                        roundedStyle = "border-radius: ".concat(width / 2, "px ").concat(width / 2, "px 0 0;");
                    }
                    break;
                case 'line':
                case 'area':
                    width = width * (1 + increment);
                    height = height * (1 + increment);
                    x = x - width * increment / 2;
                    y = y - height * increment / 2;
                    roundedStyle = "border-radius: ".concat(height / 2, "px;");
                    break;
            }
        }
        var color = dataInfo.color || options.color;
        var backgroundStyle = (options === null || options === void 0 ? void 0 : options.showAsTriangle) ?
            "border: ".concat(color, " solid 3px;") :
            "background-color: ".concat(color, ";");
        var barStyle = this._rounded ? "".concat(backgroundStyle, " ").concat(roundedStyle) : backgroundStyle;
        barColumnContainer.setAttribute('style', "".concat(barStyle, " position: absolute; top: ").concat(y, "px; left: ").concat(x, "px; width: ").concat(width, "px; height: ").concat(height, "px;").concat(dataInfo.opacity !== undefined ? "opacity: ".concat(dataInfo.opacity, ";") : ''));
        this._containerElement.appendChild(dataElement);
    };
    ChartOverlayComponent.prototype.renderLabel = function (labelInfo, options) {
        var _this = this;
        if (!labelInfo) {
            return;
        }
        if (Array.isArray(labelInfo)) {
            labelInfo.forEach(function (label) {
                _this.renderLabel(label, options);
            });
            return;
        }
        var x = labelInfo.x, y = labelInfo.y, width = labelInfo.width, height = labelInfo.height, varianceLabelType = labelInfo.varianceLabelType, color = labelInfo.color, fontSize = labelInfo.fontSize;
        var labelSpan = document.createElement('span');
        var bgColor = 'transparent';
        var labelColor = this._chartType.startsWith('stacked') ? '#666' : options.color;
        if (varianceLabelType !== undefined) {
            labelColor = color;
        }
        labelSpan.classList.add('common-label');
        labelSpan.setAttribute('style', "background-color: ".concat(bgColor, "; position: absolute; top: ").concat(y, "px; left: ").concat(x, "px; width: ").concat(width, "px; height: ").concat(height, "px; color: ").concat(labelColor, "; font-size: ").concat(fontSize, ";"));
        labelSpan.innerHTML = labelInfo.formattedValue;
        this._containerElement.appendChild(labelSpan);
    };
    ChartOverlayComponent.prototype._renderAxisLabel = function (label) {
        if (!label) {
            return;
        }
        var x = label.x, y = label.y, width = label.width, height = label.height, pointValue = label.pointValue, formattedValue = label.formattedValue, fontSize = label.fontSize;
        var labelEl = AxisLabelTemplate.content.cloneNode(true);
        var labelContainer = labelEl.querySelector('.axis-label-container');
        var bgColor = 'transparent';
        labelContainer.setAttribute('style', "background-color: ".concat(bgColor, "; width: ").concat(width + 36, "px; left: ").concat(x - 30, "px; top: ").concat(y - 2, "px; font-size: ").concat(fontSize, ";"));
        this._containerElement.appendChild(labelEl);
        var labelSpan = labelContainer.querySelector('.axis-label');
        var _axisLabelColor = this._axisLabelColor;
        labelSpan.setAttribute('style', "color: ".concat(_axisLabelColor));
        labelSpan.innerHTML = formattedValue;
        var iconImg = labelContainer.querySelector('img');
        iconImg.setAttribute('src', iconMap[pointValue] || iconMap.City || iconMap.Info);
    };
    ;
    ChartOverlayComponent.prototype.renderAxisLabels = function (axisLabels) {
        var _this = this;
        if (axisLabels && !Array.isArray(axisLabels)) {
            this._renderAxisLabel(axisLabels);
        }
        else {
            axisLabels.forEach(function (labels) { return _this.renderAxisLabels(labels); });
        }
    };
    ChartOverlayComponent.prototype.renderAxisStackLabel = function (stackLabelInfo) {
        if (!stackLabelInfo) {
            return;
        }
        var stackLabelSpan = document.createElement('span');
        stackLabelSpan.classList.add('common-label');
        var axisLabelColor = this._axisLabelColor;
        var bgColor = 'transparent';
        var x = stackLabelInfo.x, y = stackLabelInfo.y, width = stackLabelInfo.width, height = stackLabelInfo.height, formattedValue = stackLabelInfo.formattedValue, fontSize = stackLabelInfo.fontSize;
        stackLabelSpan.setAttribute('style', "background-color: ".concat(bgColor, "; color: ").concat(axisLabelColor, "; top: ").concat(y, "px; left: ").concat(x, "px; width: ").concat(width, "px; height: ").concat(height, "px; font-size: ").concat(fontSize, ";"));
        stackLabelSpan.textContent = formattedValue;
        this._containerElement.appendChild(stackLabelSpan);
    };
    ChartOverlayComponent.prototype.renderAxisStackLabels = function (axisStackLabels) {
        var _this = this;
        if (!axisStackLabels) {
            return;
        }
        if (axisStackLabels && !Array.isArray(axisStackLabels)) {
            this.renderAxisStackLabel(axisStackLabels);
        }
        else {
            axisStackLabels.forEach(function (stackLabels) {
                _this.renderAxisStackLabels(stackLabels);
            });
        }
    };
    ChartOverlayComponent.prototype.setExtensionData = function (extensionData) {
        var chartType = extensionData.chartType, isHorizontal = extensionData.isHorizontal, chartSize = extensionData.chartSize, clipPath = extensionData.clipPath, series = extensionData.series, xAxisLabels = extensionData.xAxisLabels, xAxisStackLabels = extensionData.xAxisStackLabels, yAxisLabels = extensionData.yAxisLabels, yAxisStackLabels = extensionData.yAxisStackLabels;
        this._size = chartSize;
        this._clipPath = clipPath;
        this._series = series;
        this._xAxisLabels = xAxisLabels;
        this._yAxisLabels = yAxisLabels;
        this._xAxisStackLabels = xAxisStackLabels;
        this._yAxisStackLabels = yAxisStackLabels;
        this._chartType = chartType;
        this._isHorizontal = isHorizontal;
        this.render();
    };
    Object.defineProperty(ChartOverlayComponent.prototype, "rounded", {
        set: function (value) {
            this._rounded = value;
            this.render();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChartOverlayComponent.prototype, "sizeIncrement", {
        set: function (value) {
            this._sizeIncrement = value;
            this.render();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChartOverlayComponent.prototype, "axisLabelColor", {
        set: function (value) {
            this._axisLabelColor = value;
            this.render();
        },
        enumerable: false,
        configurable: true
    });
    return ChartOverlayComponent;
}(HTMLElement));
customElements.define('viz-overlay', ChartOverlayComponent);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/PlotareaOverlay.ts"]();
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7VUVqUUE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dpZGdldC1hZGQtb24tc2FtcGxlcy8uL3NyYy9QbG90YXJlYU92ZXJsYXkudHMiLCJ3ZWJwYWNrOi8vd2lkZ2V0LWFkZC1vbi1zYW1wbGVzL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vd2lkZ2V0LWFkZC1vbi1zYW1wbGVzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly93aWRnZXQtYWRkLW9uLXNhbXBsZXMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG52YXIgT3ZlcmxheUNvbnRhaW5lclRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcclxuT3ZlcmxheUNvbnRhaW5lclRlbXBsYXRlLmlubmVySFRNTCA9IFwiXFxuICAgIDxzdHlsZT5cXG4gICAgICAgIC5jaGFydC1vdmVybGF5LWNvbnRhaW5lciB7XFxuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgICB9XFxuICAgICAgICAuc2VyaWVzLWJhci1jb2x1bW4tY29udGFpbmVyIHtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgICAgIH1cXG4gICAgICAgIC5zZXJpZXMtYmFyLWNvbHVtbiB7XFxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xcbiAgICAgICAgfVxcbiAgICAgICAgLmF4aXMtbGFiZWwtY29udGFpbmVyIHtcXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgICAgICBoZWlnaHQ6IDE4cHg7XFxuICAgICAgICAgICAgZmxleC1mbG93OiByb3cgbm93cmFwO1xcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgICAgIH1cXG4gICAgICAgIC5heGlzLWxhYmVsIHtcXG4gICAgICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gICAgICAgIH1cXG4gICAgICAgIC5heGlzLWxhYmVsLWljb24ge1xcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogNHB4O1xcbiAgICAgICAgfVxcbiAgICAgICAgLmNvbW1vbi1sYWJlbCB7XFxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgICAgICAgZmxleC1mbG93OiByb3cgbm93cmFwO1xcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgICAgICB9XFxuICAgIDwvc3R5bGU+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNoYXJ0LW92ZXJsYXktY29udGFpbmVyXFxcIi8+XFxuXCI7XHJcbnZhciBCYXJDb2x1bW5UZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XHJcbkJhckNvbHVtblRlbXBsYXRlLmlubmVySFRNTCA9IFwiPGRpdiBjbGFzcz1cXFwic2VyaWVzLWJhci1jb2x1bW4tY29udGFpbmVyXFxcIj5cXG48L2Rpdj5cIjtcclxudmFyIEF4aXNMYWJlbFRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcclxuQXhpc0xhYmVsVGVtcGxhdGUuaW5uZXJIVE1MID0gXCJcXG4gICAgPHNwYW4gY2xhc3M9XFxcImF4aXMtbGFiZWwtY29udGFpbmVyXFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJheGlzLWxhYmVsXFxcIj48L3NwYW4+XFxuICAgICAgICA8aW1nIGNsYXNzPVxcXCJheGlzLWxhYmVsLWljb25cXFwiXFxuICAgICAgICAgICAgd2lkdGg9XFxcIjIyXFxcIlxcbiAgICAgICAgICAgIGhlaWdodD1cXFwiMjJcXFwiXFxuICAgICAgICA+XFxuICAgIDwvc3Bhbj5cXG5cIjtcclxudmFyIGljb25NYXAgPSB7XHJcbiAgICAnQ2FsaWZvcm5pYSc6ICdodHRwczovL2ZwNjhzdGF0aWMuY2ZhcHBzLmV1MTAtMDA0LmhhbmEub25kZW1hbmQuY29tL3NhcC1pY29ucy9Mb2NhdGlvbi5wbmcnLFxyXG4gICAgJ05ldmFkYSc6ICdodHRwczovL2ZwNjhzdGF0aWMuY2ZhcHBzLmV1MTAtMDA0LmhhbmEub25kZW1hbmQuY29tL3NhcC1pY29ucy9Mb2NhdGlvbi5wbmcnLFxyXG4gICAgJ09yZWdvbic6ICdodHRwczovL2ZwNjhzdGF0aWMuY2ZhcHBzLmV1MTAtMDA0LmhhbmEub25kZW1hbmQuY29tL3NhcC1pY29ucy9Mb2NhdGlvbi5wbmcnLFxyXG4gICAgJ0NhcmJvbmF0ZWQgRHJpbmtzJzogJ2h0dHBzOi8vZnA2OHN0YXRpYy5jZmFwcHMuZXUxMC0wMDQuaGFuYS5vbmRlbWFuZC5jb20vc2FwLWljb25zL0NhcmJvbmF0ZWREcmlua3MucG5nJyxcclxuICAgICdKdWljZXMnOiAnaHR0cHM6Ly9mcDY4c3RhdGljLmNmYXBwcy5ldTEwLTAwNC5oYW5hLm9uZGVtYW5kLmNvbS9zYXAtaWNvbnMvSnVpY2VzLnBuZycsXHJcbiAgICAnQWxjb2hvbCc6ICdodHRwczovL2ZwNjhzdGF0aWMuY2ZhcHBzLmV1MTAtMDA0LmhhbmEub25kZW1hbmQuY29tL3NhcC1pY29ucy9BbGNvaG9sLnBuZycsXHJcbiAgICAnT3RoZXJzJzogJ2h0dHBzOi8vZnA2OHN0YXRpYy5jZmFwcHMuZXUxMC0wMDQuaGFuYS5vbmRlbWFuZC5jb20vc2FwLWljb25zL090aGVycy5wbmcnLFxyXG4gICAgJ0dyb3NzIE1hcmdpbic6ICdodHRwczovL2ZwNjhzdGF0aWMuY2ZhcHBzLmV1MTAtMDA0LmhhbmEub25kZW1hbmQuY29tL3NhcC1pY29ucy9Hcm9zc01hcmdpbi5wbmcnLFxyXG4gICAgJ0Rpc2NvdW50JzogJ2h0dHBzOi8vZnA2OHN0YXRpYy5jZmFwcHMuZXUxMC0wMDQuaGFuYS5vbmRlbWFuZC5jb20vc2FwLWljb25zL0Rpc2NvdW50LnBuZycsXHJcbiAgICAnT3JpZ2luYWwgU2FsZXMgUHJpY2UnOiAnaHR0cHM6Ly9mcDY4c3RhdGljLmNmYXBwcy5ldTEwLTAwNC5oYW5hLm9uZGVtYW5kLmNvbS9zYXAtaWNvbnMvUHJpY2UucG5nJyxcclxuICAgICdDaXR5JzogJ2h0dHBzOi8vZnA2OHN0YXRpYy5jZmFwcHMuZXUxMC0wMDQuaGFuYS5vbmRlbWFuZC5jb20vc2FwLWljb25zL0NpdHkucG5nJyxcclxuICAgICdJbmZvJzogJ2h0dHBzOi8vZnA2OHN0YXRpYy5jZmFwcHMuZXUxMC0wMDQuaGFuYS5vbmRlbWFuZC5jb20vc2FwLWljb25zL0luZm8ucG5nJyxcclxufTtcclxuLy8gRm9yIFBvQ1xyXG52YXIgQ2hhcnRPdmVybGF5Q29tcG9uZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKENoYXJ0T3ZlcmxheUNvbXBvbmVudCwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIENoYXJ0T3ZlcmxheUNvbXBvbmVudCgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLl9yb3VuZGVkID0gdHJ1ZTtcclxuICAgICAgICBfdGhpcy5fc2l6ZUluY3JlbWVudCA9IDA7XHJcbiAgICAgICAgX3RoaXMuX2F4aXNMYWJlbENvbG9yID0gJyMzMzMnO1xyXG4gICAgICAgIF90aGlzLnNoYWRvd1Jvb3QgPSBfdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XHJcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IE92ZXJsYXlDb250YWluZXJUZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICBfdGhpcy5fY29udGFpbmVyRWxlbWVudCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuY2hhcnQtb3ZlcmxheS1jb250YWluZXInKTtcclxuICAgICAgICBfdGhpcy5zaGFkb3dSb290LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLl9jb250YWluZXJFbGVtZW50LmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIHZhciBzdXBwb3J0ZWRDaGFydFR5cGVzID0gW1xyXG4gICAgICAgICAgICAnYmFyY29sdW1uJyxcclxuICAgICAgICAgICAgJ3N0YWNrZWRiYXInLFxyXG4gICAgICAgICAgICAnbGluZScsXHJcbiAgICAgICAgICAgICdhcmVhJyxcclxuICAgICAgICBdO1xyXG4gICAgICAgIGlmICghc3VwcG9ydGVkQ2hhcnRUeXBlcy5pbmNsdWRlcyh0aGlzLl9jaGFydFR5cGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIF9hID0gdGhpcy5fc2l6ZSwgY2hhcnRXaWR0aCA9IF9hLndpZHRoLCBjaGFydEhlaWdodCA9IF9hLmhlaWdodDtcclxuICAgICAgICB2YXIgX2IgPSB0aGlzLl9jbGlwUGF0aCwgY2xpcFBhdGhZID0gX2IueSwgY2xpcFBhdGhIZWlnaHQgPSBfYi5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5fY29udGFpbmVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgXCJwb3NpdGlvbjogcmVsYXRpdmU7IHBvaW50ZXItZXZlbnRzOiBub25lOyBvdmVyZmxvdzogaGlkZGVuOyB3aWR0aDogXCIuY29uY2F0KGNoYXJ0V2lkdGgsIFwicHg7IGhlaWdodDogXCIpLmNvbmNhdChjaGFydEhlaWdodCwgXCJweDsgY2xpcC1wYXRoOiBpbnNldChcIikuY29uY2F0KGNsaXBQYXRoWSwgXCJweCAwIFwiKS5jb25jYXQoY2hhcnRIZWlnaHQgLSBjbGlwUGF0aFkgLSBjbGlwUGF0aEhlaWdodCwgXCJweCAwKTtcIikpO1xyXG4gICAgICAgIHRoaXMuX3Nlcmllcy5mb3JFYWNoKGZ1bmN0aW9uIChzaW5nbGVTZXJpZXMsIGluZGV4KSB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgY29sb3I6IHNpbmdsZVNlcmllcy5jb2xvcixcclxuICAgICAgICAgICAgICAgIHNob3dBc1RyaWFuZ2xlOiBzaW5nbGVTZXJpZXMuc2hvd0FzVHJpYW5nbGUsXHJcbiAgICAgICAgICAgICAgICBpc0xhc3Q6IGluZGV4ID09PSAwLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBfdGhpcy5yZW5kZXJBU2VyaWVzKHNpbmdsZVNlcmllcywgb3B0aW9ucyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJBeGlzTGFiZWxzKHRoaXMuX3hBeGlzTGFiZWxzKTtcclxuICAgICAgICB0aGlzLnJlbmRlckF4aXNMYWJlbHModGhpcy5feUF4aXNMYWJlbHMpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyQXhpc1N0YWNrTGFiZWxzKHRoaXMuX3hBeGlzU3RhY2tMYWJlbHMpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyQXhpc1N0YWNrTGFiZWxzKHRoaXMuX3lBeGlzU3RhY2tMYWJlbHMpO1xyXG4gICAgfTtcclxuICAgIENoYXJ0T3ZlcmxheUNvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyQVNlcmllcyA9IGZ1bmN0aW9uIChzaW5nbGVTZXJpZXMsIG9wdGlvbnMpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHNpbmdsZVNlcmllcy5kYXRhUG9pbnRzLmZvckVhY2goZnVuY3Rpb24gKGRhdGFQb2ludCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YUluZm8gPSBkYXRhUG9pbnQuZGF0YUluZm8sIGxhYmVsSW5mbyA9IGRhdGFQb2ludC5sYWJlbEluZm87XHJcbiAgICAgICAgICAgIF90aGlzLnJlbmRlckRhdGEoZGF0YUluZm8sIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBfdGhpcy5yZW5kZXJMYWJlbChsYWJlbEluZm8sIG9wdGlvbnMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIENoYXJ0T3ZlcmxheUNvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyRGF0YSA9IGZ1bmN0aW9uIChkYXRhSW5mbywgb3B0aW9ucykge1xyXG4gICAgICAgIGlmICghZGF0YUluZm8pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgeCA9IGRhdGFJbmZvLngsIHkgPSBkYXRhSW5mby55LCB3aWR0aCA9IGRhdGFJbmZvLndpZHRoLCBoZWlnaHQgPSBkYXRhSW5mby5oZWlnaHQ7XHJcbiAgICAgICAgdmFyIGRhdGFFbGVtZW50ID0gQmFyQ29sdW1uVGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgdmFyIGJhckNvbHVtbkNvbnRhaW5lciA9IGRhdGFFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZXJpZXMtYmFyLWNvbHVtbi1jb250YWluZXInKTtcclxuICAgICAgICB2YXIgaW5jcmVtZW50ID0gdGhpcy5fc2l6ZUluY3JlbWVudCAvIDEwMDtcclxuICAgICAgICB2YXIgcm91bmRlZFN0eWxlID0gJyc7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5zaG93QXNUcmlhbmdsZSkge1xyXG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxXaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgICAgIHdpZHRoID0gaGVpZ2h0ID0gKE1hdGgubWluKG9yaWdpbmFsV2lkdGgsIG9yaWdpbmFsSGVpZ2h0KSAvIDIpICogKDEgKyBpbmNyZW1lbnQpO1xyXG4gICAgICAgICAgICB4ID0gd2lkdGggPT09IG9yaWdpbmFsV2lkdGggPyB4IDogeCArIChvcmlnaW5hbFdpZHRoIC0gd2lkdGgpIC8gMjtcclxuICAgICAgICAgICAgeSA9IGhlaWdodCA9PT0gb3JpZ2luYWxIZWlnaHQgPyB5IDogeSArIChvcmlnaW5hbEhlaWdodCAtIGhlaWdodCkgLyAyO1xyXG4gICAgICAgICAgICByb3VuZGVkU3R5bGUgPSBcImJvcmRlci1yYWRpdXM6IFwiLmNvbmNhdChoZWlnaHQgLyAyICsgMywgXCJweDtcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuX2NoYXJ0VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnYmFyY29sdW1uJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3N0YWNrZWRiYXInOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0hvcml6b250YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0ID0gaGVpZ2h0ICogKDEgKyBpbmNyZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0geSAtIGhlaWdodCAqIGluY3JlbWVudCAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jaGFydFR5cGUgPT09ICdzdGFja2VkYmFyJyAmJiAhb3B0aW9ucy5pc0xhc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdW5kZWRTdHlsZSA9IFwiYm9yZGVyLXJhZGl1czogMCBcIi5jb25jYXQoaGVpZ2h0IC8gMiwgXCJweCBcIikuY29uY2F0KGhlaWdodCAvIDIsIFwicHggMDtcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IHdpZHRoICogKDEgKyBpbmNyZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4ID0geCAtIHdpZHRoICogaW5jcmVtZW50IC8gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NoYXJ0VHlwZSA9PT0gJ3N0YWNrZWRiYXInICYmICFvcHRpb25zLmlzTGFzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcm91bmRlZFN0eWxlID0gXCJib3JkZXItcmFkaXVzOiBcIi5jb25jYXQod2lkdGggLyAyLCBcInB4IFwiKS5jb25jYXQod2lkdGggLyAyLCBcInB4IDAgMDtcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbGluZSc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICdhcmVhJzpcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IHdpZHRoICogKDEgKyBpbmNyZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCA9IGhlaWdodCAqICgxICsgaW5jcmVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB4ID0geCAtIHdpZHRoICogaW5jcmVtZW50IC8gMjtcclxuICAgICAgICAgICAgICAgICAgICB5ID0geSAtIGhlaWdodCAqIGluY3JlbWVudCAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgcm91bmRlZFN0eWxlID0gXCJib3JkZXItcmFkaXVzOiBcIi5jb25jYXQoaGVpZ2h0IC8gMiwgXCJweDtcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNvbG9yID0gZGF0YUluZm8uY29sb3IgfHwgb3B0aW9ucy5jb2xvcjtcclxuICAgICAgICB2YXIgYmFja2dyb3VuZFN0eWxlID0gKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5zaG93QXNUcmlhbmdsZSkgP1xyXG4gICAgICAgICAgICBcImJvcmRlcjogXCIuY29uY2F0KGNvbG9yLCBcIiBzb2xpZCAzcHg7XCIpIDpcclxuICAgICAgICAgICAgXCJiYWNrZ3JvdW5kLWNvbG9yOiBcIi5jb25jYXQoY29sb3IsIFwiO1wiKTtcclxuICAgICAgICB2YXIgYmFyU3R5bGUgPSB0aGlzLl9yb3VuZGVkID8gXCJcIi5jb25jYXQoYmFja2dyb3VuZFN0eWxlLCBcIiBcIikuY29uY2F0KHJvdW5kZWRTdHlsZSkgOiBiYWNrZ3JvdW5kU3R5bGU7XHJcbiAgICAgICAgYmFyQ29sdW1uQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBcIlwiLmNvbmNhdChiYXJTdHlsZSwgXCIgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IFwiKS5jb25jYXQoeSwgXCJweDsgbGVmdDogXCIpLmNvbmNhdCh4LCBcInB4OyB3aWR0aDogXCIpLmNvbmNhdCh3aWR0aCwgXCJweDsgaGVpZ2h0OiBcIikuY29uY2F0KGhlaWdodCwgXCJweDtcIikuY29uY2F0KGRhdGFJbmZvLm9wYWNpdHkgIT09IHVuZGVmaW5lZCA/IFwib3BhY2l0eTogXCIuY29uY2F0KGRhdGFJbmZvLm9wYWNpdHksIFwiO1wiKSA6ICcnKSk7XHJcbiAgICAgICAgdGhpcy5fY29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChkYXRhRWxlbWVudCk7XHJcbiAgICB9O1xyXG4gICAgQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXJMYWJlbCA9IGZ1bmN0aW9uIChsYWJlbEluZm8sIG9wdGlvbnMpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmICghbGFiZWxJbmZvKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobGFiZWxJbmZvKSkge1xyXG4gICAgICAgICAgICBsYWJlbEluZm8uZm9yRWFjaChmdW5jdGlvbiAobGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnJlbmRlckxhYmVsKGxhYmVsLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHggPSBsYWJlbEluZm8ueCwgeSA9IGxhYmVsSW5mby55LCB3aWR0aCA9IGxhYmVsSW5mby53aWR0aCwgaGVpZ2h0ID0gbGFiZWxJbmZvLmhlaWdodCwgdmFyaWFuY2VMYWJlbFR5cGUgPSBsYWJlbEluZm8udmFyaWFuY2VMYWJlbFR5cGUsIGNvbG9yID0gbGFiZWxJbmZvLmNvbG9yLCBmb250U2l6ZSA9IGxhYmVsSW5mby5mb250U2l6ZTtcclxuICAgICAgICB2YXIgbGFiZWxTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIHZhciBiZ0NvbG9yID0gJ3RyYW5zcGFyZW50JztcclxuICAgICAgICB2YXIgbGFiZWxDb2xvciA9IHRoaXMuX2NoYXJ0VHlwZS5zdGFydHNXaXRoKCdzdGFja2VkJykgPyAnIzY2NicgOiBvcHRpb25zLmNvbG9yO1xyXG4gICAgICAgIGlmICh2YXJpYW5jZUxhYmVsVHlwZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGxhYmVsQ29sb3IgPSBjb2xvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGFiZWxTcGFuLmNsYXNzTGlzdC5hZGQoJ2NvbW1vbi1sYWJlbCcpO1xyXG4gICAgICAgIGxhYmVsU3Bhbi5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgXCJiYWNrZ3JvdW5kLWNvbG9yOiBcIi5jb25jYXQoYmdDb2xvciwgXCI7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiBcIikuY29uY2F0KHksIFwicHg7IGxlZnQ6IFwiKS5jb25jYXQoeCwgXCJweDsgd2lkdGg6IFwiKS5jb25jYXQod2lkdGgsIFwicHg7IGhlaWdodDogXCIpLmNvbmNhdChoZWlnaHQsIFwicHg7IGNvbG9yOiBcIikuY29uY2F0KGxhYmVsQ29sb3IsIFwiOyBmb250LXNpemU6IFwiKS5jb25jYXQoZm9udFNpemUsIFwiO1wiKSk7XHJcbiAgICAgICAgbGFiZWxTcGFuLmlubmVySFRNTCA9IGxhYmVsSW5mby5mb3JtYXR0ZWRWYWx1ZTtcclxuICAgICAgICB0aGlzLl9jb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKGxhYmVsU3Bhbik7XHJcbiAgICB9O1xyXG4gICAgQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZS5fcmVuZGVyQXhpc0xhYmVsID0gZnVuY3Rpb24gKGxhYmVsKSB7XHJcbiAgICAgICAgaWYgKCFsYWJlbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB4ID0gbGFiZWwueCwgeSA9IGxhYmVsLnksIHdpZHRoID0gbGFiZWwud2lkdGgsIGhlaWdodCA9IGxhYmVsLmhlaWdodCwgcG9pbnRWYWx1ZSA9IGxhYmVsLnBvaW50VmFsdWUsIGZvcm1hdHRlZFZhbHVlID0gbGFiZWwuZm9ybWF0dGVkVmFsdWUsIGZvbnRTaXplID0gbGFiZWwuZm9udFNpemU7XHJcbiAgICAgICAgdmFyIGxhYmVsRWwgPSBBeGlzTGFiZWxUZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICB2YXIgbGFiZWxDb250YWluZXIgPSBsYWJlbEVsLnF1ZXJ5U2VsZWN0b3IoJy5heGlzLWxhYmVsLWNvbnRhaW5lcicpO1xyXG4gICAgICAgIHZhciBiZ0NvbG9yID0gJ3RyYW5zcGFyZW50JztcclxuICAgICAgICBsYWJlbENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgXCJiYWNrZ3JvdW5kLWNvbG9yOiBcIi5jb25jYXQoYmdDb2xvciwgXCI7IHdpZHRoOiBcIikuY29uY2F0KHdpZHRoICsgMzYsIFwicHg7IGxlZnQ6IFwiKS5jb25jYXQoeCAtIDMwLCBcInB4OyB0b3A6IFwiKS5jb25jYXQoeSAtIDIsIFwicHg7IGZvbnQtc2l6ZTogXCIpLmNvbmNhdChmb250U2l6ZSwgXCI7XCIpKTtcclxuICAgICAgICB0aGlzLl9jb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKGxhYmVsRWwpO1xyXG4gICAgICAgIHZhciBsYWJlbFNwYW4gPSBsYWJlbENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuYXhpcy1sYWJlbCcpO1xyXG4gICAgICAgIHZhciBfYXhpc0xhYmVsQ29sb3IgPSB0aGlzLl9heGlzTGFiZWxDb2xvcjtcclxuICAgICAgICBsYWJlbFNwYW4uc2V0QXR0cmlidXRlKCdzdHlsZScsIFwiY29sb3I6IFwiLmNvbmNhdChfYXhpc0xhYmVsQ29sb3IpKTtcclxuICAgICAgICBsYWJlbFNwYW4uaW5uZXJIVE1MID0gZm9ybWF0dGVkVmFsdWU7XHJcbiAgICAgICAgdmFyIGljb25JbWcgPSBsYWJlbENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcclxuICAgICAgICBpY29uSW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgaWNvbk1hcFtwb2ludFZhbHVlXSB8fCBpY29uTWFwLkNpdHkgfHwgaWNvbk1hcC5JbmZvKTtcclxuICAgIH07XHJcbiAgICA7XHJcbiAgICBDaGFydE92ZXJsYXlDb21wb25lbnQucHJvdG90eXBlLnJlbmRlckF4aXNMYWJlbHMgPSBmdW5jdGlvbiAoYXhpc0xhYmVscykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKGF4aXNMYWJlbHMgJiYgIUFycmF5LmlzQXJyYXkoYXhpc0xhYmVscykpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyQXhpc0xhYmVsKGF4aXNMYWJlbHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYXhpc0xhYmVscy5mb3JFYWNoKGZ1bmN0aW9uIChsYWJlbHMpIHsgcmV0dXJuIF90aGlzLnJlbmRlckF4aXNMYWJlbHMobGFiZWxzKTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIENoYXJ0T3ZlcmxheUNvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyQXhpc1N0YWNrTGFiZWwgPSBmdW5jdGlvbiAoc3RhY2tMYWJlbEluZm8pIHtcclxuICAgICAgICBpZiAoIXN0YWNrTGFiZWxJbmZvKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHN0YWNrTGFiZWxTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIHN0YWNrTGFiZWxTcGFuLmNsYXNzTGlzdC5hZGQoJ2NvbW1vbi1sYWJlbCcpO1xyXG4gICAgICAgIHZhciBheGlzTGFiZWxDb2xvciA9IHRoaXMuX2F4aXNMYWJlbENvbG9yO1xyXG4gICAgICAgIHZhciBiZ0NvbG9yID0gJ3RyYW5zcGFyZW50JztcclxuICAgICAgICB2YXIgeCA9IHN0YWNrTGFiZWxJbmZvLngsIHkgPSBzdGFja0xhYmVsSW5mby55LCB3aWR0aCA9IHN0YWNrTGFiZWxJbmZvLndpZHRoLCBoZWlnaHQgPSBzdGFja0xhYmVsSW5mby5oZWlnaHQsIGZvcm1hdHRlZFZhbHVlID0gc3RhY2tMYWJlbEluZm8uZm9ybWF0dGVkVmFsdWUsIGZvbnRTaXplID0gc3RhY2tMYWJlbEluZm8uZm9udFNpemU7XHJcbiAgICAgICAgc3RhY2tMYWJlbFNwYW4uc2V0QXR0cmlidXRlKCdzdHlsZScsIFwiYmFja2dyb3VuZC1jb2xvcjogXCIuY29uY2F0KGJnQ29sb3IsIFwiOyBjb2xvcjogXCIpLmNvbmNhdChheGlzTGFiZWxDb2xvciwgXCI7IHRvcDogXCIpLmNvbmNhdCh5LCBcInB4OyBsZWZ0OiBcIikuY29uY2F0KHgsIFwicHg7IHdpZHRoOiBcIikuY29uY2F0KHdpZHRoLCBcInB4OyBoZWlnaHQ6IFwiKS5jb25jYXQoaGVpZ2h0LCBcInB4OyBmb250LXNpemU6IFwiKS5jb25jYXQoZm9udFNpemUsIFwiO1wiKSk7XHJcbiAgICAgICAgc3RhY2tMYWJlbFNwYW4udGV4dENvbnRlbnQgPSBmb3JtYXR0ZWRWYWx1ZTtcclxuICAgICAgICB0aGlzLl9jb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHN0YWNrTGFiZWxTcGFuKTtcclxuICAgIH07XHJcbiAgICBDaGFydE92ZXJsYXlDb21wb25lbnQucHJvdG90eXBlLnJlbmRlckF4aXNTdGFja0xhYmVscyA9IGZ1bmN0aW9uIChheGlzU3RhY2tMYWJlbHMpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmICghYXhpc1N0YWNrTGFiZWxzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGF4aXNTdGFja0xhYmVscyAmJiAhQXJyYXkuaXNBcnJheShheGlzU3RhY2tMYWJlbHMpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQXhpc1N0YWNrTGFiZWwoYXhpc1N0YWNrTGFiZWxzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGF4aXNTdGFja0xhYmVscy5mb3JFYWNoKGZ1bmN0aW9uIChzdGFja0xhYmVscykge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMucmVuZGVyQXhpc1N0YWNrTGFiZWxzKHN0YWNrTGFiZWxzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIENoYXJ0T3ZlcmxheUNvbXBvbmVudC5wcm90b3R5cGUuc2V0RXh0ZW5zaW9uRGF0YSA9IGZ1bmN0aW9uIChleHRlbnNpb25EYXRhKSB7XHJcbiAgICAgICAgdmFyIGNoYXJ0VHlwZSA9IGV4dGVuc2lvbkRhdGEuY2hhcnRUeXBlLCBpc0hvcml6b250YWwgPSBleHRlbnNpb25EYXRhLmlzSG9yaXpvbnRhbCwgY2hhcnRTaXplID0gZXh0ZW5zaW9uRGF0YS5jaGFydFNpemUsIGNsaXBQYXRoID0gZXh0ZW5zaW9uRGF0YS5jbGlwUGF0aCwgc2VyaWVzID0gZXh0ZW5zaW9uRGF0YS5zZXJpZXMsIHhBeGlzTGFiZWxzID0gZXh0ZW5zaW9uRGF0YS54QXhpc0xhYmVscywgeEF4aXNTdGFja0xhYmVscyA9IGV4dGVuc2lvbkRhdGEueEF4aXNTdGFja0xhYmVscywgeUF4aXNMYWJlbHMgPSBleHRlbnNpb25EYXRhLnlBeGlzTGFiZWxzLCB5QXhpc1N0YWNrTGFiZWxzID0gZXh0ZW5zaW9uRGF0YS55QXhpc1N0YWNrTGFiZWxzO1xyXG4gICAgICAgIHRoaXMuX3NpemUgPSBjaGFydFNpemU7XHJcbiAgICAgICAgdGhpcy5fY2xpcFBhdGggPSBjbGlwUGF0aDtcclxuICAgICAgICB0aGlzLl9zZXJpZXMgPSBzZXJpZXM7XHJcbiAgICAgICAgdGhpcy5feEF4aXNMYWJlbHMgPSB4QXhpc0xhYmVscztcclxuICAgICAgICB0aGlzLl95QXhpc0xhYmVscyA9IHlBeGlzTGFiZWxzO1xyXG4gICAgICAgIHRoaXMuX3hBeGlzU3RhY2tMYWJlbHMgPSB4QXhpc1N0YWNrTGFiZWxzO1xyXG4gICAgICAgIHRoaXMuX3lBeGlzU3RhY2tMYWJlbHMgPSB5QXhpc1N0YWNrTGFiZWxzO1xyXG4gICAgICAgIHRoaXMuX2NoYXJ0VHlwZSA9IGNoYXJ0VHlwZTtcclxuICAgICAgICB0aGlzLl9pc0hvcml6b250YWwgPSBpc0hvcml6b250YWw7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH07XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZSwgXCJyb3VuZGVkXCIsIHtcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9yb3VuZGVkID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENoYXJ0T3ZlcmxheUNvbXBvbmVudC5wcm90b3R5cGUsIFwic2l6ZUluY3JlbWVudFwiLCB7XHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2l6ZUluY3JlbWVudCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDaGFydE92ZXJsYXlDb21wb25lbnQucHJvdG90eXBlLCBcImF4aXNMYWJlbENvbG9yXCIsIHtcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9heGlzTGFiZWxDb2xvciA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBDaGFydE92ZXJsYXlDb21wb25lbnQ7XHJcbn0oSFRNTEVsZW1lbnQpKTtcclxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCd2aXotb3ZlcmxheScsIENoYXJ0T3ZlcmxheUNvbXBvbmVudCk7XHJcbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG5fX3dlYnBhY2tfbW9kdWxlc19fW1wiLi9zcmMvUGxvdGFyZWFPdmVybGF5LnRzXCJdKCk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=