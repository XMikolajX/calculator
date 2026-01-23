// Pobranie elementu pola wyświetlającego wynik kalkulatora
const scoreInput = document.getElementById('score');
// Pobranie wszystkich przycisków z cyframi
const numberButtons = document.querySelectorAll('#numbers button');
// Pobranie wszystkich przycisków z operatorami (+, -, *, /, %, C, CE, =)
const operatorButtons = document.querySelectorAll('#operators button');

// Przechowuje aktualnie wpisaną wartość
let currentValue = '';
// Przechowuje poprzednią wartość przed wybraniem operacji
let previousValue = '';
// Przechowuje ostatnio wybraną operację (+, -, *, /, %)
let operation = null;

// Obsługa przycisków liczb - dodawanie cyfr do aktualnej wartości
// Każdy przyciśnięty przycisk dodaje jego wartość do currentValue
// a następnie wyświetla bieżącą wartość w polu score
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentValue += button.textContent; //wez zawartosc z buttona tego co klikneles i przypisz dodaj do currentValue
        scoreInput.value = currentValue; // zapisz wartosc w zmiennej scoreInput w inpucie 
    });
});

// Obsługa przycisków operatorów - wykonywanie różnych operacji
// Każdy operator ma swoje działanie:
// - 'C' (Clear): wyczyść wszystko - zeruje wszystkie wartości i wyświetlacz
// - 'CE' (Clear Entry): wyczyść bieżącą wartość - usuwa tylko aktualnie wpisaną liczbę
// - '=': oblicza wynik - wykonuje operację i wyświetla rezultat
// - '+', '-', '*', '/', '%': zapisuje operację do wykonania między liczbami
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const operator = button.textContent; //przypisz kazda klikenieta zawartosc do zmiennej operator
        
        // Przycisk 'C' - kompletne czyszczenie kalkulatora
        if (operator === 'C') {
            currentValue = '';
            previousValue = '';
            operation = null;
            scoreInput.value = '';
        } 
        // Przycisk 'CE' - czyszczenie bieżącej wartości
        else if (operator === 'CE') {
            currentValue = '';
            scoreInput.value = '';
        } 
        // Przycisk '=' - obliczenie wyniku operacji
        else if (operator === '=') {
            if (operation && previousValue && currentValue) {
                currentValue = calculate(previousValue, currentValue, operation);
                scoreInput.value = currentValue;
                previousValue = '';
                operation = null;
            }
        } 
        
        // Przyciski operatorów matematycznych (+, -, *, /, %)
        else if (['+', '-', '*', '/', '%'].includes(operator)) {
            if (currentValue) {
                previousValue = currentValue;
                operation = operator;
                currentValue = '';
            }
        }
    });
});

// Funkcja calculate - wykonuje operacje matematyczne
// Przyjmuje: prev (pierwsza liczba), curr (druga liczba), op (operator)
// Zwraca: wynik operacji lub komunikat o błędzie
function calculate(prev, curr, op) {
    // Konwersja tekstu na liczby zmiennoprzecinkowe
    const a = parseFloat(prev);
    const b = parseFloat(curr);
    
    // Wykonanie odpowiedniej operacji w zależności od operatora
    switch(op) {
        case '+': return a + b;  // Dodawanie
        case '-': return a - b;  // Odejmowanie
        case '*': return a * b;  // Mnożenie
        case '/': return b !== 0 ? a / b : 'Błąd';  // Dzielenie (sprawdzenie czy nie dzielamy przez 0)
        case '%': return a % b;  // Reszta z dzielenia (modulo)
        default: return curr;    // Jeśli operator nie jest rozpoznany, zwróć drugą liczbę
    }
}