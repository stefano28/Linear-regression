/*
* regression_app v1.0
* Copyright 2018, Stefano Leggio.
* All rights reserved.
*/

/*
    Variabili globali
*/

var input_title, btn, btn_text, container, title_x, title_y, table, tr, td, data_x, data_y, array_x = [], array_y = [], arrayRegX_x = [], arrayRegX_y = [], xM, yM, controllBlank, controllNan, k = 0, func, cor, corText, oncl = false, n, r;

/*
    Funzioni costrutto
*/


function Title(x){
    var title;
    var text;
    title = document.createElement("section");
    title.setAttribute("id", "input_title");
    text = document.createTextNode(x);
    title.appendChild(text);
    document.getElementById("input_container").appendChild(title);
}

function Button(a, b, c, d){
    btn = document.createElement("button");
    btn.setAttribute("onclick", b);
    if(d != undefined){
        btn.setAttribute("id", d);
    }
    text = document.createTextNode(a);
    btn.appendChild(text);
    document.getElementById(c).appendChild(btn);
}

function Table(a, b, c, d){
    var text1 = document.createTextNode(a);
    var text2 = document.createTextNode(b);
    var text3 = document.createTextNode(c);
    table = document.createElement("table");
    table.setAttribute("id", "data_table");
    tr0 = document.createElement("tr");
    tr0.setAttribute("id", "data_tr0");
    tr = document.createElement("tr");
    tr.setAttribute("id", "data_tr");
    th0 = document.createElement("th");
    th0.setAttribute("id", "data_th0");
    th0.setAttribute("colspan", "2");
    th1 = document.createElement("th");
    th1.setAttribute("id", "data_th1");
    th2 = document.createElement("th");
    th2.setAttribute("id", "data_th2");
    document.getElementById(d).appendChild(table);
    document.getElementById("data_table").appendChild(tr0);
    document.getElementById("data_tr0").appendChild(th0);
    document.getElementById("data_table").appendChild(tr);
    document.getElementById("data_tr").appendChild(th1);
    document.getElementById("data_tr").appendChild(th2);
    th0.appendChild(text3);
    th1.appendChild(text1);
    th2.appendChild(text2);
}

function InputContainer(){
    container = document.createElement("section");
    container.setAttribute("id", "input_container");
    document.getElementById("regression_app").appendChild(container);
}

function TableContainer(a, b){
    container = document.createElement("section");
    container.setAttribute("id", b);
    document.getElementById(a).appendChild(container);
}

function GraphContainer(){
    container = document.createElement("section");
    container.setAttribute("id", "graph_container");
    document.getElementById("regression_app").appendChild(container);
}

function ButtonContainer(){
    container = document.createElement("section");
    container.setAttribute("id", "button_container");
    document.getElementById("input_container").appendChild(container);
}

function DetailsContainer(a){
    container = document.createElement("section");
    container.setAttribute("id", "details_container");
    document.getElementById(a).appendChild(container);
}

/*
    Vista dell'utente
*/

window.onload = function() {
    Default();
    Animations();
    Start();
}

function Default(){
    title_container = document.createElement("div");
    title_container.setAttribute("id", "title");
    title = document.createTextNode("Retta di regressione");
    title_container.appendChild(title);
    author_container = document.createElement("p");
    author = document.createTextNode("Stefano Leggio");
    author_container.appendChild(author);
    title_container.appendChild(author_container);
    document.body.insertBefore(title_container, document.body.firstChild);
}

function Start(){
    title_x = document.createElement("input");
    title_y = document.createElement("input");
    title_x.setAttribute("type", "text");
    title_x.setAttribute("id", "title_x");
    title_x.setAttribute("placeholder", "Ascissa");
    title_y.setAttribute("type", "text");
    title_y.setAttribute("id", "title_y");
    title_y.setAttribute("placeholder", "Ordinata");
    InputContainer();
    Title("Inserisci il nome dei fattori da analizzare");
    document.getElementById("input_container").appendChild(title_x);
    document.getElementById("input_container").appendChild(title_y);
    ButtonContainer();
    Button("Prosegui", "Data()", "button_container");
}

function Data(){
    title_x = document.getElementById("title_x").value;
    title_y = document.getElementById("title_y").value;
    Controll(title_x, title_y);
    if(controllBlank){
        ErrorTitle();
    }else{
        document.getElementById("input_container").remove();
        Animations();
        InputContainer();
        data_x = document.createElement("input");
        data_x.setAttribute("type", "text");
        data_x.setAttribute("id", "data_x");
        data_x.setAttribute("placeholder", title_x);
        data_y = document.createElement("input");
        data_y.setAttribute("type", "text");
        data_y.setAttribute("id", "data_y");
        data_y.setAttribute("placeholder", title_y);
        Title("Inserisci i dati");
        document.getElementById("input_container").appendChild(data_x);
        document.getElementById("input_container").appendChild(data_y);
        ButtonContainer();
        Button("Aggiungi", "AddData()", "button_container");
        Button("Elimina", "RemoveData()", "button_container", "delete_button");
        Button("Esempio", "Example()", "button_container", "example_button");
        Button("Calcola", "RegressionLine()", "button_container");
    }
}

