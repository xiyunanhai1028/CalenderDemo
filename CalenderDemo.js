class Calender {
  constructor(options) {
    this.options = {
      element: false,
      index: 4, // 展示的月份个数
      bgColor: "#eb8300", // 开始结束中间颜色
      color: "#ffd101", // 选中的文字颜色
      arrayJSON: "",
      confirmBtn: "",
      callback: function () { },
      ...options,
    };
    this.init();
  }

  init() {
    if (!this.options.element || this.options.element.nodeType !== 1) return;
    const html = `
        <table class="dateZone border-b" data-fixed="">
            <tr>
            <td class="colo">日</td>
            <td>一</td>
            <td>二</td>
            <td>三</td>
            <td>四</td>
            <td>五</td>
            <td class="colo">六</td>
            </tr>
        </table>
        <div class="tbody"></div>
        `;
    console.log(html);
    this.options.element.innerHTML = html;
    let tHTML,
      currentYear,
      currentMonth,
      setCurrentDate,
      firstDay,
      DaysInMonth = [],
      Ntd,
      Ntr,
      createTd,
      anyTd,
      p;
    if (this.options.arrayJSON) {
      let arr = this.options.arrayJSON.reduce((prev, current) => {
        prev.push(current.date.substring(0, current.date.length - 3));
        return prev;
      }, []);
      //去重
      arr = arr.filter((item, index, data) => {
        return data.indexOf(item) === index;
      });
      console.log(arr);

      arr.forEach((date, index) => {
        tHTML = `
          <div class='itemMonth border-b'>
            <p class='month'></p><table class='table' style='width: 100%;position: relative'><tbody class='dateTable'></tbody></table>
          </div>
          `;
        this.options.element
          .querySelector(".tbody")
          .insertAdjacentHTML("beforeEnd", tHTML);
        currentYear = date.substring(0, 4);
        currentMonth = date.substring(5, 7);
        setCurrentDate = new Date(currentYear, currentMonth - 1, 1);
        firstDay = setCurrentDate.getDay();
        this.options.element.querySelectorAll(".month")[
          index
        ].innerHTML = `${currentYear}年${currentMonth}月`;
        if (this.isLeapYear(currentYear)) {
          //是闰年
          DaysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        } else {
          DaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        }
        Ntd = firstDay + DaysInMonth[currentMonth - 1];
        //几行
        Ntr = Math.ceil(Ntd / 7);
        for (let i = 0; i < Ntr; i++) {
          this.options.element
            .querySelectorAll(".dateTable")
          [index].insertAdjacentHTML("beforeEnd", `<tr></tr>`);
        }

        createTd = this.options.element
          .querySelectorAll(".dateTable")
        [index].querySelectorAll("tr");
        createTd.forEach((el) => {
          for (let i = 0; i < 7; i++) {
            el.insertAdjacentHTML("beforeEnd", `<td></td>`);
          }
        });
        anyTd = this.options.element
          .querySelectorAll(".dateTable")
        [index].querySelectorAll("td");
        for (let i = 0; i < DaysInMonth[currentMonth - 1]; i++) {
          p = firstDay++;

          anyTd[p].innerHTML = `
                  <div class="con">
                      ${i + 1}
                  </div>    
                `;
          this.options.arrayJSON.forEach((el) => {
            if (
              currentMonth === el.date.substring(5, 7) &&
              currentYear === el.date.substring(0, 4) &&
              i + 1 === parseInt(el.date.substring(8, 10))
            ) {
              anyTd[p]
                .querySelector(".con")
                .insertAdjacentHTML(
                  "beforeEnd",
                  '<p class="fs10" data-id="' +
                  el.id +
                  '" data-price="' +
                  el.price +
                  '">' +
                  "<span>" +
                  el.price +
                  "</span>" +
                  "<br>" +
                  "<span>" +
                  el.number +
                  "</span>" +
                  "</p>"
                );
              anyTd[p].querySelector(".con").classList.add("border");
            }
          });
        }
      });
    } else {
      for (let i = 0; i < this.options.index; i++) {
        tHTML = `
          <div class='itemMonth  border-b'>
            <p class='month'></p><table class='table' style='width: 100%;position: relative'><tbody class='dateTable'></tbody></table>
          </div>
          `
        this.options.element
          .querySelector('.tbody')
          .insertAdjacentHTML('beforeEnd', tHTML);
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + i);
        currentYear = currentDate.getFullYear();
        currentMonth = currentDate.getMonth();
        setCurrentDate = new Date(currentYear, currentMonth, 1);
        firstDay = setCurrentDate.getDay();
        const month = currentMonth + 1;
        if (month < 10) {
          this.options.element.querySelectorAll('.month')[i].innerText =
            `${currentYear}年0${month}月`;
        } else {
          this.options.element.querySelectorAll('.month')[i].innerHTML =
            `${currentYear}年${month}月`;
        }
        if (this.isLeapYear(currentYear)) {
          DaysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        } else {
          DaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        }

        Ntd = firstDay + DaysInMonth[currentMonth];
        Ntr = Math.ceil(Ntd / 7);
        for (let j = 0; j < Ntr; j++) {
          this.options.element
            .querySelectorAll('.dateTable')[i]
            .insertAdjacentHTML('beforeEnd', `<tr></tr>`);
        }
        createTd = this.options.element.querySelectorAll('.dateTable')[i]
          .querySelectorAll('tr');
        createTd.forEach(el => {
          for (let i = 0; i < 7; i++) {
            el.insertAdjacentHTML("beforeEnd", `<td></td>`);
          }
        })
        anyTd = this.options.element.querySelectorAll('.dateTable')[i]
          .querySelectorAll('td');
        for (let i = 0; i < DaysInMonth[currentMonth]; i++) {
          anyTd[firstDay++].innerText = i + 1;
        }
      }
    }

    this.initClick();
    this.addEvent(this.options.confirmBtn, 'click', event => {
      event.preventDefault();
      this.date = "";
      this.price = "";
      this.id = "";
      this.day = [];
      const sels = this.options.element.querySelectorAll(".sel");
      sels.forEach(item => {
        const id = item.querySelector('p')
          ? item.querySelector('p').getAttribute('data-id')
          : item.innerText.substring(0, 2);
        const day = item.innerText.substring(0, 2) < 10
          ? `0${item.innerText.substring(0, 2)}`
          : item.innerText.substring(0, 2);
        console.log(item.offsetParent.previousSibling);
        console.log(typeof item.offsetParent);
        //offsetParent：返回一个指向最近的（指包含层级上的最近）包含该元素的定位元素或者最近的 table,td,th,body元素
        //previousSibling:返回当前节点的前一个兄弟节点,注意不能有空格
        const startDayArrays = item.offsetParent.previousSibling.innerText.split("");
        let startDayArrayYear = [],
          startDayArrayMonth = [],
          startDayYear = "",
          startDayMonth = "",
          date = "",
          price = "";
        for (let i = 0; i < 4; i++) {
          startDayArrayYear.push(startDayArrays[i])
        }
        startDayYear = startDayArrayYear.join("");
        for (let i = 5; i < 7; i++) {
          startDayArrayMonth.push(startDayArrays[i])
        }
        startDayMonth = startDayArrayMonth.join("");
        date = `${startDayYear}-${startDayMonth}-${day}`;
        console.log("date", date);
        price = item.querySelector('p')
          ? item.querySelector('p').getAttribute('data-price')
          : "";
        if (!this.options.arrayJSON) {
          this.day.push(date);
        } else {
          this.price = price;
          this.date = date;
          this.id = id;
        }
      });
      if (!this.options.arrayJSON) {
        if (!this.day) return;
      } else {
        if (!this.date) return;
      }
      this.callback()
    })
  }

  //是不是闰年
  isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  //点击事件
  initClick() {
    //获取当前的日期
    let strDays = new Date().getDate();
    const arr = [...this.options.element.querySelector('.tbody')
      .querySelectorAll('td')].reduce((prev, current) => {
        if (current.innerText !== '') {
          prev.push(current)
        }
        return prev;
      }, []);
    if (!this.options.arrayJSON) {
      //设置今天之前的颜色设置为灰色
      for (let i = 0; i < strDays - 1; i++) {
        arr[i].style.color = '#ccc';
      }
      //数字倒序
      let arr1 = [];
      for (var i = strDays - 1; i < arr.length; i++) {
        arr1.push(arr[i]);
      }
      this.selectDate(arr1)
    } else {
      this.selectDate(arr);
    }
  }

  selectDate(arr) {
    console.log('arr:', arr);
    for (let i = 0; i < arr.length; i++) {
      arr[i].onclick = () => {
        if (this.options.arrayJSON) {
          arr.forEach(el => {
            el.classList.remove('sel');
            el.style.color = '';
          })
          arr[i].classList.add('sel');
          arr[i].style.color = this.options.color;
        } else {
          if (arr[i].classList.contains('sel')) {
            arr[i].style.background = "";
            arr[i].style.color = "";
            arr[i].classList.remove('sel');
          } else {
            arr[i].setAttribute("data-type", "start");
            arr[i].classList.add("sel");
          }
          this.checkColor(this.options.color, this.options.bgColor);
        }
      }
    }
  }

  checkColor(color, bgColor) {
    const sel = this.options.element.querySelectorAll('.sel');
    for (let i = 0; i < sel.length; i++) {
      sel[i].style.background = bgColor;
      sel[i].style.color = color;
    }
  }

  addEvent(el, type, fn) {
    console.log("type:", type);
    console.log("el:", el);
    if (window.attachEvent) {
      el.attachEvent(`on${type}`, fn);
    } else if (window.addEventListener) {
      el.addEventListener(type, fn, false)
    } else {
      el[`on${type}`] = fn
    }
  }

  callback() {
    if (this.options.callback && typeof this.options.callback === 'function') {
      this.options.callback({
        date: this.date || "",
        price: this.price || "",
        id: this.id || "",
        day: this.day || ""
      })
    }
  }
}
