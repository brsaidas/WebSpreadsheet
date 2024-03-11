/*
3|3|modelo|comprimento [m]|diâmetro [cm]|arm64|90,00|5,47|x86|80,00|4,78|
*/

function recoverData() {
  const thead = document.getElementById("thead");
  thead.innerHTML = "";

  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  const textareaValue = document.getElementById("textarea").value;
  const input = textareaValue.split('|');
  
  let row = parseInt(input[0]);
  let col = parseInt(input[1]);

  let i = 2;
  for (let j = 0; j < row; j++) {
    const tr = document.createElement("tr");

    if (j == 0) {
      for (let k = 0; k < col; k++) {
        const th = document.createElement("th");
        th.innerHTML = input[i]; 
        i++;
        tr.append(th);
      }

      thead.append(tr);
    } else {
      for (let k = 0; k < col; k++) {
        const td = document.createElement("td");
        td.innerHTML = input[i]; 
        i++;
        tr.append(td);
      }

      tbody.append(tr);
    }    
  }
}

function addColumn() {
  
}