function RegressionLine(){
    if(array_x.length < 3){
        ErrorGraph();
    }else{
        document.getElementById("input_container").remove();
        Animations();
        GraphContainer();
        CreateGraph();
        details_container = document.createElement("span");
        p_func = document.createElement("p");
        p_cor = document.createElement("p");
        p_af = document.createElement("p");
        details_container.setAttribute("id", "details_container");
        details_func = document.createTextNode("Funzione retta di regressione: " + func);
        details_r =document.createTextNode("Correlazione lineare: " + cor);
        details_af =document.createTextNode("Affidabilità: " + corText + " (" + Math.round(r * 100) + "%)");
        p_func.appendChild(details_func);
        p_cor.appendChild(details_r);
        p_af.appendChild(details_af);
        details_container.appendChild(p_func);
        details_container.appendChild(p_cor);
        details_container.appendChild(p_af);
        document.getElementById("graph_container").insertBefore(details_container, document.getElementById("graph_container").childNodes[0]);
        tr3 = document.createElement("tr");
        tr3.setAttribute("id", "data_tr3");
        th3 = document.createElement("th");
        th3.setAttribute("colspan", "2");
        th3.setAttribute("id", "data_th3");
        document.getElementById("data_table").appendChild(tr3);
        document.getElementById("data_tr3").appendChild(th3);
        Button("Termina", "End()", "data_th3", "end_button");
    }
}

function End(){
    location.reload();
}

/*
    Funzioni scopo
*/

function Animations(){
    document.body.style.overflow = "hidden"; 
    setTimeout(function(){
        document.body.style.overflow = "auto"; 
     }, 2000);
}

function Controll(x, y){
    if (x == "" || y == ""){
        controllBlank = true;
    }else{
        controllBlank = false;
    }

    if (isNaN(x) || isNaN(y)){
        controllNan = true;
    }else{
        controllNan = false;
    }
}

function ErrorTitle(){
    alert("Non puoi lasciare in bianco!");
    console.log("Non puoi lasciare in bianco!");
}

function ErrorData(){
    alert("Puoi inserire solo numeri e non puoi lasciare nullo");
    console.log("Puoi inserire solo numeri e non puoi lasciare nullo");
}

function ErrorGraph(){
    alert("I dati inseriti sono troppo pochi!");
    console.log("I dati inseriti sono troppo pochi!");
}

function AddData(){
    data_x = document.getElementById("data_x").value;
    data_y = document.getElementById("data_y").value;
    Controll(data_x, data_y);

    if(controllNan || controllBlank){
        ErrorData();
    }else{
        if(k == 0){
            Animations();
            oncl = true;
            TableContainer("regression_app", "table_container");
            Table(title_x, title_y, "Dati", "table_container");
        }

        data_x = parseFloat(data_x);
        data_y = parseFloat(data_y);
        k++;
        table = document.getElementById("data_table");
        row = table.insertRow(-1);
        var cellx = row.insertCell(-1);
        var celly = row.insertCell(-1);
        cellx.innerHTML = data_x;
        celly.innerHTML = data_y;
        array_x.push(data_x);
        array_y.push(data_y);
        document.getElementById("data_x").value = "";
        document.getElementById("data_y").value = "";
    }
}

function RemoveData(){
    x = document.getElementById("data_table").rows.length;
    array_x.pop();
    array_y.pop();

    if(x > 2){
        document.getElementById("data_table").deleteRow(-1);
    }
}  

function Example(){
    array_x = [];
    array_y = [];

    if(oncl) {
        document.getElementById("table_container").remove();
    }

    Animations();
    TableContainer("regression_app", "table_container");
    title_x = "Reddito mensile";
    title_y = "Spese annuali per le ferie";
    array_x.push(1.1, 1.65, 1.92, 2.75, 3.57);
    array_y.push(0.89, 1.07, 1.78, 2.23, 2.5);
    Table(title_x, title_y, "Dati", "table_container");
    table = document.getElementById("data_table");
    n = array_x.length;

    for(var i = 0; i < n; i++){
        row = table.insertRow(-1);
        cellx = row.insertCell(-1);
        celly = row.insertCell(-1);
        cellx.innerHTML = array_x[i];
        celly.innerHTML = array_y[i];
    }

    RegressionLine();
}

