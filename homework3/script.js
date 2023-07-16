// Задание 1: "Управление персоналом компании"
// Реализуйте класс Employee (сотрудник), который имеет следующие свойства и методы:
//   Свойство name (имя) - строка, имя сотрудника.
//   Метод displayInfo() - выводит информацию о сотруднике (имя).
// Реализуйте класс Manager (менеджер), который наследует класс Employee и
// имеет дополнительное свойство и метод:
//   Свойство department (отдел) - строка, отдел, в котором работает менеджер.
//   Метод displayInfo() - переопределяет метод displayInfo() родительского класса и выводит информацию
//   о менеджере (имя и отдел).
console.log("Задание 1");
class Employee {
    name;
    constructor(name) {
        this.name = name;
    }
    displayInfo() {
        console.log(`Name: ${this.name}`);
    }
}

const employee = new Employee("John Smith");
employee.displayInfo();
// Вывод:
// Name: John Smith

class Manager extends Employee {
    department;
    constructor(name, department) {
        super(name);
        this.department = department;
    }
    displayInfo() {
        console.log(`Name: ${this.name}\nDepartment: ${this.department}`);
    }
}

const manager = new Manager("Jane Doe", "Sales");
manager.displayInfo();
// Вывод:
// Name: Jane Doe
// Department: Sales


// Задание 2:
// Реализуйте класс Order (заказ), который имеет следующие свойства и методы:
//   Свойство orderNumber (номер заказа) - число, уникальный номер заказа.
//   Свойство products (продукты) - массив, содержащий список продуктов в заказе.
//   Метод addProduct(product) - принимает объект product и добавляет его в список продуктов заказа.
//   Метод getTotalPrice() - возвращает общую стоимость заказа, основанную на ценах продуктов.
console.log("\nЗадание 2");
// Пример использования класса
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

class Order {
    orderNumber;
    products;
    constructor(orderNumber) {
        this.orderNumber = orderNumber;
        this.products = [];
    }
    addProduct(product) {
        this.products.push(product);
    }
    getTotalPrice() {
        const totalSum = this.products.reduce((acc, product) => acc+product.price, 0);
        return totalSum;
    }
}

const order = new Order(12345);

const product1 = new Product("Phone", 500);
order.addProduct(product1);

const product2 = new Product("Headphones", 100);
order.addProduct(product2);

console.log(order.getTotalPrice()); // Вывод: 600


// 3) Это расширенная версия задачи с банком, которую мы решлали на семинаре:
// Создайте класс "Банк", который будет иметь следующие свойства: название банка,
// список клиентов и список счетов. Класс должен иметь методы для добавления нового клиента,
// открытия нового счета для клиента, пополнения счета, снятия денег со счета и проверки баланса.

// Пример работы:

// const bank = new Bank("Мой Банк");

// const client1 = new Client("Иван", 25);
// const client2 = new Client("Мария", 30);

// bank.addClient(client1);
// bank.addClient(client2);

// bank.openAccount(client1, 1000);
// bank.openAccount(client2, 500);

// bank.deposit(123456789, 200);
// bank.withdraw(987654321, 100);
// bank.checkBalance(123456789);
// bank.checkBalance(987654321);

console.log("\nЗадача 3");

class Bank {
    bankName;
    clients = [];
    accounts = [];
    #generatorClientId = 0;
    constructor(bankName) {
        this.bankName = bankName;
    }

    addClient(newClient) {
        const bankClient = {
            clientId: ++this.#generatorClientId,
            user: newClient
        }
        this.clients.push(bankClient);
    }

