const gameStauts = document.querySelector(".game-status");
const newGame = document.querySelector(".btn");
const boxes = document.querySelectorAll(".box"); 

let curplayer  ;
let grid ;

const winingPositions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function initGame(){
   // console.log("init game is called");
   
   curplayer = "X";
   gameStauts.innerText = `Current Palyer - ${curplayer}`;

   grid = ["","","","","","","","",""];

   // for(let i =0 ;boxes.length;i++)
   // {
   //    boxes[i].innerText = "";
   //    boxes[i].style.cssText = " background-color: transparent;";

   //    boxes[i].style.cssText = "pointer-events:all;";
   // }

   boxes.forEach((box)=>{
      box.innerText = "";
      box.style.cssText = "pointer-events:all;";
      box.classList.remove("win");
   })
   newGame.classList.remove("active");
}

initGame();


function swapTurn(){
   // console.log("Swapping players");
   if(curplayer==="X")
      curplayer = "O";
   else
      curplayer = "X"

   gameStauts.innerText = `Current Player - ${curplayer}`;
}

function  checkForWin(){
      
   // console.log("checking for winner");

   let winner = "";
   winingPositions.forEach((position)=>{ 
      if(
         (grid[position[0]]!="" && grid[position[1]]!="" && grid[position[2]]!="") && 
         (grid[position[0]] === grid[position[1]] && grid[position[1]] === grid[position[2]] )
      )
      {
            console.log("winner found");
            if(grid[position[0]] === "X")
            winner = "X";
            else
            winner = "O";
      
            boxes[position[0]].classList.add("win");     /*style.cssText ="background-color:rgba(0, 255, 0, 0.3);";*/
            boxes[position[1]].classList.add("win");     /*style.cssText ="background-color:rgba(0, 255, 0, 0.3);";*/
            boxes[position[2]].classList.add("win");     /*style.cssText ="background-color:rgba(0, 255, 0, 0.3);";*/

            gameStauts.innerText = `Winnner ${winner}`;

            newGame.classList.add("active");
            boxes.forEach((box)=>{box.style.cssText = "pointer-events:none;";});
            
      }
   });
   if(winner===""){
   let count  = 0;
   grid.forEach((box)=>{
      // if grid contain space the we can continue 
      if(box != "")
      {
         count++;            
      }
   })

   if(count==9){
      // console.log("find draw");

      gameStauts.innerText = "Game Tied!";
      newGame.classList.add("active");
   }
}
}

function handleClick(index){
   console.log("handle click");
   if(grid[index] === "")
   {
      grid[index] = curplayer;
      boxes[index].innerText = curplayer;
      // swap turn 
      swapTurn();   
      // check for win
      checkForWin();
   }
}
boxes.forEach(
   (box,index)=>{
      box.addEventListener("click",()=>{handleClick(index)});
   }
);

newGame.addEventListener("click",()=>{
   initGame();
});