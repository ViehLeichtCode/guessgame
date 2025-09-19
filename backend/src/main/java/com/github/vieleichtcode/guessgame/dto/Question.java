package com.github.vieleichtcode.guessgame.dto;

import java.util.List;

public record Question(long id, String text, long active_player, List<QuestionOptions> answer_options) {
}