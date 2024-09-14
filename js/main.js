document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.getElementById('preloader');
    const worldUpdated = document.getElementById('worldUpdated');
    const populationEl = document.getElementById('population');
    const worldCasesEl = document.getElementById('worldCases');
    const worldDeathsEl = document.getElementById('worldDeaths');
    const worldRecoveredEl = document.getElementById('worldRecovered');
    const worldActiveEl = document.getElementById('worldActive');
    const citeEl = document.getElementById('cite');
    const citeAuthorEl = document.getElementById('citeAuthor');

    window.onload = () => preloader.remove();

    const formatNumber = (num) => num.toLocaleString();

    const initDataTable = () => {
        $("#breakdown").DataTable({
            ajax: {
                url: "https://disease.sh/v3/covid-19/countries/",
                dataSrc: ""
            },
            columnDefs: [{
                targets: 0,
                data: "countryInfo.flag",
                render: (data) => `<img src="${data}"/>`,
            }],
            columns: [{
                    data: "countryInfo.flag"
                },
                {
                    data: "country"
                },
                {
                    data: "cases",
                    render: $.fn.dataTable.render.number(',', '.')
                },
                {
                    data: "deaths",
                    render: $.fn.dataTable.render.number(',', '.')
                },
                {
                    data: "recovered",
                    render: $.fn.dataTable.render.number(',', '.')
                },
                {
                    data: "active",
                    render: $.fn.dataTable.render.number(',', '.')
                },
                {
                    data: "critical",
                    render: $.fn.dataTable.render.number(',', '.')
                },
                {
                    data: "tests",
                    render: $.fn.dataTable.render.number(',', '.')
                },
                {
                    data: "todayCases",
                    render: $.fn.dataTable.render.number(',', '.')
                },
                {
                    data: "todayDeaths",
                    render: $.fn.dataTable.render.number(',', '.')
                },
                {
                    data: "casesPerOneMillion",
                    render: $.fn.dataTable.render.number(',', '.')
                },
                {
                    data: "deathsPerOneMillion",
                    render: $.fn.dataTable.render.number(',', '.')
                },
                {
                    data: "testsPerOneMillion",
                    render: $.fn.dataTable.render.number(',', '.')
                },
            ],
            scrollX: true,
            scrollY: true,
            orderClasses: true,
            order: [2, "desc"],
            language: {
                searchPlaceholder: "Search for countries"
            },
        });
    };

    const initScrollReveal = () => {
        ScrollReveal().reveal('.header-txt h1', {
            delay: 150
        });
        ScrollReveal().reveal('.header-txt h2', {
            delay: 300
        });
        ScrollReveal().reveal('.header-txt h3', {
            delay: 450
        });
        ScrollReveal().reveal('.revealSeq', {
            distance: '50px',
            duration: 1500,
            easing: 'ease-in-out',
            origin: 'bottom',
            interval: 200
        });
    };

    const initParticles = () => {
        particlesJS("particles-js", {
            particles: {
                number: {
                    value: 600,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#E30923"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 5
                    },
                    image: {
                        src: "../assets/image/covid-icon.png",
                        width: 150,
                        height: 150
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 4,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: false,
                    distance: 150,
                    color: "#ff2640",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                },
            },
            interactivity: {
                detect_on: "window",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "repulse"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    },
                },
            },
            retina_detect: true,
        });
    };

    const quotes = [{
            author: "Kate McGahan",
            quote: "I've got some bad news and I've got some good news. Nothing lasts forever."
        },
        {
            author: "Marie Curie",
            quote: "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less."
        },
        {
            author: "Sir Richard Branson",
            quote: "To successfully work with other people, you have to trust each other. A big part of this is trusting people to get their work done wherever they are, without supervision."
        },
        {
            author: "Andy Gilman",
            quote: "The secret of crisis management is not good vs. bad, it's preventing the bad from getting worse."
        },
        {
            author: "Steve Maraboli",
            quote: "Life doesn't get easier or more forgiving, we get stronger and more resilient."
        },
        {
            author: "Kiran Mazumdar-Shaw",
            quote: "Ultimately, the greatest lesson that COVID-19 can teach humanity is that we are all in this together."
        },
        {
            author: "Michael Dell",
            quote: "Technology now allows people to connect anytime, anywhere, to anyone in the world, from almost any device. This is dramatically changing the way people work, facilitating 24/7 collaboration with colleagues who are dispersed across time zones, countries, and continents."
        },
        {
            author: "Mohamed El-Erian",
            quote: "Hopefully, as companies give more attention to the importance of work-life balance, more and more people will be in a better position to decide and act more holistically on what's important to them."
        },
    ];

    const randomQuote = () => {
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        citeEl.innerText = quote.quote;
        citeAuthorEl.innerText = quote.author;
    };

    const getCountryData = async () => {
        try {
            const response = await fetch("https://disease.sh/v3/covid-19/all");
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();

            worldUpdated.textContent = `Updated at ${new Date(data.updated).toLocaleString()}`;
            populationEl.textContent = formatNumber(data.population);
            worldCasesEl.textContent = formatNumber(data.cases);
            worldDeathsEl.textContent = formatNumber(data.deaths);
            worldRecoveredEl.textContent = formatNumber(data.recovered);
            worldActiveEl.textContent = formatNumber(data.active);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    initDataTable();
    initScrollReveal();
    initParticles();
    setInterval(randomQuote, 5500);
    getCountryData();
});