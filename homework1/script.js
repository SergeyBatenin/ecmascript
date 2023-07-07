// 1) Дан массив const arr = [1, 5, 7, 9] с помощью Math.min и spread оператора,
// найти минимальное число в массиве, решение задание должно состоять из одной строки

const arr = [1, 5, 7, 9, -1];
console.log(Math.min(...arr));

// 2) Напишите функцию createCounter, которая создает счетчик и возвращает объект с двумя методами:
//    increment и decrement. Метод increment должен увеличивать значение счетчика на 1,
//    а метод decrement должен уменьшать значение счетчика на 1.
//    Значение счетчика должно быть доступно только через методы объекта, а не напрямую.

const createCounter = () => {
    let count = 0;
     const obj = {
        increment: () => ++count,
        decrement: () => --count
    }

    return obj;
}

const callFunc = createCounter();
console.log(callFunc.increment());
console.log(callFunc.increment());
console.log(callFunc.decrement());

// 3) Напишите рекурсивную функцию findElementByClass, которая принимает корневой элемент
// дерева DOM и название класса в качестве аргументов и возвращает первый найденный элемент
// с указанным классом в этом дереве.


const rootEl = document.querySelector('#root');
console.log(rootEl.textContent); // печать дерева для наглядности
const findElementByClass = (parent, targetClass) => {
    if (parent.classList.contains(targetClass)) {
        return parent;
    }

    const children = [...parent.children];
    for (const child of children) {
        if (child.classList.contains(targetClass)) {
            return child;
        }
        const temp = findElementByClass(child, targetClass);
        if (temp !== null) return temp;
   }
   return null;
}

const result = findElementByClass(rootEl, "target")
console.log(`Результат:\n${result}`);
console.log(result);

// Поиск в ширину. Но здесь рекурсия и не нужна вообще.
// Либо делать рекурсией, но тогда список с элементами придется пробрасывать в параметрах
const bfs = (parent, targetClass) => {
    // Проверяем сразу наш корень
    if (parent.classList.contains(targetClass)) {
        return parent;
    }
    // если корень не подошел, то вносим в список его детей
    // чтобы проходить ряд за рядом
    const queue = [...parent.children];
    // будем искать пока у нас есть элементы
    while (queue.length > 0) {
        // будем брать первый элемент из списка чтобы не сбивалась очередность
        // сначала дети родителя
        const tempEl = queue.shift();
        // Если находим нужный элемент возвращаем его
        if (tempEl.classList.contains(targetClass)) {
            return tempEl;
        }
        // Если элемент не подошел, то добавляем его детей так же в конец очереди
        // тем самым у нас после первых детей родителя будут проверяться
        // дети первого родительского ребенка, потом второго и тд
        queue.push(...tempEl.children);
    }
}
//console.log(bfs(rootEl, "target"));