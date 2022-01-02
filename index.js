let model = {
    num : '0',
    getNum : function() {
        return this.num;
    },
    setNum : function(input) {
        this.num = input;
    },
};

function updateViewToMatchModel(num) {
    view = document.getElementById("model");
    view.innerHTML = '';
    view.appendChild(document.createTextNode(num));
}

numberCat = (num) => {
    let currNum = model.getNum();
    if(currNum == 0) {
        currNum = num;
    } else {
        currNum += "" + num;
    }
    model.setNum(currNum);
    updateViewToMatchModel(currNum);
}