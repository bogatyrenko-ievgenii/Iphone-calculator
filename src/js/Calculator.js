class Calculator {
  constructor() {
      this.calc = document.querySelector('.calc');
      this.out = document.querySelector('.calc__result')
      this.firstNum = '';
      this.secondNum = '';
      this.operator = '';
      this.operators = document.querySelectorAll('.calc__btn_operator_side')
  }

  start = () => {
    this.addListeners();
  }

  addListeners = () => {
      this.calc.addEventListener('click', this.handleClick)
  }

  handleClick = (event) => {
    // handle output size
    this.out.textContent.length > 5 ? this.addSmaller() : this.removeSmaller();
    if(event.target.nodeName !== "BUTTON") return;
    //allClear
    if(event.target.textContent === 'AC') {
        this.AllClear();
        this.removeActiveOperator();
    }

    if(event.target.textContent === '±') this.handlePlusMinus();
    if(event.target.textContent === '%') this.handleProcent();

    //equals
    if(event.target.textContent === '=' && this.secondNum !== '' && this.operator !== '') {
        this.getResult();
    }

    if(event.target.classList.contains('number')) {                             //numbers
        this.handleNumbers(event);
    }else if (event.target.classList.contains('calc__btn_operator_side')) {     //orange operator btns
        this.handleSideOperator(event);
    }
  }

  handleNumbers = (event) => {
    if(this.operator === '' && this.firstNum.length < 9) {
        this.firstNum += event.target.textContent;
        this.out.textContent = this.firstNum;
        console.log(this.firstNum, this.operator, this.secondNum);
    } else if (this.operator !== '' && this.secondNum.length < 9) {
        this.secondNum += event.target.textContent;
        this.out.textContent = this.secondNum;
        this.removeActiveOperator();
        console.log(this.firstNum, this.operator, this.secondNum);
        return;
    }
  }

  getResult = () => {
    if(this.firstNum === '') this.firstNum = '0';
        switch (this.operator) {
            case '÷':
                this.firstNum = (+this.firstNum) / (+this.secondNum);
                break;
            case '×':
                this.firstNum = (+this.firstNum) * (+this.secondNum);
                break;
            case '-':
                this.firstNum = (+this.firstNum) - (+this.secondNum);
                break;
            case '+':
                this.firstNum = (+this.firstNum) + (+this.secondNum);
                break;
            
        }
        this.secondNum = '';
        this.operator = '';
        this.firstNum === Infinity || isNaN(this.firstNum) ? this.out.textContent = 'Error' : this.out.textContent = this.firstNum;
        this.out.textContent.length > 5 ? this.addSmaller() : this.removeSmaller();
  }

  AllClear = () => {
    this.firstNum = '';
    this.secondNum = '';
    this.operator = '';
    this.out.textContent = '';
    console.log(this.firstNum, this.operator, this.secondNum);

  }

  handleSideOperator = (event) => {
      if(event.target.textContent !== '=') {
        if(this.operator && this.secondNum) {
          this.getResult();
          this.out.textContent = this.firstNum;
        }
        this.operator = event.target.textContent;
        // this.out.textContent = this.operator;
        this.addActiveOperator(event);
        console.log(this.firstNum, this.operator, this.secondNum);
      }
  }

  addActiveOperator = (event) => {
    event.target.classList.add('active')
  }
  removeActiveOperator = () => {
    this.operators.forEach(item => {
        item.classList.remove('active');
    })
  }

  addSmaller = () => {
    this.out.classList.add('smallerText')
  }

  removeSmaller = () => {
    this.out.classList.remove('smallerText')
  }

  handlePlusMinus = () => {
    if (this.operator !== '') {
        this.secondNum = (-this.secondNum)
        this.out.textContent = this.secondNum;
    } else {
        this.firstNum = (-this.firstNum) 
        this.out.textContent = this.firstNum;   
    }
  }

  handleProcent = () => {
    if (this.operator !== '' && this.secondNum !== '' && this.firstNum !== '') {
        this.secondNum = (+this.firstNum) / 100 * (+this.secondNum);
        this.out.textContent = this.secondNum;
    } else if (this.firstNum !== '' && this.secondNum === '') {
        this.firstNum = (+this.firstNum) / 100;
        this.out.textContent = this.firstNum;
    }
  }
}

export default Calculator;


