let tic_tac_toe = function (player1, player2){

    const wins=[[1,2,3],[4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [3,5,7], [1,5,9]];
    let scoreBoard = document.querySelector(".scoreBoard");
    let container = document.querySelector(".container")
    let newGameBtn = document.createElement("button");
        newGameBtn.textContent="New Game";
        container.appendChild(newGameBtn);
        
        newGameBtn.addEventListener("click", () => {
            
            while (container.firstChild) {
                container.removeChild(container.lastChild);
            }
            scoreBoard.textContent=null;
            playerNameForm();
        });

    let resetBtn = document.createElement("button");
        resetBtn.textContent="Reset";
        container.appendChild(resetBtn);
        
        resetBtn.addEventListener("click", () => {
           table.clear();
           table.fill()
           game.turn=1;
           playerX.score=0;
           playerO.score=0;
           scoreBoard.textContent="(X) "+playerX.name+": " + playerX.score+" vs. "+"(O) "+playerO.name+ ": " + playerO.score;
        }); 

    let game = new gameBoard();
    let table = new Table();
        table.fill();
    let playerX=new Player(player1, "X");
    let playerO=new Player(player2, "O");
        
    
        scoreBoard.textContent="(X) "+playerX.name+": " + playerX.score+" vs. "+"(O) "+playerO.name+ ": " + playerO.score;        

    function gameBoard (){
        this.board=[[,,],[,,],[,,]];
        this.turn=1;


        this.addX0toBoard = function (coord_x, coord_y){
        
            if (this.turn%2==1 && !(this.board[coord_x][coord_y])){

                this.board[coord_x][coord_y] = "X";
                this.turn +=1;
        
            } else if (this.turn%2==0 && !(this.board[coord_x][coord_y])){
            
                this.board[coord_x][coord_y] = "O"
                this.turn +=1;
            }
        }

        this.checkWinner = function(){
        //returns X if playerX is winner, O if playerO is winner, and T if its a tie
            let checkwinnerboard=[];
            let count=0;
            if (this.turn > 4){
            
                for(x=0; x<3;x++){
            
                    for(y=0; y<3; y++){
                
                        if(this.board[x][y]=="X"){
                        checkwinnerboard[count]=count+1;
                        count++;
                    
                        } else if (this.board[x][y]=="O"){
                        checkwinnerboard[count]= 0-(count+1);
                        count++;
                    
                        } else {
                        count++;
                        }
                    }
                }

                for (i=0; i<8; i++){            

                    if ((checkwinnerboard.includes(Number(wins[i].slice(0, 1)))) &&
                        (checkwinnerboard.includes(Number(wins[i].slice(1, 2)))) &&
                        (checkwinnerboard.includes(Number(wins[i].slice(2, 3))))
                        ){   
                            this.turn=1;
                            table.clear();
                            table.fill();
                            playerX.score++;
                            scoreBoard.textContent="(X) "+playerX.name + " WINS!!!";
                        return "X";

                    } else if (
                           (checkwinnerboard.includes(-Number(wins[i].slice(0, 1)))) &&
                           (checkwinnerboard.includes(-Number(wins[i].slice(1, 2)))) &&
                           (checkwinnerboard.includes(-Number(wins[i].slice(2, 3))))
                    ){
                            this.turn=1;
                            table.clear();
                            table.fill();
                            playerO.score++;
                            scoreBoard.textContent="(O) "+playerO.name + " WINS!!!";
                            

                    
                        return  "O";
            
                    } else if (this.turn == 10){

                        this.turn=1;
                        table.clear();
                        table.fill();
                        scoreBoard.textContent="IT'S A TIE!";
                        return "T";

                    }
                }

            }
        }
        
  
        }   
    

    function Player(name, index){
        this.index =index;
        this.score=0;
        this.name=name;
    }

    
    function Cell (coord_x, coord_y){
        this.coord_x=coord_x;
        this.coord_y=coord_y;
    
        this.make = () => {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.textContent=game.board[this.coord_x][this.coord_y];

            cell.addEventListener("click", () => {
                game.addX0toBoard(coord_x,coord_y);
                cell.textContent=game.board[this.coord_x][this.coord_y];
                if (cell.textContent=="X"){ 
                    cell.style.color= "green";
                } else if (cell.textContent=="O"){
                    cell.style.color= "brown"; 
                }
                scoreBoard.textContent="(X) "+playerX.name+": " + playerX.score+" vs. "+"(O) "+playerO.name+ ": " + playerO.score;
                game.checkWinner();
        });
        
        return cell
        }

    }

    function Table(){

        this.table = document.createElement("div");
        this.table.classList.add("table");

        this.clear = function (){
            while (this.table.firstChild) {
                this.table.removeChild(this.table.lastChild);
            }

            game.board=[[,,],[,,],[,,]] ;
        }

        this.fill = function (){
            for(i=0; i<3; i++){
                for (y=0; y<3; y++){
                let cell = new Cell(i,y);
                this.table.appendChild(cell.make());
                }
            }
        }

        container.appendChild(this.table);   
    }


};

let playerNameForm =function (){
    let container = document.querySelector(".container");
    let player1name = document.createElement("input", "type=text");
    player1name.placeholder="Player X"
    let player2name = document.createElement("input", "type=text");
    player2name.placeholder="Player O"
    let namesBtn = document.createElement("button");
    namesBtn.textContent="START";
    container.appendChild(player1name);
    container.appendChild(player2name);
    container.appendChild(namesBtn);

    namesBtn.addEventListener("click", ()=> {
        player1name.remove();
        player2name.remove()
        namesBtn.remove();
        tic_tac_toe(player1name.value, player2name.value);
    });
 

};

playerNameForm();
        



