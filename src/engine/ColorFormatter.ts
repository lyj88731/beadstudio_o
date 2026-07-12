import type { ColorCount } from "./ColorCounter";

export default class ColorFormatter {

  render(
    list: HTMLElement,
    colors: ColorCount[]
  ) {

    list.innerHTML = "";


    for (const item of colors) {

      const row =
        document.createElement("div");


      row.style.display = "flex";
      row.style.alignItems = "center";
      row.style.gap = "8px";
      row.style.marginBottom = "6px";


      const box =
        document.createElement("span");


      box.style.width = "18px";
      box.style.height = "18px";
      box.style.display = "inline-block";

      box.style.background =
        "#" +
        item.color
          .toString(16)
          .padStart(6, "0");

      box.style.border =
        "1px solid #777";


      const text =
        document.createElement("span");


      text.textContent =
        `${item.name} : ${item.count}개`;


      row.appendChild(box);
      row.appendChild(text);


      list.appendChild(row);

    }

  }

}