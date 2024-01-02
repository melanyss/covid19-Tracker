document.addEventListener('DOMContentLoaded', function() {
    var preloader = document.getElementById('preloader');

    // You can use 'window.onload' if you want to wait for all content including images
    window.onload = function() {
        // Hide the preloader
        preloader.style.display = 'none';
        
        // Or remove it entirely
        // preloader.remove();
    };
});

$(document).ready(function () {
    $("#breakdown").DataTable({
        ajax: {
            url: "https://disease.sh/v3/covid-19/countries/",
            dataSrc: ""
        },
        columnDefs: [{
            targets: 0,
            data: "countryInfo.flag",
            render: function (e, t, a) {
                return '<img src="' + e + '"/>';
            },
        }, ],
        columns: [{
                data: "countryInfo.flag"
            },
            {
                data: "country"
            },
            {
                data: "cases",
                render: $.fn.dataTable.render.number(",", ".")
            },
            {
                data: "deaths",
                render: $.fn.dataTable.render.number(",", ".")
            },
            {
                data: "recovered",
                render: $.fn.dataTable.render.number(",", ".")
            },
            {
                data: "active",
                render: $.fn.dataTable.render.number(",", ".")
            },
            {
                data: "critical",
                render: $.fn.dataTable.render.number(",", ".")
            },
            {
                data: "tests",
                render: $.fn.dataTable.render.number(",", ".")
            },
            {
                data: "todayCases",
                render: $.fn.dataTable.render.number(",", ".")
            },
            {
                data: "todayDeaths",
                render: $.fn.dataTable.render.number(",", ".")
            },
            {
                data: "casesPerOneMillion",
                render: $.fn.dataTable.render.number(",", ".")
            },
            {
                data: "deathsPerOneMillion",
                render: $.fn.dataTable.render.number(",", ".")
            },
            {
                data: "testsPerOneMillion",
                render: $.fn.dataTable.render.number(",", ".")
            },
        ],
        scrollX: !0,
        scrollY: !0,
        orderClasses: !0,
        order: [2, "desc"],
        language: {
            searchPlaceholder: "Search for countries"
        },
    });

});

// Disease.sh API
var CovidStatus = {};
var historicalData = {};
var vaccineData = [];
var countryVaccineData = {};

// ScrollReveal
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
    interval: 200 // Interval for staggering the reveal of each item
});

