// Smooth Scrolling for Navigation
const navLinks = document.querySelectorAll('#sidebar nav ul li a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Skill Bar Animation on Scroll
const skillBars = document.querySelectorAll('.skill .progress span');

const handleScroll = () => {
    skillBars.forEach(skill => {
        const skillTop = skill.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (skillTop < windowHeight - 50) {
            skill.style.width = skill.dataset.width;
        }
    });

    // Hide or Show Sidebar and Navigation Links on Scroll
    const sidebar = document.getElementById('sidebar');
    const navLinksContainer = document.getElementById('nav-links');
    let lastScrollY = window.scrollY;

    if (window.scrollY > lastScrollY) {
        // Scrolling down
        sidebar.classList.add('hidden');
        navLinksContainer.classList.add('hidden');
    } else {
        // Scrolling up
        sidebar.classList.remove('hidden');
        navLinksContainer.classList.remove('hidden');
    }

    lastScrollY = window.scrollY;
};

// Initial Animation Trigger
handleScroll();

// Event listener for scroll to trigger both skill bar and visibility toggles
window.addEventListener('scroll', handleScroll);

// Service Card Hover Effect
const serviceCards = document.querySelectorAll('.service');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
        card.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.2)';
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
        card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
});

// Função para calcular a idade
function calcIdade(diaNascimento, mesNascimento, anoNascimento) {
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtual = hoje.getMonth() + 1;
    const diaAtual = hoje.getDate();

    let idade = anoAtual - anoNascimento;

    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
        idade--;
    }

    return idade;
}



// Função para atualizar os links ativos na navegação
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#nav-links a');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`#nav-links a[href="#${id}"]`);

            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    }, {
        threshold: 0.5 // Seção visível em 50% da tela
    });

    sections.forEach(section => observer.observe(section));
}

document.addEventListener('DOMContentLoaded', () => {
    const idade = calcIdade(26, 6, 2007);
    document.getElementById("idade").textContent = idade;
    
    // Chama a função para monitorar o scroll e revelar as seções
    revealOnScroll();

    // Chama a função para atualizar os links ativos na navegação
    updateActiveNavLink();

    document.getElementById('contact-form').addEventListener('submit', enviarFormularioContato);
});


// Função para revelar seções ao rolar a página
function revealOnScroll() {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1 // Seção visível em 10% da tela
    });

    sections.forEach(section => observer.observe(section));
}

// Função para enviar o formulário de contato
function enviarFormularioContato(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    fetch('enviar_formulario.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert('Mensagem enviada com sucesso!');
        form.reset();
    })
    .catch(error => {
        alert('Ocorreu um erro ao enviar a mensagem.');
        console.error('Erro:', error);
    });
}

// ...existing code...