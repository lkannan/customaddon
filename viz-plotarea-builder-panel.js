/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/PlotareaBuilderPanel.ts":
/*!*************************************!*\
  !*** ./src/PlotareaBuilderPanel.ts ***!
  \*************************************/
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
var plotareaFormTemplate = document.createElement("template");
plotareaFormTemplate.innerHTML = "\n    <form id=\"form\">\n        <fieldset>\n            <legend>Plotarea Properties</legend>\n            <table>\n                <tr>\n                    <td>Rounded Marker</td>\n                    <td><input id=\"bps_rounded\" type=\"checkbox\" checked></td>\n                </tr>\n                <tr>\n                    <td>Increate Size</td>\n                    <td><input id=\"bps_size_increment\" type=\"number\" value=\"0\">%</td>\n                </tr>\n                <tr>\n                    <td>Axis Label Color</td>\n                    <td><input id=\"bps_axis_label_color\" type=\"text\" size=\"10\" maxlength=\"10\" value=\"#333\"></td>\n                </tr>\n            </table>\n            <input type=\"submit\" style=\"display:none;\">\n        </fieldset>\n    </form>\n    <style>\n    :host {\n        display: block;\n        padding: 1em 1em 1em 1em;\n    }\n    </style>\n";
var VizPlotareaBuilderPanel = /** @class */ (function (_super) {
    __extends(VizPlotareaBuilderPanel, _super);
    function VizPlotareaBuilderPanel() {
        var _this = _super.call(this) || this;
        _this._shadowRoot = _this.attachShadow({ mode: "open" });
        _this._shadowRoot.appendChild(plotareaFormTemplate.content.cloneNode(true));
        _this._shadowRoot.getElementById("form").addEventListener("submit", _this._submit.bind(_this));
        _this._shadowRoot.getElementById('bps_rounded').addEventListener('change', _this._submit.bind(_this));
        _this._shadowRoot.getElementById('bps_size_increment').addEventListener('change', _this._submit.bind(_this));
        _this._shadowRoot.getElementById('bps_axis_label_color').addEventListener('change', _this._submit.bind(_this));
        return _this;
    }
    VizPlotareaBuilderPanel.prototype._submit = function (e) {
        e.preventDefault();
        this.dispatchEvent(new CustomEvent("propertiesChanged", {
            detail: {
                properties: {
                    rounded: this.rounded,
                    sizeIncrement: this.sizeIncrement,
                    axisLabelColor: this.axisLabelColor,
                }
            }
        }));
    };
    Object.defineProperty(VizPlotareaBuilderPanel.prototype, "rounded", {
        get: function () {
            return this._shadowRoot.getElementById("bps_rounded").checked;
        },
        set: function (value) {
            this._shadowRoot.getElementById("bps_rounded").checked = !!value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VizPlotareaBuilderPanel.prototype, "sizeIncrement", {
        get: function () {
            return this._shadowRoot.getElementById("bps_size_increment").value;
        },
        set: function (value) {
            this._shadowRoot.getElementById("bps_size_increment").value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VizPlotareaBuilderPanel.prototype, "axisLabelColor", {
        get: function () {
            return this._shadowRoot.getElementById("bps_axis_label_color").value;
        },
        set: function (value) {
            this._shadowRoot.getElementById("bps_axis_label_color").value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VizPlotareaBuilderPanel.prototype, "settings", {
        set: function (settings) {
            this.rounded = (settings === null || settings === void 0 ? void 0 : settings.rounded) || this.rounded;
            this.sizeIncrement = (settings === null || settings === void 0 ? void 0 : settings.sizeIncrement) || this.sizeIncrement;
            this.axisLabelColor = (settings === null || settings === void 0 ? void 0 : settings.axisLabelColor) || this.axisLabelColor;
        },
        enumerable: false,
        configurable: true
    });
    return VizPlotareaBuilderPanel;
}(HTMLElement));
customElements.define("viz-plotarea-build", VizPlotareaBuilderPanel);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/PlotareaBuilderPanel.ts"]();
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidml6LXBsb3RhcmVhLWJ1aWxkZXItcGFuZWwuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxnQkFBZ0Isc0NBQXNDLGtCQUFrQjtBQUN2Riw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxneUJBQWd5QiwrREFBK0QseUJBQXlCLG1DQUFtQyxPQUFPO0FBQ2w2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxjQUFjO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7O1VFbEZBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93aWRnZXQtYWRkLW9uLXNhbXBsZXMvLi9zcmMvUGxvdGFyZWFCdWlsZGVyUGFuZWwudHMiLCJ3ZWJwYWNrOi8vd2lkZ2V0LWFkZC1vbi1zYW1wbGVzL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vd2lkZ2V0LWFkZC1vbi1zYW1wbGVzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly93aWRnZXQtYWRkLW9uLXNhbXBsZXMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG52YXIgcGxvdGFyZWFGb3JtVGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XHJcbnBsb3RhcmVhRm9ybVRlbXBsYXRlLmlubmVySFRNTCA9IFwiXFxuICAgIDxmb3JtIGlkPVxcXCJmb3JtXFxcIj5cXG4gICAgICAgIDxmaWVsZHNldD5cXG4gICAgICAgICAgICA8bGVnZW5kPlBsb3RhcmVhIFByb3BlcnRpZXM8L2xlZ2VuZD5cXG4gICAgICAgICAgICA8dGFibGU+XFxuICAgICAgICAgICAgICAgIDx0cj5cXG4gICAgICAgICAgICAgICAgICAgIDx0ZD5Sb3VuZGVkIE1hcmtlcjwvdGQ+XFxuICAgICAgICAgICAgICAgICAgICA8dGQ+PGlucHV0IGlkPVxcXCJicHNfcm91bmRlZFxcXCIgdHlwZT1cXFwiY2hlY2tib3hcXFwiIGNoZWNrZWQ+PC90ZD5cXG4gICAgICAgICAgICAgICAgPC90cj5cXG4gICAgICAgICAgICAgICAgPHRyPlxcbiAgICAgICAgICAgICAgICAgICAgPHRkPkluY3JlYXRlIFNpemU8L3RkPlxcbiAgICAgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCBpZD1cXFwiYnBzX3NpemVfaW5jcmVtZW50XFxcIiB0eXBlPVxcXCJudW1iZXJcXFwiIHZhbHVlPVxcXCIwXFxcIj4lPC90ZD5cXG4gICAgICAgICAgICAgICAgPC90cj5cXG4gICAgICAgICAgICAgICAgPHRyPlxcbiAgICAgICAgICAgICAgICAgICAgPHRkPkF4aXMgTGFiZWwgQ29sb3I8L3RkPlxcbiAgICAgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCBpZD1cXFwiYnBzX2F4aXNfbGFiZWxfY29sb3JcXFwiIHR5cGU9XFxcInRleHRcXFwiIHNpemU9XFxcIjEwXFxcIiBtYXhsZW5ndGg9XFxcIjEwXFxcIiB2YWx1ZT1cXFwiIzMzM1xcXCI+PC90ZD5cXG4gICAgICAgICAgICAgICAgPC90cj5cXG4gICAgICAgICAgICA8L3RhYmxlPlxcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJzdWJtaXRcXFwiIHN0eWxlPVxcXCJkaXNwbGF5Om5vbmU7XFxcIj5cXG4gICAgICAgIDwvZmllbGRzZXQ+XFxuICAgIDwvZm9ybT5cXG4gICAgPHN0eWxlPlxcbiAgICA6aG9zdCB7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIHBhZGRpbmc6IDFlbSAxZW0gMWVtIDFlbTtcXG4gICAgfVxcbiAgICA8L3N0eWxlPlxcblwiO1xyXG52YXIgVml6UGxvdGFyZWFCdWlsZGVyUGFuZWwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoVml6UGxvdGFyZWFCdWlsZGVyUGFuZWwsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBWaXpQbG90YXJlYUJ1aWxkZXJQYW5lbCgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLl9zaGFkb3dSb290ID0gX3RoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogXCJvcGVuXCIgfSk7XHJcbiAgICAgICAgX3RoaXMuX3NoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQocGxvdGFyZWFGb3JtVGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xyXG4gICAgICAgIF90aGlzLl9zaGFkb3dSb290LmdldEVsZW1lbnRCeUlkKFwiZm9ybVwiKS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIF90aGlzLl9zdWJtaXQuYmluZChfdGhpcykpO1xyXG4gICAgICAgIF90aGlzLl9zaGFkb3dSb290LmdldEVsZW1lbnRCeUlkKCdicHNfcm91bmRlZCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIF90aGlzLl9zdWJtaXQuYmluZChfdGhpcykpO1xyXG4gICAgICAgIF90aGlzLl9zaGFkb3dSb290LmdldEVsZW1lbnRCeUlkKCdicHNfc2l6ZV9pbmNyZW1lbnQnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBfdGhpcy5fc3VibWl0LmJpbmQoX3RoaXMpKTtcclxuICAgICAgICBfdGhpcy5fc2hhZG93Um9vdC5nZXRFbGVtZW50QnlJZCgnYnBzX2F4aXNfbGFiZWxfY29sb3InKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBfdGhpcy5fc3VibWl0LmJpbmQoX3RoaXMpKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBWaXpQbG90YXJlYUJ1aWxkZXJQYW5lbC5wcm90b3R5cGUuX3N1Ym1pdCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJwcm9wZXJ0aWVzQ2hhbmdlZFwiLCB7XHJcbiAgICAgICAgICAgIGRldGFpbDoge1xyXG4gICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvdW5kZWQ6IHRoaXMucm91bmRlZCxcclxuICAgICAgICAgICAgICAgICAgICBzaXplSW5jcmVtZW50OiB0aGlzLnNpemVJbmNyZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgYXhpc0xhYmVsQ29sb3I6IHRoaXMuYXhpc0xhYmVsQ29sb3IsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFZpelBsb3RhcmVhQnVpbGRlclBhbmVsLnByb3RvdHlwZSwgXCJyb3VuZGVkXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NoYWRvd1Jvb3QuZ2V0RWxlbWVudEJ5SWQoXCJicHNfcm91bmRlZFwiKS5jaGVja2VkO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hhZG93Um9vdC5nZXRFbGVtZW50QnlJZChcImJwc19yb3VuZGVkXCIpLmNoZWNrZWQgPSAhIXZhbHVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShWaXpQbG90YXJlYUJ1aWxkZXJQYW5lbC5wcm90b3R5cGUsIFwic2l6ZUluY3JlbWVudFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zaGFkb3dSb290LmdldEVsZW1lbnRCeUlkKFwiYnBzX3NpemVfaW5jcmVtZW50XCIpLnZhbHVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hhZG93Um9vdC5nZXRFbGVtZW50QnlJZChcImJwc19zaXplX2luY3JlbWVudFwiKS52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShWaXpQbG90YXJlYUJ1aWxkZXJQYW5lbC5wcm90b3R5cGUsIFwiYXhpc0xhYmVsQ29sb3JcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2hhZG93Um9vdC5nZXRFbGVtZW50QnlJZChcImJwc19heGlzX2xhYmVsX2NvbG9yXCIpLnZhbHVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hhZG93Um9vdC5nZXRFbGVtZW50QnlJZChcImJwc19heGlzX2xhYmVsX2NvbG9yXCIpLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFZpelBsb3RhcmVhQnVpbGRlclBhbmVsLnByb3RvdHlwZSwgXCJzZXR0aW5nc1wiLCB7XHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoc2V0dGluZ3MpIHtcclxuICAgICAgICAgICAgdGhpcy5yb3VuZGVkID0gKHNldHRpbmdzID09PSBudWxsIHx8IHNldHRpbmdzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZXR0aW5ncy5yb3VuZGVkKSB8fCB0aGlzLnJvdW5kZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuc2l6ZUluY3JlbWVudCA9IChzZXR0aW5ncyA9PT0gbnVsbCB8fCBzZXR0aW5ncyA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2V0dGluZ3Muc2l6ZUluY3JlbWVudCkgfHwgdGhpcy5zaXplSW5jcmVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLmF4aXNMYWJlbENvbG9yID0gKHNldHRpbmdzID09PSBudWxsIHx8IHNldHRpbmdzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZXR0aW5ncy5heGlzTGFiZWxDb2xvcikgfHwgdGhpcy5heGlzTGFiZWxDb2xvcjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gVml6UGxvdGFyZWFCdWlsZGVyUGFuZWw7XHJcbn0oSFRNTEVsZW1lbnQpKTtcclxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwidml6LXBsb3RhcmVhLWJ1aWxkXCIsIFZpelBsb3RhcmVhQnVpbGRlclBhbmVsKTtcclxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbl9fd2VicGFja19tb2R1bGVzX19bXCIuL3NyYy9QbG90YXJlYUJ1aWxkZXJQYW5lbC50c1wiXSgpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9