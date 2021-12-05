document.addEventListener('DOMContentLoaded', () => {
    var timeFrames = 'daily';
    var data = [];

    const imgDirectory = "../images/"
    const icons = {
        work: {
            "color": "#ff8c66",
            "url": imgDirectory + "icon-work.svg"
        },
        play: {
            "color": "#56c2e6",
            "url": imgDirectory + "icon-play.svg"
        },
        study: {
            "color": "#ff5c7c",
            "url": imgDirectory + "icon-study.svg"
        },
        exercise: {
            "color": "#4acf81",
            "url": imgDirectory + "icon-exercise.svg"
        },
        social: {
            "color": "#7536d3",
            "url": imgDirectory + "icon-social.svg"
        },
        'self care': {
            "color": "#f1c65b",
            "url": imgDirectory + "icon-self-care.svg"
        },
    }

    fetch('../data.json')
        .then((res) => res.json())
        .then((res) => {
            data = res;

            $('label').on('click', (e) => {
                e.target.parentNode.children[0].click();
                handleTimeframes(e.target.innerText.toLowerCase(), data, template, grid, icons)
            })
            renderTemplate(data, template, grid, icons)
        })
        .catch(error => console.log(error));

    const handleTimeframes = (str, data, template, grid, icons) => {
        timeFrames = str;
        renderTemplate(data, template, grid, icons)
    }


    // Tagsquery
    const grid = document.getElementById('grid');
    const template = document.getElementById('template').content.cloneNode(true);





    // Hover

    const hover = () => {
        const lighten = 'hsl(236, 44%, 35%)';
        $('.card-body').hover(
            function() {
                $(this).css('background-color', lighten)
            },
            function() {
                $(this).css('background-color', '')
            });

        $('.ellipsis').hover(
            function() {
                $(this).css('fill', 'whitesmoke')
                $(this).parent().parent().css('background-color', '')
            },
            function() {
                $(this).parent().parent().css('background-color', lighten)
                $(this).css('fill', '')
            });

    }

    const renderTemplate = (data = data, template = template, parent = grid, icons = icons) => {
        $('.card').remove();
        const head = template.children[0].children[0]
        const title = template.children[0].children[1].children[0].children[0];
        const current = template.children[0].children[1].children[1];
        const previous = template.children[0].children[1].children[2];

        // console.log(title, current, previous)
        for (const iterator of data) {
            // console.log(icons[iterator.title.toLowerCase()]);
            head.style = `
                background-color: ${icons[iterator.title.toLowerCase()].color};
                background-image: url(${icons[iterator.title.toLowerCase()].url});
            `;
            let times = iterator.timeframes[timeFrames]
            title.innerText = iterator.title
            current.innerText = times.current + 'hrs'
            previous.innerText = `Last ${timeFrames.replace(/ly/, '').replace(/i/, 'y')} ${times.previous} hrs`

            let clone = template.cloneNode(true)
                // console.log(clone)
            parent.appendChild(clone);
        }
        hover();
    }
});