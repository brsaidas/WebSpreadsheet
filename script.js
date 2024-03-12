/*
3|3|modelo|comprimento [m]|diâmetro [cm]|arm64|90,00|5,47|x86|80,00|4,78|

3|3||comprimento [m]|diâmetro [cm]||90,00|5,47||80,00|4,78|
*/

let inputData = ["1", "1", ""], row = 1, col = 1;

function loadData() {
  const textarea = document.getElementById("textarea");
  const textareaValue = textarea.value;

  inputData = textareaValue.split("|");
  row = parseInt(inputData[0]);
  col = parseInt(inputData[1]);

  displayTable();
}

function displayTable() {
  const thead = document.getElementById("thead");
  thead.innerHTML = "";

  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  let i = 2;
  for (let j = 0; j < row; j++) {
    const tr = document.createElement("tr");

    if (j == 0) {
      for (let k = 0; k < col; k++) {
        if (k == 0) {
          const th = document.createElement("th");
          tr.append(th);
        } else {
          const input = document.createElement("input");
          input.id = "cell_" + j + "_" + k;
          input.onchange = () => { saveEditions(); };
          input.value = inputData[i];

          const th = document.createElement("th");
          th.append(input);

          tr.append(th);
        }

        i++;
      }

      thead.append(tr);
    } else {
      for (let k = 0; k < col; k++) {
        if (k == 0) {
          const button = document.createElement("button");
          button.onclick = () => { deleteRow(j); };
          button.innerHTML = "X";

          const td = document.createElement("td");
          td.append(button);

          tr.append(td);
        } else {
          const input = document.createElement("input");
          input.id = "cell_" + j + "_" + k;
          input.onchange = () => { saveEditions(); };
          input.value = inputData[i];

          const td = document.createElement("td");
          td.append(input);

          tr.append(td);
        }

        i++;
      }

      tbody.append(tr);
    }    
  }
}

function addColumn() {
  col++;

  let aux = 1;
  for (let i = 0; i < row; i++) {
    inputData.splice(aux + col, 0, "");
    aux += col;
  }

  displayTable();
  saveEditions();
}

function saveEditions() {
  let output = row + "|" + col + "|";

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (j == 0) {
        output += "|";
      } else {
        const element = document.getElementById("cell_" + i + "_" + j);      
        output += element.value + "|";
      }
    }
  }

  document.getElementById("textarea").value = output;

  loadData();
}

function deleteColumn() {
  const deleteColumnValue = document.getElementById("deleteColumn").value;

  let pos = -1;
  for (let i = 2; i <= col + 1; i++) {
    if (inputData[i] == deleteColumnValue) {
      pos = i;
      break;
    }
  }

  if (pos == -1) {
    alert("Coluna não encontrada. Verifique o nome da coluna.");
  } else {
    for (let i = 0; i < row; i++) {
      inputData.splice(pos + i * col, 1);
    }

    col--;

    displayTable();
    saveEditions();
  }
}

function addRow() {
  if (col >= 2) {
    for (let i = 0; i < col; i++)
      inputData.push("");

    row++;

    displayTable();
    saveEditions();
  } else {
    alert("Adicione ao menos 1 coluna antes de adicionar uma linha.");
  }
}

function deleteRow(r) {
  inputData.splice(2 + r * col, col);
  row--;

  displayTable();
  saveEditions(); 
}
