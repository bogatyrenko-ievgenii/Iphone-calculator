class Calculator {
  constructor() {
      this.calc = document.querySelector('.calc');
      this.out = document.querySelector('.calc__result')
      this.firstNum = '';
      this.secondNum = '';
      this.operand = '';
      this.operands = document.querySelectorAll('.calc__btn_operator_side')
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
    if(event.target.textContent === '=' && this.secondNum !== '' && this.operand !== '') {
        this.getResult();
    }

    if(event.target.classList.contains('number')) {                             //numbers
        this.handleNumbers(event);
    }else if (event.target.classList.contains('calc__btn_operator_side')) {     //orange operand btns
        this.handleSideOperator(event);
    }
  }

  handleNumbers = (event) => {
    if(this.operand === '' && this.firstNum.length < 9) {
        this.firstNum += event.target.textContent;
        this.out.textContent = this.firstNum;
        console.log(this.firstNum, this.operand, this.secondNum);
    } else if (this.operand !== '' && this.secondNum.length < 9) {
        this.secondNum += event.target.textContent;
        this.out.textContent = this.secondNum;
        this.removeActiveOperator();
        console.log(this.firstNum, this.operand, this.secondNum);
        return;
    }
  }

  getResult = () => {
    if(this.firstNum === '') this.firstNum = '0';
        switch (this.operand) {
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
        this.operand = '';
        this.firstNum === Infinity || isNaN(this.firstNum) ? this.out.textContent = 'Error' : this.out.textContent = this.firstNum;
        this.out.textContent.length > 5 ? this.addSmaller() : this.removeSmaller();
  }

  AllClear = () => {
    this.firstNum = '';
    this.secondNum = '';
    this.operand = '';
    this.out.textContent = '';
    console.log(this.firstNum, this.operand, this.secondNum);

  }

  handleSideOperator = (event) => {
      if(event.target.textContent !== '=') {
        if(this.operand && this.secondNum) {
          this.getResult();
          this.out.textContent = this.firstNum;
        }
        this.operand = event.target.textContent;
        // this.out.textContent = this.operand;
        this.addActiveOperator(event);
        console.log(this.firstNum, this.operand, this.secondNum);
      }
  }

  addActiveOperator = (event) => {
    event.target.classList.add('active')
  }
  removeActiveOperator = () => {
    this.operands.forEach(item => {
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
    if (this.operand !== '') {
        this.secondNum = (-this.secondNum)
        this.out.textContent = this.secondNum;
    } else {
        this.firstNum = (-this.firstNum) 
        this.out.textContent = this.firstNum;   
    }
  }

  handleProcent = () => {
    if (this.operand !== '' && this.secondNum !== '' && this.firstNum !== '') {
        this.secondNum = (+this.firstNum) / 100 * (+this.secondNum);
        this.out.textContent = this.secondNum;
    } else if (this.firstNum !== '' && this.secondNum === '') {
        this.firstNum = (+this.firstNum) / 100;
        this.out.textContent = this.firstNum;
    }
  }
}

export default Calculator;


