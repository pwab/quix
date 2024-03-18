console.log('I am running!');

const questions = []; // Array to store questions and answers
questionKeys = [];

/* Testing url parameters
const urlParams = new URLSearchParams(window.location.search);
fileUrl = urlParams.get('url');
if (!fileUrl) {
    fileUrl = '/data/questions.md'
}
*/
const fileUrl = '../data/questions.md'

const questionTxt = document.getElementById('questionTxt');
const answerTxt = document.getElementById('answerTxt');
const revealBtn = document.getElementById('revealBtn');
const nextBtn = document.getElementById('nextBtn');

// Function to fetch and parse the markdown file
async function fetchMarkdownFile() {
    const response = await fetch(fileUrl);
    const data = await response.text();
    
    const sections = data.split(/\n(?=# )/);

    sections.forEach(section => {
        console.log(section);
        const lines = section.trim().split('\n');
        const question = lines.shift();
        const answer = lines.slice(1).join('\n');
        
        questions.push({ question, answer });
    });

    questionKeys = Array.from(questions.keys());
}

// Function to display a random question
function displayRandomCard() {
    const randomIndex = Math.floor(Math.random() * questionKeys.length);
    questionKeys.splice(randomIndex, 1);

    questionTxt.innerHTML = marked(questions[randomIndex].question);
    answerTxt.innerHTML = marked(questions[randomIndex].answer);

    questions.splice(randomIndex, 1);
}

// Event listeners for buttons
document.getElementById('revealBtn').addEventListener('click', () => {
    answerTxt.style.display = 'block';
    revealBtn.style.display = 'none';

    if (!(questionKeys === undefined || questionKeys.length == 0)) {
        nextBtn.style.display = 'block';
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    answerTxt.style.display = 'none';
    displayRandomCard();
    nextBtn.style.display = 'none';
    revealBtn.style.display = 'block';
});

// Initialize the app
fetchMarkdownFile().then(() => {
    displayRandomCard();
});