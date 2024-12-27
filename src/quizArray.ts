interface IOptions {
    id: number;
    answer: string;
    trueOrFalse: boolean;
}

interface IQuestion {
    id: number;
    value: number;
    question: string;
    options: IOptions[];
}

const quizQuestionsArray: IQuestion[] = [
    {
        id: 0,
        value: 1,
        question:
            'En kille tar ett mystiskt piller och börjar ifrågasätta allt – inklusive varför han aldrig tar av sig sina solglasögon.',
        options: [
            { id: 0, answer: 'Avatar', trueOrFalse: false },
            { id: 1, answer: 'Men in Black', trueOrFalse: false },
            { id: 2, answer: 'Matrix', trueOrFalse: true },
        ],
    },
    {
        id: 1,
        value: 1,
        question:
            'En kort person går på en lång resa med en smyckeslåda, medan en grupp människor försöker hindra ett vulkanutbrott.',
        options: [
            {id: 0, answer: 'Harry Potter och Hemligheternas Kammare', trueOrFalse: false },
            {id: 1, answer: 'Sagan om Ringen: Brödraskapet', trueOrFalse: true },
            { id: 2, answer: 'Game of Thrones', trueOrFalse: false },
        ],
    },
    {
        id: 2,
        value: 1,
        question:
            'En man fastnar i samma dag och försöker lista ut hur han ska bli en bättre version av sig själv – efter några ganska dåliga idéer först.',
        options: [
            { id: 0, answer: 'Doctor Strange', trueOrFalse: false },
            { id: 1, answer: 'Måndag hela veckan', trueOrFalse: true },
            { id: 2, answer: 'Inception', trueOrFalse: false },
        ],
    },
    {
        id: 3,
        value: 1,
        question:
            'En bonde hittar en gammal gubbe, en sassy prinsessa och en väldigt hårig vän som hjälper honom i kampen mot en maskinpark.',
        options: [
            { id: 0, answer: `Star Wars: Episod IV – Ett Nytt Hopp`, trueOrFalse: true },
            { id: 1, answer: 'Guardians of the Galaxy', trueOrFalse: false },
            { id: 2, answer: 'Transformers', trueOrFalse: false },
        ],
    },
    {
        id: 4,
        value: 1,
        question:
            'En tjej vaknar på en konstig plats, får nya skor och tvingas göra ett väldigt långt promenadmöte med tre främlingar.',
        options: [
            { id: 0, answer: 'Alice i Underlandet', trueOrFalse: false },
            { id: 1, answer: 'Trollkarlen från Oz', trueOrFalse: true },
            { id: 2, answer: 'Shrek', trueOrFalse: false },
        ],
    },
    {
        id: 5,
        value: 1,
        question:
            'En man som kan simma riktigt bra upptäcker att släktträffar kan bli komplicerade om alla bär treuddar.',
        options: [
            { id: 0, answer: 'Moana', trueOrFalse: false },
            { id: 1, answer: 'Aquaman', trueOrFalse: true },
            { id: 2, answer: 'Titanic', trueOrFalse: false },
        ],
    },
    {
        id: 6,
        value: 1,
        question:
            'En kille som älskar fart inser att vänskap och jets är en fantastisk kombination – men bara om man kan landa.',
        options: [
            { id: 0, answer: 'Fast & Furious', trueOrFalse: false },
            { id: 1, answer: 'Cars', trueOrFalse: false },
            { id: 2, answer: 'Top Gun', trueOrFalse: true },
        ],
    },
    {
        id: 7,
        value: 1,
        question:
            'En resa till stjärnorna blir lite knepig när tiden inte riktigt funkar som planerat.',
        options: [
            { id: 0, answer: 'Gravity', trueOrFalse: false },
            { id: 1, answer: 'The Martian', trueOrFalse: false },
            { id: 2, answer: 'Interstellar', trueOrFalse: true },
        ],
    },
    {
        id: 8,
        value: 1,
        question:
            'En polis jagar någon som ser mänsklig ut men kanske inte är det – och regnet verkar aldrig sluta.',
        options: [
            { id: 0, answer: 'Blade Runner', trueOrFalse: true },
            { id: 1, answer: 'Parasite', trueOrFalse: false },
            { id: 2, answer: 'Lost in Translation', trueOrFalse: false },
        ],
    },
    {
        id: 9,
        value: 1,
        question:
            'Ett gammalt videoband sprider problem, och ett visst telefonsamtal gör ingen glad.',
        options: [
            { id: 0, answer: 'The Ring', trueOrFalse: true },
            { id: 1, answer: 'The Grudge', trueOrFalse: false },
            { id: 2, answer: 'Gone Girl', trueOrFalse: false },
        ],
    },
    {
        id: 10,
        value: 1,
        question:
            'En nöjespark öppnar, men attraktionerna har egna planer för gästerna.',
        options: [
            { id: 0, answer: 'Madagascar', trueOrFalse: false },
            { id: 1, answer: 'Jurassic Park', trueOrFalse: true },
            { id: 2, answer: 'Jumanji', trueOrFalse: false },
        ],
    },
    {
        id: 11,
        value: 1,
        question:
            'En man hittar sitt kall i livet efter att han klär ut sig och börjar ge samhället en väldigt intensiv feedback.',
        options: [
            { id: 0, answer: 'Joker', trueOrFalse: true },
            { id: 1, answer: 'Fight Club', trueOrFalse: false },
            { id: 2, answer: 'American Psycho', trueOrFalse: false },
        ],
    },
    {
        id: 12,
        value: 1,
        question:
            'En snubbe som gillar musik och tjuveri hamnar i en himla röra bland stjärnorna.',
        options: [
            { id: 0, answer: 'Kung Fu Panda', trueOrFalse: false },
            { id: 1, answer: 'Guardians of the Galaxy', trueOrFalse: true },
            { id: 2, answer: 'Star Wars', trueOrFalse: false },
        ],
    },
    {
        id: 13,
        value: 1,
        question:
            'En äldre man åker på en oväntad resa – med lite hjälp av en mycket ivrig pojke och en massa heliumballonger.',
        options: [
            { id: 0, answer: 'Gran Torino', trueOrFalse: false },
            { id: 1, answer: 'Up', trueOrFalse: true },
            { id: 2, answer: 'The Irishman', trueOrFalse: false },
        ],
    },
    {
        id: 14,
        value: 1,
        question:
            'En tjej får en konstig outfit och hamnar i en tävling där hon bokstavligt talat måste slåss för sitt liv.',
        options: [
            { id: 0, answer: 'Divergent', trueOrFalse: false },
            { id: 1, answer: 'Kill Bill', trueOrFalse: false },
            { id: 2, answer: 'The Hunger Games', trueOrFalse: true },
        ],
    },
    {
        id: 15,
        value: 1,
        question:
            'En snubbe som gillar läderjackor och hattar jagar gamla prylar medan han försöker undvika ormar och ondskefulla nazister.',
        options: [
            { id: 0, answer: 'Mission: Impossible', trueOrFalse: false },
            { id: 1, answer: 'National Treasure', trueOrFalse: false },
            { id: 2, answer: 'Indiana Jones', trueOrFalse: true },
        ],
    },
    {
        id: 16,
        value: 1,
        question:
            'En kille som gillar vetenskap måste bygga om sin bil för att ta reda på vad som gick fel.',
        options: [
            { id: 0, answer: 'Tillbaka till Framtiden', trueOrFalse: true },
            { id: 1, answer: 'The Fast and the Furious', trueOrFalse: false },
            { id: 2, answer: 'Knight Rider', trueOrFalse: false },
        ],
    },
    {
        id: 17,
        value: 1,
        question:
            'En familj åker på semester till ett stort hus, men pappan börjar bete sig väldigt märkligt – och en dörr spelar en oväntad roll.',
        options: [
            { id: 0, answer: 'Psycho', trueOrFalse: false },
            { id: 1, answer: 'Paranormal Activity', trueOrFalse: false },
            { id: 2, answer: 'The Shining', trueOrFalse: true },
        ],
    },
    {
        id: 18,
        value: 1,
        question:
            'En liten robot hittar en hög med sopor och bestämmer sig för att städa upp – och kanske rädda mänskligheten på kuppen.',
        options: [
            { id: 0, answer: 'Wall-E', trueOrFalse: true },
            { id: 1, answer: 'Transformers', trueOrFalse: false },
            { id: 2, answer: 'Rymdresan', trueOrFalse: false },
        ],
    },
    {
        id: 19,
        value: 1,
        question:
            'En tjej flyttar in i ett stort slott med en hårig snubbe, där husgeråden är väldigt pratglada.',
        options: [
            { id: 0, answer: 'Skönheten och Odjuret', trueOrFalse: true },
            { id: 1, answer: 'Alice i Underlandet', trueOrFalse: false },
            { id: 2, answer: 'Trollkarlen från Oz', trueOrFalse: false },
        ],
    },
];

export default quizQuestionsArray;
