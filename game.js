const textElement = document.getElementById("text")
const optionButtonsElement = document.getElementById("option-buttons")

let state = {}

function startGame(){
    state = {}
    showTextNode(1)
}
function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === 
    textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild){
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option =>{
        if (showOption(option)){
            const button = document.createElement("button")
            button.innerText = option.text
            button.classList.add("btn")
            button.addEventListener("click", () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option){
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option){
    const nextTextNodeId = option.nextText
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
{
    id: 1,
    text: "Im at work and a customer is being rude and screaming his lungs off I dont know what to do.",
    options:[
    {
        text: "talk back",
        setState: { workingArm: true },
        nextText: 2
    },
     {
        text: "stay quiet",
        nextText: 2
     }
   ]
  },
  {
    id: 2,
    text: "You go home and hug your dog, Grace but the landlord is here asking for money before the rent is due",
    options: [
        {
            text: "Fight for my rights",
            requiredState: (currentState) => currentState.workingArm,
            setState: { workingArm: false, confidense: true},
            nextText: 3
        },
        {
            text: "Explain to him why I need to stay",
            requiredState: (currentState) => currentState.workingArm,
            setState: { workingArm: false, confidense: true},
            nextText: 3
        },
        {
            text: "Leave so Grace does not get scared or I get hurt",
            nextText: 3
        }
    ]
  },
  
]

startGame()