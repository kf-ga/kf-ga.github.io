class Pexeso {
    constructor(app, n) {
        this.app = app;
        this.back="💠";
        this.symbols = ['💐','🌸','💮','🪷','🏵️','🌹','🥀','🌺','🌻','🌼','🌷','🪻','🌱','🪴','🌲','🌳','🌴','🌵','🌾','🌿','☘️','🍀','🍁','🍂','🍃','🍄','🪨','🪵','🐌','🦋','🐛','🐜','🐝','🪲','🐞'];
        this.reset(n);
    }

    reset(n) {
        // Check for data validity
        if (this.symbols.length < (n**2)/2) {
            console.error("There are not enough symbols for this game, expecting at least " + (n**2)/2 + " symbols, got "+this.symbols.length+" symbols");
            return;
        }
        if (n**2 % 2!= 0) {
            console.error("Number of cards must be even");
            return;
        }

        this.n=n;
        this.app.innerHTML="";

        // create game
        this.createMatrix();
        this.createFrame(this.app)
        
        // initial state
        this.activePlayer=1;
        this.moveCounter=1;
        this.playerScore=[0,0];
        this.switchPlayer();
        this.updateUI();
        this.flippedList=[];
        this.lockGame=false;
    }

    checkWin() {
        if (this.playerScore.reduce((acc, curr) => acc + curr, 0) == this.n**2/2) {
            if (this.playerScore[0]==this.playerScore[1]) {
                alert("Konec hry! Remíza!");
            }
            if (this.playerScore[0]>this.playerScore[1]) {
                alert("Konec hry! Vyhrál hráč 1!");
            }
            if (this.playerScore[0]<this.playerScore[1]) {
                alert("Konec hry! Vyhrál hráč 2!");
            }
        }
    }

    switchPlayer() {
        this.divPlayer[this.activePlayer].classList.remove('active');
        this.activePlayer = (this.activePlayer+1) % 2;
        this.divPlayer[this.activePlayer].classList.add('active');

    }
    updateUI() {
        for (let i = 0; i < 2; i++) {
            this.divPlayer[i].innerHTML="Hráč "+(i+1)+": "+this.playerScore[i];
        }       
        this.divMoves.innerHTML="Tah: "+this.moveCounter;
    }

    createMatrix() {
        this.matrix=[];
        let requiredSymbols = this.n ** 2 / 2;
        this.usedSymbols = this.symbols.slice(0, requiredSymbols);
        
        let use={};
        for (let symbol of this.usedSymbols) {
            use[symbol] = 0;
        }
        for (let i = 0; i < this.n; i++) {
            this.matrix[i] = [];
            for (let j = 0; j < this.n; j++) {
                while (true) {
                    let idx=Math.floor(Math.random() * this.usedSymbols.length);
                    let symbol = this.usedSymbols[idx];
                    if (use[symbol] < 2) {
                        this.matrix[i][j] = symbol;
                        use[symbol] += 1;
                        break;
                    }
                }
            }
        }
    }
 
    createFrame (container) {
        // main game board
        this.divGame = document.createElement('div');
        this.divGame.classList.add('game');
        this.divGame.style.gridTemplateColumns = `repeat(${this.n}, 1fr)`;
        this.divGame.style.gridTemplateRows = `repeat(${this.n}, 1fr)`;
        container.appendChild(this.divGame);

        // score board
        this.divScore = document.createElement('div');
        this.divScore.classList.add('score');

        this.divMoves = document.createElement('div');
        this.divScore.appendChild(this.divMoves);

        // player tabs
        this.divPlayer=[];
        for (let i=0; i<2; i++) {
            let divP = document.createElement('div');
            this.divPlayer.push(divP);
            this.divScore.appendChild(divP);
        }
        
        // new game
        this.divNew = document.createElement('div');
        this.divNew.classList.add('new');
        this.divNewSelect = document.createElement('select');
        for (let n of [2, 3, 4, 6, 8, 10]) {
            let option = document.createElement('option');
            option.value = n;
            option.innerHTML = n+" x "+n;
            if (n == this.n) {
                option.selected = true;
            }
            this.divNewSelect.appendChild(option);
        }
        this.divNewButton = document.createElement('button');
        this.divNewButton.innerHTML = "Nová hra";
        this.divNew.appendChild(this.divNewButton);
        this.divNew.appendChild(this.divNewSelect);
        this.divNewButton.addEventListener('click', () => {
            this.reset(this.divNewSelect.value);
        });

        
        this.divScore.appendChild(this.divNew);
        

        container.appendChild(this.divScore);

        // game matrix
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                const divPex = document.createElement('div');
                divPex.classList.add('pex');
                divPex.dataset.i=i;
                divPex.dataset.j=j;

                const divPexIn = document.createElement('div');
                divPexIn.classList.add('in');
                divPex.appendChild(divPexIn)

                const divFront = document.createElement('div');
                divFront.classList.add('front');
                divFront.innerHTML = this.matrix[i][j];
                
                const divBack = document.createElement('div');
                divBack.classList.add('back');
                divBack.innerHTML = this.back;

                divPexIn.appendChild(divFront);
                divPexIn.appendChild(divBack);
                divPexIn.addEventListener('click', () => this.flip(divPex));
                this.divGame.appendChild(divPex)
            }
        }
    }

    unflip (div) {
        div.classList.remove('flipped');
    }

    flip (div) {
        if (!this.lockGame && !div.classList.contains('flipped')) {
            if (this.flippedList.length < 2) {
                div.classList.add('flipped');
                this.flippedList.push(div);
            }
            if (this.flippedList.length == 2) {
                this.moveCounter += 1;
                this.lockGame = true;
                if (this.matrix[this.flippedList[0].dataset.i][this.flippedList[0].dataset.j] == this.matrix[this.flippedList[1].dataset.i][this.flippedList[1].dataset.j]) {
                    setTimeout(() => {
                        for (let fdiv of this.flippedList) {
                            fdiv.classList.add("matched");
                        }
                        this.playerScore[this.activePlayer] += 1;
                        this.flippedList = [];
                        this.updateUI();
                        this.checkWin();
                        this.lockGame = false;
                    }, 1000)

                }
                else {
                    setTimeout(() => {
                        for (let fdiv of this.flippedList) {
                            this.unflip(fdiv);
                        }
                        this.flippedList = [];
                        this.switchPlayer();
                        this.updateUI();
                        this.lockGame = false;

                    }, 2000)
                }
                
            }
        }

    }

}