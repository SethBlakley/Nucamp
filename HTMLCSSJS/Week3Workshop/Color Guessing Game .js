const COLORS_ARRAY = [ 'blue', 'cyan','gold','gray','green','magenta','orange','red','white','yellow']

function runGame(){
    let guess = ' ';
    let correct = false;
    let numTries = 0;
    const targetIndex = Math.floor(Math.random() * COLORS_ARRAY.length+1);
    const target = COLORS_ARRAY [targetIndex];
    console.log(target)

    do{
        guess = prompt('I am thinking of one of these colors:\n\n' + COLORS_ARRAY + '\n\nWhat color am I thinking of?\n');
        numTries +1;
        if (guess === null){
            alert('Come on try it! I know you want too! :)');
        
        return; }
        correct = checkGuess (guess.toLowerCase(), target);
        
        }
        while(!correct);
        alert("Congrats! You guessed the correct color "+ target + " \n\nIt took you " +  numTries  + " tries to guess correctly"); 
        document.body.style.background = guess;
    
        

    

}

function checkGuess(guess,target){
    let correct = false;
    if (!COLORS_ARRAY.includes(guess)){
        alert('Unfortunately the color you picked is not inclded in the list. \n\n Please chose a color from the designated lsit')
    } else if (guess > target) {
        alert('Alphabettically, the number you chose comes after the correct answer')
    } else if (guess < target) {
        alert('Alphabetically, the number you chose comes before the correct answer')

    }else {
        correct = true;
    }
    return correct;

    }

    

