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

// github profile and repos
const profileContainer = document.getElementById("github-profile");
const reposContainer = document.getElementById("github-repos");

if (profileContainer && reposContainer) {
    fetchGitHubData();
}

async function fetchGitHubData() {
    try {
        // fetch profile
        const profileResponse = await fetch("https://api.github.com/users/bigmansinwoo-coder");
        if (!profileResponse.ok) {
            throw new Error("Failed to load profile");
        }
        const profile = await profileResponse.json();

        profileContainer.innerHTML =
            '<div class="github-profile-card">' +
                '<img src="' + profile.avatar_url + '" alt="GitHub Avatar">' +
                '<div class="github-profile-info">' +
                    '<h2>' + profile.name + '</h2>' +
                    '<p>' + (profile.bio || "No bio available") + '</p>' +
                    '<div class="github-stats">' +
                        '<span>Repos: ' + profile.public_repos + '</span>' +
                        '<span>Followers: ' + profile.followers + '</span>' +
                        '<span>Following: ' + profile.following + '</span>' +
                    '</div>' +
                '</div>' +
            '</div>';

        // fetch repos
        const reposResponse = await fetch("https://api.github.com/users/bigmansinwoo-coder/repos");
        if (!reposResponse.ok) {
            throw new Error("Failed to load repositories");
        }
        const repos = await reposResponse.json();

        var reposHTML = '<div class="repo-grid">';

        repos.forEach(function(repo) {
            reposHTML +=
                '<div class="repo-card">' +
                    '<h3><a href="' + repo.html_url + '" target="_blank">' + repo.name + '</a></h3>' +
                    '<p>' + (repo.description || "No description available") + '</p>' +
                    '<div class="repo-meta">' +
                        '<span>' + (repo.language || "N/A") + '</span>' +
                        '<span>Stars: ' + repo.stargazers_count + '</span>' +
                        '<span>Forks: ' + repo.forks_count + '</span>' +
                    '</div>' +
                '</div>';
        });

        reposHTML += '</div>';
        reposContainer.innerHTML = reposHTML;

    } catch (error) {
        profileContainer.innerHTML =
            '<div class="github-error">' +
                '<p>Failed to load GitHub data. Please try again later.</p>' +
            '</div>';
    }
}