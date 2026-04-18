const toggle_button = document.getElementById("theme-toggle"); 

toggle_button.addEventListener("click", function(){
    document.body.classList.toggle("dark-theme");

    if(document.body.classList.contains("dark-theme")){
        toggle_button.textContent = "Light Mode";
    }else{
        toggle_button.textContent = "Dark Mode";
    }
    }
)

const filterButton = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButton.forEach(function(button){
    button.addEventListener("click", function(){
        const category = button.getAttribute("data-category");

        //update active button
        filterButton.forEach(function(btn){
            btn.classList.remove("active");
        })
        button.classList.add("active");

        //show or hide projects
        projectCards.forEach(function(card){
            if(category === "all" || card.getAttribute("data-category") === category){
                card.style.display = "block"
            }else{
                card.style.display = "none";
            }
        })
    })
})