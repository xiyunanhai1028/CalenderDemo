/*
 *   by lus
 *   luszy.com
 * */
(function (window, undefined) {
  "use strict";
  var ZYCalender = function (params) {
    this.extend(this.params, params);
    this.init();
  };
  ZYCalender.prototype = {
    params: {
      element: false,
      index: 4, // 展示的月份个数
      bgColor: "#f5f5f5", // 开始结束中间颜色
      color: "#ffd101", // 选中的文字颜色
      arrayJSON: "",
      confirmBtn: "",
      callback: function () {},
    },
    init: function () {
      var self = this,
        ii,
        tHTML,
        currentYear,
        currentMonth,
        setCurrentDate,
        firstDay,
        month,
        DaysInMonth = [],
        Ntd,
        Ntr,
        createTd,
        anyTd,
        p;
      self.element = this.params.element;
      self.index = this.params.index;
      self.confirm = this.params.confirmBtn;
      self.arrayJSON = this.params.arrayJSON;
      self.dayDate = [];
      self.dayDateWeek = [];

      if (!this.params.element || this.params.element.nodeType !== 1) return;
      var html =
        "<table class='dateZone border-b' data-fixed=''>" +
        "<tr>" +
        "<td class='colo'>日</td>" +
        "<td>一</td>" +
        "<td>二</td>" +
        "<td>三</td>" +
        "<td>四</td>" +
        "<td>五</td>" +
        "<td class='colo'>六</td>" +
        "</tr>" +
        "</table>" +
        "<div class='tbody'></div>";
      self.element.innerHTML = html;
      if (self.arrayJSON) {
        var arr = [],
          index;
        self.arrayJSON.forEach(function (element, index) {
          arr.push(element.date.substring(0, element.date.length - 3));
        });
        index = self.removeRepeatArray(arr);
        console.log(index);
        for (var i = 0; i < index.length; i++) {
          ii = i;
          tHTML =
            "<div class='itemMonth border-b'>" +
            "<p class='month'></p>" +
            "<table class='table' style='width: 100%;position: relative'>" +
            "<tbody class='dateTable'></tbody>" +
            "</table>" +
            "</div>";
          self.element
            .querySelector(".tbody")
            .insertAdjacentHTML("beforeEnd", tHTML);
          currentYear = index[ii].substring(0, 4);
          currentMonth = index[ii].substring(5, 7);
          setCurrentDate = new Date(currentYear, currentMonth - 1, 1);
          firstDay = setCurrentDate.getDay();
          self.element.querySelectorAll(".month")[ii].innerHTML =
            currentYear + "年" + currentMonth + "月";
          if (self.isLeapYear(currentYear)) {
            DaysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          } else {
            DaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          }
          Ntd = firstDay + DaysInMonth[currentMonth - 1];
          Ntr = Math.ceil(Ntd / 7);
          for (var j = 0; j < Ntr; j++) {
            self.element
              .querySelectorAll(".dateTable")
              [ii].insertAdjacentHTML("beforeEnd", "<tr></tr>");
          }
          createTd = self.element
            .querySelectorAll(".dateTable")
            [ii].querySelectorAll("tr");
          console.log("createTd:", createTd);
          createTd.forEach(function (element, index) {
            for (var m = 0; m < 7; m++) {
              element.insertAdjacentHTML("beforeEnd", "<td></td>");
            }
          });
          anyTd = self.element
            .querySelectorAll(".dateTable")
            [ii].querySelectorAll("td");
          console.log("ii:", anyTd);
          for (var n = 0; n < DaysInMonth[currentMonth - 1]; n++) {
            p = firstDay++;
            anyTd[p].innerHTML = '<div class="con">' + (n + 1) + "</div>";
            self.arrayJSON.forEach(function (element) {
              if (
                currentMonth === element.date.substring(5, 7) &&
                currentYear === element.date.substring(0, 4) &&
                n + 1 === parseInt(element.date.substring(8, 10))
              ) {
                anyTd[p]
                  .querySelector(".con")
                  .insertAdjacentHTML(
                    "beforeEnd",
                    '<p class="fs10" data-id="' +
                      element.id +
                      '" data-price="' +
                      element.price +
                      '">' +
                      "<span>" +
                      element.price +
                      "</span>" +
                      "<br>" +
                      "<span>" +
                      element.number +
                      "</span>" +
                      "</p>"
                  );
                anyTd[p].querySelector(".con").classList.add("border");
              }
            });
          }
        }
      } else {
        console.log("self.index:", self.index);
        for (var i = 0; i < self.index; i++) {
          ii = i;
          tHTML =
            "<div class='itemMonth  border-b'>" +
            "<p class='month'></p>" +
            "<table class='table' style='width: 100%;position: relative'>" +
            "<tbody class='dateTable'></tbody>" +
            "</table>" +
            "</div>";
          self.element
            .querySelector(".tbody")
            .insertAdjacentHTML("beforeEnd", tHTML);
          var currentDate = new Date();
          currentDate.setMonth(currentDate.getMonth() + ii);
          currentYear = currentDate.getFullYear();
          currentMonth = currentDate.getMonth();
          setCurrentDate = new Date(currentYear, currentMonth, 1);
          firstDay = setCurrentDate.getDay();
          month = currentMonth + 1;
          if (month < 10) {
            self.element.querySelectorAll(".month")[ii].innerHTML =
              currentYear + "年" + "0" + month + "月";
          } else {
            self.element.querySelectorAll(".month")[ii].innerHTML =
              currentYear + "年" + month + "月";
          }
          if (self.isLeapYear(currentYear)) {
            DaysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          } else {
            DaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          }

          Ntd = firstDay + DaysInMonth[currentMonth];
          Ntr = Math.ceil(Ntd / 7);
          for (var j = 0; j < Ntr; j++) {
            self.element
              .querySelectorAll(".dateTable")
              [ii].insertAdjacentHTML("beforeEnd", "<tr></tr>");
          }
          createTd = self.element
            .querySelectorAll(".dateTable")
            [ii].querySelectorAll("tr");
          createTd.forEach(function (element, index) {
            for (var m = 0; m < 7; m++) {
              element.insertAdjacentHTML("beforeEnd", "<td></td>");
            }
          });
          anyTd = self.element
            .querySelectorAll(".dateTable")
            [ii].querySelectorAll("td");
          for (var n = 0; n < DaysInMonth[currentMonth]; n++) {
            anyTd[firstDay++].innerText = n + 1;
          }
        }
      }
      self.initSelect();
      self.addEvent(self.confirm, "click", function (event) {
        event.preventDefault();
        self.date = "";
        self.price = "";
        self.id = "";
        self.day = [];
        var sels = self.element.querySelectorAll(".sel");
        for (var u = 0; u < sels.length; u++) {
          var id = sels[u].querySelector("p")
            ? sels[u].querySelector("p").getAttribute("data-id")
            : "";
          var day =
            sels[u].innerText.substring(0, 2) < 10
              ? "0" + sels[u].innerText.substring(0, 2)
              : sels[u].innerText.substring(0, 2);
          var startDayArrays = sels[
            u
          ].offsetParent.previousSibling.innerText.split("");
          var startDayArrayYear = [],
            startDayArrayMonth = [],
            startDayYear = "",
            startDayMonth = "",
            date = "",
            price = "";
          for (var g = 0; g < 4; g++) {
            startDayArrayYear.push(startDayArrays[g]);
          }
          startDayYear = startDayArrayYear.join("");
          for (var f = 5; f < 7; f++) {
            startDayArrayMonth.push(startDayArrays[f]);
          }
          startDayMonth = startDayArrayMonth.join("");
          date = startDayYear + "-" + startDayMonth + "-" + day;
          price = sels[u].querySelector("p")
            ? sels[u].querySelector("p").getAttribute("data-price")
            : "";

          if (!self.arrayJSON) {
            self.day.push(date);
          } else {
            self.price = price;
            self.date = date;
            self.id = id;
          }
        }
        if (!self.arrayJSON) {
          if (!self.day) return;
        } else {
          if (!self.date) return;
        }
        self.callback();
      });
    },
    initSelect: function () {
      var self = this;
      var strDays = new Date().getDate();
      var arry = [];
      var arry1 = [];
      self.element
        .querySelector(".tbody")
        .querySelectorAll("td")
        .forEach(function (element, index) {
          if (element.innerText !== "") {
            arry.push(element);
          }
        });
      if (!self.arrayJSON) {
        for (var i = 0; i < strDays - 1; i++) {
          arry[i].style.color = "#ccc";
        }
        for (var i = strDays - 1; i < arry.length; i++) {
          arry1.push(arry[i]);
        }
        self.selectDate(arry1);
      } else {
        self.selectDate(arry);
      }
    },
    isLeapYear: function (year) {
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    },
    selectDate: function (arry1) {
      var self = this;
      self.bgColor = self.params.bgColor;
      self.color = self.params.color;
      self.element = self.params.element;

      for (var i = 0; i < arry1.length; i++) {
        (function (j) {
          arry1[j].onclick = function () {
            if (self.arrayJSON) {
              arry1.forEach(function (element, index) {
                element.classList.remove("sel");
                element.style.color = "";
              });
              arry1[j].classList.add("sel");
              arry1[j].style.color = self.color;
            } else {
              if (arry1[j].classList.contains("sel")) {
                arry1[j].style.background = "";
                arry1[j].style.color = "";
                arry1[j].classList.remove("sel");
              } else {
                arry1[j].setAttribute("data-type", "start");
                arry1[j].classList.add("sel");
              }
              self.checkColor(self.color, self.bgColor);
            }
          };
        })(i);
      }
    },
    callback: function () {
      var self = this;
      if (self.params.callback && typeof self.params.callback === "function") {
        self.params.callback({
          date: self.date || "",
          price: self.price || "",
          id: self.id || "",
          day: self.day || "",
        });
      }
    },
    checkColor: function (color, bgColor) {
      var self = this;
      var sel = self.element.querySelectorAll(".sel");
      for (var i = 0; i < sel.length; i++) {
        sel[i].style.background = bgColor;
        sel[i].style.color = color;
      }
    },
    removeRepeatArray: function (arr) {
      return arr.filter(function (item, index, self) {
        return self.indexOf(item) === index;
      });
    },
    addEvent: function (elm, type, fn) {
      if (window.attachEvent) {
        elm.attachEvent("on" + type, fn);
      } else if (window.addEventListener) {
        elm.addEventListener(type, fn, false);
      } else {
        elm["on" + type] = fn;
      }
    },
    extend: function (a, b) {
      for (var key in b) {
        if (b.hasOwnProperty(key)) {
          a[key] = b[key];
        }
      }
      return a;
    },
  };
  window.ZYCalender = ZYCalender;
})(window);
