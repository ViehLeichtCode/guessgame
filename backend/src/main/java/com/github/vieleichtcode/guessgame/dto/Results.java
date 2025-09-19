package com.github.vieleichtcode.guessgame.dto;

import java.util.List;

public record Results(long question, long given_answer, List<AnswerResult> other_answers) {
}
