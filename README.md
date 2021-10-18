# SOLGACOM Client

This is the part in charge of the front of Solgacom application. The application is developed using React [React Documentation](https://es.reactjs.org/docs/).

## Getting Started

---

If you don't have installed Node js install it at the following link [Install Node js](https://nodejs.org/es/download/).

Once installed, write the following command at root repertory:

``npm update``

## Local Test

---

You must execute the following command at the repertory root path:

``npm run dev``

This command will execute our application

## Git Workflow

---

There are 2 main branches in the projet:

1. main
2. develop

Every developer has their own branch called **features-developername** where it will make its modifications locally to later make a merge request to develop branch

If you don't know how to make this process, please contact r.zuniga@solganeo.com or check the following documentation [Branch WorkFlow git](https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows). 


## Directories

---

### public

> "Compiled files" once we execute **npm run build** this reperotory is filled with html, css and js files. (It's automatically did by heroku)

### src

> All the React Component are created there. 

* **assets**:           Images, mp3, videos etc...
* **components**:       Header, Footer, SideBar components
* **js**:               JavaScript files used in projet
* **views**:            Different vues used, there are components reperoties also inside.

### .env

> When we deploy web applications, sometimes it's important to use envronment variables that will help us to change some values without changing code. In this case there is 2 environment files **.env.development** and **.env.production**.