// variables used in the javascript name suggest the usage
var bar1 = document.getElementById("bar1");
var bar2 = document.getElementById("bar2");
var ball = document.getElementById("ball");
var barLeft = 0;
var barSpeed = 10;
var barDirection = 0;
var ballTop = 0;
var ballLeft = 0;
var ballDirection = 0;
var ballSpeed = 5;
var flag = 0;
var flag2 = 0;
var score = 0;
var scoreMax = 0;

// alert to display maximum score in ping pong
alert("Maximum Score in Ping Pong Game is " + scoreMax)

// interval call which will update after every 1000/60 seconds
window.setInterval(startgame, 1000 / 60);
function startgame()
{ 
    update();
}


// update function for bar movement and ball movement it will also increase score

function update() {
    barMove();//call to barmovement
    ballMove();//call to ball movement


}

// function to update speed after every 4 points
function speedUpdate() {
    if (score % 4 == 0 && score > 0) {
        ballSpeed += 1;
        barSpeed += 1;

    }
}

// function to move paddle
function barMove() {
    document.addEventListener("keypress", (event) => {
        if (event.key == 'd' || event.key == 'D') {
            barDirection = 1;

        }
        if (event.key == 'a' || event.key == 'A') {
            barDirection = -1;

        }

    })
    document.addEventListener("keyup", (event) => {
        if (event.key == 'd' || event.key == 'D') {
            barDirection = 0;

        }
        if (event.key == 'a' || event.key == 'A') {
            barDirection = 0;
        }

    })

    if (barLeft <= 1) {
        barLeft = 1;
    }
    if (barLeft + bar1.offsetWidth >= window.innerWidth-20) {
        barLeft = window.innerWidth - bar1.offsetWidth-20;
    }
    barLeft += barSpeed * barDirection;
    bar1.style.left = barLeft + "px";
    bar2.style.left = barLeft + "px";

}

//function for ball movement
function ballMove() {

    if (flag == 0) {
        if (ballLeft >= window.innerWidth - ball.offsetWidth-10) {
            flag = 1;
        }
        if (flag == 0) {
            ballDirection = 1;
            ballLeft += ballSpeed * ballDirection;
        }

    }
    if (flag == 1) {
        if (ballLeft <= 0) {
            flag = 0;
        }

        ballLeft -= ballSpeed * ballDirection;
    }
    if (flag2 == 0) {
        if (ballTop >= bar2.getBoundingClientRect().top - ball.offsetHeight) {
            flag2 = 1;
            if (ballLeft >= barLeft && barLeft + bar1.offsetWidth >= ballLeft) {
                score++;
                speedUpdate();
            }
            else {
                alert("your Score is " + score)
                score = 0;
                if (score > scoreMax) {
                    scoreMax = score;
                    score = 0;
                    ballSpeed = 5;
                    barSpeed = 10;
                    alert("Hurray your score is maximum")

                }
            }
        }
        ballTop += ballSpeed;
    }
    else {
        if (ballTop <= bar1.getBoundingClientRect().top + ball.offsetHeight) {

            if (ballLeft >= barLeft && barLeft + bar1.offsetWidth >= ballLeft) {
                score++;
                speedUpdate();
            }
            else {
                alert("your Score is " + score)
                score = 0;
                if (score > scoreMax) {
                    scoreMax = score;
                    score = 0;
                    ballSpeed = 5;
                    barSpeed = 10;
                    alert("Hurray your score is maximum")


                }
            }
            flag2 = 0;
        }
        if (flag2 == 1) {
            ballTop -= ballSpeed;
        }

    }
    ball.style.top = ballTop + "px";
    ball.style.left = ballLeft + "px";
}