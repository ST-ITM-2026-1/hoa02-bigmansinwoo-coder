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