const canvas = document.getElementById("graph"),
    ctx = canvas.getContext("2d");
canvas.width = canvas.clientWidth;
canvas.height = canvas.width;
let w = canvas.width, h = canvas.height;

let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, "rgb(185,121,231)");

let rValue;
let lineLength;
window.redrawGraph = drawGraph;
window.redrawPoints = redrawPoint;

function drawGraph(rValueFun) {
    rValue = rValueFun;
    ctx.clearRect(0, 0, w, h);
    let r = (w - w / 6.4) / 2;
    lineLength = w / 30;
    ctx.lineWidth = w / 300;
    ctx.strokeStyle = "black";

    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2 - 10, 15);
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2 + 10, 15);
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(w, h / 2);
    ctx.lineTo(w - 15, h / 2 - 10);
    ctx.moveTo(w, h / 2);
    ctx.lineTo(w - 15, h / 2 + 10);
    ctx.moveTo(w, h / 2);
    ctx.lineTo(0, h / 2);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(w / 2 - lineLength, h / 2 + r);
    ctx.lineTo(w / 2 + lineLength, h / 2 + r);
    ctx.moveTo(w / 2 - lineLength, h / 2 + r / 2);
    ctx.lineTo(w / 2 + lineLength, h / 2 + r / 2);
    ctx.moveTo(w / 2 - lineLength, h / 2 - r);
    ctx.lineTo(w / 2 + lineLength, h / 2 - r);
    ctx.moveTo(w / 2 - lineLength, h / 2 - r / 2);
    ctx.lineTo(w / 2 + lineLength, h / 2 - r / 2);

    ctx.moveTo(w / 2 + r, h / 2 - lineLength);
    ctx.lineTo(w / 2 + r, h / 2 + lineLength);
    ctx.moveTo(w / 2 + r / 2, h / 2 - lineLength);
    ctx.lineTo(w / 2 + r / 2, h / 2 + lineLength);
    ctx.moveTo(w / 2 - r, h / 2 - lineLength);
    ctx.lineTo(w / 2 - r, h / 2 + lineLength);
    ctx.moveTo(w / 2 - r / 2, h / 2 - lineLength);
    ctx.lineTo(w / 2 - r / 2, h / 2 + lineLength);
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(w / 2, h / 2);
    ctx.arc(w / 2, h / 2, r / 2, 1 / 2 * Math.PI, Math.PI, false);
    ctx.moveTo(w / 2, h / 2);
    ctx.lineTo(w / 2, h / 2 + r);
    ctx.lineTo(w / 2 + r, h / 2 + r);
    ctx.lineTo(w / 2 + r, h / 2);
    ctx.lineTo(w / 2, h / 2);
    ctx.lineTo(w / 2 + r / 2, h / 2);
    ctx.lineTo(w / 2, h / 2 - r);
    ctx.lineTo(w / 2, h / 2);
    ctx.fill();
    ctx.moveTo(w / 2, h / 2);
    ctx.lineTo(w / 2 - r / 2, h / 2);
    ctx.stroke();
    ctx.closePath();

    let label1, label2;
    if (isNaN(rValueFun)) {
        label1 = rValueFun
        label2 = rValueFun + '/2'
    } else {
        label1 = rValueFun
        label2 = rValueFun / 2
    }
    const fontSize = w / 40;
    ctx.fillStyle = 'black'

    ctx.font = `500 ${fontSize * 1.4}px sans-serif`;
    ctx.fillText('y', w / 2 + lineLength, 15)
    ctx.fillText('x', w - 20, h / 2 - lineLength)

    ctx.fillText('-' + label2, w / 2 + lineLength, h / 2 + r / 2);
    ctx.fillText('-' + label1, w / 2 + lineLength, h / 2 + r);
    ctx.fillText(label2, w / 2 + lineLength, h / 2 - r / 2);
    ctx.fillText(label1, w / 2 + lineLength, h / 2 - r);

    ctx.fillText(label1, w / 2 + r - lineLength, h / 2 - lineLength);
    ctx.fillText(label2, w / 2 + r / 2 - lineLength, h / 2 - lineLength);
    ctx.fillText('-' + label1, w / 2 - r - lineLength, h / 2 - lineLength);
    ctx.fillText('-' + label2, w / 2 - r / 2 - lineLength, h / 2 - lineLength);
}

console.log(h)
let xCoordinate;
let yCoordinate;
document.querySelector('#graph').onmousemove = function (event) {
    event = event || window.event
    if (typeof rValue !== 'string') {
        console.log(rValue)
        xCoordinate = ((event.offsetX - w / 2) / ((w - w / 6.4) / 2) * rValue).toFixed(2)
        yCoordinate = ((h / 2 - event.offsetY) / ((w - w / 6.4) / 2) * rValue).toFixed(2)
        document.querySelector('#yCoordinate').innerHTML = yCoordinate
        document.querySelector('#xCoordinate').innerHTML = xCoordinate
        console.log(xCoordinate)
        console.log(yCoordinate)
    }
}
document.querySelector('#graph').onclick = async function () {
    console.log(rValue)
    if (rValue == 0 || rValue === undefined || rValue === NaN) {
        alert("select the radius")
    } else {
        let x = xCoordinate;
        let y = yCoordinate;
        const responseData = await addPoint(
            [
                {name: "X", value: xCoordinate.toString()},
                {name: "Y", value: yCoordinate.toString()},
                {name: "R", value: rValue.toString()}
            ]
        );
        drawPoint(x, y, rValue)
    }
}

function drawPoint(x, y, r) {
    let res = checkCircle(x, y, r) || checkTriangle(x, y, r) || checkSquare(x, y, r);
    ctx.fillStyle = res ? "green" : "red"
    ctx.beginPath();
    ctx.arc(x * ((w - w / 6.4) / 2) / rValue + w / 2, -y * ((w - w / 6.4) / 2) / rValue + h / 2, 5, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function checkTriangle(x, y, r) {
    return 0 <= x && x <= (r) / 2 && (r) >= y && y >= 0 && Math.abs(y) / 2 + x <= (r / 2);
}

function checkCircle(x, y, r) {
    return x * x + y * y <= r * r && -r / 2 <= x && x <= 0 && 0 >= y && y >= -r / 2;
}

function checkSquare(x, y, r) {
    return r >= x && x >= 0 && 0 >= y && y >= -r;
}

function redrawPoint() {
    console.log("redraw points")
    const table = document.getElementById("result_data");
    if (table) {
        for (let item of table.rows) {
            const x = parseFloat(item.children[0].innerText.trim().replace(",", "."));
            const y = parseFloat(item.children[1].innerText.trim().replace(",", "."));
            const r = parseFloat(item.children[2].innerText.trim().replace(",", "."));
            if (isNaN(x) || isNaN(y) || isNaN(r)) continue;
            drawPoint(x, y, rValue);
        }
    }
}