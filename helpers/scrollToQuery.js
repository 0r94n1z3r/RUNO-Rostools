export default (query) => {
    document.querySelector(query).scrollIntoView({ behavior: "smooth" });;
}