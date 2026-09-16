# AI-Assisted Web Automation using Claude Skill and Playwright

## Project Overview

This project was developed as part of a Junior SDET take-home assignment.

The objective of the project is to demonstrate an AI-assisted approach to web automation by creating a custom Claude Skill that converts plain-English test steps into reliable and maintainable Playwright automation code.

The generated automation follows practical SDET principles such as stable locator selection, proper synchronization, meaningful assertions, secure credential handling, and clear handling of assumptions and limitations.

## Target Website

Automation Exercise  
https://automationexercise.com/

The website was selected because it provides simple and well-defined flows suitable for demonstrating web automation.

## Technologies Used

- JavaScript
- Playwright
- Claude
- Git & GitHub

## Claude Skill

A custom Claude Skill named `sdet-automation-skill` was created for this project.

The Skill accepts:

- Target website or webpage
- Test flow
- Plain-English test steps
- Expected result, when available

The Skill then:

1. Understands the test flow.
2. Breaks the test steps into automation actions.
3. Identifies the required web elements.
4. Selects stable and maintainable locators.
5. Generates Playwright automation code.
6. Handles dynamic elements using appropriate synchronization.
7. Adds meaningful assertions.
8. Identifies assumptions and limitations.

## Locator Strategy

The Skill prefers locators in the following order:

1. `getByRole()`
2. `getByLabel()`
3. `getByPlaceholder()`
4. `getByTestId()`
5. Stable attributes such as `data-qa`
6. Stable text-based locators
7. CSS selectors when necessary
8. XPath only as a last resort

The goal is to avoid brittle locators based on generated class names, deep DOM structures, unstable IDs, unnecessary element positions, long XPath expressions, and arbitrary `nth-child` selectors.

## Automated Test Flows

### 1. Login

The login test:

- Opens Automation Exercise.
- Navigates to Signup / Login.
- Verifies that the login page is displayed.
- Enters a valid registered email and password.
- Clicks Login.
- Verifies that the user is successfully logged in.
- Verifies that the Logout option is visible.

Credentials are supplied through environment variables and are not hardcoded in the source code.

### 2. Product Search

The product search test:

- Opens the website.
- Navigates to Products.
- Verifies the All Products page.
- Searches for `dress`.
- Verifies that the Searched Products section appears.
- Verifies that at least one search result exists.
- Checks that at least one result is relevant to the search term.

### 3. Add Product to Cart

The add-to-cart test:

- Opens the website.
- Navigates to Products.
- Selects the first product.
- Captures the product name.
- Adds the product to the cart.
- Verifies the Added confirmation.
- Opens the cart.
- Verifies that the same selected product appears in the cart.

## Project Structure

```text
SDET-Automation/
│
├── tests/
│   ├── login.spec.js
│   ├── product-search.spec.js
│   └── add-to-cart.spec.js
│
├── Skill.md
├── README.md
├── package.json
├── package-lock.json
├── playwright.config.js
└── .gitignore
```

