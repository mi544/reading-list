# Reading List

[![license badge](https://img.shields.io/github/license/mi544/reading-list?style=for-the-badge)](https://choosealicense.com/licenses/mit/)
[![online status badge](https://img.shields.io/website?down_color=lightgrey&down_message=offline&style=for-the-badge&up_color=blue&up_message=online&url=https%3A%2F%2Fbookstore.personal-projects.space%2F)](https://bookstore.personal-projects.space/)

You can access the deployed version of Reading List here:

## [Reading List](https://bookstore.personal-projects.space/)

## Table of Contents

- [Description](#Description)
- [Installation](#Installation)
- [Deploying](#Deploying)
- [Usage](#Usage)
- [Tests](#Tests)
- [Questions](#Questions)
- [Authors](#Authors)

## Description

Explore new books by authors or categories, add them to your personal list, and mark them complete once you read them one by one!

---

It is a full-stack Laravel/Vue3 application that utilizes Vue3 composables.

## Installation

You need [Node.js](https://nodejs.org/en/), [yarn package manager](https://yarnpkg.com/), [PHP7](https://www.php.net/downloads.php), and [composer](https://getcomposer.org/) installed to run this app.

To install all the dependencies required to run this app, in the root folder run

```bash
cd backend
composer install

```

and

```bash
cd frontend
yarn
```

## Deploying

### Back-end

- Rename the `/backend/.env.example` to `/backend/.env` and enter your API key for [Google Books API](https://developers.google.com/books/docs/overview) as well as your MySQL database credentials
- Set up a PHP server like Nginx or Apache to serve the Laravel backend

### Front-end

- Rename the `/frontend/.env.example` to `/frontend/.env` and enter your back-end API server address

- Build the front-end by running

```bash
cd frontend
yarn build
```

- Statically serve the front-end from the `/frontend/dist` folder in a way that works best for you

---

The app is currently deployed to an EC2 AWS VPS with Nginx statically serving both front-end and back-end. All config files can be found in `/nginx` directory.

## Usage

To open the development version of the app, simultaneously run

```bash
cd backend
php artisan serve
```

and

```bash
cd frontend
yarn dev
```

## Tests

This application has front-end unit tests

To test the app, run

```bash
cd frontend
yarn test
```

## Questions

Reach out with any questions by email:  
sd32@pm.me

## Authors

Maksim Verkhoturov

## Attribution

- Book icon used in the header was made by [Zlatko Najdenovski](https://www.flaticon.com/authors/zlatko-najdenovski) from [flaticon.com](https://flaticon.com/)
