const monsterattackValue=14
const attackValue=10
const strongattackValue=15
const healingvalue=18

const enteredValue=prompt("Enter maximum life value")

let chosenMaxLife=parseInt(enteredValue)
if(chosenMaxLife<=0 || isNaN(chosenMaxLife)){
    chosenMaxLife=100
}
let currentMonsterLife=chosenMaxLife
let currentPlayerLife=chosenMaxLife
let hasBonus=true

adjustHealthBars(chosenMaxLife)


function attackMonster(mode){
    let maxDamage
    if(mode==='attackValue'){
        maxDamage=attackValue
    }
    else if(mode==='strongattackValue'){
        maxDamage=strongattackValue
    }
    const damage=dealMonsterDamage(maxDamage)
    currentMonsterLife-=damage
    endRound()
}

function reset(){
    currentPlayerLife=chosenMaxLife
    currentMonsterLife=chosenMaxLife
    resetGame(chosenMaxLife)
}

function endRound(){
    const initialPlayerLife=currentPlayerLife
    const playerdamage=dealPlayerDamage(monsterattackValue)
    currentPlayerLife-=playerdamage

    if(currentPlayerLife<=0 && hasBonus){
        hasBonus=false
        removeBonusLife()
        currentPlayerLife=initialPlayerLife
        setPlayerHealth(initialPlayerLife)
        alert('You would be dead but the bonus life saved you!!!')
    }
    if(currentMonsterLife<=0 && currentPlayerLife>0){
        alert('You won!')
        reset()
    }
    else if(currentPlayerLife<=0 && currentMonsterLife>0){
        alert('You lost!')
        reset()
    }
    else if(currentMonsterLife<=0 && currentPlayerLife<=0){
        alert('You have a draw')
        reset()
    }
}

function attackHandler(){
    attackMonster('attackValue')
}

function strongattackHandler(){
   attackMonster('strongattackValue')
}

function healplayerHandler(){
    
    if(currentPlayerLife>= chosenMaxLife-healingvalue){
        alert("You can't exceed the max life")
    }
    increasePlayerHealth(healingvalue)
    currentPlayerLife+=healingvalue
    endRound()
}

attackBtn.addEventListener('click',attackHandler)
strongAttackBtn.addEventListener('click',strongattackHandler)
healBtn.addEventListener('click',healplayerHandler)