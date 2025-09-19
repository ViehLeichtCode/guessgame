package com.github.vieleichtcode.guessgame.dto;

public record AnswerResult(long player_id, long answer_id, boolean correct, long reward, long new_score) {
}
