let democratScore = 226;
let republicanScore = 312;

function updateScoreDisplay() {
    $('#score1').html(`<b>${democratScore}</b>`);
    $('#score2').html(`<b>${republicanScore}</b>`);
}

function updateScoreForState(state, stateElectoralVotes) {
    if ($(state).hasClass('democratic')) {
        democratScore += stateElectoralVotes;
        republicanScore -= stateElectoralVotes;
    }
    if ($(state).hasClass('republican')) {
        republicanScore += stateElectoralVotes;
        democratScore -= stateElectoralVotes;
    }
    updateScoreDisplay();
    updateCandidateBorders();
}

$('.state path').each(function() {
    const state = $(this);
    const stateElectoralVotes = parseInt(state.attr('data-electoral'));
    const status = state.attr('data-status');

    if (status === 'democratic') {
        state.addClass('democratic').css('fill', '#0157d0');
    } else if (status === 'republican') {
        state.addClass('republican').css('fill', '#b72100');
    }

    state.on('click', function() {
        if (state.hasClass('democratic')) {
            state.removeClass('democratic').addClass('republican').css('fill', '#b72100');
        } else if (state.hasClass('republican')) {
            state.removeClass('republican').addClass('democratic').css('fill', '#0157d0');
        } else {
            state.addClass('democratic').css('fill', '#0157d0');
        }

        updateScoreForState(state, stateElectoralVotes);
        updateScoreBar();
    });
});

function updateScoreBar() {
    let democraticScore = 0;
    let republicanScore = 0;

    $('.state-path').each(function() {
        const state = $(this);
        const electoralVotes = parseInt(state.data('electoral')) || 0;

        if (state.hasClass('democratic')) {
            democraticScore += electoralVotes;
        }
        if (state.hasClass('republican')) {
            republicanScore += electoralVotes;
        }
    });

    const totalVotes = democraticScore + republicanScore;
    const democraticPercentage = totalVotes > 0 ? (democraticScore / totalVotes) * 70 : 43;
    const republicanPercentage = totalVotes > 0 ? (republicanScore / totalVotes) * 70 : 43;

    $('#scorebar1').css('width', democraticPercentage + '%');
    $('#scorebar2').css('width', republicanPercentage + '%');
}

function updateCandidateBorders() {
    const score1 = parseInt($('#score1').text());
    const score2 = parseInt($('#score2').text());

    const candidate1Image = $('#candidate1image');
    const candidate2Image = $('#candidate2image');

    candidate1Image.removeClass('scaled');
    candidate2Image.removeClass('scaled');

    if (score1 > score2) {
        candidate1Image.css('border', '4px solid var(--blue-color)').addClass('scaled');
        candidate2Image.css('border', '4px solid white');
    } else if (score2 > score1) {
        candidate2Image.css('border', '4px solid var(--red-color)').addClass('scaled');
        candidate1Image.css('border', '4px solid white');
    } else {
        candidate1Image.css('border', '4px solid white');
        candidate2Image.css('border', '4px solid white');
    }
}

$('#close-btn').on('click', function() {
    $('#headline').remove();
});

updateScoreDisplay();
updateScoreBar();
updateCandidateBorders();
