$(document).ready(function() {
        // fix menu when passed
        $('.masthead').visibility({
                once: false,
                onBottomPassed: function() {
                        $('.fixed.menu').transition('fade in');
                },
                onBottomPassedReverse: function() {
                        $('.fixed.menu').transition('fade out');
                }
        });
        // create sidebar and attach to menu open
        $('.ui.sidebar').sidebar('attach events', '.toc.item');

        // Chargement des iframes
        $('.ui.embed').embed();

        initProgressBars();
});

function initProgressBars(){
        var progression;
        var beginner = 40;
        var medium = 50;
        var advanced = 70;
        var excellent = 85;
        $('.ui.progress').each(function(index, el) {
                switch($(el).attr('id')){
                        // DEVELOPPEMENT
                        case "symfony":
                                progression = advanced;
                                break;
                        case "android":
                                progression = advanced;
                                break;
                        case "jquery":
                                progression = advanced;
                                break;
                        case "angular":
                                progression = medium;
                                break;
                        // DESIGN
                        case "html":
                                progression = excellent;
                                break;
                        case "css":
                                progression = excellent;
                                break;
                        case "bootstrap":
                                progression = advanced;
                                break;
                        case "semantic":
                                progression = advanced;
                                break;
                        case "gulp":
                                progression = advanced;
                                break;
                        // LOGICIELS
                        case "photoshop":
                                progression = medium;
                                break;
                        case "eclipse":
                                progression = medium;
                                break;
                        case "androidStudio":
                                progression = medium;
                                break;
                        case "netbeans":
                                progression = advanced;
                                break;
                }
                $(el).progress({
                        percent: progression
                })
        });
}