document.addEventListener('DOMContentLoaded', () => {

// ===== GESTION DU MENU NAVBAR POUR MOBILE =====
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
};

// ===== GESTION DU LIEN ACTIF ET NAVBAR STICKY AU SCROLL =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

// ===== ANIMATION SCROLL REVEAL =====
ScrollReveal({ reset: true, distance: '40px', duration: 2000, delay: 200 });
ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .skills-container, .projects-container, .contact form, .experience-container, .education-container', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// ===== ANIMATION TEXTE TAPÉ (TYPED.JS) =====
let typed;
const typedStrings = {
    fr: ['Full-Stack Java', 'Spring Boot', 'Angular / React', 'Mobile Flutter'],
    en: ['Java Full-Stack', 'Spring Boot', 'Angular / React', 'Mobile Flutter'],
    ar: ['جافا فول ستاك', 'سبرينج بوت', 'أنجولار / رياكت', 'تطوير الموبايل بفلاتر']
};
function initTyped(lang) {
    if (typed) {
        typed.destroy();
    }
    typed = new Typed('.multiple-text', {
        strings: typedStrings[lang],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
}

// ===== GESTION DU FORMULAIRE DE CONTACT SANS REDIRECTION =====
const form = document.querySelector('.contact form');
const submitButton = form.querySelector('button[type="submit"]');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = {};
    formData.forEach((value, key) => { object[key] = value; });
    const json = JSON.stringify(object);
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = "Envoi en cours...";
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: json
    })
    .then(async (response) => {
        let jsonResponse = await response.json();
        if (response.status == 200) {
            submitButton.innerHTML = "Message envoyé !";
        } else {
            submitButton.innerHTML = "Erreur, veuillez réessayer";
        }
    })
    .catch(error => {
        submitButton.innerHTML = "Erreur, veuillez réessayer";
    })
    .then(() => {
        form.reset();
        setTimeout(() => {
            submitButton.innerHTML = originalButtonText;
        }, 4000);
    });
});

// ===== SYSTÈME DE TRADUCTION =====
const langSwitcher = document.querySelector('.lang-switcher');
const selectedLang = document.querySelector('.selected-lang');
const langOptions = document.querySelectorAll('.lang-dropdown li');
const selectedFlag = document.getElementById('selected-flag');
const selectedLangText = document.getElementById('selected-lang-text');

