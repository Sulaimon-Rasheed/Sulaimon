// navigator.geolocation.getCurrentPosition((position) => {
//     alert("You're at: " + position.coords.latitude + ", " + position.coords.longitude);
// });

const title1 = document.querySelector("#title1")
const title2 = document.querySelector("#title2")
const title3 = document.querySelector("#title3")
const timeAndTitle = document.querySelector("#timeAndTitle")


title1.addEventListener("mouseenter", ()=>{
    title1.style.color = "brown"
})
title1.addEventListener("mouseleave", ()=>{
    title1.style.color = "black"
    title1.style.background = "inherit"
    title1.style.padding = "0"
})
title2.addEventListener("mouseenter", ()=>{
    title2.style.color = "green"
})
title2.addEventListener("mouseleave", ()=>{
    title2.style.color = "black"
})
title3.addEventListener("mouseenter", ()=>{
    title3.style.color = "purple"
})
title3.addEventListener("mouseleave", ()=>{
    title3.style.color = "black"
})

timeAndTitle.addEventListener("mouseenter", ()=>{
    timeAndTitle.style.color = "blue"
})
timeAndTitle.addEventListener("mouseleave", ()=>{
    timeAndTitle.style.background = "inherit"
})



