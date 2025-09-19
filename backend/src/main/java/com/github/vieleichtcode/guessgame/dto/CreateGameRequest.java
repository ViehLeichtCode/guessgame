package com.github.vieleichtcode.guessgame.dto;

import java.util.List;

public record CreateGameRequest(List<Long> categories) {
}
