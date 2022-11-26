/* ****** Start Easy pie chart ****** */
let SkillOff = Math.floor($('#Skills').offset().top);
$(window).scroll(function() {

    let wScroll = Math.floor($(window).scrollTop());

    let html = document.querySelector('.html'),
        css = document.querySelector('.css'),
        js = document.querySelector('.js'),
        ts = document.querySelector('.ts'),
        Jquery = document.querySelector('.Jquery'),
        bootstrab = document.querySelector('.bootstrab'),
        Angular = document.querySelector('.Angular'),
        sass = document.querySelector('.sass'),
        Ajax_json = document.querySelector('.Ajax-json'),
        github = document.querySelector('.github');

    if (wScroll >= SkillOff) {

        new EasyPieChart(html, {
            barColor: '#fd7e14',
            lineWidth: 10,
            trackColor: '#000',
            trackWidth: 10,
            lineCap: 'round',
        });

        new EasyPieChart(css, {
            barColor: '#0d6efd',
            lineWidth: 10,
            trackColor: '#000',
            trackWidth: 10,
            lineCap: 'round'
        });

        new EasyPieChart(js, {
            barColor: '#ffc107',
            lineWidth: 10,
            trackColor: '#000',
            trackWidth: 10,
            lineCap: 'round'
        });

        new EasyPieChart(ts, {
            barColor: '#0d60ff',
            lineWidth: 10,
            trackColor: '#000',
            trackWidth: 10,
            lineCap: 'round'
        });

        new EasyPieChart(Jquery, {
            barColor: '#b3d4fc',
            lineWidth: 10,
            trackColor: '#000',
            trackWidth: 10,
            lineCap: 'round'
        });

        new EasyPieChart(bootstrab, {
            barColor: '#6610f2',
            lineWidth: 10,
            trackColor: '#000',
            trackWidth: 10,
            lineCap: 'round'
        });

        new EasyPieChart(Angular, {
            barColor: 'red',
            lineWidth: 10,
            trackColor: '#000',
            trackWidth: 10,
            lineCap: 'round'
        });

        new EasyPieChart(sass, {
            barColor: '#d63384',
            lineWidth: 10,
            trackColor: '#000',
            trackWidth: 10,
            lineCap: 'round'
        });

        new EasyPieChart(Ajax_json, {
            barColor: '#198754',
            lineWidth: 10,
            trackColor: '#000',
            trackWidth: 10,
            lineCap: 'round'
        });

        new EasyPieChart(github, {
            barColor: '#343a40',
            lineWidth: 10,
            trackColor: '#000',
            trackWidth: 10,
            lineCap: 'round'
        });

    }
});
/* ****** End ****** */

/* ****************** End My Skills ****************** */