const translations = {
    fr: {
        page_title: "Portfolio | Hamza Abid",
        nav_home: "Accueil",
        nav_experience: "Expériences",
        nav_skills: "Compétences",
        nav_education: "Formation",
        nav_projects: "Projets",
        nav_additional_info: "Plus d'Infos",
        nav_contact: "Contact",
        home_greeting: "Bonjour, je suis",
        home_role_prefix: "Ingénieur Développement",
        home_intro: "Développeur Full-Stack passionné, spécialisé en Java, Spring, Angular et React. Je transforme des idées complexes en applications web et mobiles performantes et innovantes.",
        home_download_cv_button: "Télécharger mon CV <i class='fa-solid fa-download'></i>",
        about_heading: "À Propos de <span>Moi</span>",
        about_subtitle: "Développeur Full-Stack",
        about_p1: "Ingénieur en Informatique et Réseaux, je suis un développeur Full-Stack passionné par l’innovation, avec une double expertise en applications web et mobiles. Mon parcours m’a permis de concevoir et de déployer des projets concrets en Java/Spring Boot, Angular, React et Flutter, en intégrant APIs, sécurité, performance et expérience utilisateur. Animé par la curiosité et le goût du défi, je m’investis pleinement dans chaque projet, en favorisant la collaboration, l’apprentissage continu et la recherche de solutions à forte valeur ajoutée.",
        experience_heading: "Parcours <span>Professionnel</span>",
        exp1_title: "Développeur Full-Stack Mobile Flutter",
        exp1_date: "<i class='fa-solid fa-calendar-alt'></i> Fév 2025 - Juil 2025",
        exp1_desc: "Application mobile de génération d’eBooks avec IA (Flutter, GPT-4o, DALL·E 3).",
        exp1_task1: "<i class='fa-solid fa-circle-check'></i> Rédaction du cahier des charges fonctionnel et technique.",
        exp1_task2: "<i class='fa-solid fa-circle-check'></i> Conception d’une architecture full-stack sécurisée et développement backend avec Node.js.",
        exp1_task3: "<i class='fa-solid fa-circle-check'></i> Implémentation de fonctionnalités de création de compte, connexion, et export des eBooks.",
        exp1_task4: "<i class='fa-solid fa-circle-check'></i> Mise en place d’un filtrage côté serveur pour contrôler les prompts et éviter les dérives.",
        exp2_title: "Développeur Full-Stack",
        exp2_date: "<i class='fa-solid fa-calendar-alt'></i> Juil 2024 - Sep 2024",
        exp2_desc: "Développement d’une application web/mobile pour identifier les actions d’entreprises conformes à la Charia (normes AAOIFI).",
        exp2_task1: "<i class='fa-solid fa-circle-check'></i> Étude des API financières (Financial Modeling Prep, Zoya) pour l’analyse des actions.",
        exp2_task2: "<i class='fa-solid fa-circle-check'></i> Développement du backend avec Java Spring Boot, Spring Security (JWT), et MySQL.",
        exp2_task3: "<i class='fa-solid fa-circle-check'></i> Réalisation du frontend web avec Angular et mobile avec Flutter, en intégrant Tailwind CSS.",
        exp2_task4: "<i class='fa-solid fa-circle-check'></i> Implémentation d’un système de filtrage Shariah (revenus, dettes, etc.).",
        exp3_title: "Développeur Full-Stack",
        exp3_date: "<i class='fa-solid fa-calendar-alt'></i> Juil 2023 - Sep 2023",
        exp3_desc: "Développement de G-Tickets, application Help Desk pour la gestion des incidents chez SAFILAIT.",
        exp3_task1: "<i class='fa-solid fa-circle-check'></i> Permet la déclaration de pannes (matériel/logiciel) et leur traitement par les administrateurs.",
        exp3_task2: "<i class='fa-solid fa-circle-check'></i> Conception du backend, de la base de données et de l'interface pour le suivi des tickets.",
        tech_env_title: "Environnement technique :",
        skills_heading: "Mes <span>Compétences</span>",
        skills_backend_title: "Backend",
        skills_backend_desc: "Spring Boot (MVC, Security, Cloud), Kafka, Docker, Kubernetes, Node.js (Express, JWT), Django, Flask",
        skills_frontend_title: "Frontend",
        skills_frontend_desc: "Angular, React, Flutter, JavaScript/TypeScript, HTML5, CSS3, Tailwind CSS, Bootstrap",
        skills_languages_title: "Langages",
        skills_languages_desc: "Java, Python, Dart, C#, JavaScript/TypeScript, SQL, PL/SQL",
        skills_db_title: "Bases de Données",
        skills_db_desc: "MySQL, PostgreSQL, Oracle, SQL Server, MongoDB, JPA/Hibernate",
        skills_arch_title: "Architectures",
        skills_arch_desc: "Microservices, REST, Design Patterns (Builder, Factory)",
        skills_tools_title: "IDE & Outils",
        skills_tools_desc: "IntelliJ IDEA, VS Code, Git, Postman, PyCharm, Android Studio, XAMPP",
        skills_devops_title: "DevOps & Cloud", // NOUVEAU
skills_devops_desc: "Docker, Kubernetes, CI/CD Pipelines.", // NOUVEAU
        education_heading: "Formation & <span>Certifications</span>",
        education_degrees_title: "<i class='fa-solid fa-graduation-cap'></i> Diplômes",
        degree1_title: "Ingénieur en Informatique et Réseaux",
        degree1_school: "EMSI - École Marocaine des Sciences de l’Ingénieur",
        degree2_title: "Baccalauréat en Sciences Physiques",
        degree2_school: "Lycée Oulad Hriz, Berrechid",
        education_certs_title: "<i class='fa-solid fa-award'></i> Certifications",
        projects_heading: "Mes <span>Projets</span>",
        project1_title: "Plateforme d'Assistance Médicale Intelligente",
        project1_desc: "Développement d’une plateforme intégrant un LLM pour aider les patients à obtenir des réponses intelligentes à leurs symptômes.",
        project2_title: "Sales Management",
        project2_desc: "Application web de gestion des ventes avec authentification sécurisée et tableau de bord.",
        project3_title: "Application Flutter de Détection de Fruits",
        project3_desc: "Application mobile de reconnaissance d’images de fruits à l’aide d’un modèle d’intelligence artificielle.",
        project4_title: "Application de Gestion de Tâches",
        project4_desc: "Application de gestion de tâches avec authentification sécurisée via Keycloak et interface web responsive.",
        project5_title: "Plateforme E-Vêtements",
        project5_desc: "Développement d’une plateforme e-commerce simple dédiée à la vente de vêtements.",
        project6_title: "E-Credit Management",
        project6_desc: "Projet CRUD de gestion de crédit développé en ASP.NET, offrant une interface conviviale pour gérer efficacement les demandes de crédit.",
        additional_info_heading: "Plus d'<span>Infos</span>",
        tab_soft_skills: "Soft Skills",
        ss_autonomy: "Autonomie",
        ss_communication: "Communication",
        ss_rigor: "Rigueur",
        ss_teamwork: "Esprit d’équipe",
        ss_problem_solving: "Résolution de problèmes",
        ss_curiosity: "Curiosité technique",
        tab_languages: "Langues",
        lang_en: "Anglais : Langue de formation",
        lang_ar: "Arabe : Maternel",
        lang_fr: "Français : Courant",
        tab_interests: "Centres d'intérêt",
        int_fitness: "Musculation & bien-être physique",
        int_travel: "Voyages & cultures",
        contact_heading: "Contactez-<span>Moi !</span>",
        contact_form_name_label: "Nom Complet",
        contact_form_email_label: "Adresse Email",
        contact_form_subject_label: "Sujet",
        contact_form_message_label: "Votre Message",
        contact_form_button: "Envoyer le Message <i class='fa-solid fa-paper-plane'></i>",
        footer_text: "&copy; 2025 Hamza Abid | Tous droits réservés."
    },
    en: {
        page_title: "Portfolio | Hamza Abid",
        nav_home: "Home",
        nav_experience: "Experience",
        nav_skills: "Skills",
        nav_education: "Education",
        nav_projects: "Projects",
        nav_additional_info: "More Info",
        nav_contact: "Contact",
        home_greeting: "Hello, I am",
        home_role_prefix: "Development Engineer",
        home_intro: "Passionate Full-Stack Developer specializing in Java, Spring, Angular, and React. I transform complex ideas into high-performance and innovative web and mobile applications.",
        home_download_cv_button: "Download my CV <i class='fa-solid fa-download'></i>",
        about_heading: "About <span>Me</span>",
        about_subtitle: "Full-Stack Developer",
        about_p1: "As a Computer Science and Networks Engineer, I am a Full-Stack developer passionate about innovation, with dual expertise in web and mobile applications. My journey has allowed me to design and deploy concrete projects using Java/Spring Boot, Angular, React, and Flutter, integrating APIs, security, performance, and user experience. Driven by curiosity and a love for challenges, I fully commit to each project, promoting collaboration, continuous learning, and the search for high-value solutions.",
        experience_heading: "Professional <span>Experience</span>",
        exp1_title: "Full-Stack Mobile Flutter Developer",
        exp1_date: "<i class='fa-solid fa-calendar-alt'></i> Feb 2025 - Jul 2025",
        exp1_desc: "Mobile application for generating eBooks with AI (Flutter, GPT-4o, DALL·E 3).",
        exp1_task1: "<i class='fa-solid fa-circle-check'></i> Drafting of functional and technical specifications.",
        exp1_task2: "<i class='fa-solid fa-circle-check'></i> Design of a secure full-stack architecture and backend development with Node.js.",
        exp1_task3: "<i class='fa-solid fa-circle-check'></i> Implementation of account creation, login, and eBook export features.",
        exp1_task4: "<i class='fa-solid fa-circle-check'></i> Set up server-side filtering to control prompts and prevent misuse.",
        exp2_title: "Full-Stack Developer",
        exp2_date: "<i class='fa-solid fa-calendar-alt'></i> Jul 2024 - Sep 2024",
        exp2_desc: "Development of a web/mobile application to identify Sharia-compliant company stocks (AAOIFI standards).",
        exp2_task1: "<i class='fa-solid fa-circle-check'></i> Study of financial APIs (Financial Modeling Prep, Zoya) for stock analysis.",
        exp2_task2: "<i class='fa-solid fa-circle-check'></i> Backend development with Java Spring Boot, Spring Security (JWT), and MySQL.",
        exp2_task3: "<i class='fa-solid fa-circle-check'></i> Creation of the web frontend with Angular and mobile with Flutter, integrating Tailwind CSS.",
        exp2_task4: "<i class='fa-solid fa-circle-check'></i> Implementation of a Shariah filtering system (revenue, debt, etc.).",
        exp3_title: "Full-Stack Developer",
        exp3_date: "<i class='fa-solid fa-calendar-alt'></i> Jul 2023 - Sep 2023",
        exp3_desc: "Development of G-Tickets, a Help Desk application for incident management at SAFILAIT.",
        exp3_task1: "<i class='fa-solid fa-circle-check'></i> Allows reporting of hardware/software failures and their processing by administrators.",
        exp3_task2: "<i class='fa-solid fa-circle-check'></i> Design of the backend, database, and interface for ticket tracking.",
        tech_env_title: "Technical Environment:",
        skills_heading: "My <span>Skills</span>",
        skills_backend_title: "Backend",
        skills_backend_desc: "Spring Boot (MVC, Security, Cloud), Kafka, Docker, Kubernetes, Node.js (Express, JWT), Django, Flask",
        skills_frontend_title: "Frontend",
        skills_frontend_desc: "Angular, React, Flutter, JavaScript/TypeScript, HTML5, CSS3, Tailwind CSS, Bootstrap",
        skills_languages_title: "Languages",
        skills_languages_desc: "Java, Python, Dart, C#, JavaScript/TypeScript, SQL, PL/SQL",
        skills_db_title: "Databases",
        skills_db_desc: "MySQL, PostgreSQL, Oracle, SQL Server, MongoDB, JPA/Hibernate",
        skills_arch_title: "Architectures",
        skills_arch_desc: "Microservices, REST, Design Patterns (Builder, Factory)",
        skills_tools_title: "IDEs & Tools",
        skills_tools_desc: "IntelliJ IDEA, VS Code, Git, Postman, PyCharm, Android Studio, XAMPP",
        skills_devops_title: "DevOps & Cloud", // NOUVEAU
skills_devops_desc: "Docker, Kubernetes, CI/CD Pipelines.", // NOUVEAU
        education_heading: "Education & <span>Certifications</span>",
        education_degrees_title: "<i class='fa-solid fa-graduation-cap'></i> Degrees",
        degree1_title: "Engineer in Computer Science and Networks",
        degree1_school: "EMSI - Moroccan School of Engineering Sciences",
        degree2_title: "Baccalaureate in Physical Sciences",
        degree2_school: "Oulad Hriz High School, Berrechid",
        education_certs_title: "<i class='fa-solid fa-award'></i> Certifications",
        projects_heading: "My <span>Projects</span>",
        project1_title: "Intelligent Medical Assistance Platform",
        project1_desc: "Development of a platform integrating an LLM to help patients get intelligent answers to their symptoms.",
        project2_title: "Sales Management",
        project2_desc: "Web application for sales management with secure authentication and a dashboard.",
        project3_title: "Flutter Fruit Detection Application",
        project3_desc: "Mobile application for recognizing fruit images using an artificial intelligence model.",
        project4_title: "Task Management Application",
        project4_desc: "Task management application with secure authentication via Keycloak and a responsive web interface.",
        project5_title: "E-Clothing Platform",
        project5_desc: "Development of a simple e-commerce platform dedicated to selling clothes.",
        project6_title: "E-Credit Management",
        project6_desc: "CRUD project for credit management developed using ASP.NET, providing a user-friendly interface for efficiently managing credit requests.",
        additional_info_heading: "More <span>Info</span>",
        tab_soft_skills: "Soft Skills",
        ss_autonomy: "Autonomy",
        ss_communication: "Communication",
        ss_rigor: "Rigor",
        ss_teamwork: "Teamwork",
        ss_problem_solving: "Problem Solving",
        ss_curiosity: "Technical Curiosity",
        tab_languages: "Languages",
        lang_en: "English: Language of instruction",
        lang_ar: "Arabic: Native",
        lang_fr: "French: Fluent",
        tab_interests: "Interests",
        int_fitness: "Fitness & Well-being",
        int_travel: "Travel & Cultures",
        contact_heading: "Contact <span>Me!</span>",
        contact_form_name_label: "Full Name",
        contact_form_email_label: "Email Address",
        contact_form_subject_label: "Subject",
        contact_form_message_label: "Your Message",
        contact_form_button: "Send Message <i class='fa-solid fa-paper-plane'></i>",
        footer_text: "&copy; 2025 Hamza Abid | All rights reserved."
    },
    ar: {
        page_title: "ملف أعمال | حمزة عبيد",
        nav_home: "الرئيسية",
        nav_experience: "الخبرات",
        nav_skills: "المهارات",
        nav_education: "التعليم",
        nav_projects: "المشاريع",
        nav_additional_info: "معلومات إضافية",
        nav_contact: "اتصل بي",
        home_greeting: "مرحباً، أنا",
        home_role_prefix: "مهندس تطوير",
        home_intro: "مطور فول ستاك شغوف، متخصص في Java، Spring، Angular، و React. أحول الأفكار المعقدة إلى تطبيقات ويب وموبايل مبتكرة وعالية الأداء.",
        home_download_cv_button: "تحميل سيرتي الذاتية <i class='fa-solid fa-download'></i>",
        about_heading: "<span>عني</span>",
        about_subtitle: "مطور فول ستاك",
        about_p1: "مهندس في الإعلاميات والشبكات، أنا مطور فول ستاك شغوف بالابتكار، ولدي خبرة مزدوجة في تطبيقات الويب والموبايل. أتاح لي مساري المهني تصميم ونشر مشاريع ملموسة باستخدام Java/Spring Boot، Angular، React، وFlutter، مع دمج واجهات برمجة التطبيقات، والأمان، والأداء، وتجربة المستخدم. بدافع من الفضول وحب التحدي، أستثمر نفسي بالكامل في كل مشروع، معززًا التعاون والتعلم المستمر والبحث عن حلول ذات قيمة مضافة عالية.",
        experience_heading: "المسار <span>المهني</span>",
        exp1_title: "مطور فول ستاك لتطبيقات الموبايل بفلاتر",
        exp1_date: "<i class='fa-solid fa-calendar-alt'></i> فبراير 2025 - يوليو 2025",
        exp1_desc: "تطبيق موبايل لتوليد الكتب الإلكترونية بالذكاء الاصطناعي (Flutter, GPT-4o, DALL·E 3).",
        exp1_task1: "<i class='fa-solid fa-circle-check'></i> صياغة المواصفات الوظيفية والتقنية.",
        exp1_task2: "<i class='fa-solid fa-circle-check'></i> تصميم بنية فول ستاك آمنة وتطوير الواجهة الخلفية باستخدام Node.js.",
        exp1_task3: "<i class='fa-solid fa-circle-check'></i> تنفيذ وظائف إنشاء الحساب وتسجيل الدخول وتصدير الكتب الإلكترونية.",
        exp1_task4: "<i class='fa-solid fa-circle-check'></i> إعداد نظام فلترة من جانب الخادم للتحكم في المدخلات وتجنب الانحرافات.",
        exp2_title: "مطور فول ستاك",
        exp2_date: "<i class='fa-solid fa-calendar-alt'></i> يوليو 2024 - سبتمبر 2024",
        exp2_desc: "تطوير تطبيق ويب/موبايل لتحديد أسهم الشركات المتوافقة مع الشريعة (معايير AAOIFI).",
        exp2_task1: "<i class='fa-solid fa-circle-check'></i> دراسة واجهات برمجة التطبيقات المالية (Financial Modeling Prep, Zoya) لتحليل الأسهم.",
        exp2_task2: "<i class='fa-solid fa-circle-check'></i> تطوير الواجهة الخلفية باستخدام Java Spring Boot و Spring Security (JWT) و MySQL.",
        exp2_task3: "<i class='fa-solid fa-circle-check'></i> إنشاء واجهة الويب باستخدام Angular والموبايل باستخدام Flutter مع دمج Tailwind CSS.",
        exp2_task4: "<i class='fa-solid fa-circle-check'></i> تنفيذ نظام فلترة شرعي (الإيرادات، الديون، إلخ).",
        exp3_title: "مطور فول ستاك",
        exp3_date: "<i class='fa-solid fa-calendar-alt'></i> يوليو 2023 - سبتمبر 2023",
        exp3_desc: "تطوير G-Tickets، تطبيق مكتب مساعدة لإدارة الحوادث في شركة صافي lait.",
        exp3_task1: "<i class='fa-solid fa-circle-check'></i> يسمح بالإبلاغ عن أعطال الأجهزة/البرامج ومعالجتها من قبل المسؤولين.",
        exp3_task2: "<i class='fa-solid fa-circle-check'></i> تصميم الواجهة الخلفية وقاعدة البيانات والواجهة لتتبع التذاكر.",
        tech_env_title: "البيئة التقنية:",
        skills_heading: "<span>مهاراتي</span>",
        skills_backend_title: "الواجهات الخلفية",
        skills_backend_desc: "Spring Boot (MVC, Security, Cloud), Kafka, Docker, Kubernetes, Node.js (Express, JWT), Django, Flask",
        skills_frontend_title: "الواجهات الأمامية",
        skills_frontend_desc: "Angular, React, Flutter, JavaScript/TypeScript, HTML5, CSS3, Tailwind CSS, Bootstrap",
        skills_languages_title: "لغات البرمجة",
        skills_languages_desc: "Java, Python, Dart, C#, JavaScript/TypeScript, SQL, PL/SQL",
        skills_db_title: "قواعد البيانات",
        skills_db_desc: "MySQL, PostgreSQL, Oracle, SQL Server, MongoDB, JPA/Hibernate",
        skills_arch_title: "الهندسة المعمارية",
        skills_arch_desc: "Microservices, REST, Design Patterns (Builder, Factory)",
        skills_tools_title: "الأدوات والبيئات",
        skills_tools_desc: "IntelliJ IDEA, VS Code, Git, Postman, PyCharm, Android Studio, XAMPP",
        skills_devops_title: "DevOps والسحابة", // NOUVEAU
skills_devops_desc: "Docker, Kubernetes, CI/CD Pipelines.", // NOUVEAU
        education_heading: "التعليم و <span>الشهادات</span>",
        education_degrees_title: "<i class='fa-solid fa-graduation-cap'></i> الشهادات الجامعية",
        degree1_title: "مهندس في علوم الحاسوب والشبكات",
        degree1_school: "المدرسة المغربية لعلوم المهندس - EMSI",
        degree2_title: "بكالوريا في العلوم الفيزيائية",
        degree2_school: "ثانوية أولاد حريز، برشيد",
        education_certs_title: "<i class='fa-solid fa-award'></i> الشهادات الاحترافية",
        projects_heading: "<span>مشاريعي</span>",
        project1_title: "منصة المساعدة الطبية الذكية",
        project1_desc: "تطوير منصة تدمج نموذجًا لغويًا كبيرًا لمساعدة المرضى في الحصول على إجابات ذكية لأعراضهم.",
        project2_title: "إدارة المبيعات",
        project2_desc: "تطبيق ويب لإدارة المبيعات مع مصادقة آمنة ولوحة تحكم.",
        project3_title: "تطبيق فلاتر لكشف الفاكهة",
        project3_desc: "تطبيق موبايل للتعرف على صور الفاكهة باستخدام نموذج ذكاء اصطناعي.",
        project4_title: "تطبيق إدارة المهام",
        project4_desc: "تطبيق لإدارة المهام مع مصادقة آمنة عبر Keycloak وواجهة ويب متجاوبة.",
        project5_title: "منصة ملابس إلكترونية",
        project5_desc: "تطوير منصة تجارة إلكترونية بسيطة مخصصة لبيع الملابس.",
        project6_title: "إدارة القروض إلكترونياً",
        project6_desc: "مشروع CRUD لإدارة القروض مطوّر باستخدام ASP.NET، يوفر واجهة سهلة الاستخدام لإدارة طلبات القروض بكفاءة.",
        additional_info_heading: "<span>معلومات إضافية</span>",
        tab_soft_skills: "المهارات الشخصية",
        ss_autonomy: "الاستقلالية",
        ss_communication: "التواصل",
        ss_rigor: "الدقة",
        ss_teamwork: "روح الفريق",
        ss_problem_solving: "حل المشكلات",
        ss_curiosity: "الفضول التقني",
        tab_languages: "اللغات",
        lang_en: "الإنجليزية: لغة التكوين",
        lang_ar: "العربية: لغة أم",
        lang_fr: "الفرنسية: بطلاقة",
        tab_interests: "الاهتمامات",
        int_fitness: "اللياقة البدنية والعافية",
        int_travel: "السفر والثقافات",
        contact_heading: "<span>اتصل بي</span>",
        contact_form_name_label: "الاسم الكامل",
        contact_form_email_label: "البريد الإلكتروني",
        contact_form_subject_label: "الموضوع",
        contact_form_message_label: "رسالتك",
        contact_form_button: "إرسال الرسالة <i class='fa-solid fa-paper-plane'></i>",
        footer_text: "© 2025 حمزة عبيد | جميع الحقوق محفوظة."
    }
};

