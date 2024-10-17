class Mines {
    constructor(app, width, height, mines) {
        this.app = app;
        this.front="🌲";
        this.mine="💣";
        this.flag="🚩";
        this.numbers=[" ","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣"];
        this.reset(width, height, mines);
    }

    reset(width, height, mines) {
        // Check for data validity
        if (width*height < mines) {
            console.error("There are too mani mines in game");
            return;
        }

        this.width = width;
        this.height = height;
        this.mines = mines;
        this.app.innerHTML = "";
        this.lockGame = false;
        this.flags = 0;

        // create game
        this.createMatrix();
        this.createFrame(this.app)
        this.startTime=Date.now();
        
        // initial state
        this.updateUI();
        if (this.timer) {
            clearInterval(this.timer);
            this.timer=null;
        }
        this.timer=setInterval(() => this.updateUI(), 1000);
    }

    checkWin() {
        // empty matrix
        let safe=0;
        for (let j = 0; j < this.height; j++) {
            for (let i = 0; i < this.width; i++) {
                if ((this.matrix[j][i] != this.mine) && !this.divGame.children[j*this.width + i].classList.contains("flipped")) {
                    return;
                }
            }
        }
        this.lockGame=true;
        clearInterval(this.timer);
        this.timer=null;
        alert("Konec hry! Vítězství!");
    }

    switchPlayer() {
        this.divPlayer[this.activePlayer].classList.remove('active');
        this.activePlayer = (this.activePlayer+1) % 2;
        this.divPlayer[this.activePlayer].classList.add('active');

    }
    updateUI() {
        this.divMines.innerHTML="Zbývá min: "+(this.mines-this.flags);
        const elapsed = Date.now() - this.startTime;
        const min = Math.floor(elapsed / 60000);
        const sec = Math.floor((elapsed % 60000) / 1000);
        this.divTime.innerHTML = `Čas: ${min}:${sec.toString().padStart(2, '0')}`;
    }

    createMatrix() {
        this.matrix=[];

        // empty matrix
        for (let j = 0; j < this.height; j++) {
            this.matrix[j] = [];
            for (let i = 0; i < this.width; i++) {
                this.matrix[j][i]=this.numbers[0];
            }
        }
        
        // fill mines
        for (let i = 0; i < this.mines; i++) {
            let x = Math.floor(Math.random() * this.width);
            let y = Math.floor(Math.random() * this.height);
            while (this.matrix[y][x] == this.mine) {
                x = Math.floor(Math.random() * this.width);
                y = Math.floor(Math.random() * this.height);
            }
            this.matrix[y][x] = this.mine;
        }

        // fill numbers
        for (let j = 0; j < this.height; j++) {
            for (let i = 0; i < this.width; i++) {
                if (this.matrix[j][i] == this.mine) {
                    continue;
                }
                for (let l=-1; l<=1; l++) {
                    for (let k=-1; k<=1; k++) {
                        if ((k==0 && l==0) || i+k<0 || i+k>=this.width || j+l<0 || j+l>=this.height) {
                            continue;
                        }
                        if (this.matrix[j+l][i+k] == this.mine) {
                            this.matrix[j][i]=this.numbers[this.numbers.indexOf(this.matrix[j][i])+1];
                        }
                    }
                }
            }
        }    
    }
 
    createFrame (container) {
        // main game board
        this.divGame = document.createElement('div');
        this.divGame.classList.add('game');
        this.divGame.style.gridTemplateColumns = `repeat(${this.width}, 1fr)`;
        this.divGame.style.gridTemplateRows = `repeat(${this.height}, 1fr)`;
        container.appendChild(this.divGame);

        // score board
        this.divScore = document.createElement('div')
        this.divScore.classList.add('score');

        this.divMines = document.createElement('div');
        this.divScore.appendChild(this.divMines);

        this.divTime = document.createElement('div');
        this.divScore.appendChild(this.divTime);

        // new game
        this.divNew = document.createElement('div');
        this.divNew.classList.add('new');
        this.divNewSelect = document.createElement('select');
        let diff={easy:"Začátečník", medium:"Pokročilý", hard:"Expert"};
        for (let d in diff) {
            let option = document.createElement('option');
            option.value = d;
            option.innerHTML = diff[d];
            this.divNewSelect.appendChild(option);
        }
        this.divNewButton = document.createElement('button');
        this.divNewButton.innerHTML = "Nová hra";
        this.divNew.appendChild(this.divNewButton);
        this.divNew.appendChild(this.divNewSelect);
        this.divNewButton.addEventListener('click', () => {
            switch (this.divNewSelect.value) {
                case "easy" : this.reset(10, 8, 10); break;
                case "medium" : this.reset(20, 15, 30); break;
                case "hard" : this.reset(30, 20, 80); break;
            }
        });

        this.divScore.appendChild(this.divNew);
        container.appendChild(this.divScore);

        // game matrix
        for (let j = 0; j < this.height; j++) {
            for (let i = 0; i < this.width; i++) {
                const divPex = document.createElement('div');
                divPex.classList.add('pex');
                divPex.dataset.i=i;
                divPex.dataset.j=j;

                const divPexIn = document.createElement('div');
                divPexIn.classList.add('in');
                divPex.appendChild(divPexIn)

                const divFront = document.createElement('div');
                divFront.classList.add('front');
                divFront.innerHTML = this.matrix[j][i];
                
                const divBack = document.createElement('div');
                divBack.classList.add('back');
                divBack.innerHTML = this.front;

                divPexIn.appendChild(divFront);
                divPexIn.appendChild(divBack);
                divPexIn.addEventListener('click', () => this.flip(divPex));
                divPexIn.addEventListener('contextmenu', (e) => { e.preventDefault(); this.flagToggle(divPex);});
                this.divGame.appendChild(divPex)
            }
        }
    }

    unflip (div) {
        div.classList.remove('flipped');
    }

    flagToggle (div) {
        if (!this.lockGame && !div.classList.contains('flipped')) {
            if (div.classList.toggle('flag')) {
                this.flags += 1;
            } else {
                this.flags -= 1;
            }
            this.updateUI();
        }
    }

    flip (div) {
        if (!this.lockGame && !div.classList.contains('flag') && !div.classList.contains('flipped')) {
            this.moveCounter += 1;
            div.classList.add("flipped");
            // cascade flip zeros
            const i=parseInt(div.dataset.i);
            const j=parseInt(div.dataset.j);
            if (this.matrix[j][i]==this.numbers[0]) {
                for (let l=-1; l<=1; l++) {
                    for (let k=-1; k<=1; k++) {
                        if ((k==0 && l==0) || i+k<0 ||i+k>=this.width || j+l<0 || j+l>=this.height) {
                            continue;
                        }
                        this.flip(this.divGame.children[(j+l)*this.width + i+k]);
                    }
                }                   
            }
            this.checkWin();
            // mine
            if (this.matrix[j][i]==this.mine) {
                this.lockGame = true;
                // flip all
                for (let jj=0; jj<this.height; jj++) {
                    for (let ii=0; ii<this.width; ii++) {
                        if (this.matrix[jj][ii]==this.mine) {
                            this.divGame.children[jj*this.width + ii].classList.add("flipped");
                        }
                    }
                }
                alert("Konec hry! Šlápl jsi na minu!");
            }
            
        }

    }
}
