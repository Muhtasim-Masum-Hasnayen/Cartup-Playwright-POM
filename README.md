# 🛒 Cartup Playwright POM Automation

![Playwright](https://img.shields.io/badge/Playwright-2E2E2E?style=for-the-badge\&logo=playwright\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![POM](https://img.shields.io/badge/Design%20Pattern-Page%20Object%20Model-blue?style=for-the-badge)
![Testing](https://img.shields.io/badge/Testing-E2E%20Automation-success?style=for-the-badge)

An end-to-end **Cartup e-commerce test automation project** built with **Playwright and JavaScript**, following the **Page Object Model (POM)** design pattern.

The project automates important e-commerce user journeys including authentication, product search, product selection, cart management, quantity validation, and item removal.

---

## 📌 Project Overview

This project was developed as part of my **Software Testing & Quality Assurance (SQA)** learning and automation practice.

The main goal is to demonstrate practical skills in:

* End-to-End Web Automation
* Page Object Model (POM)
* Test Case Automation
* UI Testing
* E-commerce Workflow Testing
* Reusable Page Components
* Test Data Management
* Playwright Test Runner
* JavaScript-based Test Automation

---

## 🎯 Objectives

The primary objectives of this project are to:

1. Automate a realistic e-commerce shopping workflow.
2. Implement Playwright using the Page Object Model.
3. Create reusable page classes and helper functions.
4. Validate product search and selection.
5. Verify cart quantity behavior.
6. Validate adding and removing products from the cart.
7. Maintain a clean and scalable automation framework.
8. Generate Playwright test reports for test execution analysis.

---

## 🧪 Automated Test Scenario

The current automation covers the following workflow:

### Authentication

* Open Cartup
* Navigate through the authentication flow
* Handle OTP-based authentication when required

### Product Search & Selection

* Search for **Shoes for Men**
* Select the required product
* Add the product to the shopping cart

### Cart Validation

* Verify the product is added to the cart
* Update shoe quantity to **2**
* Search for **Formal Shirt for Men**
* Add formal shirts to the cart
* Validate multiple product entries

### Cart Management

* Verify cart contents
* Remove products from the cart
* Validate the updated cart state

---

## 🏗️ Project Architecture

The project follows the **Page Object Model (POM)** architecture.

```text
Cartup-Playwright-POM/
│
├── pages/
│   ├── AuthPage.js
│   ├── HomePage.js
│   ├── ProductPage.js
│   ├── SearchResultsPage.js
│   ├── CartPage.js
│   └── README.md
│
├── tests/
│   └── cartup-shopping.spec.js
│
├── utils/
│   ├── helpers.js
│   └── testData.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md
```

---

## 🧩 Page Object Model

Each major application page is represented by a dedicated Page Object.

| Page Object            | Responsibility                           |
| ---------------------- | ---------------------------------------- |
| `AuthPage.js`          | Authentication and login-related actions |
| `HomePage.js`          | Home page navigation and interactions    |
| `SearchResultsPage.js` | Product search and result handling       |
| `ProductPage.js`       | Product details and product actions      |
| `CartPage.js`          | Cart operations, quantity and removal    |
| `helpers.js`           | Reusable automation helper functions     |
| `testData.js`          | Centralized test data                    |

This structure improves:

* Maintainability
* Reusability
* Readability
* Scalability
* Debugging

---

## 🛠️ Technology Stack

| Technology            | Purpose                                |
| --------------------- | -------------------------------------- |
| **Playwright**        | End-to-End test automation             |
| **JavaScript**        | Test scripting language                |
| **Node.js**           | Runtime environment                    |
| **Page Object Model** | Automation framework architecture      |
| **Playwright Test**   | Test execution and assertions          |
| **Git & GitHub**      | Version control and project management |
| **VS Code**           | Development environment                |

---

## ⚙️ Prerequisites

Before running the project, make sure you have:

* Node.js installed
* npm installed
* Visual Studio Code
* Git
* A supported browser such as Chromium

Check Node.js:

```bash
node --version
```

Check npm:

```bash
npm --version
```

---

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Muhtasim-Masum-Hasnayen/Cartup-Playwright-POM.git
```

### 2. Navigate to the project

```bash
cd Cartup-Playwright-POM
```

### 3. Install dependencies

```bash
npm install
```

### 4. Install Playwright browsers

```bash
npx playwright install
```

---

## 🔐 Environment Configuration

The project includes an `.env.example` file for environment-specific configuration.

Create your local environment file:

```bash
.env
```

Then add the required configuration based on `.env.example`.

> ⚠️ Never commit real credentials, passwords, OTPs, API keys, or other sensitive information to GitHub.

The `.env` file is excluded through `.gitignore`.

---

## ▶️ Running the Tests

### Run the Cartup test

```bash
npm run test:cartup
```

### Run the test in headed mode

```bash
npx playwright test tests/cartup-shopping.spec.js --headed
```

### Run with slow motion

Useful for observing the browser execution:

```bash
npx playwright test tests/cartup-shopping.spec.js --headed --slow-mo=500
```

### Run all Playwright tests

```bash
npx playwright test
```

---

## 📊 Test Reports

After test execution, open the Playwright HTML report using:

```bash
npx playwright show-report
```

The report can provide information about:

* Passed tests
* Failed tests
* Test duration
* Error details
* Screenshots
* Traces
* Test execution history

---

## 📋 Test Coverage

| Test Area           | Coverage |
| ------------------- | :------: |
| Authentication      |     ✅    |
| OTP Handling        |     ✅    |
| Product Search      |     ✅    |
| Product Selection   |     ✅    |
| Add to Cart         |     ✅    |
| Quantity Update     |     ✅    |
| Multiple Products   |     ✅    |
| Cart Validation     |     ✅    |
| Product Removal     |     ✅    |
| End-to-End Workflow |     ✅    |

---

## 🧠 Automation Practices Used

This project follows several practical automation principles:

### Page Object Model

Application pages are separated into reusable classes instead of placing all locators and actions inside the test file.

### Reusable Helpers

Common operations are extracted into helper functions to reduce duplicate code.

### Centralized Test Data

Test data is maintained separately from test logic.

### Explicit Assertions

Assertions are used to validate expected application behavior.

### Maintainable Locators

Locators are organized within the relevant Page Object classes.

### Separation of Concerns

Test cases focus on **what** is being tested, while Page Objects handle **how** the application is interacted with.

---

## 📁 Test File

Main test specification:

```text
tests/cartup-shopping.spec.js
```

The test specification coordinates the complete shopping workflow using the Page Objects.

---

## 🔄 Test Flow

```text
Launch Cartup
      │
      ▼
Authentication
      │
      ▼
OTP Verification
      │
      ▼
Search "Shoes for Men"
      │
      ▼
Select Product
      │
      ▼
Add to Cart
      │
      ▼
Update Quantity → 2
      │
      ▼
Search "Formal Shirt for Men"
      │
      ▼
Add Products
      │
      ▼
Open Cart
      │
      ▼
Validate Cart
      │
      ▼
Remove Products
      │
      ▼
Validate Updated Cart
```

---

## 📸 Test Execution Evidence

Screenshots, videos, or GIFs from Playwright execution can be added here.

Example:

```markdown
![Cartup Automation Demo](docs/cartup-demo.gif)
```

If you have a recorded execution video/GIF, placing it inside a `docs/` folder will make the repository easier to understand.

---

## 🔮 Future Improvements

Planned improvements for the framework include:

* [ ] Add more positive and negative test scenarios
* [ ] Expand product search coverage
* [ ] Add checkout workflow automation
* [ ] Add payment-related test scenarios where appropriate
* [ ] Add API testing with Playwright APIRequest
* [ ] Add database validation
* [ ] Improve test data management
* [ ] Add CI/CD pipeline using GitHub Actions
* [ ] Add cross-browser testing
* [ ] Add mobile viewport testing
* [ ] Improve reporting and test evidence
* [ ] Add automated test execution on pull requests

---

## 📚 Learning Outcomes

Through this project, I practiced:

* Software Testing Fundamentals
* End-to-End Testing
* UI Automation
* Playwright
* JavaScript
* Page Object Model
* Test Case Design
* Assertions
* Locator Strategies
* Test Data Management
* Debugging Automation Failures
* Git & GitHub
* Test Reporting

---

## 👨‍💻 Author

### Muhtasim Masum Hasnayen

**BSc in Computer Science & Engineering**
United International University

**Areas of Interest:**

* Software Quality Assurance
* Test Automation
* Playwright
* Selenium
* API Testing
* Database Testing
* AI-assisted Testing
* Web Development

### Connect

* GitHub: [Muhtasim-Masum-Hasnayen](https://github.com/Muhtasim-Masum-Hasnayen)

---

## ⭐ If You Find This Project Useful

Feel free to explore the project, review the automation framework, and provide feedback.

**Built with Playwright & Page Object Model for practical SQA automation.**
