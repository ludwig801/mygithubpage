var team = [
    ["Carlos_Pereira.jpg", "Carlos Pereira", "", "Team A", "Team A"],
    ["Claudio_Monteiro.jpg", "Cláudio Monteiro", "", "Team A", "Team A"],
    ["Joao_Bandeira.jpg", "João Bandeira", "", "Team A", "Team A"],
    ["Joao_Costa.jpg", "João Costa", "", "Team A", "Team A"],
    ["Joao_Pereira.jpg", "João Pereira", "", "Team A", "Team A"],
    ["Jose_Cardoso.jpg", "José Cardoso", "Team Leader", "Team A", "Team A"],
    ["Ricardo_Figueiredo.jpg", "Ricardo Figueiredo", "", "Team A", "Team A"],

    ["Anais_Dias.jpg", "Anaís Dias", "COO - Team Leader", "Team B", "Board Team B"],
    ["Daniel_Couceiro.jpg", "Daniel Couceiro", "", "Team B", "Team B"],
    ["Miguel_Nunes.jpg", "Miguel Nunes", "", "Team B", "Team B"],
    ["Joao_Fernandes.jpg", "João Fernandes", "", "Team B", "Team B"],
    ["Pedro_Carreira.jpg", "Pedro Carreira", "", "Team B", "Team B"],
    ["Ricardo_Loureiro.jpg", "Ricardo Loureiro", "", "Team B", "Team B"],
    ["Rita_Lima.jpg", "Rita Lima", "", "Team B", "Team B"],

    ["Ana_Rita_Ferreira.jpg", "Ana Rita Ferreira", "Team Leader", "Team C", "Team C"],
    ["Andre_Pires.jpg", "André Pires", "", "Team C", "Team C"],
    ["Joao_Cardoso.jpg", "João Cardoso", "", "Team C", "Team C"],
    ["Joao_Soares.jpg", "João Soares", "", "Team C", "Team C"],
    ["Liliana_Ribeiro.jpg", "Liliana Ribeiro", "", "Team C", "Team C"],
    ["Luis_Magalhaes.jpg", "Luís Magalhães", "CEO", "Team C", "Board Team C"],

    ["Andre_Bordalo.jpg", "André Bordalo", "", "Team D", "Team D"],
    ["Andre_Regado.jpg", "André Regado", "", "Team D", "Team D"],
    ["Diogo_Gomes.jpg", "Diogo Gomes", "", "Team D", "Team D"],
    ["Miguel_Sandim.jpg", "Miguel Sandim", "Team Leader", "Team D", "Team D"],
    ["Nuno_Duarte.jpg", "Nuno Duarte", "", "Team D", "Team D"],
    ["Vitor_Teixeira.jpg", "Vítor Teixeira", "", "Team D", "Team D"],

    ["Ana_Alves.jpg", "Ana Alves", "", "Multimedia", "Multimedia"],
    ["Andre_Peixoto.jpg", "André Peixoto", "Assistant CMO", "Multimedia", "Board Multimedia"],
    ["Beatriz_Cavaleiro.jpg", "Beatriz Cavaleiro", "CMO", "Multimedia", "Board Multimedia"],
    ["Bruno_Alves.jpg", "Bruno Alves", "", "Multimedia", "Multimedia"],
    ["Matheus.jpg", "Matheus Scarlatti", "Assistant CFO", "Multimedia", "Board Multimedia"],
    ["Raquel_Correia.jpg", "Raquel Correia", "CFO", "Multimedia", "Board Multimedia"],

    ["Carolina_Faria.jpg", "Carolina Faria", "CCO", "Design", "Board Design"],
    ["Guilherme_Barreiros.jpg", "Guilherme Barreiros", "", "Design", "Design"]
];

$(document).ready(function () {

    CreateTeamMemberBtns();

    CreateTeamFilters();

    CreateVideoBehavior();

    CreateSmoothScrollBehavior();
});

function CreateSmoothScrollBehavior() {

    var htmlBody = $('html,body');

    $('a.smooth-scroll').on('click', function (event) {
        var href = $.attr(this, 'href');
        if (href.length > 0) {
            event.preventDefault();
            htmlBody.animate({scrollTop: $(href).offset().top}, 400, "swing", function () {
                window.location.hash = href;
            });
        }
    });
}

function CreateTeamMemberBtns() {

    $.each(team, function (index, info) {
        var gif = info[0];
        var name = info[1];
        var position = info[2];
        var visualTeam = info[3];
        var teams = info[4];

        var outerCol = $(document.createElement('DIV'));
        var attrClass = 'col col-md-2 col-sm-3 col-xs-3 img-responsive team-member-img-col';
        outerCol.attr('class', attrClass);
        outerCol.attr('team', teams);

        var container = $(document.createElement("DIV"));
        container.attr("class", "team-member-container");

        /* Creating Member Image */
        var img = $(document.createElement("IMG"));
        img.attr('src', 'content/img/team/' + gif);
        img.attr('alt', name);
        img.attr('title', name);
        img.attr('width', '900');
        img.attr('height', '900');
        img.attr("class", "team-member-img img-responsive");

        var pName = $(document.createElement('P'));
        pName.html(name.length > 0 ? name : 'Name');
        pName.attr('class', 'member-name');
        var pPosition = $(document.createElement('p'));
        pPosition.html(position.length ? position : '');
        pPosition.attr('class', 'member-position');
        var pTeam = $(document.createElement('P'));
        pTeam.html(visualTeam.length > 0 ? visualTeam : 'Team X');
        pTeam.attr('class', 'member-team');

        var infoWrapper = $(document.createElement("DIV"));
        infoWrapper.attr('class', 'member-info-wrapper');
        var infoContainer = $(document.createElement("DIV"));
        infoContainer.attr('class', 'member-info');

        infoContainer.append(pName);
        infoContainer.append(pTeam);
        infoContainer.append(pPosition);
        infoWrapper.append(infoContainer);
        container.append(img);
        container.append(infoWrapper);
        outerCol.append(container);

        container.on('mouseover', function() {
            container.addClass('hover');
        });

        container.on('click', function() {
            container.toggleClass('click');
        });

        container.on('mouseleave', function() {
            container.removeClass('hover');
            container.removeClass('click');
        });

        $("#team-pics").append(outerCol);
    });
}

function CreateTeamFilters() {

    var listItems = $('#our-team').find('.team-filter li');
    var pics = $('#team-pics').find('.col.team-member-img-col');

    $.each(listItems, function (index, elem) {

        var item = $(elem);
        var filterLink = $(item.children('a')[0]);
        var filter = filterLink.attr('title');

        filterLink.on('click', function (event) {
            event.preventDefault();
            for (var i = 0; i < listItems.length; i++) {
                $(listItems[i]).removeClass('active');
            }
            item.addClass('active');
            OnTeamFilterClicked(filter, pics);
        });
    });
}

function OnTeamFilterClicked(filter, pics) {
    var all = (filter == 'All');
    for (var i = 0; i < pics.length; i++) {

        var pic = $(pics[i]);
        var team = pic.attr('team');

        if (all || team.indexOf(filter) > -1) {
            //console.log(pic);
            pic.removeClass('hide');
        }
        else {
            pic.addClass('hide');
        }
    }
}

function CreateVideoBehavior() {
    $(window).on('resize', function () {
        $(".covervideo").height($("#videocompany").height());
    });
    $(".coverVideo").height($("#videoCompany").height());
}