const setLanguage = (lang) => {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(el => {
        const key = el.getAttribute('data-translate');
        const translation = translations[lang][key];
        if (translation) {
            if (el.placeholder !== undefined) {
                el.placeholder = translation;
            } else {
                el.innerHTML = translation;
            }
        }
    });
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    const langData = {
        fr: { flag: 'https://flagcdn.com/w40/fr.png', text: 'FR' },
        en: { flag: 'https://flagcdn.com/w40/gb.png', text: 'EN' },
        ar: { flag: 'https://flagcdn.com/w40/ma.png', text: 'AR' }
    };
    selectedFlag.src = langData[lang].flag;
    selectedLangText.textContent = langData[lang].text;

    initTyped(lang);
    localStorage.setItem('language', lang);
};

selectedLang.addEventListener('click', () => {
    langSwitcher.classList.toggle('active');
});

langOptions.forEach(option => {
    option.addEventListener('click', () => {
        const lang = option.getAttribute('data-lang');
        setLanguage(lang);
        langSwitcher.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!langSwitcher.contains(e.target)) {
        langSwitcher.classList.remove('active');
    }
});

const savedLang = localStorage.getItem('language') || 'fr';
setLanguage(savedLang);


const imageSlider = () => {
    const images = document.querySelectorAll('.about-img-slider .slider-image');
    if (images.length > 1) {
        let currentImageIndex = 0;
        setInterval(() => {
            images[currentImageIndex].classList.remove('active');
            currentImageIndex = (currentImageIndex + 1) % images.length;
            images[currentImageIndex].classList.add('active');
        }, 4000);
    }
};
imageSlider();

// ===== SYSTÈME DE MODE SOMBRE (DARK MODE) =====
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = document.getElementById('darkModeIcon');

const enableDarkMode = () => {
    document.body.classList.add('dark-mode');
    darkModeIcon.classList.remove('fa-moon');
    darkModeIcon.classList.add('fa-sun');
    localStorage.setItem('darkMode', 'enabled');
};

const disableDarkMode = () => {
    document.body.classList.remove('dark-mode');
    darkModeIcon.classList.remove('fa-sun');
    darkModeIcon.classList.add('fa-moon');
    localStorage.setItem('darkMode', 'disabled');
};

if (localStorage.getItem('darkMode') === 'enabled') {
    enableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
    if (localStorage.getItem('darkMode') !== 'enabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});
    const tabs = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.getElementById(tab.dataset.tab);

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        tabContents.forEach(content => content.classList.remove('active'));
        target.classList.add('active');
    });
});

});