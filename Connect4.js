let canvas;
let context;

let model = {
    /*board : [['.', '8', '15', '22', '29', '36'],
            [ '.', '9', '16', '23', '30', '37'],
            [ '.', '10', '17', '24', '31', '38'],
            [ '.', '11', '18', '25', '32', '39'],
            [ '.', '12', '19', '26', '33', '40'],
            [ '.', '13', '20', '27', '34', '41',],
            [ '.', '14', '21', '28', '35', '42']],*/

  board : [[ '.', '.', '.', '.', '.', '.'],
           [ '.', '.', '.', '.', '.', '.'],
           [ '.', '.', '.', '.', '.', '.'],
           [ '.', '.', '.', '.', '.', '.'],
           [ '.', '.', '.', '.', '.', '.'],
           [ '.', '.', '.', '.', '.', '.'],
           [ '.', '.', '.', '.', '.', '.']],

    next : 0,
    end_game : false
}



function getBottomIndx(x)
{
  for(let i = 5; i>=0; i--)
  {
    if(model.board[x][i] == '.')
    {
      return(i);
    }
  }

return("columnfull");

}

function isEven(x){
  return(x%2)
}

//the ice is thin but it holds
function checkDiagLR(){
  for(let i = 0; i < 4; i++)
  {
    for(let j = 0; j < 4; j++)
    {
      if(model.board[i][j] == model.board[i+1][j+1] && model.board[i+1][j+1] == model.board[i+2][j+2] && model.board[i+2][j+2] == model.board[i+3][j+3] && model.board[i][j] != '.')
      {
        return(true)
      }
    }
  }
  return(false);
}


function checkDiagRL(){
  for(let i = 0; i < 4; i++)
  {
    for(let j = 3; j < 6; j++)
    {
      if(model.board[i][j] == model.board[i+1][j-1]  && model.board[i+1][j-1] == model.board[i+2][j-2] && model.board[i+2][j-2] == model.board[i+3][j-3] && model.board[i][j] != '.')
      {
        return(true)
      }
    }
  }
  return(false);
}

function checkColumns() {
  let count = 0;

  for(let i = 0; i < 7; i++)
  {
    for(let j = 0; j < 5; j++)
    {
      if(model.board[i][j] == model.board[i][j+1] && model.board[i][j+1] != '.')
      {
        count++;
        if(count == 3)
        {
          return(true)
        }
      }
      else if (model.board != model.board[i][j+1] && model.board[i][j+1] != '.')
      {
        count = 0;
      }
    }
    count = 0;
  }
  return(false);
}

function checkRows() {
  let count = 0;

  for(let i = 0; i < 6; i++)
  {
    for(let j = 0; j < 6; j++)
    {
      if(model.board[j][i] == model.board[j+1][i] && model.board[j+1][i] != '.')
      {
        count++;
        if(count == 3)
        {
          return(true)
        }
      }
      else if (model.board != model.board[j+1][i] && model.board[j+1][i] != '.')
      {
        count = 0;
      }
    }
    count = 0;
  }
  return(false);
}

function splat(n) {

    context.clearRect(0,0,canvas.width,canvas.height)

    //writing # for tic tac toe board
    for(let i=0; i<7; i++)
    {
      //horizontal lines
        context.beginPath();
        context.moveTo(50, 50 + i * 100);
        context.lineTo(750, 50 + i * 100);
        context.strokeStyle = '#000000';
        context.lineWidth = 5;
        context.stroke();
    }

    for(let i = 0; i<8; i++)
    {
      //vertical lines
        context.beginPath();
        context.moveTo(50 + i * 100, 50);
        context.lineTo(50 + i * 100, 650);
        context.strokeStyle = '#000000';
        context.lineWidth = 5;
        context.stroke();
    }

    

  for(let i = 0; i < 7; i++){
        for(let j = 0; j < 6; j++){

            let me = model.board[i][j];

            if(me != '.')
            {
                context.beginPath();
                context.arc(100 + i*100, 100 + j*100, 45, 0, 2*Math.PI);
                context.strokeStyle = '#778899';
                context.lineWidth = 2;

                if(model.board[i][j]%2 == 0)
                {
                  context.fillStyle = '#ff9933';
                  context.closePath()
                }
                else
                {
                  context.fillStyle = '#3366ff';
                  context.closePath()
                }

                context.fill();
            }
        }
      }

      context.font = "20pt Calibri"
      context.fillStyle = "green";
      context.fillText(JSON.stringify(model), 25, 680);

      checkWin();
}

function checkWin(){

  context.font = "20pt Calibri"
  context.fillStyle = "black";

  //console.log("Columns", checkColumns());
  //console.log("Rows", checkRows());
  //console.log("diagRL", checkDiagRL())
  //console.log("diagLR", checkDiagLR())

  if(checkColumns() || checkRows() || checkDiagLR() || checkDiagRL() )
  {
    if(model.next%2 == 1)
    {
      context.fillText("Orange Wins!", 780, 350)
    }
    else
    {
      context.fillText("Blue Wins!", 780, 350)
    }
    model.end_game = true;
  }
}

function roundMe1(x){return Math.ceil((x-50)/100)-1}

document.addEventListener("click", e => {
    const [i,j] = ([e.pageX, e.pageY].map(roundMe1));
    z =  getBottomIndx(i);
    if(getBottomIndx(i) != "columnfull")
    {
      model.board[i][z] = (model.next % 2);
      model.next++;
    }

    if(model.end_game != true)
    {
      splat();
    }
  })

document.addEventListener("DOMContentLoaded", () => {
    canvas = document.querySelector("#myCanvas");
    //console.log("got here");
    context = canvas.getContext("2d");
    console.log(context);
    splat();
})
