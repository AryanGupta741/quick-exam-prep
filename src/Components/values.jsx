export const categories = [
    { id: 'english', name: 'English', icon: '📝', color: '#4a72ff' },
    { id: 'hindi', name: 'Hindi', icon: '🗣️', color: '#ff5c5c' },
    { id: 'mathematics', name: 'Mathematics', icon: '📐', color: '#4caf50' },
    { id: 'gk', name: 'General Knowledge', icon: '🌍', color: '#f59e0b' },
    { id: 'cs', name: 'Computer Science', icon: '💻', color: '#8b5cf6' },
    { id: 'powerbi', name: 'Power BI', icon: '📊', color: '#ec4899' },
];

export const values = {
    english: [
        {
            Q: "Choose the correct synonym for 'Diligent'.",
            A: "Hardworking",
            O: [{ value: "Lazy" }, { value: "Smart" }, { value: "Hardworking" }, { value: "Fast" }]
        },
        {
            Q: "Identify the correctly spelled word.",
            A: "Accommodate",
            O: [{ value: "Acomodate" }, { value: "Accommodate" }, { value: "Accomodate" }, { value: "Acommodate" }]
        }
    ],
    hindi: [
        {
            Q: "'आम' का पर्यायवाची शब्द क्या है?",
            A: "रसाल",
            O: [{ value: "अम्बु" }, { value: "रसाल" }, { value: "फल" }, { value: "पेड़" }]
        }
    ],
    mathematics: [
        {
            Q: "What is the value of Pi up to 2 decimal places?",
            A: "3.14",
            O: [{ value: "3.12" }, { value: "3.14" }, { value: "3.16" }, { value: "3.18" }]
        },
        {
            Q: "Solve: 25 * 4 / 2 + 10",
            A: "60",
            O: [{ value: "50" }, { value: "60" }, { value: "70" }, { value: "80" }]
        }
    ],
    gk: [
        {
            Q: "Who is known as the Iron Man of India?",
            A: "Sardar Vallabhbhai Patel",
            O: [{ value: "Mahatma Gandhi" }, { value: "Jawaharlal Nehru" }, { value: "Sardar Vallabhbhai Patel" }, { value: "Subhash Chandra Bose" }]
        }
    ],
    cs: [
        {
            Q: "What does CPU stand for?",
            A: "Central Processing Unit",
            O: [{ value: "Central Process Unit" }, { value: "Central Processing Unit" }, { value: "Computer Processing Unit" }, { value: "Control Processing Unit" }]
        }
    ],
    powerbi: [
        {
            Q: "Which function is used to calculate the sum of a column in DAX?",
            A: "SUM",
            O: [{ value: "TOTAL" }, { value: "SUM" }, { value: "COUNT" }, { value: "ADD" }]
        }
    ]
};