// Particles
particlesJS("particles-js", {
    particles: {
        number: {
            value: 600,
            density: {
                enable: !0,
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
            random: !1,
            anim: {
                enable: !1,
                speed: 1,
                opacity_min: 0.1,
                sync: !1
            }
        },
        size: {
            value: 4,
            random: !0,
            anim: {
                enable: !1,
                speed: 40,
                size_min: 0.1,
                sync: !1
            }
        },
        line_linked: {
            enable: !1,
            distance: 150,
            color: "#ff2640",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: !0,
            speed: 6,
            direction: "none",
            random: !1,
            straight: !1,
            out_mode: "out",
            bounce: !1,
            attract: {
                enable: !1,
                rotateX: 600,
                rotateY: 1200
            }
        },
    },
    interactivity: {
        detect_on: "window",
        events: {
            onhover: {
                enable: !0,
                mode: "grab"
            },
            onclick: {
                enable: !0,
                mode: "repulse"
            },
            resize: !0
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
    retina_detect: !0,
});

// Quotes
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
        quote: "The secret of crisis management is not good vs. bad, it’s preventing the bad from getting worse."
    },
    {
        author: "Steve Maraboli",
        quote: "Life doesn’t get easier or more forgiving, we get stronger and more resilient."
    },
    {
        author: "Kiran Mazumdar-Shaw",
        quote: "Ultimately, the greatest lesson that COVID-19 can teach humanity is that we are all in this together."
    },
    {
        author: "Michael Dell",
        quote: "Technology now allows people to connect anytime, anywhere, to anyone in the world, from almost any device. This is dramatically changing the way people work, facilitating 24/7 collaboration with colleagues who are dispersed across time zones, countries, and continents.",
    },
    {
        author: "Mohamed El-Erian",
        quote: "Hopefully, as companies give more attention to the importance of work-life balance, more and more people will be in a better position to decide and act more holistically on what’s important to them.",
    },
];

function randomQuote() {
    let e = quotes[Math.floor(Math.random() * quotes.length)];
    (cite.innerText = `${e.quote}`), (citeAuthor.innerText = e.author);
}

setInterval(randomQuote, 5500);

am4core.ready(function () {
    getCountryData()
    getHistoricalData()
    getVaccineData()
    am4core.useTheme(am4themes_animated);

    // AM4Charts
    function getCountryData() {
        var e = new XMLHttpRequest();
        e.open("GET", "https://disease.sh/v3/covid-19/all", !0),
            e.setRequestHeader("Access-Control-Allow-Origin", "https://disease.sh"),
            (e.onload = function () {
                var t = JSON.parse(this.response);
                if (e.status >= 200 && e.status < 400) {
                    ((CovidStatus.totalCases = t.cases),
                        (CovidStatus.totalDeaths = t.deaths),
                        (CovidStatus.totalRecover = t.recovered),
                        (CovidStatus.totalActive = t.active),
                        (CovidStatus.updated = new Date(t.updated)),
                        (CovidStatus.population = t.population),
                        (CovidStatus.todayCases = t.todayCases),
                        (CovidStatus.todayDeaths = t.todayDeaths),
                        (CovidStatus.todayRecovered = t.todayRecovered),
                        (document.getElementById("worldCases").textContent = CovidStatus.totalCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")),
                        (document.getElementById("worldDeaths").textContent = CovidStatus.totalDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")),
                        (document.getElementById("worldRecovered").textContent = CovidStatus.totalRecover.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")),
                        (document.getElementById("worldActive").textContent = CovidStatus.totalActive.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")),
                        (document.getElementById("population").textContent = CovidStatus.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")),
                        (document.getElementById("worldUpdated").textContent = "Updated at " + CovidStatus.updated))

                    const pie1ChartData = [{
                            category: "Cases",
                            value: CovidStatus.totalCases
                        },
                        {
                            category: "Recovered",
                            value: CovidStatus.totalRecover
                        },
                        {
                            category: "Deaths",
                            value: CovidStatus.totalDeaths
                        }
                    ];
                    // const pie2ChartData = [{
                    //         category: "Recovered",
                    //         value: CovidStatus.totalRecover
                    //     },
                    //     {
                    //         category: "Deaths",
                    //         value: CovidStatus.totalDeaths
                    //     }
                    // ];
                    const pie3ChartData = [{
                            category: "New Cases",
                            value: CovidStatus.todayCases
                        },
                        {
                            category: "New Recoveries",
                            value: CovidStatus.todayRecovered
                        },
                        {
                            category: "New Deaths",
                            value: CovidStatus.todayDeaths
                        }
                    ];

                    createPieChart("pieChart1", pie1ChartData);
                    // createPieChart("pieChart2", pie2ChartData);
                    createPieChart("pieChart3", pie3ChartData);

                } else {
                    console.log("error");
                }
            }),
            e.send(CovidStatus);
    }

    function getVaccineData() {
        var e = new XMLHttpRequest();
        e.open("GET", "https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=1", !0),
            e.setRequestHeader("Access-Control-Allow-Origin", "https://disease.sh"),
            (e.onload = function () {
                var t = JSON.parse(this.response);
                if (e.status >= 200 && e.status < 400) {
                    // Extract unique dates and transform data
                    countryVaccineData = t;
                    createGlobeChart("lineChart1", countryVaccineData);
                } else {
                    console.log("error");
                }
            }),
            e.send(countryVaccineData);
    }

    function getHistoricalData() {
        var e = new XMLHttpRequest();
        e.open("GET", "https://disease.sh/v3/covid-19/historical/all?lastdays=all", !0),
            e.setRequestHeader("Access-Control-Allow-Origin", "https://disease.sh"),
            (e.onload = function () {
                var t = JSON.parse(this.response);

                function transformData(cases, deaths, recovered) {
                    const chartData = [];
                    for (const date in cases) {
                        const parsedDate = parseDate(date); // Implement this function
                        chartData.push({
                            date: parsedDate,
                            Cases: cases[date],
                            Deaths: deaths[date],
                            Recovered: recovered[date]
                        });
                    }
                    return chartData;
                }

                function parseDate(dateStr) {
                    const parts = dateStr.split('/');
                    const year = parseInt(parts[2], 10) + 2000;
                    const month = parseInt(parts[0], 10) - 1;
                    const day = parseInt(parts[1], 10);
                    return new Date(year, month, day);
                }

                historicalData = transformData(t.cases, t.deaths, t.recovered);
                if (e.status >= 200 && e.status < 400) {
                    createLineChart("chartDiv", historicalData);
                } else {
                    console.log("error gathering historical data");
                }
            }),
            e.send(historicalData);
    }

    function createPieChart(containerId, data) {
        var chart = am4core.create(containerId, am4charts.PieChart);
        chart.data = data;

        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "category";
        // Let's cut a hole in our Pie chart the size of 30% the radius
        chart.innerRadius = am4core.percent(10);
        // Put a thick white border around each Slice
        // pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;
        pieSeries.slices.template
            // change the cursor on hover to make it apparent the object can be interacted with
            .cursorOverStyle = [{
                "property": "cursor",
                "value": "pointer"
            }];

        pieSeries.alignLabels = true;
        pieSeries.labels.template.bent = true;
        pieSeries.labels.template.radius = 3;
        pieSeries.labels.template.padding(0, 0, 10, 0);
        pieSeries.ticks.template.disabled = true;

        // Create a base filter effect (as if it's not there) for the hover to return to
        var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
        shadow.opacity = 0;

        // Create hover state
        var hoverState = pieSeries.slices.template.states.getKey("hover");

        // Slightly shift the shadow and make it more prominent on hover
        var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
        hoverShadow.opacity = 0.7;
        hoverShadow.blur = 5;

        // Add a legend
        chart.legend = new am4charts.Legend();
    }

    function createLineChart(containerId, data) {
        var chart = am4core.create(containerId, am4charts.XYChart);
        chart.colors.step = 4;
        chart.data = data;

        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        // dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.minGridDistance = 50;
        dateAxis.renderer.line.strokeWidth = 4;
        dateAxis.renderer.line.strokeOpacity = 0.5;
        dateAxis.tooltipDateFormat = "dd MMM yyyy";

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.renderer.line.strokeOpacity = 0.5;
        valueAxis.renderer.line.strokeWidth = 4;
        if (valueAxis.tooltip) {
            valueAxis.tooltip.disabled = true;
        }

        // Set input format for the dates
        chart.dateFormatter.inputDateFormat = "i";

        // Add legend
        chart.legend = new am4charts.Legend();
        chart.legend.scrollable = true;
        chart.legend.useDefaultMarker = true;
        chart.legend.parent = chart.chartContainer;
        chart.legend.toBack();
        chart.legend.labels.template.text = "Series: [bold {color}]{name}[/]";
        var marker = chart.legend.markers.template.children.getIndex(0);
        marker.cornerRadius(12, 12, 12, 12);
        marker.strokeWidth = 2;
        marker.strokeOpacity = 1;
        marker.stroke = am4core.color("#ccc");

        // Add cursor
        chart.cursor = new am4charts.XYCursor();
        chart.tooltip.label.interactionsEnabled = true;
        chart.tooltip.keepTargetHover = true;

        // Create series
        function createSeries(field, name) {
            // Set up series
            var series = chart.series.push(new am4charts.LineSeries());

            // Enable for all series
            chart.series.each(function (series) {
                series.tooltip.pointerOrientation = "vertical";
                series.tooltip.label.interactionsEnabled = true;
                series.tooltip.keepTargetHover = true;
                series.adapter.add("tooltipText", function (text, target) {
                    let dataItem = target.tooltipDataItem;
                    if (dataItem) {
                        let date = chart.dateFormatter.format(dataItem.dateX, "dd MMM yyyy");
                        let value = dataItem.valueY;
                        value = value.toString();
                        value = value.split(/(?=(?:...)*$)/);
                        value = value.join(",");
                        return "{name}: [bold]{valueY}[/]";
                    }
                    return text;
                });
            });

            series.dataFields.valueY = field;
            series.dataFields.dateX = "date";
            series.strokeWidth = 4;
            series.name = name;
            // series.stroke = color;
            series.tensionX = 1;
            series.tooltipText = "{name}: [bold]{valueY}[/]";
            series.tooltip.background.fill = series.stroke;
            series.tooltip.background.strokeWidth = 0;
            series.tooltip.getFillFromObject = false; // Disable automatic inheritance of fill properties
            series.fill = am4core.color("transparent"); // Ensure the series has no fill

            // Add bullets
            var bullet = series.bullets.push(new am4charts.CircleBullet());
            bullet.height = 10;
            bullet.horizontalCenter = "middle";
            bullet.circle.fill = series.stroke;
            bullet.circle.strokeWidth = 2;
            bullet.circle.radius = 2; // Adjust bullet size
            var bullethover = bullet.states.create("hover");
            bullethover.properties.scale = 1.2;

            return series;
        }
        chart.series.push(createSeries("Cases", "Cases"));
        chart.series.push(createSeries("Deaths", "Deaths"));
        chart.series.push(createSeries("Recovered", "Recovered"));

        window.chartSeries = chart.series;
    }

    function loadCountryData() {
        return fetch('../assets/countries.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error('Error loading JSON:', error);
                return [];
            });
    }

    function createGlobeChart(containerId, data) {
        loadCountryData().then(countryVaccineData => {

            // Create map instance
            var chart = am4core.create(containerId, am4maps.MapChart);

            // Set map definition
            chart.geodata = am4geodata_worldLow;

            // Set projection
            chart.projection = new am4maps.projections.Orthographic();
            chart.panBehavior = "rotateLongLat";
            chart.deltaLongitude = -10;
            chart.deltaLatitude = -20;
            chart.padding(20,20,20,20);

            // Create map polygon series
            var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
            // Make map load polygon (like country names) data from GeoJSON
            polygonSeries.useGeodata = true;

            // Configure series
            var polygonTemplate = polygonSeries.mapPolygons.template;
            polygonTemplate.tooltipText = "{name}: {value}";
            polygonTemplate.fill = chart.colors.getIndex(0).brighten(0.5);
            polygonTemplate.stroke = am4core.color("#454a58");
            polygonTemplate.strokeWidth = 0.5;

            var graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
            graticuleSeries.mapLines.template.line.stroke = am4core.color("#ffffff");
            graticuleSeries.mapLines.template.line.strokeOpacity = 0.08;
            graticuleSeries.fitExtent = false;

            // Water
            chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#454a58");
            chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;

            // Create hover state and set alternative fill color
            var hs = polygonTemplate.states.create("hover");
            hs.properties.fill = chart.colors.getIndex(0).brighten(-0.5);

            // Set up heat legend
            let heatLegend = chart.createChild(am4maps.HeatLegend);
            heatLegend.series = polygonSeries;
            heatLegend.align = "right";
            heatLegend.width = am4core.percent(25);
            heatLegend.marginRight = am4core.percent(4);
            heatLegend.minValue = 0;
            heatLegend.maxValue = 40000000;

            // Set up heat rules
            polygonSeries.heatRules.push({
                property: "fill",
                target: polygonSeries.mapPolygons.template,
                min: am4core.color("#ffea00"),
                max: am4core.color("#ff0000"),
                dataField: "value" // Ensure this points to the correct data field
            });

            // Set up zoom control
            chart.zoomControl = new am4maps.ZoomControl();

            polygonSeries.data = transformDataForMap(data, countryVaccineData);

            // Rotate globe
            setInterval(function () {
                chart.deltaLongitude += 0.5;
            }, 100);

            // Modify transformDataForMap to use countryVaccineData directly
            function transformDataForMap(data, countryVaccineData) {
                
                var mapData = [];
                data.forEach(countryData => {
                    var countryName = countryData.country;
                    var countryCode = getCountryCode(countryName, countryVaccineData);
                    var timelineData = countryData.timeline;
                    var latestDate = Object.keys(timelineData).pop(); // Get the latest date
                    var latestValue = timelineData[latestDate]; // Get value for the latest date

                    if (countryCode) {
                        mapData.push({
                            id: countryCode,
                            name: countryName, // include the country name for tooltip
                            value: latestValue
                        });
                    }
                });
                return mapData;
            }

            // Function to convert country name to ISO Alpha-2 code
            function getCountryCode(countryName, countryVaccineData) {
                const countriesArray = countryVaccineData.countries;
                // Find the country object in the array
                const country = countriesArray.find(c => c.name === countryName);
                return country ? country.code : null;
            }
        });
    }
    // Fetch blog articles og:image and display them in the blog section

});