function CreateGraph(){
    CalcolateRegressionLine();

    /**
    * plotly.js v1.38.1
    * Copyright 2012-2018, Plotly, Inc.
    * All rights reserved.
    * Licensed under the MIT license
    */

    var data = {
        x: array_x,
        y: array_y,
        mode: "markers",
        name: "Dati",
        type: "scatter",
        marker: { 
            size: 12,
            color: "1a9992" 
        }
      };

    var regX = {
        x: arrayRegX_x,
        y: arrayRegX_y,
        name: "Retta di regressione",
        mode: "lines",
        marker: { 
            size: 12,
            color: "ff8000"
        }
    };

    var M = {
        x: [xM],
        y: [yM],
        mode: "markers",
        name: "Punto medio",
        type: "scatter",
        marker: { 
            size: 12,
            color: "730099"
        }
    };

    var layout = {
        width: 1000,
        height: 700,
        xaxis: {
            title: "X" + " " + title_x,
            titlefont: {
              size: 15,
              color: "#7f7f7f"
            }
        },
        yaxis: {
            title: "Y" + " " + title_y,
            titlefont: {
              size: 15,
              color: '#7f7f7f'
            }
        }
    };

    var data = [data, M, regX];
    Plotly.newPlot('graph_container', data, layout, {displayModeBar: false});
}

/*
    Calcolo retta di regressione
*/

function CalcolateRegressionLine(){
    var xS = 0;
    var yS = 0;
    n = array_x.length;
    var mx;
    var my;
    var qx;
    var a;
    var b;
    var Cy;
    var coxy = 0;
    var cox = 0;
    var coy = 0;

/*
    Calcolo media
*/

    for(i = 0; i < n; i++) {
        xS += array_x[i];
        yS += array_y[i];
    }

    xM = xS / n;
    yM = yS / n;

/*
    Calcolo il coefficiente angolare m (rispetto alle ascisse e ordinate) con il metodo dei minimi quadrati
*/

    for(i = 0; i < n; i++) {
        coxy += (array_x[i] - xM) * (array_y[i] - yM);
        cox += Math.pow(array_x[i] - xM, 2);
        coy += Math.pow(array_y[i] - yM, 2);
    }

    mx = coxy / cox;
    my = coxy / coy;
    qx = yM - mx * xM;
    
/*
    Trovo le coordinate di n punti con ascissa dei dati inseriti per cui la retta di regressione passa
*/

    for(i = 0; i < n; i++) {
        Cy = mx * array_x[i] + qx;
        arrayRegX_x.push(array_x[i]);
        arrayRegX_y.push(Cy);
    }

/*
    Calcolo il coefficiente di Bravais-Pearson
*/

    r = Math.sqrt(mx * my);

    console.log("Array dei dati");
    console.log("X: " + array_x);
    console.log("Y: " +  array_y);
    console.log("");
    console.log("Array punto medio");
    console.log("X: " + xM);
    console.log("Y: " +  yM);
    console.log("");
    console.log("Array dei punti della retta");
    console.log("X: " + arrayRegX_x);
    console.log("Y: " +  arrayRegX_y);
    console.log("");
    console.log("Coefficiente angolare");
    console.log("m: " + mx);
    console.log("");
    console.log("Intercetta");
    console.log("q: " +  qx);
    console.log("");
    console.log("Coefficiente di correlazione lineare");
    console.log("r: " +  r);

    mx = mx.toFixed(3);
    qx = qx.toFixed(3);
    my = my.toFixed(3);
    r = r.toFixed(3);

    if(mx == 0){
        a = "";
    }else if(mx > 0 || mx < 0){
        a = mx + "x";
    }else if(mx == -1){
        a = "-x";
    }
    else if(mx == 1){
        a = "x";
    }

    if(qx == 0){
        b = "";
    }else if(qx > 0){
        b = " + " + qx;
    }else if(qx < 0){
        b = " - " + qx * (-1);
    }

    func = "y" + " = " + a + b; 
    cor = "r" + " = " + r;

    if(r > 0.5 || r < -0.5){
        corText = "Abbastanza affidabile";
        if(r > 0.75 || r < -0.75){
            corText = "Molto affidabile";
            if(r == 1 || r == -1){
                corText = "Massima affidabilità";
            }
        }
    }else if(r < 0.5 || r > -0.5){
        corText = "Scarsamente affidabile"
        if(r < 0.75 || r > -0.75){
            corText = "Poco affidabile"
            if(r == 0){
                corText = "Non esiste"
            }
        }
    }
}