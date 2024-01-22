let tic_tac_toe = function (player1, player2){

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
            while (container.firstChild) {
                container.removeChild(container.lastChild);
              }
            
           tic_tac_toe(player1, player2);
        }); 

    let game = new gameBoard();
    let table=Table();
    let playerX=new PlayerX(player1);
    let playerO=new PlayerO(player2);
        
    
        scoreBoard.textContent="(X) "+playerX.name+": " + playerX.score+" vs. ";
        scoreBoard.textContent+="(O) "+playerO.name+ ": " + playerO.score;
          

    function updateScore(){
        
        let updateScore = game.checkWinner();
        
        switch (updateScore) {
            case "X" : 
                playerX.score++;
                scoreBoard.textContent="(X) "+playerX.name+": " + playerX.score+" vs. ";
                scoreBoard.textContent+="(O) "+playerO.name+ ": " + playerO.score;
                break;
            case "O" : 
                playerO.score++;
                scoreBoard.textContent="(X) "+playerX.name+": " + playerX.score+" vs. ";
                scoreBoard.textContent+="(O) "+playerO.name+ ": " + playerO.score;
                break;
            
        }
    }

    function clearTable(){
        document.querySelector(".table").remove();
        Table();
    }

    function gameBoard (){
        this.board=[[,,],[,,],[,,]];
        this.turn=1;

        this.addX0toBoard = function (coord_x, coord_y){
        
            if (this.turn%2==1 && !(this.board[coord_x-1][coord_y-1])){

                this.board[coord_x-1][coord_y-1] = "X";
                this.turn +=1;
        
            } else if (this.turn%2==0 && !(this.board[coord_x-1][coord_y-1])){
            
                this.board[coord_x-1][coord_y-1] = "O"
                this.turn +=1;
            }
        }

        this.checkWinner = function(){
        //returns X if playerX is winner, O if playerO is winner, and T if its a tie

        const winsX=[[1,2,3],[4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [3,5,7], [1,5,9]];
        const winsO=[[-1,-2,-3],[-4,-5,-6], [-7,-8,-9], [-1,-4,-7], [-2,-5,-8], [-3,-6,-9], [-3,-5,-7], [-1,-5,-9]];
        let checkwinnerboard=[];
        let count=0;

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

                if ((checkwinnerboard.includes(Number(winsX[i].slice(0, 1)))) &&
                    (checkwinnerboard.includes(Number(winsX[i].slice(1, 2)))) &&
                    (checkwinnerboard.includes(Number(winsX[i].slice(2, 3))))
                    ){ 
                        game = new gameBoard();
                        
                        return "X";

                } else if ((checkwinnerboard.includes(Number(winsO[i].slice(0, 1)))) &&
                           (checkwinnerboard.includes(Number(winsO[i].slice(1, 2)))) &&
                           (checkwinnerboard.includes(Number(winsO[i].slice(2, 3))))
                ){
                    game = new gameBoard();
                    
                    return  "O";
            
                } else if (this.turn == 10){
                    game = new gameBoard();
                    
                    return "T";

                } else {
            }

            }
        
  
        }   
    }

    function PlayerX(name){
        this.index = "X";
        this.score=0;
        this.name=name;
    }

    function PlayerO(name){
        this.index = "O";
        this.score=0;
        this.name=name;
    }
    
    function Column (coord_x, coord_y){
        this.coord_x=coord_x;
        this.coord_y=coord_y;
    
        this.make = () => {
            let column = document.createElement("div");
            column.classList.add("column");
            column.textContent=game.board[this.coord_x-1][this.coord_y-1];

            column.addEventListener("click", () => {
                game.addX0toBoard(coord_x,coord_y);
                updateScore();
                clearTable();
        });
        
        return column
    }
    }

    function Table(){

        this.table = document.createElement("div");
        this.table.classList.add("table");

        for(i=1; i<4; i++){
            for (y=1; y<4; y++){
                let column = new Column(i,y);
                this.table.appendChild(column.make());
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
        