    #generateAccountNumber() {
        let account = "";
        for (let i = 0; i < 4; i++) {
            account += Math.floor(Math.random() * 10000);
        }
        return +account;
    }
    
    #findBankClient(client) {
        for(let i = 0; i < this.clients.length; i++) {
            if (this.clients[i].user === client) {
                return this.clients[i];
            }
        }
        return null;
    }

    openAccount(client, deposit) {
        const bankClient = this.#findBankClient(client);
        
        if (bankClient === null) {
            console.log("Данный клиент не зарегистрирован в системе");
        } else {
            const numberAccount = this.#generateAccountNumber();
            this.accounts.push({
                    accountNumber: numberAccount,
                    balance: deposit
                });
            client.accounts.push(numberAccount);
            console.log(`Клиент ${client.name} открыл счет №${numberAccount} и внес на баланс ${deposit} у.е.`);
        }
    }

    #findBankAccount(accountNumber) {
        for(let i = 0; i < this.accounts.length; i++) {
            if (this.accounts[i].accountNumber === accountNumber) {
                return this.accounts[i];
            }
        }
        return null;
    }

    deposit(client, numberAccount, amount) {
        const bankAccount = this.#findBankAccount(numberAccount);

        if (bankAccount === null) {
            console.log("Данного счета не существует. Проверьте номер счета и повторите попытку");
        } else {
            bankAccount.balance += amount;
            console.log(`${client.name} пополнил счет ${numberAccount} на сумму: ${amount} у.е.`);
        }
    }

    withdraw(client, numberAccount, amount) {
        const bankClient = this.#findBankClient(client);

        if(bankClient === null) {
            console.log("Вы не являетесь клиентом банка!");
        } else {
            const bankAccount = this.#findBankAccount(numberAccount);

            if (bankAccount === null) {
                console.log("Данного счета не существует. Проверьте номер счета и повторите попытку");
            } else if (bankClient.user.accounts.indexOf(numberAccount) === -1) {
                console.log("Попытка снять деньги с чужого баланса.");
                console.log("Я уже вызвала полицию!");
            } else if(bankAccount.balance < amount) {
                console.log("Денежных средств недостаточно!");
            } else {
                bankAccount.balance -= amount;
                console.log(`С баланса списано ${amount} у.е.`);
                console.log(`Доступный остаток: ${bankAccount.balance}`);
            }
        }
    }

    checkBalance(client, numberAccount) {
        const bankClient = this.#findBankClient(client);

        if(bankClient === null) {
            console.log("Вы не являетесь клиентом банка!");
        } else {
            const bankAccount = this.#findBankAccount(numberAccount);

            if (bankAccount === null) {
                console.log("Данного счета не существует. Проверьте номер счета и повторите попытку");
            } else if (bankClient.user.accounts.indexOf(numberAccount) === -1) {
                console.log("Данный счет вам не принадлежит");
            } else {
                console.log(`Доступный остаток: ${bankAccount.balance}`);
            }
        }
    }
}

class Client {
    name;
    age;
    accounts; // Пользователь может знать свои счета, и для простоты тестирования кода
    constructor(name, age) {
        this.name= name;
        this.age = age;
        this.accounts = [];
    }
}

const bank = new Bank("My Bank");
const client1 = new Client("Иван", 25);
const client2 = new Client("Мария", 30);

bank.addClient(client1);
bank.addClient(client2);

bank.openAccount(client1, 1000);
bank.openAccount(client1, 1000);
bank.openAccount(client2, 500);

bank.deposit(client1, 123456789, 200); // пробуем пополнить несуществующий счет
bank.deposit(client1, client1.accounts[0], 200); // Пополняем свой собственный
bank.deposit(client1, client2.accounts[0], 300); // Пополняем чужой счет

bank.withdraw(client1, client2.accounts[0], 100); // Пытаемся снять с чужого счета
bank.withdraw(client2, client2.accounts[0], 1000); // Пытаемся снять сумму превышающую баланс
bank.withdraw(client2, client2.accounts[0], 100); // Корректная попытка

bank.checkBalance(client2, client1.accounts[0]); // Попытка проверки баланса чужого счета
bank.checkBalance(client2, client2.accounts[0]); // Проверка своего счета


// Задача 4:
// Создать класс "Студент", который имеет приватные свойства "имя", "возраст" и "средний балл".
// Класс должен иметь методы для установки и получения значений свойств,
// а также метод для вывода информации о студенте.

console.log("\nЗадача 4");
class Student {
    #name;
    #age;
    #averageGrade;
    
    setName(name) {
        this.#name = name;
    }
    getName(name) {
        return this.#name;
    }

    setAge(age) {
        this.#age = age;
    }
    getAge(age) {
        return this.#age;
    }

    setAverageGrade(averageGrade) {
        this.#averageGrade = averageGrade;
    }
    getAverageGrade(averageGrade) {
        return this.#averageGrade;
    }
    displayInfo() {
        console.log(`Студент:\nИмя: ${this.#name}\nВозраст: ${this.#age}\nСредний бал: ${this.#averageGrade}`);
    }
}

const student = new Student();
student.setName('Питер Паркер');
student.setAge(20);
student.setAverageGrade(85);
student.displayInfo();