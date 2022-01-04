const buttons = document.querySelectorAll("button");
let map = ["0", "+", "-", "*", "/", "negative", "%", ".", "="];

let model = {
    num : '0',
    equation: '',
    getNum : function() {
        return this.num;
    },
    setNum : function(input) {
        this.num = input;
    },
    operator : '',
    negative : false
};

function updateViewToMatchModel() {
    let num = model.getNum();
    view = document.getElementById("model");
    view.innerHTML = '';
    view.appendChild(document.createTextNode(num));
}

buttons.forEach((button) => {
    // and for each one we add a 'click' listener
    button.addEventListener('click', () => {
        let num = button.getAttribute("data-num");
        if(num > 0 && num < 10) {
            let currNum = model.getNum();
            if(currNum != 0) {
                model.setNum(currNum + num);
            } else {
                model.setNum(num);
            }
            updateViewToMatchModel();
        } else if (num == 0) {
            if(button.getAttribute("class").localeCompare("top") == 0) {
                model.num = 0;
                model.operator = '';
                model.negative = false;
                updateViewToMatchModel();
            } else {
                if(model.num.localeCompare('0') != 0) {
                    model.num += "0";
                }
            }
        } else if (num > 13){
            let newOp = map[num - 9];
            switch (newOp) {
                case "negative":
                    if(typeof(model.num) == "number") {
                        model.num = "" + model.num;
                    }
                    if (model.num.localeCompare('0') != 0) {
                        if (!model.negative) {
                            model.negative = true;
                            model.num = "-" + model.num;
                        } else {
                            model.negative = false;
                            model.num = model.num.substr(1, model.num.length);
                        }
                    }
                    updateViewToMatchModel();
                break;
                case "%":
                    model.setNum(model.getNum() / 100);
                    updateViewToMatchModel();
                break;
                case ".":
                    if(!model.num.includes(".")) {
                        model.num += ".";
                    }
                    updateViewToMatchModel();
                break;
                case "=":
                    switch(model.operator) {
                        case "+":
                            model.num = parseFloat(model.equation) + parseFloat(model.num);
                        break;
                        case "-":
                            model.num = parseFloat(model.equation) - parseFloat(model.num);
                        break;
                        case "*":
                            model.num = parseFloat(model.equation) * parseFloat(model.num);
                        break;
                        case "/":
                            model.num = parseFloat(model.equation) / parseFloat(model.num);
                        break;
                        default:
                            console.log("something very bad happend");
                        break;
                    }
                    updateViewToMatchModel();
                default: 
                    console.log(newOp);
                break;
            } 
        } else {
            model.operator = map[num - 9];
            model.equation = model.num;
            model.num = '';
        }
    });
});