const skills = [
    { name: "PHP", logo: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg", stars: 4 },
    { name: "Symfony", logo: "https://img.icons8.com/?size=512&id=78295&format=png", stars: 3 },
    { name: "JavaScript", logo: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg", stars: 4 },
    { name: "SQL", logo: "https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png", stars: 5 },
    { name: "Docker", logo: "https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png", stars: 5 },
    { name: "C", logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png", stars: 3 },
    { name: "Java", logo: "https://upload.wikimedia.org/wikipedia/fr/2/2e/Java_Logo.svg", stars: 4 },
    { name: "Python", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", stars: 3 },
    { name: "CI/CD", logo: "https://about.gitlab.com/images/icons/ci-cd-logo.svg", stars: 4 },
    { name: "Bash", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Bash_Logo_Colored.svg/768px-Bash_Logo_Colored.svg.png?20180723054350", stars: 4 },
];

const tools = [
    { name: "Suite JetBrains", logo: "https://seeklogo.com/images/J/jetbrains-logo-CFBA1D6854-seeklogo.com.png", stars: 4 },
    { name: "Visual Studio Code", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/1024px-Visual_Studio_Code_1.35_icon.svg.png", stars: 3 },
    { name: "Trello", logo: "https://www.vectorlogo.zone/logos/trello/trello-tile.svg", stars: 3 },
    { name: "GitLab", logo: "https://cdn.worldvectorlogo.com/logos/gitlab.svg", stars: 5 },
    { name: "GitHub", logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg", stars: 4 },
];

// Fonction pour générer les cartes HTML
function generateCards(containerId, items) {
    const container = document.getElementById(containerId);
    items.forEach(item => {
        const stars = Array.from({ length: 5 }, (_, i) =>
            `<i class="${i < item.stars ? 'fas' : 'far'} fa-star star ${i < item.stars ? 'gold-star' : ''}"></i>`
        ).join('');

        container.innerHTML += `
                <div class="col-md-6 col-lg-4 mb-5">
                    <div class="card h-100 text-center border-0 shadow">
                        <div class="card-body d-flex flex-column align-items-center">
                            <img src="${item.logo}" alt="${item.name} Logo" class="img-fluid mb-3 skill-logo">
                            <h5 class="card-title">${item.name}</h5>
                            <div class="stars mb-3">${stars}</div>
                        </div>
                    </div>
                </div>
            `;
    });
}

// Générer les cartes pour les compétences et les outils
generateCards('skills-grid', skills);
generateCards('tools-grid', tools);