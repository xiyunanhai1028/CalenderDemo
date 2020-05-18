class Calender {
  constructor(options) {
    this.options = {
      element: false,
      index: 4, // 展示的月份个数
      bgColor: "#f5f5f5", // 开始结束中间颜色
      color: "#ffd101", // 选中的文字颜色
      arrayJSON: "",
      confirmBtn: "",
      callback: function () {},
      ...options,
    };
    this.init();
  }

  init() {
    if (!this.options.element || this.options.element.nodeType !== 1) return;
    const html = `
        <table class="dataZone boder-b" data-fixed="">
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
    this.options.element.innerHTML = html;
    if (this.options.arrayJSON) {
      let arr = this.options.arrayJSON.reduce((prev, current, index, data) => {
        prev.push(current.date.substring(0, current.date.length - 3));
        return prev;
      }, []);
      //去重
      arr = arr.filter((item, index, data) => {
        return data.indexOf(item) === index;
      });
      console.log(arr);
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
      arr.forEach((date, index) => {
        tHTML = `
          <div class='itemMonth border-b'>
            <p class='month'></p>
            <table class='table' style='width: 100%;position: relative'>
            <tbody class='dateTable'></tbody>
            </table>
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
        console.log("createTd:", createTd);
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
    }
  }

  //是不是闰年
  isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }
}
